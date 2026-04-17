## 1. script标签放在header里和放在body底部里有什么区别？

**参考答案：**

将 `<script>` 标签放在`<head>`和 `<body>` 底部，会对页面的加载和性能产生不同的影响：

`<script>` 标签放在 `<head>` 部分

优点：

1. 预加载： 浏览器在渲染页面之前，会先下载和解析所有在 `<head>` 部分的脚本文件。这样可以确保脚本在页面加载过程中随时可以被调用。

2. 全局可用性： 一些脚本，特别是需要在页面一加载就运行的脚本，适合放在 `<head>` 中。

缺点：

1. 阻塞渲染： 浏览器在遇到 `<script>` 标签时会暂停 HTML 的解析和渲染，直到脚本下载并执行完毕。这可能会导致页面加载变慢，尤其是当脚本文件较大或者需要从远程服务器下载时。

2. 页面白屏时间延长： 用户可能会看到页面在加载过程中有一段时间的白屏，直到脚本加载完成。

`<script>` 标签放在 `<body>` 底部

优点：

1. 非阻塞渲染： 将 `<script>` 标签放在 `<body>` 底部意味着浏览器可以优先下载和渲染 HTML 内容，这样用户可以更快地看到页面内容。

2. 更好的用户体验： 用户不会因为等待脚本加载而长时间看到空白页面。页面内容会先显示出来，然后再执行脚本，这提高了页面的响应速度和用户体验。

缺点：

1. 延迟脚本执行： 如果某些脚本需要在页面加载之前运行（如某些初始化脚本），放在 `<body>` 底部可能会导致这些脚本运行延迟，影响功能。&#x20;

现代优化技术

1\. `defer` 属性： 在 `<head>` 部分使用 `<script>` 标签时，可以添加 `defer` 属性。这个属性会告诉浏览器异步下载脚本，但在页面解析完成后再执行脚本。这样既可以保持脚本全局可用，又不会阻塞页面渲染。

```javascript
<script src="script.js" defer></script>
```

2\. `async` 属性： `async` 属性也用于异步加载脚本，但它会在脚本下载完成后立即执行，不考虑页面的解析进度。这对某些独立的、不会依赖于其他脚本或 DOM 结构的脚本很有用。

```javascript
<script src="script.js" async></script>
```

总结

- `<head>` 部分： 适合需要立即执行的脚本，但可能阻塞页面渲染。

- `<body>` 底部： 适合一般脚本，能提高页面加载性能和用户体验。

- 使用 `defer` 或 `async`： 现代浏览器支持这些属性，可以同时兼顾性能和功能需求。

---

## 2. 前端性能优化指标有哪些？怎么进行性能检测？

**参考答案：**

概述

`web`性能说简单点就是网站打开速度快不快，页面中的动画够不够流畅，表单提交的速度是否够快，列表滚动页面切换是否卡顿。性能优化就是让网站变得快。

在`MDN`上对`web`性能的定义是网站或应用程序的客观度量和可感知的用户体验。比如减少页面加载时间(减少文件体积，减少`HTTP`请求，使用预加载)，让网站尽快可用(懒加载或者分片加载)，平滑的交互性(使用`CSS`替代`JS`动画，减少`UI`重绘)，感知表现(加载动画，`loading`等给用户感觉快)，性能测定(性能指标，性能测试，性能监控以便持续优化，毕竟性能优化是个持续的过程)。

页面性能关乎到用户的留存，网站的转换率，用户体验和网站的传播，甚至影响搜索排名遭到用户投诉，当然也会影响开发的效率。

**1.性能指标**

进行性能优化之前首先要知道要在哪些方面做性能优化。

首先需要了解性能指标，多快的速度才算快呢？可以使用专业的工具可量化的评估出网站或应用的性能表现。

立足于网站页面响应的生命周期，分析出造成较差性能表现的原因，最后进行技术改造，可行性分析等具体的优化措施，持续迭代优化就可以了。

事实上性能是相对的，他并不是绝对的概念。对于一个用户而言在不同的网络环境下访问页面的速度可能是不同的。即使相同的网站在懒加载的情况下也会显得快。

在讨论性能的时候精确地，可量化的指标是很重要的。但是仅仅因为一个度量标准是基于客观准备并且可以定量的度量的，并不一定意味这些度量是有用的。对于`Web`开发人员来说，如何恒量一个`Web`页面的性能一直都是一个难题。

最初，开发人员使用`Time to To Byte`。`DomContentLoaded`和`Load`这些恒量文档加载进度的指标，但他们不能直接反应用户视觉体验。

为了恒量用户视觉体验，Web标准中定义了一些性能指标。这些性能指标被各大浏览器标准化实现，例如`First Paint`和`First Contentful Paint`。

还有一些由Web孵化器社区组提出的性能指标，如`Largest COntentful Paint`, `Time to Interactive`, `First Input Delay`, `First CPU Idle`。

另外还有`Google`提出的`First Meaningful Paint`, `Speed Index`。

百度提出的`First Screen Paint`。

这些指标之间并不是毫无关联，而是在以用户为中心的目标中不断演进出来的，有的已经不再建议使用，有的被各种测试工具实现，有的则可以作为通用标准可用于生产环境测量的API。

**2.RAIL性能模型**

`RAIL`是`Response`，`Animation`，`Idle`和`Load`的首字母缩写，是一种由`Google Chrome`团队于`2015年`提出的性能模型，用于提升浏览器的用户体验和性能。

`RAIL`模型的理念是以用户为中心，最终目标并不是让你的网站在任何特定设备上都能运行很快，而是使用户满意。

`Response`: 应该尽可能快速的响应用户的操作，应在在`100ms`以内响应用户输入。

`Animation`: 在展示动画的时候，每一帧应该以`16ms`进行渲染，这样可以保持动画效果的一致性，并且避免卡顿。

`Idle`: 当使用`js`主线程的时候，应该把任务划分到执行时间小于`50ms`的片段中去，这样可以释放线程以进行用户交互。`50ms`为单位是为了保证用户在发生操作的`100ms`内做出响应。

要使网站响应迅速，动画流畅，通常都需要较长的处理时间，但以用户为中心来看待性能问题，就会发现并非所有工作都需要在响应和加载阶段完成，完全可以利用浏览器的空闲时间处理可延迟的任务，只要让用户感受不到延迟即可。利用空闲时间处理延迟可减少预加载的数据大小，以保证网站或应用快速完成加载。

`Load`: 应该在小于`1s`的时间内加载完成你的网站，并可以进行用户交互。根据网络条件和硬件的不同，用户对性能延迟的理解也有所不同，在`3G`网络需要花费更多的时间，`5s`是一个更现实的目标。

基于用户体验的性能指标其中包括以下几个比较重要的性能指标。

1. FCP (First Contentful Paint)

首次内容绘制，浏览器首次绘制来自`DOM`的内容的时间，内容必须包括文本，图片，非白色的`canvas`或`svg`，也包括带有正在加载中的`web`字体文本。这是用户第一次看到的内容。

![](<images/10. 性能优化（25题）-image-14.png>)

2.LCP (Largest Contentful Paint)

最大内容绘制，可视区域中最大的内容元素呈现到屏幕上的时间，用以估算页面的主要内容对用户的可见时间。`img`图片，`video`元素的封面，通过`url`加载到的北京，文本节点等，为了提供更好的用户体验，网站应该在`2.5s`以内或者更短的时间最大内容绘制。

![](<images/10. 性能优化（25题）-image-8.png>)

3.FID (First Input Delay)

首次输入延迟，从用户第一次与页面进行交互到浏览器实际能够响应该交互的时间，输入延迟是因为浏览器的主线程正忙于做其他事情，所以不能响应用户，发生这种情况的一个常见原因是浏览器正忙于解析和执行应用程序加载的大量计算的`JavaScript`。

![](<images/10. 性能优化（25题）-image-13.png>)

4.TTI (Time to Interactive)

网页第一次完全达到可交互状态的时间点，浏览器已经可以持续的响应用户的输入，完全达到可交互的状态的时间是在最后一个长任务完成的时间，并且在随后的`5s`内网络和主线程是空闲的。从定义上来看，中文名称叫持续可交互时间或可流畅交互时间更合适。

![](<images/10. 性能优化（25题）-image-12.png>)

5.TBT (Total Block Time)

总阻塞时间，度量了`FCP`和`TTI`之间的总时间，在该时间范围内，主线程被阻塞足够长的时间以防止输入响应。只要存在长任务，该主线程就会被视为阻塞，该任务在主线程上运行超过`50`毫秒。

线程阻塞是因为浏览器无法中断正在进行的任务，因此如果用户确实在较长的任务中间与页面进行交互，则浏览器必须等待任务完成才能响应。

![](<images/10. 性能优化（25题）-image-6.png>)

6.CLS (Cumulative Layout Shift)

累计布局位移，`CLS`会测量在页面整个生命周期中发生的每个意外的布局移位的所有单独布局移位分数的总和，他是一种保证页面的视觉稳定性从而提升用户体验的指标方案。

用人话来说就是当点击页面中的某个元素的时候，突然布局变了，手指点到了其它位置。比如想点击页面的链接，突然出现了一个`banner`。这种情况可能是因为尺寸未知的图像或者视频。

![](<images/10. 性能优化（25题）-image-11.png>)

**3.Web Vitals**

这也是谷歌指定的`web`性能指标标准, 谷歌认为之前的标准太复杂，指标太多了，在`2020`年重新进行了梳理，简化到了三个。加载性能`LCP`，交互性`FID`，视觉稳定性`CLS`。只需要做好这三个，网站的性能基本上就可以了。

测量`Web Vitals`的工具有很多，比如`Lighthouse`，`web-vitals`，浏览器插件`web vitals`。

1.Web-Vitals

```javascript
// npm install web-vitals -g

import { getLCP, getFID, getCLS } from 'web-vitals';

getCLS(conole.log)
getFID(conole.log)
getCLS(conole.log)2.
```

2.浏览器插件

谷歌浏览器可以直接在插件市场中查找并且安装`web vitals`。安装完成之后浏览器的右上角会多出插件标志，点击就会显示页面的性能指标。

**4.性能测试**

性能检测是作为性能优化过程中的一环，他的目的通常是给后续优化工作提供指导方向，参考基线以及千户对比的依据。性能检测并不是一次性执行结束后就完成的工作，他会在检测，记录和改进的迭代过程中不断重复。来协助网站的性能优化不断接近期望的效果。

1. Lighthouse（灯塔）

`Lighthouse`是谷歌开发并开源的`web`性能测试工具，用于改进网络应用的质量，可以将其作为一个`Chrome`扩展程序运行，或从命令行运行。只需要为其提供一个需要审查的地址，`Lighthouse`就会对页面进行一连串的测试，生成一个有关页面性能的报告。

在浏览器的调试工具中默认就存在`lighthouse`选项，只需要切换至`lighthouse`，在右侧的选项区选中需要的选项。点击生成报告。

![](<images/10. 性能优化（25题）-image-10.png>)

可以看到淘宝的首屏时间是`0.6s`，可交互时间是`1.5s`，总阻塞时间是`10ms`。最大绘制时间是`1s`。通过这些指标就可以看到在哪方面存在性能瓶颈。

![](<images/10. 性能优化（25题）-image-9.png>)

在下方会对渲染进行拍照截图，如果空白页面较多也能体现网站白屏时间过长。下面还会给一些优化建议。比如某些资源过大，加载时间过长等，当然这些建议不并一定都是对的，只是一些建议。

![](<images/10. 性能优化（25题）-image-4.png>)

最后是测试环境信息，不能制作一种环境的测试，要多环境测试。

![](<images/10. 性能优化（25题）-image-5.png>)

2.WebPageTest

在线`web`性能测试工具(`https://www.webpagetest.org`), 提供多地点测试。他只能测试已经发布了的网站。输入需要测试的网页地址，点击`start test`按钮就开始测试了，可以选择测试地理位置，测试的浏览器等。

![](<images/10. 性能优化（25题）-image-1.png>)

![](<images/10. 性能优化（25题）-image-2.png>)

这里会生成一份详细的测试数据，我这里没打开，打开再补图吧，尴尬...

**5.Chrome DevTools**

1. 浏览器的任务管理器

可以查看当前`Chrome`浏览器中，所有进程关于`GPU`，网络和内存空间的使用情况，这些进程包括当前打开的各个标签页，安装的各种扩展插件，以及`GPU`，网络，渲染等浏览器的默认进程，通过监控这些数据，可以定位可能存在内存泄露或网络资源加载异常的问题进程。

更多工具 `->` 任务管理器

![](<images/10. 性能优化（25题）-image-3.png>)

可以看到所有进行的进程，可以看到内存占用网络消耗。

2.Network网络分析

`Network`面板是一个常被用到的工具，通过它可以获取到网站所有资源的请求情况，包括加载时间，尺寸大小，优先级设置以及`HTTP`缓存等信息。可以帮助开发者发现可能由于未进行有效压缩而导致资源尺寸过大的问题，未配置缓存策略导致二次请求加载时间过长的问题。

![](<images/10. 性能优化（25题）-image-7.png>)

3.Coverage

监控并统计出网站应用运行过程中代码执行的覆盖率情况。

统计的对象是`JavaScript`脚本文件与`css`样式文件，统计结果主要包括文件的字节大小，执行过程中已覆盖的代码字节数，可视化的覆盖率条形图。

根据执行结果可以发现到底哪些尺寸较大的代码文件覆盖率较低，这就意味着这些代码文件中可能存在较多的无用代码。

`Ctrl + shift + p `搜索 `coverage` 就会显示出来。

![](<images/10. 性能优化（25题）-image.png>)

![](<images/10. 性能优化（25题）-image-25.png>)

4.Memory 面板

主要用于分析内存占用情况，如果出现内存泄露，那么就可能带来网站崩溃的后果。

为了更细致和准确的监控应用网站当前的内存使用情况，`Chrome`浏览器提供`Memory`面板，可以快速生成当前的堆内存快照。

![](<images/10. 性能优化（25题）-image-24.png>)

结束后可以查看到内存占用大小，就可以对对应的模块进行优化。

![](<images/10. 性能优化（25题）-image-23.png>)

5.Performance

使用`Performance`面板主要对网站应用的运行时性能表现进行检测和分析，包括页面的每秒帧数，`CPU`的消耗和各种请求花费的时间。

![](<images/10. 性能优化（25题）-image-20.png>)

点击开始后等待两三秒就可以停止了。

![](<images/10. 性能优化（25题）-image-21.png>)

这里面就可以统计出网站的信息。

![](<images/10. 性能优化（25题）-image-19.png>)

6.FPS

另一个非常方便的工具是`FPS`计数，可以在页面运行时提供对`FPS`的实时估计。

`Ctrl + Shift + P` 输入 `fps` 选择显示渲染。就会在浏览器中出现监控面板。

![](<images/10. 性能优化（25题）-image-22.png>)

还可以使用性能监视器，这是一个事实的监视器。

`Ctrl + Shift + P` 输入 `monitor`

![](<images/10. 性能优化（25题）-image-18.png>)

7.性能优化路径

说前端优化之前先从这样一个问题开始说起。当浏览器地址栏输入`url`按下回车，整个过程都发生了什么。性能优化基本也是围绕这个过程展开的。

首先浏览器接收到`URL`，到网络请求线程的开启，一个完整的`HTTP`请求发出，服务器接收到请求并转到具体的处理服务，前后台之间的`HTTP`交互和涉及的缓存机制，浏览器接收到数据包的关键渲染路径，`js`引擎的解析过程。大致就是这样一个过程。

下面来详细说说。

浏览器接收到输入的`URL`到开启网络请求线程，这个阶段是在浏览器内部完成的。那么什么是线程什么是进程呢？

简单来说，进程就是一个程序运行的实例，操作系统会为进程创建独立的内存，用来存放运行所需的代码和数据，而线程是进程的组成部分，每个进程至少有一个主线程及可能的若干子线程，这些线程由所需的进程进行启动和管理。

由于多个线程可以共享操作系统为其所属的同一个进程所分配的资源，所以多线程的并行处理能有效提高程序的运行效率。

只要某个线程执行出错，将会导致整个程序崩溃。进程与进程之间相互隔离，这保证了当一个进程挂起或崩溃的情况发生时并不会影响其他进程的正常运行，虽然每个进程只能访问系统分配给自己的资源，但可以通弄过`IPC`机制进行进程间通信。

进程所占用的资源会在其关闭后由操作系统回收，即使进程中存在某个线程产生的内存泄露，当进程退出时相关的内存资源也会被回收。线程之间可以共享所属进程的数据。

早期浏览器都是单进程的，其中的页面渲染，呈现，网络请求都通过线程来实现。前面说了只要一个线程崩溃就会导致整个进程崩溃。如果你上网较早应该有过这样的体会，一个网站卡死了整个浏览器都卡死了。单进程的浏览器存在很多的隐患，比如页面流畅度，安全性，稳定性都比较低。

后来`Chrome`推出了多进程浏览器，一个浏览器只有一个主进程，负责菜单栏，标题栏等页面显示，文件访问，前进后退以及子进程管理。除主进程外还有`GPU`进程，插件进程，网络进程，渲染进程。

渲染进程也称为浏览器内核，默认会为每个标签页开辟一个独立的渲染进程，负责将`HTML`，`CSS`，`JavaScript`等资源转为可交互的页面，其中包含多个子线程，`js`引擎线程，`GUI`渲染线程，事件触发线程，定时触发器线程，异步`http`请求线程等。当打开一个标签页输入URL后所发起的网络请求就是从这个进程开始的，处于安全的考虑渲染进程存在于沙箱中。打开`Chrome`的任务管理器可以从中发现这些进程。

建立`HTTP`请求这个阶段主要分为两部分，`DNS`解析和通信链路的建立。简单来说首先发起请求的客户端浏览器要明确知道所要访问的服务器地址，然后建立通往该服务器地址的路径。

1. DNS解析

`DNS`解析说白了就是根据`host`域名找到具体的`IP`地址，中间会经历很多的环节。

首先会查找浏览器的缓存，如果找不到就去查找系统自身的`DNS`缓存，在没有就去查找系统的`hosts`文件，再找不到就去本地域名服务器提供商查询根域名服务器，如果还是找不到就去查找`com`顶级域名服务器，最后会去权限域名服务器查找，都没有找到就返回报错信息。这就是`DNS`查找的过程，其中任何一个环节慢了都会影响后续的操作。

- 网络模型

在通过`DNS`解析到目标服务器`IP`地址后，就可以建立网络连接进行资源的访问。在这个过程中涉及到网络架构模型，国际标准化组织提出了一些网络架构的模型，`OSI`、`TCP/IP`。

`OSI`是七层架构，包括应用层，表示层，会话层，传输层，网络层，数据链路层，物理层。`TCP/IP`简化到了四层，应用层，传输层，网络层，数据链路层。同样每一层慢了对性能都有影响。

- TCP

经过网络模型之后就要建立`TCP`链接，主要是为了通过`http`对数据进行请求和发送。

由于`TCP`是面向有链接的通信协议，所以在传输数据之前需要建立好客户端与服务间的链接，即通常所说的三次握手。

- 前后端数据交互

当`TCP`链接建立好以后，便可通过`HTTP`等协议进行前后端的通信，但在实际的应用中，并非浏览器与确定`IP`地址的服务器之间直接通信，往往会在中间加入反向代理服务器。

- 反向代理服务器

反向代理服务器根据客户的请求，从后端服务器上获取资源后提供给客户端，反向代理通过会做下面一些事，比如负载均衡，安全防火墙，加密及`SSL`加速，数据压缩，解决跨域，静态资源缓存。

- 后端处理流程

请求经过反向代理服务器收到请求后，首先会有一层统一的验证环节，如跨域验证，安全拦截等，如果发现是不规则的请求则直接返回相应的拒绝报文。

通过验证后才会进入具体的后天程序代码执行阶段，如具体的计算数据库的操作等。

完成计算之后，后台会以一个`HTTP`响应数据包的形式发送回请求的前端，解说此次请求。

- HTTP相关协议特性

`HTTP`是建立在传输层`TCP`协议上的应用层协议，在`TCP`层面上存在长链接和短连接的区别。

所谓长链接就是在客户端与服务器端简历`TCP`连接上可以连续发送数据包，但需要双方发送心跳检查包来维持这个链接。

短连接就是当客户端需要向服务器发送请求时，会在网络层`IP`协议之上建立一次链接，当请求发送并收到响应后，则断开此链接。

`HTTP1.0`时默认使用短连接。

`HTTP1.1`时默认使用长链接，但是长链接存在并发数，如果请求过多仍旧需要等待。常用的做法是将域名进行拆分，对小图标进行合并。

`HTTP2.0`之后便可以在一个`TCP`链接上请求多个资源，分割成更小的帧请求的性能再次提成。

- 浏览器缓存

基于`HTTP`的缓存分为强缓存和协商缓存。

强缓存就是当浏览器判断出本地缓存未过期时，直接取本地缓存，无需发起请求，此时的状态为`200 from cache`，在`HTTP1.1`版本后通过头部的`cache-control max-age`属性值规定的过期时长来判断缓存是否失效，这比之前使用`expires`过期时间更准确并且安全。

协商缓存则需要浏览器发起`HTTP`请求，来判断浏览器本地缓存的文件是否改变。

- 关键渲染路径

当经历了网络请求过程，从服务器获取到了所访问的页面文件之后，浏览器便要开始渲染服务器响应回来的内容。

首先浏览器会通过解析`HTML`和`CSS`文件来构建`DOM`和`CSSOM`。

浏览器接收读取到`HTML`文件，其实是根绝文件指定编码的原始字节，首先需要将字节转换为字符串，再将字符串转换为`W3C`标准规定的令牌结构，令牌就是`HTML`中不同标签代表不同含义的一组规则结构。然后经过词法分析将令牌转化为定义了属性和规则值的对象，最后将这些标签根据`HTML`表示的父子关系，连接成树形结构。

`DOM`树表示文档标记的属性和关系，但未包含其中各元素经过渲染后的外观呈现，这边是接下来`CSSOM`的职责了，与将`HTML`文件解析为文档对象模型的过程类似，`CSS`文件也会首先经历从字节到字符串，然后令牌化及词法分析后构建为层叠样式表对象模型。

这两个对象模型的构建过程是会花费时间的，可以通过浏览器的开发者工具性能选项卡查看到对应过程的耗时情况。

得到文档对象模型和层叠样式表对象之后就要进行绘制，呈现之前浏览器需要将文档对象模型和样式模型合并到一起最终形成一颗渲染树。这棵树中只包含可见的节点，比如`display`为`node`的节点就是不包含的。

从所生成的`DOM`树的根节点开始向下遍历每个子节点，忽略所有不可见的节点，因为不可见的节点不会出现在渲染树中。

在`CSSOM`中为每个可见的子节点找到对应的规则并应用。

布局节点根据所得到的渲染树，计算他们在试图设备中的具体位置和大小，这一步输出的是一个盒模型。绘制节点将每个节点的具体绘制方案转化为屏幕上的实际像素。

构建渲染树，布局，及绘制过程所需要的时间取决于实际文档的大小。文档过大，浏览器需要处理的任务就越多样式也复杂，绘制需要的时间就越长。所以关键渲染路径执行快慢，将直接影响首屏加载时间的性能指标。

当首屏渲染完成胡，用户在和网站的交互过程中，有可能通过`JavaScript`代码提供的用户操作接口更改渲染树的结构。一旦`DOM`结构发生改变，这个渲染过程就会重新执行一遍。

关键渲染路径的优化不仅是首屏性能，还有交互性能。

---

## 3. SPA（单页应用）首屏加载速度慢怎么解决？

**参考答案：**

一、什么是首屏加载

首屏时间（First Contentful Paint），指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容

首屏加载可以说是用户体验中最重要的环节

关于计算首屏时间

利用`performance.timing`提供的数据

通过`DOMContentLoad`或者`performance`来计算出首屏时间

```javascript
// 方案一：
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('first contentful painting');
});
// 方案二：
performance.getEntriesByName("first-contentful-paint")[0].startTime

// performance.getEntriesByName("first-contentful-paint")[0]
// 会返回一个 PerformancePaintTiming的实例，结构如下：
{
  name: "first-contentful-paint",
  entryType: "paint",
  startTime: 507.80000002123415,
  duration: 0,
};
```

二、加载慢的原因

在页面渲染的过程，导致加载速度慢的因素可能如下：

- 网络延时问题

- 资源文件体积是否过大

- 资源是否重复发送请求去加载了

- 加载脚本的时候，渲染内容堵塞了

三、解决方案

常见的几种SPA首屏优化方式

- 减小入口文件积

- 静态资源本地缓存

- UI框架按需加载

- 图片资源的压缩

- 组件重复打包

- 开启GZip压缩

- 使用SSR

减小入口文件体积

常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加

![](<images/10. 性能优化（25题）-image-15.png>)

在`vue-router`配置路由的时候，采用动态加载路由的形式

```javascript
routes:[
    path: 'Blogs',
    name: 'ShowBlogs',
    component: () => import('./components/ShowBlogs.vue')
]
```

以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件

静态资源本地缓存

后端返回资源问题：

- 采用`HTTP`缓存，设置`Cache-Control`，`Last-Modified`，`Etag`等响应头

- 采用`Service Worker`离线缓存

前端合理利用`localStorage`

UI框架按需加载

在日常使用`UI`框架，例如`element-UI`、或者`antd`，我们通常会直接引用整个`UI`库

```javascript
import ElementUI from 'element-ui'
Vue.use(ElementUI)
```

但实际上我用到的组件只有按钮，分页，表格，输入与警告 所以我们要按需引用

```javascript
import { Button, Input, Pagination, Table, TableColumn, MessageBox } from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)
```

组件重复打包

假设`A.js`文件是一个常用的库，现在有多个路由使用了`A.js`文件，这就造成了重复下载

解决方案：在`webpack`的`config`文件中，修改`CommonsChunkPlugin`的配置

```javascript
minChunks: 3
```

`minChunks`为3表示会把使用3次及以上的包抽离出来，放进公共依赖文件，避免了重复加载组件

图片资源的压缩

图片资源虽然不在编码过程中，但它却是对页面性能影响最大的因素

对于所有的图片资源，我们可以进行适当的压缩

对页面上使用到的`icon`，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上，用以减轻`http`请求压力。

开启GZip压缩

拆完包之后，我们再用`gzip`做一下压缩 安装`compression-webpack-plugin`

```javascript
cnmp i compression-webpack-plugin -D
```

在`vue.congig.js`中引入并修改`webpack`配置

```javascript
const CompressionPlugin = require('compression-webpack-plugin')

configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                })]
            }
        }
```

在服务器我们也要做相应的配置 如果发送请求的浏览器支持`gzip`，就发送给它`gzip`格式的文件 我的服务器是用`express`框架搭建的 只要安装一下`compression`就能使用

```plaintext
const compression = require('compression')
app.use(compression())  // 在其他中间件使用之前调用
```

使用SSR

SSR（Server side ），也就是服务端渲染，组件或页面通过服务器生成html字符串，再发送到浏览器

从头搭建一个服务端渲染是很复杂的，`vue`应用建议使用`Nuxt.js`实现服务端渲染

小结：

减少首屏渲染时间的方法有很多，总的来讲可以分成两大部分 ：资源加载优化 和 页面渲染优化

下图是更为全面的首屏优化的方案

![](<images/10. 性能优化（25题）-image-17.png>)

大家可以根据自己项目的情况选择各种方式进行首屏渲染的优化

---

## 4. 如果使用CSS提高页面性能？

**参考答案：**

一、前言

每一个网页都离不开`css`，但是很多人又认为，`css`主要是用来完成页面布局的，像一些细节或者优化，就不需要怎么考虑，实际上这种想法是不正确的

作为页面渲染和内容展现的重要环节，`css`影响着用户对整个网站的第一体验

因此，在整个产品研发过程中，`css`性能优化同样需要贯穿全程

二、实现方式

实现方式有很多种，主要有如下：

- 内联首屏关键CSS

- 异步加载CSS

- 资源压缩

- 合理使用选择器

- 减少使用昂贵的属性

- 不要使用@import

内联首屏关键CSS

在打开一个页面，页面首要内容出现在屏幕的时间影响着用户的体验，而通过内联`css`关键代码能够使浏览器在下载完`html`后就能立刻渲染

而如果外部引用`css`代码，在解析`html`结构过程中遇到外部`css`文件，才会开始下载`css`代码，再渲染

所以，`CSS`内联使用使渲染时间提前

注意：但是较大的`css`代码并不合适内联（初始拥塞窗口、没有缓存），而其余代码则采取外部引用方式

异步加载CSS

在`CSS`文件请求、下载、解析完成之前，`CSS`会阻塞渲染，浏览器将不会渲染任何已处理的内容

前面加载内联代码后，后面的外部引用`css`则没必要阻塞浏览器渲染。这时候就可以采取异步加载的方案，主要有如下：

- 使用javascript将link标签插到head标签最后

```javascript
// 创建link标签
const myCSS = document.createElement('link')
myCSS.rel = 'stylesheet'
myCSS.href = 'mystyles.css'
// 插入到header的最后位置
document.head.insertBefore(
  myCSS,
  document.head.childNodes[document.head.childNodes.length - 1].nextSibling,
)
```

- 设置link标签media属性为noexis，浏览器会认为当前样式表不适用当前类型，会在不阻塞页面渲染的情况下再进行下载。加载完成后，将`media`的值设为`screen`或`all`，从而让浏览器开始解析CSS

```javascript
<link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">
```

- 通过rel属性将link元素标记为alternate可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将rel设回stylesheet

```javascript
<link rel="alternate stylesheet" href="mystyles.css" onload="this.rel='stylesheet'">
```

**资源压缩**

利用`webpack`、`gulp/grunt`、`rollup`等模块化工具，将`css`代码进行压缩，使文件变小，大大降低了浏览器的加载时间

**合理使用选择器**

`css`匹配的规则是从右往左开始匹配，例如`#markdown .content h3`匹配规则如下：

- 先找到h3标签元素

- 然后去除祖先不是.content的元素

- 最后去除祖先不是#markdown的元素

如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高

所以我们在编写选择器的时候，可以遵循以下规则：

- 不要嵌套使用过多复杂选择器，最好不要三层以上

- 使用id选择器就没必要再进行嵌套

- 通配符和属性选择器效率最低，避免使用

**减少使用昂贵的属性**

在页面发生重绘的时候，昂贵属性如`box-shadow`/`border-radius`/`filter`/透明度/`:nth-child`等，会降低浏览器的渲染性能

**不要使用@import**

css样式文件有两种引入方式，一种是`link`元素，另一种是`@import`

`@import`会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时

而且多个`@import`可能会导致下载顺序紊乱

比如一个css文件`index.css`包含了以下内容：`@import url("reset.css")`

那么浏览器就必须先把`index.css`下载、解析和执行后，才下载、解析和执行第二个文件`reset.css`

**其他**

- 减少重排操作，以及减少不必要的重绘

- 了解哪些属性可以继承而来，避免对这些属性重复编写

- cssSprite，合成所有icon图片，用宽高加上backgroud-position的背景图方式显现出我们要的icon图，减少了http请求

- 把小的icon图片转成base64编码

- CSS3动画或者过渡尽量使用transform和opacity来实现动画，不要使用left和top属性

**三、总结**

`css`实现性能的方式可以从选择器嵌套、属性特性、减少`http`这三面考虑，同时还要注意`css`代码的加载顺序

---

## 5. 怎么进行站点内的图片性能优化？

**参考答案：**

**选择合适的图片格式**

**JPEG**

JPEG 是由 Joint Photographic Experts Group 所开发出的一种图片。它最大的特点是 有损压缩。这种高效的压缩算法使它成为了一种非常轻巧的图片格式。另一方面，即使被称为“有损”压缩，JPG 的压缩方式仍然是一种高质量的压缩方式：当我们把图片体积压缩至原有体积的 50% 以下时，JPG 仍然可以保持住 60% 的品质。此外，JPG 格式以 24 位存储单个图，可以呈现多达 1600 万种颜色，足以应对大多数场景下对色彩的要求，这一点决定了它压缩前后的质量损耗并不容易被我们人类的肉眼所察觉。

优点

- JPEG 格式的图片可以呈现数百万种颜色。所以每当网站需要呈现色彩丰富的图片，JPEG 总是最佳选择。

- 有损压缩，你可以通过压缩大大的减少图片的体积，一般图片用 60%级别比较合适，如果选择大于 75%的压缩等级，则会使图片有明显的质量下降。

- 无兼容性问题，所以开发者可以放心随意使用。

使用场景

- JPG 适用于呈现色彩丰富的图片，在我们日常开发中，JPEG 图片经常作为大的背景图、轮播图或 Banner 图出现。

- 但是有损压缩后的图片确实很难露出马脚，当它处理矢量图形和 Logo 等线条感较强、颜色对比强烈的图像时，人为压缩的图片模糊会相当明显。

- JPEG 图像不支持透明度处理，透明图片可选择使用 PNG。

**PNG**

PNG（可移植网络图形格式）是由 W3C 开发的图片格式，是一种无损压缩的高保真的图片格式。它同时支持 8 位和 24 位，这里都是二进制数的位数。按照我们前置知识里提到的对应关系，8 位的 PNG 最多支持 256 种颜色，而 24 位的可以呈现约 1600 万种颜色。

PNG 图片具有比 JPEG 更强的色彩表现力，对线条的处理更加细腻，对透明度有良好的支持。它弥补了上文我们提到的 JPEG 的局限性，唯一的缺点就是　体积太大。

应用场景

- PNG 在处理线条和颜色对比度方面的优势，我们主要用它来呈现小的 Logo、颜色简单且对比强烈的图片或背景等。

- 支持透明度处理，透明图片可选择使用 PNG

**GIF**

GIF 是一种最多支持 256 种颜色的 8 位无损图片格式。这个限制让 GIF 格式对于多颜色或者摄影图片的展示无能为力。

优点

- 支持 256 中颜色，文件体积通常都很小

- 支持透明

应用场景

- 支持动画，适合去展示一些无限循环的动画，比如图标、表情、广告栏等。

- 对于一些只有简单色彩的图片非常合适。

**WebP**

WebP 是一种同时提供了有损压缩与无损压缩（可逆压缩）的图片文件格式，派生自影像编码格式 VP8。它像 JPEG 一样对细节丰富的图片信手拈来，像 PNG 一样支持透明，像 GIF 一样可以显示动态图片，集多种图片文件格式的优点于一身。

WebP 最初在 2010 年发布，目标是减少文件大小，但达到和 JPEG 格式相同的图片质量，希望能够减少图片档在网络上的发送时间。根据 Google 较早的测试，WebP 的无损压缩比网络上找到的 PNG 档少了 45％的文件大小，即使这些 PNG 档在使用 pngcrush 和 PNGOUT 处理过，WebP 还是可以减少 28％的文件大小。

虽然 webP 有诸多优点，但是它不能完全替代 JPEG 和 PNG，因为浏览器对 WebP 支持并不普遍。特别是移动端 IOS 系统基本不支持。

**图片压缩**

图片众多以及图片体积过大往往会影响页面加载速度，造成不良的用户体验，有部分图片达到几百 kB，甚至 2M(这锅必须运营背，非得上传高清大图不可？)，直接导致了加载时间过长。所以对于体积过大的图片，在保持图片在可接受的清晰度范围内可适当对图片大小进行压缩。

图片压缩又分为有损压缩和无损压缩。

有损压缩

有损压缩指在压缩文件大小的过程中，损失了一部分图片的信息，也即降低了图片的质量（即图片被压糊了），并且这种损失是不可逆的。常见的有损压缩手段是按照一定的算法将临近的像素点进行合并。压缩算法不会对图片所有的数据进行编码压缩，而是在压缩的时候，去除了人眼无法识别的图片细节。因此有损压缩可以在同等图片质量的情况下大幅降低图片的体积。例如 jpg 格式的图片使用的就是有损压缩。

无损压缩

无损压缩指的是在压缩图片的过程中，图片的质量没有任何损耗。我们任何时候都可以从无损压缩过的图片中恢复出原来的信息。压缩算法对图片的所有的数据进行编码压缩，能在保证图片的质量的同时降低图片的体积。例如 png、gif 使用的就是无损压缩。

**工具压缩**

- [<span style="color: rgb(36,91,219); background-color: inherit">tinypng</span>](https://tinypng.com/) 免费、批量、速度块

- [<span style="color: rgb(36,91,219); background-color: inherit">智图压缩</span>](https://zhitu.isux.us/) 百度很难搜到官网了，免费、批量、好用

- [<span style="color: rgb(36,91,219); background-color: inherit">squoosh</span>](https://squoosh.app/) 在线图片压缩工具

- [<span style="color: rgb(36,91,219); background-color: inherit">compressor</span>](https://compressor.io/) 支持 JPG、PNG、SVG、GIF

**webpack 压缩**

工程化的项目可以在 webpack 里面配置 image-webpack-loader 进行图片压缩

1. 安装依赖

```javascript
npm install --save-dev image-webpack-loader
```

- 配置 webpack

```javascript
module.exports = {
...
  module: {
    rules: [
      {
        test: /.(png|jpe?g|gif|svg)(?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:7].[ext]'
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.5, 0.65],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: { // 不支持WEBP就不要写这一项
                quality: 75
              },
            },
          },
        ],
      },
    ],
  },
}
```

至于要不要使用插件自动压缩就见仁见智了，因为有些 UI 和产品会说压缩出来的效果图片不是他们想要的。

**使用雪碧图**

雪碧图，CSS Sprites，国内也叫 CSS 精灵，是一种 CSS 图像合成技术，主要用于小图片显示。

浏览器请求资源的时候，同源域名请求资源的时候有最大并发限制，chrome 为 6 个，就比如你的页面上有 10 个相同 CDN 域名小图片，那么需要发起 10 次请求去拉取，分两次并发。第一次并发请求回来后，发起第二次并发。如果你把 10 个小图片合并为一张大图片的画，那么只用一次请求即可拉取下来 10 个小图片的资源。减少服务器压力，减少并发，减少请求次数。

优点

把诸多小图片合成一张大图，利用 `backround-position` 属性值来确定图片呈现的位置，可以有效的较少请求个数，而且，而不影响开发体验，使用构建插件可以做到对开发者透明。适用于页面图片多且丰富的场景。

缺点

生成的图片体积较大，减少请求个数同时也增加了图片大小，不合理拆分将不利于并行加载。

合成雪碧图

在 webpack 中，有相应的插件提供了自动合成雪碧图的功能并且可以自动生成对应的样式文件—— webpack-spritesmith，使用方法如下

```javascript
var path = require('path')
var SpritesmithPlugin = require('webpack-spritesmith')

module.exports = {
  // ...
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/ico'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl'),
      },
      apiOptions: {
        cssImageRef: '~sprite.png',
      },
    }),
  ],
}
```

通过上面配置就能将 `src/ico` 目录下的所有 png 文件合成雪碧图，并且输出到对应目录，同时还可以生成对应的样式文件，样式文件的语法会根据你配置的样式文件的后缀动态生成。

**使用 iconfont**

iconfont(字体图标)，即通过字体的方式展示图标，多用于渲染图标、简单图形、特殊字体等。

优点

- 像使用字体一样，设置大小、颜色及其他样式，不失真

- 轻量，易修改

- 有效减少 HTTP 请求次数

推荐使用阿里的字体图标库：[<span style="color: rgb(36,91,219); background-color: inherit">iconfont</span>](https://www.iconfont.cn/)

**使用 base64 格式**

原理：将图片转换为 base64 编码字符串 inline 到页面或 css 中。

优点

- 提升性能: 网页上的每一个图片，都是需要消耗一个 http 请求下载而来的, 图片的下载始终都要向服务器发出请求，要是图片的下载不用向服务器发出请求，base64 可以随着 HTML 的下载同时下载到本地.减少 https 请求。

- 加密: 让用户一眼看不出图片内容 , 只能看到编码。

- 方便引用: 在多个文件同时使用某些图片时, 可以把图片转为 base64 格式的文件, 把样式放在全局中, 比如 common.css, 以后在用的时候就可以直接加类名, 二不需要多层找文件路径, 会提升效率

但需要注意的是：如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。

base64 化最常见的就是在 url-loader 中使用。

```javascript
module.exports = {
...
  module: {
    rules: [
      {
        test: /.(png|jpe?g|gif|svg)(?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        }
      },
    ],
  },
}
```

这样就能将项目中小于 10kb 的图片转化为 base64 应用到页面中

**使用 css 代替图片。**

比如实现修饰效果，如半透明、边框、圆角、阴影、渐变等，在当前主流浏览器中都可以用 CSS 达成，这样能减少图片的请求，达到优化的目的。

缺点

- 受限于 css 的浏览器的兼容性

- 对于较复杂的图案就无能为力了，写也麻烦，开发成本大

**使用 CDN 图片**

CDN 的全称是 Content Delivery Network，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。

举个简单的例子：

> <span style="color: rgb(36,91,219); background-color: inherit">以前买火车票大家都只能去火车站买，后来我们买火车票就可以在楼下的火车票代售点买了。</span>

基本原理

CDN 的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

基本思路

CND 的基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN 系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet 网络拥挤的状况，提高用户访问网站的响应速度。

CDN 的优势

- CDN 节点解决了跨运营商和跨地域访问的问题，访问延时大大降低；

- 大部分请求在 CDN 边缘节点完成，CDN 起到了分流作用，减轻了源站的负载。

**图片懒加载**

懒加载是一种网页性能优化的方式，它能极大的提升用户体验。图片一直是影响网页性能的主要元凶，现在一张图片超过几兆已经是很经常的事了。如果每次进入页面就请求所有的图片资源，那么可能等图片加载出来用户也早就走了。所以进入页面的时候，只请求可视区域的图片资源。

总结出来就是：

- 减少资源的加载，页面启动只加载首屏的图片，这样能明显减少了服务器的压力和流量，也能够减小浏览器的负担。

- 防止并发加载的资源过多而阻塞 js 的加载，影响整个网站的启动，影响用户体验

- 浪费用户的流量，有些用户并不想全部看完，全部加载会耗费大量流量。

原理

图片懒加载的原理就是暂时不设置图片的 src 属性，而是将图片的 url 隐藏起来，比如先写在 data-src 里面，等当前图片是否到了可视区域再将图片真实的 url 放进 src 属性里面，从而实现图片的延迟加载。

```javascript
function lazyload() {
  let viewHeight = document.body.clientHeight //获取可视区高度
  let imgs = document.querySelectorAll('img[data-src]')
  imgs.forEach((item, index) => {
    if (item.dataset.src === '') return

    // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    let rect = item.getBoundingClientRect()
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      item.src = item.dataset.src
      item.removeAttribute('data-src')
    }
  })
}

// 可以使用节流优化一下
window.addEventListener('scroll', lazyload)
```

通过上面例子的实现，我们要实现懒加载都需要去监听 scroll 事件，尽管我们可以通过函数节流的方式来阻止高频率的执行函数,但是我们还是需要去计算 scrollTop,offsetHeight 等属性，有没有简单的不需要计算这些属性的方式呢，答案是有的---IntersectionObserver

```javascript
const imgs = document.querySelectorAll('img[data-src]')
const config = {
  rootMargin: '0px',
  threshold: 0,
}
let observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target
      let src = img.dataset.src
      if (src) {
        img.src = src
        img.removeAttribute('data-src')
      }
      // 解除观察
      self.unobserve(entry.target)
    }
  })
}, config)

imgs.forEach((image) => {
  observer.observe(image)
})
```

**图片预加载**

图片预加载，是指在一些需要展示大量图片的网站，将图片提前加载到本地缓存中，从而提升用户体验。

常用的方式有两种，一种是隐藏在 css 的 background 的 url 属性里面，一种是通过 javascript 的 Image 对象设置实例对象的 src 属性实现图片的预加载。

1、用 CSS 和 JavaScript 实现预加载

```javascript
#preload-01 {
  background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px;
}
#preload-02 {
  background: url(http://domain.tld/image-02.png) no-repeat -9999px -9999px;
}
#preload-03 {
  background: url(http://domain.tld/image-03.png) no-repeat -9999px -9999px;
}
```

通过 CSS 的 background 属性将图片预加载到屏幕外的背景上。当它们在 web 页面的其他地方被调用时，浏览器就会在渲染过程中使用预加载（缓存）的图片。该方法虽然高效，但仍有改进余地。使用该法加载的图片会同页面的其他内容一起加载，增加了页面的整体加载时间。

为了解决这个问题，我们增加了一些 JavaScript 代码，来推迟预加载的时间，直到页面加载完毕。

```javascript
function preloader() {
  if (document.getElementById) {
    document.getElementById('preload-01').style.background =
      'url(http://domain.tld/image-01.png) no-repeat -9999px -9999px'
    document.getElementById('preload-02').style.background =
      'url(http://domain.tld/image-02.png) no-repeat -9999px -9999px'
    document.getElementById('preload-03').style.background =
      'url(http://domain.tld/image-03.png) no-repeat -9999px -9999px'
  }
}
function addLoadEvent(func) {
  var oldonload = window.onload
  if (typeof window.onload != 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload()
      }
      func()
    }
  }
}
addLoadEvent(preloader)
```

2、使用 JavaScript 实现预加载

```javascript
function preloader() {
  if (document.images) {
    var img1 = new Image()
    var img2 = new Image()
    var img3 = new Image()
    img1.src = 'http://domain.tld/path/to/image-001.gif'
    img2.src = 'http://domain.tld/path/to/image-002.gif'
    img3.src = 'http://domain.tld/path/to/image-003.gif'
  }
}
function addLoadEvent(func) {
  var oldonload = window.onload
  if (typeof window.onload != 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload()
      }
      func()
    }
  }
}
addLoadEvent(preloader)
```

**响应式图片加载**

什么是响应式图片加载？其实就是在不同分辨率的设备上显示不同尺寸的图片，避免资源的浪费。

常用的方法就是 css3 的媒体查询(media query)。

```javascript
@media  screen and (min-width: 1200px) {
  img {
    background-image: url('1.png');
  }
}
@media  screen and (min-width: 992px) {
  img {
    background-image: url('2.png');
  }
}
@media  screen and (min-width: 768px) {
  img {
    background-image: url('3.png');
  }
}
@media screen and (min-width: 480px) {
  img {
    background-image: url('4.png');
  }
}
```

此外，还可以使用 HTML5 的 picture 属性进行响应式处理。方法如下：

1. 创建 picture 标签。

2. 放置多个 source 标签，以指定不同的图像文件名，进而根据不同的条件进行加载。

3. 添加一个回退的元素

```javascript
<picture>
  <source srcset="src/img/l.png" media="(min-width: 1200px)" />
  <source srcset="src/img/2.png" media="(min-width: 992px)" />
  <source srcset="src/img/4.png" media="(min-width: 768px)" />
  <img src="src/img/4.png" />
</picture>
```

需要注意的是：现在很多浏览器对于 picture 这个标签还不支持，使用的时候需要加以注意。

![](<images/10. 性能优化（25题）-image-16.png>)

**渐进式图片**

渐进式图片的意思是在高画质图像加载完之前会先显示低画质版本。低画质版本由于画质低、压缩率高，尺寸很小，加载很快。在两者之间我们也可以根据需要显示不同画质的版本。

渐进式图片可以让用户产生图片加载变快的印象。用户不再盯着一片空白区域等待图片加载，而能看到图像变得越来越清晰，这样对用户体验也是友好的。

骨架屏技术也是类似的原理。

**总结**

1. 选择合适的图片格式和压缩大图，可从根源上截图大图加载过慢的问题。

2. 使用雪碧图，iconfont，base64，css 代替图片等可减少图片 http 请求，提高页面加载速度。

3. 使用 CDN 图片可达到分流的效果，减少服务券压力。

4. 图片懒加载，预加载，渐进式图片等可不同程度减少白屏时间，提高产品体验。

---

## 6. 虚拟DOM一定更快吗？

**参考答案：**

虚拟DOM可以在某些情况下性能，但并不是绝对的。

以下是一些虚拟DOM可能带来性能提升的情况：

1. 批量更新：虚拟DOM可以将多个DOM操作合并为一次更新。它会在内部进行比较和计算，找出最小的变更集，并批量应用于真实的DOM树。这种批量更新可以减少浏览器的重排和重绘，从而提高性能。

2. 局部更新：通过比较新旧虚拟DOM树，只有发生变化的部分会被重新渲染到真实的DOM中，而不需要重新渲染整个组件。这可以避免不必要的DOM操作，减少性能开销。

3. 跳过昂贵的计算：在虚拟DOM的比较过程中，可以通过判断节点是否相同来跳过昂贵的计算或渲染步骤。如果两个节点相同，则无需进一步比较其子节点，从而节省了计算资源。

4. 跨平台支持：虚拟DOM与底层平台无关，因此它可以在不同环境（例如浏览器、移动端、服务器端）进行渲染。这种可移植性使得使用虚拟DOM能够更轻松地在不同平台之间共享和重用代码。

然而，虚拟DOM也可能引入一些性能开销：

1. 额外的内存占用：在运行时，虚拟DOM需要维护一个表示整个组件树的数据结构，这可能会占用额外的内存。

2. 操作的复杂度：虚拟DOM需要进行比较、计算和递归遍历等操作，这可能导致一些额外的计算开销。

总的来说，虚拟DOM通常可以在中等到大型规模的应用程序中提供性能优势。然而，在简单的应用程序或特定场景下，手动的DOM操作可能更加高效。因此，在选择是否使用虚拟DOM时，需要权衡应用程序的需求、性能要求以及代码的可维护性。

---

## 7. 有些框架不用虚拟dom，但是他们的性能也不错是为什么？

**参考答案：**

确实有一些框架不使用虚拟DOM，但仍能获得较好的性能。这是因为框架的整体设计和实现方式可能经过了优化，以使其在渲染和更新方面更加高效。

具体来说，可能有以下原因：

1. 直接操作DOM：这些框架可能直接对真实的DOM进行操作，而不是通过虚拟DOM中间层来进行抽象。直接操作DOM可以减少一些虚拟DOM的计算和比较开销。

2. 精细的变更追踪：这些框架可能采用更精细的变更追踪机制，只更新需要变更的部分，而不是重新渲染整个组件。通过避免不必要的DOM操作，可以提高性能。

3. 异步渲染：一些框架可能使用异步渲染技术，将多个DOM操作合并到一次更新中，从而减少浏览器的重排和重绘。例如，利用`requestAnimationFrame`或`MutationObserver`等机制延迟渲染，以便在下一个绘制周期内进行批量更新。

4. 性能优化策略：这些框架可能包含一些性能优化策略，如组件缓存、懒加载、异步加载等，以提高初始加载和后续渲染的执行效率。

5. 针对特定用例的优化：某些框架可能专注于解决特定的问题或场景，并进行了相应的优化。这些优化可以包括针对数据量较小或操作频率较低的应用进行的特定优化。

虚拟DOM在某些情况下提供了灵活性和开发便利性，但并不是唯一能实现高性能的方法。框架的性能往往是由多个因素综合影响的，除了是否使用虚拟DOM，还包括算法、数据结构、异步处理、组件设计等方面的因素。不同的框架可能有不同的设计理念和优化策略，因此性能也会有差异。

---

## 8. 如果某个页面有几百个函数需要执行，可以怎么优化页面的性能？

**参考答案：**

如果有几百个函数需要执行，并且这些函数可能会导致页面卡顿，可以考虑以下几种处理方式：

1. 异步执行：将函数调用转换为异步操作，使用`setTimeout`或`requestAnimationFrame`等方法将函数分散到多个时间片中执行。这样可以避免一次性执行大量函数造成的阻塞。

2. 分批处理：将函数分批执行，而不是一次性执行所有函数。可以使用循环和计数器来控制每个批次的函数数量，并在每个批次之间添加适当的延迟，以确保主线程有足够的空闲时间处理其他任务。

3. Web Worker：将函数放入Web Worker中执行，以在后台线程中进行计算，避免阻塞主线程。Web Worker可以独立于主线程运行，并发出消息来与主线程通信。

4. 函数优化：检查需要执行的函数是否可以进行优化，例如减少计算量、缓存结果、避免重复计算等。通过优化单个函数的执行效率，可以减少整体执行的时间和资源消耗。

5. 任务调度库：使用第三方任务调度库，如`async.js`或`p-queue`等，来管理并行执行和限制同时执行的函数数量。这些库提供了更灵活的任务管理和控制，可以根据需求进行配置和调整。

具体的处理方式取决于应用程序的需求和场景，以及函数之间是否有依赖关系。选择最合适的方法时，需要综合考虑性能、可维护性和代码复杂度等因素，并进行必要的测试和性能评估。

---

## 9. 讲一下png8、png16、png32的区别，并简单讲讲 png 的压缩原理

**参考答案：**

**区别**

PNG8、PNG16、PNG32 是 PNG 图像格式的不同变种，它们主要区别在于颜色深度和透明度支持的不同。

1. PNG8： PNG8 是一种 8 位颜色深度的 PNG 图像格式，它最多支持 256 种颜色。对于颜色相对较简单、不需要透明度的图像，使用 PNG8 可以获得较小的文件大小。PNG8 图像使用一种叫做调色板（Palette）的技术来存储颜色信息，它会创建一个包含所有使用的颜色的列表，并在图像中通过索引来引用这些颜色。

2. PNG16： PNG16 是一种 16 位颜色深度的 PNG 图像格式，它支持更多的颜色，最多可达 65536 种颜色。PNG16 适用于一些颜色较丰富的图像，但同样不支持透明度。

3. PNG32： PNG32 是一种 32 位颜色深度的 PNG 图像格式，它支持上千万种颜色，并且支持完全透明度（alpha 通道）。PNG32 适用于需要精确透明度控制的图像，例如图标、Logo 等。

**PNG 的压缩原理**

PNG 图像使用无损压缩技术来减小文件大小。它主要通过以下两种压缩方式来实现：

1. 使用 DEFLATE 算法：PNG 使用 DEFLATE 算法来对图像数据进行压缩，这是一种无损的压缩算法，可以将相邻的相似数据块识别并用更短的编码进行替代，从而减小文件大小。

2. 使用索引颜色和调色板：对于 PNG8 图像，它使用调色板技术来存储颜色信息。调色板是一个包含所有使用的颜色的列表，然后图像中使用颜色的索引来引用调色板中的颜色。这样可以大大减小文件大小，特别适用于颜色较简单的图像。

由于 PNG 使用无损压缩，所以图像的质量不会因为压缩而损失，但这也导致 PNG 文件相对于其他有损压缩格式（如 JPEG）通常会更大。因此，在选择使用 PNG 还是其他格式时，需要根据图像类型、透明度需求和文件大小要求进行权衡。

---

## 10. 页面加载的过程中，JS 文件是不是一定会阻塞 DOM 和 CSSOM 的构建？

**参考答案：**

答案：不一定

JavaScript阻塞DOM和CSSOM的构建的情况主要集中在以下两个方面：

- JavaScript文件被放置在head标签内部

当JavaScript文件被放置在head标签内部时，浏览器会先加载JavaScript文件并执行它，然后才会继续解析HTML文档。因此，如果JavaScript文件过大或服务器响应时间过长，就会导致页面一直处于等待状态，进而影响DOM和CSSOM的构建。

- JavaScript代码修改了DOM结构

在JavaScript代码执行时，如果对DOM结构进行了修改，那么浏览器需要重新计算布局（reflow）和重绘（repaint），这个过程会较为耗时，并且会阻塞DOM和CSSOM的构建。

除此之外，还有一些情况下JavaScript并不会阻塞DOM和CSSOM的构建：

- 通过设置 script 标签的 async 、defer 属性避免阻塞DOM和CSSOM的构建

  - async：异步加载JavaScript文件，脚本的下载和执行将与其他工作同时进行（例如从服务器请求其他资源、渲染页面等），而不必等到脚本下载完成才开始这些操作。因此，在使用 async 属性时，脚本的加载和执行是异步的，并且不保证脚本在页面中的顺序。

  - defer属性 ：属性也告诉浏览器立即下载脚本文件，但有一个重要的区别：当文档解析时，脚本不会执行，直到文档解析完成后才执行。这意味着脚本将按照它们在页面上出现的顺序执行，并且在执行之前，整个文档已经被解析完毕了。

- Web Workers ：Web Workers 是一种运行在后台线程的JavaScript脚本，它不会阻塞DOM和CSSOM的构建，并且可以利用多核CPU提高JavaScript代码执行速度。

**总结**

在一定情况下，JavaScript的执行会阻塞DOM和CSSOM的构建。

但是，在实际应用中，我们可以通过设置 script 标签的 async、defer 属性、使用Web Workers等方式来避免这个问题。

---

## 11. React.memo() 和 useMemo() 的用法是什么，有哪些区别？

**参考答案：**

在软件开发中，我们通常痴迷于性能提升以及如何使我们的应用程序执行得更快，从而为用户提供更好的体验。

Memoization 是优化性能的方法之一。 在本文中，我们将探讨它在 React 中的工作原理。

**什么是 memoization？**

在解释这个概念之前，让我们先来看一个简单的斐波那契程序：

```javascript
function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
```

显然这个算法缓慢的令人绝望，因为做了非常多的冗余计算，这个时候memoization就可以派上用场了！

简单来说，memoization 是一个过程，它允许我们缓存递归/昂贵的函数调用的值，以便下次使用相同的参数调用函数时，返回缓存的值而不必重新计算函数。

这确保了我们的应用程序运行得更快，因为我们通过返回一个已经存储在内存中的值来避免重新执行函数需要的时间。

**为什么在 React 中使用 memoization？**

在 React 函数组件中，当组件中的 props 发生变化时，默认情况下整个组件都会重新渲染。 换句话说，如果组件中的任何值更新，整个组件将重新渲染，包括尚未更改其 values/props 的函数/组件。

让我们看一个发生这种情况的简单示例。 我们将构建一个基本的应用程序，告诉用户哪种酒最适合与它们选择的奶酪搭配。

我们将从设置两个组件开始。 第一个组件将允许用户选择奶酪。 然后它会显示最适合该奶酪的酒的名称。 第二个组件将是第一个组件的子组件。 在这个组件中，没有任何变化。 我们将使用这个组件来跟踪 React 重新渲染的次数。

> <span style="color: rgb(36,91,219); background-color: inherit">注意，本示例中使用的 </span>`classNames`<span style="color: rgb(36,91,219); background-color: inherit"> 来自 Tailwind CSS。</span>

下面是我们的父组件：`<ParentComponent />`。

```plaintext
// components/parent-component.js
import Counts from "./counts";
import Button from "./button";
import { useState, useEffect } from "react";
import constants from "../utils";
const { MOZARELLA, CHEDDAR, PARMESAN, CABERNET, CHARDONAY, MERLOT } = constants;
export default function ParentComponent() {
  const [cheeseType, setCheeseType] = useState("");
  const [wine, setWine] = useState("");
  const whichWineGoesBest = () => {
    switch (cheeseType) {
      case MOZARELLA:
        return setWine(CABERNET);
      case CHEDDAR:
        return setWine(CHARDONAY);
      case PARMESAN:
        return setWine(MERLOT);
      default:
        CHARDONAY;
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      whichWineGoesBest();
    }
    return () => (mounted = false);
  }, [cheeseType]);
  return (
    <div className="flex flex-col justify-center items-center">
        <h3 className="text-center dark:text-gray-400 mt-10">
          Without React.memo() or useMemo()
        </h3>
      <h1 className="font-semibold text-2xl dark:text-white max-w-md text-center">
        Select a cheese and we will tell you which wine goes best!
      </h1>
      <div className="flex flex-col gap-4 mt-10">
        <Button text={MOZARELLA} onClick={() => setCheeseType(MOZARELLA)} />
        <Button text={CHEDDAR} onClick={() => setCheeseType(CHEDDAR)} />
        <Button text={PARMESAN} onClick={() => setCheeseType(PARMESAN)} />
      </div>
      {cheeseType && (
        <p className="mt-5 dark:text-green-400 font-semibold">
          For {cheeseType}, <span className="dark:text-yellow-500">{wine}</span>{" "}
          goes best.
        </p>
      )}
      <Counts />
    </div>
  );
}
```

第二个组件是 `<Counts />` 组件，它跟踪整个 `<Parent Component />` 组件重新渲染的次数。

```plaintext
// components/counts.js
import { useRef } from "react";
export default function Counts() {
  const renderCount = useRef(0);
  return (
    <div className="mt-3">
      <p className="dark:text-white">
        Nothing has changed here but I've now rendered:{" "}
        <span className="dark:text-green-300 text-grey-900">
          {(renderCount.current++)} time(s)
        </span>
      </p>
    </div>
  );
}
```

下面的例子是我们点击奶酪名字时的效果:

`<ParentComponent />` 中的 `<Counts />` 组件计算了因 `<ParentComponent />` 的更改而强制 `<Counts />` 组件重新渲染的次数。

目前，单击奶酪名字将更新显示下面的奶酪名字以及酒名。 除了 `<ParentComponent />` 会重新渲染，`<Counts />` 组件也会重新渲染，即使其中的任何内容都没有改变。

想象一下，有一个组件显示数以千计的数据，每次用户单击一个按钮时，该组件或树中的每条数据都会在不需要更新时重新渲染。 这就是 `React.memo()` 或 `useMemo()` 为我们提供性能优化所必需的地方。

现在，让我们探索 `React.memo` 以及 `useMemo()`。 之后我们将比较它们之间的差异，并了解何时应该使用一种而不是另一种。

**什么是 React.memo()？**

`React.memo()` 随 [<span style="color: rgb(36,91,219); background-color: inherit">React v16.6</span>](https://reactjs.org/blog/2018/10/23/react-v-16-6.html) 一起发布。 虽然类组件已经允许您使用 [<span style="color: rgb(36,91,219); background-color: inherit">PureComponent</span>](https://reactjs.org/docs/react-api.html#reactpurecomponent) 或 [<span style="color: rgb(36,91,219); background-color: inherit">shouldComponentUpdate</span>](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) 来控制重新渲染，但 React 16.6 引入了对函数组件执行相同操作的能力。

`React.memo()` 是一个[<span style="color: rgb(36,91,219); background-color: inherit">高阶组件 (HOC)</span>](https://reactjs.org/docs/higher-order-components.html)，它接收一个组件A作为参数并返回一个组件B，如果组件B的 props（或其中的值）没有改变，则组件 B 会阻止组件 A 重新渲染 。

我们将采用上面相同的示例，但在我们的 `<Counts />` 组件中使用 `React.memo()`。 我们需要做的就是用 `React.memo()` 包裹我们的 `<Counts /> `组件，如下所示：

```plaintext
import { useRef } from "react";
function Counts() {
  const renderCount = useRef(0);
  return (
    <div className="mt-3">
      <p className="dark:text-white">
        Nothing has changed here but I've now rendered:{" "}
        <span className="dark:text-green-300 text-grey-900">
          {(renderCount.current ++)} time(s)
      </span>
      </p>
    </div>
  );
}
export default React.memo(Counts);
```

现在，当我们通过单击选择奶酪类型时，我们的 `<Counts />` 组件将不会重新渲染。

**什么是 useMemo()？**

`React.memo()` 是一个 HOC，而 [<span style="color: rgb(36,91,219); background-color: inherit">useMemo()</span>](https://blog.logrocket.com/react-reference-guide-hooks-api/#usememo) 是一个 React Hook。 使用 `useMemo()`，我们可以返回记忆值来避免函数的依赖项没有改变的情况下重新渲染。

为了在我们的代码中使用 `useMemo()`，[<span style="color: rgb(36,91,219); background-color: inherit">React 开发者有一些建议给我们</span>](https://blog.logrocket.com/rethinking-hooks-memoization/)：

- 您可以依赖 `useMemo()` 作为性能优化，而不是语义保证

- 函数内部引用的每个值也应该出现在依赖项数组中

对于我们的下一个示例，我们将对 `<ParentComponent />` 进行一些更改。 下面的代码仅显示对我们之前创建的 `<ParentComponent />` 的新更改。

```plaintext
// components/parent-component.js
import { useState, useEffect, useRef, useMemo } from "react";
import UseMemoCounts from "./use-memo-counts";
export default function ParentComponent() {
  const [times, setTimes] = useState(0);
  const useMemoRef = useRef(0);
  const incrementUseMemoRef = () => useMemoRef.current++;
  // uncomment the next line to test that <UseMemoCounts /> will re-render every t ime the parent re-renders.
  // const memoizedValue = useMemoRef.current++;
// the next line ensures that <UseMemoCounts /> only renders when the times value changes
const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]);
  return (
    <div className="flex flex-col justify-center items-center border-2 rounded-md mt-5 dark:border-yellow-200 max-w-lg m-auto pb-10 bg-gray-900">
        <div className="mt-4 text-center">
          <button
            className="bg-indigo-200 py-2 px-10 rounded-md"
            onClick={() => setTimes(times+1)}
          >
            Force render
          </button>
          <UseMemoCounts memoizedValue={memoizedValue} />
        </div>
    </div>
  );
}
```

首先，我们引入了非常重要的 `useMemo()` Hook。 我们还引入了 `useRef()` Hook 来帮助我们跟踪在我们的组件中发生了多少次重新渲染。 接下来，我们声明一个 `times` 状态，稍后我们将更新该状态来触发/强制重新渲染。

之后，我们声明一个 `memoizedValue` 变量，用于存储 `useMemo()` Hook 的返回值。` useMemo()` Hook 调用我们的 `incrementUseMemoRef` 函数，它会在每次依赖项发生变化时将我们的 `useMemoRef.current` 值加一，即 `times` 值发生变化。

然后我们创建一个按钮来点击更新`times`的值。 单击此按钮将触发我们的 `useMemo()` Hook，更新 `memoizedValue` 的值，并重新渲染我们的 `<UseMemoCounts />` 组件。

在这个例子中，我们还将 `<Counts />` 组件重命名为 `<UseMemoCounts />`，它现在需要一个 `memoizedValue` 属性。

这是它的样子：

```plaintext
// components/use-memo-counts.js
function UseMemoCounts({memoizedValue}) {
  return (
    <div className="mt-3">
      <p className="dark:text-white max-w-md">
        I'll only re-render when you click <span className="font-bold text-indigo-400">Force render.</span>
        </p>
      <p className="dark:text-white">I've now rendered: <span className="text-green-400">{memoizedValue} time(s)</span> </p>
    </div>
  );
}
export default UseMemoCounts;
```

现在，当我们单击任何奶酪按钮时，我们的 `memoizedValue` 不会更新。 但是当我们单击 Force render 按钮时，我们看到 `memoizedValue` 更新并且 `<UseMemoCounts />` 组件重新渲染。

如果您注释掉我们当前的 `memoizedValue` 行，并取消注释掉它上面的行：

```plaintext
const memoizedValue = useMemoRef.current++;
```

您将看到 `<UseMemoCounts />` 组件在每次 `<ParentComponent />` 渲染时重新渲染。

**总结：React.memo() 和 useMemo() 的主要区别**

从上面的例子中，我们可以看到 `React.memo()` 和 `useMemo()` 之间的主要区别：

- `React.memo()` 是一个高阶组件，我们可以使用它来包装我们不想重新渲染的组件，除非其中的 props 发生变化

- `useMemo()` 是一个 React Hook，我们可以使用它在组件中包装函数。 我们可以使用它来确保该函数中的值仅在其依赖项之一发生变化时才重新计算

虽然 memoization 似乎是一个可以随处使用的巧妙小技巧，但只有在绝对需要这些性能提升时才应该使用它。 Memoization 会占用运行它的机器上的内存空间，因此可能会导致意想不到的效果。

---

## 12. 导致页面加载白屏时间长的原因有哪些，怎么进行优化？

**参考答案：**

**一、白屏时间**

白屏时间：即用户点击一个链接或打开浏览器输入URL地址后，从屏幕空白到显示第一个画面的时间。

**二、白屏时间的重要性**

当用户点开一个链接或者是直接在浏览器中输入URL开始进行访问时，就开始等待页面的展示。页面渲染的时间越短，用户等待的时间就越短，用户感知到页面的速度就越快。这样可以极大的提升用户的体验，减少用户的跳出，提升页面的留存率。

**三、白屏的过程**

从输入url，到页面的画面展示的过程

1、首先，在浏览器地址栏中输入url

2、浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。

3、在发送http请求前，需要域名解析(DNS解析)，解析获取相应的IP地址。

4、浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手。

5、握手成功后，浏览器向服务器发送http请求，请求数据包。

6、服务器处理收到的请求，将数据返回至浏览器

7、浏览器收到HTTP响应

8、读取页面内容，浏览器渲染，解析html源码

9、生成Dom树、解析css样式、js交互,渲染显示页面

浏览器下载HTML后，首先解析头部代码，进行样式表下载，然后继续向下解析HTML代码，构建DOM树，同时进行样式下载。当DOM树构建完成后，立即开始构造CSSOM树。理想情况下，样式表下载速度够快，DOM树和CSSOM树进入一个并行的过程，当两棵树构建完毕，构建渲染树，然后进行绘制。

Tips:浏览器安全解析策略对解析HTML造成的影响：

当解析HTML时遇到内联JS代码，会阻塞DOM树的构建，会先执行完JS代码;当CSS样式文件没有下载完成时，浏览器解析HTML遇到了内联JS代码，此时，浏览器暂停JS脚本执行，暂停HTML解析。直到CSS文件下载完成，完成CSSOM树构建，重新恢复原来的解析。

JavaScript 会阻塞 DOM 生成，而样式文件又会阻塞 JavaScript 的执行，所以在实际的工程中需要重点关注 JavaScript 文件和样式表文件，使用不当会影响到页面性能的。

**四、白屏-性能优化**

1. DNS解析优化

针对DNS Lookup环节，我们可以针对性的进行DNS解析优化。

- DNS缓存优化

- DNS预加载策略

- 稳定可靠的DNS服务器

* TCP网络链路优化

多花点钱吧

- 服务端处理优化

服务端的处理优化，是一个非常庞大的话题，会涉及到如Redis缓存、数据库存储优化或是系统内的各种中间件以及Gzip压缩等…

- 浏览器下载、解析、渲染页面优化

根据浏览器对页面的下载、解析、渲染过程，可以考虑一下的优化处理：

- 尽可能的精简HTML的代码和结构

- 尽可能的优化CSS文件和结构

- 一定要合理的放置JS代码，尽量不要使用内联的JS代码

- 将渲染首屏内容所需的关键CSS内联到HTML中，能使CSS更快速地下载。在HTML下载完成之后就能渲染了，页面渲染的时间提前，从而缩短首屏渲染时间；

- 延迟首屏不需要的图片加载，而优先加载首屏所需图片（offsetTop\<clientHeight）

```javascript
document.documentElement.clientHeight //获取屏幕可视区域的高度
element.offsetTop //获取元素相对于文档顶部的高度
```

因为JavaScript 会阻塞 DOM 生成，而样式文件又会阻塞 JavaScript 的执行，所以在实际的工程中需要重点关注 JavaScript 文件和样式表文件，使用不当会影响到页面性能的。

---

## 13. 如果一个列表有 100000 个数据，这个该怎么进行展示？

**参考答案：**

我们需要思考的问题：该处理是否必须同步完成？数据是否必须按顺序完成？

解决办法：

（1）将数据分页，利用分页的原理，每次服务器端只返回一定数目的数据，浏览器每次只对一部分进行加载。

（2）使用懒加载的方法，每次加载一部分数据，其余数据当需要使用时再去加载。

（3）使用数组分块技术，基本思路是为要处理的项目创建一个队列，然后设置定时器每过一段时间取出一部分数据，然后再使用定时器取出下一个要处理的项目进行处理，接着再设置另一个定时器。

（4）虚拟列表，每次只渲染需要视口的部分

---

## 14. DNS 预解析是什么？怎么实现？

**参考答案：**

**DNS优化**

在介绍`dns-prefetch`之前，先要提下当前对于DNS优化主流方法。

一般来说，一次DNS解析需要耗费 20-120ms，所以为了优化DNS，我们可以考虑两个方向：

1. 减少DNS请求次数

2. 缩短DNS解析时间`dns-prefetch`

**什么是dns-prefetch？**

`dns-prefetch`(DNS预获取)是前端网络性能优化的一种措施。它根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中，缩短DNS解析时间，进而提高网站的访问速度。

**为什么要用dns-prefetch？**

每当浏览器从（第三方）服务器发送一次请求时，都要先通过DNS解析将该跨域域名解析为 IP地址，然后浏览器才能发出请求。

如果某一时间内，有多个请求都发送给同一个服务器，那么DNS解析会多次并且重复触发。这样会导致整体的网页加载有延迟的情况。

我们知道，虽然DNS解析占用不了多大带宽，但是它会产生很高的延迟，尤其是对于移动网络会更为明显。

因此，为了减少DNS解析产生的延迟，我们可以通过`dns-prefetch`预解析技术有效地缩短DNS解析时间。

```plaintext
<link rel="dns-prefetch" href="https://baidu.com/">
```

**dns-prefetch背后原理**

当浏览器访问一个域名的时候，需要解析一次DNS，获得对应域名的ip地址。 在解析过程中，按照:

- 浏览器缓存

- 系统缓存

- 路由器缓存

- ISP(运营商)DNS缓存

- 根域名服务器

- 顶级域名服务器

- 主域名服务器

的顺序逐步读取缓存，直到拿到IP地址。

`dns-prefetch`就是在将解析后的IP缓存在系统中。

这样，`dns-prefetch`就有效地缩短了DNS解析时间。因为，在本地操作系统做了DNS缓存，使得DNS在解析的过程中，提前在系统缓存中找到了对应IP。

这样一来， 后续的解析步骤就不用执行了，进而也就缩短了DNS解析时间。

假如浏览器首次将一个域名解析为IP地址，并缓存至操作系统，那么下一次DNS解析时间可以低至0-1ms。

倘若结果不缓存在系统，那么就需要读取路由器的缓存，进而后续的解析时间最小也要约15ms。

如果路由器缓存也不存在，则需要读取ISP（运营商）DNS缓存，一般像`taobao.com`、`baidu.com`这些常见的域名，读取ISP（运营商）DNS缓存需要的时间在80-120ms，如果是不常见的域名，平均需要200-300ms。

一般来说，大部分的网站到运营商这块都能找到IP。

那也就是说，`dns-prefetch`可以给DNS解析过程带来15-300ms的提升，尤其是一些大量引用很多其他域名资源的网站，提升效果就更加明显了

**浏览器DNS缓存与dns-prefetch**

现代浏览器为了优化DNS解析，也设有了浏览器DNS缓存。

每当在首次DNS解析后会对其IP进行缓存。至于缓存时长，每种浏览器都不一样，比如Chrome的过期时间是1分钟，在这个期限内不会重新请求DNS。

> <span style="color: rgb(36,91,219); background-color: inherit">Tip:</span>
> <span style="color: rgb(36,91,219); background-color: inherit">每当Chrome浏览器启动的时候，就会自动的快速解析浏览器最近一次启动时记录的前10个域名。所以经常访问的网址就不存在DNS解析的延迟，进而打开速度更快。</span>

而`dns-prefetch` 相当于在浏览器缓存之后，在本地操作系统中做了DNS缓存，个人理解，为的是给浏览器缓存做保障，尽量让DNS解析出本地，以此来做了又一层DNS解析优化。

一般来说，DNS在系统的缓存时间是大于浏览器的。

**浏览器与系统DNS缓存时间**

> <span style="color: rgb(36,91,219); background-color: inherit">TTL(Time-To-Live)，就是一条域名解析记录在DNS服务器中的存留时间</span>

- 浏览器DNS缓存的时间跟DNS服务器返回的TTL值无关, 它的缓存时间取决于浏览器自身设置。

- 系统缓存会参考DNS服务器响应的TTL值，但是不完全等于TTL值。

国内和国际上很多平台的TTL值都是以秒为单位的，很多的默认值都是3600，也就是默认缓存1小时。

**`dns-prefetch`缺点**

`dns-prefetch`最大的缺点就是使用它太多。

过多的预获取会导致过量的DNS解析，对网络是一种负担。

**最佳实践**

请记住以下三点：

1. `dns-prefetch` 仅对[<span style="color: rgb(36,91,219); background-color: inherit">跨域</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)域上的 DNS查找有效，因此请避免使用它来指向相同域。这是因为，到浏览器看到提示时，您站点域背后的IP已经被解析。

2. 除了link 还可以通过使用 [<span style="color: rgb(36,91,219); background-color: inherit">HTTP链接字段</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Link)将 `dns-prefetch`（以及其他资源提示）指定为 [<span style="color: rgb(36,91,219); background-color: inherit">HTTP标头</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)：

```plaintext
Link: https://fonts.gstatic.com/; rel=dns-prefetch
```

1. 考虑将 `dns-prefetch` 与 `preconnect(`预连接`)`提示配对。

由于`dns-prefetch` 仅执行 DNS查找，不像`preconnect` 会建立与服务器的连接。

如果站点是通过HTTPS服务的，两者的组合会涵盖DNS解析，建立TCP连接以及执行TLS握手。将两者结合起来可提供进一步减少[<span style="color: rgb(36,91,219); background-color: inherit">跨域请求</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)的感知延迟的机会。如下所示：

```plaintext
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link rel="dns-prefetch" href="https://fonts.gstatic.com/">
```

Note: 如果页面需要建立与许多第三方域的连接，则将它们预先连接会适得其反。 `preconnect` 提示最好仅用于最关键的连接。对于其他的，只需使用 `<link rel="dns-prefetch">` 即可节省第一步的时间DNS查找。

---

## 15. 在 React 中可以做哪些性能优化？

**参考答案：**

- 使用 shouldComponentUpdate 避免不需要的渲染，但是如果对 props 和 state 做深比较，代价很大，所以需要根据业务进行些取舍；在有子组件的情况下，为了避免子组件的重复渲染，可以通过父组件来判断子组件是否需要 PureRender。

- 将 props 设置为数组或对象：每次调用 React 组件都会创建新组件，就算传入的数组或对象的值没有改变，他们的引用地址也会发生改变，比如，如果按照如下的写法，那么每次渲染时 style 都是一个新对象

```javascript
// 不推荐
<button style={{ color: 'red' }} />

// 推荐
const style = { color: 'red' }
<button style={style} />

// 不推荐
<button style={this.props.style || {} } />

// 推荐
const defaultStyle = {}
<button style={this.props.style || defaultStyle } />
```

- 将函数的绑定移动到构造函数内：可以避免每次都绑定事件。

- 使用 immutable 不可变数据，在我们项目中使用引用类型时，为了避免对原始数据的影响，一般建议使用 shallowCopy 和 deepCopy 对数据进行处理，但是这样会造成 CPU 和 内存的浪费，所以推荐使用 immutable，优点如下

  - 降低了“可变”带来的复杂度

  - 节省内存，immutable 使用结构共享尽量复用内存，没有被引用的对象会被垃圾回收

  - 可以更好的做撤销/重做，复制/粘贴，时间旅行

  - 不会有并发问题（因为数据本身就是不可变的）

  - 拥抱函数式编程

- 给子组件设置一个唯一的 key，因为在 diff 算法中，会用 key 作为唯一标识优化渲染

---

## 16. 浏览器为什么要请求并发数限制？

**参考答案：**

1.对操作系统端口资源考虑

PC总端口数为65536，那么一个TCP（http也是tcp）链接就占用一个端口。操作系统通常会对总端口一半开放对外请求，以防端口数量不被迅速消耗殆尽。

2.过多并发导致频繁切换产生性能问题

一个线程对应处理一个http请求，那么如果并发数量巨大的话会导致线程频繁切换。而线程的上下文切换有时候并不是轻量级的资源。这导致得不偿失，所以请求控制器里面会产生一个链接池，以复用之前的链接。所以我们可以看作同域名下链接池最大为4～8个，如果链接池全部被使用会阻塞后面请求任务，等待有空闲链接时执行后续任务。

3.避免同一客服端并发大量请求超过服务端的并发阈值

在服务端通常都对同一个客户端来源设置并发阀值避免恶意攻击，如果浏览器不对同一域名做并发限制可能会导致超过服务端的并发阀值被BAN掉。

4.客户端良知机制

为了防止两个应用抢占资源时候导致强势一方无限制的获取资源导致弱势一方永远阻塞状态。

---

## 17. 如何确定页面的可用性时间，什么是 Performance API？

**参考答案：**

Performance API 用于精确度量、控制、增强浏览器的性能表现。这个 API 为测量网站性能，提供以前没有办法做到的精度。

使用 getTime 来计算脚本耗时的缺点，首先，getTime方法（以及 Date 对象的其他方法）都只能精确到毫秒级别（一秒的千分之一），想要得到更小的时间差别就无能为力了。其次，这种写法只能获取代码运行过程中的时间进度，无法知道一些后台事件的时间进度，比如浏览器用了多少时间从服务器加载网页。

为了解决这两个不足之处，ECMAScript 5引入“高精度时间戳”这个 API，部署在 performance 对象上。它的精度可以达到1毫秒 的千分之一（1秒的百万分之一）。

navigationStart：当前浏览器窗口的前一个网页关闭，发生 unload 事件时的 Unix 毫秒时间戳。如果没有前一个网页，则等于 fetchStart 属性。

loadEventEnd：返回当前网页 load 事件的回调函数运行结束时的 Unix 毫秒时间戳。如果该事件还没有发生，返回 0。

根据上面这些属性，可以计算出网页加载各个阶段的耗时。比如，网页加载整个过程的耗时的计算方法如下：

```plaintext
var t = performance.timing;
var pageLoadTime = t.loadEventEnd - t.navigationStart;
```

---

## 18. 谈谈对 window.requestAnimationFrame 的理解

**参考答案：**

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

这个API的调用很简单，如下所示：

```javascript
const element = document.getElementById('some-element-you-want-to-animate')
let start

function step(timestamp) {
  if (start === undefined) start = timestamp
  const elapsed = timestamp - start

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)'

  if (elapsed < 2000) {
    // 在两秒后停止动画
    window.requestAnimationFrame(step)
  }
}

window.requestAnimationFrame(step)
```

除此之外，requestAnimationFrame还有以下两个优势：

- CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。

- 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。

---

## 19. css加载会造成阻塞吗？

**参考答案：**

先说下结论：

- css加载不会阻塞DOM树的解析

- css加载会阻塞DOM树的渲染

- css加载会阻塞后面js语句的执行

为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:

- 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)

- 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)

- 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)

- 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

**原理解析**

浏览器渲染的流程如下：

- HTML解析文件，生成DOM Tree，解析CSS文件生成CSSOM Tree

- 将Dom Tree和CSSOM Tree结合，生成Render Tree(渲染树)

- 根据Render Tree渲染绘制，将像素渲染到屏幕上。

从流程我们可以看出来:

- DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。

- 然而，由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。

- 由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。

---

## 20. 什么是内存泄漏？什么原因会导致呢？

**参考答案：**

内存泄露的解释：程序中己动态分配的堆内存由于某种原因未释放或无法释放。

- 根据JS的垃圾回收机制，当内存中引用的次数为0的时候内存才会被回收

- 全局执行上下文中的对象被标记为不再使用才会被释放

**内存泄露的几种场景**

- 全局变量过多。通常是变量未被定义或者胡乱引用了全局变量

```javascript
// main.js
// 场景1
function a() {
  b = 10
}
a()
b++

// 场景2
setTimeout(() => {
  console.log(b)
}, 1000)
```

- 闭包。 未手动解决必包遗留的内存引用。定义了闭包就要消除闭包带来的副作用。

```javascript
function closuer() {
  const b = 0
  return (c) => b + c
}

const render = closuer()

render()
render = null // 手动设置为null，GC会自己去清除
```

- 事件监听未被移除

```javascript


function addEvent (){
 const node =  document.getElementById('warp');
    node.addEventListener('touchmove',()=>{
        console.log('In Move');
    })
}

const onTouchEnd = (){
   const node =  document.getElementById('warp');
   node.
}

useEffect(()=>()=>{
     const node =  document.getElementById('warp');
     node.removeEventListener('touchmove');
}) // 类似react 生命周期函数： componentWillUnmount
render(<div id='warp' onTouchEnd={onTouchEnd}>
 // code...
</div>)
```

- 缓存。建议所有缓存都设置好过期时间。

---

## 21. 如何用webpack来优化前端性能

**参考答案：**

用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

- 压缩代码:删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的`UglifyJsPlugin`和`ParallelUglifyPlugin`来压缩JS文件， 利用`cssnano`（css-loader?minimize）来压缩css

-

- 利用CDN加速: 在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于`output`参数和各loader的`publicPath`参数来修改资源路径

- Tree Shaking: 将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数`--optimize-minimize`来实现

- Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利用浏览器缓存

- 提取公共第三方库: SplitChunksPlugin插件来进行公共模块抽取,利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码

---

## 22. 说说常规的前端性能优化手段

**参考答案：**

- content方面

  - 减少HTTP请求：合并文件、CSS精灵、inline Image

  - 减少DNS查询：DNS查询完成之前浏览器不能从这个主机下载任何任何文件。方法：DNS缓存、将资源分布到恰当数量的主机名，平衡并行下载和DNS查询

  - 避免重定向：多余的中间访问

  - 使Ajax可缓存

  - 非必须组件延迟加载

  - 未来所需组件预加载

  - 减少DOM元素数量

  - 将资源放到不同的域下：浏览器同时从一个域下载资源的数目有限，增加域可以提高并行下载量

  - 减少iframe数量

  - 不要404

- Server方面

  - 使用CDN

  - 添加Expires或者Cache-Control响应头

  - 对组件使用Gzip压缩

  - 配置ETag

  - Flush Buffer Early

  - Ajax使用GET进行请求

  - 避免空src的img标签

- Cookie方面

  - 减小cookie大小

  - 引入资源的域名不要包含cookie

- css方面

  - 将样式表放到页面顶部

  - 不使用CSS表达式

  - 不使用IE的Filter

- Javascript方面

  - 将脚本放到页面底部

  - 将javascript和css从外部引入

  - 压缩javascript和css

  - 删除不需要的脚本

  - 减少DOM访问

  - 合理设计事件监听器

- 图片方面

  - 优化图片：根据实际颜色需要选择色深、压缩

  - 优化css精灵

  - 不要在HTML中拉伸图片

  - 保证favicon.ico小并且可缓存

---

## 23. 什么是CSS Sprites？

**参考答案：**

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 `background-image`，`background-repeat`，`background-position` 的组合进行背景定位。 利用`CSS Sprites`能很好地减少网页的http请求，从而大大的提高页面的性能。

---

## 24. CSS优化、提高性能的方法有哪些？

**参考答案：**

- 避免过度约束

- 避免后代选择符

- 避免链式选择符

- 使用紧凑的语法

- 避免不必要的命名空间

- 避免不必要的重复

- 最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么

- 避免！important，可以选择其他选择器

- 尽可能的精简规则，你可以合并不同类里的重复规则

---

## 25. script 标签中， async 和 defer 两个属性有什么用途和区别？

**参考答案：**

在 HTML 中会遇到以下三类 script：

```plaintext
<script src='xxx'></script>
<script src='xxx' async></script>
<script src='xxx' defer></script>
```

script标签用于加载脚本与执行脚本，直接使用script脚本时，html会按照顺序来加载并执行脚本，在脚本加载&执行的过程中，会阻塞后续的DOM渲染。

比如现在大家习惯于在页面中引用各种第三方脚本，但如果第三方服务商出现了一些小问题，比如延迟之类的，就会使得页面白屏。

针对上述情况，script标签提供了两种方式来解决问题，就是加入属性async以及defer，这两个属性使得script标签加载都不会阻塞DOM的渲染。

```plaintext
defer：此布尔属性被设置为向浏览器指示脚本在文档被解析后执行。
async：设置此布尔属性，以指示浏览器如果可能的话，应异步执行脚本。
```

**defer**

如果script标签设置了defer属性，则浏览器会异步下载该文件并且不会影响后续DOM的渲染。

如果有多个设置了defer属性的script标签存在，则会按照顺序执行所有的script，defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行。

**async**

async属性会使得script脚本异步的加载并在允许的情况下执行，而async的执行并不会按照script标签在页面中的顺序来执行，而是谁先加载完谁先执行。
