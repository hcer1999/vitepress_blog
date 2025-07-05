---
title: 如何获取数据和流式传输
nav_title: 数据获取
description: 开始在你的应用程序中获取数据和流式传输内容。
related:
  title: API 参考
  description: 通过阅读 API 参考来了解本页面提到的功能。
  links:
    - app/api-reference/functions/fetch
    - app/api-reference/file-conventions/loading
---

本页将指导你如何在[服务器组件](#server-components)和[客户端组件](#client-components)中获取数据。以及如何[流式传输](#streaming)依赖于数据的内容。

## 获取数据

### 服务器组件

你可以在服务器组件中使用以下方式获取数据：

1. [`fetch` API](#with-the-fetch-api)
2. [ORM 或数据库](#with-an-orm-or-database)

#### 使用 `fetch` API

要使用 `fetch` API 获取数据，将你的组件转换为异步函数，并等待 `fetch` 调用。例如：

```tsx switcher
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

```jsx switcher
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

#### 使用 ORM 或数据库

由于服务器组件是在服务器上渲染的，你可以安全地使用 ORM 或数据库客户端进行数据库查询。将你的组件转换为异步函数，并等待调用：

```tsx switcher
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

```jsx switcher
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

### 客户端组件

在客户端组件中有两种获取数据的方式：

1. 使用 React 的 [`use` hook](https://react.dev/reference/react/use)
2. 使用社区库，如 [SWR](https://swr.vercel.app/) 或 [React Query](https://tanstack.com/query/latest)

#### 使用 `use` hook

你可以使用 React 的 [`use` hook](https://react.dev/reference/react/use) 来[流式传输](#streaming)数据从服务器到客户端。首先在你的服务器组件中获取数据，并将 promise 作为 prop 传递给你的客户端组件：

```tsx switcher
import Posts from '@/app/ui/posts
import { Suspense } from 'react'

export default function Page() {
  // 不要等待数据获取函数
  const posts = getPosts()

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

```jsx switcher
import Posts from '@/app/ui/posts
import { Suspense } from 'react'

export default function Page() {
  // 不要等待数据获取函数
  const posts = getPosts()

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

然后，在你的客户端组件中，使用 `use` hook 来读取 promise：

```tsx switcher
'use client'
import { use } from 'react'

export default function Posts({ posts }: { posts: Promise<{ id: string; title: string }[]> }) {
  const allPosts = use(posts)

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx switcher
'use client'
import { use } from 'react'

export default function Posts({ posts }) {
  const posts = use(posts)

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

在上面的示例中，你需要将 `<Posts />` 组件包装在 [`<Suspense>` 边界](https://react.dev/reference/react/Suspense)中。这意味着在 promise 解析时将显示回退内容。了解更多关于[流式传输](#streaming)的信息。

#### 社区库

你可以使用社区库，如 [SWR](https://swr.vercel.app/) 或 [React Query](https://tanstack.com/query/latest) 在客户端组件中获取数据。这些库有自己的缓存、流式传输和其他功能的语义。例如，使用 SWR：

```tsx switcher
'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function BlogPage() {
  const { data, error, isLoading } = useSWR('https://api.vercel.app/blog', fetcher)

  if (isLoading) return <div>加载中...</div>
  if (error) return <div>错误：{error.message}</div>

  return (
    <ul>
      {data.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx switcher
'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function BlogPage() {
  const { data, error, isLoading } = useSWR('https://api.vercel.app/blog', fetcher)

  if (isLoading) return <div>加载中...</div>
  if (error) return <div>错误：{error.message}</div>

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## 流式传输

> **警告：** 以下内容假设你的应用程序中启用了 [`dynamicIO` 配置选项](/docs/nextjs-cn/app/api-reference/config/next-config-js/dynamicIO)。该标志在 Next.js 15 canary 版本中引入。

当在服务器组件中使用 `async/await` 时，Next.js 将选择**动态渲染**。这意味着数据将在每个用户请求时在服务器上获取和渲染。如果有任何慢速的数据请求，整个路由的渲染都会被阻塞。

为了改善初始加载时间和用户体验，你可以使用流式传输将页面的 HTML 分解成更小的块，并从服务器到客户端逐步发送这些块。

<Image
  alt="服务器渲染与流式传输的工作原理"
  srcLight="/docs/light/server-rendering-with-streaming.png"
  srcDark="/docs/dark/server-rendering-with-streaming.png"
  width="1600"
  height="785"
/>

你可以通过两种方式在应用程序中实现流式传输：

1. 使用 [`loading.js` 文件](#with-loadingjs)
2. 使用 React 的 [`<Suspense>` 组件](#with-suspense)

### 使用 `loading.js`

你可以在页面所在的文件夹中创建一个 `loading.js` 文件，以在获取数据时流式传输**整个页面**。例如，要为 `app/blog/page.js` 添加流式传输，请在 `app/blog` 文件夹中添加该文件。

<Image
  alt="带有 loading.js 文件的博客文件夹结构"
  srcLight="/docs/light/loading-file.png"
  srcDark="/docs/dark/loading-file.png"
  width="1600"
  height="525"
/>

```tsx switcher
export default function Loading() {
  // 在这里定义加载 UI
  return <div>加载中...</div>
}
```

```jsx switcher
export default function Loading() {
  // 在这里定义加载 UI
  return <div>加载中...</div>
}
```

在导航时，用户将立即看到布局和[加载状态](#creating-meaningful-loading-states)，同时页面正在渲染。一旦渲染完成，新内容将自动替换进来。

<Image
  alt="加载 UI"
  srcLight="/docs/light/loading-ui.png"
  srcDark="/docs/dark/loading-ui.png"
  width="1600"
  height="691"
/>

在底层，`loading.js` 将被嵌套在 `layout.js` 内部，并自动将 `page.js` 文件及其下方的任何子组件包装在 `<Suspense>` 边界中。

<Image
  alt="loading.js 概览"
  srcLight="/docs/light/loading-overview.png"
  srcDark="/docs/dark/loading-overview.png"
  width="1600"
  height="768"
/>

这种方法适用于路由段（布局和页面），但对于更细粒度的流式传输，你可以使用 `<Suspense>`。

### 使用 `<Suspense>`

`<Suspense>` 允许你更精细地控制页面的哪些部分进行流式传输。例如，你可以立即显示 `<Suspense>` 边界外的任何页面内容，并在边界内流式传输博客文章列表。

```tsx switcher
import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'

export default function BlogPage() {
  return (
    <div>
      {/* 这些内容将立即发送到客户端 */}
      <header>
        <h1>欢迎来到博客</h1>
        <p>阅读下方的最新文章。</p>
      </header>
      <main>
        {/* 任何包裹在 <Suspense> 边界中的内容都将被流式传输 */}
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </div>
  )
}
```

```jsx switcher
import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'

export default function BlogPage() {
  return (
    <div>
      {/* 这些内容将立即发送到客户端 */}
      <header>
        <h1>欢迎来到博客</h1>
        <p>阅读下方的最新文章。</p>
      </header>
      <main>
        {/* 任何包裹在 <Suspense> 边界中的内容都将被流式传输 */}
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </div>
  )
}
```

### 创建有意义的加载状态

即时加载状态是在导航后立即向用户显示的回退 UI。为了获得最佳用户体验，我们建议设计有意义的加载状态，帮助用户理解应用程序正在响应。例如，你可以使用骨架屏和加载动画，或者未来屏幕的一小部分但有意义的内容，如封面照片、标题等。

在开发过程中，你可以使用 [React Devtools](https://react.dev/learn/react-developer-tools) 预览和检查组件的加载状态。
