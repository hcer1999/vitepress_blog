---
title: page.js
description: page.js 文件的 API 参考。
---

`page` 文件允许你定义对路由**唯一**的 UI。你可以通过从文件中默认导出组件来创建页面：

```tsx switcher
export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <h1>我的页面</h1>
}
```

```jsx switcher
export default function Page({ params, searchParams }) {
  return <h1>我的页面</h1>
}
```

页面是[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)，但可以设置为[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)。

> **须知**：
>
> - 页面始终是[路由子树](/docs/nextjs-cn/app/building-your-application/routing/index#terminology)的[叶子节点](/docs/nextjs-cn/app/building-your-application/routing/index#terminology)。
> - 除非[嵌套在 `pages` 目录](/docs/nextjs-cn/app/building-your-application/routing/index/pages-and-layouts#nesting-pages)内，否则 `.js`、`.jsx` 或 `.tsx` 文件扩展名可用于页面。
> - 允许使用 `page.js` 文件创建专用 UI，但不是必需的。[特殊文件](/docs/nextjs-cn/app/api-reference/file-conventions) 可以独立存在。

## Props

### `params`（可选）

表示从根布局到当前页面的动态路由参数对象。

例如，如果文件路径是 `app/shop/[slug]/[item]/page.js`，对应的 URL 是 `/shop/shoes/nike-air-max-97`，那么 `params` 对象将是：

```jsx
{ slug: 'shoes', item: 'nike-air-max-97' }
```

了解更多关于[动态路由分段](/docs/nextjs-cn/app/building-your-application/routing/index/dynamic-routes)的信息。

### `searchParams`（可选）

包含当前 URL 的[搜索参数](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL#parameters)。

例如，对于 URL `/shop?a=1&b=2`，`searchParams` 将是：

```jsx
{ a: '1', b: '2' }
```

其他例子：

| URL             | `searchParams` 对象  |
| --------------- | -------------------- |
| `/shop`         | `{}`                 |
| `/shop?a=1`     | `{ a: '1' }`         |
| `/shop?a=1&b=2` | `{ a: '1', b: '2' }` |
| `/shop?a=1&a=2` | `{ a: ['1', '2'] }`  |

> **须知**：
>
> - `searchParams` 等同于通过解析 [URL.search](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/search) 得到的对象，但 Next.js 提供了自动解析。
> - 与 `params` 不同，`searchParams` 包含当前 URL 的所有搜索参数，而不仅仅是当前段。
> - 像其他页面 props 一样，你也可以使用 TypeScript 来设置 `searchParams` 的类型。

## 良好实践

### 页面间共享组件

当你在不同页面之间共享 UI 时，你可以创建自己的组件并在多个页面之间导入它们。

```tsx switcher
export default function Button() {
  return <button>点击我</button>
}
```

```jsx switcher
export default function Button() {
  return <button>点击我</button>
}
```

## 参考

### Props

#### `params`（可选）

一个会解析成包含从根段到该页面的[动态路由参数](/docs/nextjs-cn/app/building-your-application/routing/index/dynamic-routes)的对象的 Promise。

```tsx switcher
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

```jsx switcher
export default async function Page({ params }) {
  const { slug } = await params
}
```

| 示例路由                             | URL         | `params`                                |
| ------------------------------------ | ----------- | --------------------------------------- |
| `app/shop/[slug]/page.js`            | `/shop/1`   | `Promise<{ slug: '1' }>`                |
| `app/shop/[category]/[item]/page.js` | `/shop/1/2` | `Promise<{ category: '1', item: '2' }>` |
| `app/shop/[...slug]/page.js`         | `/shop/1/2` | `Promise<{ slug: ['1', '2'] }>`         |

- 由于 `params` 属性是一个 Promise，你必须使用 `async/await` 或 React 的 [`use`](https://react.dev/reference/react/use) 函数来访问其值。
  - 在版本 14 及更早版本中，`params` 是一个同步属性。为了帮助向后兼容，在 Next.js 15 中你仍然可以同步访问它，但这种行为将在未来被废弃。

#### `searchParams`（可选）

一个会解析成包含当前 URL 的[搜索参数](https://developer.mozilla.org/docs/Learn/Common_questions/What_is_a_URL#parameters)的对象的 Promise。例如：

```tsx switcher
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = (await searchParams).filters
}
```

```jsx switcher
export default async function Page({ searchParams }) {
  const filters = (await searchParams).filters
}
```

| 示例 URL        | `searchParams`                |
| --------------- | ----------------------------- |
| `/shop?a=1`     | `Promise<{ a: '1' }>`         |
| `/shop?a=1&b=2` | `Promise<{ a: '1', b: '2' }>` |
| `/shop?a=1&a=2` | `Promise<{ a: ['1', '2'] }>`  |

- 由于 `searchParams` 属性是一个 Promise，你必须使用 `async/await` 或 React 的 [`use`](https://react.dev/reference/react/use) 函数来访问其值。
  - 在版本 14 及更早版本中，`searchParams` 是一个同步属性。为了帮助向后兼容，在 Next.js 15 中你仍然可以同步访问它，但这种行为将在未来被废弃。
- `searchParams` 是一个**[动态 API](/docs/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-apis)**，其值无法提前知道。使用它将使页面在请求时选择**[动态渲染](/docs/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)**。
- `searchParams` 是一个普通的 JavaScript 对象，而不是 `URLSearchParams` 实例。

## 示例

### 基于 `params` 显示内容

使用[动态路由段](/docs/nextjs-cn/app/building-your-application/routing/index/dynamic-routes)，你可以根据 `params` 属性为页面显示或获取特定内容。

```tsx switcher
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <h1>博客文章: {slug}</h1>
}
```

```jsx switcher
export default async function Page({ params }) {
  const { slug } = await params
  return <h1>博客文章: {slug}</h1>
}
```

### 使用 `searchParams` 处理筛选

你可以使用 `searchParams` 属性根据 URL 的查询字符串处理筛选、分页或排序。

```tsx switcher
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page = '1', sort = 'asc', query = '' } = await searchParams

  return (
    <div>
      <h1>产品列表</h1>
      <p>搜索查询: {query}</p>
      <p>当前页面: {page}</p>
      <p>排序顺序: {sort}</p>
    </div>
  )
}
```

```jsx switcher
export default async function Page({ searchParams }) {
  const { page = '1', sort = 'asc', query = '' } = await searchParams

  return (
    <div>
      <h1>产品列表</h1>
      <p>搜索查询: {query}</p>
      <p>当前页面: {page}</p>
      <p>排序顺序: {sort}</p>
    </div>
  )
}
```

### 在客户端组件中读取 `searchParams` 和 `params`

要在客户端组件（不能是 `async`）中使用 `searchParams` 和 `params`，你可以使用 React 的 [`use`](https://react.dev/reference/react/use) 函数来读取 Promise：

```tsx switcher
'use client'

import { use } from 'react'

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = use(params)
  const { query } = use(searchParams)
}
```

```js switcher
'use client'

import { use } from 'react'

export default function Page({ params, searchParams }) {
  const { slug } = use(params)
  const { query } = use(searchParams)
}
```

## 版本历史

| 版本       | 变更                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| `v15.0.RC` | `params` 和 `searchParams` 现在是 Promise。提供了[代码转换工具](/docs/nextjs-cn/app/guides/upgrading/codemods#150)。 |
| `v13.0.0`  | 引入 `page`。                                                                                                        |
