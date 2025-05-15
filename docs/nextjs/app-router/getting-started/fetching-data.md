---
title: Next.js 中文文档 - 数据获取
description: 学习如何在Next.js应用程序中获取数据
---

# Next.js 中文文档 - 数据获取

Next.js 允许您以多种方式获取数据。您可以使用异步/等待和服务器组件，使用路由处理程序构建API终端点，或者使用服务器操作更新数据。

## 使用服务器组件获取数据

在 Next.js 中，您可以在服务器组件中直接使用异步/等待来获取数据，无需使用额外的API层。

服务器组件支持：

- 直接访问后端资源（如数据库）
- 保持敏感信息在服务器端（访问令牌、API密钥等）
- 减少客户端JavaScript包大小
- 减少客户端和服务器之间的瀑布请求

以下是使用服务器组件获取数据的示例：

```tsx
// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')

  if (!res.ok) {
    // 这将激活最近的 `error.js` 错误边界
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <main>{/* 使用数据显示UI */}</main>
}
```

### 请求瀑布

"请求瀑布"是指连续的网络请求，其中每个请求只有在之前的请求完成后才开始。

在某些情况下，您可能希望避免瀑布，因为这会降低应用程序的性能。通过并行获取数据可以减少总请求时间。

然而，在某些情况下，您可能需要串行获取数据，例如当需要基于前一个请求的结果进行下一个请求时。

#### 并行数据获取

在JavaScript中，可以通过在获取之前启动所有获取请求，然后使用Promise.all()或Promise.allSettled()等待它们完成，从而进行并行数据获取。

```tsx
// app/artist/[username]/page.tsx
async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getArtistAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({ params: { username } }: { params: { username: string } }) {
  // 同时并行启动两个请求
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)

  // 等待Promise完成
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums}></Albums>
    </>
  )
}
```

### 使用 `fetch` 进行数据获取

Next.js 扩展了原生 `fetch` Web API，为每个请求添加自动缓存和重新验证功能。

```tsx
// 默认情况下，此请求将自动被缓存
// 它同样适用于由路由处理程序返回的响应
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}
```

您可以选择通过在 `fetch` 中添加 `cache` 和 `next.revalidate` 选项来配置缓存行为：

```tsx
// 这个请求应该被缓存，直到被手动失效
// 类似于 getStaticProps
fetch('https://api.example.com/data', { cache: 'force-cache' })

// 这个请求应该每10秒重新获取一次
// 类似于 getStaticProps 并使用 revalidate 参数
fetch('https://api.example.com/data', { next: { revalidate: 10 } })

// 这个请求应该在每次请求时重新获取
// 类似于 getServerSideProps
fetch('https://api.example.com/data', { cache: 'no-store' })
```

要了解更多关于数据获取、缓存和重新验证的信息，请参阅[数据获取和缓存](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching)章节。

## 第三方库

您可以在服务器组件中使用第三方数据获取库，例如以下流行的库：

- [Prisma ORM](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations#prisma-orm)
- [Drizzle ORM](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations#drizzle-orm)
- [Apollo](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations#apollo-graphql)
- [Knex.js](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations#knex-js)

这里有一个使用Prisma ORM的例子：

```tsx
// app/page.tsx
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getData() {
  const users = await prisma.user.findMany()
  return users
}

export default async function Page() {
  const data = await getData()

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  )
}
```

## 在客户端组件中获取数据

如果需要在客户端组件中获取数据，您可以使用SWR或React Query等库：

```tsx
'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Page() {
  const { data, error, isLoading } = useSWR('https://api.example.com/data', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  )
}
```

## 接下来学习

接下来，我们建议学习以下部分：

- [数据获取模式](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching) - 了解数据获取和缓存的各种模式。
- [服务器操作](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations) - 学习如何使用服务器操作来处理表单和数据突变。
