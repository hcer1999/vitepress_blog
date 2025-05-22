---
title: 增量静态再生 (ISR)
description: 学习如何使用增量静态再生在运行时创建或更新静态页面。
---

<details>
  <summary>示例</summary>

- [Next.js 电子商务](https://vercel.com/templates/next.js/nextjs-commerce)
- [按需 ISR](https://on-demand-isr.vercel.app)
- [Next.js 表单](https://github.com/vercel/next.js/tree/canary/examples/next-forms)

</details>

增量静态再生 (ISR) 使你能够：

- 更新静态内容，而无需重建整个站点
- 通过为大多数请求提供预渲染的静态页面来减少服务器负载
- 确保自动为页面添加适当的 `cache-control` 头
- 处理大量内容页面，而不会导致 `next build` 时间过长

以下是一个简单示例：

<AppOnly>

```tsx filename="app/blog/[id]/page.tsx" switcher
interface Post {
  id: string
  title: string
  content: string
}

// Next.js 将在请求到来时使缓存失效，
// 最多每 60 秒一次。
export const revalidate = 60

// 我们将在构建时仅预渲染来自 `generateStaticParams` 的参数。
// 如果请求的路径尚未生成，
// Next.js 将按需服务器渲染该页面。
export const dynamicParams = true // 或 false，对未知路径返回 404

export async function generateStaticParams() {
  const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) => res.json())
  return posts.map((post) => ({
    id: String(post.id),
  }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post: Post = await fetch(`https://api.vercel.app/blog/${id}`).then((res) => res.json())
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

```jsx filename="app/blog/[id]/page.js" switcher
// Next.js 将在请求到来时使缓存失效，
// 最多每 60 秒一次。
export const revalidate = 60

// 我们将在构建时仅预渲染来自 `generateStaticParams` 的参数。
// 如果请求的路径尚未生成，
// Next.js 将按需服务器渲染该页面。
export const dynamicParams = true // 或 false，对未知路径返回 404

export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog').then((res) => res.json())
  return posts.map((post) => ({
    id: String(post.id),
  }))
}

export default async function Page({ params }) {
  const { id } = await params
  const post = await fetch(`https://api.vercel.app/blog/${id}`).then((res) => res.json())
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

</AppOnly>

<PagesOnly>

```tsx filename="pages/blog/[id].tsx" switcher
import type { GetStaticPaths, GetStaticProps } from 'next'

interface Post {
  id: string
  title: string
  content: string
}

interface Props {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch('https://api.vercel.app/blog').then((res) => res.json())
  const paths = posts.map((post: Post) => ({
    params: { id: String(post.id) },
  }))

  // 我们将在构建时仅预渲染这些路径。
  // { fallback: 'blocking' } 将在路径不存在时
  // 按需服务器渲染页面。
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: {
  params: { id: string }
}) => {
  const post = await fetch(`https://api.vercel.app/blog/${params.id}`).then((res) => res.json())

  return {
    props: { post },
    // Next.js 将在请求到来时使缓存失效，
    // 最多每 60 秒一次。
    revalidate: 60,
  }
}

export default function Page({ post }: Props) {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

```jsx filename="pages/blog/[id].jsx" switcher
export async function getStaticPaths() {
  const posts = await fetch('https://api.vercel.app/blog').then((res) => res.json())
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // 我们将在构建时仅预渲染这些路径。
  // { fallback: false } 表示其他路由应返回 404。
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await fetch(`https://api.vercel.app/blog/${params.id}`).then((res) => res.json())

  return {
    props: { post },
    // Next.js 将在请求到来时使缓存失效，
    // 最多每 60 秒一次。
    revalidate: 60,
  }
}

export default function Page({ post }) {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

</PagesOnly>

这个示例的工作原理如下：

1. 在 `next build` 期间，生成所有已知的博客文章（本示例中有 25 个）
2. 对这些页面的所有请求（例如 `/blog/1`）都被缓存并立即响应
3. 60 秒过后，下一个请求仍将显示缓存的（过时的）页面
4. 缓存被失效，并在后台开始生成页面的新版本
5. 一旦成功生成，Next.js 将显示并缓存更新后的页面
6. 如果请求了 `/blog/26`，Next.js 将按需生成并缓存此页面

## 参考

<AppOnly>

### 路由段配置

- [`revalidate`](/docs/app/api-reference/file-conventions/route-segment-config#revalidate)
- [`dynamicParams`](/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams)

### 函数

- [`revalidatePath`](/docs/app/api-reference/functions/revalidatePath)
- [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag)

</AppOnly>

<PagesOnly>

### 函数

- [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props)
- [`res.revalidate`](/docs/pages/building-your-application/routing/api-routes#response-helpers)

</PagesOnly>

## 示例

<AppOnly>

### 基于时间的重新验证

这会在 `/blog` 上获取并显示博客文章列表。一小时后，在下次访问页面时，此页面的缓存将失效。然后，在后台，将使用最新的博客文章生成页面的新版本。

```tsx filename="app/blog/page.tsx" switcher
interface Post {
  id: string
  title: string
  content: string
}

export const revalidate = 3600 // 每小时使缓存失效

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts: Post[] = await data.json()
  return (
    <main>
      <h1>博客文章</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}
```

```jsx filename="app/blog/page.js" switcher
export const revalidate = 3600 // 每小时使缓存失效

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <main>
      <h1>博客文章</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}
```

我们建议设置较长的重新验证时间。例如，使用 1 小时而不是 1 秒。如果你需要更精确的控制，请考虑使用按需重新验证。如果你需要实时数据，请考虑切换到[动态渲染](/docs/app/building-your-application/rendering/server-components#dynamic-rendering)。

### 使用 `revalidatePath` 进行按需重新验证

对于更精确的重新验证方法，可以使用 `revalidatePath` 函数按需使页面缓存失效。

例如，添加新帖子后会调用这个服务器操作。无论你在服务器组件中如何检索数据，无论是使用 `fetch` 还是连接到数据库，这都将清除整个路由的缓存并允许服务器组件获取新数据。

```ts filename="app/actions.ts" switcher
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost() {
  // 使缓存中的 /posts 路由失效
  revalidatePath('/posts')
}
```

```js filename="app/actions.js" switcher
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost() {
  // 使缓存中的 /posts 路由失效
  revalidatePath('/posts')
}
```

[查看演示](https://on-demand-isr.vercel.app)和[探索源代码](https://github.com/vercel/on-demand-isr)。

### 使用 `revalidateTag` 进行按需重新验证

对于大多数用例，优先选择重新验证整个路径。如果你需要更精细的控制，可以使用 `revalidateTag` 函数。例如，你可以为单个 `fetch` 调用添加标签：

```tsx filename="app/blog/page.tsx" switcher
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog', {
    next: { tags: ['posts'] },
  })
  const posts = await data.json()
  // ...
}
```

```jsx filename="app/blog/page.js" switcher
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog', {
    next: { tags: ['posts'] },
  })
  const posts = await data.json()
  // ...
}
```

如果你使用的是 ORM 或连接到数据库，可以使用 `unstable_cache`：

```tsx filename="app/blog/page.tsx" switcher
import { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'

const getCachedPosts = unstable_cache(
  async () => {
    return await db.select().from(posts)
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] },
)

export default async function Page() {
  const posts = getCachedPosts()
  // ...
}
```

```jsx filename="app/blog/page.js" switcher
import { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'

const getCachedPosts = unstable_cache(
  async () => {
    return await db.select().from(posts)
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] },
)

export default async function Page() {
  const posts = getCachedPosts()
  // ...
}
```

然后，你可以在[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)或[路由处理程序](/docs/app/building-your-application/routing/route-handlers)中使用 `revalidateTag`：

```ts filename="app/actions.ts" switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function createPost() {
  // 使缓存中所有标记为 'posts' 的数据失效
  revalidateTag('posts')
}
```

```js filename="app/actions.js" switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function createPost() {
  // 使缓存中所有标记为 'posts' 的数据失效
  revalidateTag('posts')
}
```

</AppOnly>

<PagesOnly>

### 使用 `res.revalidate()` 进行按需验证

对于更精确的重新验证方法，使用 `res.revalidate` 从 API 路由按需生成新页面。

例如，可以在 `/api/revalidate?secret=<token>` 调用此 API 路由，重新验证给定的博客文章。创建一个只有你的 Next.js 应用知道的秘密令牌。这个秘密将用于防止未经授权访问重新验证 API 路由。

```ts filename="pages/api/revalidate.ts" switcher
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 检查秘密以确认这是有效请求
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: '无效的令牌' })
  }

  try {
    // 这应该是实际路径而不是重写的路径
    // 例如，对于 "/posts/[id]"，应该是 "/posts/1"
    await res.revalidate('/posts/1')
    return res.json({ revalidated: true })
  } catch (err) {
    // 如果出现错误，Next.js 将继续
    // 显示最后成功生成的页面
    return res.status(500).send('重新验证出错')
  }
}
```

```js filename="pages/api/revalidate.js" switcher
export default async function handler(req, res) {
  // 检查秘密以确认这是有效请求
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: '无效的令牌' })
  }

  try {
    // 这应该是实际路径而不是重写的路径
    // 例如，对于 "/posts/[id]"，应该是 "/posts/1"
    await res.revalidate('/posts/1')
    return res.json({ revalidated: true })
  } catch (err) {
    // 如果出现错误，Next.js 将继续
    // 显示最后成功生成的页面
    return res.status(500).send('重新验证出错')
  }
}
```

如果你使用的是按需重新验证，则不需要在 `getStaticProps` 内指定 `revalidate` 时间。Next.js 将使用默认值 `false`（不重新验证），并且只在调用 `res.revalidate()` 时按需重新验证页面。

</PagesOnly>

### 处理未捕获的异常

<AppOnly>

如果在尝试重新验证数据时抛出错误，将继续从缓存中提供最后成功生成的数据。在下一个后续请求中，Next.js 将重试重新验证数据。[了解更多关于错误处理的信息](/docs/app/building-your-application/routing/error-handling)。

</AppOnly>

<PagesOnly>

如果在处理后台重新生成时 `getStaticProps` 内部出现错误，或者你手动抛出错误，将继续显示最后成功生成的页面。在下一个后续请求中，Next.js 将重试调用 `getStaticProps`。

```tsx filename="pages/blog/[id].tsx" switcher
import type { GetStaticProps } from 'next'

interface Post {
  id: string
  title: string
  content: string
}

interface Props {
  post: Post
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: {
  params: { id: string }
}) => {
  // 如果此请求抛出未捕获的错误，Next.js 将
  // 不会使当前显示的页面失效，并且
  // 在下一个请求时重试 getStaticProps。
  const res = await fetch(`https://api.vercel.app/blog/${params.id}`)
  const post: Post = await res.json()

  if (!res.ok) {
    // 如果有服务器错误，你可能想要
    // 抛出错误而不是返回，这样缓存就不会更新
    // 直到下一个成功的请求。
    throw new Error(`获取帖子失败，收到状态 ${res.status}`)
  }

  return {
    props: { post },
    // Next.js 将在请求到来时使缓存失效，
    // 最多每 60 秒一次。
    revalidate: 60,
  }
}
```

```jsx filename="pages/blog/[id].jsx" switcher
export async function getStaticProps({ params }) {
  // 如果此请求抛出未捕获的错误，Next.js 将
  // 不会使当前显示的页面失效，并且
  // 在下一个请求时重试 getStaticProps。
  const res = await fetch(`https://api.vercel.app/blog/${params.id}`)
  const post = await res.json()

  if (!res.ok) {
    // 如果有服务器错误，你可能想要
    // 抛出错误而不是返回，这样缓存就不会更新
    // 直到下一个成功的请求。
    throw new Error(`获取帖子失败，收到状态 ${res.status}`)
  }

  return {
    props: { post },
    // Next.js 将在请求到来时使缓存失效，
    // 最多每 60 秒一次。
    revalidate: 60,
  }
}
```

</PagesOnly>

### 自定义缓存位置

你可以配置 Next.js 缓存位置，如果你想将缓存的页面和数据持久化到耐用存储，或者在多个容器或 Next.js 应用程序实例之间共享缓存。[了解更多](/docs/app/guides/self-hosting#caching-and-isr)。

## 故障排除

### 在本地开发中调试缓存数据

如果你使用的是 `fetch` API，可以添加额外的日志记录来了解哪些请求被缓存或未缓存。[了解更多关于 `logging` 选项的信息](/docs/app/api-reference/config/next-config-js/logging)。

```jsx filename="next.config.js"
module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}
```

### 验证正确的生产行为

要验证你的页面在生产环境中是否正确缓存和重新验证，可以通过运行 `next build` 然后运行 `next start` 在本地测试生产版 Next.js 服务器。

这将允许你测试 ISR 行为，就像在生产环境中一样。要进一步调试，请将以下环境变量添加到你的 `.env` 文件中：

```bash filename=".env"
NEXT_PRIVATE_DEBUG_CACHE=1
```

这将使 Next.js 服务器控制台记录 ISR 缓存命中和未命中。你可以检查输出，查看在 `next build` 期间生成了哪些页面，以及在按需访问路径时页面如何更新。

## 注意事项

<AppOnly>

- ISR 仅在使用 Node.js 运行时（默认）时受支持。
- ISR 在创建[静态导出](/docs/app/guides/static-exports)时不受支持。
- 如果在静态渲染的路由中有多个 `fetch` 请求，每个请求具有不同的 `revalidate` 频率，则 ISR 将使用最低的时间。但是，这些重新验证频率仍将被[数据缓存](/docs/app/deep-dive/caching#data-cache)尊重。
- 如果路由上使用的任何 `fetch` 请求的 `revalidate` 时间为 `0`，或显式指定为 `no-store`，则该路由将被[动态渲染](/docs/app/building-your-application/rendering/server-components#dynamic-rendering)。
- 中间件不会为按需 ISR 请求执行，这意味着中间件中的任何路径重写或逻辑都不会应用。确保你重新验证的是确切路径。例如，`/post/1` 而不是重写后的 `/post-1`。

</AppOnly>

<PagesOnly>

- ISR 仅在使用 Node.js 运行时（默认）时受支持。
- ISR 在创建[静态导出](/docs/app/guides/static-exports)时不受支持。
- 中间件不会为按需 ISR 请求执行，这意味着中间件中的任何路径重写或逻辑都不会应用。确保你重新验证的是确切路径。例如，`/post/1` 而不是重写后的 `/post-1`。

</PagesOnly>

## 平台支持

| 部署选项                                                            | 支持状态 |
| ------------------------------------------------------------------- | -------- |
| [Node.js 服务器](/docs/app/getting-started/deploying#nodejs-server) | 是       |
| [Docker 容器](/docs/app/getting-started/deploying#docker)           | 是       |
| [静态导出](/docs/app/getting-started/deploying#static-export)       | 否       |
| [适配器](/docs/app/getting-started/deploying#adapters)              | 平台特定 |

了解如何在自托管 Next.js 时[配置 ISR](/docs/app/guides/self-hosting#caching-and-isr)。

## 版本历史

| 版本      | 变更                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| `v14.1.0` | 自定义 `cacheHandler` 稳定版。                                                  |
| `v13.0.0` | 引入 App Router。                                                               |
| `v12.2.0` | Pages Router：按需 ISR 稳定版                                                   |
| `v12.0.0` | Pages Router：添加[机器人感知 ISR 回退](/blog/next-12#bot-aware-isr-fallback)。 |
| `v9.5.0`  | Pages Router：[稳定版 ISR 引入](/blog/next-9-5)。                               |
