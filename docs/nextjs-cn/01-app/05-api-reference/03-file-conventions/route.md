---
title: route.js
description: route.js 特殊文件的 API 参考。
---

路由处理器允许你使用 Web [Request](https://developer.mozilla.org/docs/Web/API/Request) 和 [Response](https://developer.mozilla.org/docs/Web/API/Response) API 为给定路由创建自定义请求处理程序。

```ts filename="route.ts" switcher
export async function GET() {
  return Response.json({ message: '你好，世界' })
}
```

```js filename="route.js" switcher
export async function GET() {
  return Response.json({ message: '你好，世界' })
}
```

## 参考

### HTTP 方法

**route** 文件允许你为给定路由创建自定义请求处理程序。支持以下 [HTTP 方法](https://developer.mozilla.org/docs/Web/HTTP/Methods)：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD` 和 `OPTIONS`。

```ts filename="route.ts" switcher
export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// 如果未定义 `OPTIONS`，Next.js 将自动实现 `OPTIONS` 并根据路由处理器中定义的其他方法设置适当的响应 `Allow` 头。
export async function OPTIONS(request: Request) {}
```

```js filename="route.js" switcher
export async function GET(request) {}

export async function HEAD(request) {}

export async function POST(request) {}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}

// 如果未定义 `OPTIONS`，Next.js 将自动实现 `OPTIONS` 并根据路由处理器中定义的其他方法设置适当的响应 `Allow` 头。
export async function OPTIONS(request) {}
```

### 参数

#### `request`（可选）

`request` 对象是一个 [NextRequest](/docs/app/api-reference/functions/next-request) 对象，它是 Web [Request](https://developer.mozilla.org/docs/Web/API/Request) API 的扩展。`NextRequest` 使你能够进一步控制传入的请求，包括轻松访问 `cookies` 和扩展的、已解析的 URL 对象 `nextUrl`。

```ts filename="route.ts" switcher
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl
}
```

```js filename="route.js" switcher
export async function GET(request) {
  const url = request.nextUrl
}
```

#### `context`（可选）

- **`params`**：一个 Promise，解析为包含当前路由的[动态路由参数](/docs/app/building-your-application/routing/dynamic-routes)的对象。

```ts filename="app/dashboard/[team]/route.ts" switcher
export async function GET(request: Request, { params }: { params: Promise<{ team: string }> }) {
  const { team } = await params
}
```

```js filename="app/dashboard/[team]/route.js" switcher
export async function GET(request, { params }) {
  const { team } = await params
}
```

| 示例                             | URL            | `params`                           |
| -------------------------------- | -------------- | ---------------------------------- |
| `app/dashboard/[team]/route.js`  | `/dashboard/1` | `Promise<{ team: '1' }>`           |
| `app/shop/[tag]/[item]/route.js` | `/shop/1/2`    | `Promise<{ tag: '1', item: '2' }>` |
| `app/blog/[...slug]/route.js`    | `/blog/1/2`    | `Promise<{ slug: ['1', '2'] }>`    |

## 示例

### 处理 cookies

```ts filename="route.ts" switcher
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const a = cookieStore.get('a')
  const b = cookieStore.set('b', '1')
  const c = cookieStore.delete('c')
}
```

```js filename="route.js" switcher
import { cookies } from 'next/headers'

export async function GET(request) {
  const cookieStore = await cookies()

  const a = cookieStore.get('a')
  const b = cookieStore.set('b', '1')
  const c = cookieStore.delete('c')
}
```

## 版本历史

| 版本         | 变更                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `context.params` 现在是一个 Promise。提供了[代码转换工具](/docs/app/guides/upgrading/codemods#150)。 |
| `v15.0.0-RC` | `GET` 处理器的默认缓存从静态更改为动态。                                                             |
| `v13.2.0`    | 引入路由处理器。                                                                                     |
