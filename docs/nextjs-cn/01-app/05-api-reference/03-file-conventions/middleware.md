---
title: middleware.js
description: 了解 Next.js 中间件如何帮助你在请求完成前运行代码。
related:
  title: Learn more about Middleware
  links:
    - app/building-your-application/routing/middleware
---

中间件允许你在请求完成之前运行代码。然后，你可以根据传入的请求修改响应，通过重写、重定向、修改请求或响应头或直接响应。

中间件在缓存内容和路由匹配之前运行。参阅[匹配路径](#匹配路径)了解更多信息。

## 约定

使用项目根目录中的 `middleware.ts`（或 `.js`）文件定义中间件：

```ts filename="middleware.ts"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 如果返回值是 Response 或 NextResponse 对象，则该响应会被使用
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// 配置匹配路径
export const config = {
  matcher: '/about/:path*',
}
```

## 匹配路径

中间件将在以下情况下被调用：

1. [匹配器](#匹配器)中定义的路径
2. 任何 `app` 目录中的路由

### 匹配器

`matcher` 允许你通过特定路径运行中间件。

```js filename="middleware.js"
export const config = {
  matcher: '/about/:path*',
}
```

你可以使用一个或多个匹配器，并且有两种方式来使用它们：

1. 使用匹配路径的字符串数组：

```js filename="middleware.js"
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
```

2. 使用配置对象：

```js filename="middleware.js"
export const config = {
  matcher: [
    /*
     * 匹配所有的请求路径，除了以下路径：
     * - api（API 路由）
     * - _next/static（静态文件）
     * - _next/image（图像优化文件）
     * - favicon.ico（网站图标）
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

`matcher` 的值可以是一个完整的路径或者路径的一部分：

- `/about/:path` 匹配 `/about/a` 但不匹配 `/about/a/b`
- `/about/:path*` 匹配 `/about/a/b` 因为 `*` 是零个或多个参数
- 你还可以使用命名参数，例如 `/about/:path+`，其中 `+` 表示一个或多个参数。

你也可以将正则表达式与命名参数结合使用：

- `/about/:path(\\d{1,})` 匹配 `/about/123` 但不匹配 `/about/abc`
- 命名参数需要用括号括起来：`/about/:path(\\d{1,})`

> **须知**：
>
> - 在 JavaScript 正则表达式中，反斜杠 `\` 需要被转义，所以 `\d` 应该写成 `\\d`
> - 为了保持一致 `matcher` 会按照和 `next.config.js` 中的 `redirects` 相同的优先级排序
> - 该功能是扩展的路径匹配功能，基于 [path-to-regexp](https://github.com/pillarjs/path-to-regexp)。详细的参数语法，请参考 [API 文档](https://github.com/pillarjs/path-to-regexp/tree/v6.2.1#parameters)

> **注意**：
>
> - `matcher` 只支持用于预配置的路径，运行时路径匹配需要[条件语句](#条件语句)。
> - 如果你使用 `matcher` 选项，将只执行匹配的路径，覆盖默认行为。

## Exports

### Middleware function

The file must export a single function, either as a default export or named `middleware`. Note that multiple middleware from the same file are not supported.

```js filename="middleware.js"
// Example of default export
export default function middleware(request) {
  // Middleware logic
}
```

### Config object (optional)

Optionally, a config object can be exported alongside the Middleware function. This object includes the [matcher](#matcher) to specify paths where the Middleware applies.

#### Matcher

The `matcher` option allows you to target specific paths for the Middleware to run on. You can specify these paths in several ways:

- For a single path: Directly use a string to define the path, like `'/about'`.
- For multiple paths: Use an array to list multiple paths, such as `matcher: ['/about', '/contact']`, which applies the Middleware to both `/about` and `/contact`.

Additionally, `matcher` supports complex path specifications through regular expressions, such as `matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']`, enabling precise control over which paths to include or exclude.

The `matcher` option also accepts an array of objects with the following keys:

- `source`: The path or pattern used to match the request paths. It can be a string for direct path matching or a pattern for more complex matching.
- `regexp` (optional): A regular expression string that fine-tunes the matching based on the source. It provides additional control over which paths are included or excluded.
- `locale` (optional): A boolean that, when set to `false`, ignores locale-based routing in path matching.
- `has` (optional): Specifies conditions based on the presence of specific request elements such as headers, query parameters, or cookies.
- `missing` (optional): Focuses on conditions where certain request elements are absent, like missing headers or cookies.

```js filename="middleware.js"
export const config = {
  matcher: [
    {
      source: '/api/*',
      regexp: '^/api/(.*)',
      locale: false,
      has: [
        { type: 'header', key: 'Authorization', value: 'Bearer Token' },
        { type: 'query', key: 'userId', value: '123' },
      ],
      missing: [{ type: 'cookie', key: 'session', value: 'active' }],
    },
  ],
}
```

## Params

### `request`

When defining Middleware, the default export function accepts a single parameter, `request`. This parameter is an instance of `NextRequest`, which represents the incoming HTTP request.

```tsx filename="middleware.ts" switcher
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware logic goes here
}
```

```js filename="middleware.js" switcher
export function middleware(request) {
  // Middleware logic goes here
}
```

> **Good to know**:
>
> - `NextRequest` is a type that represents incoming HTTP requests in Next.js Middleware, whereas [`NextResponse`](#nextresponse) is a class used to manipulate and send back HTTP responses.

## NextResponse

Middleware can use the [`NextResponse`](/docs/app/building-your-application/routing/middleware#nextresponse) object which extends the [Web Response API](https://developer.mozilla.org/en-US/docs/Web/API/Response). By returning a `NextResponse` object, you can directly manipulate cookies, set headers, implement redirects, and rewrite paths.

> **Good to know**: For redirects, you can also use `Response.redirect` instead of `NextResponse.redirect`.

## Runtime

Middleware uses [Edge runtime](/docs/app/api-reference/edge) by default. If you do not want this, you can use the [full Node.js runtime](/blog/next-15-2#nodejs-middleware-experimental) to run Middleware.

## Version History

| Version   | Changes                                                                                       |
| --------- | --------------------------------------------------------------------------------------------- |
| `v13.1.0` | Advanced Middleware flags added                                                               |
| `v13.0.0` | Middleware can modify request headers, response headers, and send responses                   |
| `v12.2.0` | Middleware is stable, please see the [upgrade guide](/docs/messages/middleware-upgrade-guide) |
| `v12.0.9` | Enforce absolute URLs in Edge Runtime ([PR](https://github.com/vercel/next.js/pull/33410))    |
| `v12.0.0` | Middleware (Beta) added                                                                       |

## 导出

### 中间件函数（必需）

```ts
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 中间件逻辑
}
```

你必须从 `middleware` 文件中导出一个名为 `middleware` 的函数。该函数接受一个参数：

- `request` - 传入的 [NextRequest](#nextrequest)

还有一个可选的返回值：

- `response` - 如果提供了 [NextResponse](#nextresponse) 或 [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象，则将返回该对象。如果返回 `undefined`，则请求将继续，就像没有调用中间件一样。

### `config` 对象（可选）

```ts
export const config = {
  matcher: '/about/:path*',
}
```

如果导出了可选的 `config` 对象，中间件只会在路径匹配上时运行。更多细节请参阅[匹配器](#匹配器)。

## 类型

中间件由两种类型组成：[NextRequest](#nextrequest) 和 [NextResponse](#nextresponse)。

### NextRequest

`NextRequest` 扩展了原生的 [Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 接口，提供了几个便利的方法。

#### `cookies`

使用 `cookies` 获取或修改请求的 cookies。

```ts
// /home
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取 cookie
  let cookie = request.cookies.get('nextjs')
  const allCookies = request.cookies.getAll()

  // 获取 cookie 的值
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

  // 设置 cookies
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })

  // 删除 cookies
  response.cookies.delete('vercel')
  response.cookies.clear()

  return response
}
```

#### `nextUrl`

`request.nextUrl` 扩展了原生的 URL API，并提供了用于处理和修改 URL 的属性和方法：

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  url.searchParams.set('foo', 'bar')
  return NextResponse.rewrite(url)
}
```

#### `geo`

获取地理位置信息。这些信息仅在部署在 Vercel 并启用边缘中间件时可用：

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country || '国家/地区未知'
  const city = request.geo?.city || '城市未知'
  const region = request.geo?.region || '地区未知'
  const latitude = request.geo?.latitude || '纬度未知'
  const longitude = request.geo?.longitude || '经度未知'

  console.log(`国家: ${country}`)
  console.log(`城市: ${city}`)
  console.log(`地区: ${region}`)
  console.log(`纬度: ${latitude}`)
  console.log(`经度: ${longitude}`)

  return NextResponse.next()
}
```

#### `ip`

获取请求的 IP 地址：

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ip = request.ip || 'IP 未知'
  console.log(`IP 地址: ${ip}`)
  return NextResponse.next()
}
```

### NextResponse

`NextResponse` 扩展了原生的 [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 接口，提供了便利的方法来创建重定向或重写响应。

#### `cookies`

为响应设置、获取或删除 cookies:

```ts
// /home
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 创建响应
  const response = NextResponse.next()

  // 获取 cookie
  let cookie = response.cookies.get('nextjs')
  const allCookies = response.cookies.getAll()

  // 获取 cookie 的值
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

  // 设置 cookies
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })

  // 删除 cookies
  response.cookies.delete('vercel')
  response.cookies.clear()

  return response
}
```

#### `json()`

接受数据并序列化为 JSON:

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.json({ message: '你好，世界！' })
}
```

#### `next()`

返回未修改的原始请求:

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 如果请求中有 cookie，则返回原始请求
  if (request.cookies.has('logged-in')) {
    return NextResponse.next()
  }

  // 否则重定向到登录页面
  return NextResponse.redirect(new URL('/login', request.url))
}
```

#### `redirect()`

将请求重定向到指定的 URL:

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/new-page', request.url))
}
```

使用相对 URL 进行重定向时，`request.url` 是必需的：

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 如果请求来自页面，则重定向到 `/home`
  if (request.nextUrl.pathname === '/about') {
    return NextResponse.redirect(new URL('/home', request.url))
  }
}
```

#### `rewrite()`

在代理请求时使用指定的 URL 重写响应, 即内部重定向:

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 将代理请求到 `/proxy` 的请求转发到新的 URL
  if (request.nextUrl.pathname === '/proxy') {
    return NextResponse.rewrite(new URL('/rewrite', request.url))
  }
}
```

## 高级中间件标志

若要在部署到 Edge runtime 时使用 `headers()` 或 `cookies()` 等 API，请在你的 `next.config.js` 中设置如下标志：

```js filename="next.config.js"
module.exports = {
  experimental: {
    instrumentationHook: true,
    allowMiddlewareResponseBody: true,
  },
}
```

## 版本历史

| 版本         | 变更                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `context.params` 现在是一个 Promise。提供了[代码转换工具](/docs/app/guides/upgrading/codemods#150)。 |
| `v15.0.0-RC` | 预处理位置现已调整在缓存内容之前。                                                                   |
| `v13.1.0`    | 添加了 `matcher` 配置项。                                                                            |
| `v12.2.0`    | 中间件现在稳定。旧的 `_middleware` 文件会自动按迁移指南更新。                                        |
| `v12.0.9`    | 在边缘运行时强制执行严格的运行时兼容性检查，导出的 `nextUrl` 属性。                                  |
| `v12.0.0`    | 引入中间件。                                                                                         |
