---
title: 数据获取和缓存
nav_title: 数据获取和缓存
description: 学习在 Next.js 中在服务器或客户端获取数据的最佳实践。
---

<details>
  <summary>示例</summary>

- [Next.js 电子商务](https://vercel.com/templates/next.js/nextjs-commerce)
- [按需 ISR](https://on-demand-isr.vercel.app)
- [Next.js 表单](https://github.com/vercel/next.js/tree/canary/examples/next-forms)

</details>

本指南将带你了解 Next.js 中数据获取和缓存的基础知识，提供实用示例和最佳实践。

以下是 Next.js 中数据获取的最简示例：

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/page.js" switcher
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

此示例演示了在异步 React 服务器组件中使用 `fetch` API 进行基本的服务器端数据获取。

## 参考

- [`fetch`](/docs/app/api-reference/functions/fetch)
- React [`cache`](https://react.dev/reference/react/cache)
- Next.js [`unstable_cache`](/docs/app/api-reference/functions/unstable_cache)

## 示例

### 使用 `fetch` API 在服务器上获取数据

此组件将获取并显示博客文章列表。默认情况下，`fetch` 的响应不会被缓存。

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/page.js" switcher
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

如果你在此路由中其他地方没有使用任何[动态 API](/docs/app/building-your-application/rendering/server-components#dynamic-rendering)，它将在 `next build` 期间预渲染为静态页面。然后可以使用[增量静态再生](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)更新数据。

要防止页面预渲染，你可以在文件中添加以下内容：

```js
export const dynamic = 'force-dynamic'
```

然而，你通常会使用 `cookies`、`headers` 或从页面 props 读取传入的 `searchParams` 等函数，这些函数会自动使页面动态渲染。在这种情况下，你*不*需要显式使用 `force-dynamic`。

### 使用 ORM 或数据库在服务器上获取数据

此组件将获取并显示博客文章列表。默认情况下，来自数据库的响应不会被缓存，但可以通过[额外配置](#caching-data-with-an-orm-or-database)进行缓存。

```tsx filename="app/page.tsx" switcher
import { db, posts } from '@/lib/db'

export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/page.js" switcher
import { db, posts } from '@/lib/db'

export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

如果你在此路由中其他地方没有使用任何[动态 API](/docs/app/building-your-application/rendering/server-components#dynamic-rendering)，它将在 `next build` 期间预渲染为静态页面。然后可以使用[增量静态再生](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)更新数据。

要防止页面预渲染，你可以在文件中添加以下内容：

```js
export const dynamic = 'force-dynamic'
```

然而，你通常会使用 `cookies`、`headers` 或从页面 props 读取传入的 `searchParams` 等函数，这些函数会自动使页面动态渲染。在这种情况下，你*不*需要显式使用 `force-dynamic`。

### 在客户端获取数据

我们建议首先尝试在服务器端获取数据。

然而，仍有一些情况下客户端数据获取是有意义的。在这些场景中，你可以在 `useEffect` 中手动调用 `fetch`（不推荐），或者使用社区中流行的 React 库（如 [SWR](https://swr.vercel.app/) 或 [React Query](https://tanstack.com/query/latest)）进行客户端获取。

```tsx filename="app/page.tsx" switcher
'use client'

import { useState, useEffect } from 'react'

export function Posts() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://api.vercel.app/blog')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  if (!posts) return <div>Loading...</div>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/page.js" switcher
'use client'

import { useState, useEffect } from 'react'

export function Posts() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://api.vercel.app/blog')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  if (!posts) return <div>Loading...</div>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Caching data with an ORM or Database

你可以使用 `unstable_cache` API 在运行 `next build` 时缓存响应。

```tsx filename="app/page.tsx" switcher
import { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'

const getPosts = unstable_cache(
  async () => {
    return await db.select().from(posts)
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] },
)

export default async function Page() {
  const allPosts = await getPosts()

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/page.js" switcher
import { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'

const getPosts = unstable_cache(
  async () => {
    return await db.select().from(posts)
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] },
)

export default async function Page() {
  const allPosts = await getPosts()

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

此示例将数据库查询结果缓存 1 小时（3600 秒）。它还添加了缓存标签 `posts`，随后可以通过[增量静态再生](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)使其失效。

### 跨多个函数重用数据

Next.js 使用 `generateMetadata` 和 `generateStaticParams` 等 API，你将需要在 `page` 中使用相同的获取数据。

如果你使用 `fetch`，通过添加 `cache: 'force-cache'` 可以[记忆化](/docs/app/deep-dive/caching#request-memoization)请求。这意味着你可以安全地使用相同的 URL 和相同的选项多次调用，但只会发出一个请求。

> **值得了解：**
>
> - 在 Next.js 以前版本中，使用 `fetch` 时默认的 `cache` 值为 `force-cache`。这在版本 15 中发生了变化，默认变为 `cache: no-store`。

```tsx filename="app/blog/[id]/page.tsx" switcher
import { notFound } from 'next/navigation'

interface Post {
  id: string
  title: string
  content: string
}

async function getPost(id: string) {
  const res = await fetch(`https://api.vercel.app/blog/${id}`, {
    cache: 'force-cache',
  })
  const post: Post = await res.json()
  if (!post) notFound()
  return post
}

export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog', {
    cache: 'force-cache',
  }).then((res) => res.json())

  return posts.map((post: Post) => ({
    id: String(post.id),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  return {
    title: post.title,
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

```jsx filename="app/blog/[id]/page.js" switcher
import { notFound } from 'next/navigation'

async function getPost(id) {
  const res = await fetch(`https://api.vercel.app/blog/${id}`)
  const post = await res.json()
  if (!post) notFound()
  return post
}

export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog').then((res) => res.json())

  return posts.map((post) => ({
    id: String(post.id),
  }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const post = await getPost(id)

  return {
    title: post.title,
  }
}

export default async function Page({ params }) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

如果你*不*使用 `fetch`，而是直接使用 ORM 或数据库，你可以使用 React 的 `cache` 函数包装数据获取。这将去重并只进行一次查询。

```jsx
import { cache } from 'react'
import { db, posts, eq } from '@/lib/db' // 使用 Drizzle ORM 的示例
import { notFound } from 'next/navigation'

export const getPost = cache(async (id) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id)),
  })

  if (!post) notFound()
  return post
})
```

### 重新验证缓存数据

了解有关使用[增量静态再生](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)重新验证缓存数据的更多信息。

## 模式

### 并行和顺序数据获取

在组件内获取数据时，你需要了解两种数据获取模式：并行和顺序。

<Image
  alt="顺序和并行数据获取"
  srcLight="/docs/light/sequential-parallel-data-fetching.png"
  srcDark="/docs/dark/sequential-parallel-data-fetching.png"
  width="1600"
  height="525"
/>

- **顺序**：组件树中的请求相互依赖。这可能导致加载时间更长。
- **并行**：路由中的请求被热切发起，将同时加载数据。这减少了加载数据所需的总时间。

#### 顺序数据获取

如果你有嵌套组件，并且每个组件获取自己的数据，则如果这些数据请求未被[记忆化](/docs/app/deep-dive/caching#request-memoization)，数据获取将按顺序进行。

在某些情况下，你可能希望采用这种模式，因为一个获取依赖于另一个的结果。例如，一旦 `Artist` 组件完成数据获取，`Playlists` 组件才会开始获取数据，因为 `Playlists` 依赖于 `artistID` 属性：

```tsx filename="app/artist/[username]/page.tsx" switcher
export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  // 获取艺术家信息
  const artist = await getArtist(username)

  return (
    <>
      <h1>{artist.name}</h1>
      {/* 在 Playlists 组件加载时显示备用 UI */}
      <Suspense fallback={<div>加载中...</div>}>
        {/* 将艺术家 ID 传递给 Playlists 组件 */}
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  )
}

async function Playlists({ artistID }: { artistID: string }) {
  // 使用艺术家 ID 获取播放列表
  const playlists = await getArtistPlaylists(artistID)

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/artist/[username]/page.js" switcher
export default async function Page({ params }) {
  const { username } = await params
  // 获取艺术家信息
  const artist = await getArtist(username)

  return (
    <>
      <h1>{artist.name}</h1>
      {/* 在 Playlists 组件加载时显示备用 UI */}
      <Suspense fallback={<div>加载中...</div>}>
        {/* 将艺术家 ID 传递给 Playlists 组件 */}
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  )
}

async function Playlists({ artistID }) {
  // 使用艺术家 ID 获取播放列表
  const playlists = await getArtistPlaylists(artistID)

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  )
}
```

你可以使用 [`loading.js`](/docs/app/building-your-application/routing/loading-ui-and-streaming)（用于路由段）或 [React `<Suspense>`](/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)（用于嵌套组件）在 React 流式传输结果时显示即时加载状态。

这将防止整个路由被数据请求阻塞，用户将能够与页面中已准备好的部分进行交互。

#### 并行数据获取

默认情况下，布局和页面段并行渲染。这意味着请求将并行启动。

然而，由于 `async`/`await` 的性质，同一段或组件内的等待请求将阻塞其下方的请求。

要并行获取数据，你可以通过在使用数据的组件外部定义请求来热切启动请求。这通过并行启动两个请求来节省时间，但是，用户在两个 Promise 都解析之前不会看到渲染结果。

在下面的示例中，`getArtist` 和 `getAlbums` 函数在 `Page` 组件外部定义，并在组件内部使用 `Promise.all` 启动：

```tsx filename="app/artist/[username]/page.tsx" switcher
import Albums from './albums'

async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  // 并行启动两个请求
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

```jsx filename="app/artist/[username]/page.js" switcher
import Albums from './albums'

async function getArtist(username) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getAlbums(username) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({ params }) {
  const { username } = await params
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  // 并行启动两个请求
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

此外，你可以添加 [Suspense 边界](/docs/app/building-your-application/routing/loading-ui-and-streaming)来拆分渲染工作，并尽快显示部分结果。

### 预加载数据

防止瀑布流的另一种方式是使用*预加载*模式，通过创建一个在阻塞请求之前热切调用的实用函数。例如，`checkIsAvailable()` 阻止 `<Item/>` 渲染，因此你可以在它之前调用 `preload()` 来热切启动 `<Item/>` 的数据依赖。到 `<Item/>` 渲染时，其数据已经被获取。

注意，`preload` 函数不会阻止 `checkIsAvailable()` 运行。

```tsx filename="components/Item.tsx" switcher
import { getItem } from '@/utils/get-item'

export const preload = (id: string) => {
  // void 计算给定表达式并返回 undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id)
}
export default async function Item({ id }: { id: string }) {
  const result = await getItem(id)
  // ...
}
```

```jsx filename="components/Item.js" switcher
import { getItem } from '@/utils/get-item'

export const preload = (id) => {
  // void 计算给定表达式并返回 undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id)
}
export default async function Item({ id }) {
  const result = await getItem(id)
  // ...
}
```

```tsx filename="app/item/[id]/page.tsx" switcher
import Item, { preload, checkIsAvailable } from '@/components/Item'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // 开始加载项目数据
  preload(id)
  // 执行另一个异步任务
  const isAvailable = await checkIsAvailable()

  return isAvailable ? <Item id={id} /> : null
}
```

```jsx filename="app/item/[id]/page.js" switcher
import Item, { preload, checkIsAvailable } from '@/components/Item'

export default async function Page({ params }) {
  const { id } = await params
  // 开始加载项目数据
  preload(id)
  // 执行另一个异步任务
  const isAvailable = await checkIsAvailable()

  return isAvailable ? <Item id={id} /> : null
}
```

> **值得了解：** "预加载"函数可以有任何名称，因为它是一种模式，而不是 API。

#### 将 React `cache` 和 `server-only` 与预加载模式结合使用

你可以将 `cache` 函数、`preload` 模式和 `server-only` 包结合起来，创建一个可在整个应用中使用的数据获取实用工具。

```ts filename="utils/get-item.ts" switcher
import { cache } from 'react'
import 'server-only'

export const preload = (id: string) => {
  void getItem(id)
}

export const getItem = cache(async (id: string) => {
  // ...
})
```

```js filename="utils/get-item.js" switcher
import { cache } from 'react'
import 'server-only'

export const preload = (id) => {
  void getItem(id)
}

export const getItem = cache(async (id) => {
  // ...
})
```

通过这种方法，你可以热切地获取数据、缓存响应，并确保这种数据获取[仅在服务器上发生](/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)。

布局、页面或其他组件可以使用 `utils/get-item` 导出，以控制何时获取项目的数据。

> **值得了解：**
>
> - 我们建议使用 [`server-only` 包](/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)来确保服务器数据获取函数永远不会在客户端使用。

### 防止敏感数据暴露给客户端

我们建议使用 React 的污点 API，[`taintObjectReference`](https://react.dev/reference/react/experimental_taintObjectReference) 和 [`taintUniqueValue`](https://react.dev/reference/react/experimental_taintUniqueValue)，来防止整个对象实例或敏感值传递给客户端。

要在应用中启用污点功能，请将 Next.js 配置的 `experimental.taint` 选项设置为 `true`：

```js filename="next.config.js"
module.exports = {
  experimental: {
    taint: true,
  },
}
```

然后将你想要污染的对象或值传递给 `experimental_taintObjectReference` 或 `experimental_taintUniqueValue` 函数：

```ts filename="app/utils.ts" switcher
import { queryDataFromDB } from './api'
import { experimental_taintObjectReference, experimental_taintUniqueValue } from 'react'

export async function getUserData() {
  const data = await queryDataFromDB()
  experimental_taintObjectReference('不要将整个用户对象传递给客户端', data)
  experimental_taintUniqueValue('不要将用户的地址传递给客户端', data, data.address)
  return data
}
```

```js filename="app/utils.js" switcher
import { queryDataFromDB } from './api'
import { experimental_taintObjectReference, experimental_taintUniqueValue } from 'react'

export async function getUserData() {
  const data = await queryDataFromDB()
  experimental_taintObjectReference('不要将整个用户对象传递给客户端', data)
  experimental_taintUniqueValue('不要将用户的地址传递给客户端', data, data.address)
  return data
}
```

```tsx filename="app/page.tsx" switcher
import { getUserData } from './data'

export async function Page() {
  const userData = getUserData()
  return (
    <ClientComponent
      user={userData} // 这将因为 taintObjectReference 而导致错误
      address={userData.address} // 这将因为 taintUniqueValue 而导致错误
    />
  )
}
```

```jsx filename="app/page.js" switcher
import { getUserData } from './data'

export async function Page() {
  const userData = await getUserData()
  return (
    <ClientComponent
      user={userData} // 这将因为 taintObjectReference 而导致错误
      address={userData.address} // 这将因为 taintUniqueValue 而导致错误
    />
  )
}
```
