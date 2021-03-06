////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Project:  Embedded Learning Library (ELL)
//  File:     TypeFactory.h (utilities)
//  Authors:  Ofer Dekel
//
////////////////////////////////////////////////////////////////////////////////////////////////////

#pragma once

#include "Debug.h"
#include "Exception.h"

#include <functional>
#include <memory>
#include <string>
#include <unordered_map>
#include <utility>

namespace ell
{
namespace utilities
{
    // NOTE: In the comments below, < and > are HTML escaped since the documentation is technically XML

    /// <summary>
    /// Assume that Base is a polymorpic base type, with multiple derived classes. Both the base type
    /// and the derived types must have a public static member named GetTypeName(), which returns the
    /// class name. Namely,
    ///
    /// class Base {public: static std::string GetTypeName(){ return "Base";}};
    /// class Derived1 : public Base {public: static std::string GetTypeName(){ return "Derived1";}};
    /// class Derived2 : public Base {public: static std::string GetTypeName(){ return "Derived2";}};
    ///
    /// The type factory lets the user construct instances of the derived classes by specifying their
    /// names. First, we must create a factory.
    ///
    /// TypeFactory&lt;Base&gt; factory;
    ///
    /// Note that the class template type defines the type of unique_ptr generated by the factory.
    /// Next, we register the derived classes that we want to construct.
    ///
    /// factory.AddType&lt;Derived1&gt;();
    /// factory.AddType&lt;Derived2&gt;();
    ///
    /// Now, we can construct instances of each class.
    ///
    /// auto x = factory.Construct("Derived1");
    ///
    /// x is a unique_ptr&lt;Base&gt; that points to an instance of the Derived1 class.
    /// </summary>
    ///
    /// <typeparam name="BaseType"> Type of the polymorphic base type. </typeparam>
    template <typename BaseType>
    class TypeFactory
    {
    public:
        /// <summary> Invokes the default constructor of the named type. </summary>
        ///
        /// <param name="typeName"> Name of the type to construct. </param>
        ///
        /// <returns> A std::unique_ptr to the base type, which points to the newly constructed object </returns>
        std::unique_ptr<BaseType> Construct(const std::string& typeName) const;

        /// <summary> Adds a type to the factory, with its default name. </summary>
        ///
        /// <typeparam name="RuntimeType"> Type being added. </typeparam>
        template <typename RuntimeType>
        void AddType();

        /// <summary> Adds a type to the factory, with its default name. </summary>
        ///
        /// <typeparam name="RuntimeType"> Type being added. </typeparam>
        /// <param name="typeName"> Name of the type being added. </param>
        template <typename RuntimeType>
        void AddType(const std::string& typeName);

    private:
        std::unordered_map<std::string, std::function<std::unique_ptr<BaseType>()>> _typeMap;
    };

    /// <summary>
    /// An internal class used by GenericTypeFactory
    /// </summary>
    class TypeConstructorBase
    {
    public:
        virtual ~TypeConstructorBase() = default;

    private:
        friend class GenericTypeFactory;
        template <typename BaseType>
        friend class TypeConstructor;
        template <typename BaseType>
        std::unique_ptr<BaseType> Construct() const;
    };

    /// <summary>
    /// A factory object that can create new objects given their type name and a base type to derive from.
    /// </summary>
    class GenericTypeFactory
    {
    public:
        /// <summary> Invokes the default constructor of the named type. </summary>
        ///
        /// <typeparam name="BaseType"> The base type to return. </typeparam>
        /// <param name="typeName"> Name of the type to construct. </param>
        ///
        /// <returns> A std::unique_ptr to the base type, which points to the newly constructed object </returns>
        template <typename BaseType>
        std::unique_ptr<BaseType> Construct(const std::string& typeName) const;

        /// <summary> Adds a type to the factory, with its default name. </summary>
        ///
        /// <typeparam name="RuntimeType"> Type being added. </typeparam>
        template <typename BaseType, typename RuntimeType>
        void AddType();

        /// <summary> Adds a type to the factory, with a custom name (handy for mapping old type names). </summary>
        ///
        /// <typeparam name="BaseType"> Base of the Type being added. </typeparam>
        /// <typeparam name="RuntimeType"> Type being added. </typeparam>
        /// <param name="typeName"> Name of the type being added. </param>
        template <typename BaseType, typename RuntimeType>
        void AddType(const std::string& typeName);

    private:
        std::unordered_map<std::string, std::shared_ptr<TypeConstructorBase>> _typeConstructorMap;
    };
} // namespace utilities
} // namespace ell

#pragma region implementation

namespace ell
{
namespace utilities
{
    template <typename BaseType>
    std::unique_ptr<BaseType> TypeFactory<BaseType>::Construct(const std::string& typeName) const
    {
        auto entry = _typeMap.find(typeName);
        if (entry == _typeMap.end())
        {
            throw utilities::InputException(utilities::InputExceptionErrors::invalidArgument, "type " + typeName + " not registered in TypeFactory<" + BaseType::GetTypeName() + ">");
        }

        return entry->second();
    }

    template <typename BaseType>
    template <typename RuntimeType>
    void TypeFactory<BaseType>::AddType()
    {
        std::string typeName = RuntimeType::GetTypeName();
        AddType<RuntimeType>(typeName);
    }

    template <typename BaseType>
    template <typename RuntimeType>
    void TypeFactory<BaseType>::AddType(const std::string& typeName)
    {
        static_assert(std::is_base_of<BaseType, RuntimeType>::value, "incompatible base and runtime types in TypeFactory::Add");

        DEBUG_THROW(_typeMap.find(typeName) != _typeMap.end(), std::logic_error(typeName + " has already been added to the type factory"));

        _typeMap[typeName] = []() -> std::unique_ptr<BaseType> { return (std::make_unique<RuntimeType>()); };
    }

    //
    // GenericTypeFactory
    //
    template <typename BaseType>
    class TypeConstructorDerived : public TypeConstructorBase
    {
    public:
        template <typename RuntimeType>
        static std::unique_ptr<TypeConstructorDerived<BaseType>> NewTypeConstructor()
        {
            auto result = std::make_unique<TypeConstructorDerived<BaseType>>();
            result->_createFunction = []() {
                auto runtimePtr = new RuntimeType();
                auto basePtr = dynamic_cast<BaseType*>(runtimePtr);
                return std::unique_ptr<BaseType>(basePtr);
            };
            return result;
        }

        std::unique_ptr<BaseType> Construct() const
        {
            return _createFunction();
        }

    private:
        std::function<std::unique_ptr<BaseType>()> _createFunction;
    };

    //
    // TypeConstructorBase implementation
    //
    template <typename BaseType>
    std::unique_ptr<BaseType> TypeConstructorBase::Construct() const
    {
        auto thisPtr = dynamic_cast<const TypeConstructorDerived<BaseType>*>(this);
        if (thisPtr == nullptr)
        {
            throw InputException(InputExceptionErrors::typeMismatch, std::string{ "TypeConstructorBase::Construct called with wrong type. BaseType: " } + BaseType::GetTypeName());
        }

        return thisPtr->Construct();
    }

    //
    // GenericTypeFactory implementation
    //
    template <typename BaseType>
    std::unique_ptr<BaseType> GenericTypeFactory::Construct(const std::string& typeName) const
    {
        auto baseTypeName = std::string{ BaseType::GetTypeName() };
        auto key = baseTypeName + "__" + typeName;
        auto entry = _typeConstructorMap.find(key);
        if (entry == _typeConstructorMap.end())
        {
            throw utilities::InputException(utilities::InputExceptionErrors::invalidArgument, "type " + typeName + " not registered in TypeFactory<" + BaseType::GetTypeName() + ">");
        }

        return entry->second->Construct<BaseType>();
    }

    template <typename BaseType, typename RuntimeType>
    void GenericTypeFactory::AddType()
    {
        auto typeName = RuntimeType::GetTypeName();
        AddType<BaseType, RuntimeType>(typeName);
    }

    template <typename BaseType, typename RuntimeType>
    void GenericTypeFactory::AddType(const std::string& typeName)
    {
        auto baseTypeName = std::string{ BaseType::GetTypeName() };
        auto key = baseTypeName + "__" + typeName;

        auto derivedCreator = TypeConstructorDerived<BaseType>::template NewTypeConstructor<RuntimeType>().release();
        _typeConstructorMap[key] = std::shared_ptr<TypeConstructorBase>(derivedCreator);
    }
} // namespace utilities
} // namespace ell

#pragma endregion implementation
