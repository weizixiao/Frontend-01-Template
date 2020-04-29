### 特殊对象
### Function Exotic Objects
Internal Slots of Bound Function Exotic Objects
    - [[BoundTargetFunction]] 包装函数对象
    - [[BoundThis]] 调用包装函数，始终传递this的值
    - [[BoundArguments]] bing函数的参数传递

- [[Call]] ( thisArgument, argumentsList )
```
<!-- 大致的过程 -->
let F = {
    [[Call]]() {}
}
let target = F.[[BoundTargetFunction]]
let boundThis = F.[[BoundThis]]
let boundArgs = F.[[BoundArguments]]
let args = boundArgs
F.[[Call]](target, boundThis, args)
```

- [[Construct]] ( argumentsList, newTarget ) 内置构造方法
```
let F = {
    [[Construct]]() {}
}
let F = F.[[BoundTargetFunction]];
```

- BoundFunctionCreate ( targetFunction, boundThis, boundArgs )

### Array Exotic Objects
- [[DefineOwnProperty]] ( P, Desc )
- ArrayCreate ( length [ , proto ] ) 创建数组
- ArraySpeciesCreate ( originalArray, length ) 特殊创建方式
- ArraySetLength ( A, Desc )  设置数组长度

### String Exotic Objects
- [[GetOwnProperty]] ( P ) 获取属性
- [[DefineOwnProperty]] ( P, Desc )
- [[OwnPropertyKeys]] ( )
- StringCreate ( value, prototype )
- StringGetOwnProperty ( S, P )

### Arguments Exotic Objects
- [[GetOwnProperty]] ( P )
- [[DefineOwnProperty]] ( P, Desc )
- [[Get]] ( P, Receiver )
- [[Set]] ( P, V, Receiver )
- [[Delete]] ( P )
- CreateUnmappedArgumentsObject ( argumentsList )
- CreateMappedArgumentsObject ( func, formals, argumentsList, env )
- MakeArgGetter ( name, env )
- MakeArgSetter ( name, env )

### Integer-Indexed Exotic Objects
- [[GetOwnProperty]] ( P )
- [[HasProperty]] ( P )
- [[DefineOwnProperty]] ( P, Desc )
- [[Get]] ( P, Receiver )
- [[Set]] ( P, V, Receiver )
- [[OwnPropertyKeys]] ( )
- IntegerIndexedObjectCreate ( prototype, internalSlotsList )
- IntegerIndexedElementGet ( O, index )
- IntegerIndexedElementSet ( O, index, value )

### Module Namespace Exotic Objects
- [[SetPrototypeOf]] ( V )
- [[IsExtensible]] ( )
- [[PreventExtensions]] ( )
- [[GetOwnProperty]] ( P )
- [[DefineOwnProperty]] ( P, Desc )
- [[HasProperty]] ( P )
- [[Get]] ( P, Receiver )
- [[Set]] ( P, V, Receiver )
- [[Delete]] ( P )
- [[OwnPropertyKeys]] ( )
- ModuleNamespaceCreate ( module, exports )

### Immutable Prototype Exotic Objects
- [[SetPrototypeOf]] ( V )
- SetImmutablePrototype ( O, V )