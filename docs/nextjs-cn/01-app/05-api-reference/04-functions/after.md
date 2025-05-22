---
title: after
description: after 函数的 API 参考。
---

`after` 允许你安排在响应（或预渲染）完成后执行的工作。这对于不应阻塞响应的任务和其他副作用（如日志记录和分析）非常有用。

它可以在[服务器组件](/docs/app/building-your-application/rendering/server-components)（包括 [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)）、[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)、[路由处理程序](/docs/app/building-your-application/routing/route-handlers)和[中间件](/docs/app/building-your-application/routing/middleware)中使用。

该函数接受一个回调，该回调将在响应（或预渲染）完成后执行：

```tsx filename="app/layout.tsx" switcher
import { after } from 'next/server'
// 自定义日志函数
import { log } from '@/app/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  after(() => {
    // 在布局渲染并发送给用户后执行
    log()
  })
  return <>{children}</>
}
```

```jsx filename="app/layout.jsx" switcher
import { after } from 'next/server'
// 自定义日志函数
import { log } from '@/app/utils'

export default function Layout({ children }) {
  after(() => {
    // 在布局渲染并发送给用户后执行
    log()
  })
  return <>{children}</>
}
```

> **须知：** `after` 不是[动态 API](/docs/app/building-your-application/rendering/server-components#dynamic-apis)，调用它不会导致路由变为动态。如果它在静态页面中使用，回调将在构建时执行，或者在页面重新验证时执行。

## 参考

### 参数

- 一个回调函数，它将在响应（或预渲染）完成后执行。

### 持续时间

`after` 将运行平台的默认或配置的路由最大持续时间。如果你的平台支持，你可以使用 [`maxDuration`](/docs/app/api-reference/file-conventions/route-segment-config#maxduration) 路由段配置来配置超时限制。

## 须知

- 即使响应未成功完成，`after` 也会执行。包括抛出错误或调用 `notFound` 或 `redirect` 时。
- 你可以使用 React `cache` 来去重 `after` 内部调用的函数。
- `after` 可以嵌套在其他 `after` 调用中，例如，你可以创建包装 `after` 调用的实用函数来添加额外的功能。

## 示例

### 使用请求 API

你可以在[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)和[路由处理程序](/docs/app/api-reference/file-conventions/route)中的 `after` 内部使用 [`cookies`](/docs/app/api-reference/functions/cookies) 和 [`headers`](/docs/app/api-reference/functions/headers) 等请求 API。这对于在突变后记录活动很有用。例如：

```ts filename="app/api/route.ts" highlight={2,7-9} switcher
import { after } from 'next/server'
import { cookies, headers } from 'next/headers'
import { logUserAction } from '@/app/utils'

export async function POST(request: Request) {
  // 执行突变
  // ...

  // 记录用户活动以用于分析
  after(async () => {
    const userAgent = (await headers().get('user-agent')) || 'unknown'
    const sessionCookie = (await cookies().get('session-id'))?.value || 'anonymous'

    logUserAction({ sessionCookie, userAgent })
  })

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
```

```js filename="app/api/route.js" highlight={2,7-9} switcher
import { after } from 'next/server'
import { cookies, headers } from 'next/headers'
import { logUserAction } from '@/app/utils'

export async function POST(request) {
  // 执行突变
  // ...

  // 记录用户活动以用于分析
  after(async () => {
    const userAgent = (await headers().get('user-agent')) || 'unknown'
    const sessionCookie = (await cookies().get('session-id'))?.value || 'anonymous'

    logUserAction({ sessionCookie, userAgent })
  })

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
```

然而，你不能在[服务器组件](/docs/app/building-your-application/rendering/server-components)中的 `after` 内部使用这些请求 API。这是因为 Next.js 需要知道树的哪一部分访问请求 API 以支持[部分预渲染](/docs/app/getting-started/partial-prerendering)，但 `after` 在 React 的渲染生命周期之后运行。

## 平台支持

| 部署选项                                                            | 支持     |
| ------------------------------------------------------------------- | -------- |
| [Node.js 服务器](/docs/app/getting-started/deploying#nodejs-server) | 是       |
| [Docker 容器](/docs/app/getting-started/deploying#docker)           | 是       |
| [静态导出](/docs/app/getting-started/deploying#static-export)       | 否       |
| [适配器](/docs/app/getting-started/deploying#adapters)              | 平台特定 |

了解如何在[自托管 Next.js](/docs/app/guides/self-hosting#after) 时配置 `after`。

<details id="after-serverless">
  <summary>参考：为无服务器平台支持 `after`</summary>
  在无服务器上下文中使用 `after` 需要在响应发送后等待异步任务完成。在 Next.js 和 Vercel 中，这是通过一个名为 `waitUntil(promise)` 的原语实现的，它会延长无服务器调用的生命周期，直到传递给 [`waitUntil`](https://vercel.com/docs/functions/functions-api-reference#waituntil) 的所有 promise 都已解决。

如果你希望用户能够运行 `after`，你将必须提供你自己的 `waitUntil` 实现，其行为类似。

当调用 `after` 时，Next.js 将像这样访问 `waitUntil`：

```jsx
const RequestContext = globalThis[Symbol.for('@next/request-context')]
const contextValue = RequestContext?.get()
const waitUntil = contextValue?.waitUntil
```

这意味着 `globalThis[Symbol.for('@next/request-context')]` 应该包含这样的一个对象：

```tsx
type NextRequestContext = {
  get(): NextRequestContextValue | undefined
}

type NextRequestContextValue = {
  waitUntil?: (promise: Promise<any>) => void
}
```

以下是实现示例。

```tsx
import { AsyncLocalStorage } from 'node:async_hooks'

const RequestContextStorage = new AsyncLocalStorage<NextRequestContextValue>()

// 定义并注入 next.js 将使用的访问器
const RequestContext: NextRequestContext = {
  get() {
    return RequestContextStorage.getStore()
  },
}
globalThis[Symbol.for('@next/request-context')] = RequestContext

const handler = (req, res) => {
  const contextValue = { waitUntil: YOUR_WAITUNTIL }
  // 提供值
  return RequestContextStorage.run(contextValue, () => nextJsHandler(req, res))
}
```

</details>

## 版本历史

| 版本历史     | 描述                    |
| ------------ | ----------------------- |
| `v15.1.0`    | `after` 变为稳定版。    |
| `v15.0.0-rc` | 引入 `unstable_after`。 |
