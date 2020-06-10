### 动画与绘制

- Animation
    - @keyframes定义
    - animation： 使用
    ```
    // keyframes关键帧
    @keyframes mykf {
        from {
            background: red;
        }
        to {
            background: yellow;
        }
    }

    div {
        animation: mykf 5s infinite;
    }
    ```
    普通电影使用48帧播放，游戏60帧
    - 属性
        - animation-name 时间曲线
        - animation-duration 时间的时长
        - animation-timing-function 动画的时间曲线
        - animation-delay 动画开始前的延迟
        - animation-iteration-count 动画的播放次数
        - animation-direction 动画的方向
    - keyframes
        ```
            @keyframes mykf {
                0% { top:0; transition: top ease }
                50% { top:30px; transition: top ease-in }
                75% { top:10px; transition: top ease-out }
                100% { top:0px; transition: top linear }
            }
       ```
- transition
    - 属性
        - transition-property 要变换的属性
        - transition-duration 要变换的时长
        - transition-timing-function 时间曲线
        - transition-delay 延迟


### 渲染与颜色

### 形状
- border
- border-radius
- box-shadow
用图形的时候，用data uri+svg(svg图片)



### 作业
getComputedStyle(document.body)
分类属性
