# 配置项

探索 `html2canvas` 不同的可用的配置项。

这些是 `html2canvas` 所有可用的配置项。

| 属性名                 | 默认值                  | 描述                                                                                     |
| ---------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| allowTaint             | false                   | 是否允许不同源的图片污染画布                                                             |
| backgroudColor         | #ffffff                 | 画布背景颜色，如果 DOM 中没有指定，则默认为白色。设置 null 则为透明                      |
| canvas                 | null                    | 现有的 canvas 元素，用作绘图的基础                                                       |
| foreignObjectRendering | false                   | 如果浏览器支持 ForeignObject rendering，是否使用它                                       |
| imageTimeout           | 15000                   | 加载图片超时（毫秒）。设置 0 关闭超时                                                    |
| ignoreElements         | (element) => false      | 布尔函数，用于从渲染中删除匹配元素。                                                     |
| logging                | true                    | 启用日志记录以进行调试                                                                   |
| onclone                | null                    | 在克隆文档流进行渲染时调用的回调函数，可用于修改将在不影响原始源文档流的情况下呈现的内容 |
| proxy                  | null                    | Url 到代理，用于加载跨域图片资源。如果留空，则不会加载跨域图片。                         |
| removeContainer        | true                    | 是否清理克隆的 DOM 元素，html2canvas 暂时创建。                                          |
| scale                  | window.devicePixelRatio | 用于渲染的比例，默认为浏览器设备像素比率。                                               |
| useCORS                | false                   | 是否尝试使用 CORS 从服务器加载图片                                                       |
| width                  | Element.width           | canvas 画布宽度                                                                          |
| height                 | Element.height          | canvas 画布高度                                                                          |
| x                      | Element.x-offset        | 裁剪画布 x 坐标                                                                          |
| y                      | Element.y-offset        | 裁剪画布 y 坐标                                                                          |
| scrollX                | Element.scrollX         | 渲染元素时使用的 X 滚动位置（比如元素使用 position: fixed）                              |
| scrollY                | Element.scrollY         | 渲染元素时使用的 Y 滚动位置（比如元素使用 position: fixed）                              |
| windowWidth            | Window.innerWidth       | 渲染 Element 时要使用的窗口宽度，这可能会影响媒体查询等内容                              |
| windowHeight           | Window.innerHeight      | 渲染 Element 时要使用的窗口高度，这可能会影响媒体查询等内容                              |

如果你希望排除某些元素进行渲染，你可以给这些元素添加 `data-html2canvas-ignore` 属性，`html2canvas` 会它们从渲染中排除。
