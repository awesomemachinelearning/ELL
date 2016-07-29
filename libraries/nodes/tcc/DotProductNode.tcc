////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Project:  Embedded Machine Learning Library (EMLL)
//  File:     DotProductNode.tcc (nodes)
//  Authors:  Chuck Jacobs
//
////////////////////////////////////////////////////////////////////////////////////////////////////

#include "BinaryOperationNode.h"

namespace nodes
{
    template <typename ValueType>
    DotProductNode<ValueType>::DotProductNode(const model::OutputPortElements<ValueType>& input1, const model::OutputPortElements<ValueType>& input2) : Node({&_input1, &_input2}, {&_output}), _input1(this, input1, "input1"), _input2(this, input2, "input2"), _output(this, outputPortName, 1)
    {
    }

    template <typename ValueType>
    void DotProductNode<ValueType>::Compute() const
    {
        ValueType result = 0;
        for(size_t index = 0; index < _input1.Size(); ++index)
        {
            result += _input1[index] * _input2[index];
        }
        _output.SetOutput({ result });
    };

    template <typename ValueType>
    void DotProductNode<ValueType>::Copy(model::ModelTransformer& transformer) const
    {
        auto newInput1 = transformer.TransformOutputPortElements(_input1.GetOutputPortElements());
        auto newInput2 = transformer.TransformOutputPortElements(_input2.GetOutputPortElements());
        auto newNode = transformer.AddNode<DotProductNode<ValueType>>(newInput1, newInput2);
        transformer.MapOutputPort(output, newNode->output);
    }

    template <typename ValueType>
    void DotProductNode<ValueType>::Refine(model::ModelTransformer& transformer) const
    {
        // Maybe... in reality, dot product will likely want to be computed as in Compute() above
        auto newInput1 = transformer.TransformOutputPortElements(_input1.GetOutputPortElements());
        auto newInput2 = transformer.TransformOutputPortElements(_input2.GetOutputPortElements());
        auto multNode = transformer.AddNode<BinaryOperationNode<ValueType>>(newInput1, newInput2, BinaryOperationNode<ValueType>::OperationType::coordinatewiseMultiply);
        auto sumNode = transformer.AddNode<SumNode<ValueType>>(multNode->output);

        transformer.MapOutputPort(output, sumNode->output);
    }
}