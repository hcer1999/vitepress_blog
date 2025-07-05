---
title: devIndicators
description: 用于配置开发过程中为当前查看的路由提供上下文的屏幕指示器的配置选项。
---

`devIndicators` 允许您配置在开发过程中为当前查看的路由提供上下文的屏幕指示器。

```ts
  devIndicators: false | {
    position?: 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left', // 默认为 'bottom-left',
  },
```

将 `devIndicators` 设置为 `false` 将隐藏指示器，但 Next.js 将继续显示遇到的任何构建或运行时错误。

## 故障排除

### 指示器没有将路由标记为静态

如果您期望某个路由是静态的，但指示器将其标记为动态，那么很可能该路由已选择退出静态渲染。

您可以通过使用 `next build --debug` 构建应用程序并检查终端中的输出来确认路由是[静态](/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)还是[动态](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)。静态（或预渲染）路由将显示一个 `○` 符号，而动态路由将显示一个 `ƒ` 符号。例如：

```bash
Route (app)                              Size     First Load JS
┌ ○ /_not-found                          0 B               0 kB
└ ƒ /products/[id]                       0 B               0 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

<AppOnly>

路由选择退出静态渲染的原因有两个：

- 存在依赖于运行时信息的[动态 API](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-apis)。
- [未缓存的数据请求](/nextjs-cn/app/building-your-application/data-fetching/fetching)，例如对 ORM 或数据库驱动程序的调用。

检查您的路由是否存在这些条件，如果无法静态渲染路由，请考虑使用 [`loading.js`](/nextjs-cn/app/api-reference/file-conventions/loading) 或 [`<Suspense />`](https://react.dev/reference/react/Suspense) 来利用[流式传输](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming#what-is-streaming)。

</AppOnly>

<PagesOnly>

当从页面导出 [`getServerSideProps`](/nextjs-cn/pages/building-your-application/data-fetching/get-server-side-props) 或 [`getInitialProps`](/nextjs-cn/pages/api-reference/functions/get-initial-props) 时，该页面将被标记为动态。

</PagesOnly>

## 版本历史

| 版本      | 变更                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `v15.2.0` | 改进了带有新 `position` 选项的屏幕指示器。`appIsrStatus`、`buildActivity` 和 `buildActivityPosition` 选项已被弃用。 |
| `v15.0.0` | 添加了带有 `appIsrStatus` 选项的静态屏幕指示器。                                                                    |
