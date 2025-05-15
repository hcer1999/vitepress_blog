---
title: Next.js 中文文档 - 增量静态再生成(ISR)
description: 学习如何使用Next.js的增量静态再生成功能在部署后更新静态页面
---

# Next.js 中文文档 - 增量静态再生成(ISR)

增量静态再生成(Incremental Static Regeneration，简称ISR)是Next.js的一项功能，它允许你在部署后更新静态页面，而无需重新构建整个网站。ISR通过在设定的时间间隔后重新验证页面，将静态生成的优势与最新内容相结合。

## ISR概述

传统的静态站点生成(SSG)在构建时生成所有页面，这在以下情况下可能会产生问题：

1. 当网站有大量页面时，构建时间会很长
2. 内容变更后需要重新部署整个网站才能更新
3. 静态内容会随着时间变得过时

增量静态再生成解决了这些问题，允许你：

- 在访问时生成静态页面（按需）
- 在后台自动更新已生成的静态页面
- 在更新期间继续提供旧版本的页面，确保零停机时间
- 避免频繁且完整的站点重新构建

## 基本用法

在App Router中，你可以通过在`fetch`请求中指定`revalidate`选项来启用ISR：

```tsx
// app/products/[id]/page.tsx
export default async function ProductPage({ params }: { params: { id: string } }) {
  // 设置此产品页面每60秒重新验证一次
  const product = await fetch(`https://api.example.com/products/${params.id}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json())

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>价格: ¥{product.price}</p>
    </div>
  )
}
```

在这个例子中，产品页面将被静态生成，但最多每60秒重新验证一次。当一个用户访问页面且缓存已超过60秒时，Next.js会：

1. 先返回当前缓存的页面给用户
2. 在后台重新生成该页面
3. 一旦新页面生成完成，更新缓存
4. 后续的用户将看到新生成的页面

## 按需重新验证

除了基于时间的重新验证外，Next.js还提供了按需重新验证的API，允许你在特定事件（如CMS内容更新）发生时触发页面更新。

### 使用路径重新验证

通过`revalidatePath` API，你可以重新验证特定路径下的所有数据：

```tsx
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  // 从请求中获取密钥
  const { token, path } = await request.json()

  // 检查密钥是否有效
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: '无效的令牌' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ message: '缺少路径参数' }, { status: 400 })
  }

  try {
    // 重新验证特定路径
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, message: `路径 ${path} 已重新验证` })
  } catch (error) {
    return NextResponse.json(
      { message: `重新验证失败: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}
```

### 使用缓存标签重新验证

如果你想更精确地控制哪些页面需要重新验证，可以使用缓存标签：

1. 首先，为你的`fetch`请求添加一个或多个标签：

```tsx
// app/posts/[slug]/page.tsx
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`, {
    next: { tags: ['posts', `post-${params.slug}`] },
  }).then((res) => res.json())

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

2. 然后，创建一个路由处理器来重新验证特定标签：

```tsx
// app/api/revalidate-tag/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const { token, tag } = await request.json()

  // 验证安全令牌
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: '无效的令牌' }, { status: 401 })
  }

  if (!tag) {
    return NextResponse.json({ message: '缺少标签参数' }, { status: 400 })
  }

  try {
    // 重新验证带有特定标签的所有内容
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, message: `标签 ${tag} 已重新验证` })
  } catch (error) {
    return NextResponse.json(
      { message: `重新验证失败: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}
```

## 常见用例

### 电子商务产品页面

产品信息（如库存、价格）可能会频繁变化，但不需要实时更新：

```tsx
// app/products/[id]/page.tsx
export default async function ProductPage({ params }: { params: { id: string } }) {
  // 每10分钟刷新一次产品信息
  const product = await fetch(`https://api.example.com/products/${params.id}`, {
    next: { revalidate: 600, tags: [`product-${params.id}`] },
  }).then((res) => res.json())

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>价格: ¥{product.price}</p>
      <p>库存: {product.stock > 0 ? `${product.stock} 件` : '售罄'}</p>
    </div>
  )
}
```

### 博客文章和新闻

对于内容定期更新的网站：

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 文章内容每小时重新验证一次
  const post = await fetch(`https://cms.example.com/posts/${params.slug}`, {
    next: { revalidate: 3600, tags: ['blog', `post-${params.slug}`] },
  }).then((res) => res.json())

  // 评论每5分钟更新一次
  const comments = await fetch(`https://cms.example.com/posts/${params.slug}/comments`, {
    next: { revalidate: 300, tags: [`comments-${params.slug}`] },
  }).then((res) => res.json())

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <section>
        <h2>评论 ({comments.length})</h2>
        <CommentsList comments={comments} />
      </section>
    </article>
  )
}
```

## 最佳实践

1. **合理设置重新验证时间**：根据数据更新频率和重要性设置适当的重新验证时间。关键数据可以设置较短的周期。

2. **使用缓存标签**：使用有意义的标签来组织相关内容，以便精确地控制重新验证范围。

3. **实现监控**：监控重新验证请求和性能，以便优化重新验证策略。

4. **合理组织数据获取**：将相似更新频率的数据放在一起获取，不同频率的数据分开获取。

5. **实现错误处理**：为重新验证失败提供回退机制，确保用户体验不受影响。

6. **保护重新验证API**：始终为重新验证端点实现适当的安全措施，防止滥用。

## 相关文档

- [数据获取和缓存](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching) - 全面了解Next.js的数据获取和缓存系统
- [服务器操作和修改](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations) - 学习如何使用服务器操作更新数据
- [缓存机制](/nextjs/app-router/deep-dive/caching) - 深入了解Next.js缓存系统的工作原理
