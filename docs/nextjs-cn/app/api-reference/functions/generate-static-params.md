---
title: generateStaticParams
description: generateStaticParams 函数的 API 参考。
---

# NextJS中文文档 - Generate Static Params

`generateStaticParams` 函数可以与[动态路由段](/nextjs-cn/app/building-your-application/routing/dynamic-routes)结合使用，以在构建时[**静态生成**](/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)路由，而不是在请求时按需生成。

```tsx switcher
// 返回一个 `params` 列表来填充 [slug] 动态段
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的多个版本
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // ...
}
```

```jsx switcher
// 返回一个 `params` 列表来填充 [slug] 动态段
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的多个版本
export default async function Page({ params }) {
  const { slug } = await params
  // ...
}
```

> **须知**:
>
> - 你可以使用[`dynamicParams`](/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamicparams)段配置选项来控制当访问未使用 `generateStaticParams` 生成的动态段时会发生什么。
> - 你必须从 `generateStaticParams` 返回[一个空数组](#all-paths-at-build-time)或使用[`export const dynamic = 'force-static'`](/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamic)以便在[运行时重新验证 (ISR) 路径](#all-paths-at-runtime)。
> - 在 `next dev` 期间，当你导航到一个路由时，会调用 `generateStaticParams`。
> - 在 `next build` 期间，`generateStaticParams` 在生成相应的布局或页面之前运行。
> - 在重新验证 (ISR) 期间，不会再次调用 `generateStaticParams`。
> - `generateStaticParams` 替代了 Pages Router 中的 [`getStaticPaths`](/nextjs-cn/pages/api-reference/functions/get-static-paths) 函数。

## 参数

`options.params`（可选）

如果路由中的多个动态段使用 `generateStaticParams`，则子 `generateStaticParams` 函数会为父级生成的每组 `params` 执行一次。

`params` 对象包含来自父 `generateStaticParams` 的已填充 `params`，可用于[在子段中生成 `params`](#multiple-dynamic-segments-in-a-route)。

## 返回值

`generateStaticParams` 应该返回一个对象数组，其中每个对象代表单个路由的已填充动态段。

- 对象中的每个属性都是要为路由填充的动态段。
- 属性名是段的名称，属性值是该段应该填充的内容。

| 示例路由                         | `generateStaticParams` 返回类型           |
| -------------------------------- | ----------------------------------------- |
| `/product/[id]`                  | `{ id: string }[]`                        |
| `/products/[category]/[product]` | `{ category: string, product: string }[]` |
| `/products/[...slug]`            | `{ slug: string[] }[]`                    |

## 单个动态段

```tsx switcher
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的三个版本
// - /product/1
// - /product/2
// - /product/3
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // ...
}
```

```jsx switcher
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的三个版本
// - /product/1
// - /product/2
// - /product/3
export default async function Page({ params }) {
  const { id } = await params
  // ...
}
```

## 多个动态段

```tsx switcher
export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
  ]
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的三个版本
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default async function Page({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params
  // ...
}
```

```jsx switcher
export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
  ]
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的三个版本
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default async function Page({ params }) {
  const { category, product } = await params
  // ...
}
```

## 捕获所有动态段

```tsx switcher
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的三个版本
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  // ...
}
```

```jsx switcher
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}

// 使用 `generateStaticParams` 返回的 `params`
// 将静态生成此页面的三个版本
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default async function Page({ params }) {
  const { slug } = await params
  // ...
}
```

## 示例

### 静态渲染

#### 构建时的所有路径

要在构建时静态渲染所有路径，请向 `generateStaticParams` 提供完整的路径列表：

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

#### 构建时的路径子集

要在构建时静态渲染路径的子集，而剩余的路径在首次访问时在运行时渲染，请返回部分路径列表：

```tsx switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  // 在构建时渲染前 10 篇文章
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }))
}
```

```jsx switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  // 在构建时渲染前 10 篇文章
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }))
}
```

然后，通过使用 [`dynamicParams`](/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamicparams) 段配置选项，你可以控制当访问未使用 `generateStaticParams` 生成的动态段时会发生什么。

```tsx switcher
// 除了前 10 篇文章外，所有文章都将是 404
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
  const topPosts = posts.slice(0, 10)

  return topPosts.map((post) => ({
    slug: post.slug,
  }))
}
```

```jsx switcher
// 除了前 10 篇文章外，所有文章都将是 404
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
  const topPosts = posts.slice(0, 10)

  return topPosts.map((post) => ({
    slug: post.slug,
  }))
}
```

#### 运行时的所有路径

要在首次访问时静态渲染所有路径，请返回一个空数组（构建时不会渲染任何路径）或使用 [`export const dynamic = 'force-static'`](/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamic)：

```jsx
export async function generateStaticParams() {
  return []
}
```

> **须知**：你必须始终从 `generateStaticParams` 返回一个数组，即使它是空的。否则，路由将被动态渲染。

```jsx
export const dynamic = 'force-static'
```

### 禁用未指定路径的渲染

要防止未指定的路径在运行时被静态渲染，请在路由段中添加 `export const dynamicParams = false` 选项。使用此配置选项时，只有由 `generateStaticParams` 提供的路径才会被提供服务，未指定的路由将返回 404 或匹配（在[捕获所有路由](/nextjs-cn/app/building-your-application/routing/dynamic-routes#catch-all-segments)的情况下）。

### 路由中的多个动态段

你可以为当前布局或页面上方的动态段生成参数，但**不能为下方的**生成参数。例如，给定 `app/products/[category]/[product]` 路由：

- `app/products/[category]/[product]/page.js` 可以为 `[category]` 和 `[product]` **两者**生成参数。
- `app/products/[category]/layout.js` **只能**为 `[category]` 生成参数。

为带有多个动态段的路由生成参数有两种方法：

#### 自下而上生成参数

从子路由段生成多个动态段。

```tsx switcher
// 为 [category] 和 [product] 两者生成段
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
    product: product.id,
  }))
}

export default function Page({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  // ...
}
```

```jsx switcher
// 为 [category] 和 [product] 两者生成段
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
    product: product.id,
  }))
}

export default function Page({ params }) {
  // ...
}
```

#### 自上而下生成参数

首先生成父段，然后使用结果生成子段。

```tsx switcher
// 为 [category] 生成段
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
  }))
}

export default function Layout({ params }: { params: Promise<{ category: string }> }) {
  // ...
}
```

```jsx switcher
// 为 [category] 生成段
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
  }))
}

export default function Layout({ params }) {
  // ...
}
```

子路由段的 `generateStaticParams` 函数会为父 `generateStaticParams` 生成的每个段执行一次。

子 `generateStaticParams` 函数可以使用从父 `generateStaticParams` 函数返回的 `params` 来动态生成自己的段。

```tsx switcher
// 使用从父段的 `generateStaticParams` 函数传递的 `params`
// 为 [product] 生成段
export async function generateStaticParams({
  params: { category },
}: {
  params: { category: string }
}) {
  const products = await fetch(`https://.../products?category=${category}`).then((res) =>
    res.json(),
  )

  return products.map((product) => ({
    product: product.id,
  }))
}

export default function Page({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  // ...
}
```

```jsx switcher
// 使用从父段的 `generateStaticParams` 函数传递的 `params`
// 为 [product] 生成段
export async function generateStaticParams({ params: { category } }) {
  const products = await fetch(`https://.../products?category=${category}`).then((res) =>
    res.json(),
  )

  return products.map((product) => ({
    product: product.id,
  }))
}

export default function Page({ params }) {
  // ...
}
```

> **须知**：`fetch` 请求会在所有 `generate` 前缀的函数、布局、页面和服务器组件中自动为相同的数据[记忆化](/nextjs-cn/app/deep-dive/caching#request-memoization)。如果 `fetch` 不可用，可以使用 React [`cache`](/nextjs-cn/app/deep-dive/caching#react-cache-function)。

## 版本历史

| 版本      | 变更                          |
| --------- | ----------------------------- |
| `v13.0.0` | 引入 `generateStaticParams`。 |
