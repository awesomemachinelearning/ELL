####################################################################################################
#
# Project:  Embedded Learning Library (ELL)
# File:     torch_verifier.py (importers)
# Authors:  Chris Lovett
#
# Requires: Python 3.x, onnx-v1.22
#
####################################################################################################
import argparse
from collections import OrderedDict
import importlib
import os
import sys

import cv2
import numpy as np
import torch
import torch.nn as nn

script_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(script_path, '..', '..', 'utilities/pythonlibs'))
sys.path.append(os.path.join(script_path, '..', 'common'))
sys.path.append(os.path.join(script_path, '..', 'onnx'))

import onnx_to_ell
import find_ell  # noqa 401
import ell
import logger
import common.memory_shapes as memory_shapes


def remove_padding(v, shape, padding):
    """ remove any padding from the ell output (since torch won't include padding in it's version) """
    shape = list(shape)
    padding = list(padding)
    v = v.reshape(padding)
    for i in range(len(shape)):
        s = shape[i]
        p = padding[i]
        if s != p:
            left = int((p - s) / 2)
            right = (p - s) - left
            if i == 0:
                v = v[left:-right, :, :]
            elif i == 1:
                v = v[:, left:-right, :]
            elif i == 2:
                v = v[:, :, left:-right]
            elif i == 3:
                v = v[:, :, :, left:-right]
            else:
                raise Exception("Too many dimensions, 5 dimensions not supported.")

    v = v.reshape(shape)
    return v


def get_active_region(v, shape, extent, offset):
    """ get active region from the ell output (since torch won't include padding in it's version) """
    shape = list(shape)
    offset = list(offset)
    v = v.reshape(extent)
    for i in range(len(shape)):
        s = shape[i]
        o = offset[i]
        if i == 0:
            v = v[o:o + s, :, :]
        elif i == 1:
            v = v[:, o:o + s, :]
        elif i == 2:
            v = v[:, :, o:o + s]
        elif i == 3:
            v = v[:, :, :, o:o + s]
        else:
            raise Exception("Too many dimensions, 5 dimensions not supported.")
    # v = v.reshape(shape)
    return v


def get_nodes(ell_map):
    nodes = []
    iter = ell_map.GetModel().GetNodes()
    while iter.IsValid():
        node = iter.Get()
        nodes += [node]
        iter.Next()
    return nodes


class LayerInfo:
    def __init__(self, model):
        self.model = model
        self.register_hooks(model)
        self.clear()

    def clear(self):
        self.layers = OrderedDict()
        self.index_map = {}

    def get_next_index(self, class_name):
        if class_name not in self.index_map:
            self.index_map[class_name] = 0
        self.index_map[class_name] += 1
        return self.index_map[class_name]

    def register_hook(self, module):
        def hook(module, input, output):
            class_name = str(module.__class__).split(".")[-1].split("'")[0]
            instance_index = self.get_next_index(class_name)

            layer_id = "%s-%i" % (class_name, instance_index)
            self.layers[layer_id] = OrderedDict()
            self.layers[layer_id]["input"] = input
            self.layers[layer_id]["output"] = output[0]

        if (not isinstance(module, nn.Sequential)
                and not isinstance(module, nn.ModuleList)
                and not (module == self.model)):
            module.register_forward_hook(hook)

    def register_hooks(self, model):
        model.apply(self.register_hook)


# unfortunately this is different from the ONNX map in onnx_converters
TORCH_TO_ELL_MAP = {
    "Conv2d": "Convolution",
    "Linear": "FullyConnected",
    "GRU": "GRU"
    # todo: complete this map as tests need it...
}


def get_matching_node_output(nodes, key):
    """ return the ELL node output matching the torch layer key generated by LayerInfo """
    name, index = key.split('-')
    index = int(index)  # the index tells us which instance of a given layer type to return
    if name in TORCH_TO_ELL_MAP:
        name = TORCH_TO_ELL_MAP[name]
    else:
        return None

    count = 0
    for i, node in enumerate(nodes):
        op_type = node.GetRuntimeTypeName()
        group_id = node.GetMetadataValue("GroupId")
        if name in op_type:
            count += 1
            if count == index:
                # return last node in the group
                group = [n for n in nodes[i:] if n.GetMetadataValue("GroupId") == group_id]
                return group[-1]
    return None


class TorchModelVerifier:
    """
    Verifies the torch model specified by the torch_class_name in 'torch_model'.
    The model is loaded with the state specified in torch_model_source.
    It will export the model to .onnx, convert it to .ell, and compile that .ell model.
    Then it will capture the outputs of the torch model layer by layer and compare that
    with the ell model using the given input 'test_data' assuming the given 'input_shape'.
    """
    def __init__(self, torch_model, torch_model_source, input_shape, output_shape):

        self._logger = logger.get()
        self._logger.info("Loading torch state from {}".format(torch_model_source))
        model_state = torch.load(torch_model_source)
        self.torch_model_path = torch_model_source
        self.torch_model = torch_model
        self.torch_model.load_state_dict(model_state)
        self.input_tensor = None
        self.input_shape = input_shape
        self.output_shape = output_shape
        self.input_tensors = []

    @staticmethod
    def from_python_module(torch_module, torch_class_name, torch_model_source, input_shape, output_shape):
        _logger = logger.get()
        _logger.info("Loading torch model {} from {} ".format(torch_class_name, torch_module))
        sys.path += [os.path.dirname(torch_module)]
        basename = os.path.basename(torch_module)
        basename = os.path.splitext(basename)[0]
        module = importlib.import_module(basename)
        torch_model = getattr(module, torch_class_name)(input_shape, output_shape)
        return TorchModelVerifier(torch_model, torch_model_source, input_shape, output_shape)

    def load_image(self, filename):
        self._logger.info("Loading image {} and reshaping to {}".format(filename, str(self.input_shape)))
        image = cv2.imread(filename)
        if image is None:
            raise Exception("Image not loading correctly: {}".format(filename))
        channels = self.input_shape[2]
        if channels == 1:
            image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
            image = np.expand_dims(image, axis=2)
        elif channels != 3:
            raise Exception("Don't know how to get {} from an image".format(channels))

        # torch requires channel,row,column, so move channel to the front
        image = np.moveaxis(image, 2, 0)

        # most models operate on floats.
        image = image.astype(np.float32)
        self.add_input(torch.tensor(image).unsqueeze(0))

    def load_features(self, filename):
        data = np.load(filename)
        features = data["features"]
        labels = data["labels"]
        self.expected = labels[0]
        feature = features[0]  # todo: support testing a stream of features...
        shape = feature.shape
        # check if we have a batch input or not
        if len(shape) == 4:
            batch_size = shape[0]
            for i in range(batch_size):
                self.add_input(torch.tensor(feature[i].astype(np.float32)))
        else:
            self.add_input(torch.tensor(feature.astype(np.float32)))

    def add_input(self, tensor):
        self.input_tensors += [tensor]

    def export_to_onnx(self, model_path):
        self._logger.info("Exporting model to ONNX: {}".format(model_path))
        tensor = self.input_tensors[0]
        self.torch_model.eval()
        self.torch_model(tensor)
        torch.onnx._export(self.torch_model, tensor, model_path, export_params=True, verbose=True)

    def get_order(self, shape):
        order = "channel"
        if len(shape) == 4:
            order = "filter_channel_row_column"
        elif len(shape) == 3:
            order = "channel_row_column"
        elif len(shape) == 2:
            order = "row_column"
        return order

    def verify_ell_model(self, onnx_model_path, verify_compiled=True, arg_max_only=False):
        """
        Test each operation in the onnx graph by creating a custom pytorch layer for each node then
        run forward with the onnx node weight on both ell and pytorch node.  If verify_compiled is
        True then also test compiled ELL model.
        """

        self._logger.info("Model verification started")
        try:
            # install debug hooks into torch model so we capture output of every layer.
            info = LayerInfo(self.torch_model)

            # get the pytorch model output
            self.torch_model.eval()

            model_name = os.path.basename(onnx_model_path)
            model_name = os.path.splitext(model_name)[0]
            ell_map, ordered_importer_nodes = onnx_to_ell.convert_onnx_to_ell(onnx_model_path)
            ell_map.Save(model_name + ".ell")

            # Get compiled ELL result
            if verify_compiled:
                self._logger.info("Getting compiled ELL results")
                compiler_options = ell.model.MapCompilerOptions()
                compiler_options.useBlas = True
                compiled_ell_map = ell_map.Compile("host", "model", "predict", compilerOptions=compiler_options,
                                                   dtype=np.float32)

            input_index = 0
            for test_input in self.input_tensors:

                # get torch model output
                info.clear()
                torch_out = self.torch_model.forward(test_input).data.numpy().ravel()

                test_input = test_input.detach().cpu().numpy()  # convert to numpy
                order = self.get_order(test_input.shape)
                ell_input_tensor = memory_shapes.get_tensor_in_ell_order(test_input, order)
                ell_flat_input = ell_input_tensor.ravel().astype(np.float32)
                if verify_compiled:
                    ell_out_compiled = np.array(compiled_ell_map.Compute(ell_flat_input, dtype=np.float32))

                # must come after the compiled Compute so that map contains valid outputs for layer by layer test
                ell_out = np.array(ell_map.Compute(ell_input_tensor, dtype=np.float32))
                ell_nodes = get_nodes(ell_map)

                if not arg_max_only:
                    # Compare the layers of the torch model with the coorresponding layers of the ELL model
                    for key in info.layers.keys():
                        if input_index == 0:
                            self._logger.info("----- Comparing Layer {} output -----".format(key))
                        torch_output = info.layers[key]["output"].detach().numpy().ravel()
                        node = get_matching_node_output(ell_nodes, key)
                        if node is not None:
                            port = node.GetOutputPort("output")
                            shape = tuple(port.GetMemoryLayout().size)
                            extent = tuple(port.GetMemoryLayout().extent)
                            offset = tuple(port.GetMemoryLayout().offset)

                            # padding = tuple(port.GetMemoryLayout().padding) # output shape includes padding
                            ell_output = np.array(port.GetDoubleOutput()).astype(np.float32)
                            # now to compare ell (row,col,channel) with torch (channel,row,col) we have to reorder
                            ell_output = get_active_region(ell_output, shape, extent, offset)
                            ell_output = np.moveaxis(ell_output, 2, 0).ravel()

                            # close = np.allclose(torch_output, ell_output, atol=1e-3)
                            np.testing.assert_almost_equal(
                                torch_output, ell_output, decimal=3,
                                err_msg=('results for ELL layer {} do not match torch output for row {}'.format(
                                         node.GetRuntimeTypeName(), input_index)))

                # compare whole model output but only the argmax of it,
                # because sometimes model has Softmax but ELL does not.
                torch_prediction = np.argmax(torch_out)
                ell_prediction = np.argmax(ell_out)
                if verify_compiled:
                    compiled_prediction = np.argmax(ell_out_compiled)
                    msg = "argmax of ELL result {}, ELL compiled result {} and argmax of torch output {} on row {}"
                    msg = msg.format(ell_prediction, compiled_prediction, torch_prediction, input_index)
                else:
                    msg = "argmax of ELL result {} and argmax of torch output {} on row {}".format(
                        ell_prediction, torch_prediction, input_index)

                self._logger.info(msg)
                np.testing.assert_equal(torch_prediction, ell_prediction, msg)

                if verify_compiled:
                    np.testing.assert_equal(torch_prediction, compiled_prediction, msg)
                input_index += 1

        except BaseException as exception:
            self._logger.error("Verification of model output failed: " + str(exception))
            raise

        self._logger.info("Verification of model output complete")

    def verify(self, verify_compiled=True):
        if len(self.input_tensors) == 0:
            raise Exception("Input data is missing")

        file_name = os.path.basename(self.torch_model_path)
        file_name = os.path.splitext(file_name)[0] + ".onnx"

        self.export_to_onnx(file_name)
        self.verify_ell_model(file_name, verify_compiled, False)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        "Verify the the torch model specified by the file 'torch_model_path'.\n" +
        "It will export the model to .onnx, convert it to .ell, and compile that .ell model\n" +
        "Then it will compare the outputs of the torch model layer by layer and compare that\n" +
        "with the ell model using the given input 'test_data' assuming the given 'input_shape'.\n" +
        "Note the input shape is in row,column,channel order.\n" +
        "For example: the 'input_shape' for an MNist model would be (28,28,1)")

    parser.add_argument("module", help="Path to a python file containing the torch model")
    parser.add_argument("class_name", help="Name of the torch model class in --model python file")
    parser.add_argument("model_source", help="path to the *.pth file you want to load into your torch model")
    parser.add_argument("input_shape", help="expected input shape of your torch model, e.g. '(28,28,1)' ")
    parser.add_argument("output_shape", help="expected output shape of the model, e.g. '(10,)' ")

    parser.add_argument("--image", "-img", help="Path to an image to use as test data", default=None)
    parser.add_argument("--data", "-d", help="Path to an numpy feature data (.npz)", default=None)

    logger.add_logging_args(parser)
    args = parser.parse_args()
    logger.setup(args)

    input_shape = eval(args.input_shape)
    output_shape = eval(args.output_shape)
    verifier = TorchModelVerifier.from_python_module(args.module, args.class_name, args.model_source, input_shape,
                                                     output_shape)

    if args.image:
        verifier.load_image(args.image)
    elif args.data:
        verifier.load_features(args.data)

    verifier.verify()
