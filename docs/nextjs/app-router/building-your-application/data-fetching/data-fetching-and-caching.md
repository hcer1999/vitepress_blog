---
title: Next.js 中文文档 - 数据获取和缓存
description: 学习如何在Next.js应用中获取数据并使用内置的缓存系统
---

# Next.js 中文文档 - 数据获取和缓存

数据获取是任何应用程序的核心部分。本页面将指导你了解在Next.js中获取、缓存和重新验证数据的不同方法。

## 基础知识

虽然你可以使用任何你喜欢的数据获取库（如Axios、SWR或TanStack Query），但Next.js已对`fetch` Web API进行了扩展，以提供内置的缓存和重新验证功能。

在服务器组件中使用`async/await`和`fetch`进行数据获取：

```tsx
// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')

  if (!res.ok) {
    throw new Error('获取数据失败')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <main>{/* 使用数据... */}</main>
}
```

### 服务器组件中的数据获取

服务器组件使得数据获取可以直接在服务器上进行，带来以下优势：

- 直接访问后端资源（数据库等）
- 保持敏感信息在服务器上（访问令牌、API密钥等）
- 减少客户端的JavaScript包大小和复杂性
- 在数据获取发生时即在服务器完成所有获取
- 避免客户端的瀑布请求
- 根据地理位置更接近你的数据源获取数据

### 在服务器上并行获取数据

为避免串行数据获取造成的瀑布效应，你可以在组件之外并行获取数据：

```tsx
// app/artist/[username]/page.tsx
import Albums from './albums'

// 并行获取数据（不会相互阻塞）
async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getArtistAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({ params: { username } }: { params: { username: string } }) {
  // 在组件外部并行发起请求
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)

  // 等待两个Promise解析
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

## 使用fetch的缓存和重新验证

Next.js会自动缓存从`fetch`返回的数据，这使得在不同地方重复调用同一URL的`fetch`请求可以重用缓存的数据，而不是发起新的请求。

### 缓存数据（默认行为）

默认情况下，Next.js会自动缓存`fetch`请求的结果：

```tsx
// 这个请求会被自动缓存
fetch('https://api.example.com/data')
```

这种行为等同于设置`cache: 'force-cache'`选项：

```tsx
// 明确指定缓存行为（等同于默认行为）
fetch('https://api.example.com/data', { cache: 'force-cache' })
```

### 不缓存数据

要在每次请求时获取最新数据并跳过缓存，使用`cache: 'no-store'`选项：

```tsx
// 此请求不会被缓存
fetch('https://api.example.com/data', { cache: 'no-store' })
```

### 为数据请求设置有效期（数据重新验证）

要在特定时间后重新验证缓存的数据，你可以使用`fetch`的`next.revalidate`选项：

```tsx
// 此数据每10秒重新验证一次
fetch('https://api.example.com/data', { next: { revalidate: 10 } })
```

#### 按需重新验证

你也可以使用路由处理器或服务器操作手动触发数据的重新验证：

```tsx
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const { path, tag, token } = await request.json()

  // 简单的访问控制检查
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: '无效的令牌' }, { status: 401 })
  }

  if (path) {
    // 重新验证路径
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, message: `重新验证了路径: ${path}` })
  }

  if (tag) {
    // 重新验证缓存标签
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, message: `重新验证了标签: ${tag}` })
  }

  return NextResponse.json({ revalidated: false, message: '缺少路径或标签参数' }, { status: 400 })
}
```

## 高级模式

### 使用标签进行有选择的重新验证

你可以为`fetch`请求添加标签，以便稍后有选择地重新验证它们：

```tsx
// 给fetch请求添加标签
fetch('https://api.example.com/data', { next: { tags: ['collection'] } })
```

然后，你可以使用`revalidateTag`来重新验证所有带有该标签的缓存条目：

```tsx
import { revalidateTag } from 'next/cache'

// 重新验证所有带有'collection'标签的缓存条目
revalidateTag('collection')
```

### 结合静态和动态数据

你可以在同一路由中有选择地缓存部分数据，同时保持其他数据是动态的：

```tsx
// app/dashboard/page.tsx
async function fetchCachedData() {
  // 这将被缓存
  return fetch('https://api.example.com/static-data', { cache: 'force-cache' }).then((res) =>
    res.json(),
  )
}

async function fetchDynamicData() {
  // 这将在每次请求时重新获取
  return fetch('https://api.example.com/dynamic-data', { cache: 'no-store' }).then((res) =>
    res.json(),
  )
}

export default async function Dashboard() {
  // 并行获取静态和动态数据
  const [cachedData, dynamicData] = await Promise.all([fetchCachedData(), fetchDynamicData()])

  return (
    <main>
      {/* 使用两种类型的数据 */}
      <StaticContent data={cachedData} />
      <DynamicContent data={dynamicData} />
    </main>
  )
}
```

## 适用的场景

以下是使用不同数据获取策略的一些常见场景：

### 静态数据（`cache: 'force-cache'`）

- 公共内容显示给所有用户
- 博客文章、文档、营销页面
- 不经常更改的数据（产品目录、设置等）

### 动态数据（`cache: 'no-store'`）

- 用户特定内容（仪表板、账户设置）
- 实时数据（股票价格、体育比分等）
- 频繁更新的数据（评论、交易、活跃用户等）

### 增量数据（`next: { revalidate: n }`）

- 中等频率更新的数据（评论、评级）
- 实时性不那么重要的数据（商品库存）
- 可以接受轻微滞后的数据（社交媒体帖子）

## 最佳实践

- **提前获取数据**：尽量在组件树的高层获取数据，然后向下传递
- **使用Suspense**：结合Suspense和流式渲染来改善用户体验
- **正确设置缓存头**：当使用路由处理器创建API端点时，设置适当的缓存控制头
- **组合不同策略**：在同一应用中组合静态和动态数据获取
- **考虑客户端缓存**：对于频繁变化的数据，考虑使用客户端缓存库（如SWR、React Query）来避免频繁重新渲染

## 相关文档

- [服务器操作和修改](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations) - 学习如何通过表单和服务器操作修改数据
- [增量静态再生成](/nextjs/app-router/building-your-application/data-fetching/incremental-static-regeneration) - 了解如何以增量方式更新静态生成的页面
- [缓存机制](/nextjs/app-router/deep-dive/caching) - 深入了解Next.js的缓存系统如何工作
