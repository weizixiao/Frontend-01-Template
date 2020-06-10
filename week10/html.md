### 重学HTML
- HTML定义：XML与HTML
    - quot "&#34;"   U+0022
    - amp  "&#38;#38;"   U+0026
    - lt   "&#38;#60;"   U+003C
    - gt   "&#62;"       U+003E
- 空格不允许合并，write-space: pre-warp,或者用pre标签包裹
- HTML标签，原定写论文标签
- 参照http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html 写html语意化结构


### HTML合法元素
- Element: <tagname>... </tagname>
- Text: text
- Comment: <!-- comments -->
- DocumentType: <!Doctype html>
- ProcessingInstruction: <?a 1?>
- CDATA: <![CDATA[]]>

### 字符引用
- &#161;
- &amp;
- &lt;
- &quot;


### 重学DOM
dom树的节点都是Node，Node包含
- Element：元素型节点，即标签相对应
    - HTMLElement
    - SVGElement
- Document：文档根节点
- CharacterData：字符数据
    - Text：文本节点
    - Comment：注释
    - ProcessingInstruction：处理信息
- DocumentFragment：文档片段
- DocumentType：文档类型

### 导航类操作
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

### 修改操作
- appendChild
- insertBefore
- removeChild
- replaceChild

### 高级操作
- compareDocumentPosition 是一个用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点
- isEqualsNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点，实际在javaScript中可以用“===”
- cloneNode 复制一个节点，如果传入参数true，则回连同类元素做深拷贝

### Events



### Browser Api
- DOM
    - DOM Tree
    - Events
    - Range
- CSSOM
- BOM
- Web Animation
- Crypto