---
title: 重定向
description: 了解 Next.js 中处理重定向的不同方式。
related:
  links:
    - app/api-reference/functions/redirect
    - app/api-reference/functions/permanentRedirect
    - app/building-your-application/routing/middleware
    - app/api-reference/config/next-config-js/redirects
---

在 Next.js 中有几种处理重定向的方式。本页将介绍每种可用选项、使用场景以及如何管理大量重定向。

<AppOnly>

| API                                                              | 用途                     | 使用位置                             | 状态码                         |
| ---------------------------------------------------------------- | ------------------------ | ------------------------------------ | ------------------------------ |
| [`redirect`](#redirect-函数)                                     | 在变更或事件后重定向用户 | 服务器组件、服务器操作、路由处理程序 | 307 (临时) 或 303 (服务器操作) |
| [`permanentRedirect`](#permanentredirect-函数)                   | 在变更或事件后重定向用户 | 服务器组件、服务器操作、路由处理程序 | 308 (永久)                     |
| [`useRouter`](#userouter-钩子)                                   | 执行客户端导航           | 客户端组件中的事件处理程序           | 不适用                         |
| [`redirects` in `next.config.js`](#nextconfigjs-中的-redirects)  | 基于路径重定向传入请求   | `next.config.js` 文件                | 307 (临时) 或 308 (永久)       |
| [`NextResponse.redirect`](#middleware-中的-nextresponseredirect) | 基于条件重定向传入请求   | 中间件                               | 任意                           |

</AppOnly>

<PagesOnly>

| API                                                              | 用途                   | 使用位置              | 状态码                   |
| ---------------------------------------------------------------- | ---------------------- | --------------------- | ------------------------ |
| [`useRouter`](#userouter-钩子)                                   | 执行客户端导航         | 组件                  | 不适用                   |
| [`redirects` in `next.config.js`](#nextconfigjs-中的-redirects)  | 基于路径重定向传入请求 | `next.config.js` 文件 | 307 (临时) 或 308 (永久) |
| [`NextResponse.redirect`](#middleware-中的-nextresponseredirect) | 基于条件重定向传入请求 | 中间件                | 任意                     |

</PagesOnly>

<AppOnly>

## `redirect` 函数

`redirect` 函数允许您将用户重定向到另一个 URL。您可以在[服务器组件](/docs/app/building-your-application/rendering/server-components)、[路由处理程序](/docs/app/building-your-application/routing/route-handlers)和[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)中调用 `redirect`。

`redirect` 通常在变更或事件后使用。例如，创建文章后：

```ts filename="app/actions.ts" switcher
'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPost(id: string) {
  try {
    // 调用数据库
  } catch (error) {
    // 处理错误
  }

  revalidatePath('/posts') // 更新缓存的文章
  redirect(`/post/${id}`) // 导航到新文章页面
}
```

```js filename="app/actions.js" switcher
'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPost(id) {
  try {
    // 调用数据库
  } catch (error) {
    // 处理错误
  }

  revalidatePath('/posts') // 更新缓存的文章
  redirect(`/post/${id}`) // 导航到新文章页面
}
```

> **需要了解的是**：
>
> - `redirect` 默认返回 307（临时重定向）状态码。在服务器操作中使用时，它返回 303（查看其他），这通常用于在 POST 请求后重定向到成功页面。
> - `redirect` 内部会抛出错误，因此应在 `try/catch` 块外调用。
> - `redirect` 可以在渲染过程中在客户端组件中调用，但不能在事件处理程序中调用。您可以使用 [`useRouter` 钩子](#userouter-钩子)代替。
> - `redirect` 也接受绝对 URL，可用于重定向到外部链接。
> - 如果您希望在渲染过程前进行重定向，请使用 [`next.config.js`](#nextconfigjs-中的-redirects) 或[中间件](#middleware-中的-nextresponseredirect)。

有关更多信息，请参阅 [`redirect` API 参考](/docs/app/api-reference/functions/redirect)。

## `permanentRedirect` 函数

`permanentRedirect` 函数允许您**永久**将用户重定向到另一个 URL。您可以在[服务器组件](/docs/app/building-your-application/rendering/server-components)、[路由处理程序](/docs/app/building-your-application/routing/route-handlers)和[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)中调用 `permanentRedirect`。

`permanentRedirect` 通常在改变实体的规范 URL 的变更或事件后使用，例如在用户更改其用户名后更新用户的个人资料 URL：

```ts filename="app/actions.ts" switcher
'use server'

import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export async function updateUsername(username: string, formData: FormData) {
  try {
    // 调用数据库
  } catch (error) {
    // 处理错误
  }

  revalidateTag('username') // 更新所有对用户名的引用
  permanentRedirect(`/profile/${username}`) // 导航到新的用户个人资料
}
```

```js filename="app/actions.js" switcher
'use server'

import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export async function updateUsername(username, formData) {
  try {
    // 调用数据库
  } catch (error) {
    // 处理错误
  }

  revalidateTag('username') // 更新所有对用户名的引用
  permanentRedirect(`/profile/${username}`) // 导航到新的用户个人资料
}
```

> **需要了解的是**：
>
> - `permanentRedirect` 默认返回 308（永久重定向）状态码。
> - `permanentRedirect` 也接受绝对 URL，可用于重定向到外部链接。
> - 如果您希望在渲染过程前进行重定向，请使用 [`next.config.js`](#nextconfigjs-中的-redirects) 或[中间件](#middleware-中的-nextresponseredirect)。

有关更多信息，请参阅 [`permanentRedirect` API 参考](/docs/app/api-reference/functions/permanentRedirect)。

</AppOnly>

## `useRouter()` 钩子

<AppOnly>

如果您需要在客户端组件的事件处理程序中重定向，可以使用 `useRouter` 钩子的 `push` 方法。例如：

```tsx filename="app/page.tsx" switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表板
    </button>
  )
}
```

```jsx filename="app/page.js" switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表板
    </button>
  )
}
```

</AppOnly>

<PagesOnly>

如果您需要在组件内部重定向，可以使用 `useRouter` 钩子的 `push` 方法。例如：

```tsx filename="app/page.tsx" switcher
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表板
    </button>
  )
}
```

```jsx filename="app/page.js" switcher
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表板
    </button>
  )
}
```

</PagesOnly>

> **需要了解的是**：
>
> - 如果您不需要以编程方式导航用户，应使用 [`<Link>`](/docs/app/api-reference/components/link) 组件。

<AppOnly>

有关更多信息，请参阅 [`useRouter` API 参考](/docs/app/api-reference/functions/use-router)。

</AppOnly>

<PagesOnly>

有关更多信息，请参阅 [`useRouter` API 参考](/docs/pages/api-reference/functions/use-router)。

</PagesOnly>

## `next.config.js` 中的 `redirects`

`next.config.js` 文件中的 `redirects` 选项允许您将传入请求路径重定向到不同的目标路径。当您更改页面的 URL 结构或有预先已知的重定向列表时，这非常有用。

`redirects` 支持[路径匹配](/docs/app/api-reference/config/next-config-js/redirects#path-matching)、[头部、Cookie 和查询匹配](/docs/app/api-reference/config/next-config-js/redirects#header-cookie-and-query-matching)，使您能够根据传入请求灵活地重定向用户。

要使用 `redirects`，将该选项添加到您的 `next.config.js` 文件中：

```ts filename="next.config.ts" switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 基本重定向
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      // 通配符路径匹配
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

```js filename="next.config.js" switcher
module.exports = {
  async redirects() {
    return [
      // 基本重定向
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      // 通配符路径匹配
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
    ]
  },
}
```

有关更多信息，请参阅 [`redirects` API 参考](/docs/app/api-reference/config/next-config-js/redirects)。

> **需要了解的是**：
>
> - `redirects` 可以通过 `permanent` 选项返回 307（临时重定向）或 308（永久重定向）状态码。
> - `redirects` 在平台上可能有限制。例如，在 Vercel 上，限制为 1,024 个重定向。要管理大量重定向（1000+），请考虑使用[中间件](/docs/app/building-your-application/routing/middleware)创建自定义解决方案。有关更多信息，请参阅[大规模管理重定向](#大规模管理重定向高级)。
> - `redirects` 在中间件**之前**运行。

## Middleware 中的 `NextResponse.redirect`

中间件允许您在请求完成之前运行代码。然后，根据传入请求，使用 `NextResponse.redirect` 重定向到不同的 URL。如果您想根据条件（例如身份验证、会话管理等）重定向用户或有[大量重定向](#大规模管理重定向高级)，这很有用。

例如，如果用户未经身份验证，将其重定向到 `/login` 页面：

```ts filename="middleware.ts" switcher
import { NextResponse, NextRequest } from 'next/server'
import { authenticate } from 'auth-provider'

export function middleware(request: NextRequest) {
  const isAuthenticated = authenticate(request)

  // 如果用户已经过身份验证，继续正常操作
  if (isAuthenticated) {
    return NextResponse.next()
  }

  // 如果未通过身份验证，重定向到登录页面
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

```js filename="middleware.js" switcher
import { NextResponse } from 'next/server'
import { authenticate } from 'auth-provider'

export function middleware(request) {
  const isAuthenticated = authenticate(request)

  // 如果用户已经过身份验证，继续正常操作
  if (isAuthenticated) {
    return NextResponse.next()
  }

  // 如果未通过身份验证，重定向到登录页面
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

> **需要了解的是**：
>
> - 中间件在 `next.config.js` 中的 `redirects` **之后**和渲染**之前**运行。

有关更多信息，请参阅[中间件](/docs/app/building-your-application/routing/middleware)文档。

## 大规模管理重定向（高级）

要管理大量重定向（1000+），您可以考虑使用中间件创建自定义解决方案。这允许您以编程方式处理重定向，而无需重新部署应用程序。

为此，您需要考虑：

1. 创建和存储重定向映射。
2. 优化数据查找性能。

> **Next.js 示例**：请查看我们的[带布隆过滤器的中间件](https://redirects-bloom-filter.vercel.app/)示例，了解以下建议的实现。

### 1. 创建和存储重定向映射

重定向映射是您可以存储在数据库（通常是键值存储）或 JSON 文件中的重定向列表。

考虑以下数据结构：

```json
{
  "/old": {
    "destination": "/new",
    "permanent": true
  },
  "/blog/post-old": {
    "destination": "/blog/post-new",
    "permanent": true
  }
}
```

在[中间件](/docs/app/building-your-application/routing/middleware)中，您可以从数据库（如 Vercel 的 [Edge Config](https://vercel.com/docs/edge-config/get-started) 或 [Redis](https://vercel.com/docs/redis)）读取数据，并根据传入请求重定向用户：

```ts filename="middleware.ts" switcher
import { NextResponse, NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'

type RedirectEntry = {
  destination: string
  permanent: boolean
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const redirectData = await get(pathname)

  if (redirectData && typeof redirectData === 'string') {
    const redirectEntry: RedirectEntry = JSON.parse(redirectData)
    const statusCode = redirectEntry.permanent ? 308 : 307
    return NextResponse.redirect(redirectEntry.destination, statusCode)
  }

  // 未找到重定向，继续不重定向
  return NextResponse.next()
}
```

```js filename="middleware.js" switcher
import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export async function middleware(request) {
  const pathname = request.nextUrl.pathname
  const redirectData = await get(pathname)

  if (redirectData) {
    const redirectEntry = JSON.parse(redirectData)
    const statusCode = redirectEntry.permanent ? 308 : 307
    return NextResponse.redirect(redirectEntry.destination, statusCode)
  }

  // 未找到重定向，继续不重定向
  return NextResponse.next()
}
```

### 2. 优化数据查找性能

为每个传入请求读取大型数据集可能会很慢且成本高昂。有两种方法可以优化数据查找性能：

- 使用针对快速读取优化的数据库
- 使用数据查找策略，如[布隆过滤器](https://en.wikipedia.org/wiki/Bloom_filter)，在读取更大的重定向文件或数据库**之前**高效地检查重定向是否存在。

考虑前面的例子，您可以将生成的布隆过滤器文件导入到中间件中，然后检查传入请求路径是否存在于布隆过滤器中。

如果存在，将请求转发到<AppOnly>[路由处理程序](/docs/app/building-your-application/routing/route-handlers)</AppOnly> <PagesOnly>[API 路由](/docs/pages/building-your-application/routing/api-routes)</PagesOnly>，该处理程序将检查实际文件并将用户重定向到适当的 URL。这避免了将大型重定向文件导入到中间件中，这可能会减慢每个传入请求的速度。

```ts filename="middleware.ts" switcher
import { NextResponse, NextRequest } from 'next/server'
import { ScalableBloomFilter } from 'bloom-filters'
import GeneratedBloomFilter from './redirects/bloom-filter.json'

type RedirectEntry = {
  destination: string
  permanent: boolean
}

// 从生成的 JSON 文件初始化布隆过滤器
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)

export async function middleware(request: NextRequest) {
  // 获取传入请求的路径
  const pathname = request.nextUrl.pathname

  // 检查路径是否在布隆过滤器中
  if (bloomFilter.has(pathname)) {
    // 将路径名转发到路由处理程序
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin,
    )

    try {
      // 从路由处理程序获取重定向数据
      const redirectData = await fetch(api)

      if (redirectData.ok) {
        const redirectEntry: RedirectEntry | undefined = await redirectData.json()

        if (redirectEntry) {
          // 确定状态码
          const statusCode = redirectEntry.permanent ? 308 : 307

          // 重定向到目标
          return NextResponse.redirect(redirectEntry.destination, statusCode)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 未找到重定向，不重定向继续请求
  return NextResponse.next()
}
```

```js filename="middleware.js" switcher
import { NextResponse } from 'next/server'
import { ScalableBloomFilter } from 'bloom-filters'
import GeneratedBloomFilter from './redirects/bloom-filter.json'

// 从生成的 JSON 文件初始化布隆过滤器
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter)

export async function middleware(request) {
  // 获取传入请求的路径
  const pathname = request.nextUrl.pathname

  // 检查路径是否在布隆过滤器中
  if (bloomFilter.has(pathname)) {
    // 将路径名转发到路由处理程序
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin,
    )

    try {
      // 从路由处理程序获取重定向数据
      const redirectData = await fetch(api)

      if (redirectData.ok) {
        const redirectEntry = await redirectData.json()

        if (redirectEntry) {
          // 确定状态码
          const statusCode = redirectEntry.permanent ? 308 : 307

          // 重定向到目标
          return NextResponse.redirect(redirectEntry.destination, statusCode)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 未找到重定向，不重定向继续请求
  return NextResponse.next()
}
```

<AppOnly>

然后，在路由处理程序中：

```ts filename="app/api/redirects/route.ts" switcher
import { NextRequest, NextResponse } from 'next/server'
import redirects from '@/app/redirects/redirects.json'

type RedirectEntry = {
  destination: string
  permanent: boolean
}

export function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname')
  if (!pathname) {
    return new Response('Bad Request', { status: 400 })
  }

  // 从 redirects.json 文件获取重定向条目
  const redirect = (redirects as Record<string, RedirectEntry>)[pathname]

  // 考虑布隆过滤器的假阳性
  if (!redirect) {
    return new Response('No redirect', { status: 400 })
  }

  // 返回重定向条目
  return NextResponse.json(redirect)
}
```

```js filename="app/api/redirects/route.js" switcher
import { NextResponse } from 'next/server'
import redirects from '@/app/redirects/redirects.json'

export function GET(request) {
  const pathname = request.nextUrl.searchParams.get('pathname')
  if (!pathname) {
    return new Response('Bad Request', { status: 400 })
  }

  // 从 redirects.json 文件获取重定向条目
  const redirect = redirects[pathname]

  // 考虑布隆过滤器的假阳性
  if (!redirect) {
    return new Response('No redirect', { status: 400 })
  }

  // 返回重定向条目
  return NextResponse.json(redirect)
}
```

</AppOnly>

<PagesOnly>

然后，在 API 路由中：

```ts filename="pages/api/redirects.ts" switcher
import type { NextApiRequest, NextApiResponse } from 'next'
import redirects from '@/app/redirects/redirects.json'

type RedirectEntry = {
  destination: string
  permanent: boolean
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pathname = req.query.pathname
  if (!pathname) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  // 从 redirects.json 文件获取重定向条目
  const redirect = (redirects as Record<string, RedirectEntry>)[pathname]

  // 考虑布隆过滤器的假阳性
  if (!redirect) {
    return res.status(400).json({ message: 'No redirect' })
  }

  // 返回重定向条目
  return res.json(redirect)
}
```

```js filename="pages/api/redirects.js" switcher
import redirects from '@/app/redirects/redirects.json'

export default function handler(req, res) {
  const pathname = req.query.pathname
  if (!pathname) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  // 从 redirects.json 文件获取重定向条目
  const redirect = redirects[pathname]

  // 考虑布隆过滤器的假阳性
  if (!redirect) {
    return res.status(400).json({ message: 'No redirect' })
  }

  // 返回重定向条目
  return res.json(redirect)
}
```

</PagesOnly>

> **需要了解的是：**
>
> - 要生成布隆过滤器，您可以使用像 [`bloom-filters`](https://www.npmjs.com/package/bloom-filters) 这样的库。
> - 您应该验证对路由处理程序的请求，以防止恶意请求。
