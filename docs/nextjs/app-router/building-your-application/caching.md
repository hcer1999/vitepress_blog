---
title: Next.js 中文文档 - 缓存
description: Next.js拥有一个先进的内置缓存系统，帮助提升性能并降低成本
---

# Next.js 中文文档 - 缓存

Next.js具有内置的缓存机制，旨在提高应用性能并减少计算成本。这套缓存系统由多个组件组成，每个组件优化应用的不同层面。

本指南提供了Next.js缓存系统的全面概述，解释每种缓存机制的工作原理，以及如何为特定场景配置它们。

## 缓存概述

Next.js在不同的地方应用缓存以提高性能：

1. **服务器端缓存**

   - **请求缓存** - 缓存获取请求的响应
   - **路由缓存** - 缓存路由处理结果
   - **数据缓存** - 持久保存从获取函数返回的数据
   - **完整路由缓存** - 缓存整个页面的渲染结果
   - **客户端路由缓存** - 在客户端缓存之前访问的页面

2. **构建时缓存**
   - **构建缓存** - 在构建阶段存储生成的结果

默认情况下，Next.js缓存尽可能多的内容，以提供最佳性能。您可以根据应用需求调整这些行为。

## 请求缓存（Request Cache）

请求缓存是一个内存缓存，存储`fetch`请求的结果，包括对外部APIs的调用和对数据库的查询。

### 工作原理

- 默认情况下，在渲染过程中对相同URL和选项的`fetch`请求只会执行一次
- 缓存持续到渲染完成（单个渲染周期内的持久性）
- 在构建时和运行时均可工作
- 在边缘和Node.js环境中均可使用

### 示例

```tsx
// 以下请求仅会执行一次，即使在不同组件中多次调用
export default async function Page() {
  // 此请求被自动缓存
  const data = await fetch('https://api.example.com/data')
  const result = await data.json()

  // ...
}
```

### 自定义缓存行为

您可以使用`cache`选项调整`fetch`的缓存行为：

```tsx
// 默认: 自动缓存
fetch('https://api.example.com/data')

// 不缓存: 每次渲染时获取新数据
fetch('https://api.example.com/data', { cache: 'no-store' })

// 缓存有效期: 设置特定的重新验证间隔（秒）
fetch('https://api.example.com/data', { next: { revalidate: 60 } })
```

### 跳过请求缓存

如果您确实需要在同一渲染过程中多次获取相同URL的新数据，可以绕过请求缓存：

```tsx
// 首次请求 - 缓存
const cachedData = await fetch('https://api.example.com/data')

// 强制重新获取新数据 - 添加唯一查询参数绕过缓存
const freshData = await fetch('https://api.example.com/data?unique=' + Date.now())
```

## 数据缓存（Data Cache）

数据缓存是一个持久化缓存，存储从`fetch`请求返回的数据。它跨请求和部署持续存在，使其成为持久数据存储的理想选择。

### 工作原理

- 默认缓存所有`fetch`请求
- 存储在持久存储中（取决于部署平台）
- 跨多个请求持久存在
- 可以使用`revalidate`或按需使其无效（显式重新验证）

### 示例

```tsx
// app/products/layout.tsx
export default async function Layout() {
  // 此数据将被缓存并可能在多个用户请求中重用
  const products = await fetch('https://api.example.com/products')
  const productList = await products.json()

  // ...
}
```

### 自定义缓存行为

```tsx
// 默认: 永久缓存（直到显式重新验证）
fetch('https://api.example.com/products')

// 禁用数据缓存
fetch('https://api.example.com/products', { cache: 'no-store' })

// 设置缓存的重新验证时间（秒）
fetch('https://api.example.com/products', { next: { revalidate: 3600 } })
```

### 按需重新验证

您可以使用路由处理程序或服务器操作来触发特定数据的重新验证：

```tsx
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json()

  // 验证密钥（在生产环境中应使用更安全的方法）
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: '无效的密钥' }, { status: 401 })
  }

  try {
    if (path) {
      // 重新验证特定路径
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    if (tag) {
      // 重新验证特定标签
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, tag })
    }

    return NextResponse.json({ error: '需要路径或标签' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: '重新验证失败' }, { status: 500 })
  }
}
```

### 使用缓存标签

```tsx
// 使用标签获取数据
fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
})

// 稍后可以使用标签重新验证数据
revalidateTag('products')
```

## 完整路由缓存（Full Route Cache）

完整路由缓存存储渲染的HTML和RSC有效载荷，以便在后续请求中重用，无需重新渲染。

### 工作原理

- 默认情况下，考虑到渲染组件的所有`fetch`请求，为静态渲染的路由生成和缓存
- 在构建时（对于静态路由）或首次访问时（对于动态但可缓存的路由）生成
- 存储在持久存储中
- 在所有请求和部署中持久存在，直到下一次构建或重新验证

### 示例

```tsx
// 此页面在构建时渲染并缓存
export default function Page() {
  return <h1>这个页面将被完全缓存</h1>
}
```

### 自定义缓存行为

```tsx
// 禁用特定路由的路由缓存
export const dynamic = 'force-dynamic'

// 或者设置特定路由的重新验证时间（秒）
export const revalidate = 60
```

### 何时不使用路由缓存

路由不会被缓存，并会在每个请求上动态渲染，如果存在：

- 使用`{ cache: 'no-store' }`的`fetch`请求
- 设置`{ revalidate: 0 }`的`fetch`请求
- 路由段使用`export const dynamic = 'force-dynamic'`
- 路由选择退出（`export const revalidate = 0`）
- 使用动态函数，如`cookies()`和`headers()`
- 使用搜索参数（例如 `?search=term`）的路由段
- 使用路由处理程序与特定的HTTP方法（如POST）

## 路由处理程序缓存

路由处理程序可以使用与其他路由相同的缓存机制：

```tsx
// app/api/data/route.ts
import { NextResponse } from 'next/server'

// 默认: 动态路由处理程序（每个请求执行）
export async function GET() {
  const data = await fetch('https://api.example.com/data')
  const jsonData = await data.json()
  return NextResponse.json(jsonData)
}
```

### 自定义路由处理程序缓存

```tsx
// app/api/cached/route.ts
import { NextResponse } from 'next/server'

// 静态路由处理程序（在构建时生成，在运行时重用）
export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({ message: '这个响应将被缓存' })
}
```

```tsx
// app/api/revalidated/route.ts
import { NextResponse } from 'next/server'

// 定期重新验证的路由处理程序
export const revalidate = 3600 // 每小时

export async function GET() {
  return NextResponse.json({ time: new Date().toISOString() })
}
```

## 客户端路由缓存

Next.js在浏览器内存中维护一个客户端缓存，存储之前访问过的路由的组件树和有效载荷。

### 工作原理

- 当用户在应用中导航时，访问过的路由会被缓存在浏览器内存中
- 当用户返回到缓存的路由时，Next.js使用缓存的组件树，避免再次向服务器请求
- 提供即时导航体验
- 仅在会话期间存在，刷新页面时会清除

### 无效化客户端路由缓存

在某些情况下，您可能需要无效化客户端路由缓存：

```tsx
// 导航行为无效化客户端缓存
import { useRouter } from 'next/navigation'

export default function Form() {
  const router = useRouter()

  async function handleSubmit() {
    await saveForm()

    // 提交表单后，刷新客户端缓存
    router.refresh()
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

## 缓存优先级

当多个缓存机制适用时，它们按以下优先级应用：

1. **外部API响应缓存（CDN或Redis）**: 如果您的API有自己的缓存层，优先级最高
2. **请求缓存**: 在单个渲染过程中缓存`fetch`请求
3. **数据缓存**: 跨请求持久存储`fetch`结果
4. **完整路由缓存**: 缓存整个渲染的路由
5. **客户端路由缓存**: 缓存在浏览器会话中访问的路由

## 缓存状态存储位置

各种缓存存储位置取决于您的部署环境：

| 缓存类型       | 开发环境 | 自托管         | Vercel         |
| -------------- | -------- | -------------- | -------------- |
| 请求缓存       | 内存     | 内存           | 内存           |
| 数据缓存       | 不可用   | 文件系统       | 持久化缓存存储 |
| 完整路由缓存   | 不可用   | 文件系统       | 持久化缓存存储 |
| 客户端路由缓存 | 内存     | 内存（浏览器） | 内存（浏览器） |

## 实际应用示例

### 博客网站

```tsx
// app/blog/page.tsx - 博客首页
export default async function BlogPage() {
  // 文章列表可能会变化，但不需要实时更新
  // 每小时重新验证一次
  const posts = await fetch('https://cms.example.com/posts', {
    next: { revalidate: 3600 },
  })
  const postList = await posts.json()

  return (
    <div>
      <h1>博客文章</h1>
      <ul>
        {postList.map((post) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/[slug]/page.tsx - 单篇博客文章
export default async function BlogPost({ params }) {
  const { slug } = params

  // 文章内容变化不频繁，可以长时间缓存
  const post = await fetch(`https://cms.example.com/posts/${slug}`, {
    next: { revalidate: 86400 }, // 24小时
  })
  const postData = await post.json()

  // 评论需要保持新鲜
  const comments = await fetch(`https://cms.example.com/posts/${slug}/comments`, {
    cache: 'no-store', // 始终获取最新评论
  })
  const commentData = await comments.json()

  return (
    <article>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />

      <h2>评论</h2>
      <CommentList comments={commentData} />
      <AddCommentForm postId={postData.id} />
    </article>
  )
}

// app/actions.ts - 添加评论后重新验证数据
;('use server')

import { revalidatePath } from 'next/cache'

export async function addComment(formData) {
  const comment = {
    postId: formData.get('postId'),
    author: formData.get('author'),
    content: formData.get('content'),
  }

  await fetch('https://cms.example.com/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: { 'Content-Type': 'application/json' },
  })

  // 添加评论后重新验证文章页面
  revalidatePath(`/blog/${postSlug}`)
}
```

### 电子商务网站

```tsx
// app/products/page.tsx - 产品列表
export default async function ProductsPage({ searchParams }) {
  const { category, sort } = searchParams

  // 产品列表可能会有变化（价格、库存），每10分钟更新一次
  const products = await fetch(
    `https://api.example.com/products?category=${category}&sort=${sort}`,
    {
      next: { revalidate: 600, tags: ['products'] },
    },
  )
  const productList = await products.json()

  return (
    <div>
      <h1>产品列表</h1>
      <ProductGrid products={productList} />
    </div>
  )
}

// app/products/[id]/page.tsx - 产品详情
export default async function ProductPage({ params }) {
  const { id } = params

  // 产品详情需要相对新鲜
  const product = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 60, tags: [`product-${id}`] }, // 每分钟重新验证
  })
  const productData = await product.json()

  // 库存状态需要实时
  const inventory = await fetch(`https://api.example.com/products/${id}/inventory`, {
    cache: 'no-store', // 始终获取最新库存
  })
  const inventoryData = await inventory.json()

  return (
    <div>
      <h1>{productData.name}</h1>
      <p>{productData.description}</p>
      <p>价格: ¥{productData.price}</p>
      <p>库存: {inventoryData.available ? '有货' : '缺货'}</p>

      {inventoryData.available && <AddToCartButton productId={id} />}
    </div>
  )
}

// app/api/webhook/inventory/route.ts - 库存更新webhook
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request) {
  const { productId, secret } = await request.json()

  // 验证webhook密钥
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: '无效的密钥' }, { status: 401 })
  }

  // 重新验证特定产品
  revalidateTag(`product-${productId}`)

  // 同时重新验证所有产品列表
  revalidateTag('products')

  return NextResponse.json({ revalidated: true })
}
```

## 开发环境中的缓存

在开发环境（`next dev`）中，缓存行为会有所不同：

- **数据缓存** - 在开发中禁用，确保您始终看到最新数据
- **完整路由缓存** - 在开发中禁用，每次路由访问都会重新渲染
- **客户端路由缓存** - 在开发中启用，但具有不同的持久性规则

## 调试缓存

要调试缓存问题，可以使用以下方法：

1. **添加日志语句**: 使用`console.log()`在`fetch`请求前后添加时间戳，查看是否重复执行

2. **使用查询参数强制最新数据**: 临时添加唯一查询参数，如`?nocache=${Date.now()}`，绕过缓存

3. **检查网络请求**: 使用浏览器开发者工具的网络面板，查看请求状态和响应头

4. **使用开发工具**: Vercel等平台提供缓存命中/未命中的指标和日志

## 最佳实践

1. **标记数据获取**

   ```tsx
   // 使用命名标签进行相关数据
   fetch('https://api.example.com/data', { next: { tags: ['api-data'] } })
   ```

2. **使用精细缓存控制**

   ```tsx
   // 不同数据有不同的刷新策略
   // 频繁变化的数据
   const userData = await fetch('/api/user', { cache: 'no-store' })
   // 不经常变化的数据
   const settings = await fetch('/api/settings', { next: { revalidate: 3600 } })
   ```

3. **避免过度重新验证**

   ```tsx
   // 不要使用过于激进的重新验证时间
   // 不好: 每秒重新验证
   fetch('/api/data', { next: { revalidate: 1 } })
   // 更好: 使用合理的时间或按需重新验证
   fetch('/api/data', { next: { revalidate: 60 } })
   ```

4. **使用stale-while-revalidate模式**

   ```tsx
   // 返回旧缓存数据，同时在后台刷新
   export const fetchArticles = async () => {
     try {
       const staleData = getFromCache('articles') // 自定义缓存逻辑
       if (staleData) {
         // 在后台异步更新缓存
         fetch('/api/articles', { cache: 'no-store' })
           .then((res) => res.json())
           .then((newData) => updateCache('articles', newData))

         // 立即返回旧数据
         return staleData
       }

       // 无缓存数据，进行常规获取
       const res = await fetch('/api/articles')
       const newData = await res.json()
       updateCache('articles', newData)
       return newData
     } catch (error) {
       console.error('获取文章失败:', error)
       // 如果获取失败，回退到缓存
       return getFromCache('articles') || []
     }
   }
   ```

5. **构建时与运行时缓存的平衡**
   - 对于静态内容，优先考虑构建时生成
   - 对于半动态内容，使用ISR（增量静态再生成）
   - 对于高度动态内容，使用无缓存的获取

## 常见问题与解决方案

### 数据不更新

**问题**: 即使数据源已更改，显示的数据仍然过时。

**解决方案**:

1. 验证是否正确设置了`revalidate`或`cache: 'no-store'`
2. 检查是否有多层缓存（例如，CDN缓存和Next.js缓存）
3. 使用`revalidatePath()` 或 `revalidateTag()`手动刷新数据

### 缓存命中率低

**问题**: 部署平台显示缓存命中率较低，导致性能下降和成本增加。

**解决方案**:

1. 检查是否有不必要的`cache: 'no-store'` 声明
2. 使用`next/headers`或cookies/URL参数的地方移至客户端组件
3. 视情况增加`revalidate`时间

### 缓存不一致

**问题**: 不同用户在访问相同URL时看到不同的内容。

**解决方案**:

1. 确保所有服务器实例共享相同的缓存存储
2. 检查是否有条件性缓存或基于cookie的逻辑
3. 验证部署设置是否正确配置了持久缓存

### 部署后缓存失效

**问题**: 每次部署后，所有缓存内容似乎都重置。

**解决方案**:

1. 检查部署设置是否保留缓存
2. 使用持久缓存解决方案（如Redis）
3. 考虑使用`ISR`在应用部署后重新生成内容

## 下一步

要深入了解Next.js的缓存机制，请参考以下资源：

- [数据获取](/nextjs/app-router/building-your-application/data-fetching/data-fetching-caching-and-revalidating) - 了解缓存和重新验证
- [路由段配置](/nextjs/app-router/api-reference/file-conventions/route-segment-config) - 了解如何配置路由级别缓存
- [动态vs静态渲染](/nextjs/app-router/building-your-application/rendering/server-components#静态与动态渲染) - 理解静态和动态渲染的缓存含义
  </rewritten_file>
