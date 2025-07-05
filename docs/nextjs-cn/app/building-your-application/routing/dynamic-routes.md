---
title: 动态路由
description: 动态路由可用于从动态数据以编程方式生成路由段。
related:
  title: 下一步
  description: 关于接下来要做什么，我们推荐以下部分
  links:
    - app/building-your-application/routing/linking-and-navigating
    - app/api-reference/functions/generate-static-params
---

# NextJS中文文档 - Dynamic Routes

当您事先不知道确切的路由段名称，并希望从动态数据创建路由时，您可以使用动态路由段，这些段在请求时填充或在构建时[预渲染](#生成静态参数)。

## 约定

动态路由段可以通过将文件夹名称包装在方括号中来创建：`[folderName]`。例如，`[id]` 或 `[slug]`。

动态路由段作为 `params` 属性传递给 [`layout`](/nextjs-cn/app/api-reference/file-conventions/layout)、[`page`](/nextjs-cn/app/api-reference/file-conventions/page)、[`route`](/nextjs-cn/app/building-your-application/routing/route-handlers) 和 [`generateMetadata`](/nextjs-cn/app/api-reference/functions/generate-metadata#generatemetadata-function) 函数。

## 示例

例如，一个博客可能包含以下路由 `app/blog/[slug]/page.js`，其中 `[slug]` 是博客文章的动态路由段。

```tsx switcher
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <div>我的文章: {slug}</div>
}
```

```jsx switcher
export default async function Page({ params }) {
  const { slug } = await params
  return <div>我的文章: {slug}</div>
}
```

| 路由                      | 示例 URL  | `params`        |
| ------------------------- | --------- | --------------- |
| `app/blog/[slug]/page.js` | `/blog/a` | `{ slug: 'a' }` |
| `app/blog/[slug]/page.js` | `/blog/b` | `{ slug: 'b' }` |
| `app/blog/[slug]/page.js` | `/blog/c` | `{ slug: 'c' }` |

查看 [generateStaticParams()](#生成静态参数) 页面，了解如何为段生成参数。

## 值得了解

- 由于 `params` 属性是一个 promise。您必须使用 async/await 或 React 的 use 函数来访问值。
  - 在版本 14 及更早版本中，`params` 是一个同步属性。为了帮助向后兼容，在 Next.js 15 中您仍然可以同步访问它，但这种行为将在未来被弃用。
- 动态路由段等同于 `pages` 目录中的[动态路由](/nextjs-cn/pages/building-your-application/routing/dynamic-routes)。

## 生成静态参数

`generateStaticParams` 函数可以与[动态路由段](/nextjs-cn/app/building-your-application/routing/dynamic-routes)结合使用，在构建时[**静态生成**](/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)路由，而不是在请求时按需生成。

```tsx switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

```jsx switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

`generateStaticParams` 函数的主要好处是它的智能数据检索。如果在 `generateStaticParams` 函数中使用 `fetch` 请求获取内容，则这些请求会被[自动记忆化](/nextjs-cn/app/deep-dive/caching#request-memoization)。这意味着在多个 `generateStaticParams`、Layouts 和 Pages 中使用相同参数的 `fetch` 请求只会执行一次，这减少了构建时间。

如果您正在从 `pages` 目录迁移，请使用[迁移指南](/nextjs-cn/app/guides/migrating/app-router-migration#dynamic-paths-getstaticpaths)。

有关更多信息和高级用例，请参阅 [`generateStaticParams` 服务器函数文档](/nextjs-cn/app/api-reference/functions/generate-static-params)。

## 捕获所有段

动态路由段可以通过在括号内添加省略号来扩展为**捕获所有**后续段 `[...folderName]`。

例如，`app/shop/[...slug]/page.js` 将匹配 `/shop/clothes`，也会匹配 `/shop/clothes/tops`、`/shop/clothes/tops/t-shirts` 等。

| 路由                         | 示例 URL      | `params`                    |
| ---------------------------- | ------------- | --------------------------- |
| `app/shop/[...slug]/page.js` | `/shop/a`     | `{ slug: ['a'] }`           |
| `app/shop/[...slug]/page.js` | `/shop/a/b`   | `{ slug: ['a', 'b'] }`      |
| `app/shop/[...slug]/page.js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

## 可选的捕获所有段

捕获所有段可以通过将参数包含在双方括号中使其**可选**：`[[...folderName]]`。

例如，`app/shop/[[...slug]]/page.js` 将**也**匹配 `/shop`，除了 `/shop/clothes`、`/shop/clothes/tops`、`/shop/clothes/tops/t-shirts` 之外。

**捕获所有**和**可选捕获所有**段之间的区别在于，使用可选捕获所有段时，不带参数的路由也会被匹配（在上面的例子中是 `/shop`）。

| 路由                           | 示例 URL      | `params`                    |
| ------------------------------ | ------------- | --------------------------- |
| `app/shop/[[...slug]]/page.js` | `/shop`       | `{ slug: undefined }`       |
| `app/shop/[[...slug]]/page.js` | `/shop/a`     | `{ slug: ['a'] }`           |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b`   | `{ slug: ['a', 'b'] }`      |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

## TypeScript

使用 TypeScript 时，您可以根据配置的路由段为 `params` 添加类型。

```tsx switcher
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <h1>我的页面</h1>
}
```

```jsx switcher
export default async function Page({ params }) {
  return <h1>我的页面</h1>
}
```

| 路由                                | `params` 类型定义                        |
| ----------------------------------- | ---------------------------------------- |
| `app/blog/[slug]/page.js`           | `{ slug: string }`                       |
| `app/shop/[...slug]/page.js`        | `{ slug: string[] }`                     |
| `app/shop/[[...slug]]/page.js`      | `{ slug?: string[] }`                    |
| `app/[categoryId]/[itemId]/page.js` | `{ categoryId: string, itemId: string }` |

> **值得了解**：在将来，[TypeScript 插件](/nextjs-cn/app/api-reference/config/typescript#ide-plugin)可能会自动完成这项工作。
