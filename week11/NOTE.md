### Range API
属于DOMApi的一种
```
// html子元素逆序
function reverseChildren(element) {
    const l = element.length;
    while(--l > 0) {
        element.appendChild(element[l]);
    }
}
```

```
var range = new Range();
range.setStart(element, 9);
range.setEnd(element, 4);

var range = document.getSelection().getRangeAt(0);

range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter
range.selectNode
range.selectNodeContents


var fragment = range.extractContents()
range.insertNode(document.createTextNode("aaaa"))
```

```
function reverseChildren (element) {
    let range = new Range();
    range.selectNodeContents(element);

    let fragment = range.extractContents();
    let l = fragment.childNodes.length;
    while (l-- > 0) {
        fragment.appendChild(fragment.childNodes[l]);
    }
    element.appendChild(fragment);
}
```

### CSSOM
document.styleSheets
- document.styleSheets
- 案例
```
<style>
    a {
        color: red;
    }
</style>
// data uri协议
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue&7D">
```
#### Rules
- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p { color: red ;}", 0)
- document.styleSheets[0].removeRule(0)

- CSSStyleRule
    - selectorText String
    - style K-V结构
- getComputedStyle
    - window.getComputedStyle(elt, pseudoEdit);
    - elt 想要获取的元素
    - pseudoElt

### CSSOM view API
- scorll
    - window.scrollX  // window获取滚动高度
    - window.scrollY  // window获取left滚动距离
    - window.scroll(0, 0) // 滚动到的位置
    - window.scrollBy(0, 50) // 基于当前滚动距离

    - element.scrollTop // 元素获取滚动高度
    - element.scrollLeft // 元素获取左侧滚动

- 获取元素属性
    - element.getClientRects() // 会取得多个值，根据行盒取
    - element.getBoundingClientRect() // 只会取得一个，但是height和width取值会受其他影响

- 视口高度宽度
    - window.innerHeight
    - window.innerWidth
    - document.documentElement.getBoundingClientRect()
- dpi
    - window.devicePixelRatio
