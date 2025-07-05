---
title: 链接和导航
description: 了解 Next.js 中的导航如何工作，以及如何使用 Link 组件和 `useRouter` 钩子。
related:
  links:
    - app/deep-dive/caching
    - app/api-reference/config/typescript
---

在 Next.js 中有四种在路由之间导航的方式：

- 使用 [`<Link>` 组件](#link-组件)
- 使用 [`useRouter` 钩子](#userouter-钩子) ([客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components))
- 使用 [`redirect` 函数](#redirect-函数) ([服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components))
- 使用原生 [History API](#使用原生-history-api)

本页将介绍如何使用这些选项，并深入探讨导航的工作原理。

## `<Link>` 组件

`<Link>` 是一个内置组件，它扩展了 HTML 的 `<a>` 标签，提供[预获取](#预获取)和路由之间的客户端导航功能。这是在 Next.js 中在路由之间导航的主要推荐方式。

您可以通过从 `next/link` 导入并向组件传递 `href` 属性来使用它：

```tsx switcher
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">仪表盘</Link>
}
```

```jsx switcher
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">仪表盘</Link>
}
```

您还可以传递其他可选属性给 `<Link>`。更多详情请参阅 [API 参考](/docs/nextjs-cn/app/api-reference/components/link)。

## `useRouter()` 钩子

`useRouter` 钩子允许您在[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)中以编程方式更改路由。

```tsx switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表盘
    </button>
  )
}
```

```jsx switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表盘
    </button>
  )
}
```

有关 `useRouter` 方法的完整列表，请参阅 [API 参考](/docs/nextjs-cn/app/api-reference/functions/use-router)。

> **建议：** 除非有使用 `useRouter` 的特定需求，否则请使用 `<Link>` 组件在路由之间导航。

## `redirect` 函数

对于[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)，请使用 `redirect` 函数。

```tsx switcher
import { redirect } from 'next/navigation'

async function fetchTeam(id: string) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!id) {
    redirect('/login')
  }

  const team = await fetchTeam(id)
  if (!team) {
    redirect('/join')
  }

  // ...
}
```

```jsx switcher
import { redirect } from 'next/navigation'

async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const { id } = await params
  if (!id) {
    redirect('/login')
  }

  const team = await fetchTeam(id)
  if (!team) {
    redirect('/join')
  }

  // ...
}
```

> **值得了解**：
>
> - `redirect` 默认返回 307（临时重定向）状态码。当在服务器操作中使用时，它返回 303（查看其他），这通常用于在 POST 请求后重定向到成功页面。
> - `redirect` 内部会抛出错误，所以应该在 `try/catch` 块之外调用。
> - `redirect` 可以在渲染过程中在客户端组件中调用，但不能在事件处理程序中调用。您可以使用 [`useRouter` 钩子](#userouter-钩子)代替。
> - `redirect` 也接受绝对 URL，可用于重定向到外部链接。
> - 如果您想在渲染过程之前重定向，请使用 [`next.config.js`](/docs/nextjs-cn/app/building-your-application/routing/index/redirecting#redirects-in-nextconfigjs) 或 [中间件](/docs/nextjs-cn/app/building-your-application/routing/index/redirecting#nextresponseredirect-in-middleware)。

更多信息请参阅 [`redirect` API 参考](/docs/nextjs-cn/app/api-reference/functions/redirect)。

## 使用原生 History API

Next.js 允许您使用原生 [`window.history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) 和 [`window.history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) 方法来更新浏览器的历史堆栈，而无需重新加载页面。

`pushState` 和 `replaceState` 调用集成到 Next.js 路由器中，允许您与 [`usePathname`](/docs/nextjs-cn/app/api-reference/functions/use-pathname) 和 [`useSearchParams`](/docs/nextjs-cn/app/api-reference/functions/use-search-params) 同步。

### `window.history.pushState`

使用它向浏览器的历史堆栈添加新条目。用户可以导航回上一状态。例如，对产品列表进行排序：

```tsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SortProducts() {
  const searchParams = useSearchParams()

  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>升序排序</button>
      <button onClick={() => updateSorting('desc')}>降序排序</button>
    </>
  )
}
```

```jsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SortProducts() {
  const searchParams = useSearchParams()

  function updateSorting(sortOrder) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>升序排序</button>
      <button onClick={() => updateSorting('desc')}>降序排序</button>
    </>
  )
}
```

### `window.history.replaceState`

使用它替换浏览器历史堆栈上的当前条目。用户无法导航回上一状态。例如，切换应用程序的语言环境：

```tsx switcher
'use client'

import { usePathname } from 'next/navigation'

export function LocaleSwitcher() {
  const pathname = usePathname()

  function switchLocale(locale: string) {
    // 例如 '/en/about' 或 '/fr/contact'
    const newPath = `/${locale}${pathname}`
    window.history.replaceState(null, '', newPath)
  }

  return (
    <>
      <button onClick={() => switchLocale('en')}>英文</button>
      <button onClick={() => switchLocale('fr')}>法文</button>
    </>
  )
}
```

```jsx switcher
'use client'

import { usePathname } from 'next/navigation'

export function LocaleSwitcher() {
  const pathname = usePathname()

  function switchLocale(locale) {
    // 例如 '/en/about' 或 '/fr/contact'
    const newPath = `/${locale}${pathname}`
    window.history.replaceState(null, '', newPath)
  }

  return (
    <>
      <button onClick={() => switchLocale('en')}>英文</button>
      <button onClick={() => switchLocale('fr')}>法文</button>
    </>
  )
}
```

## 路由和导航工作原理

App Router 使用混合方法进行路由和导航。在服务器上，您的应用程序代码会按路由段自动[代码分割](#代码分割)。在客户端，Next.js[预获取](#预获取)和[缓存](#缓存)路由段。这意味着，当用户导航到新路由时，浏览器不会重新加载页面，只有变化的路由段会重新渲染——改善导航体验和性能。

### 1. 代码分割

代码分割允许您将应用程序代码拆分为更小的包，由浏览器下载和执行。这减少了每个请求的数据传输量和执行时间，从而提高性能。

[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)允许您的应用程序代码按路由段自动进行代码分割。这意味着在导航时只加载当前路由所需的代码。

### 2. 预获取

预获取是在用户访问路由之前在后台预加载路由的方式。

在 Next.js 中，有两种预获取路由的方式：

- **`<Link>` 组件**：路由会在它们进入用户视口时自动预获取。预获取发生在页面首次加载时，或通过滚动进入视图时。
- **`router.prefetch()`**：`useRouter` 钩子可用于以编程方式预获取路由。

`<Link>` 的默认预获取行为（即当 `prefetch` 属性未指定或设置为 `null` 时）取决于您使用 [`loading.js`](/docs/nextjs-cn/app/api-reference/file-conventions/loading) 的情况。只有共享布局，沿着渲染的"树"一直到第一个 `loading.js` 文件，才会被预获取并缓存 `30s`。这减少了获取整个动态路由的成本，并且意味着您可以显示[即时加载状态](/docs/nextjs-cn/app/building-your-application/routing/index/loading-ui-and-streaming#instant-loading-states)，为用户提供更好的视觉反馈。

您可以通过将 `prefetch` 属性设置为 `false` 来禁用预获取。或者，您可以通过将 `prefetch` 属性设置为 `true` 来预获取加载边界之外的完整页面数据。

更多信息请参阅 [`<Link>` API 参考](/docs/nextjs-cn/app/api-reference/components/link)。

> **值得了解**：
>
> - 预获取在开发中不启用，只在生产中启用。

### 3. 缓存

Next.js 有一个称为[路由器缓存](/docs/nextjs-cn/app/deep-dive/caching#client-side-router-cache)的**内存客户端缓存**。当用户在应用程序中导航时，[预获取](#预获取)的路由段和访问过的路由的 React 服务器组件有效载荷会存储在缓存中。

这意味着在导航时，缓存会尽可能被重用，而不是向服务器发出新请求——通过减少请求数量和数据传输量来提高性能。

了解[路由器缓存](/docs/nextjs-cn/app/deep-dive/caching#client-side-router-cache)如何工作以及如何配置它。

### 4. 部分渲染

部分渲染意味着在导航时，只有在客户端上变化的路由段才会重新渲染，而任何共享段都会被保留。

例如，在两个兄弟路由 `/dashboard/settings` 和 `/dashboard/analytics` 之间导航时，`settings` 页面将被卸载，`analytics` 页面将以新状态挂载，共享的 `dashboard` 布局将被保留。这种行为也存在于同一动态段上的两个路由之间，例如使用 `/blog/[slug]/page` 并从 `/blog/first` 导航到 `/blog/second`。

<Image
  alt="部分渲染的工作原理"
  srcLight="/docs/light/partial-rendering.png"
  srcDark="/docs/dark/partial-rendering.png"
  width="1600"
  height="945"
/>

如果没有部分渲染，每次导航都会导致在客户端上重新渲染整个页面。只渲染改变的段减少了数据传输量和执行时间，从而提高性能。

### 5. 软导航

浏览器在页面之间导航时执行"硬导航"。Next.js App Router 启用页面之间的"软导航"，确保只有已更改的路由段才会重新渲染（部分渲染）。这使得客户端 React 状态在导航过程中得以保留。

### 6. 前进和后退导航

默认情况下，Next.js 将在后退和前进导航中维持滚动位置，并重用[路由器缓存](/docs/nextjs-cn/app/deep-dive/caching#client-side-router-cache)中的路由段。

### 7. `pages/` 和 `app/` 之间的路由

当从 `pages/` 增量迁移到 `app/` 时，Next.js 路由器会自动处理两者之间的硬导航。为了检测从 `pages/` 到 `app/` 的转换，有一个客户端路由器过滤器，它利用应用路由的概率检查，这有时可能会导致假阳性。默认情况下，这种情况应该非常罕见，因为我们将假阳性可能性配置为 0.01%。这种可能性可以通过 `next.config.js` 中的 `experimental.clientRouterFilterAllowedRate` 选项进行自定义。需要注意的是，降低假阳性率将增加客户端包中生成的过滤器的大小。

或者，如果您更喜欢完全禁用此处理并手动管理 `pages/` 和 `app/` 之间的路由，可以在 `next.config.js` 中将 `experimental.clientRouterFilter` 设置为 false。当此功能被禁用时，pages 中与 app 路由重叠的任何动态路由默认情况下都无法正确导航。
