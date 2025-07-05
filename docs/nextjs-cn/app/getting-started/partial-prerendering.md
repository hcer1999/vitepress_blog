---
title: 如何使用部分预渲染
nav_title: 部分预渲染
description: 了解如何通过部分预渲染结合静态和动态渲染的优势。
version: experimental
related:
  title: 下一步
  description: 了解更多关于部分预渲染的配置选项。
  links:
    - app/api-reference/config/next-config-js/ppr
---

# NextJS中文文档 - Partial Prerendering

部分预渲染（Partial Prerendering，PPR）是一种渲染策略，允许你在同一路由中结合静态和动态内容。这可以提高初始页面性能，同时仍然支持个性化的动态数据。

<Image
  alt="部分预渲染的产品页面，显示静态导航和产品信息，以及动态购物车和推荐产品"
  srcLight="/learn/light/thinking-in-ppr.png"
  srcDark="/learn/dark/thinking-in-ppr.png"
  width="1600"
  height="632"
/>

当用户访问一个路由时：

- 服务器发送一个包含静态内容的**外壳**，确保快速的初始加载。
- 外壳为动态内容留下**空位**，这些内容将异步加载。
- 动态空位是**并行流式传输**的，减少了页面的整体加载时间。

> **🎥 观看：** 为什么需要 PPR 以及它是如何工作的 → [YouTube（10 分钟）](https://www.youtube.com/watch?v=MTcPrTIBkpA)。

## 部分预渲染是如何工作的？

部分预渲染使用 React 的 [Suspense](https://react.dev/reference/react/Suspense) 来延迟渲染应用程序的某些部分，直到满足某些条件。

Suspense 的回退内容会与静态内容一起嵌入到初始 HTML 中。在构建时（或重新验证期间），静态内容和回退内容会被**预渲染**以创建静态外壳。动态内容的渲染会**推迟**到用户请求该路由时。

将组件包装在 Suspense 中并不会使组件本身变成动态的，而是使用 Suspense 作为封装动态内容的边界。

```jsx
import { Suspense } from 'react'
import StaticComponent from './StaticComponent'
import DynamicComponent from './DynamicComponent'
import Fallback from './Fallback'

export const experimental_ppr = true

export default function Page() {
  return (
    <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
    </>
  )
}
```

为了避免客户端-服务器瀑布流，动态组件会与静态预渲染并行从服务器开始流式传输。这允许它们在浏览器加载客户端 JavaScript 之前开始渲染。

为了减少网络开销，PPR 在**单个 HTTP 响应**中发送静态和动态内容，避免了每个动态组件的额外往返。

## 启用部分预渲染

你可以通过在 `next.config.ts` 文件中添加 [`ppr`](https://rc.nextjs.org/nextjs-cn/app/api-reference/next-config-js/ppr) 选项来启用 PPR：

```ts highlight={5} switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}

export default nextConfig
```

```js highlight={4} switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}
```

`'incremental'` 值允许你为特定路由采用 PPR：

```tsx
export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
  // ...
}
```

```jsx
export const experimental_ppr = true

export default function Layout({ children }) {
  // ...
}
```

没有 `experimental_ppr` 的路由将默认为 `false`，并且不会使用 PPR 进行预渲染。你需要为每个路由显式选择加入 PPR。

> **注意事项**：
>
> - `experimental_ppr` 将应用于路由段的所有子项，包括嵌套布局和页面。你不需要将它添加到每个文件中，只需要添加到路由的顶层段。
> - 要为子段禁用 PPR，你可以在子段中将 `experimental_ppr` 设置为 `false`。

## 示例

### 动态 API

当使用需要查看传入请求的动态 API 时，Next.js 将为该路由选择动态渲染。要继续使用 PPR，请用 Suspense 包装组件。例如，`<User />` 组件是动态的，因为它使用了 `cookies` API：

```jsx switcher
import { cookies } from 'next/headers'

export async function User() {
  const session = (await cookies()).get('session')?.value
  return '...'
}
```

```tsx switcher
import { cookies } from 'next/headers'

export async function User() {
  const session = (await cookies()).get('session')?.value
  return '...'
}
```

`<User />` 组件将被流式传输，而 `<Page />` 中的任何其他内容都将被预渲染并成为静态外壳的一部分。

```tsx switcher
import { Suspense } from 'react'
import { User, AvatarSkeleton } from './user'

export const experimental_ppr = true

export default function Page() {
  return (
    <section>
      <h1>这部分将被预渲染</h1>
      <Suspense fallback={<AvatarSkeleton />}>
        <User />
      </Suspense>
    </section>
  )
}
```

```jsx switcher
import { Suspense } from 'react'
import { User, AvatarSkeleton } from './user'

export const experimental_ppr = true

export default function Page() {
  return (
    <section>
      <h1>这部分将被预渲染</h1>
      <Suspense fallback={<AvatarSkeleton />}>
        <User />
      </Suspense>
    </section>
  )
}
```

### 传递动态属性

组件只有在访问值时才会选择动态渲染。例如，如果你从 `<Page />` 组件中读取 `searchParams`，你可以将这个值作为 prop 转发给另一个组件：

```tsx switcher
import { Table, TableSkeleton } from './table'
import { Suspense } from 'react'

export default function Page({ searchParams }: { searchParams: Promise<{ sort: string }> }) {
  return (
    <section>
      <h1>这部分将被预渲染</h1>
      <Suspense fallback={<TableSkeleton />}>
        <Table searchParams={searchParams} />
      </Suspense>
    </section>
  )
}
```

```jsx switcher
import { Table, TableSkeleton } from './table'
import { Suspense } from 'react'

export default function Page({ searchParams }) {
  return (
    <section>
      <h1>这部分将被预渲染</h1>
      <Suspense fallback={<TableSkeleton />}>
        <Table searchParams={searchParams} />
      </Suspense>
    </section>
  )
}
```

在表格组件内部，访问 `searchParams` 中的值将使组件变为动态的，而页面的其余部分将被预渲染。

```tsx switcher
export async function Table({ searchParams }: { searchParams: Promise<{ sort: string }> }) {
  const sort = (await searchParams).sort === 'true'
  return '...'
}
```

```jsx switcher
export async function Table({ searchParams }) {
  const sort = (await searchParams).sort === 'true'
  return '...'
}
```
