---
title: Next.js 中的缓存
nav_title: 缓存
description: Next.js 缓存机制的概述。
---

Next.js 通过缓存渲染工作和数据请求来提高应用性能并降低成本。本页提供了对 Next.js 缓存机制的深入了解，介绍了可用于配置这些机制的 API，以及它们之间的交互方式。

> **值得注意**: 本页帮助你了解 Next.js 在底层的工作原理，但这**不是**使用 Next.js 高效工作的必备知识。大多数 Next.js 的缓存策略都由你的 API 使用方式决定，并且具有零配置或最小配置的最佳性能默认设置。如果你想直接查看示例，[请从这里开始](/docs/app/building-your-application/data-fetching/fetching)。

## 概述

以下是不同缓存机制及其用途的高级概述：

| 机制                            | 缓存内容         | 位置   | 目的                          | 持续时间             |
| ------------------------------- | ---------------- | ------ | ----------------------------- | -------------------- |
| [请求记忆化](#请求记忆化)       | 函数的返回值     | 服务器 | 在 React 组件树中重复使用数据 | 单个请求生命周期     |
| [数据缓存](#数据缓存)           | 数据             | 服务器 | 在用户请求和部署之间存储数据  | 持久性(可以重新验证) |
| [完整路由缓存](#完整路由缓存)   | HTML 和 RSC 负载 | 服务器 | 降低渲染成本并提高性能        | 持久性(可以重新验证) |
| [路由器缓存](#客户端路由器缓存) | RSC 负载         | 客户端 | 在导航时减少服务器请求        | 用户会话或基于时间   |

默认情况下，Next.js 将尽可能多地缓存内容以提高性能并降低成本。这意味着路由默认是**静态渲染**的，数据请求是**被缓存**的，除非你选择退出这些机制。下图显示了默认的缓存行为：路由在构建时静态渲染以及静态路由首次被访问时的情况。

<Image
  alt="Next.js 中四种缓存机制的默认缓存行为图，显示在构建时和首次访问路由时的 HIT、MISS 和 SET 状态。"
  srcLight="/docs/light/caching-overview.png"
  srcDark="/docs/dark/caching-overview.png"
  width="1600"
  height="1179"
/>

缓存行为会根据路由是静态还是动态渲染、数据是否缓存，以及请求是属于初次访问还是后续导航而变化。根据你的使用场景，你可以为单个路由和数据请求配置缓存行为。

## 请求记忆化

Next.js 扩展了 [`fetch` API](#fetch) 以自动**记忆化**具有相同 URL 和选项的请求。这意味着你可以在 React 组件树的多个位置调用相同数据的获取函数，但实际上只执行一次。

<Image
  alt="去重的 Fetch 请求"
  srcLight="/docs/light/deduplicated-fetch-requests.png"
  srcDark="/docs/dark/deduplicated-fetch-requests.png"
  width="1600"
  height="857"
/>

例如，如果你需要在路由中多处使用相同的数据（如在 Layout、Page 和多个组件中），你不必在树的顶部获取数据，然后在组件之间传递 props。相反，你可以在需要数据的组件中直接获取数据，而不必担心为同一数据发起多个请求对性能造成的影响。

```tsx filename="app/example.tsx" switcher
async function getItem() {
  // `fetch` 函数自动被记忆化，结果会被缓存
  const res = await fetch('https://.../item/1')
  return res.json()
}

// 这个函数被调用两次，但只有第一次执行
const item = await getItem() // 缓存未命中

// 第二次调用可以在路由中的任何位置
const item = await getItem() // 缓存命中
```

```jsx filename="app/example.js" switcher
async function getItem() {
  // `fetch` 函数自动被记忆化，结果会被缓存
  const res = await fetch('https://.../item/1')
  return res.json()
}

// 这个函数被调用两次，但只有第一次执行
const item = await getItem() // 缓存未命中

// 第二次调用可以在路由中的任何位置
const item = await getItem() // 缓存命中
```

**请求记忆化的工作原理**

<Image
  alt="React 渲染期间 fetch 记忆化工作原理的图示。"
  srcLight="/docs/light/request-memoization.png"
  srcDark="/docs/dark/request-memoization.png"
  width="1600"
  height="742"
/>

- 在渲染路由时，首次调用特定请求时，其结果不在内存中，将会是缓存 `MISS`。
- 因此，该函数将被执行，数据将从外部源获取，结果将存储在内存中。
- 在同一渲染过程中对该请求的后续函数调用将是缓存 `HIT`，数据将从内存中返回，而不执行函数。
- 一旦路由渲染完成，渲染过程结束，内存会被"重置"，所有请求记忆化条目都会被清除。

> **值得注意**:
>
> - 请求记忆化是 React 功能，而不是 Next.js 功能。这里介绍它是为了展示它如何与其他缓存机制交互。
> - 记忆化仅适用于 `fetch` 请求中的 `GET` 方法。
> - 记忆化仅适用于 React 组件树，这意味着：
>   - 它适用于 `generateMetadata`、`generateStaticParams`、Layouts、Pages 和其他服务器组件中的 `fetch` 请求。
>   - 它不适用于路由处理程序中的 `fetch` 请求，因为它们不是 React 组件树的一部分。
> - 对于 `fetch` 不适用的情况（例如某些数据库客户端、CMS 客户端或 GraphQL 客户端），你可以使用 [React `cache` 函数](#react-cache-函数)来记忆化函数。

### 持续时间

缓存持续时间为服务器请求的生命周期，直到 React 组件树渲染完成。

### 重新验证

由于记忆化不在服务器请求之间共享，且仅在渲染期间应用，因此无需重新验证它。

### 选择退出

记忆化仅适用于 `fetch` 请求中的 `GET` 方法，其他方法（如 `POST` 和 `DELETE`）不会被记忆化。这种默认行为是 React 的优化，我们不建议退出此功能。

要管理单个请求，你可以使用 [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) 的 [`signal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal) 属性。但是，这不会使请求退出记忆化，而是会中止正在进行的请求。

```js filename="app/example.js"
const { signal } = new AbortController()
fetch(url, { signal })
```

## 数据缓存

Next.js 有一个内置的数据缓存，可以在多个**服务器请求**和**部署**之间**持久化**数据获取的结果。这是可能的，因为 Next.js 扩展了原生的 `fetch` API，允许服务器上的每个请求设置自己的持久缓存语义。

> **值得注意**: 在浏览器中，`fetch` 的 `cache` 选项表示请求如何与浏览器的 HTTP 缓存交互，而在 Next.js 中，`cache` 选项表示服务器端请求如何与服务器的数据缓存交互。

你可以使用 `fetch` 的 [`cache`](#fetch-optionscache) 和 [`next.revalidate`](#fetch-optionsnextrevalidate) 选项来配置缓存行为。

**数据缓存的工作原理**

<Image
  alt="展示缓存和非缓存 fetch 请求如何与数据缓存交互的图表。缓存请求存储在数据缓存中，并被记忆化；非缓存请求从数据源获取，不存储在数据缓存中，但会被记忆化。"
  srcLight="/docs/light/data-cache.png"
  srcDark="/docs/dark/data-cache.png"
  width="1600"
  height="661"
/>

- 在渲染期间首次调用带有 `'force-cache'` 选项的 `fetch` 请求时，Next.js 会检查数据缓存中是否有缓存的响应。
- 如果找到缓存的响应，它会立即返回并被[记忆化](#请求记忆化)。
- 如果没有找到缓存的响应，请求会发送到数据源，结果会存储在数据缓存中，并被记忆化。
- 对于非缓存数据（例如没有定义 `cache` 选项或使用 `{ cache: 'no-store' }`），结果总是从数据源获取，并被记忆化。
- 无论数据是否被缓存，请求总是被记忆化，以避免在 React 渲染过程中对相同数据进行重复请求。

> **数据缓存和请求记忆化之间的区别**
>
> 虽然这两种缓存机制都通过重用缓存数据来提高性能，但数据缓存在多个请求和部署之间是持久的，而记忆化只在请求的生命周期内持续。

### 持续时间

数据缓存在多个请求和部署之间是持久的，除非你重新验证或选择退出。

### 重新验证

缓存数据可以通过两种方式进行重新验证：

- **基于时间的重新验证**：在一定时间过后且有新请求时重新验证数据。这适用于不经常变化且实时性要求不高的数据。
- **按需重新验证**：基于事件（例如表单提交）重新验证数据。按需重新验证可以使用基于标签或基于路径的方法一次性重新验证一组数据。这在你希望尽快显示最新数据时特别有用（例如，当你的无头 CMS 内容更新时）。

#### 基于时间的重新验证

要按时间间隔重新验证数据，你可以使用 `fetch` 的 `next.revalidate` 选项来设置资源的缓存生命周期（以秒为单位）。

```js
// 最多每小时重新验证一次
fetch('https://...', { next: { revalidate: 3600 } })
```

或者，你可以使用[路由段配置选项](#segment-config-options)为某个段内的所有 `fetch` 请求配置，或者在无法使用 `fetch` 的情况下使用。

**基于时间的重新验证工作原理**

<Image
  alt="基于时间的重新验证工作原理图示，在重新验证期之后，第一个请求返回过期数据，然后数据被重新验证。"
  srcLight="/docs/light/time-based-revalidation.png"
  srcDark="/docs/dark/time-based-revalidation.png"
  width="1600"
  height="1252"
/>

- 首次调用带有 `revalidate` 的 fetch 请求时，数据将从外部数据源获取并存储在数据缓存中。
- 在指定的时间范围内（例如 60 秒）发出的任何请求都将返回缓存的数据。
- 在时间范围之后，下一个请求仍会返回缓存的（现在已过期的）数据。
  - Next.js 将在后台触发数据的重新验证。
  - 一旦数据成功获取，Next.js 将使用新数据更新数据缓存。
  - 如果后台重新验证失败，之前的数据将保持不变。

这类似于 [**stale-while-revalidate**](https://web.dev/articles/stale-while-revalidate) 行为。

#### 按需重新验证

数据可以通过路径（[`revalidatePath`](#revalidatepath)）或缓存标签（[`revalidateTag`](#fetch-optionsnexttags-和-revalidatetag)）按需重新验证。

**按需重新验证的工作原理**

<Image
  alt="按需重新验证的工作原理图示，重新验证请求后数据缓存使用新鲜数据更新。"
  srcLight="/docs/light/on-demand-revalidation.png"
  srcDark="/docs/dark/on-demand-revalidation.png"
  width="1600"
  height="1082"
/>

- 首次调用 `fetch` 请求时，数据将从外部数据源获取并存储在数据缓存中。
- 触发按需重新验证时，相应的缓存条目将从缓存中清除。
  - 这与基于时间的重新验证不同，后者会在获取新数据之前保留过期数据在缓存中。
- 下次发出请求时，将再次出现缓存 `MISS`，数据将从外部数据源获取并存储在数据缓存中。

### 选择退出

如果你**不**想缓存 `fetch` 的响应，可以执行以下操作：

```js
let data = await fetch('https://api.vercel.app/blog', { cache: 'no-store' })
```

## 完整路由缓存

> **相关术语**:
>
> 你可能会看到术语**自动静态优化**、**静态站点生成**或**静态渲染**被互换使用，它们都指的是在构建时渲染和缓存应用程序路由的过程。

Next.js 会在构建时自动渲染和缓存路由。这是一种优化，允许你为每个请求提供缓存的路由，而不是在服务器上每次都进行渲染，从而实现更快的页面加载。

要理解完整路由缓存的工作原理，了解 React 如何处理渲染以及 Next.js 如何缓存结果很有帮助：

### 1. React 在服务器上的渲染

在服务器上，Next.js 使用 React 的 API 来协调渲染。渲染工作被分成多个块：按照各个路由段和 Suspense 边界。

每个块分两步渲染：

1. React 将服务器组件渲染成一种特殊的数据格式，针对流式传输进行了优化，称为 **React 服务器组件有效载荷**。
2. Next.js 使用 React 服务器组件有效载荷和客户端组件 JavaScript 指令在服务器上渲染 **HTML**。

这意味着我们不必等待所有内容都渲染完成后才能缓存工作或发送响应。相反，我们可以在工作完成时流式传输响应。

> **什么是 React 服务器组件有效载荷？**
>
> React 服务器组件有效载荷是渲染的 React 服务器组件树的紧凑二进制表示。它被 React 在客户端用于更新浏览器的 DOM。React 服务器组件有效载荷包含：
>
> - 服务器组件的渲染结果
> - 客户端组件应该被渲染的位置的占位符以及它们的 JavaScript 文件的引用
> - 从服务器组件传递到客户端组件的任何 props
>
> 要了解更多信息，请参阅[服务器组件](/docs/app/building-your-application/rendering/server-components)文档。

### 2. Next.js 在服务器上的缓存（完整路由缓存）

<Image
  alt="完整路由缓存的默认行为，显示 React 服务器组件有效载荷和 HTML 如何在服务器上为静态渲染的路由缓存。"
  srcLight="/docs/light/full-route-cache.png"
  srcDark="/docs/dark/full-route-cache.png"
  width="1600"
  height="888"
/>

Next.js 的默认行为是在服务器上缓存路由的渲染结果（React 服务器组件有效载荷和 HTML）。这适用于在构建时或重新验证期间静态渲染的路由。

### 3. React 在客户端上的水合和协调

在请求时，在客户端：

1. HTML 用于立即显示客户端和服务器组件的快速非交互式初始预览。
2. React 服务器组件有效载荷用于协调客户端和渲染的服务器组件树，并更新 DOM。
3. JavaScript 指令用于[水合](https://react.dev/reference/react-dom/client/hydrateRoot)客户端组件并使应用程序具有交互性。

### 4. Next.js 在客户端上的缓存（路由器缓存）

React 服务器组件有效载荷存储在客户端[路由器缓存](#客户端路由器缓存)中 - 这是一个按单个路由段分割的独立内存缓存。该路由器缓存用于通过存储之前访问过的路由和预取未来可能访问的路由来改善导航体验。

### 5. 后续导航

在后续导航或预取过程中，Next.js 将检查路由器缓存中是否存储了 React 服务器组件有效载荷。如果存在，它将跳过向服务器发送新请求。

如果路由段不在缓存中，Next.js 将从服务器获取 React 服务器组件有效载荷，并在客户端填充路由器缓存。

### 静态和动态渲染

路由是否在构建时缓存取决于它是静态渲染还是动态渲染。静态路由默认会被缓存，而动态路由则在请求时渲染，不会被缓存。

这张图展示了静态和动态渲染路由之间的区别，以及缓存和非缓存数据的情况：

<Image
  alt="静态和动态渲染如何影响完整路由缓存。静态路由在构建时或数据重新验证后缓存，而动态路由永远不会被缓存"
  srcLight="/docs/light/static-and-dynamic-routes.png"
  srcDark="/docs/dark/static-and-dynamic-routes.png"
  width="1600"
  height="1314"
/>

了解更多关于[静态和动态渲染](/docs/app/building-your-application/rendering/server-components#server-rendering-strategies)的信息。

### 持续时间

默认情况下，完整路由缓存是持久的。这意味着渲染输出会在多个用户请求之间被缓存。

### 失效

有两种方法可以使完整路由缓存失效：

- **[重新验证数据](/docs/app/deep-dive/caching#revalidating)**：重新验证[数据缓存](#数据缓存)，将反过来通过在服务器上重新渲染组件并缓存新的渲染输出来使路由器缓存失效。
- **重新部署**：与数据缓存在部署之间持久存在不同，完整路由缓存在新部署时会被清除。

### 选择退出

你可以选择退出完整路由缓存，或者换句话说，为每个传入请求动态渲染组件，通过以下方式：

- **使用[动态 API](#dynamic-apis)**：这将使路由退出完整路由缓存，并在请求时动态渲染它。数据缓存仍然可以使用。
- **使用 `dynamic = 'force-dynamic'` 或 `revalidate = 0` 路由段配置选项**：这将跳过完整路由缓存和数据缓存。这意味着组件将在每个到达服务器的请求上被渲染，数据将被获取。路由器缓存仍然适用，因为它是客户端缓存。
- **选择退出[数据缓存](#数据缓存)**：如果路由中有一个未缓存的 `fetch` 请求，这将使路由退出完整路由缓存。特定 `fetch` 请求的数据将针对每个传入请求获取。其他没有选择退出缓存的 `fetch` 请求仍将在数据缓存中被缓存。这允许缓存和非缓存数据的混合使用。

## 客户端路由器缓存

Next.js 有一个内存中的客户端路由器缓存，它存储按布局、加载状态和页面分割的路由段的 RSC 有效载荷。

当用户在路由之间导航时，Next.js 会缓存访问过的路由段，并[预取](/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)用户可能导航到的路由。这导致即时的后退/前进导航，在导航之间没有完整页面重新加载，并保留 React 状态和浏览器状态。

使用路由器缓存：

- **布局**在导航时被缓存和重用（[部分渲染](/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering)）。
- **加载状态**在导航时被缓存和重用，实现[即时导航](/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states)。
- **页面**默认不被缓存，但在浏览器后退和前进导航过程中会被重用。你可以通过使用实验性的[`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes)配置选项为页面段启用缓存。

{/_ TODO: 更新图表以匹配 v15 行为 _/}

> **值得注意：**此缓存专门适用于 Next.js 和服务器组件，与浏览器的 [bfcache](https://web.dev/bfcache/) 不同，尽管它有类似的结果。

### 持续时间

缓存存储在浏览器的临时内存中。两个因素决定了路由器缓存的持续时间：

- **会话**：缓存在导航过程中持续存在。但是，它会在页面刷新时被清除。
- **自动失效期**：布局和加载状态的缓存会在特定时间后自动失效。持续时间取决于资源如何被[预取](/docs/app/api-reference/components/link#prefetch)，以及资源是否被[静态生成](/docs/app/building-your-application/rendering/server-components#static-rendering-default)：
  - **默认预取**（`prefetch={null}` 或未指定）：动态页面不缓存，静态页面缓存 5 分钟。
  - **完全预取**（`prefetch={true}` 或 `router.prefetch`）：静态和动态页面都缓存 5 分钟。

虽然页面刷新将清除**所有**缓存的段，但自动失效期只会影响从预取时间起的单个段。

> **值得注意**：实验性的[`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes)配置选项可用于调整上述自动失效时间。

### 失效

有两种方法可以使路由器缓存失效：

- 在**服务器操作**中：
  - 通过路径（[`revalidatePath`](/docs/app/api-reference/functions/revalidatePath)）或通过缓存标签（[`revalidateTag`](/docs/app/api-reference/functions/revalidateTag)）按需重新验证数据
  - 使用 [`cookies.set`](/docs/app/api-reference/functions/cookies#setting-a-cookie) 或 [`cookies.delete`](/docs/app/api-reference/functions/cookies#deleting-cookies) 会使路由器缓存失效，以防止使用 cookie 的路由变得过期（例如身份验证）。
- 调用 [`router.refresh`](/docs/app/api-reference/functions/use-router) 将使路由器缓存失效，并为当前路由向服务器发出新请求。

### 选择退出

从 Next.js 15 开始，页面段默认被选择退出。

> **值得注意**：你也可以通过将 `<Link>` 组件的 `prefetch` 属性设置为 `false` 来选择退出[预取](/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)。

## 缓存交互

在配置不同的缓存机制时，了解它们之间如何交互很重要：

### 数据缓存和完整路由缓存

- 重新验证或选择退出数据缓存**将会**使完整路由缓存失效，因为渲染输出依赖于数据。
- 使完整路由缓存失效或选择退出**不会**影响数据缓存。你可以动态渲染一个同时具有缓存和非缓存数据的路由。当你的页面大部分使用缓存数据，但有几个组件依赖于需要在请求时获取的数据时，这很有用。你可以动态渲染而不必担心重新获取所有数据对性能的影响。

### 数据缓存和客户端路由器缓存

- 要立即使数据缓存和路由器缓存失效，你可以在[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)中使用 [`revalidatePath`](#revalidatepath) 或 [`revalidateTag`](#fetch-optionsnexttags-和-revalidatetag)。
- 在[路由处理程序](/docs/app/building-your-application/routing/route-handlers)中重新验证数据缓存**不会**立即使路由器缓存失效，因为路由处理程序不与特定路由关联。这意味着路由器缓存将继续提供之前的有效载荷，直到硬刷新或自动失效期已过。

## APIs

下表概述了不同 Next.js API 如何影响缓存：

| API                                                                    | 路由器缓存             | 完整路由缓存       | 数据缓存           | React 缓存 |
| ---------------------------------------------------------------------- | ---------------------- | ------------------ | ------------------ | ---------- |
| [`<Link prefetch>`](#link)                                             | 缓存                   |                    |                    |            |
| [`router.prefetch`](#routerprefetch)                                   | 缓存                   |                    |                    |            |
| [`router.refresh`](#routerrefresh)                                     | 重新验证               |                    |                    |            |
| [`fetch`](#fetch)                                                      |                        |                    | 缓存               | 缓存       |
| [`fetch` `options.cache`](#fetch-optionscache)                         |                        |                    | 缓存或选择退出     |            |
| [`fetch` `options.next.revalidate`](#fetch-optionsnextrevalidate)      |                        | 重新验证           | 重新验证           |            |
| [`fetch` `options.next.tags`](#fetch-optionsnexttags-和-revalidatetag) |                        | 缓存               | 缓存               |            |
| [`revalidateTag`](#fetch-optionsnexttags-和-revalidatetag)             | 重新验证（服务器操作） | 重新验证           | 重新验证           |            |
| [`revalidatePath`](#revalidatepath)                                    | 重新验证（服务器操作） | 重新验证           | 重新验证           |            |
| [`const revalidate`](#segment-config-options)                          |                        | 重新验证或选择退出 | 重新验证或选择退出 |            |
| [`const dynamic`](#segment-config-options)                             |                        | 缓存或选择退出     | 缓存或选择退出     |            |
| [`cookies`](#cookies)                                                  | 重新验证（服务器操作） | 选择退出           |                    |            |
| [`headers`, `searchParams`](#dynamic-apis)                             |                        | 选择退出           |                    |            |
| [`generateStaticParams`](#generatestaticparams)                        |                        | 缓存               |                    |            |
| [`React.cache`](#react-cache-函数)                                     |                        |                    |                    | 缓存       |
| [`unstable_cache`](/docs/app/api-reference/functions/unstable_cache)   |                        |                    | 缓存               |            |

### `<Link>`

默认情况下，`<Link>` 组件会自动从完整路由缓存预取路由，并将 React 服务器组件有效载荷添加到路由器缓存中。

要禁用预取，你可以将 `prefetch` 属性设置为 `false`。但这不会永久跳过缓存，当用户访问该路由时，路由段仍然会在客户端被缓存。

了解更多关于 [`<Link>` 组件](/docs/app/api-reference/components/link)的信息。

### `router.prefetch`

`useRouter` 钩子的 `prefetch` 选项可用于手动预取路由。这会将 React 服务器组件有效载荷添加到路由器缓存中。

参见 [`useRouter` 钩子](/docs/app/api-reference/functions/use-router) API 参考。

### `router.refresh`

`useRouter` 钩子的 `refresh` 选项可用于手动刷新路由。这会完全清除路由器缓存，并为当前路由向服务器发出新请求。`refresh` 不影响数据或完整路由缓存。

渲染结果将在客户端进行协调，同时保留 React 状态和浏览器状态。

参见 [`useRouter` 钩子](/docs/app/api-reference/functions/use-router) API 参考。

### `fetch`

从 `fetch` 返回的数据**不会**自动缓存在数据缓存中。

`fetch` 的默认缓存行为（例如，当没有指定 `cache` 选项时）等同于将 `cache` 选项设置为 `no-store`：

```js
let data = await fetch('https://api.vercel.app/blog', { cache: 'no-store' })
```

更多选项请参见 [`fetch` API 参考](/docs/app/api-reference/functions/fetch)。

### `fetch options.cache`

你可以通过将 `cache` 选项设置为 `force-cache` 来选择将单个 `fetch` 加入缓存：

```jsx
// 选择缓存
fetch(`https://...`, { cache: 'force-cache' })
```

更多选项请参见 [`fetch` API 参考](/docs/app/api-reference/functions/fetch)。

### `fetch options.next.revalidate`

你可以使用 `fetch` 的 `next.revalidate` 选项来设置单个 `fetch` 请求的重新验证周期（以秒为单位）。这将重新验证数据缓存，进而重新验证完整路由缓存。新数据将被获取，组件将在服务器上重新渲染。

```jsx
// 最多 1 小时后重新验证
fetch(`https://...`, { next: { revalidate: 3600 } })
```

更多选项请参见 [`fetch` API 参考](/docs/app/api-reference/functions/fetch)。

### `fetch options.next.tags` 和 `revalidateTag`

Next.js 有一个缓存标签系统，用于细粒度的数据缓存和重新验证。

1. 当使用 `fetch` 或 [`unstable_cache`](/docs/app/api-reference/functions/unstable_cache) 时，你可以选择用一个或多个标签来标记缓存条目。
2. 然后，你可以调用 `revalidateTag` 来清除与该标签关联的缓存条目。

例如，你可以在获取数据时设置标签：

```jsx
// 使用标签缓存数据
fetch(`https://...`, { next: { tags: ['a', 'b', 'c'] } })
```

然后，使用标签调用 `revalidateTag` 来清除缓存条目：

```jsx
// 重新验证具有特定标签的条目
revalidateTag('a')
```

你可以在两个地方使用 `revalidateTag`，取决于你想要实现的目标：

1. [路由处理程序](/docs/app/building-your-application/routing/route-handlers) - 响应第三方事件（例如 webhook）来重新验证数据。这不会立即使路由器缓存失效，因为路由处理程序不与特定路由关联。
2. [服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - 在用户操作后重新验证数据（例如表单提交）。这会使相关路由的路由器缓存失效。

### `revalidatePath`

`revalidatePath` 允许你手动重新验证数据**并**在单个操作中重新渲染特定路径下的路由段。调用 `revalidatePath` 方法会重新验证数据缓存，进而使完整路由缓存失效。

```jsx
revalidatePath('/')
```

你可以在两个地方使用 `revalidatePath`，取决于你想要实现的目标：

1. [路由处理程序](/docs/app/building-your-application/routing/route-handlers) - 响应第三方事件（例如 webhook）来重新验证数据。
2. [服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - 在用户交互后重新验证数据（例如表单提交、点击按钮）。

更多信息请参见 [`revalidatePath` API 参考](/docs/app/api-reference/functions/revalidatePath)。

> **`revalidatePath`** vs. **`router.refresh`**:
>
> 调用 `router.refresh` 将清除路由器缓存，并在服务器上重新渲染路由段，而不会使数据缓存或完整路由缓存失效。
>
> 区别在于 `revalidatePath` 清除数据缓存和完整路由缓存，而 `router.refresh()` 不会改变数据缓存和完整路由缓存，因为它是一个客户端 API。

### 动态 API

像 `cookies` 和 `headers` 这样的动态 API，以及页面中的 `searchParams` 属性依赖于运行时传入的请求信息。使用它们会使路由退出完整路由缓存，换句话说，路由将被动态渲染。

#### `cookies`

在服务器操作中使用 `cookies.set` 或 `cookies.delete` 会使路由器缓存失效，以防止使用 cookie 的路由变得过期（例如反映身份验证更改）。

参见 [`cookies`](/docs/app/api-reference/functions/cookies) API 参考。

### 段配置选项

路由段配置选项可用于覆盖路由段默认值，或者当你无法使用 `fetch` API 时（例如数据库客户端或第三方库）。

以下路由段配置选项将使路由退出完整路由缓存：

- `const dynamic = 'force-dynamic'`

这个配置选项将使所有获取操作退出数据缓存（即 `no-store`）：

- `const fetchCache = 'default-no-store'`

查看 [`fetchCache`](/docs/app/api-reference/file-conventions/route-segment-config#fetchcache) 了解更多高级选项。

参见[路由段配置](/docs/app/api-reference/file-conventions/route-segment-config)文档了解更多选项。

### `generateStaticParams`

对于[动态段](/docs/app/building-your-application/routing/dynamic-routes)（例如 `app/blog/[slug]/page.js`），`generateStaticParams` 提供的路径会在构建时缓存在完整路由缓存中。在请求时，Next.js 也会缓存在构建时未知的路径，当它们首次被访问时。

要在构建时静态渲染所有路径，请向 `generateStaticParams` 提供完整的路径列表：

```jsx filename="app/blog/[slug]/page.js"
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

要在构建时静态渲染部分路径，并在运行时首次访问时渲染其余部分，返回部分路径列表：

```jsx filename="app/blog/[slug]/page.js"
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  // 在构建时渲染前 10 篇文章
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }))
}
```

要在首次访问时静态渲染所有路径，返回一个空数组（构建时不会渲染任何路径）或使用 [`export const dynamic = 'force-static'`](/docs/app/api-reference/file-conventions/route-segment-config#dynamic)：

```jsx filename="app/blog/[slug]/page.js"
export async function generateStaticParams() {
  return []
}
```

> **值得注意：** 你必须从 `generateStaticParams` 返回一个数组，即使它是空的。否则，路由将被动态渲染。

```jsx filename="app/changelog/[slug]/page.js"
export const dynamic = 'force-static'
```

要在请求时禁用缓存，在路由段中添加 `export const dynamicParams = false` 选项。使用此配置选项时，只有 `generateStaticParams` 提供的路径会被服务，其他路由将返回 404 或匹配（在[捕获所有路由](/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments)的情况下）。

### React `cache` 函数

React `cache` 函数允许你记忆函数的返回值，使你可以多次调用相同的函数，但只执行一次。

由于 `fetch` 请求会自动记忆化，你不需要将其包装在 React `cache` 中。然而，你可以使用 `cache` 来手动记忆化数据请求，用于 `fetch` API 不适用的用例。例如，某些数据库客户端、CMS 客户端或 GraphQL 客户端。

```ts filename="utils/get-item.ts" switcher
import { cache } from 'react'
import db from '@/lib/db'

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

```js filename="utils/get-item.js" switcher
import { cache } from 'react'
import db from '@/lib/db'

export const getItem = cache(async (id) => {
  const item = await db.item.findUnique({ id })
  return item
})
```
