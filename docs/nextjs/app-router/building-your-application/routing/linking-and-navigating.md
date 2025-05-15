---
title: Next.js 中文文档 - 链接和导航
description: 学习如何在Next.js应用程序中实现导航和页面之间的链接。
---

# Next.js 中文文档 - 链接和导航

Next.js中有两种方式可以在路由之间进行导航：

1. [`<Link>`组件](#link组件)
2. [`useRouter` Hook](#userouter-hook)

本页将介绍如何使用这两种方法，以及相关的导航行为。

## `<Link>` 组件

`<Link>`是一个扩展HTML `<a>`标签的React组件，用于在路由之间实现**预取**和**客户端**导航。这是Next.js中导航路由的主要方式。

您可以从`next/link`导入它，并将`href`属性传递给组件：

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

您还可以使用其他可选属性，详见[API参考文档](/nextjs/app-router/api-reference/components/link)。

### 链接到动态路由段

当链接到使用[动态路由段](/nextjs/app-router/building-your-application/routing/dynamic-routes)的路由时，您可以使用模板字面量和字符串插值来生成链接列表。例如，生成博客文章列表：

```jsx
// app/blog/page.tsx
export default function Page() {
  const posts = [
    { id: '1', title: '第一篇博客文章' },
    { id: '2', title: '第二篇博客文章' },
  ]

  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}
```

### 检查活动链接

您可以使用[`usePathname()`](/nextjs/app-router/api-reference/functions/use-pathname)来确定链接是否处于活动状态。例如，通过将当前路径名与链接的`href`进行比较，可以为活动链接添加特定的类名：

```jsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}
```

### 滚动到`id`

默认行为是在跳转到新路由时滚动到页面顶部，或者在浏览器的前进/后退按钮导航中保持滚动位置。

当`href`中包含一个`id`时，如`href="#settings"`，它将把这个`id`传递给页面并滚动到特定的元素。

### 禁用滚动恢复

默认的滚动恢复行为是（同一个网页内）滚动到顶部，或（不同网页间导航时）维持滚动位置。如果您想禁用这个行为，可以在`Link`组件中传递`scroll={false}`，或在`router.push()`或`router.replace()`中传递`scroll: false`：

```jsx
// 同时禁用Link的滚动恢复
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>
```

## `useRouter()` Hook

`useRouter`钩子允许您以编程方式更改路由。

这个钩子只在客户端组件中可用，需要从`next/navigation`导入：

```jsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

前往[`useRouter`API参考](/nextjs/app-router/api-reference/functions/use-router)了解所有可用的方法。

> **推荐**: 除非您有特定需求，否则使用`<Link>`组件进行导航。

## 导航工作原理

- 路由变更由`<Link>`或通过`router.push()`启动。
- 路由器更新浏览器的地址栏中的URL。
- 路由器通过仅重新获取和重新渲染更改的路由段（例如布局和页面）来避免不必要的工作。这称为[部分渲染](/nextjs/app-router/building-your-application/routing#部分渲染)。
- 如果是导航到新路由，将使用[soft navigation](/nextjs/app-router/building-your-application/routing/linking-and-navigating#soft-navigation)，保留浏览器状态和避免页面完整刷新。
- 如果当前路由中缓存的服务器组件有效，则不会再次请求。如果无效，服务器会重新获取。

### 预获取

预获取是一种在后台预先加载路由的方式，可以提高导航体验。Next.js会预获取其视口中的`<Link>`组件链接，使导航几乎瞬时完成。

预获取的方式有两种：

- **静态路由**: 这些路由在构建时或数据重新验证期间静态生成，会在 `<Link>`组件渲染到浏览器视口中时自动预取。
- **动态路由**：对于使用`dynamic`路由段配置的路由，预获取仅在`<Link>`组件显示在视口中时发生，且只预先加载包含布局的数据，不加载整个路由段的所有数据。

> **预获取的注意事项**：
>
> - 预获取只在生产环境启用。
> - 可以通过在`<Link>`组件中传递`prefetch={false}`来禁用预获取。

```jsx
<Link href="/dashboard" prefetch={false}>
  Dashboard
</Link>
```

前往[`<Link>` API参考](/nextjs/app-router/api-reference/components/link#prefetch)了解更多信息。

### 缓存

Next.js有一个**基于路由的内存客户端缓存**，叫做路由缓存。当用户在应用中导航时，路由器会将经过渲染的路由段储存在缓存中，这样以后重复导航可以重用之前访问过的路由的React Server Component Payload，而不必再次发起请求。

查看[储存和恢复](/nextjs/app-router/building-your-application/routing/linking-and-navigating#储存和恢复)章节了解缓存如何影响浏览器前后导航，以及[路由缓存](/nextjs/app-router/building-your-application/data-fetching/fetching-caching-and-revalidating#数据缓存)章节了解更多关于缓存工作原理的信息。

### 部分渲染

部分渲染表示当在同级路由间导航时，只重新获取和重新渲染路由树中已更改的部分，保留共享布局的状态和交互。

例如，在两个同级路由`/dashboard/settings`和`/dashboard/analytics`之间导航时，`settings`和`analytics`页面将被获取和渲染，而它们共享的父`dashboard`布局将被保留。

部分渲染示意图：
![部分渲染图示](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fpartial-rendering.png&w=1920&q=75&dpl=dpl_BtyizNFY5NvmVekx6gUHKQFoubSp)

如果没有部分渲染，每次导航都会导致整个页面重新加载和重新渲染，可能导致较差的用户体验，特别是对于共享UI元素。

### Soft Navigation

浏览器通常会在页面之间硬导航（例如通过`<a>`元素）。这会导致一个完整的页面刷新，丢失浏览器状态，如滚动位置或焦点。

Next.js会在使用`<Link>`或路由器的路由之间执行软导航。这意味着JavaScript只更新了改变的内容，而浏览器状态被保留，不会发生完整的页面刷新。

### 储存和恢复

默认情况下，Next.js使用路由缓存来"储存"之前访问过的路由段。这意味着在从未访问过的路由导航到之前访问过的路由时，会使用缓存中保存的路由组件，而不会重新获取它。

Soft Navigation和部分渲染使得向前导航行为保持一致。但在后退和前进导航时，通常会有不同的期望：当使用浏览器前进/后退按钮或`router.back()` / `router.forward()`时，会保持之前的滚动位置和视口状态。

您可以使用`router.refresh()`来清除路由缓存并重新请求最新数据，这将刷新整个路由。查看[API参考](/nextjs/app-router/api-reference/functions/use-router)了解更多信息。

## 下一步

现在您已经了解了如何在Next.js应用程序中设置导航，您可以继续学习以下相关主题：

- [数据获取](/nextjs/app-router/building-your-application/data-fetching) - 了解如何获取、缓存和重新验证数据
- [错误处理](/nextjs/app-router/building-your-application/routing/error-handling) - 学习如何处理错误和捕获异常
- [加载状态](/nextjs/app-router/building-your-application/routing/loading-ui-and-streaming) - 了解如何创建加载界面
