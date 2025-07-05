---
title: loading.js
description: loading.js 文件的 API 参考。
---

# NextJS中文文档 - Loading

**loading** 文件可以基于 [Suspense](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming) 创建即时加载状态。

默认情况下，这个文件是一个[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)，但也可以通过使用 `'use client'` 指令作为客户端组件使用。

```tsx switcher
export default function Loading() {
  // 或者使用自定义加载骨架组件
  return <p>加载中...</p>
}
```

```jsx switcher
export default function Loading() {
  // 或者使用自定义加载骨架组件
  return <p>加载中...</p>
}
```

加载 UI 组件不接受任何参数。

> **须知**：
>
> - 在设计加载 UI 时，你可能会发现使用 [React 开发者工具](https://react.dev/learn/react-developer-tools) 手动触发 Suspense 边界很有帮助。

## 版本历史

| 版本      | 变更             |
| --------- | ---------------- |
| `v13.0.0` | 引入 `loading`。 |
