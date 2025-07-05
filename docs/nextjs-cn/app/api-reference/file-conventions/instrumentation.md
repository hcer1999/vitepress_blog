---
title: instrumentation.js
description: instrumentation.js 文件的 API 参考。
related:
  title: 了解更多关于检测
  links:
    - app/guides/instrumentation
---

# NextJS中文文档 - Instrumentation

`instrumentation.js|ts` 文件用于将可观测性工具集成到你的应用程序中，使你能够跟踪性能和行为，并在生产环境中调试问题。

要使用它，请将文件放在应用程序的**根目录**中，或者如果使用 [`src` 文件夹](/nextjs-cn/app/api-reference/file-conventions/src-folder)，则放在其中。

## 导出

### `register`（可选）

该文件导出一个 `register` 函数，当新的 Next.js 服务器实例初始化时，该函数会被调用**一次**。`register` 可以是一个异步函数。

```ts switcher
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
```

```js switcher
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
```

### `onRequestError`（可选）

你可以可选地导出一个 `onRequestError` 函数，将**服务器**错误跟踪到任何自定义可观测性提供程序。

- 如果你在 `onRequestError` 中运行任何异步任务，确保它们被等待。当 Next.js 服务器捕获错误时，将触发 `onRequestError`。
- `error` 实例可能不是抛出的原始错误实例，因为如果在服务器组件渲染期间遇到错误，它可能会被 React 处理。如果发生这种情况，你可以使用错误上的 `digest` 属性来识别实际的错误类型。

```ts switcher
import { type Instrumentation } from 'next'

export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  await fetch('https://.../report-error', {
    method: 'POST',
    body: JSON.stringify({
      message: err.message,
      request,
      context,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
```

```js switcher
export async function onRequestError(err, request, context) {
  await fetch('https://.../report-error', {
    method: 'POST',
    body: JSON.stringify({
      message: err.message,
      request,
      context,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
```

#### 参数

该函数接受三个参数：`error`、`request` 和 `context`。

```ts
export function onRequestError(
  error: { digest: string } & Error,
  request: {
    path: string // 资源路径，例如 /blog?name=foo
    method: string // 请求方法，例如 GET, POST 等
    headers: { [key: string]: string }
  },
  context: {
    routerKind: 'Pages Router' | 'App Router' // 路由器类型
    routePath: string // 路由文件路径，例如 /app/blog/[dynamic]
    routeType: 'render' | 'route' | 'action' | 'middleware' // 发生错误的上下文
    renderSource: 'react-server-components' | 'react-server-components-payload' | 'server-rendering'
    revalidateReason: 'on-demand' | 'stale' | undefined // undefined 表示没有重新验证的正常请求
    renderType: 'dynamic' | 'dynamic-resume' // 'dynamic-resume' 用于 PPR
  },
): void | Promise<void>
```

- `error`：捕获的错误本身（类型始终为 `Error`），以及 `digest` 属性，该属性是错误的唯一 ID。
- `request`：与错误关联的只读请求信息。
- `context`：发生错误的上下文。这可以是路由器的类型（App 或 Pages 路由器），和/或（服务器组件（`'render'`），路由处理器（`'route'`），服务器操作（`'action'`），或中间件（`'middleware'`））。

### 指定运行时

`instrumentation.js` 文件在 Node.js 和 Edge 运行时中都可以使用，但是，你可以使用 `process.env.NEXT_RUNTIME` 来针对特定的运行时。

```js
export function register() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    return require('./register.edge')
  } else {
    return require('./register.node')
  }
}

export function onRequestError() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    return require('./on-request-error.edge')
  } else {
    return require('./on-request-error.node')
  }
}
```

## 版本历史

| 版本      | 变更                                              |
| --------- | ------------------------------------------------- |
| `v15.0.0` | 引入 `onRequestError`，`instrumentation` 变为稳定 |
| `v14.0.4` | Turbopack 支持 `instrumentation`                  |
| `v13.2.0` | 作为实验性功能引入 `instrumentation`              |
