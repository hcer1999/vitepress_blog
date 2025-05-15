---
title: Next.js 中文文档 - 服务器组件
description: 学习如何使用React Server Components在服务器上渲染UI
---

# Next.js 中文文档 - 服务器组件

React Server Components允许您在服务器上渲染组件，提供更好的性能和用户体验。本页将介绍服务器组件的工作原理及其在Next.js中的使用方法。

## 服务器组件简介

服务器组件是一种在服务器上渲染的React组件，它们：

- 仅在服务器上执行，不会在客户端运行
- 不会增加JavaScript包的大小
- 可以直接访问后端数据源和API
- 提供更好的初始加载体验

在Next.js的App Router中，**所有组件默认都是服务器组件**，除非您明确指定它们为客户端组件。

## 服务器组件的优势

### 1. 数据获取

服务器组件可以直接在服务器上获取数据，避免了客户端发起的额外网络请求：

```tsx
// app/page.tsx
// 这是一个服务器组件(默认)
export default async function Page() {
  // 这个数据获取仅在服务器上执行
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()

  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </main>
  )
}
```

### 2. 直接访问后端资源

服务器组件可以直接访问数据库、文件系统和其他服务器资源，而无需通过API层：

```tsx
// app/users/page.tsx
import { db } from '@/lib/database'

export default async function UsersPage() {
  // 直接访问数据库
  const users = await db.users.findMany()

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### 3. 保持敏感信息在服务器端

服务器组件可以安全地访问敏感信息，如API密钥和访问令牌，这些信息永远不会暴露给客户端：

```tsx
// app/dashboard/page.tsx
export default async function Dashboard() {
  // 这个API密钥永远不会暴露给客户端
  const API_KEY = process.env.API_KEY

  const data = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((res) => res.json())

  return <DashboardContent data={data} />
}
```

### 4. 减少客户端JavaScript包大小

服务器组件的代码不会被发送到客户端，减少了JavaScript包的大小，提高了页面加载速度：

```tsx
// app/heavy-component.tsx
import { heavyServerSideLibrary } from 'heavy-library'

// 这个组件使用大型服务器库，但不会增加客户端JavaScript包大小
export default function HeavyComponent() {
  const processedData = heavyServerSideLibrary.process()

  return <div>{processedData}</div>
}
```

### 5. 避免瀑布式数据获取

在服务器上，您可以并行获取多个数据源，然后在一个网络往返中将完整的页面HTML发送到客户端：

```tsx
// app/dashboard/page.tsx
export default async function Dashboard() {
  // 并行启动多个数据获取
  const userPromise = fetchUser()
  const postsPromise = fetchPosts()
  const analyticsPromise = fetchAnalytics()

  // 等待所有数据加载完成
  const [user, posts, analytics] = await Promise.all([userPromise, postsPromise, analyticsPromise])

  return (
    <main>
      <UserProfile user={user} />
      <Posts posts={posts} />
      <Analytics data={analytics} />
    </main>
  )
}
```

## 使用服务器组件

### 基本用法

服务器组件的使用非常直接，因为App Router中的所有组件默认都是服务器组件：

```tsx
// app/page.tsx
// 这是一个服务器组件，默认情况下无需额外标记
export default function Page() {
  return <h1>Hello, Server Component!</h1>
}
```

### 使用异步/等待

服务器组件支持`async/await`语法，使您可以直接在组件中等待异步操作：

```tsx
// app/items/[id]/page.tsx
export default async function ItemPage({ params }: { params: { id: string } }) {
  // 等待数据加载
  const item = await fetchItem(params.id)

  if (!item) {
    notFound()
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
    </div>
  )
}
```

### 在服务器组件中使用客户端组件

虽然服务器组件不能使用客户端特性（如状态和事件监听器），但您可以在服务器组件中导入和使用客户端组件：

```tsx
// app/page.tsx
import ClientCounter from '@/components/client-counter'

export default function Page() {
  // 服务器组件可以渲染并向客户端组件传递props
  return (
    <div>
      <h1>服务器组件</h1>
      <ClientCounter initialCount={5} />
    </div>
  )
}
```

客户端组件通过在文件顶部添加`'use client'`指令来定义：

```tsx
// components/client-counter.tsx
'use client'

import { useState } from 'react'

export default function ClientCounter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

## 服务器组件模式

### 1. 将UI组件和数据获取逻辑分离

为了让代码更具可维护性和可测试性，将数据获取逻辑提取到单独的函数中：

```tsx
// lib/data.ts
export async function getItem(id: string) {
  const res = await fetch(`https://api.example.com/items/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch item')
  }

  return res.json()
}

// app/items/[id]/page.tsx
import { getItem } from '@/lib/data'

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id)
  return <ItemDetails item={item} />
}
```

### 2. 使用顺序组合

服务器组件中的数据获取可以按顺序组合，一个组件可以等待另一个组件完成数据获取：

```tsx
// app/articles/[slug]/page.tsx
async function getArticle(slug) {
  const article = await fetchArticle(slug)
  return article
}

async function getAuthor(authorId) {
  const author = await fetchAuthor(authorId)
  return author
}

export default async function ArticlePage({ params }) {
  // 先获取文章
  const article = await getArticle(params.slug)
  // 再获取文章作者
  const author = await getAuthor(article.authorId)

  return (
    <div>
      <h1>{article.title}</h1>
      <AuthorBio author={author} />
      <ArticleContent content={article.content} />
    </div>
  )
}
```

### 3. 使用并行数据获取

为了优化性能，优先使用并行数据获取而不是顺序获取：

```tsx
// app/dashboard/page.tsx
export default async function Dashboard() {
  // 并行启动多个请求
  const [weather, news, notifications] = await Promise.all([
    fetchWeather(),
    fetchNews(),
    fetchNotifications(),
  ])

  return (
    <div>
      <WeatherWidget data={weather} />
      <NewsFeed news={news} />
      <NotificationList notifications={notifications} />
    </div>
  )
}
```

### 4. 流式传输内容和部分预渲染

对于包含较慢数据获取的页面，可以使用流式传输来逐步渲染内容：

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { DashboardSkeleton, NewsSkeleton } from '@/components/skeletons'

export default function Dashboard() {
  return (
    <div>
      <h1>仪表板</h1>
      {/* 快速显示仪表板框架 */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>

      {/* 慢速数据不会阻塞整个页面加载 */}
      <Suspense fallback={<NewsSkeleton />}>
        <LatestNews />
      </Suspense>
    </div>
  )
}

// 这些组件可以有自己的异步数据获取
async function DashboardContent() {
  const data = await fetchDashboardData()
  return <div>{/* 仪表板内容 */}</div>
}

async function LatestNews() {
  const news = await fetchLatestNews()
  return <div>{/* 新闻内容 */}</div>
}
```

## 服务器组件的限制

服务器组件有一些限制，了解这些限制有助于正确使用它们：

1. **不能使用浏览器API** - 服务器组件无法访问`window`、`document`或其他浏览器API
2. **不能使用React状态和效果** - 不能使用`useState`、`useReducer`、`useEffect`等钩子
3. **不能使用事件处理程序** - 不能添加`onClick`等事件处理程序
4. **不能使用浏览器特定的API** - 如`localStorage`、`sessionStorage`等

当您需要这些功能时，应改用[客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)。

## 应用场景

服务器组件特别适合以下场景：

- **数据获取** - 直接从服务器获取数据，无需额外的API层
- **访问后端资源** - 直接连接数据库或文件系统
- **保持敏感信息安全** - 在服务器上使用API密钥和访问令牌
- **大型依赖项** - 使用会增加客户端JavaScript包大小的大型库
- **SEO和社交分享** - 确保内容在初始HTML响应中
- **静态内容** - 显示不需要交互的内容

## 最佳实践

1. **默认使用服务器组件** - 只有需要客户端特性时才使用客户端组件
2. **将数据获取移动到服务器** - 尽可能在服务器上获取数据，减少客户端API调用
3. **将客户端逻辑向下移动** - 将交互性组件保持在叶子组件中，尽量减少客户端JavaScript
4. **使用流式传输** - 对于包含缓慢数据源的页面，使用Suspense和流式传输提高用户体验
5. **记住服务器环境** - 服务器组件代码在构建时、部署时或请求时执行，而不是在浏览器中执行

## 下一步

要了解如何将服务器组件与客户端组件结合使用，请参阅：

- [客户端组件](/nextjs/app-router/building-your-application/rendering/client-components) - 了解如何添加交互功能
- [组合模式](/nextjs/app-router/building-your-application/rendering/composition-patterns) - 学习如何有效地结合服务器和客户端组件
- [数据获取](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching) - 深入了解如何在Next.js中获取和缓存数据
