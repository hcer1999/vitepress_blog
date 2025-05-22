---
title: template.js
description: template.js 文件的 API 参考。
---

**template** 文件类似于[布局](/docs/app/building-your-application/routing/layouts-and-templates#layouts)，它包装一个布局或页面。与在路由之间保持不变并维持状态的布局不同，模板被赋予一个唯一的键，这意味着子客户端组件在导航时会重置它们的状态。

```tsx filename="app/template.tsx" switcher
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

```jsx filename="app/template.jsx" switcher
export default function Template({ children }) {
  return <div>{children}</div>
}
```

<Image
  alt="template.js 特殊文件"
  srcLight="/docs/light/template-special-file.png"
  srcDark="/docs/dark/template-special-file.png"
  width="1600"
  height="444"
/>

虽然不太常见，但在以下情况下，你可能会选择使用模板而不是布局：

- 依赖 `useEffect`（例如记录页面浏览量）和 `useState`（例如每页反馈表单）的功能。
- 更改默认框架行为。例如，布局内的 Suspense 边界仅在首次加载布局时显示后备内容，而不是在切换页面时显示。对于模板，在每次导航时都会显示后备内容。

## Props

### `children`（必需）

模板接受 `children` 属性。例如：

```jsx filename="输出"
<Layout>
  {/* 注意模板自动获得唯一的键。 */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

> **须知**：
>
> - 默认情况下，`template` 是一个[服务器组件](/docs/app/building-your-application/rendering/server-components)，但也可以通过 `'use client'` 指令用作[客户端组件](/docs/app/building-your-application/rendering/client-components)。
> - 当用户在共享 `template` 的路由之间导航时，组件的新实例会被挂载，DOM 元素会被重新创建，客户端组件中的状态**不会**被保留，并且效果会重新同步。

## 版本历史

| 版本      | 变更              |
| --------- | ----------------- |
| `v13.0.0` | 引入 `template`。 |
