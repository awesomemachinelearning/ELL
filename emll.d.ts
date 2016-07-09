
/*
  THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT.
*/

//----------------------------------------------------------------------------------
// Definitions from utility libraries that are not in the SWIG XML file.
//----------------------------------------------------------------------------------

export class CommandLineParser {}
export class CommandLineParseResult {}
export class ostream {}
export class XMLDeserializer {}
export class XMLSerializer {}

export class StlIterator<T,U> {
    IsValid(): boolean;
    HasSize(): boolean;
    NumIteratesLeft(): number;
    Next(): void;
    Get(): T;
}

export class StdVector<T> {
    constructor();
    constructor(count: number);
    size(): number;
    capacity(): number;
    reserve(count: number): void;
    empty(): boolean;
    clear(): void;
    add(val: T): void;
    get(index: number): T;
    set(index: number, val: T): void;
}

export class RowDataset<T> {
    // fill me in
}

export class Iterator extends StlIterator<any,any> { 
    // For now, I'm translating Iterators in a weakly typed way.
    // If we feel it's important we could put in the work to 
    // translate C++ templates properly to preserve strong typing.
}

export class StringVector extends StdVector<string> {}

export class FeatureMap {
    // fill me in
}

export class SupervisedExample<T> {
    // fill me in
}

export class SparseDataVector<T,U> {
    // fill me in
}

export class CompressedIntegerList {
    // fill me in
}

export class vector<T> {
    // fill me in
}

export class TypeFactory<T> {
    // fill me in
}

export class AnyIterator<T> {
    // fill me in
}

export type unique_ptr<T> = T; // Is this right?
export type shared_ptr<T> = T; // Is this right?

//----------------------------------------------------------------------------------
// Translated definitions below. 
// (The id comments allow traceability back to the SWIG XML file.)
//----------------------------------------------------------------------------------



// skipping template initializer_list id:90


// skipping template unique_ptr id:415


export class default_random_engine { // class id:688
}


// skipping template RowDataset id:1158


//export class GenericRowDataset extends RowDataset<IDataVector> { } // typedef id:1713


// skipping template operator << id:1723


export class IDataVector { // class id:1874
	AppendEntry(index: number, value: number): void; // member id:1990
	AppendEntry(index: number): void; // member id:2018
	Reset(): void; // member id:2041
	NumNonzeros(): number; // member id:2056
	Clone(): unique_ptr<IDataVector>; // member id:2071
	ToArray(): vector<number>; // member id:2086
}


export class GenericRowIterator { // class id:2224
}


// skipping template IIterator id:2402


// skipping template StlIterator id:2418


// skipping template StlIndexValueIterator id:2504


export class HingeLoss { // class id:2789
	Evaluate(prediction: number, label: number): number; // member id:2845
	GetDerivative(prediction: number, label: number): number; // member id:2866
}


export class LogLoss { // class id:2941
	constructor(scale: number); // ctor id:2999
	constructor(); // ctor id:3019
	Evaluate(prediction: number, label: number): number; // member id:3033
	GetDerivative(prediction: number, label: number): number; // member id:3054
}


export class SquaredLoss { // class id:3145
	Evaluate(prediction: number, label: number): number; // member id:3201
	GetDerivative(prediction: number, label: number): number; // member id:3222
	BregmanGenerator(value: number): number; // member id:3243
}


export class DoubleVector { // class id:3360
	constructor(size: number); // ctor id:3454
	constructor(); // ctor id:3474
	constructor(parameter: DoubleVector); // ctor id:3490
	constructor(parameter: DoubleVector); // ctor id:3511
	constructor(v: vector<number>); // ctor id:3527
	constructor(v: vector<number>); // ctor id:3546
	Reset(): void; // member id:3622
	GetDataPointer(): number; // member id:3669
	GetDataPointer(): number; // member id:3682
	GetIterator(): Iterator; // member id:3694
	Size(): number; // member id:3706
	Norm2(): number; // member id:3720
	AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // member id:3733
	AddTo(p_other: any /*!!!p.double*/): void; // member id:3759
	AddTo(other: vector<number>, scalar: number): void; // member id:3791
	AddTo(other: vector<number>): void; // member id:3815
	Scale(s: number): void; // member id:3833
	Dot(p_other: number): number; // member id:3850
	Print(os: ostream): void; // member id:3868
	Append(value: number): void; // member id:3886
}


export class DoubleSubvector { // class id:4014
	constructor(vec: DoubleVector, offset: number, size: number); // ctor id:4105
	constructor(vec: DoubleVector, offset: number); // ctor id:4134
	constructor(vec: DoubleVector); // ctor id:4160
	constructor(ptr: number, size: number); // ctor id:4181
	GetIterator(): Iterator; // member id:4203
	Size(): number; // member id:4215
	Norm2(): number; // member id:4229
	AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // member id:4242
	AddTo(p_other: any /*!!!p.double*/): void; // member id:4268
	Dot(p_other: number): number; // member id:4289
	Print(os: ostream): void; // member id:4307
}


// skipping template DoubleMatrix id:4525


export class DoubleMatrixBase { // class id:4541
	constructor(parameter: DoubleMatrixBase); // ctor id:4635
	constructor(parameter: DoubleMatrixBase); // ctor id:4654
	NumRows(): number; // member id:4672
	NumColumns(): number; // member id:4686
	Set(i: number, j: number, value: number): void; // member id:4700
	Set(i: number, j: number): void; // member id:4730
	Reset(): void; // member id:4755
	Gemv(p_x: number, p_y: any /*!!!p.double*/, alpha: number, beta: number): void; // member id:4815
	Gemv(p_x: number, p_y: any /*!!!p.double*/, alpha: number): void; // member id:4850
	Gemv(p_x: number, p_y: any /*!!!p.double*/): void; // member id:4882
	Gemv(x: vector<number>, y: vector<number>, alpha: number, beta: number): void; // member id:4918
	Gemv(x: vector<number>, y: vector<number>, alpha: number): void; // member id:4951
	Gemv(x: vector<number>, y: vector<number>): void; // member id:4979
	Gevm(p_x: number, p_y: any /*!!!p.double*/, alpha: number, beta: number): void; // member id:5001
	Gevm(p_x: number, p_y: any /*!!!p.double*/, alpha: number): void; // member id:5036
	Gevm(p_x: number, p_y: any /*!!!p.double*/): void; // member id:5068
	Gevm(x: vector<number>, y: vector<number>, alpha: number, beta: number): void; // member id:5104
	Gevm(x: vector<number>, y: vector<number>, alpha: number): void; // member id:5137
	Gevm(x: vector<number>, y: vector<number>): void; // member id:5165
	Print(os: ostream): void; // member id:5187
	constructor(size: number, numRows: number, numColumns: number); // ctor id:5208
}


// skipping template DoubleMatrix<(MatrixStructure::column)> id:5297


// skipping template DoubleMatrix<(MatrixStructure::row)> id:5379


// skipping template DoubleMatrix<(MatrixStructure::columnSquare)> id:5461


// skipping template DoubleMatrix<(MatrixStructure::rowSquare)> id:5496


// skipping template DoubleMatrix<(MatrixStructure::rowSquareUptriangular)> id:5531


// skipping template DoubleMatrix<(MatrixStructure::diagonal)> id:5894


export class IMatrix { // class id:6352
	NumRows(): number; // member id:6443
	NumColumns(): number; // member id:6458
	Gemv(x: vector<number>, y: vector<number>, alpha: number, beta: number): void; // member id:6473
	Gemv(x: vector<number>, y: vector<number>, alpha: number): void; // member id:6507
	Gemv(x: vector<number>, y: vector<number>): void; // member id:6538
	Gemv(p_x: number, p_y: any /*!!!p.double*/, alpha: number, beta: number): void; // member id:6564
	Gemv(p_x: number, p_y: any /*!!!p.double*/, alpha: number): void; // member id:6602
	Gemv(p_x: number, p_y: any /*!!!p.double*/): void; // member id:6636
	Gevm(x: vector<number>, y: vector<number>, alpha: number, beta: number): void; // member id:6663
	Gevm(x: vector<number>, y: vector<number>, alpha: number): void; // member id:6697
	Gevm(x: vector<number>, y: vector<number>): void; // member id:6728
	Gevm(p_x: number, p_y: any /*!!!p.double*/, alpha: number, beta: number): void; // member id:6754
	Gevm(p_x: number, p_y: any /*!!!p.double*/, alpha: number): void; // member id:6792
	Gevm(p_x: number, p_y: any /*!!!p.double*/): void; // member id:6826
}


export class Coordinate { // class id:6925
	constructor(); // ctor id:6992
	constructor(layerIndex: number, elementIndex: number); // ctor id:7007
	GetLayerIndex(): number; // member id:7029
	GetElementIndex(): number; // member id:7042
	GetTypeName(): string; // member id:7055
	Read(deserializer: XMLDeserializer): void; // member id:7070
	Write(serializer: XMLSerializer): void; // member id:7087
}


export class CoordinateIterator extends StlIterator<vector<Coordinate>,Coordinate> { } // typedef id:7241


export class CoordinateList { // class id:7251
	constructor(); // ctor id:7318
	constructor(layerIndex: number, size: number); // ctor id:7333
	Size(): number; // member id:7355
	AddCoordinate(coordinate: Coordinate): void; // member id:7384
	AddCoordinate(layerIndex: number, elementIndex: number): void; // member id:7404
	GetIterator(fromIndex: number, size: number): CoordinateIterator; // member id:7427
	GetIterator(fromIndex: number): CoordinateIterator; // member id:7453
	GetIterator(): CoordinateIterator; // member id:7476
	GetRequiredLayerSize(layerindex: number): number; // member id:7491
	GetTypeName(): string; // member id:7508
	Read(deserializer: XMLDeserializer): void; // member id:7523
	Write(serializer: XMLSerializer): void; // member id:7540
	Print(os: ostream): void; // member id:7557
	begin(): vector<Coordinate>; // member id:7574
	end(): vector<Coordinate>; // member id:7588
	begin(): vector<Coordinate>; // member id:7602
	end(): vector<Coordinate>; // member id:7614
}


export function BuildCoordinateList(model: Model, inputLayerSize: number, coordinateListString: string): CoordinateList; // function id:7738

export function RepeatCoordinates(coordinate: Coordinate, numRepeats: number): CoordinateList; // function id:7760

export function RepeatCoordinates(coordinateList: CoordinateList, numRepeats: number): CoordinateList; // function id:7782

export class InputCoordinateIterator extends StlIterator<vector<Coordinate>,Coordinate> { } // typedef id:7869


export class Layer { // class id:7879
	GetInputDimension(): number; // member id:7958
	GetOutputDimension(): number; // member id:7973
	Compute(inputs: vector<vector<number>>, outputs: vector<number>): void; // member id:7988
	GetInputCoordinateIterator(index: number): CoordinateIterator; // member id:8012
	GetRequiredLayerSize(layerIndex: number): number; // member id:8032
	GetTypeName(): string; // member id:8052
	GetRuntimeTypeName(): string; // member id:8067
	GetTypeFactory(): TypeFactory<Layer>; // member id:8082
	Read(deserializer: XMLDeserializer): void; // member id:8096
	Write(serializer: XMLSerializer): void; // member id:8116
}


export class Map { // class id:8190
	constructor(map: Map); // ctor id:8248
	constructor(layers: Model, outputCoordinates: CoordinateList); // ctor id:8267
	Compute(input: vector<number>): vector<number>; // member id:8301
	GetOutputCoordinateList(): CoordinateList; // member id:8318
	GetMap(): Map; // member id:8330
}


export class Model { // class id:8412
	constructor(); // ctor id:8470
	constructor(model: Model); // ctor id:8484
	NumLayers(): number; // member id:8502
	GetRequiredLayerSize(layerIndex: number): number; // member id:8514
	GetLayer(layerIndex: number): Layer; // member id:8531
	Save(inputModelFile: string): void; // member id:8548
	GetModel(): Model; // member id:8565
	GetModel(): Model; // member id:8577
}


export function BuildCoordinateList(model: Model, inputLayerSize: number, coordinateListString: string): CoordinateList; // function id:8607

export class IVector { // class id:8864
	Size(): number; // member id:8955
	Norm2(): number; // member id:8970
	AddTo(other: vector<number>, scalar: number): void; // member id:8985
	AddTo(other: vector<number>): void; // member id:9010
	AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // member id:9032
	AddTo(p_other: any /*!!!p.double*/): void; // member id:9061
	Dot(other: vector<number>): number; // member id:9084
	Dot(p_other: number): number; // member id:9104
}


// skipping template DenseDataVector id:9263


export class FloatDataVector { // class id:9673
}


export class DoubleDataVector { // class id:9796
}


// skipping template SparseDataVector id:10046


export class SparseDoubleDataVector { // class id:10406
}


export class SparseFloatDataVector { // class id:10529
}


export class SparseShortDataVector { // class id:10652
}


// skipping template SupervisedExample id:10902


// skipping template operator << id:11157


export class GenericSupervisedExample extends SupervisedExample<IDataVector> { } // typedef id:11181


// skipping template DenseDataVector id:12286


export function AppendEntry(index: number, value: number): void; // function id:12339

export function AppendEntry(index: number): void; // function id:12366

export function Reset(): void; // function id:12388

export function Size(): number; // function id:12402

export function NumNonzeros(): number; // function id:12416

export function Norm2(): number; // function id:12431

export function AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // function id:12444

export function AddTo(p_other: any /*!!!p.double*/): void; // function id:12470

export function AddTo(other: vector<number>, scalar: number): void; // function id:12502

export function AddTo(other: vector<number>): void; // function id:12526

export function Dot(p_other: number): number; // function id:12544

export function Dot(other: vector<number>): number; // function id:12574

export function GetIterator(): Iterator; // function id:12592

export function Print(os: ostream): void; // function id:12605

export function Clone(): unique_ptr<IDataVector>; // function id:12623

export function ToArray(): vector<number>; // function id:12636

export class DenseSupervisedExample { // class id:12800
	constructor(); // ctor id:12917
	constructor(other: SupervisedExample<DoubleDataVector>); // ctor id:12932
	constructor(other: SupervisedExample<DoubleDataVector>); // ctor id:12955
	constructor(dataVector: shared_ptr<DoubleDataVector>, label: number, weight: number); // ctor id:12972
	constructor(dataVector: shared_ptr<DoubleDataVector>, label: number); // ctor id:13001
	GetDataVector(): DoubleDataVector; // member id:13061
	GetWeight(): number; // member id:13074
	GetLabel(): number; // member id:13087
	Print(os: ostream): void; // member id:13100
}


export class GenericRowDataset { // class id:14492
	constructor(); // ctor id:14552
	constructor(other: GenericRowDataset); // ctor id:14567
	constructor(other: GenericRowDataset); // ctor id:14588
	constructor(dataset: GenericRowDataset); // ctor id:14623
	NumExamples(): number; // member id:14641
	GetMaxDataVectorSize(): number; // member id:14653
	GetExample(index: number): GenericSupervisedExample; // member id:14665
	GetDenseSupervisedExample(index: number): SupervisedExample<DoubleDataVector>; // member id:14682
	GetIterator(firstExample: number, numExamples: number): GenericRowIterator; // member id:14699
	GetIterator(firstExample: number): GenericRowIterator; // member id:14725
	GetIterator(): GenericRowIterator; // member id:14748
	AddExample(example: GenericSupervisedExample): void; // member id:14763
	RandomPermute(rng: default_random_engine): void; // member id:14780
	RandomPermute(rng: default_random_engine, count: number): void; // member id:14800
}


export class IDataVectorPtr { // class id:14910
	constructor(); // ctor id:15022
	constructor(Nptr: any); // ctor id:15036
	constructor(Ptr: unique_ptr<IDataVector>); // ctor id:15056
	constructor(Right: unique_ptr<IDataVector>); // ctor id:15077
	release(): unique_ptr<IDataVector>; // member id:15124
	reset(ptr: unique_ptr<IDataVector>): void; // member id:15136
	reset(): void; // member id:15157
	swap(_Right: unique_ptr<IDataVector>): void; // member id:15172
}


// skipping template DenseDataVector id:15501


export function AppendEntry(index: number, value: number): void; // function id:15554

export function AppendEntry(index: number): void; // function id:15581

export function Reset(): void; // function id:15603

export function Size(): number; // function id:15617

export function NumNonzeros(): number; // function id:15631

export function Norm2(): number; // function id:15646

export function AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // function id:15659

export function AddTo(p_other: any /*!!!p.double*/): void; // function id:15685

export function AddTo(other: vector<number>, scalar: number): void; // function id:15717

export function AddTo(other: vector<number>): void; // function id:15741

export function Dot(p_other: number): number; // function id:15759

export function Dot(other: vector<number>): number; // function id:15789

export function GetIterator(): Iterator; // function id:15807

export function Print(os: ostream): void; // function id:15820

export function Clone(): unique_ptr<IDataVector>; // function id:15838

export function ToArray(): vector<number>; // function id:15851

// skipping template DenseDataVector id:16072


export function AppendEntry(index: number, value: number): void; // function id:16125

export function AppendEntry(index: number): void; // function id:16152

export function Reset(): void; // function id:16174

export function Size(): number; // function id:16188

export function NumNonzeros(): number; // function id:16202

export function Norm2(): number; // function id:16217

export function AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // function id:16230

export function AddTo(p_other: any /*!!!p.double*/): void; // function id:16256

export function AddTo(other: vector<number>, scalar: number): void; // function id:16288

export function AddTo(other: vector<number>): void; // function id:16312

export function Dot(p_other: number): number; // function id:16330

export function Dot(other: vector<number>): number; // function id:16360

export function GetIterator(): Iterator; // function id:16378

export function Print(os: ostream): void; // function id:16391

export function Clone(): unique_ptr<IDataVector>; // function id:16409

export function ToArray(): vector<number>; // function id:16422

// skipping template SparseDataVector id:16619


export function AppendEntry(index: number, value: number): void; // function id:16679

export function Reset(): void; // function id:16702

export function Size(): number; // function id:16716

export function NumNonzeros(): number; // function id:16729

export function Norm2(): number; // function id:16744

export function AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // function id:16757

export function AddTo(p_other: any /*!!!p.double*/): void; // function id:16783

export function AddTo(other: vector<number>, scalar: number): void; // function id:16815

export function AddTo(other: vector<number>): void; // function id:16839

export function Dot(p_other: number): number; // function id:16857

export function Dot(other: vector<number>): number; // function id:16887

export function GetIterator(): SparseDataVector<number,CompressedIntegerList>; // function id:16905

export function Print(os: ostream): void; // function id:16917

export function Clone(): unique_ptr<IDataVector>; // function id:16935

export function ToArray(): vector<number>; // function id:16948

// skipping template SparseDataVector id:17145


export function AppendEntry(index: number, value: number): void; // function id:17205

export function Reset(): void; // function id:17228

export function Size(): number; // function id:17242

export function NumNonzeros(): number; // function id:17255

export function Norm2(): number; // function id:17270

export function AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // function id:17283

export function AddTo(p_other: any /*!!!p.double*/): void; // function id:17309

export function AddTo(other: vector<number>, scalar: number): void; // function id:17341

export function AddTo(other: vector<number>): void; // function id:17365

export function Dot(p_other: number): number; // function id:17383

export function Dot(other: vector<number>): number; // function id:17413

export function GetIterator(): SparseDataVector<number,CompressedIntegerList>; // function id:17431

export function Print(os: ostream): void; // function id:17443

export function Clone(): unique_ptr<IDataVector>; // function id:17461

export function ToArray(): vector<number>; // function id:17474

// skipping template SparseDataVector id:17671


export function AppendEntry(index: number, value: number): void; // function id:17731

export function Reset(): void; // function id:17754

export function Size(): number; // function id:17768

export function NumNonzeros(): number; // function id:17781

export function Norm2(): number; // function id:17796

export function AddTo(p_other: any /*!!!p.double*/, scalar: number): void; // function id:17809

export function AddTo(p_other: any /*!!!p.double*/): void; // function id:17835

export function AddTo(other: vector<number>, scalar: number): void; // function id:17867

export function AddTo(other: vector<number>): void; // function id:17891

export function Dot(p_other: number): number; // function id:17909

export function Dot(other: vector<number>): number; // function id:17939

export function GetIterator(): SparseDataVector<number,CompressedIntegerList>; // function id:17957

export function Print(os: ostream): void; // function id:17969

export function Clone(): unique_ptr<IDataVector>; // function id:17987

export function ToArray(): vector<number>; // function id:18000

export class SGDIncrementalTrainerParameters { // class id:18767
	regularization: number; // member id:18826
}


// skipping template SGDIncrementalTrainer id:18839


export class LinearPredictor { // class id:18967
	constructor(dim: number); // ctor id:19021
	GetVector(): DoubleVector; // member id:19037
	GetVector(): DoubleVector; // member id:19051
	GetBias(): number; // member id:19063
	GetBias(): number; // member id:19077
	GetDimension(): number; // member id:19089
	Predict(dataVector: IDataVector): number; // member id:19102
	Scale(scalar: number): void; // member id:19119
	Reset(): void; // member id:19136
	AddToModel(model: Model, inputCoordinates: CoordinateList): CoordinateList; // member id:19148
}


export class DecisionTreePredictor { // class id:19275
	constructor(rootOutputValue: number); // ctor id:19383
	NumNodes(): number; // member id:19399
	NumInteriorNodes(): number; // member id:19411
	GetRoot(): Node; // member id:19423
	Predict(dataVector: IDataVector): number; // member id:19436
	AddToModel(model: Model, inputCoordinates: CoordinateList): CoordinateList; // member id:19453
}


// skipping template StlIterator id:19521


// skipping template AnyIterator id:19608


// skipping template AnyIterator id:19619


export function GetRandomEngines(num: number, seed_string: string): vector<default_random_engine>; // function id:19809

export function GetRandomEngines(num: number): vector<default_random_engine>; // function id:19833

export function GetRandomEngines(): vector<default_random_engine>; // function id:19854

export function GetRandomEngine(seed_string: string): default_random_engine; // function id:19867

export function GetRandomEngine(): default_random_engine; // function id:19886

export class LinearPredictorProxy { // class id:20464
	constructor(pred: shared_ptr<LinearPredictor>); // ctor id:20515
	GetPred(): LinearPredictor; // member id:20532
}


export class LogLossSGDTrainer { // class id:20620
	constructor(dim: number, lossFunction: LogLoss, parameters: SGDIncrementalTrainerParameters); // ctor id:20685
	Update(exampleIterator: GenericRowIterator): void; // member id:20709
	GetPredictor(): shared_ptr<LinearPredictor>; // member id:20727
}


export class HingeLossSGDTrainer { // class id:20817
	constructor(dim: number, lossFunction: HingeLoss, parameters: SGDIncrementalTrainerParameters); // ctor id:20882
	Update(exampleIterator: GenericRowIterator): void; // member id:20906
	GetPredictor(): shared_ptr<LinearPredictor>; // member id:20924
}


export class SquaredLossSGDTrainer { // class id:20996
	constructor(dim: number, lossFunction: SquaredLoss, parameters: SGDIncrementalTrainerParameters); // ctor id:21061
	Update(exampleIterator: GenericRowIterator): void; // member id:21085
	GetPredictor(): shared_ptr<LinearPredictor>; // member id:21103
}


export class DataLoadArguments { // class id:21188
	inputDataFile: string; // member id:21250
	dataDimension: string; // member id:21263
	parsedDataDimension: number; // member id:21276
}


export class ParsedDataLoadArguments { // class id:21289
	AddArgs(parser: CommandLineParser): void; // member id:21362
	PostProcess(parser: CommandLineParser): CommandLineParseResult; // member id:21380
}


export class ModelLoadArguments { // class id:21464
	inputModelFile: string; // member id:21526
}


export class ParsedModelLoadArguments { // class id:21538
	AddArgs(parser: CommandLineParser): void; // member id:21611
	PostProcess(parser: CommandLineParser): CommandLineParseResult; // member id:21629
}


export class MapLoadArguments { // class id:21711
	modelLoadArguments: ParsedModelLoadArguments; // member id:21773
	coordinateListString: string; // member id:21785
}


export class ParsedMapLoadArguments { // class id:21797
	AddArgs(parser: CommandLineParser): void; // member id:21870
	PostProcess(parser: CommandLineParser): CommandLineParseResult; // member id:21888
}


export function GetDataIterator(dataFilename: string): AnyIterator<GenericSupervisedExample>; // function id:21960

export function GetDataIterator(dataFilename: string, dimension: number, coordinateListString: string, modelFilename: string): AnyIterator<GenericSupervisedExample>; // function id:21978

export function GetDataset(dataFilename: string): GenericRowDataset; // function id:22007

export function GetMappedDataset(dataFilename: string, map: Map): GenericRowDataset; // function id:22025

export function GetDataset(dataFilename: string, mapFilename: string): GenericRowDataset; // function id:22044

export function LoadModel(filename: string): Model; // function id:22118

export class LayerPtr { // class id:22205
	constructor(); // ctor id:22317
	constructor(Nptr: any); // ctor id:22331
	constructor(Ptr: unique_ptr<Layer>); // ctor id:22351
	constructor(Right: unique_ptr<Layer>); // ctor id:22372
	release(): unique_ptr<Layer>; // member id:22419
	reset(ptr: unique_ptr<Layer>): void; // member id:22431
	reset(): void; // member id:22452
	swap(_Right: unique_ptr<Layer>): void; // member id:22467
}


export class Feature { // class id:22633
	Id(): string; // member id:22713
	GetOutputDimension(): number; // member id:22726
	HasOutput(): boolean; // member id:22739
	GetOutput(): vector<number>; // member id:22753
	Reset(): void; // member id:22765
	GetWarmupTime(): number; // member id:22778
	GetDescription(): vector<string>; // member id:22791
	GetColumnDescriptions(): vector<string>; // member id:22803
	GetInputFeatures(): vector<any /*!!!p.features::Feature*/>; // member id:22816
	GetRegisteredTypes(): vector<string>; // member id:22828
	constructor(inputs: vector<any /*!!!p.features::Feature*/>); // ctor id:22872
	constructor(Id: string, inputs: vector<any /*!!!p.features::Feature*/>); // ctor id:22891
}


export class InputFeature { // class id:23279
	constructor(size: number); // ctor id:23352
	constructor(id: string, size: number); // ctor id:23372
	SetValue(val: vector<number>): void; // member id:23395
	FeatureType(): string; // member id:23412
	feature_name: number; // member id:23426
	Create(params: vector<string>, prev_features: FeatureMap): unique_ptr<Feature>; // member id:23444
}


export class MagnitudeFeature { // class id:23598
	constructor(inputFeature: any /*!!!p.features::Feature*/); // ctor id:23671
	constructor(id: string, inputFeature: any /*!!!p.features::Feature*/); // ctor id:23691
	Create(params: vector<string>, previousFeatures: FeatureMap): unique_ptr<Feature>; // member id:23714
	FeatureType(): string; // member id:23736
	feature_name: number; // member id:23750
}


export class DataVector extends DoubleVector { } // typedef id:23870


export class FeatureSet { // class id:23880
	constructor(); // ctor id:23945
	ProcessInputData(inData: DataVector): boolean; // member id:23968
	HasOutput(): boolean; // member id:23985
	GetOutput(): DataVector; // member id:23998
	Reset(): void; // member id:24011
	GetInputFeature(): InputFeature; // member id:24023
	GetOutputFeature(): Feature; // member id:24036
	SetOutputFeature(output: any /*!!!p.features::Feature*/): void; // member id:24049
	GetFeature(featureId: string): Feature; // member id:24067
	CreateFeatureFromDescription(description: vector<string>): Feature; // member id:24103
	AddToModel(model: Model, inputCoordinates: CoordinateList): CoordinateList; // member id:24158
}


export function InitializeFeatures(): void; // function id:24274

export class FeaturePtr { // class id:24357
	constructor(); // ctor id:24469
	constructor(Nptr: any); // ctor id:24483
	constructor(Ptr: unique_ptr<Feature>); // ctor id:24503
	constructor(Right: unique_ptr<Feature>); // ctor id:24524
	release(): unique_ptr<Feature>; // member id:24571
	reset(ptr: unique_ptr<Feature>): void; // member id:24583
	reset(): void; // member id:24604
	swap(_Right: unique_ptr<Feature>): void; // member id:24619
}


export class InputFeaturePtr { // class id:24717
	constructor(); // ctor id:24829
	constructor(Nptr: any); // ctor id:24843
	constructor(Ptr: unique_ptr<InputFeature>); // ctor id:24863
	constructor(Right: unique_ptr<InputFeature>); // ctor id:24884
	release(): unique_ptr<InputFeature>; // member id:24931
	reset(ptr: unique_ptr<InputFeature>): void; // member id:24943
	reset(): void; // member id:24964
	swap(_Right: unique_ptr<InputFeature>): void; // member id:24979
}


export class MagnitudeFeaturePtr { // class id:25075
	constructor(); // ctor id:25187
	constructor(Nptr: any); // ctor id:25201
	constructor(Ptr: unique_ptr<MagnitudeFeature>); // ctor id:25221
	constructor(Right: unique_ptr<MagnitudeFeature>); // ctor id:25242
	release(): unique_ptr<MagnitudeFeature>; // member id:25289
	reset(ptr: unique_ptr<MagnitudeFeature>): void; // member id:25301
	reset(): void; // member id:25322
	swap(_Right: unique_ptr<MagnitudeFeature>): void; // member id:25337
}


