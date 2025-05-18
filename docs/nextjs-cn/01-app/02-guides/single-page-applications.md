---
title: 如何使用 Next.js 构建单页应用程序
nav_title: 单页应用
description: Next.js 完全支持构建单页应用程序（SPAs）。
---

Next.js 完全支持构建单页应用程序（SPAs）。

这包括快速路由转换与预取、客户端数据获取、使用浏览器 API、集成第三方客户端库、创建静态路由等功能。

如果你有现有的 SPA，你可以迁移到 Next.js 而无需对代码进行大量更改。Next.js 允许你根据需要逐步添加服务器功能。

## 什么是单页应用程序？

SPA 的定义各不相同。我们将"严格 SPA"定义为：

- **客户端渲染（CSR）**：应用程序由一个 HTML 文件（例如 `index.html`）提供服务。每个路由、页面转换和数据获取都由浏览器中的 JavaScript 处理。
- **没有完整页面重新加载**：不是为每个路由请求新文档，而是由客户端 JavaScript 操作当前页面的 DOM 并根据需要获取数据。

严格的 SPA 通常需要加载大量 JavaScript 才能让页面变得可交互。此外，客户端数据瀑布流可能难以管理。使用 Next.js 构建 SPA 可以解决这些问题。

## 为什么使用 Next.js 构建 SPA？

Next.js 可以自动拆分你的 JavaScript 代码包，并为不同路由生成多个 HTML 入口点。这避免了在客户端加载不必要的 JavaScript 代码，减小了包的大小并实现了更快的页面加载。

[`next/link`](/docs/app/api-reference/components/link) 组件自动[预取](/docs/app/api-reference/components/link#prefetch)路由，提供了严格 SPA 的快速页面转换，同时具有将应用程序路由状态保存到 URL 中以便链接和共享的优势。

Next.js 可以从静态站点甚至是严格的 SPA（其中所有内容都在客户端渲染）开始。如果你的项目增长，Next.js 允许你根据需要逐步添加更多服务器功能（例如 [React 服务器组件](/docs/app/building-your-application/rendering/server-components)、[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)等）。

## 示例

让我们探索构建 SPA 的常见模式以及 Next.js 如何解决它们。

### 在上下文提供者中使用 React 的 `use`

我们建议在父组件（或布局）中获取数据，返回 Promise，然后使用 React 的 [`use` 钩子](https://react.dev/reference/react/use)在客户端组件中解包该值。

Next.js 可以在服务器上提前开始数据获取。在这个例子中，是根布局 — 应用程序的入口点。服务器可以立即开始向客户端流式传输响应。

通过将数据获取"提升"到根布局，Next.js 会在应用程序中的任何其他组件之前在服务器上尽早启动指定的请求。这消除了客户端瀑布流，并防止了客户端和服务器之间的多次往返。这还可以显著提高性能，因为你的服务器与数据库所在位置更接近（理想情况下是同一位置）。

例如，更新你的根布局来调用 Promise，但**不要**等待它。

```tsx filename="app/layout.tsx" switcher
import { UserProvider } from './user-provider'
import { getUser } from './user' // 一些服务器端函数

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let userPromise = getUser() // 不要使用 await

  return (
    <html lang="en">
      <body>
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
import { UserProvider } from './user-provider'
import { getUser } from './user' // 一些服务器端函数

export default function RootLayout({ children }) {
  let userPromise = getUser() // 不要使用 await

  return (
    <html lang="en">
      <body>
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  )
}
```

虽然你可以[延迟并将单个 Promise 作为 prop 传递](/docs/app/getting-started/fetching-data#with-the-use-hook)给客户端组件，但我们通常看到这种模式与 React 上下文提供者一起使用。这通过自定义 React Hook 实现从客户端组件更方便的访问。

你可以将 Promise 转发给 React 上下文提供者：

```ts filename="app/user-provider.ts" switcher
'use client';

import { createContext, useContext, ReactNode } from 'react';

type User = any;
type UserContextType = {
  userPromise: Promise<User | null>;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  let context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser 必须在 UserProvider 内部使用');
  }
  return context;
}

export function UserProvider({
  children,
  userPromise
}: {
  children: ReactNode;
  userPromise: Promise<User | null>;
}) {
  return (
    <UserContext.Provider value={{ userPromise }}>
      {children}
    </UserContext.Provider>
  );
}
```

```js filename="app/user-provider.js" switcher
'use client'

import { createContext, useContext, ReactNode } from 'react'

const UserContext = createContext(null)

export function useUser() {
  let context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser 必须在 UserProvider 内部使用')
  }
  return context
}

export function UserProvider({ children, userPromise }) {
  return <UserContext.Provider value={{ userPromise }}>{children}</UserContext.Provider>
}
```

最后，你可以在任何客户端组件中调用 `useUser()` 自定义钩子并解包 Promise：

```tsx filename="app/profile.tsx" switcher
'use client'

import { use } from 'react'
import { useUser } from './user-provider'

export function Profile() {
  const { userPromise } = useUser()
  const user = use(userPromise)

  return '...'
}
```

```jsx filename="app/profile.js" switcher
'use client'

import { use } from 'react'
import { useUser } from './user-provider'

export function Profile() {
  const { userPromise } = useUser()
  const user = use(userPromise)

  return '...'
}
```

消费 Promise 的组件（例如上面的 `Profile`）将被挂起。这启用了部分水合。在 JavaScript 完成加载之前，你可以看到流式传输和预渲染的 HTML。

### 使用 SWR 构建 SPA

[SWR](https://swr.vercel.app) 是一个流行的用于数据获取的 React 库。

使用 SWR 2.3.0（和 React 19+），你可以在现有基于 SWR 的客户端数据获取代码旁边逐步采用服务器功能。这是上述 `use()` 模式的抽象。这意味着你可以在客户端和服务器端之间移动数据获取，或者同时使用两者：

- **仅客户端：** `useSWR(key, fetcher)`
- **仅服务器：** `useSWR(key)` + RSC 提供的数据
- **混合：** `useSWR(key, fetcher)` + RSC 提供的数据

例如，用 `<SWRConfig>` 和 `fallback` 包装你的应用程序：

```tsx filename="app/layout.tsx" switcher
import { SWRConfig } from 'swr'
import { getUser } from './user' // 一些服务器端函数

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fallback: {
          // 我们在这里不使用 await getUser()
          // 只有读取此数据的组件会挂起
          '/api/user': getUser(),
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
```

```js filename="app/layout.js" switcher
import { SWRConfig } from 'swr'
import { getUser } from './user' // 一些服务器端函数

export default function RootLayout({ children }) {
  return (
    <SWRConfig
      value={{
        fallback: {
          // 我们在这里不使用 await getUser()
          // 只有读取此数据的组件会挂起
          '/api/user': getUser(),
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
```

因为这是一个服务器组件，`getUser()` 可以安全地读取 cookies、headers 或与你的数据库通信。不需要单独的 API 路由。`<SWRConfig>` 下的客户端组件可以使用相同的键调用 `useSWR()` 来检索用户数据。带有 `useSWR` 的组件代码**不需要任何更改**，它与你现有的客户端获取解决方案相同。

```tsx filename="app/profile.tsx" switcher
'use client'

import useSWR from 'swr'

export function Profile() {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  // 你已知的相同 SWR 模式
  const { data, error } = useSWR('/api/user', fetcher)

  return '...'
}
```

```jsx filename="app/profile.js" switcher
'use client'

import useSWR from 'swr'

export function Profile() {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  // 你已知的相同 SWR 模式
  const { data, error } = useSWR('/api/user', fetcher)

  return '...'
}
```

`fallback` 数据可以预渲染并包含在初始 HTML 响应中，然后在子组件中使用 `useSWR` 立即读取。SWR 的轮询、重新验证和缓存仍然**仅在客户端运行**，因此它保留了 SPA 所依赖的所有交互性。

由于初始 `fallback` 数据由 Next.js 自动处理，你现在可以删除以前需要检查 `data` 是否为 `undefined` 的任何条件逻辑。当数据正在加载时，最近的 `<Suspense>` 边界将被挂起。

|                    | SWR                 | RSC                 | RSC + SWR           |
| ------------------ | ------------------- | ------------------- | ------------------- |
| SSR 数据           | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> |
| SSR 期间的流式传输 | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> |
| 请求去重           | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| 客户端功能         | <Check size={18} /> | <Cross size={18} /> | <Check size={18} /> |

### 使用 React Query 构建 SPA

你可以在客户端和服务器上都使用带有 Next.js 的 React Query。这使你能够构建严格的 SPA，并利用 Next.js 中的服务器功能与 React Query 配合使用。

在 [React Query 文档](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)中了解更多。

### 仅在浏览器中渲染组件

客户端组件在 `next build` 期间[预渲染](https://github.com/reactwg/server-components/discussions/4)。如果你想为客户端组件禁用预渲染，并仅在浏览器环境中加载它，你可以使用 [`next/dynamic`](/docs/app/guides/lazy-loading#nextdynamic)：

```jsx
import dynamic from 'next/dynamic'

const ClientOnlyComponent = dynamic(() => import('./component'), {
  ssr: false,
})
```

这对依赖浏览器 API（如 `window` 或 `document`）的第三方库很有用。你还可以添加一个 `useEffect`，检查这些 API 是否存在，如果不存在，则返回 `null` 或加载状态，这将被预渲染。

### 客户端浅层路由

如果你正在从严格的 SPA（如 [Create React App](/docs/app/guides/migrating/from-create-react-app) 或 [Vite](/docs/app/guides/migrating/from-vite)）迁移，你可能有现有代码使用浅层路由来更新 URL 状态。这对于应用程序中的视图之间的手动转换很有用，而*不*使用默认的 Next.js 文件系统路由。

Next.js 允许你使用原生 [`window.history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) 和 [`window.history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) 方法来更新浏览器的历史堆栈，而不重新加载页面。

`pushState` 和 `replaceState` 调用与 Next.js 路由器集成，允许你与 [`usePathname`](/docs/app/api-reference/functions/use-pathname) 和 [`useSearchParams`](/docs/app/api-reference/functions/use-search-params) 同步。

```tsx fileName="app/ui/sort-products.tsx" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SortProducts() {
  const searchParams = useSearchParams()

  function updateSorting(sortOrder: string) {
    const urlSearchParams = new URLSearchParams(searchParams.toString())
    urlSearchParams.set('sort', sortOrder)
    window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>升序排序</button>
      <button onClick={() => updateSorting('desc')}>降序排序</button>
    </>
  )
}
```

```jsx fileName="app/ui/sort-products.js" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SortProducts() {
  const searchParams = useSearchParams()

  function updateSorting(sortOrder) {
    const urlSearchParams = new URLSearchParams(searchParams.toString())
    urlSearchParams.set('sort', sortOrder)
    window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>升序排序</button>
      <button onClick={() => updateSorting('desc')}>降序排序</button>
    </>
  )
}
```

了解更多关于 Next.js 中[路由和导航](/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)的工作原理。

### 在客户端组件中使用服务器操作

你可以在仍使用客户端组件的同时逐步采用服务器操作。这允许你删除调用 API 路由的样板代码，而是使用 React 功能如 `useActionState` 来处理加载和错误状态。

例如，创建你的第一个服务器操作：

```tsx filename="app/actions.ts" switcher
'use server'

export async function create() {}
```

```js filename="app/actions.js" switcher
'use server'

export async function create() {}
```

你可以从客户端导入并使用服务器操作，类似于调用 JavaScript 函数。你不需要手动创建 API 端点：

```tsx filename="app/button.tsx" switcher
'use client'

import { create } from './actions'

export function Button() {
  return <button onClick={() => create()}>创建</button>
}
```

```jsx filename="app/button.js" switcher
'use client'

import { create } from './actions'

export function Button() {
  return <button onClick={() => create()}>创建</button>
}
```

了解更多关于[使用服务器操作进行数据修改](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)。

## 静态导出（可选）

Next.js 也支持生成[完全静态站点](/docs/app/guides/static-exports)。这比严格的 SPA 有一些优势：

- **自动代码拆分**：Next.js 不会为所有路由提供单一的 `index.html`，而是为每个路由生成一个 HTML 文件，因此访问者无需等待客户端 JavaScript 包即可更快地获取内容。
- **改善用户体验**：不是为所有路由提供最小的骨架，而是为每个路由提供完全渲染的页面。当用户在客户端导航时，转换仍然是即时的，类似 SPA。

要启用静态导出，请更新你的配置：

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
}

export default nextConfig
```

运行 `next build` 后，Next.js 将创建一个包含应用程序 HTML/CSS/JS 资源的 `out` 文件夹。

> **注意：** Next.js 服务器功能不支持静态导出。[了解更多](/docs/app/guides/static-exports#unsupported-features)。

## 将现有项目迁移到 Next.js

你可以通过遵循我们的指南逐步迁移到 Next.js：

- [从 Create React App 迁移](/docs/app/guides/migrating/from-create-react-app)
- [从 Vite 迁移](/docs/app/guides/migrating/from-vite)

如果你已经在使用带有 Pages Router 的 SPA，你可以了解如何[逐步采用 App Router](/docs/app/guides/migrating/app-router-migration)。
