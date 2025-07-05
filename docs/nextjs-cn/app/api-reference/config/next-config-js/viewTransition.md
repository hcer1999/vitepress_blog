---
title: viewTransition
description: 在 App Router 中启用 React 的视图过渡 API
version: experimental
---

`viewTransition` 是一个实验性标志，用于启用 React 中新的实验性[视图过渡 API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)。此 API 允许你利用原生的视图过渡浏览器 API 创建 UI 状态之间的无缝过渡。

要启用此功能，你需要在 `next.config.js` 文件中将 `viewTransition` 属性设置为 `true`。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
}

module.exports = nextConfig
```

> 重要提示：此功能不是由 Next.js 团队开发或维护的 — 它是来自 React 团队的实验性 API。它仍处于**早期阶段**，**不推荐用于生产环境**。该实现仍在迭代中，其行为可能会在未来的 React 版本中发生变化。
> 启用此功能需要理解 API 的实验性质。要充分理解其行为，请参考 [React pull request](https://github.com/facebook/react/pull/31975) 和相关讨论。

## 使用方法

启用后，你可以在应用程序中从 React 导入 `ViewTransition` 组件：

```jsx
import { unstable_ViewTransition as ViewTransition } from 'react'
```

然而，目前文档和示例有限，你需要直接参考 React 的源代码和讨论来了解其工作原理。

### 在线演示

查看我们的 [Next.js 视图过渡演示](https://view-transition-example.vercel.app) 以了解此功能的实际效果。

随着此 API 的发展，我们将更新文档并分享更多示例。但目前，我们强烈建议不要在生产环境中使用此功能。
