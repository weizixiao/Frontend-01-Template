# 每周总结可以写在这里


### 检查数字符号
- 对于浮点数的运算，要考虑精度损失的影响，自己设定个可接受精度丢失,类似于Number.EPSILON
```
function check(zero) {

}
```

#### Expressions
- Grammar
    - Grammar Tree vs Priority(所谓优先级是用表达式生成树的方式实现，以下优先级由低到高)
        ```
        <!-- 语法树 -->
            +
        1       *
            2       3
        1 + 2 * 3
        ```
        - + -
        - * /
        - ()
    - Left hand side & Right hand side(Left-Hand-Side Expressions p201)
        - Left-Hand-Side（左值表达式，在等号左边）,运行时时Reference，语法上是leftHandSide
            - Member(成员访问类)
                - a.b
                    - .运算会装箱操作 "abc".length  期间把"abc" =》 new String("abc")
                - a[b] 动态改变，等于java反射
                - foo`string`
                    ```
                        var a = "weizi";
                        function foo () {
                            console.log(arguments);
                        }
                        foo`hello ${a}!` // [["hello", "!"], "weizi"]
                    ```
                - super.b  访问类静态属性
                - super['b']
                - new.target
                    ```
                    function foo() {
                        console.log(new.target); // new.target 函数外不能调用
                    }
                    var fakeObject = {};
                    Object.setPrototypeOf(fakeObject, foo.prototype);
                    fakeObject.constructor = foo;
                    foo.apply(fakeObject); // undefined
                    foo() // undefined
                    new foo() // foo {}
                    console.log(fakeObject instanceof foo);
                    ```
                - new Foo()
            - New
                - new Foo
                ```
                    function cls1 (s) {
                        console.log("s1", s);
                    }
                    function cls2(s) {
                        console.log("s2", s);
                        return cls1;
                    }
                    console.log(new cls2("name")); // function cls1
                    console.log(new new cls2("name1")); // cls1 {}
                ```
            - call Expressions (优先级比new更低)
                ```
                new a()['b']
                ```
                - foo()
                - super()
                - foo()['b']
                - foo().b
                - foo()`abs`
        - Right-Hand-Side
            - update
                - a++
                - a--
                - --a
                - ++a
            - unary(单目运算)
                - delete a.b
                - void foo()
                    - 后续不管接什么，都是undefined，经常替代var a = undefined
                    - 改变语法结构，IIFE void(function(){}())
                - typeof a
                    ```
                    typeof function() {} // function
                    typeof null // object
                    <!-- 判断类型 -->
                    Object.prototype.toString 无法判断原始类型和包装类型
                    typeof 判断不一致
                    ```
                - +a
                - -a
                - ~a
                - !a
                - await a 
            - **
            - Multiplicatve * / %
            - Additive + -
            - shift  << >>  >>>
            - Relationship < > <= >=  instanceof in
            - equality   == !=  === !==
            - bitwise & ^ |
            - logical  && ||
            - conditional  ? : 三母运算 
- Runtime
    - Type Convertion

        |           | Number              | String            | Boolean   | Undefined | Null | Object | Symbol |
        | --------- | ------------------- | ----------------- | --------- | --------- | ---- | ------ | ------ |
        | Number    | -                   |                   | 0 false   | x         | x    | Boxing | x      |
        | String    |                     | -                 | ""  false | x         | x    | Boxing | x      |
        | Boolean   | true 1      false 0 | 'true' 'false'    | -         | x         | x    | Boxing | x      |
        | Undefined | NaN                 | 'Undefined'       | false     | -         | x    | x      | x      |
        | Null      | 0                   | 'null'            | false     | x         | -    | x      | x      |
        | Object    | valueOf             | valueOf  toString | true      | x         | x    | -      | x      |
        | Symbol    | x                   | x                 | x         | x         | x    | Boxing | -      |

        - Boxing & UnBoxing
            - Boxing
                - String Boolean Number 装箱 
                    ```
                        var a = "wee";
                        a.length;  // .运算符自动装箱
                        new String("abc");
                    ```
                - Symbol
                    ```
                        <!-- 不能new -->
                        Object(Symbol("bac")); // Symbol对象
                    ```
            - UnBoxing
                - ToPremitive
                - toString vs valueOf
                ```
                    1 + {}; // "1[object Object]"
                    1 + {valueOf: function () { return 1}}; // 2
                    1 + {toString: function () { return 1}}; // 2
                    1 + {valueOf: function () { return 2},toString: function () { return 1}}; // 3
                    1 + {valueOf: function () { return "2"},toString: function () { return 1}}; // 12
                    1 + {[Symbol.toPrimitive]: function() {return 6},valueOf: function () { return 2},toString: function () { return 1}}; // 7
                    1 + {valueOf: function () { return {}},toString: function () { return 1}}; // 2
                    <!-- 通常情况：自动拆箱，优先使用valueOf的值，然后使用toString的值，
                        但是如果设定了Symbol.toPrimitive，那么优先级是Symbol.toPrimitive最高；
                        1、如果有Symbol.toPrimitive，只调用Symbol.toPrimitive；
                        2、如果有valueOf和toString，valueOf返回的是基本类型，那么使用valueOf，但是如果valueOf返回的是对象类型，使用toString
                     -->
                ```
    - Reference
        - Object
        - key
        - delete
        - assign


​
#### Statement
- Grammar
    - 简单语句
        - ExpressionStatement (表达式)
        - EmptyStatement （空语句）
        - DebuggerStatement （断点语句）
        - ThrowStatement
        - ContinueStatement
        - BreakStatement
        - ReturnStatement
        ```
            <!-- 对应以上 -->
            var a = 1 + 2; // 
            ;
            debugger;
            throw a;
            continue;
            break;
            return;
            return 1 + 2;
        ```
    - 组合语句
        - 复合语句
            - BlockStatement
                ```
                <!-- • [[type]]: normal
                • [[value]]: --
                • [[target]]: -- -->
                {
                    ...
                    ...
                    ...
                }
                ```
            - IfStatement
            - SwitchStatement
            - IterationStatement
            - WithStatement
            - LabelledStatement
            - TryStatement
        - Iteration（带标签的组合语句）
            - while( ... ) ...
            - do ... while( ... );
            - for( ... ; ... ; ...) ...
            ```
            <!-- for相当于有两层，let i = 0; i < 10; i++在父作用域中声明 -->
            for (let i = 0; i < 10; i++){
                let i = 0;
                console.log(i); // 0
            }
            <!-- 类似 -->
            {
                lei i = 0;
                {
                    lei i = 0;
                    console.log(i);
                }
            }
            ```
            - for( ... in ... ) ...
            - for( ... of ... ) ...   gengrator关联，需要Symbol.iterator
        - 标签、循环、break、continue
            - LabelledStatement
            - IterationStatement
            - ContinueStatement
            - BreakStatement
            - SwitchStatement
            ```
                <!-- [[type]]: break continue
                [[value]]: --
                [[target]]: label -->
                function Class() {
                    public: this.a = 1;
                    this.b = 2;
                    private: var x = 3;
                    var y = 4;
                }
                new Class()
            ```
        - try
            ```
                <!-- 作用域{}，在代码中的范围，而上下文是，执行时，需要的上下文对象 -->
                <!-- [[type]]: return
                [[value]]: --
                [[target]]: label -->
                try {
                    ...
                    throw ...
                }catch(e) {
                    ...
                }finally {
                    ...
                }
            ```
    - 声明
        - FunctionDeclaration
        ```
            <!-- 函数声明 -->
            function foo () {}
            <!-- 函数表达式 -->
            var foo = function () {}
        ```
        - GeneratorDeclaration
        ```
            function* foo() {
                yield 1;
            }
            var a = foo();
            a.next();
        ```
        - AsyncFunctionDeclaration
        - AsyncGeneratorDeclaration
        ```
            <!-- async function* () {
                yeild 10;
                await ...;
            } -->
            function sleep(d) {
                return new Promise(resolve => setTimeout(resolve, d));
            }

            async function* foo() {
                var i = 0;
                while (true) {
                    yield i++;
                    await sleep(1000);
                }
            }

            void async function() {
                var g = foo();
                for await(let e of g) {
                    console.log(e);
                }
            }() 
        ```
        - VariableStatement
        ```
            var x = 0;
            function foo() {
                var o = { x: 1 };
                x = 2;
                with(o) {
                    <!-- 有var，函数内部的子结构也会提升，提升到var o里面 -->
                    //var x = 3;  // 输出2  0
                    x = 3; // 2  2
                }
                console.log(x);
            }
            foo(); // 2
            console.log(x);  // 0
        ```
        - ClassDeclaration
        - LexicalDeclaration
- Runtime
    - Completion Record
        - [[type]]: normal, break, continue, return, or throw
        - [[value]]: Types
        - [[target]]: label
    - Lexical Environment


### Object
class base object
book: 面向对象设计

object in javascript
- key
    - Symbol
    - string
- property
    - Data（数据行属性）
        - [[ value ]]
        - writeable
        - enumerable
        - configurable
    - Accessor（访问行属性）
        - get
        - set
        - enumerable
        - configurable
- 原型链条
    当前对象无属性，会向上找，找到Object.property
- API/Grammar
    - {} . [] definedProperty
    - Object.create / Object.setPrototypeOf / Object.getPrototypeOf
    - new / calss / extends
    - new / function / prototype
- functiton Object
    带有[[call]]是函数，带有[[constructor]]是构造函数
- Special Object
    - array [[length]]
    - Object.prototype


