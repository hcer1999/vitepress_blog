# HTML 篇
<!-- 目录
[[toc]] -->
## 一. 你是如何理解 HTML 语义化的？

- 用正确的标签做正确的事情！
- `HTML`语义化就是让页面的内容结构化，便于让浏览器、搜索引擎解析
- 在没有`CSS`样式的情况下也以一种文档格式显示，并且使人容易阅读
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重利于`SEO`
- 使阅读带代码的人对网站更容易将网站结构分块，便于阅读维护理解

## 二. meta viewport 是做什么用的，怎么写？

一个常用的针对移动端网页优化页面的一个 `meta` 标签的属性，常用的属性如下：

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
```

- `width`：控制 `viewport` 的大小，可以指定一个值，或者为 `device-width`，则设置为设备的宽度
- `height`：和 `widht` 对应，即指定高度
- `initial-scale`：初始缩放比例，即页面第一次加载时显示的缩放比例
- `maximum-scale`：允许用户缩放的最大比例
- `minimum-scale`：允许用户缩放的最小比例
- `user-scalable`：用户是否可以手动缩放

## 三. HTML5 有哪些新特性？

`HTML5` 现在已经不是 `SGML` 的子集，主要是关于图像，位置，存储，多任务等功能的增加

- 新特性

  - 绘画 `canvas`

  - 用于媒介回放的 `video` 和 `audio` 元素

  - 本地离线存储 `localStorage` 长期存储数据，浏览器关闭后数据不丢失

  - `sessionStorage` 的数据在浏览器关闭后自动删除

  - 语意化更好的内容元素，比如 `article`、`footer`、`header`、`nav`、`section`

  - 表单控件，`calendar`、`date`、`time`、`email`、`url`、`search`

  - 新的技术`webworker`、 `websocket`、 `Geolocation`

- 移除的元素

  - 纯表现的元素：`basefont`、`big`、`center`、`font`、 `s`、`strike`、`tt`、`u`

  - 对可用性产生负面影响的元素：`frame`、`frameset`、`noframes`

## 四. 前端需要注意哪些 SEO ？

1. 合理的 `title`、`description`、`keywords`：搜索对着三项的权重逐个减小，`title` 值强调重点即可，重要关键词出现不要超过 2 次，而且要靠前，不同页面 `title` 要有所不同；`description` 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 `description` 有所不同；`keywords` 列举出重要关键词即可。
2. 语义化的 `HTML` 代码，符合 `W3C` 规范：语义化代码让搜索引擎容易理解网页。

3. 重要内容 `HTML` 代码放在最前：搜索引擎抓取 `HTML` 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容肯定被抓取。
4. 重要内容不要用 `js` 输出：爬虫不会执行 `js` 获取内容

5. 少用 `iframe`：搜索引擎不会抓取 `iframe` 中的内容
6. 非装饰性图片必须加 `alt`

7. 提高网站速度：网站速度是搜索引擎排序的一个重要指标

## 五. Label 的作用是什么？是怎么用的？

`label` 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
<label for="Name">Number:</label> <input type="“text“" name="Name" id="Name" />
```

<label for="Name">Number:</label>
<input type="text" name="Name" id="Name"/>

## 六. 渐进增强和优雅降级的定义

**渐进增强**：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

**优雅降级**：一开始就根据高版本浏览器构建完整的功能，然后再针对低版本浏览器进行兼容。

## 七. 常用的 meta 标签

```html
<meta charset="utf-8" />
<!--声明文档使用的字符编码-->
```

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!--优先使用 IE 最新版本和 Chrome-->
```

```html
<meta name="description" content="不超过150个字符" />
<!--页面描述-->
```

```html
<meta name="keywords" content="" />
<!--页面关键词-->
```

```html
<meta name="author" content="name, email@gmail.com" />
<!--网页作者-->
```

```html
<meta name="robots" content="index,follow" />
<!--搜索引擎抓取-->
```

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no" />
<!--为移动设备添加 viewport-->
```

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--避免IE使用兼容模式-->
```

::: details 展开其他常用标签

```html
<meta name="apple-mobile-web-app-title" content="标题" />
<!--iOS 设备 begin-->
```

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<!--添加到主屏后的标题（iOS 6 新增）是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏-->
```

```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
<!--添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
```

```html
<meta name="format-detection" content="telphone=no, email=no" />
<!--设置苹果工具栏颜色-->
```

```html
<meta name="renderer" content="webkit" />
<!--启用360浏览器的极速模式(webkit)-->
```

```html
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--不让百度转码-->
```

```html
<meta name="HandheldFriendly" content="true" />
<!--针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓-->
```

```html
<meta name="MobileOptimized" content="320" />
<!--微软的老式浏览器-->
```

```html
<meta name="screen-orientation" content="portrait" />
<!--uc强制竖屏-->
```

```html
<meta name="x5-orientation" content="portrait" />
<!--QQ强制竖屏-->
```

```html
<meta name="full-screen" content="yes" />
<!--UC强制全屏-->
```

```html
<meta name="x5-fullscreen" content="true" />
<!--QQ强制全屏-->
```

```html
<meta name="browsermode" content="application" />
<!--UC应用模式-->
```

```html
<meta name="x5-page-mode" content="app" />
<!--QQ应用模式-->
```

```html
<meta name="msapplication-tap-highlight" content="no" />
<!--windows phone 点击无高光-->
```

```html
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<!--设置页面不缓存-->
```

:::

## 八. 主流浏览器内核私有属性 css 前缀？

| 内核    | 浏览器        | 前缀    |
| ------- | ------------- | ------- |
| mozilla | firefox,flock | -moz    |
| webkit  | safari,chrome | -webkit |
| opera   | opera         | -o      |
| trident | ie            | -ms     |
