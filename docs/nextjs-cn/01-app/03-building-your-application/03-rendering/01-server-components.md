---
title: 服务器组件
description: 了解如何使用 React 服务器组件在服务器上渲染应用程序的部分内容。
related:
  description: 了解 Next.js 如何缓存数据和静态渲染的结果。
  links:
    - app/deep-dive/caching
---

React 服务器组件允许你编写可以在服务器上渲染并可选择性缓存的 UI。在 Next.js 中，渲染工作按路由段进一步分割，以实现流式传输和部分渲染，并且有三种不同的服务器渲染策略：

- [静态渲染](#静态渲染默认)
- [动态渲染](#动态渲染)
- [流式传输](#流式传输)

本页将介绍服务器组件的工作原理、何时使用它们以及不同的服务器渲染策略。

## 服务器渲染的好处

在服务器上进行渲染工作有几个好处，包括：

- **数据获取**：服务器组件允许你将数据获取移至服务器，更接近数据源。这可以通过减少渲染所需数据的获取时间以及客户端需要进行的请求数量来提高性能。
- **安全性**：服务器组件允许你将敏感数据和逻辑保留在服务器上，如令牌和 API 密钥，而不会有将它们暴露给客户端的风险。
- **缓存**：通过在服务器上渲染，结果可以被缓存并在后续请求和不同用户之间重用。这可以通过减少每个请求上的渲染和数据获取量来提高性能并降低成本。
- **性能**：服务器组件为你提供额外的工具来优化基准性能。例如，如果你开始时应用程序完全由客户端组件组成，将 UI 中不需要交互的部分移至服务器组件可以减少所需的客户端 JavaScript 量。这对于使用较慢网络或性能较低设备的用户来说是有益的，因为浏览器需要下载、解析和执行的客户端 JavaScript 更少。
- **初始页面加载和[首次内容绘制 (FCP)](https://web.dev/fcp/)**：在服务器上，我们可以生成 HTML 让用户立即查看页面，而无需等待客户端下载、解析和执行渲染页面所需的 JavaScript。
- **搜索引擎优化和社交网络分享性**：渲染的 HTML 可以被搜索引擎机器人用来索引你的页面，并被社交网络机器人用来为你的页面生成社交卡片预览。
- **流式传输**：服务器组件允许你将渲染工作分成块，并在它们准备好时流式传输给客户端。这使用户无需等待整个页面在服务器上渲染完成就能看到页面的部分内容。

## 在 Next.js 中使用服务器组件

默认情况下，Next.js 使用服务器组件。这使你可以自动实现服务器渲染而无需额外配置，并且你可以在需要时选择使用客户端组件，详见[客户端组件](/docs/app/building-your-application/rendering/client-components)。

## 服务器组件如何渲染？

在服务器上，Next.js 使用 React 的 API 来协调渲染。渲染工作被分成块：按照单独的路由段和 [Suspense 边界](https://react.dev/reference/react/Suspense)。

每个块通过两个步骤渲染：

1. React 将服务器组件渲染成一种名为 **React 服务器组件载荷（RSC 载荷）** 的特殊数据格式。
2. Next.js 使用 RSC 载荷和客户端组件 JavaScript 指令在服务器上渲染 **HTML**。

{/_ 渲染图表 _/}

然后，在客户端：

1. HTML 用于立即显示路由的快速非交互式预览 - 这仅适用于初始页面加载。
2. React 服务器组件载荷用于协调客户端和服务器组件树，并更新 DOM。
3. JavaScript 指令用于[激活](https://react.dev/reference/react-dom/client/hydrateRoot)客户端组件并使应用程序具有交互性。

> #### 什么是 React 服务器组件载荷（RSC）？
>
> RSC 载荷是渲染后的 React 服务器组件树的紧凑二进制表示。它被 React 在客户端用来更新浏览器的 DOM。RSC 载荷包含：
>
> - 服务器组件的渲染结果
> - 客户端组件应该被渲染的位置的占位符以及它们的 JavaScript 文件的引用
> - 从服务器组件传递到客户端组件的任何 props

## 服务器渲染策略

服务器渲染有三个子集：静态、动态和流式传输。

### 静态渲染（默认）

使用静态渲染，路由在**构建时**渲染，或在[数据重新验证](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)后在后台渲染。结果被缓存并可以推送到[内容分发网络（CDN）](https://developer.mozilla.org/docs/Glossary/CDN)。这种优化允许你在用户和服务器请求之间共享渲染工作的结果。

当路由有不针对用户个性化且可以在构建时知道的数据时，静态渲染非常有用，例如静态博客文章或产品页面。

### 动态渲染

使用动态渲染，路由在**请求时**为每个用户渲染。

当路由有针对用户个性化的数据或具有只能在请求时才知道的信息（如 cookies 或 URL 的搜索参数）时，动态渲染非常有用。

> **具有缓存数据的动态路由**
>
> 在大多数网站中，路由不是完全静态或完全动态的 - 这是一个光谱。例如，你可以有一个电子商务页面，它使用在一定间隔后重新验证的缓存产品数据，但也有未缓存的个性化客户数据。
>
> 在 Next.js 中，你可以有动态渲染的路由，同时包含缓存和未缓存的数据。这是因为 RSC 载荷和数据是分开缓存的。这允许你选择动态渲染而不必担心在请求时获取所有数据带来的性能影响。
>
> 了解更多关于[完整路由缓存](/docs/app/deep-dive/caching#full-route-cache)和[数据缓存](/docs/app/deep-dive/caching#data-cache)。

#### 切换到动态渲染

在渲染过程中，如果发现[动态 API](#动态-api)或带有 `{ cache: 'no-store' }` 选项的 [fetch](/docs/app/api-reference/functions/fetch)，Next.js 将切换到动态渲染整个路由。下表总结了动态 API 和数据缓存如何影响路由是静态还是动态渲染：

| 动态 API | 数据   | 路由     |
| -------- | ------ | -------- |
| 否       | 已缓存 | 静态渲染 |
| 是       | 已缓存 | 动态渲染 |
| 否       | 未缓存 | 动态渲染 |
| 是       | 未缓存 | 动态渲染 |

在上表中，要使路由完全静态，所有数据都必须被缓存。然而，你可以有一个动态渲染的路由，它同时使用缓存和未缓存的数据获取。

作为开发人员，你不需要在静态和动态渲染之间做选择，因为 Next.js 将根据使用的功能和 API 自动为每个路由选择最佳的渲染策略。相反，你选择何时[缓存](/docs/app/building-your-application/data-fetching/fetching)或[重新验证特定数据](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)，并且你可以选择[流式传输](#流式传输)部分 UI。

### 动态 API

动态 API 依赖于只能在请求时获知的信息（而不是在预渲染期间提前获知）。使用这些 API 中的任何一个都表明开发者的意图，并将整个路由选择到请求时的动态渲染中。这些 API 包括：

- [`cookies`](/docs/app/api-reference/functions/cookies)
- [`headers`](/docs/app/api-reference/functions/headers)
- [`connection`](/docs/app/api-reference/functions/connection)
- [`draftMode`](/docs/app/api-reference/functions/draft-mode)
- [`searchParams` 属性](/docs/app/api-reference/file-conventions/page#searchparams-optional)
- [`unstable_noStore`](/docs/app/api-reference/functions/unstable_noStore)

### 流式传输

<Image
  alt="图表显示流式传输过程中路由段的并行化，显示单个块的数据获取、渲染和激活。"
  srcLight="/docs/light/sequential-parallel-data-fetching.png"
  srcDark="/docs/dark/sequential-parallel-data-fetching.png"
  width="1600"
  height="525"
/>

流式传输使你能够从服务器逐步渲染 UI。工作被分成块，并在准备好时流式传输给客户端。这允许用户在整个内容完成渲染之前立即看到页面的一部分。

<Image
  alt="图表显示客户端上部分渲染的页面，正在流式传输的块显示加载 UI。"
  srcLight="/docs/light/server-rendering-with-streaming.png"
  srcDark="/docs/dark/server-rendering-with-streaming.png"
  width="1600"
  height="785"
/>

流式传输默认内置于 Next.js App Router 中。这有助于改善初始页面加载性能，以及依赖于较慢数据获取的 UI，这些获取可能会阻塞整个路由的渲染。例如，产品页面上的评论。

你可以使用 `loading.js` 开始流式传输路由段，并使用 [React Suspense](/docs/app/building-your-application/routing/loading-ui-and-streaming) 流式传输 UI 组件。有关更多信息，请参阅[加载 UI 和流式传输](/docs/app/building-your-application/routing/loading-ui-and-streaming)部分。
