---
title: Next.js 中文文档
description: 了解Next.js中的渲染环境、策略和运行时
---

# Next.js 中文文档 - 渲染基础

渲染是将代码转换为用户界面的过程。Next.js提供了多种渲染方法，使您可以针对特定用例优化应用程序的性能和用户体验。

## 渲染环境

在网络应用中，代码可以在两种环境中渲染：

- **客户端**：在用户的浏览器中渲染用户界面。
- **服务器**：在服务器上渲染用户界面，并将结果发送到客户端。

在Next.js中，应用路由器使用React的最新架构使您能够在**服务器组件**和**客户端组件**之间进行选择。这种灵活性允许您构建混合应用程序，其中大部分应用程序在服务器上渲染以提高性能，而用户交互部分在客户端渲染。

![服务器和客户端组件](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-client-components.png&w=1920&q=75&dpl=dpl_BtyizNFY5NvmVekx6gUHKQFoubSp)

## 服务器组件

服务器组件使您能够在服务器上进行渲染，带来几个重要优势：

- **数据获取**：更靠近数据源，减少请求延迟和瀑布流，提高性能。
- **安全性**：保持敏感信息在服务器端，如API密钥和令牌。
- **缓存**：服务器端渲染的结果可在多个用户请求之间共享并缓存。
- **包大小**：将服务器代码从JavaScript包中排除，减少客户端下载的代码量。
- **初始页面加载和第一个字节时间**：服务器生成HTML允许立即显示内容。
- **搜索引擎优化和社交媒体预览**：渲染的HTML内容对搜索引擎爬虫和社交媒体机器人更友好。
- **流式传输**：允许逐步将内容从服务器发送到客户端，使用户能够更快看到页面部分内容。

在App Router中，**所有组件默认都是服务器组件**，除非您明确选择退出。这使您可以自动采用服务器组件而无需额外工作，并且能够有选择地使用客户端组件。

## 客户端组件

客户端组件使您能够向应用程序添加客户端交互功能。在Next.js中，这些组件在服务器上预渲染，然后在客户端上激活（或"水合"）。

要使用客户端组件，请在文件顶部添加React的`"use client"`指令：

```jsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>计数器: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

`"use client"`指令被放置在文件顶部的导入语句之前，用于在服务器和客户端组件模块之间划定边界。

> **提示**：您不需要为应用程序中的每个组件都添加`"use client"`指令。边界只需要定义一次，所有在该边界内导入的组件（包括子组件）都将被视为客户端组件。

客户端组件适用于以下情况：

- 交互性和事件监听器（如`onClick()`和`onChange()`）
- 使用状态和生命周期效果（如`useState()`和`useEffect()`）
- 浏览器专用API
- 需要特定类的自定义钩子
- 需要React类组件的情况

## 组合模式

通过将服务器和客户端组件组合在一起，您可以构建既能利用服务器所提供的优势（如直接数据库访问和更小的JavaScript包）又能包含丰富交互性的应用程序。

推荐的模式是**默认使用服务器组件**，仅在需要特定客户端功能时才使用客户端组件，让服务器进行尽可能多的工作并减少客户端JavaScript。

常见的组合模式包括：

1. **将客户端组件作为应用的叶子**：让交互性UI留在组件树的末端。
2. **在服务器组件中获取数据**：将数据获取保留在服务器上，避免在客户端进行不必要的API调用。
3. **将props从服务器传递到客户端组件**：将数据从服务器组件传递到客户端组件，避免在客户端再次获取相同数据。

## 边缘和Node.js运行时

Next.js允许您优化特定路由使用Edge或Node.js运行时。

- **Edge运行时**：非常简单，启动时间最短，但缺乏支持高级功能所需的API。
- **Node.js运行时**：可以访问所有Node.js API和生态系统兼容的包。

默认情况下，Next.js使用Node.js运行时。要使用Edge运行时，您可以在页面、布局或路由处理程序中导出一个运行时变量：

```jsx
export const runtime = 'edge' // 'nodejs' (默认值) 或 'edge'
```

## 渲染策略

除了选择服务器或客户端组件外，Next.js还提供了多种优化渲染的方式：

### 静态渲染（默认）

组件在构建时渲染或在后台重新验证期间渲染，结果被缓存并可在多个用户请求之间重用。静态渲染对于没有用户特定内容且内容可以在构建时确定的UI非常有用。

### 动态渲染

动态渲染在请求时会为每个用户渲染组件，这适用于具有用户特定内容或无法在构建时确定的数据的路由。例如，使用`cookie()`或`searchParams`等API会导致整个路由动态渲染。

您也可以通过添加此配置强制路由动态渲染：

```jsx
export const dynamic = 'force-dynamic'
```

### 流式传输

流式传输是一种数据传输技术，允许您逐步从服务器向客户端发送UI。这使用React的Suspense API来分解页面为更小的块，并在它们准备好时逐步发送到客户端。

流式传输对于防止缓慢的数据请求阻塞整个页面特别有用，可以提高用户体验，如显示加载状态或以逐步增强的方式加载内容。

## 下一步学习

更深入了解Next.js渲染机制的各个方面：

- [服务器组件](/nextjs/app-router/building-your-application/rendering/server-components)：探索如何使用服务器组件
- [客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)：了解如何使用客户端组件添加交互性
- [组合模式](/nextjs/app-router/building-your-application/rendering/composition-patterns)：学习如何结合服务器和客户端组件
- [边缘和Node.js运行时](/nextjs/app-router/building-your-application/rendering/runtimes)：了解不同的运行时环境
