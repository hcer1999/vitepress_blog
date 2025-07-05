---
title: fetch
description: 扩展的 fetch 函数的 API 参考。
---

Next.js 扩展了 [Web `fetch()` API](https://developer.mozilla.org/docs/Web/API/Fetch_API)，允许服务器上的每个请求设置自己的持久缓存和重新验证语义。

在浏览器中，`cache` 选项指示 fetch 请求如何与*浏览器的* HTTP 缓存交互。通过这个扩展，`cache` 指示*服务器端* fetch 请求如何与框架的持久[数据缓存](/nextjs-cn/app/deep-dive/caching#data-cache)交互。

你可以在服务器组件中直接使用 `async` 和 `await` 调用 `fetch`。

```tsx switcher
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx switcher
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## `fetch(url, options)`

由于 Next.js 扩展了 [Web `fetch()` API](https://developer.mozilla.org/docs/Web/API/Fetch_API)，你可以使用任何[可用的原生选项](https://developer.mozilla.org/docs/Web/API/fetch#parameters)。

### `options.cache`

配置请求应如何与 Next.js [数据缓存](/nextjs-cn/app/deep-dive/caching#data-cache)交互。

```ts
fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
```

- **`auto no cache`**（默认）：在开发环境中，Next.js 在每次请求时都从远程服务器获取资源，但在 `next build` 期间只获取一次，因为路由将被静态预渲染。如果在路由上检测到[动态 API](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)，Next.js 将在每次请求时获取资源。
- **`no-store`**：即使在路由上未检测到动态 API，Next.js 也会在每次请求时从远程服务器获取资源。
- **`force-cache`**：Next.js 在其数据缓存中查找匹配的请求。
  - 如果有匹配项且它是新鲜的，将从缓存中返回它。
  - 如果没有匹配项或匹配项已过时，Next.js 将从远程服务器获取资源并使用下载的资源更新缓存。

### `options.next.revalidate`

```ts
fetch(`https://...`, { next: { revalidate: false | 0 | number } })
```

设置资源的缓存生命周期（以秒为单位）。

- **`false`** - 无限期缓存资源。在语义上等同于 `revalidate: Infinity`。HTTP 缓存可能会随着时间推移清除较旧的资源。
- **`0`** - 防止资源被缓存。
- **`number`** -（以秒为单位）指定资源的缓存生命周期最多为 `n` 秒。

> **须知**：
>
> - 如果单个 `fetch()` 请求设置的 `revalidate` 数值低于路由的[默认 `revalidate`](/nextjs-cn/app/api-reference/file-conventions/route-segment-config#revalidate)，整个路由的重新验证间隔将会减少。
> - 如果同一路由中具有相同 URL 的两个 fetch 请求有不同的 `revalidate` 值，将使用较低的值。
> - 为方便起见，如果设置了 `revalidate` 为数字，则不需要设置 `cache` 选项。
> - 冲突的选项，如 `{ revalidate: 3600, cache: 'no-store' }` 将导致错误。

### `options.next.tags`

```ts
fetch(`https://...`, { next: { tags: ['collection'] } })
```

设置资源的缓存标签。然后可以使用 [`revalidateTag`](/nextjs-cn/app/api-reference/functions/revalidateTag) 按需重新验证数据。自定义标签的最大长度为 256 个字符，最大标签项数为 128。

## 故障排除

### 在开发环境中，Fetch 默认的 `auto no store` 和 `cache: 'no-store'` 不显示最新数据

Next.js 在本地开发的热模块替换（HMR）过程中缓存服务器组件中的 `fetch` 响应，以加快响应速度并减少计费 API 调用的成本。

默认情况下，[HMR 缓存](/nextjs-cn/app/api-reference/config/next-config-js/serverComponentsHmrCache)应用于所有 fetch 请求，包括那些使用默认 `auto no cache` 和 `cache: 'no-store'` 选项的请求。这意味着未缓存的请求在 HMR 刷新之间不会显示最新数据。但是，缓存将在导航或完整页面重新加载时被清除。

有关更多信息，请参阅 [`serverComponentsHmrCache`](/nextjs-cn/app/api-reference/config/next-config-js/serverComponentsHmrCache) 文档。

## 版本历史

| 版本      | 变更           |
| --------- | -------------- |
| `v13.0.0` | 引入 `fetch`。 |
