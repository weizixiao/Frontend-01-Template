# 每周总结可以写在这里
### 结构化程序设计

<!-- 事件循环 -->
能送到事件循环中的代码方式有三种
- <script></script>
- setTimeout
- <script type="module"></script>

### js执行粒度
- JS Context（golbal object） => Realm
    在JS中，函数表达式和对象直接量均会创建对象，使用.做隐士转换也会创建对象，这些对象也有原型，如果没有realm，就不知道他们的原型是什么
    - Realm内部有一套完整的内置对象，Object，Array，Date都是一个realm的对象
    - Golbal下的对象
        - Value Properties of the Global Object
            - Infinity
            - NaN
            - undefined
        - Function Properties of the Global Object
            - eval ( x )
            - 
- 宏任务
- 微任务（promise， MutationObserver）
    - javascript中，只有promise和MutationObserver会产生微任务
    - js引擎内执行的js代码都属于微任务执行，js的执行队列就是微任务，而setTimeout调用的是宿主环境的代码，所以是宏任务，
        而每个promise里面的resolve产生个新的微任务

        ```
        new Promise(resolve => resolve()).then(() => {
            this.a = 3;
        }),
        funtcion () {
            return this.a;
        }
        ```

        ```
        async function afoo(){
            console.log("-2")

            await new Promise(resolve => resolve());
            console.log("-1")
        }

        new Promise(resolve => (console.log("0"), resolve()))
            .then(()=>(
                console.log("1"), 
                new Promise(resolve => resolve())
                    .then(() => console.log("1.5")) ));


        setTimeout(function(){
            console.log("2");
            
            new Promise(resolve => resolve()) .then(console.log("3"))


        }, 0)
        console.log("4");
        console.log("5");
        afoo()
        ```
- 函数调用（Execution Context）
    - ```
        import { foo } from "foo.js";
        var i = 0;
        console.log(i);
        foo();
        console.log(i);
        i++;
      ```
      ```
        <!-- 这边是无法访问上面的i的 -->
        function foo () {
            var x = 1;
            console.log(x);
        }
        export foo;
      ```
      以上代码转化为
      ```
        import { foo } from "foo.js";
        var i = 0;
        console.log(i);
            <!-- 函数调用 -->
            var x = 1;
            console.log(x);
            <!-- 函数退出 -->
        console.log(i);
        i++;
      ```
      函数调用，会形成调用栈，Execution Context Stack，当函数调用，进入一个函数时，会发生一次Execution Context的push，函数返回的时候，会发生一次pop，在执行的Execution Context叫做Running Execution Context
    - Execution Context
        - ECMAScript Code Execution Context
            - code evaluation state(async + await时需要存)
            - Function
            - Script or Module
            - Realm
            - LexicalEnvironment
                - this(箭头函数的this是和变量一起塞进去的，普通函数调用的时候塞进去的)
                - new.target
                - super
                - 变量
            - VariableEnvironment（处理var声明，主要是应付eval和with的场景）
        - Generator Execution Context
            - code evaluation state(async + await时需要存)
            - Function
            - Script or Module
            - Generator（generotor时需要）
            - Realm
            - LexicalEnvironment
            - VariableEnvironment
        - LexicalEnvironment和VariableEnvironment都是由Environment Records组成
            - Declarative Environment Records
                - Function Environment Records
                - module Environment Records
            - Global Environment Records
            - Object Environment Records
- 语句/声明
- 表达式
- 直接量/变量/this

#### 宏任务和微任务




<!-- Charles -->

### 优秀作业
- https://github.com/xiaodaobiepao/Frontend-01-Template/blob/master/week03/homework.md
- https://github.com/Yhxang/Frontend-01-Template/blob/master/week03/SpecialObject.md
- https://github.com/Ele-Peng/Frontend-01-Template/blob/master/week03/converStringToNumber.md


### http
http文档
https://tools.ietf.org/html/rfc2616

