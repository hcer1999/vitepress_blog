---
title: 路由处理程序
description: 使用 Web 的 Request 和 Response API 为给定路由创建自定义请求处理程序。
related:
  title: API 参考
  description: 了解更多关于 route.js 文件的信息。
  links:
    - app/api-reference/file-conventions/route
---

路由处理程序允许您使用 Web [Request](https://developer.mozilla.org/docs/Web/API/Request) 和 [Response](https://developer.mozilla.org/docs/Web/API/Response) API 为给定路由创建自定义请求处理程序。

<Image
  alt="Route.js 特殊文件"
  srcLight="/docs/light/route-special-file.png"
  srcDark="/docs/dark/route-special-file.png"
  width="1600"
  height="444"
/>

> **需要了解的是**：路由处理程序仅在 `app` 目录中可用。它们相当于 `pages` 目录中的 [API 路由](/docs/nextjs-cn/pages/building-your-application/routing/api-routes)，这意味着您**不需要**同时使用 API 路由和路由处理程序。

## 约定

路由处理程序在 `app` 目录内的 [`route.js|ts` 文件](/docs/nextjs-cn/app/api-reference/file-conventions/route)中定义：

```ts switcher
export async function GET(request: Request) {}
```

```js switcher
export async function GET(request) {}
```

路由处理程序可以嵌套在 `app` 目录中的任何位置，类似于 `page.js` 和 `layout.js`。但在同一路由段级别上**不能**同时存在 `route.js` 文件和 `page.js` 文件。

### 支持的 HTTP 方法

支持以下 [HTTP 方法](https://developer.mozilla.org/docs/Web/HTTP/Methods)：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD` 和 `OPTIONS`。如果调用了不支持的方法，Next.js 将返回 `405 Method Not Allowed` 响应。

### 扩展的 `NextRequest` 和 `NextResponse` API

除了支持原生 [Request](https://developer.mozilla.org/docs/Web/API/Request) 和 [Response](https://developer.mozilla.org/docs/Web/API/Response) API 外，Next.js 还通过 [`NextRequest`](/docs/nextjs-cn/app/api-reference/functions/next-request) 和 [`NextResponse`](/docs/nextjs-cn/app/api-reference/functions/next-response) 扩展了它们，为高级用例提供了便捷的辅助函数。

## 行为

### 缓存

路由处理程序默认不缓存。但是，您可以选择缓存 `GET` 方法。其他支持的 HTTP 方法**不**缓存。要缓存 `GET` 方法，请在路由处理程序文件中使用[路由配置选项](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamic)，例如 `export const dynamic = 'force-static'`。

```ts switcher
export const dynamic = 'force-static'

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return Response.json({ data })
}
```

```js switcher
export const dynamic = 'force-static'

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return Response.json({ data })
}
```

> **需要了解的是**：其他支持的 HTTP 方法**不会**被缓存，即使它们与已缓存的 `GET` 方法位于同一文件中。

### 特殊路由处理程序

特殊路由处理程序如 [`sitemap.ts`](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/sitemap)、[`opengraph-image.tsx`](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image) 和 [`icon.tsx`](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons) 以及其他[元数据文件](/docs/nextjs-cn/app/api-reference/file-conventions/metadata)默认保持静态，除非它们使用动态 API 或动态配置选项。

### 路由解析

您可以将 `route` 视为最低级别的路由原语。

- 它们**不**参与布局或客户端导航，不像 `page`。
- 同一路由**不能**同时存在 `route.js` 文件和 `page.js` 文件。

| 页面                 | 路由               | 结果                     |
| -------------------- | ------------------ | ------------------------ |
| `app/page.js`        | `app/route.js`     | <Cross size={18} /> 冲突 |
| `app/page.js`        | `app/api/route.js` | <Check size={18} /> 有效 |
| `app/[user]/page.js` | `app/api/route.js` | <Check size={18} /> 有效 |

每个 `route.js` 或 `page.js` 文件接管该路由的所有 HTTP 动词。

```ts switcher
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}

// ❌ 冲突
// `app/route.ts`
export async function POST(request: Request) {}
```

```js switcher
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}

// ❌ 冲突
// `app/route.js`
export async function POST(request) {}
```

## 示例

以下示例展示了如何将路由处理程序与其他 Next.js API 和功能结合使用。

### 重新验证缓存数据

您可以使用增量静态再生成 (ISR) [重新验证缓存数据](/docs/nextjs-cn/app/building-your-application/data-fetching/incremental-static-regeneration)：

```ts switcher
export const revalidate = 60

export async function GET() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return Response.json(posts)
}
```

```js switcher
export const revalidate = 60

export async function GET() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return Response.json(posts)
}
```

### Cookies

您可以使用 `next/headers` 中的 [`cookies`](/docs/nextjs-cn/app/api-reference/functions/cookies) 读取或设置 cookies。这个服务器函数可以直接在路由处理程序中调用，也可以嵌套在另一个函数中。

或者，您可以使用 [`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie) 头部返回一个新的 `Response`。

```ts switcher
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  })
}
```

```js switcher
import { cookies } from 'next/headers'

export async function GET(request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}` },
  })
}
```

您还可以使用底层 Web API 从请求中读取 cookies（[`NextRequest`](/docs/nextjs-cn/app/api-reference/functions/next-request)）：

```ts switcher
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
}
```

```js switcher
export async function GET(request) {
  const token = request.cookies.get('token')
}
```

### Headers

您可以使用 `next/headers` 中的 [`headers`](/docs/nextjs-cn/app/api-reference/functions/headers) 读取头部信息。这个服务器函数可以直接在路由处理程序中调用，也可以嵌套在另一个函数中。

这个 `headers` 实例是只读的。要设置头部，您需要返回带有新 `headers` 的新 `Response`。

```ts switcher
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = await headers()
  const referer = headersList.get('referer')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  })
}
```

```js switcher
import { headers } from 'next/headers'

export async function GET(request) {
  const headersList = await headers()
  const referer = headersList.get('referer')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  })
}
```

您还可以使用底层 Web API 从请求中读取头部信息（[`NextRequest`](/docs/nextjs-cn/app/api-reference/functions/next-request)）：

```ts switcher
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
}
```

```js switcher
export async function GET(request) {
  const requestHeaders = new Headers(request.headers)
}
```

### 重定向

```ts switcher
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  redirect('https://nextjs.org/')
}
```

```js switcher
import { redirect } from 'next/navigation'

export async function GET(request) {
  redirect('https://nextjs.org/')
}
```

### 动态路由段

路由处理程序可以使用[动态段](/docs/nextjs-cn/app/building-your-application/routing/index/dynamic-routes)从动态数据创建请求处理程序。

```ts switcher
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params // 'a'、'b' 或 'c'
}
```

```js switcher
export async function GET(request, { params }) {
  const { slug } = await params // 'a'、'b' 或 'c'
}
```

| 路由                        | 示例 URL   | `params`                 |
| --------------------------- | ---------- | ------------------------ |
| `app/items/[slug]/route.js` | `/items/a` | `Promise<{ slug: 'a' }>` |
| `app/items/[slug]/route.js` | `/items/b` | `Promise<{ slug: 'b' }>` |
| `app/items/[slug]/route.js` | `/items/c` | `Promise<{ slug: 'c' }>` |

### URL 查询参数

传递给路由处理程序的请求对象是一个 `NextRequest` 实例，它包括[一些额外的便捷方法](/docs/nextjs-cn/app/api-reference/functions/next-request#nexturl)，例如用于更轻松处理查询参数的方法。

```ts switcher
import { type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // 对于 /api/search?query=hello，query 是 "hello"
}
```

```js switcher
export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // 对于 /api/search?query=hello，query 是 "hello"
}
```

### 流式传输

流式传输通常与大型语言模型 (LLM)（如 OpenAI）结合使用，用于 AI 生成内容。了解更多关于 [AI SDK](https://sdk.vercel.ai/docs/introduction) 的信息。

```ts switcher
import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await streamText({
    model: openai('gpt-turbo'),
    messages,
  })

  return new StreamingTextResponse(result.toAIStream())
}
```

```js switcher
import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'

export async function POST(req) {
  const { messages } = await req.json()
  const result = await streamText({
    model: openai('gpt-turbo'),
    messages,
  })

  return new StreamingTextResponse(result.toAIStream())
}
```

这些抽象使用 Web API 创建流。您也可以直接使用底层 Web API。

```ts switcher
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const encoder = new TextEncoder()

async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}

export async function GET() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)

  return new Response(stream)
}
```

```js switcher
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const encoder = new TextEncoder()

async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}

export async function GET() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)

  return new Response(stream)
}
```

### 请求体

您可以使用标准 Web API 方法读取 `Request` 体：

```ts switcher
export async function POST(request: Request) {
  const res = await request.json()
  return Response.json({ res })
}
```

```js switcher
export async function POST(request) {
  const res = await request.json()
  return Response.json({ res })
}
```

### 请求体 FormData

您可以使用 `request.formData()` 函数读取 `FormData`：

```ts switcher
export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  return Response.json({ name, email })
}
```

```js switcher
export async function POST(request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  return Response.json({ name, email })
}
```

由于 `formData` 数据都是字符串，您可能想使用 [`zod-form-data`](https://www.npmjs.com/zod-form-data) 来验证请求并以您喜欢的格式（例如 `number`）检索数据。

### CORS

您可以使用标准 Web API 方法为特定路由处理程序设置 CORS 头：

```ts switcher
export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

```js switcher
export async function GET(request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

> **需要了解的是**：
>
> - 要为多个路由处理程序添加 CORS 头，您可以使用[中间件](/docs/nextjs-cn/app/building-your-application/routing/index/middleware#cors)或 [`next.config.js` 文件](/docs/nextjs-cn/app/api-reference/config/next-config-js/headers#cors)。
> - 或者，查看我们的 [CORS 示例](https://github.com/vercel/examples/blob/main/edge-functions/cors/lib/cors.ts)包。

### Webhooks

您可以使用路由处理程序接收来自第三方服务的 webhooks：

```ts switcher
export async function POST(request: Request) {
  try {
    const text = await request.text()
    // 处理 webhook 载荷
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    })
  }

  return new Response('Success!', {
    status: 200,
  })
}
```

```js switcher
export async function POST(request) {
  try {
    const text = await request.text()
    // 处理 webhook 载荷
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    })
  }

  return new Response('Success!', {
    status: 200,
  })
}
```

值得注意的是，与 Pages Router 中的 API 路由不同，您不需要使用 `bodyParser` 来使用任何额外的配置。

### 非 UI 响应

您可以使用路由处理程序返回非 UI 内容。请注意，[`sitemap.xml`](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts)、[`robots.txt`](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file)、[`app icons`](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) 和 [open graph 图像](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)都有内置支持。

```ts switcher
export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>Next.js Documentation</title>
  <link>https://nextjs.org/docs</link>
  <description>The React Framework for the Web</description>
</channel>

</rss>`,
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    },
  )
}
```

```js switcher
export async function GET() {
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>Next.js Documentation</title>
  <link>https://nextjs.org/docs</link>
  <description>The React Framework for the Web</description>
</channel>

</rss>`)
}
```

### 段配置选项

路由处理程序使用与页面和布局相同的[路由段配置](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config)。

```ts switcher
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

```js switcher
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

有关更多详细信息，请参阅 [API 参考](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config)。
