---
title: Next.js 中文文档 - 中间件
description: 了解如何使用中间件在请求完成之前运行代码，实现跨路由功能如验证和重写
---

# Next.js 中文文档 - 中间件

中间件允许您在请求完成之前执行代码。然后，您可以根据传入的请求，通过重写、重定向、修改请求或响应头或直接响应来修改响应。

中间件在缓存内容和路由匹配之前运行。请参阅[匹配路径](#匹配路径)以了解有关中间件执行顺序的更多信息。

## 约定

使用根目录中的`middleware.ts`（或`.js`）文件定义中间件：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 此函数可以标记为异步
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// 配置匹配路径
export const config = {
  matcher: '/about/:path*',
}
```

## 匹配路径

中间件将对以下内容运行：

1. 所有路由
2. `next.config.js`中指定的自定义配置，使用`matcher`属性
3. 中间件文件中的`matcher`属性

### 匹配器

`matcher`允许您过滤中间件仅在特定路径上运行。

```ts
// middleware.ts
export const config = {
  matcher: '/about/:path*',
}
```

您可以使用数组匹配多个路径：

```ts
// middleware.ts
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
```

`matcher`使用[路径到正则表达式](https://github.com/pillarjs/path-to-regexp)语法配置，支持的参数有：

- `:path` - 匹配任何路由段，例如，`/about/:path`匹配`/about/a`和`/about/b`，但不匹配`/about/a/c`
- `:path*` - 匹配任何路由段和子段，例如，`/about/:path*`匹配`/about/a/b/c`
- `:path?` - 匹配无或一个路由段，例如，`/about/:path?`匹配`/about`和`/about/a`，但不匹配`/about/a/b`

`matcher`中的值必须是常量，以便在构建时进行分析。变量如`matcher: ['/about/:path*', process.env.VARIABLE]`将不工作，因为`process.env.VARIABLE`是一个变量。

您还可以使用对象语法进行高级匹配，包括基于正则表达式的条件：

```ts
export const config = {
  matcher: [
    // 需要以 `/api/` 开头
    '/api/:function*',
    // 排除以 `/api/auth/` 开头的路径
    {
      source: '/api/:path*',
      not: ['/api/auth/:path*'],
    },
    // 排除以 `.jpg` 结尾的路径
    {
      source: '/:path*',
      not: ['/:path*.jpg'],
    },
    // 仅为特定的主机名运行
    {
      source: '/some-page',
      has: [
        {
          type: 'host',
          value: 'example.com',
        },
      ],
    },
    // 仅当请求具有特定头时运行
    {
      source: '/:path*',
      has: [
        {
          type: 'header',
          key: 'Authorization',
          value: 'Bearer Token',
        },
      ],
    },
    // 仅在请求包含特定Cookie时运行
    {
      source: '/:path*',
      has: [
        {
          type: 'cookie',
          key: 'loggedIn',
          value: 'true',
        },
      ],
    },
    // 仅当查询参数匹配时运行
    {
      source: '/:path*',
      has: [
        {
          type: 'query',
          key: 'page',
          value: 'home',
        },
      ],
    },
  ],
}
```

> **注意**：如果同时在`next.config.js`和中间件文件中使用`matcher`，它们将合并在一起，不会覆盖。

### 对所有路由运行

中间件默认对所有请求运行：

```ts
// middleware.ts
export function middleware(request) {
  // 对 '/' 和 '/about' 等所有路径运行
}
```

这可能影响性能，因此明确指定路径通常是一个好实践。

### 条件语句

```ts
// middleware.ts
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

## NextResponse

`NextResponse` API允许您：

- `redirect` - 将传入的请求重定向到不同的URL
- `rewrite` - 重写响应，通过在代理请求到不同URL的同时保持原始URL
- `next` - 继续中间件链
- 直接响应请求，如通过 `NextResponse.json()`

此外，您可以修改请求头、响应头、cookies和更多内容。

### 重定向

使用`NextResponse.redirect`将用户重定向到另一个URL。以下示例重定向用户到`/login`：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/login', request.url))
}
```

新的URL可以使用当前URL（`request.url`）构造，也可以是一个完全独立的URL：

```ts
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware() {
  // 绝对URL
  return NextResponse.redirect(new URL('https://example.com'))
}
```

### 重写

使用`NextResponse.rewrite`重写URL会代理到目标URL，而用户保持在当前URL上。

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL('/new-page', request.url))
}
```

例如，用户导航到`/about`时，URL保持为`/about`，但显示的是`/new-page`的内容。

### 设置响应cookies

使用`NextResponse.next()`设置响应cookie：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 创建响应
  const response = NextResponse.next()

  // 设置一个cookie
  response.cookies.set('myCookie', 'cookieValue')

  // 设置带选项的cookie
  response.cookies.set({
    name: 'anotherCookie',
    value: 'cookieValue',
    path: '/path', // 对所有路径使用 "/"
    expires: new Date('2023-12-31').toUTCString(),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  return response
}
```

### 读取请求cookies

使用`Request`对象读取传入请求的cookie：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取单个cookie
  const authToken = request.cookies.get('authToken')?.value
  // => 'cookieValue' 或 undefined

  // 获取所有cookies
  const allCookies = request.cookies.getAll()
  // => [{ name: 'authToken', value: 'cookieValue' }, ...]

  // 检查cookie是否存在
  const hasCookie = request.cookies.has('authToken')
  // => true 或 false

  console.log('从请求中读取的Cookie:', authToken)

  return NextResponse.next()
}
```

### 设置响应头

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 创建响应
  const response = NextResponse.next()

  // 添加响应头
  response.headers.set('x-custom-header', 'my-value')
  response.headers.set('x-another-custom-header', 'another-value')

  return response
}
```

### 读取请求头

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取特定头
  const authHeader = request.headers.get('Authorization')

  // 获取多个头值
  const acceptLanguage = request.headers
    .get('Accept-Language')
    ?.split(',')
    .map((lang) => lang.trim())

  console.log('授权头:', authHeader)
  console.log('接受语言:', acceptLanguage)

  return NextResponse.next()
}
```

### 生成响应

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 直接从中间件返回JSON响应
  return NextResponse.json(
    {
      message: 'Hello from Middleware!',
      time: Date.now(),
    },
    {
      status: 200,
      headers: {
        'x-middleware-cache': 'no-cache',
        'content-type': 'application/json',
      },
    },
  )
}
```

## 中间件的使用场景

### 国际化路由（i18n）

中间件常用于添加对多语言的支持：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supportedLocales = ['en', 'fr', 'zh']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  // 检查支持的语言环境
  const { pathname } = request.nextUrl

  // 检查路径是否已经有支持的区域设置
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  // 从cookie、接受语言头或默认值中获取区域设置
  const locale =
    request.cookies.get('NEXT_LOCALE')?.value ||
    request.headers.get('Accept-Language')?.split(',')[0].split('-')[0] ||
    defaultLocale

  const finalLocale = supportedLocales.includes(locale) ? locale : defaultLocale

  // 重写URL以添加区域设置
  const newUrl = new URL(`/${finalLocale}${pathname}`, request.url)

  // 复制查询参数
  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    newUrl.searchParams.set(key, value)
  }

  return NextResponse.rewrite(newUrl)
}
```

### 身份验证与授权

中间件非常适合处理身份验证和授权：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

// 需要身份验证的路径
const PROTECTED_PATHS = ['/dashboard', '/profile', '/api/protected']

// 免身份验证的API路径
const AUTH_PATHS = ['/api/auth/login', '/api/auth/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 允许身份验证路由而不检查
  if (AUTH_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 检查其他路由是否受保护
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // 从cookie获取JWT令牌
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // 重定向到登录页面
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // 验证令牌
      const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret')

      // 您可以将验证的用户信息添加到请求头
      const response = NextResponse.next()
      response.headers.set('x-user-id', decoded.sub)
      return response
    } catch (error) {
      // 令牌无效 - 清除并重定向到登录
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
  }

  // 未受保护的路径 - 允许请求
  return NextResponse.next()
}
```

### 地理位置和IP信息

使用中间件基于地理位置信息或IP地址进行定制：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US'
  const city = request.geo?.city || 'Unknown'
  const region = request.geo?.region || 'Unknown'

  const ip = request.ip || '127.0.0.1'

  console.log(`请求来自 ${city}, ${region}, ${country} (IP: ${ip})`)

  // 基于国家重定向到特定页面
  if (country === 'CN') {
    return NextResponse.rewrite(new URL('/cn', request.url))
  }

  if (country === 'FR') {
    return NextResponse.rewrite(new URL('/fr', request.url))
  }

  // 将地理信息添加到请求头
  const response = NextResponse.next()
  response.headers.set(
    'x-user-geo',
    JSON.stringify({
      country,
      city,
      region,
    }),
  )

  return response
}
```

### A/B测试

实现简单的A/B测试：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 测试页面的路径
  if (request.nextUrl.pathname === '/pricing') {
    // 获取或创建测试组cookie
    let testGroup = request.cookies.get('ab-test-group')?.value

    if (!testGroup) {
      // 随机分配用户到A或B组
      testGroup = Math.random() < 0.5 ? 'a' : 'b'
    }

    // 创建响应
    const url = new URL(testGroup === 'a' ? '/pricing-a' : '/pricing-b', request.url)

    const response = NextResponse.rewrite(url)

    // 如果没有测试组cookie，设置它
    if (!request.cookies.has('ab-test-group')) {
      response.cookies.set('ab-test-group', testGroup, {
        maxAge: 60 * 60 * 24 * 7, // 1周
      })
    }

    // 添加测试组到响应头以便于分析
    response.headers.set('x-ab-test-group', testGroup)

    return response
  }

  return NextResponse.next()
}
```

### 热内容保护

实现基本的热链接保护（防止其他站点直接链接到您的资源）：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 只保护媒体路径
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    // 获取引用者
    const referrer = request.headers.get('referer')

    // 如果没有引用者或不是来自我们的域名，拒绝访问
    if (!referrer || !referrer.includes(request.headers.get('host') || '')) {
      // 返回仿制图像或错误信息
      return new Response('未授权访问', {
        status: 403,
        statusText: 'Forbidden',
      })
    }
  }

  return NextResponse.next()
}
```

### 速率限制

使用内存存储实现基本的速率限制（生产环境应使用Redis等分布式存储）：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 内存存储 - 注意：在无服务器环境或多个节点上，这将不会跨请求持久化
// 生产环境应使用Redis等外部存储
const rateLimit = new Map()

// 配置
const RATE_LIMIT_DURATION = 60 * 1000 // 1分钟窗口
const MAX_REQUESTS = 60 // 每分钟最大请求数

export function middleware(request: NextRequest) {
  // 仅限制API端点
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // 创建简单的IP标识符 - 生产环境中可能需要更复杂的ID系统
    const ip = request.ip || 'unknown'
    const key = `${ip}:${request.nextUrl.pathname}`

    // 获取当前时间窗口
    const currentTime = Date.now()
    const windowStart = currentTime - RATE_LIMIT_DURATION

    // 获取现有记录
    const record = rateLimit.get(key) || { count: 0, timestamp: currentTime }

    // 如果记录已过期，重置计数
    if (record.timestamp < windowStart) {
      record.count = 0
      record.timestamp = currentTime
    }

    // 增加计数
    record.count++

    // 保存记录
    rateLimit.set(key, record)

    // 创建响应
    const response = NextResponse.next()

    // 添加速率限制头
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString())
    response.headers.set(
      'X-RateLimit-Remaining',
      Math.max(0, MAX_REQUESTS - record.count).toString(),
    )
    response.headers.set(
      'X-RateLimit-Reset',
      new Date(record.timestamp + RATE_LIMIT_DURATION).toISOString(),
    )

    // 如果超过限制，返回429错误
    if (record.count > MAX_REQUESTS) {
      return NextResponse.json(
        { error: '请求过多，请稍后再试' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(record.timestamp + RATE_LIMIT_DURATION).toISOString(),
          },
        },
      )
    }

    return response
  }

  return NextResponse.next()
}
```

## 中间件限制

使用中间件时，了解其限制很重要：

### 使用Edge运行时

中间件仅在Edge运行时运行，不能使用Node.js API。查看[Edge和Node.js运行时](/nextjs/app-router/building-your-application/rendering/edge-and-nodejs-runtimes)了解差异。

### 不支持的API

中间件无法访问以下API：

- `next/headers` - 使用 `NextRequest` 和 `NextResponse` 代替
- 路由处理程序中的`cookies()` 和 `headers()` - 使用 `NextRequest` 和 `NextResponse` 代替
- `useSearchParams()` - 使用 `request.nextUrl.searchParams` 代替
- React钩子 - 中间件不是React组件

### 使用中间件执行顺序

中间件执行顺序如下：

1. `next.config.js` rewrites 和 redirects
2. 中间件 (`middleware.ts`)
3. `next/headers`, Layouts, Pages, 等等

### 缓存和ISR

如果传递给中间件的请求已被缓存，中间件将**不会**再次执行。

然而，如果您修改了响应头，这将使响应不可缓存，除非您明确设置了缓存控制头。

### 字体优化和图像优化

中间件将在字体优化（`next/font`）和图像优化（`next/image`）之前执行，意味着这些路由也可以由中间件拦截。

## 最佳实践

使用中间件时，遵循以下最佳实践：

1. **使用匹配器**：总是使用`matcher`配置，仅对相关路径运行中间件，以避免不必要的性能影响。

2. **避免复杂逻辑**：中间件应该保持轻量和高效，复杂业务逻辑应放在API路由或服务器组件中。

3. **错误处理**：实现适当的错误处理，防止中间件失败导致整个应用崩溃。

4. **分离关注点**：将不同功能的中间件逻辑分开，使代码更可维护。

5. **测试**：彻底测试中间件，特别是处理认证等关键功能时。

6. **监控**：在生产环境中监控中间件性能，确保它不会成为性能瓶颈。

## 调试中间件

要调试中间件，您可以在中间件代码中使用`console.log`语句。这些日志将显示在运行Next.js服务器的终端中。

验证中间件是否运行以及它接收的请求和生成的响应：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('中间件运行于路径:', request.nextUrl.pathname)
  console.log('方法:', request.method)
  console.log('Cookie:', request.cookies.getAll())
  console.log('Headers:', Array.from(request.headers.entries()))

  const response = NextResponse.next()

  console.log('响应状态:', response.status)
  console.log('响应Headers:', Array.from(response.headers.entries()))

  return response
}
```

## 下一步

要了解更多关于Next.js路由功能，请查看：

- [路由基础](/nextjs/app-router/building-your-application/routing) - 了解Next.js路由系统的基础知识
- [路由处理程序](/nextjs/app-router/building-your-application/routing/route-handlers) - 了解如何创建API端点
- [Edge和Node.js运行时](/nextjs/app-router/building-your-application/rendering/edge-and-nodejs-runtimes) - 了解不同的服务器运行时环境
