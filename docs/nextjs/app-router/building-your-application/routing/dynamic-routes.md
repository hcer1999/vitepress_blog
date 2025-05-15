---
title: Next.js 中文文档 - 动态路由
description: 使用动态路由段创建处理动态数据的路由
---

# Next.js 中文文档 - 动态路由

当你不知道确切的段名称并希望从动态数据创建路由时，可以使用动态路由段。

## 约定

动态段可以通过在方括号内包装段名称来创建：`[folderName]`。例如，`[id]`或`[slug]`。

动态段被作为`params`属性传递给`layout`、`page`、`route`和`generateMetadata`函数。

## 示例

例如，一个博客可能包含以下路由：`app/blog/[slug]/page.js`，其中`[slug]`是博客文章的动态段。

```tsx
// app/blog/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>我的博客文章：{params.slug}</div>
}
```

| 路由                      | 示例URL   | params          |
| ------------------------- | --------- | --------------- |
| `app/blog/[slug]/page.js` | `/blog/a` | `{ slug: 'a' }` |
| `app/blog/[slug]/page.js` | `/blog/b` | `{ slug: 'b' }` |
| `app/blog/[slug]/page.js` | `/blog/c` | `{ slug: 'c' }` |

查看[generateStaticParams()](#生成静态参数generatestaticparams)函数，了解如何生成这些动态段的参数。

## 嵌套动态路由

动态段可以被嵌套。例如，`app/shop/[category]/[item]/page.js`将匹配`/shop/clothes/shirts`，`/shop/food/chocolates`等URL路径。

| 路由                                 | 示例URL                 | params                                     |
| ------------------------------------ | ----------------------- | ------------------------------------------ |
| `app/shop/[category]/[item]/page.js` | `/shop/clothes/shirts`  | `{ category: 'clothes', item: 'shirts' }`  |
| `app/shop/[category]/[item]/page.js` | `/shop/food/chocolates` | `{ category: 'food', item: 'chocolates' }` |

## 捕获所有路由段

可以通过在方括号内添加省略号来扩展动态段，以捕获所有后续路由段：`[...folderName]`。

例如，`app/shop/[...slug]/page.js`将匹配`/shop/clothes`，`/shop/clothes/tops`，`/shop/clothes/tops/t-shirts`等。

| 路由                         | 示例URL                       | params                                      |
| ---------------------------- | ----------------------------- | ------------------------------------------- |
| `app/shop/[...slug]/page.js` | `/shop/clothes`               | `{ slug: ['clothes'] }`                     |
| `app/shop/[...slug]/page.js` | `/shop/clothes/tops`          | `{ slug: ['clothes', 'tops'] }`             |
| `app/shop/[...slug]/page.js` | `/shop/clothes/tops/t-shirts` | `{ slug: ['clothes', 'tops', 't-shirts'] }` |

## 可选捕获所有路由段

通过在双方括号内包含参数，可以使捕获所有的段成为可选的：`[[...folderName]]`。

例如，`app/shop/[[...slug]]/page.js`除了捕获所有的`/shop/clothes`、`/shop/clothes/tops`、`/shop/clothes/tops/t-shirts`外，还将匹配`/shop`。

| 路由                           | 示例URL                       | params                                      |
| ------------------------------ | ----------------------------- | ------------------------------------------- |
| `app/shop/[[...slug]]/page.js` | `/shop`                       | `{}`                                        |
| `app/shop/[[...slug]]/page.js` | `/shop/clothes`               | `{ slug: ['clothes'] }`                     |
| `app/shop/[[...slug]]/page.js` | `/shop/clothes/tops`          | `{ slug: ['clothes', 'tops'] }`             |
| `app/shop/[[...slug]]/page.js` | `/shop/clothes/tops/t-shirts` | `{ slug: ['clothes', 'tops', 't-shirts'] }` |

## TypeScript

当使用TypeScript时，你可以根据路由段添加类型：

```tsx
// app/blog/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>我的博客文章：{params.slug}</div>
}
```

| 路由                                | params 类型定义                          |
| ----------------------------------- | ---------------------------------------- |
| `app/blog/[slug]/page.js`           | `{ slug: string }`                       |
| `app/shop/[...slug]/page.js`        | `{ slug: string[] }`                     |
| `app/[categoryId]/[itemId]/page.js` | `{ categoryId: string, itemId: string }` |

> **注意**：TypeScript会在开发过程中自动检查这些类型，确保你正确处理了所有参数。

## 生成静态参数（generateStaticParams）

`generateStaticParams`函数可以结合动态路由段一起使用，在构建时静态生成路由，而不是在请求时按需生成。

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 为上面`generateStaticParams`中返回的每个`slug`生成一个页面
export default function Page({ params }: { params: { slug: string } }) {
  return <div>我的博客文章：{params.slug}</div>
}
```

这个函数主要有两个主要好处：

1. **自动生成静态路由**：在构建时静态生成与`generateStaticParams`返回的参数相匹配的路由
2. **流式传输**：通过使用React 18的流式传输，动态路由可以作为单一流式响应增量交付

这种方法比使用旧的`getStaticPaths`函数更高效。在`generateStaticParams`中获取的数据会在生成的路由之间自动进行重复数据消除。

### 多级`generateStaticParams`

对于嵌套路由，可以使用多个`generateStaticParams`并串联它们：

```tsx
// app/products/[category]/[product]/page.tsx
export async function generateStaticParams() {
  // 生成所有支持的产品分类
  const categories = ['electronics', 'clothing', 'accessories']

  const paths = []

  // 对于每个分类，获取该分类的产品
  for (const category of categories) {
    const products = await getProductsByCategory(category)

    // 为这个分类和它的产品创建路由
    paths.push(
      ...products.map((product) => ({
        category: category,
        product: product.id,
      })),
    )
  }

  return paths
}

export default function Page({ params }: { params: { category: string; product: string } }) {
  return (
    <div>
      <h1>产品：{params.product}</h1>
      <p>分类：{params.category}</p>
      {/* 产品详情... */}
    </div>
  )
}
```

### 从父路由访问`params`

父级`layout`生成的参数可在子级`generateStaticParams`函数中访问：

```tsx
// app/products/[category]/layout.tsx
export async function generateStaticParams() {
  return [{ category: 'electronics' }, { category: 'clothing' }, { category: 'accessories' }]
}

export default function Layout({ children }) {
  return children
}
```

```tsx
// app/products/[category]/[product]/page.tsx
export async function generateStaticParams({
  params: { category },
}: {
  params: { category: string }
}) {
  // 拿到父路由传递的category
  const products = await getProductsByCategory(category)
  return products.map((product) => ({
    product: product.id,
  }))
}
```

### 动态路由段的平行获取

以下示例显示了如何为动态路由段并行获取数据：

```tsx
// app/products/[category]/[product]/page.tsx
// 此函数在构建时运行
export async function generateStaticParams() {
  // 获取所有产品
  const products = await getProducts()

  return products.map((product) => ({
    category: product.category.toLowerCase(),
    product: product.id,
  }))
}

// 此函数在请求时运行
export default async function Page({ params }: { params: { category: string; product: string } }) {
  // 并行获取多个请求
  const [product, relatedProducts, brandInfo] = await Promise.all([
    getProduct(params.product),
    getRelatedProducts(params.product),
    getBrandInfo(params.category),
  ])

  return (
    <div>
      {/* 产品信息 */}
      <ProductInfo product={product} brandInfo={brandInfo} />

      {/* 相关产品 */}
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}
```

### 捕获所有段的高级案例

以下是使用捕获所有段的更复杂示例，`[...slug]`表示任意深度的URL：

```tsx
// app/[[...slug]]/page.tsx
export async function generateStaticParams() {
  return [
    { slug: [] }, // 首页
    { slug: ['about'] },
    { slug: ['about', 'company'] },
    { slug: ['about', 'team'] },
    { slug: ['blog'] },
    { slug: ['blog', '2023'] },
    { slug: ['blog', '2023', '01'] },
    // 可以根据需要继续添加
  ]
}

export default function Page({ params }: { params: { slug: string[] } }) {
  // 处理参数
  const path = params?.slug?.join('/') || 'home'

  return (
    <div>
      <h1>动态路径: {path}</h1>
      {/* 根据path渲染不同内容 */}
    </div>
  )
}
```

## 路由处理程序中的动态路由

动态路由段也适用于[Route Handlers](/nextjs/app-router/building-your-application/routing/route-handlers)，并传递给`Request`处理程序作为`params`：

```tsx
// app/api/blog/[slug]/route.ts
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const post = await getBlogPost(slug)

  return Response.json(post)
}
```

## 相关资源

- [动态路由](/nextjs/app-router/building-your-application/routing/dynamic-routes)
- [路由基础](/nextjs/app-router/building-your-application/routing)
- [静态预渲染](/nextjs/app-router/building-your-application/rendering/static-and-dynamic-rendering)
