# 每周总结可以写在这里
### 重学css-选择器
- 选择器语法
    - 简单选择器
        - *
        - div svg|a
        - .cls
        - #id
        - [attr=value]
        - :hover
        - ::before
    - 复合选择器
        - <简单选择器><简单选择器><简单选择器>
        - *或者div必须写在最前面
    - 复杂选择器
        - <复合选择器> <sp> <复合选择器>
        - <复合选择器> ">" <复合选择器>
        - <复合选择器> "~" <复合选择器>
        - <复合选择器> "+" <复合选择器>
        - <复合选择器> "||" <复合选择器>
- 选择器优先级
```
#id div.a#id
计数：
inline-style: 0
id：2
class、[attr=a]：1
tag：1 （标签）
[0, 2, 1, 1]
权重计算：s = 0 * N ^ 3 + 2 * N ^ 2 + 1 * N ^ 1 + 1;
N = 1000000 
注意:not不参与优先级计算，但是not(select)中的select参与优先级计算

div#a.b .c[id=x] [0, 1, 3, 1]
#a:not(#b) [0, 2, 0, 0]
*.a  [0, 0, 1, 0] *不参与优先级计算
div.a  [0, 0, 1, 1]
```

- 伪类
    - 链接/行为
        - :any-link
        - :link :visited
        - :hover
        - :active
        - :focus
        - :target
    - 树结构
        - :empty
        - :nth-child()
        - :nth-last-child()
        - :first-child :last-child :only-child
    - 逻辑型
        - :not伪类
        - :where :has
- 伪元素
    - ::before
    - ::after
    - ::first-line
    - ::first-letter
为什么first-letter可以设置float，而first-line不行？因为first-line是不确定的


### 重学css-排版
- 盒（Box）
    - 盒模型（margin,border,padding,content）
    - box-sizing
        - content-box
        - border-box
        ![](/Users/weizi/Desktop/极客时间/Frontend-01-Template/week09/box.png)

- 正常流
    - 收集盒进行
    - 计算盒在行中的排布
    - 计算行的排布

    ![](/Users/weizi/Desktop/极客时间/Frontend-01-Template/week09/flow.png)
    inline formatting context（IFC） （左侧）
    block formatting context（BFC） （右侧）
- 正常流行模型（IFC）
    - 中文和英文及盒排版，中文不管基线，英文是要基线的
    ![](/Users/weizi/Desktop/极客时间/Frontend-01-Template/week09/baseline.png)
    - float与clear
    - margin折叠
        只发生在BFC