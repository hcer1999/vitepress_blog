---
title: 客户端组件
description: 了解如何使用客户端组件在客户端渲染应用程序的部分内容。
---

# NextJS中文文档 - Client Components

客户端组件允许你编写交互式 UI，该 UI 会[在服务器上预渲染](https://github.com/reactwg/server-components/discussions/4)，并可以使用客户端 JavaScript 在浏览器中运行。

本页将介绍客户端组件的工作原理、渲染方式以及何时使用它们。

## 客户端渲染的好处

在客户端进行渲染工作有几个好处，包括：

- **交互性**：客户端组件可以使用状态、效果和事件监听器，这意味着它们可以向用户提供即时反馈并更新 UI。
- **浏览器 API**：客户端组件可以访问浏览器 API，如[地理位置](https://developer.mozilla.org/docs/Web/API/Geolocation_API)或[localStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage)。

## 在 Next.js 中使用客户端组件

要使用客户端组件，你可以在文件顶部、导入语句之上添加 React [`'use client'` 指令](https://react.dev/reference/react/use-client)。

`'use client'` 用于声明服务器和客户端组件模块之间的[边界](/nextjs-cn/app/building-your-application/rendering/index#network-boundary)。这意味着，通过在文件中定义 `'use client'`，所有导入到其中的其他模块，包括子组件，都被视为客户端包的一部分。带有 `'use client'` 指令的文件中导出的组件的 props 必须是 React 可[序列化](https://react.dev/reference/rsc/use-client#serializable-types)的，以允许数据从服务器通过边界传递到客户端。

```tsx highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  )
}
```

```jsx highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  )
}
```

下图显示，如果未定义 `'use client'` 指令，则在嵌套组件（`toggle.js`）中使用 `onClick` 和 `useState` 将导致错误。这是因为，默认情况下，App Router 中的所有组件都是不提供这些 API 的服务器组件。通过在 `toggle.js` 中定义 `'use client'` 指令，你可以告诉 React 进入提供这些 API 的客户端边界。

<Image
  alt="Use Client 指令和网络边界"
  srcLight="/docs/light/use-client-directive.png"
  srcDark="/docs/dark/use-client-directive.png"
  width="1600"
  height="1320"
/>

> **定义多个 `'use client'` 入口点**：
>
> 你可以在 React 组件树中定义多个 `'use client'` 入口点。这允许你将应用程序拆分为多个客户端包。
>
> 然而，`'use client'` 不需要在每个需要在客户端渲染的组件中定义。一旦你定义了边界，所有子组件和导入其中的模块都被视为客户端包的一部分。

## 客户端组件如何渲染？

在 Next.js 中，客户端组件的渲染方式取决于请求是完整页面加载（首次访问应用程序或由浏览器刷新触发的页面重新加载）还是后续导航。

### 完整页面加载

为了优化初始页面加载，Next.js 将使用 React 的 API 在服务器上为客户端和服务器组件渲染静态 HTML 预览。这意味着，当用户首次访问你的应用程序时，他们将立即看到页面内容，而无需等待客户端下载、解析和执行客户端组件 JavaScript 包。

在服务器上：

1. React 将服务器组件渲染成一种名为 [**React 服务器组件载荷（RSC 载荷）**](/nextjs-cn/app/building-your-application/rendering/server-components#what-is-the-react-server-component-payload-rsc) 的特殊数据格式，其中包含对客户端组件的引用。
2. Next.js 使用 RSC 载荷和客户端组件 JavaScript 指令在服务器上为路由渲染 **HTML**。

然后，在客户端：

1. HTML 用于立即显示路由的快速非交互式初始预览。
2. React 服务器组件载荷用于协调客户端和服务器组件树，并更新 DOM。
3. JavaScript 指令用于[激活](https://react.dev/reference/react-dom/client/hydrateRoot)客户端组件，使其 UI 具有交互性。

> **什么是激活？**
>
> 激活是将事件监听器附加到 DOM 的过程，使静态 HTML 变得可交互。在后台，激活是通过 React 的 [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) API 完成的。

### 后续导航

在后续导航中，客户端组件完全在客户端上渲染，无需服务器渲染的 HTML。

这意味着客户端组件 JavaScript 包会被下载和解析。一旦包准备就绪，React 将使用 [RSC 载荷](/nextjs-cn/app/building-your-application/rendering/server-components#what-is-the-react-server-component-payload-rsc) 协调客户端和服务器组件树，并更新 DOM。

## 返回服务器环境

有时，在声明了 `'use client'` 边界后，你可能想要回到服务器环境。例如，你可能想要减少客户端包大小，在服务器上获取数据，或使用仅在服务器上可用的 API。

即使理论上嵌套在客户端组件内，你也可以通过交错客户端和服务器组件以及[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)来将代码保留在服务器上。有关更多信息，请参阅[组合模式](/nextjs-cn/app/building-your-application/rendering/composition-patterns)页面。
