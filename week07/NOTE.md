# 每周总结可以写在这里
#### 主轴和交叉轴
主轴是元素的排布方向，交叉轴是与主轴垂直的方向
- flex-direction: row
    - Main: width x left right(主轴是从左到右)
    - Cross: height y top bottom(交叉轴是从上到下)
- flex-direction: column
    - Main: height y top bottom(主轴是从上到下)
    - Cross: width x left right(交叉轴是从左到右)

- 初始化基础数据
    - mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase等
- 收集元素进行
    - 根据主轴尺寸mainSize，把元素分进行
    - 若设置了no-warp，则强行分配进第一行
- 计算主轴
    - 找出所有felx元素
    - 把主轴方向的剩余尺寸按比例分配给这些元素
    - 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
- 计算交叉轴

#### 浏览器绘制
- 绘制单个元素
    - 绘制需要依赖一个图形环境
    - 我们这里采用images
    - 绘制在一个viewport上进行
    - 与绘制相关属性，background-color,border,background-image等
- 绘制dom



