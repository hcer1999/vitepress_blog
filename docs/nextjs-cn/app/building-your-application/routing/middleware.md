---
title: 中间件
description: 了解如何使用中间件在请求完成前运行代码。
---

# NextJS中文文档 - Middleware

中间件允许您在请求完成前运行代码。然后，基于传入请求，您可以通过重写、重定向、修改请求或响应头，或直接响应来修改响应。

中间件在缓存内容和路由匹配之前运行。有关更多详细信息，请参阅[匹配路径](#匹配路径)。

## 使用场景

中间件适用的一些常见场景包括：

- 在读取传入请求的部分内容后快速重定向
- 基于 A/B 测试或实验重写到不同的页面
- 为所有页面或部分页面修改头部信息

中间件**不**适合：

- 缓慢的数据获取
- 会话管理

## 约定

在项目根目录使用 `middleware.ts`（或 `.js`）文件来定义中间件。例如，与 `pages` 或 `app` 在同一级别，或在适用的情况下位于 `src` 内。

> **注意**：虽然每个项目只支持一个 `middleware.ts` 文件，但您仍然可以以模块化方式组织中间件逻辑。将中间件功能拆分为单独的 `.ts` 或 `.js` 文件，并将它们导入到您的主 `middleware.ts` 文件中。这允许更清晰地管理特定路由的中间件，并在 `middleware.ts` 中聚合以进行集中控制。通过强制使用单个中间件文件，可以简化配置，防止潜在冲突，并通过避免多个中间件层来优化性能。

## 示例

```ts switcher
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 如果在函数内使用 `await`，可以将此函数标记为 `async`
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// 参见下面的"匹配路径"了解更多
export const config = {
  matcher: '/about/:path*',
}
```

```js switcher
import { NextResponse } from 'next/server'

// 如果在函数内使用 `await`，可以将此函数标记为 `async`
export function middleware(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// 参见下面的"匹配路径"了解更多
export const config = {
  matcher: '/about/:path*',
}
```

## 匹配路径

中间件将对**项目中的每个路由**调用。考虑到这一点，使用匹配器精确定位或排除特定路由至关重要。以下是执行顺序：

1. 来自 `next.config.js` 的 `headers`
2. 来自 `next.config.js` 的 `redirects`
3. 中间件（`rewrites`、`redirects` 等）
4. 来自 `next.config.js` 的 `beforeFiles`（`rewrites`）
5. 文件系统路由（`public/`、`_next/static/`、`pages/`、`app/` 等）
6. 来自 `next.config.js` 的 `afterFiles`（`rewrites`）
7. 动态路由（`/blog/[slug]`）
8. 来自 `next.config.js` 的 `fallback`（`rewrites`）

定义中间件将在哪些路径上运行有两种方式：

1. [自定义匹配器配置](#matcher)
2. [条件语句](#条件语句)

### 匹配器

`matcher` 允许您过滤中间件，使其在特定路径上运行。

```js
export const config = {
  matcher: '/about/:path*',
}
```

您可以使用数组语法匹配单个路径或多个路径：

```js
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
```

`matcher` 配置支持完整的正则表达式，因此支持匹配如否定前瞻或字符匹配等。下面是一个使用否定前瞻来匹配除特定路径外的所有路径的示例：

```js
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api（API 路由）
     * - _next/static（静态文件）
     * - _next/image（图片优化文件）
     * - favicon.ico、sitemap.xml、robots.txt（元数据文件）
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
```

您也可以使用 `missing` 或 `has` 数组，或两者的组合，为特定请求绕过中间件：

```js
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api（API 路由）
     * - _next/static（静态文件）
     * - _next/image（图片优化文件）
     * - favicon.ico、sitemap.xml、robots.txt（元数据文件）
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
}
```

> **需要了解的是**：`matcher` 值需要是常量，以便在构建时进行静态分析。动态值（如变量）将被忽略。

配置的匹配器：

1. 必须以 `/` 开头
2. 可以包含命名参数：`/about/:path` 匹配 `/about/a` 和 `/about/b`，但不匹配 `/about/a/c`
3. 可以在命名参数上有修饰符（以 `:` 开头）：`/about/:path*` 匹配 `/about/a/b/c`，因为 `*` 表示*零个或多个*。`?` 表示*零个或一个*，`+` 表示*一个或多个*
4. 可以使用括号内的正则表达式：`/about/(.*)` 与 `/about/:path*` 相同

在 [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp-1) 文档中阅读更多详细信息。

> **需要了解的是**：为了向后兼容，Next.js 始终将 `/public` 视为 `/public/index`。因此，`/public/:path` 的匹配器将匹配。

### 条件语句

```ts switcher
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}
```

```js switcher
import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}
```

## NextResponse

`NextResponse` API 允许您：

- `redirect` 将传入请求重定向到不同的 URL
- `rewrite` 通过显示给定 URL 重写响应
- 为 API 路由、`getServerSideProps` 和重写目标设置请求头
- 设置响应 cookies
- 设置响应头

<AppOnly>

要生成中间件的响应，您可以：

1. `rewrite` 到生成响应的路由[页面](/nextjs-cn/app/api-reference/file-conventions/page)或[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)
2. 直接返回 `NextResponse`。请参阅[生成响应](#生成响应)

</AppOnly>

<PagesOnly>

要生成中间件的响应，您可以：

1. `rewrite` 到生成响应的路由（[页面](/nextjs-cn/pages/building-your-application/routing/pages-and-layouts)或[Edge API 路由](/nextjs-cn/pages/building-your-application/routing/api-routes)
2. 直接返回 `NextResponse`。请参阅[生成响应](#生成响应)

</PagesOnly>

## 使用 Cookies

Cookies 是常规头。在 `Request` 上，它们存储在 `Cookie` 头中。在 `Response` 上，它们在 `Set-Cookie` 头中。Next.js 提供了一种方便的方法来访问和操作这些 cookies 通过 `NextRequest` 和 `NextResponse` 的 `cookies` 扩展。

1. 对于传入请求，`cookies` 带有以下方法：`get`、`getAll`、`set` 和 `delete` cookies。您可以使用 `has` 检查 cookie 的存在，或使用 `clear` 删除所有 cookies。
2. 对于传出响应，`cookies` 具有以下方法 `get`、`getAll`、`set` 和 `delete`。

```ts switcher
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 假设传入请求中存在 "Cookie:nextjs=fast" 头
  // 使用 `RequestCookies` API 从请求中获取 cookies
  let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast', Path: '/' }]

  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false

  // 使用 `ResponseCookies` API 在响应中设置 cookies
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // 传出响应将具有 `Set-Cookie:vercel=fast;path=/` 头。

  return response
}
```

```js switcher
import { NextResponse } from 'next/server'

export function middleware(request) {
  // 假设传入请求中存在 "Cookie:nextjs=fast" 头
  // 使用 `RequestCookies` API 从请求中获取 cookies
  let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast', Path: '/' }]

  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false

  // 使用 `ResponseCookies` API 在响应中设置 cookies
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/test',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // 传出响应将具有 `Set-Cookie:vercel=fast;path=/test` 头。

  return response
}
```

## 设置头

您可以使用 `NextResponse` API（自 Next.js v13.0.0 起可用）设置请求和响应头。

```ts switcher
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 克隆请求头并设置新头 `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')

  // 您也可以在 NextResponse.next 中设置请求头
  const response = NextResponse.next({
    request: {
      // 新请求头
      headers: requestHeaders,
    },
  })

  // 设置新响应头 `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}
```

```js switcher
import { NextResponse } from 'next/server'

export function middleware(request) {
  // 克隆请求头并设置新头 `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')

  // 您也可以在 NextResponse.next 中设置请求头
  const response = NextResponse.next({
    request: {
      // 新请求头
      headers: requestHeaders,
    },
  })

  // 设置新响应头 `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}
```

> **需要了解的是**：避免设置大头，因为它可能会根据后端 Web 服务器配置导致 [431 Request Header Fields Too Large](https://developer.mozilla.org/docs/Web/HTTP/Status/431) 错误。

### CORS

您可以在中间件中设置 CORS 头，以允许跨源请求，包括 [简单](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests) 和 [预检](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests) 请求。

```tsx switcher
import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['https://acme.com', 'https://my-app.org']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  // 检查请求的来源
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // 处理预检请求
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // 处理简单请求
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

```js switcher
import { NextResponse } from 'next/server'

const allowedOrigins = ['https://acme.com', 'https://my-app.org']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request) {
  // 检查请求的来源
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // 处理预检请求
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // 处理简单请求
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

<AppOnly>

> **需要了解的是**：您可以在 [路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers#cors) 中为单个路由配置 CORS 头。

</AppOnly>/nextjs-cn/

## 生成响应

您可以直接从中间件返回响应，方法是返回 `Response` 或 `NextResponse` 实例。（自 [Next.js v13.1.0](https://nextjs.org/blog/next-1#nextjs-advanced-middleware) 起可用）

```ts switcher
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@lib/auth'

// 限制中间件仅在路径以 `/api/` 开头的路由上运行
export const config = {
  matcher: '/api/:function*',
}

export function middleware(request: NextRequest) {
  // 调用我们的身份验证函数来检查请求
  if (!isAuthenticated(request)) {
    // 使用 JSON 响应表示错误消息
    return Response.json({ success: false, message: 'authentication failed' }, { status: 401 })
  }
}
```

```js switcher
import { isAuthenticated } from '@lib/auth'

// 限制中间件仅在路径以 `/api/` 开头的路由上运行
export const config = {
  matcher: '/api/:function*',
}

export function middleware(request) {
  // 调用我们的身份验证函数来检查请求
  if (!isAuthenticated(request)) {
    // 使用 JSON 响应表示错误消息
    return Response.json({ success: false, message: 'authentication failed' }, { status: 401 })
  }
}
```

### `waitUntil` 和 `NextFetchEvent`

`NextFetchEvent` 对象扩展了本机 [`FetchEvent`](https://developer.mozilla.org/docs/Web/API/FetchEvent) 对象，并包括 [`waitUntil()`](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) 方法。

`waitUntil()` 方法接受一个 promise 作为参数，并延长中间件的生命周期，直到 promise 解决。这对于在后台执行工作非常有用。

```ts
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    fetch('https://my-analytics-platform.com', {
      method: 'POST',
      body: JSON.stringify({ pathname: req.nextUrl.pathname }),
    }),
  )

  return NextResponse.next()
}
```

## 高级中间件标志

在 Next.js 13.1 中，为中间件引入了两个额外的标志，`skipMiddlewareUrlNormalize` 和 `skipTrailingSlashRedirect` 以处理高级用例。

`skipTrailingSlashRedirect` 禁用 Next.js 重定向以添加或删除尾随斜杠。这允许中间件在某些路径中保持尾随斜杠，而在其他路径中则不保持，这可以使增量迁移更容易。

```js
module.exports = {
  skipTrailingSlashRedirect: true,
}
```

```js
const legacyPrefixes = ['/docs', '/blog']

export default async function middleware(req) {
  const { pathname } = req.nextUrl

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  // 应用尾随斜杠重定向此处
  if (
    !pathname.endsWith('/') &&
    !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
  ) {
    req.nextUrl.pathname += '/'
    return NextResponse.redirect(req.nextUrl)
  }
}
```

`skipMiddlewareUrlNormalize` 允许禁用 Next.js URL 规范化，以使直接访问和客户端转换相同。在某些高级情况下，此选项提供了完整的控制，方法是使用原始 URL。

```js
module.exports = {
  skipMiddlewareUrlNormalize: true,
}
```

```js
export default async function middleware(req) {
  const { pathname } = req.nextUrl

  // 获取不规范化的 URL
  // `/dashboard/user/123` 而不是 `/dashboard/user/123%2Fpreferences%3Fitem%3Dbook`
  // 用于直接访问 `/dashboard/user/123/preferences?item=book`
  console.log(pathname)
}
```

## 单元测试（实验）

从 Next.js 15.1 开始，`next/experimental/testing/server` 包包含帮助单元测试中间件文件的实用程序。单元测试中间件可以帮助确保它仅在所需路径上运行，并且自定义路由逻辑按预期工作，在代码到达生产之前。

`unstable_doesMiddlewareMatch` 函数可用于断言中间件是否将为提供的 URL、头和 cookies 运行。

```js
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server'

it('runs on /posts but not on /posts/123', async () => {
  // 假设  /middleware.ts/.js 有 matcher: '/posts/:path*'
  // 检测 matcher 配置是否按预期生效
  const matchedPosts = await unstable_doesMiddlewareMatch({
    url: new URL('/posts', 'http://localhost:3000'),
  })
  expect(matchedPosts).toBe(true)

  const matchedPostId = await unstable_doesMiddlewareMatch({
    url: new URL('/posts/123', 'http://localhost:3000'),
  })
  expect(matchedPostId).toBe(false)
})
```

整个中间件函数也可以测试。

```js
import { unstable_runMiddleware } from 'next/experimental/testing/server'

it('redirects to /docs based on a header', async () => {
  const { response } = await unstable_runMiddleware({
    url: new URL('/some-page', 'http://localhost:3000'),
    headers: {
      'x-docs-redirect': 'true',
    },
  })

  expect(isRewrite(response)).toEqual(true)
  expect(getRewrittenUrl(response)).toEqual('https://other-domain.com/docs')
  // getRedirectUrl 也可以用于重定向响应
})
```

## 运行时

中间件默认使用 Edge 运行时。自 v15.2（canary）起，我们具有实验性支持使用 Node.js 运行时。要启用，请将标志添加到您的 `next.config` 文件中：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    instrumentationHook: true,
    allowMiddlewareNodeRuntime: true,
  },
}

export default nextConfig
```

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    allowMiddlewareNodeRuntime: true,
  },
}

module.exports = nextConfig
```

然后，在您的中间件文件中，将运行时设置为 `nodejs` 在 `config` 对象中：

```js highlight={2} switcher
export const config = {
  runtime: 'nodejs',
  matcher: '/about/:path*',
}
```

> **注意**：此功能尚未推荐用于生产使用。因此，Next.js 将抛出错误，除非您使用 next@canary 发布而不是稳定发布。

## 平台支持

| 部署选项                                                                 | 支持              |
| ------------------------------------------------------------------------ | ----------------- |
| [Node.js 服务器](/nextjs-cn/app/getting-started/deploying#nodejs-server) | Yes               |
| [Docker 容器](/nextjs-cn/app/getting-started/deploying#docker)           | Yes               |
| [静态导出](/nextjs-cn/app/getting-started/deploying#static-export)       | No                |
| [适配器](/nextjs-cn/app/getting-started/deploying#adapters)              | Platform-specific |

了解如何[配置中间件]()，当您自己托管 Next.js 时。

## 版本历史

| 版本      | 更改                                                                              |
| --------- | --------------------------------------------------------------------------------- |
| `v15.2.0` | 中间件现在可以使用 Node.js 运行时（实验）                                         |
| `v13.1.0` | 添加高级中间件标志                                                                |
| `v13.0.0` | 中间件可以修改请求头、响应头，并发送响应                                          |
| `v12.2.0` | 中间件稳定，请参阅[升级指南](/nextjs-cn/app/guides/upgrading/index#middleware)    |
| `v12.0.9` | 在 Edge 运行时中强制绝对 URL ([PR](https://github.com/vercel/next.js/pull/33410)) |
| `v12.0.0` | 中间件（Beta）添加                                                                |
