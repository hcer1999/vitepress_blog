---
title: 路由段配置
description: 了解如何配置 Next.js 路由段的选项。
---

# NextJS中文文档 - Route Segment Config

> 如果启用了 [`dynamicIO`](/nextjs-cn/app/api-reference/config/next-config-js/dynamicIO) 标志，本页概述的选项将被禁用，并且将来最终会被弃用。

路由段选项允许你通过直接导出以下变量来配置 [页面](/nextjs-cn/app/building-your-application/routing/layouts-and-templates)、[布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates) 或 [路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers) 的行为：

| 选项                                    | 类型                                                                                                                      | 默认值         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- |
| [`experimental_ppr`](#experimental_ppr) | `boolean`                                                                                                                 |
| [`dynamic`](#dynamic)                   | `'auto' \| 'force-dynamic' \| 'error' \| 'force-static'`                                                                  | `'auto'`       |
| [`dynamicParams`](#dynamicparams)       | `boolean`                                                                                                                 | `true`         |
| [`revalidate`](#revalidate)             | `false \| 0 \| number`                                                                                                    | `false`        |
| [`fetchCache`](#fetchcache)             | `'auto' \| 'default-cache' \| 'only-cache' \| 'force-cache' \| 'force-no-store' \| 'default-no-store' \| 'only-no-store'` | `'auto'`       |
| [`runtime`](#runtime)                   | `'nodejs' \| 'edge'`                                                                                                      | `'nodejs'`     |
| [`preferredRegion`](#preferredregion)   | `'auto' \| 'global' \| 'home' \| string \| string[]`                                                                      | `'auto'`       |
| [`maxDuration`](#maxduration)           | `number`                                                                                                                  | 由部署平台设置 |

## 选项

### `experimental_ppr`

为布局或页面启用[部分预渲染 (PPR)](/nextjs-cn/app/getting-started/partial-prerendering)。

```tsx switcher
export const experimental_ppr = true
// true | false
```

```jsx switcher
export const experimental_ppr = true
// true | false
```

### `dynamic`

更改布局或页面的动态行为为完全静态或完全动态。

```tsx switcher
export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
```

```js switcher
export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
```

> **须知**：`app` 目录中的新模型倾向于在 `fetch` 请求级别上进行细粒度缓存控制，而不是 `pages` 目录中页面级别的 `getServerSideProps` 和 `getStaticProps` 全有或全无模型。`dynamic` 选项是一种回归到之前模型的方式，提供了更简单的迁移路径。

- **`'auto'`** (默认值)：默认选项，尽可能多地缓存，同时不阻止组件选择动态行为。
- **`'force-dynamic'`**：强制[动态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)，这将导致路由在请求时为每个用户渲染。此选项相当于：

  - 将布局或页面中每个 `fetch()` 请求的选项设置为 `{ cache: 'no-store', next: { revalidate: 0 } }`。
  - 将段配置设置为 `export const fetchCache = 'force-no-store'`

- **`'error'`**：通过在组件使用[动态 API](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-apis)或未缓存数据时引发错误，强制静态渲染并缓存布局或页面的数据。此选项相当于：
  - `pages` 目录中的 `getStaticProps()`。
  - 将布局或页面中每个 `fetch()` 请求的选项设置为 `{ cache: 'force-cache' }`。
  - 将段配置设置为 `fetchCache = 'only-cache', dynamicParams = false`。
  - `dynamic = 'error'` 将 `dynamicParams` 的默认值从 `true` 更改为 `false`。你可以通过手动设置 `dynamicParams = true` 来选择为未由 `generateStaticParams` 生成的动态参数动态渲染页面。
- **`'force-static'`**：通过强制 [`cookies`](/nextjs-cn/app/api-reference/functions/cookies)、[`headers()`](/nextjs-cn/app/api-reference/functions/headers) 和 [`useSearchParams()`](/nextjs-cn/app/api-reference/functions/use-search-params) 返回空值，强制静态渲染并缓存布局或页面的数据。

> **须知**：
>
> - 关于[如何迁移](/nextjs-cn/app/guides/migrating/app-router-migration#step-migrating-data-fetching-methods)从 `getServerSideProps` 和 `getStaticProps` 到 `dynamic: 'force-dynamic'` 和 `dynamic: 'error'` 的说明可以在[升级指南](/nextjs-cn/app/guides/migrating/app-router-migration#step-migrating-data-fetching-methods)中找到。

### `dynamicParams`

控制访问未使用 [generateStaticParams](/nextjs-cn/app/api-reference/functions/generate-static-params) 生成的动态段时会发生什么。

```tsx switcher
export const dynamicParams = true // true | false,
```

```js switcher
export const dynamicParams = true // true | false,
```

- **`true`** (默认值)：未包含在 `generateStaticParams` 中的动态段将按需生成。
- **`false`**：未包含在 `generateStaticParams` 中的动态段将返回 404。

> **须知**：
>
> - 此选项替代了 `pages` 目录中 `getStaticPaths` 的 `fallback: true | false | blocking` 选项。
> - 要在首次访问时静态渲染所有路径，你需要在 `generateStaticParams` 中返回一个空数组或使用 `export const dynamic = 'force-static'`。
> - 当 `dynamicParams = true` 时，该段使用[流式服务器渲染](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)。
> - 如果使用 `dynamic = 'error'` 和 `dynamic = 'force-static'`，它将把 `dynamicParams` 的默认值更改为 `false`。

### `revalidate`

为布局或页面设置默认的重新验证时间。此选项不会覆盖单个 `fetch` 请求设置的 `revalidate` 值。

```tsx switcher
export const revalidate = false
// false | 0 | number
```

```js switcher
export const revalidate = false
// false | 0 | number
```

- **`false`** (默认值)：默认缓存将 `cache` 选项设置为 `'force-cache'` 的任何 `fetch` 请求，或在使用[动态 API](/nextjs-cn/app/building-your-application/rendering/server-components#server-rendering-strategies#dynamic-apis)之前发现的请求。语义上等同于 `revalidate: Infinity`，这实际上意味着资源应该无限期缓存。单个 `fetch` 请求仍可使用 `cache: 'no-store'` 或 `revalidate: 0` 来避免被缓存并使路由动态渲染。或者将 `revalidate` 设置为低于路由默认值的正数，以增加路由的重新验证频率。
- **`0`**：确保布局或页面始终[动态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)，即使没有发现动态 API 或未缓存的数据获取。此选项将不设置 `cache` 选项的 `fetch` 请求的默认值更改为 `'no-store'`，但保留选择使用 `'force-cache'` 或使用正值 `revalidate` 的 `fetch` 请求。
- **`number`**：(以秒为单位) 将布局或页面的默认重新验证频率设置为 `n` 秒。

> **须知**：
>
> - revalidate 值需要是静态可分析的。例如，`revalidate = 600` 是有效的，但 `revalidate = 60 * 10` 不是。
> - 使用 `runtime = 'edge'` 时，revalidate 值不可用。
> - 在开发环境中，页面**始终**按需渲染，从不缓存。这允许你立即看到更改，而无需等待重新验证期限过去。

#### 重新验证频率

- 单个路由的每个布局和页面中最低的 `revalidate` 将决定**整个**路由的重新验证频率。这确保子页面与其父布局一样频繁地重新验证。
- 单个 `fetch` 请求可以设置低于路由默认 `revalidate` 的值，以增加整个路由的重新验证频率。这允许你根据某些条件动态选择某些路由的更频繁重新验证。

### `fetchCache`

<details>
  <summary>这是一个高级选项，仅当你特别需要覆盖默认行为时才应使用。</summary>

默认情况下，Next.js **将缓存**在使用任何[动态 API](/nextjs-cn/app/building-your-application/rendering/server-components#server-rendering-strategies#dynamic-apis)**之前**可访问的任何 `fetch()` 请求，并且**不会缓存**在使用动态 API**之后**发现的 `fetch` 请求。

`fetchCache` 允许你覆盖布局或页面中所有 `fetch` 请求的默认 `cache` 选项。

```tsx switcher
export const fetchCache = 'auto'
// 'auto' | 'default-cache' | 'only-cache'
// 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'
```

```js switcher
export const fetchCache = 'auto'
// 'auto' | 'default-cache' | 'only-cache'
// 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'
```

- **`'auto'`** (默认值)：默认选项，在动态 API 之前使用提供的 `cache` 选项缓存 `fetch` 请求，并且不缓存动态 API 之后的 `fetch` 请求。
- **`'default-cache'`**：允许向 `fetch` 传递任何 `cache` 选项，但如果未提供选项，则将 `cache` 选项设置为 `'force-cache'`。这意味着即使是动态 API 之后的 `fetch` 请求也被视为静态。
- **`'only-cache'`**：确保所有 `fetch` 请求选择缓存，如果未提供选项，则将默认值更改为 `cache: 'force-cache'`，如果任何 `fetch` 请求使用 `cache: 'no-store'`，则会引发错误。
- **`'force-cache'`**：通过将所有 `fetch` 请求的 `cache` 选项设置为 `'force-cache'`，确保所有 `fetch` 请求选择缓存。
- **`'default-no-store'`**：允许向 `fetch` 传递任何 `cache` 选项，但如果未提供选项，则将 `cache` 选项设置为 `'no-store'`。这意味着即使是动态 API 之前的 `fetch` 请求也被视为动态。
- **`'only-no-store'`**：确保所有 `fetch` 请求选择退出缓存，如果未提供选项，则将默认值更改为 `cache: 'no-store'`，如果任何 `fetch` 请求使用 `cache: 'force-cache'`，则会引发错误。
- **`'force-no-store'`**：通过将所有 `fetch` 请求的 `cache` 选项设置为 `'no-store'`，确保所有 `fetch` 请求选择退出缓存。这强制每次请求时重新获取所有 `fetch` 请求，即使它们提供了 `'force-cache'` 选项。

#### 跨路由段行为

- 单个路由的每个布局和页面中设置的任何选项需要相互兼容。
  - 如果同时提供了 `'only-cache'` 和 `'force-cache'`，则 `'force-cache'` 优先。如果同时提供了 `'only-no-store'` 和 `'force-no-store'`，则 `'force-no-store'` 优先。force 选项会改变整个路由的行为，因此具有 `'force-*'` 的单个段将防止由 `'only-*'` 引起的任何错误。
  - `'only-*'` 和 `'force-*'` 选项的目的是保证整个路由要么完全静态，要么完全动态。这意味着：
    - 单个路由中 `'only-cache'` 和 `'only-no-store'` 的组合是不允许的。
    - 单个路由中 `'force-cache'` 和 `'force-no-store'` 的组合是不允许的。
  - 如果子段提供 `'auto'` 或 `'*-cache'`，父段不能提供 `'default-no-store'`，因为这可能导致相同的获取有不同的行为。
- 通常建议将共享的父布局保留为 `'auto'`，并在子段分歧的地方自定义选项。

</details>

### `runtime`

我们建议使用 Node.js 运行时渲染你的应用程序，使用 Edge 运行时进行中间件处理。

```tsx switcher
export const runtime = 'nodejs'
// 'nodejs' | 'edge'
```

```js switcher
export const runtime = 'nodejs'
// 'nodejs' | 'edge'
```

- **`'nodejs'`** (默认值)
- **`'edge'`**

### `preferredRegion`

```tsx switcher
export const preferredRegion = 'auto'
// 'auto' | 'global' | 'home' | ['iad1', 'sfo1']
```

```js switcher
export const preferredRegion = 'auto'
// 'auto' | 'global' | 'home' | ['iad1', 'sfo1']
```

对 `preferredRegion` 的支持及支持的区域取决于你的部署平台。

> **须知**：
>
> - 如果未指定 `preferredRegion`，它将继承最近父布局的选项。
> - 根布局默认为 `all` 区域。

### `maxDuration`

默认情况下，Next.js 不限制服务器端逻辑的执行（渲染页面或处理 API）。
部署平台可以使用 Next.js 构建输出中的 `maxDuration` 添加特定的执行限制。

**注意**：此设置需要 Next.js `13.4.10` 或更高版本。

```tsx switcher
export const maxDuration = 5
```

```js switcher
export const maxDuration = 5
```

> **须知**：
>
> - 如果使用[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)，请在页面级别设置 `maxDuration` 以更改页面上使用的所有服务器操作的默认超时。

### `generateStaticParams`

`generateStaticParams` 函数可以与[动态路由段](/nextjs-cn/app/building-your-application/routing/dynamic-routes)结合使用，以定义将在构建时静态生成而不是在请求时按需生成的路由段参数列表。

有关更多详细信息，请参阅 [API 参考](/nextjs-cn/app/api-reference/functions/generate-static-params)。

## 版本历史

| 版本       |                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `v15.0.RC` | `export const runtime = "experimental-edge"` 已弃用。提供了[代码修改工具](/nextjs-cn/app/guides/upgrading/codemods#transform-app-router-route-segment-config-runtime-value-from-experimental-edge-to-edge)。 |
