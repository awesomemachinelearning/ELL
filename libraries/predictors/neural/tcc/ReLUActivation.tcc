////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Project:  Embedded Learning Library (ELL)
//  File:     ReLUActivation.tcc (neural)
//  Authors:  Byron Changuion
//
////////////////////////////////////////////////////////////////////////////////////////////////////

namespace ell
{
namespace predictors
{
namespace neural
{
    template <typename ElementType>
    ElementType ReLUActivation<ElementType>::Apply(const ElementType input) const
    {
        return ((input > 0) ? input : 0);
    }

    template <typename ElementType>
    std::unique_ptr<ActivationImpl<ElementType>> ReLUActivation<ElementType>::Copy() const
    {
        return std::make_unique<ReLUActivation<ElementType>>();
    }
}
}
}
