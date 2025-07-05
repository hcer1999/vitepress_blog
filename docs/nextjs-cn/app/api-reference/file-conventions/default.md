---
title: default.js
description: default.js 文件的 API 参考。
related:
  title: 了解更多关于并行路由
  links:
    - app/building-your-application/routing/parallel-routes
---

`default.js` 文件用于在 Next.js 无法在完整页面加载后恢复[插槽](/nextjs-cn/app/building-your-application/routing/parallel-routes#slots)的活动状态时，在[并行路由](/nextjs-cn/app/building-your-application/routing/parallel-routes)中渲染一个后备内容。

在[软导航](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#soft-navigation)期间，Next.js 会跟踪每个插槽的活动*状态*（子页面）。然而，对于硬导航（完整页面加载），Next.js 无法恢复活动状态。在这种情况下，对于不匹配当前 URL 的子页面，可以渲染一个 `default.js` 文件。

考虑以下文件夹结构。`@team` 插槽有一个 `settings` 页面，但 `@analytics` 没有。

<Image
  alt="并行路由未匹配的路由"
  srcLight="/docs/light/parallel-routes-unmatched-routes.png"
  srcDark="/docs/dark/parallel-routes-unmatched-routes.png"
  width="1600"
  height="930"
/>

当导航到 `/settings` 时，`@team` 插槽将渲染 `settings` 页面，同时保持 `@analytics` 插槽的当前活动页面。

在刷新时，Next.js 将为 `@analytics` 渲染一个 `default.js`。如果 `default.js` 不存在，则会渲染一个 `404`。

此外，由于 `children` 是一个隐式插槽，当 Next.js 无法恢复父页面的活动状态时，你还需要创建一个 `default.js` 文件来为 `children` 渲染后备内容。

## 参考

### `params`（可选）

一个 Promise，解析为一个对象，该对象包含从根段到插槽子页面的[动态路由参数](/nextjs-cn/app/building-your-application/routing/dynamic-routes)。例如：

```tsx switcher
export default async function Default({ params }: { params: Promise<{ artist: string }> }) {
  const { artist } = await params
}
```

```jsx switcher
export default async function Default({ params }) {
  const { artist } = await params
}
```

| 示例                                       | URL          | `params`                                     |
| ------------------------------------------ | ------------ | -------------------------------------------- |
| `app/[artist]/@sidebar/default.js`         | `/zack`      | `Promise<{ artist: 'zack' }>`                |
| `app/[artist]/[album]/@sidebar/default.js` | `/zack/next` | `Promise<{ artist: 'zack', album: 'next' }>` |

- 由于 `params` 属性是一个 Promise，你必须使用 `async/await` 或 React 的 [`use`](https://react.dev/reference/react/use) 函数来访问其值。
  - 在版本 14 及更早版本中，`params` 是一个同步属性。为了帮助向后兼容，在 Next.js 15 中你仍然可以同步访问它，但这种行为将在未来被废弃。

## 版本历史

| 版本       | 变更                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `v15.0.RC` | `params` 现在是一个 Promise。提供了[代码转换工具](/nextjs-cn/app/guides/upgrading/codemods#150)。 |
| `v13.0.0`  | 引入 `default`。                                                                                  |
