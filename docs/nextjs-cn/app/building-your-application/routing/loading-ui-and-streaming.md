---
title: 加载 UI 和流式传输
description: 基于 Suspense 构建，加载 UI 允许您为特定路由段创建备用界面，并在内容准备就绪时自动流式传输。
---

特殊文件 `loading.js` 帮助您使用 [React Suspense](https://react.dev/reference/react/Suspense) 创建有意义的加载 UI。通过这种约定，您可以在路由段内容加载时从服务器显示[即时加载状态](#即时加载状态)。一旦渲染完成，新内容会自动替换进来。

<Image
  alt="加载 UI"
  srcLight="/docs/light/loading-ui.png"
  srcDark="/docs/dark/loading-ui.png"
  width="1600"
  height="691"
/>

## 即时加载状态

即时加载状态是导航时立即显示的备用 UI。您可以预渲染加载指示器，如骨架屏和加载动画，或未来屏幕的一小部分但有意义的内容，如封面照片、标题等。这有助于用户了解应用正在响应，并提供更好的用户体验。

通过在文件夹中添加 `loading.js` 文件来创建加载状态。

<Image
  alt="loading.js 特殊文件"
  srcLight="/docs/light/loading-special-file.png"
  srcDark="/docs/dark/loading-special-file.png"
  width="1600"
  height="606"
/>

```tsx switcher
export default function Loading() {
  // 您可以在 Loading 中添加任何 UI，包括骨架屏。
  return <LoadingSkeleton />
}
```

```jsx switcher
export default function Loading() {
  // 您可以在 Loading 中添加任何 UI，包括骨架屏。
  return <LoadingSkeleton />
}
```

在同一个文件夹中，`loading.js` 将嵌套在 `layout.js` 内部。它会自动将 `page.js` 文件和其下的任何子文件包装在 `<Suspense>` 边界中。

<Image
  alt="loading.js 概述"
  srcLight="/docs/light/loading-overview.png"
  srcDark="/docs/dark/loading-overview.png"
  width="1600"
  height="768"
/>

> **值得了解**：
>
> - 导航是即时的，即使使用[以服务器为中心的路由](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)。
> - 导航是可中断的，这意味着更改路由不需要等待路由内容完全加载后才能导航到另一个路由。
> - 共享布局在新路由段加载时保持交互性。

> **建议：** 对路由段（布局和页面）使用 `loading.js` 约定，因为 Next.js 对此功能进行了优化。

## 使用 Suspense 流式传输

除了 `loading.js` 之外，您还可以为自己的 UI 组件手动创建 Suspense 边界。App Router 支持使用 [Suspense](https://react.dev/reference/react/Suspense) 进行流式传输。

> **值得了解**：
>
> - [一些浏览器](https://bugs.webkit.org/show_bug.cgi?id=252413)会缓冲流式响应。您可能要等到响应超过 1024 字节时才能看到流式响应。这通常只影响"hello world"应用程序，而不影响实际应用程序。

### 什么是流式传输？

要了解流式传输在 React 和 Next.js 中如何工作，了解**服务器端渲染 (SSR)** 及其局限性很有帮助。

使用 SSR，在用户能够看到并与页面交互之前，需要完成一系列步骤：

1. 首先，在服务器上获取给定页面的所有数据。
2. 然后服务器渲染页面的 HTML。
3. 页面的 HTML、CSS 和 JavaScript 被发送到客户端。
4. 使用生成的 HTML 和 CSS 显示非交互式用户界面。
5. 最后，React [激活](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)用户界面，使其具有交互性。

<Image
  alt="显示无流式传输的服务器渲染图表"
  srcLight="/docs/light/server-rendering-without-streaming-chart.png"
  srcDark="/docs/dark/server-rendering-without-streaming-chart.png"
  width="1600"
  height="612"
/>

这些步骤是顺序的和阻塞的，这意味着服务器只能在获取所有数据后才能渲染页面的 HTML。而且，在客户端，React 只能在下载了页面中所有组件的代码后才能激活 UI。

React 和 Next.js 的 SSR 通过尽快向用户显示非交互式页面来帮助改善感知加载性能。

<Image
  alt="无流式传输的服务器渲染"
  srcLight="/docs/light/server-rendering-without-streaming.png"
  srcDark="/docs/dark/server-rendering-without-streaming.png"
  width="1600"
  height="748"
/>

然而，它仍然可能很慢，因为在向用户显示页面之前，需要完成服务器上的所有数据获取。

**流式传输**允许您将页面的 HTML 分解成更小的块，并逐步将这些块从服务器发送到客户端。

<Image
  alt="流式传输的服务器渲染工作原理"
  srcLight="/docs/light/server-rendering-with-streaming.png"
  srcDark="/docs/dark/server-rendering-with-streaming.png"
  width="1600"
  height="785"
/>

这使页面的部分内容可以更早地显示，而不需要等待所有数据加载完毕才能渲染任何 UI。

流式传输与 React 的组件模型很好地结合，因为每个组件都可以被视为一个块。具有较高优先级（例如产品信息）或不依赖数据的组件可以首先发送（例如布局），React 可以更早开始激活。具有较低优先级的组件（例如评论、相关产品）可以在获取数据后通过同一服务器请求发送。

<Image
  alt="显示流式传输的服务器渲染图表"
  srcLight="/docs/light/server-rendering-with-streaming-chart.png"
  srcDark="/docs/dark/server-rendering-with-streaming-chart.png"
  width="1600"
  height="730"
/>

当您想防止长时间的数据请求阻止页面渲染时，流式传输特别有益，因为它可以减少[第一字节时间 (TTFB)](https://web.dev/ttfb/) 和[首次内容绘制 (FCP)](https://web.dev/first-contentful-paint/)。它还有助于改善[交互时间 (TTI)](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/)，特别是在较慢的设备上。

### 示例

`<Suspense>` 通过包装执行异步操作（例如获取数据）的组件，在操作发生时显示备用 UI（例如骨架屏、加载动画），然后在操作完成后替换为您的组件。

```tsx switcher
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>加载信息流...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>加载天气...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

```jsx switcher
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>加载信息流...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>加载天气...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

通过使用 Suspense，您可以获得以下好处：

1. **流式服务器渲染** - 逐步从服务器向客户端渲染 HTML。
2. **选择性激活** - React 根据用户交互优先考虑首先使哪些组件具有交互性。

有关更多 Suspense 示例和用例，请参阅 [React 文档](https://react.dev/reference/react/Suspense)。

### SEO

- Next.js 将等待 [`generateMetadata`](/nextjs-cn/app/api-reference/functions/generate-metadata) 中的数据获取完成，然后再将 UI 流式传输到客户端。这保证了流式响应的第一部分包含 `<head>` 标签。
- 由于流式传输是服务器渲染的，它不会影响 SEO。您可以使用 Google 的 [Rich Results Test](https://search.google.com/test/rich-results) 工具查看您的页面在 Google 网络爬虫中的显示方式，并查看序列化的 HTML（[来源](https://web.dev/rendering-on-the-web/#seo-considerations)）。

### 状态码

在流式传输时，将返回 `200` 状态码，表示请求成功。

服务器仍然可以在流式内容本身内向客户端传达错误或问题，例如，当使用 [`redirect`](/nextjs-cn/app/api-reference/functions/redirect) 或 [`notFound`](/nextjs-cn/app/api-reference/functions/not-found) 时。由于响应头已经发送给客户端，响应的状态码无法更新。这不会影响 SEO。

## 平台支持

| 部署选项                                                                 | 是否支持 |
| ------------------------------------------------------------------------ | -------- |
| [Node.js 服务器](/nextjs-cn/app/getting-started/deploying#nodejs-server) | 是       |
| [Docker 容器](/nextjs-cn/app/getting-started/deploying#docker)           | 是       |
| [静态导出](/nextjs-cn/app/getting-started/deploying#static-export)       | 否       |
| [适配器](/nextjs-cn/app/getting-started/deploying#adapters)              | 特定平台 |

了解在自托管 Next.js 时如何[配置流式传输]()。
