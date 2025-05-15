---
title: Next.js 中文文档
description: 了解Next.js中的数据获取方法和最佳实践
---

# Next.js 中文文档 - Next.js数据获取

Next.js提供了多种强大的数据获取方法，帮助你有效地获取、缓存和更新应用程序中的数据。本节将介绍App Router中的数据获取功能和模式。

## 主要内容

Next.js的数据获取系统建立在Web标准之上，同时提供了框架优化的功能：

1. [数据获取和缓存](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching) - 了解如何获取数据并利用Next.js内置的缓存系统
2. [服务器操作和修改](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations) - 学习如何使用服务器操作来更新数据
3. [增量静态再生成(ISR)](/nextjs/app-router/building-your-application/data-fetching/incremental-static-regeneration) - 了解如何在不重新部署的情况下更新静态内容

## 数据获取基础

在Next.js App Router中，推荐使用以下方法获取数据：

- 在**服务器组件**中，使用扩展的`fetch` API进行数据获取
- 在**客户端组件**中，使用Route Handlers配合SWR或React Query等库
- 使用**服务器操作**执行数据修改（表单提交、更新等）

以下是一个简单的服务器组件数据获取示例：

```tsx
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products')

  if (!res.ok) {
    throw new Error('获取产品失败')
  }

  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <h1>产品列表</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

浏览本节的详细文档，了解Next.js中数据获取的全部功能和最佳实践。
