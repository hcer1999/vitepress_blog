---
title: layout.js
description: layout.js 文件的 API 参考。
---

`layout` 文件用于在 Next.js 应用程序中定义布局。

```tsx filename="app/dashboard/layout.tsx" switcher
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

```jsx filename="app/dashboard/layout.js" switcher
export default function DashboardLayout({ children }) {
  return <section>{children}</section>
}
```

**根布局**是位于根 `app` 目录中的最顶层布局。它用于定义 `<html>` 和 `<body>` 标签以及其他全局共享的 UI。

```tsx filename="app/layout.tsx" switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> **须知**：
>
> - 应用程序**必须**包含一个根布局。
> - 根布局必须定义 `<html>` 和 `<body>` 标签，因为 Next.js 不会自动创建它们。
> - 根布局默认替换了 `pages` 目录中的 `_app.js` 和 `_document.js` 文件。
> - Next.js 框架和 React 框架会自动添加 `<div>` 元素到每个布局和页面中。这些元素是必需的，用于 React 管理渲染，类似于 React 的行为。
> - 布局默认是[服务器组件](/docs/app/building-your-application/rendering/server-components)，但也可以设置为[客户端组件](/docs/app/building-your-application/rendering/client-components)。
> - 父布局和它们的子布局必须使用相同的组件类型：服务器或客户端。默认情况下，它们都是服务器组件，所以会共享相同的类型。
> - 布局可以获取数据。查看[数据获取](/docs/app/building-your-application/data-fetching)部分了解更多。

## Props

### `children`（必需）

布局组件应该接受并使用 `children` prop。布局会包装一个页面或嵌套布局的内容。例如：

```tsx filename="app/dashboard/layout.tsx" switcher
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        {/* 共享导航栏 */}
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Settings</li>
        </ul>
      </nav>
      {children}
    </section>
  )
}
```

```jsx filename="app/dashboard/layout.js" switcher
export default function DashboardLayout({ children }) {
  return (
    <section>
      <nav>
        {/* 共享导航栏 */}
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Settings</li>
        </ul>
      </nav>
      {children}
    </section>
  )
}
```

### `params`（可选）

布局 `params` 对象包含从根布局到包含该布局的所有动态路由段的参数。

例如，如果文件地址是 `app/dashboard/[team]/[id]/layout.js`，且 URL 是 `/dashboard/workspace/123`，那么 `params` 对象会是 `{ team: 'workspace', id: '123' }`。

```tsx filename="app/dashboard/[team]/layout.tsx" switcher
export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { team: string }
}) {
  return (
    <section>
      {/* 显示当前团队 */}
      <p>团队: {params.team}</p>
      {children}
    </section>
  )
}
```

```jsx filename="app/dashboard/[team]/layout.js" switcher
export default function DashboardLayout({ children, params }) {
  return (
    <section>
      {/* 显示当前团队 */}
      <p>团队: {params.team}</p>
      {children}
    </section>
  )
}
```

| Example Route                     | URL            | `params`                           |
| --------------------------------- | -------------- | ---------------------------------- |
| `app/dashboard/[team]/layout.js`  | `/dashboard/1` | `Promise<{ team: '1' }>`           |
| `app/shop/[tag]/[item]/layout.js` | `/shop/1/2`    | `Promise<{ tag: '1', item: '2' }>` |
| `app/blog/[...slug]/layout.js`    | `/blog/1/2`    | `Promise<{ slug: ['1', '2'] }>`    |

- Since the `params` prop is a promise. You must use `async/await` or React's [`use`](https://react.dev/reference/react/use) function to access the values.
  - In version 14 and earlier, `params` was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.

### Root Layouts

The `app` directory **must** include a root `app/layout.js`.

```tsx filename="app/layout.tsx" switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- The root layout **must** define `<html>` and `<body>` tags.
  - You should **not** manually add `<head>` tags such as `<title>` and `<meta>` to root layouts. Instead, you should use the [Metadata API](/docs/app/getting-started/metadata-and-og-images) which automatically handles advanced requirements such as streaming and de-duplicating `<head>` elements.
- You can use [route groups](/docs/app/building-your-application/routing/route-groups) to create multiple root layouts.
  - Navigating **across multiple root layouts** will cause a **full page load** (as opposed to a client-side navigation). For example, navigating from `/cart` that uses `app/(shop)/layout.js` to `/blog` that uses `app/(marketing)/layout.js` will cause a full page load. This **only** applies to multiple root layouts.

## Caveats

### How can I access the request object in a layout?

You intentionally cannot access the raw request object in a layout. However, you can access [`headers`](/docs/app/api-reference/functions/headers) and [`cookies`](/docs/app/api-reference/functions/cookies) through server-only functions.

[Layouts](/docs/app/building-your-application/routing/layouts-and-templates#layouts) do not rerender. They can be cached and reused to avoid unnecessary computation when navigating between pages. By restricting layouts from accessing the raw request, Next.js can prevent the execution of potentially slow or expensive user code within the layout, which could negatively impact performance.

This design also enforces consistent and predictable behavior for layouts across different pages, which simplifies development and debugging.

### Layouts do not receive `searchParams`

Unlike [Pages](/docs/app/api-reference/file-conventions/page), Layout components **do not** receive the `searchParams` prop. This is because a shared layout is [not re-rendered during navigation](/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering) which could lead to stale `searchParams` between navigations.

When using client-side navigation, Next.js automatically only renders the part of the page below the common layout between two routes.

For example, in the following directory structure, `dashboard/layout.tsx` is the common layout for both `/dashboard/settings` and `/dashboard/analytics`:

<Image
  alt="File structure showing a dashboard folder nesting a layout.tsx file, and settings and analytics folders with their own pages"
  srcLight="/docs/light/shared-dashboard-layout.png"
  srcDark="/docs/dark/shared-dashboard-layout.png"
  width="1600"
  height="687"
/>

When navigating from `/dashboard/settings` to `/dashboard/analytics`, `page.tsx` in `/dashboard/analytics` will rerender on the server, while `dashboard/layout.tsx` will **not** rerender because it's a common UI shared between the two routes.

This performance optimization allows navigation between pages that share a layout to be quicker as only the data fetching and rendering for the page has to run, instead of the entire route that could include shared layouts that fetch their own data.

Because `dashboard/layout.tsx` doesn't re-render, the `searchParams` prop in the layout Server Component might become **stale** after navigation.

Instead, use the Page [`searchParams`](/docs/app/api-reference/file-conventions/page#searchparams-optional) prop or the [`useSearchParams`](/docs/app/api-reference/functions/use-search-params) hook in a Client Component within the layout, which is rerendered on the client with the latest `searchParams`.

### Layouts cannot access `pathname`

Layouts cannot access `pathname`. This is because layouts are Server Components by default, and [don't rerender during client-side navigation](/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering), which could lead to `pathname` becoming stale between navigations. To prevent staleness, Next.js would need to refetch all segments of a route, losing the benefits of caching and increasing the [RSC payload](/docs/app/building-your-application/rendering/server-components#what-is-the-react-server-component-payload-rsc) size on navigation.

Instead, you can extract the logic that depends on pathname into a Client Component and import it into your layouts. Since Client Components rerender (but are not refetched) during navigation, you can use Next.js hooks such as [`usePathname`](https://nextjs.org/docs/app/api-reference/functions/use-pathname) to access the current pathname and prevent staleness.

```tsx filename="app/dashboard/layout.tsx" switcher
import { ClientComponent } from '@/app/ui/ClientComponent'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientComponent />
      {/* Other Layout UI */}
      <main>{children}</main>
    </>
  )
}
```

```jsx filename="app/dashboard/layout.js" switcher
import { ClientComponent } from '@/app/ui/ClientComponent'

export default function Layout({ children }) {
  return (
    <>
      <ClientComponent />
      {/* Other Layout UI */}
      <main>{children}</main>
    </>
  )
}
```

Common `pathname` patterns can also be implemented with [`params`](#params-optional) prop.

See the [examples](/docs/app/building-your-application/routing/layouts-and-templates#examples) section for more information.

## Examples

### Displaying content based on `params`

Using [dynamic route segments](/docs/app/building-your-application/routing/dynamic-routes), you can display or fetch specific content based on the `params` prop.

```tsx filename="app/dashboard/layout.tsx" switcher
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ team: string }>
}) {
  const { team } = await params

  return (
    <section>
      <header>
        <h1>Welcome to {team}'s Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  )
}
```

```jsx filename="app/dashboard/layout.js" switcher
export default async function DashboardLayout({ children, params }) {
  const { team } = await params

  return (
    <section>
      <header>
        <h1>Welcome to {team}'s Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  )
}
```

### Reading `params` in Client Components

To use `params` in a Client Component (which cannot be `async`), you can use React's [`use`](https://react.dev/reference/react/use) function to read the promise:

```tsx filename="app/page.tsx" switcher
'use client'

import { use } from 'react'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
}
```

```js filename="app/page.js" switcher
'use client'

import { use } from 'react'

export default function Page({ params }) {
  const { slug } = use(params)
}
```

## Version History

| Version      | Changes                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `params` is now a promise. A [codemod](/docs/app/guides/upgrading/codemods#150) is available. |
| `v13.0.0`    | `layout` introduced.                                                                          |

## 良好实践

### 使用 Web 标准

Next.js 鼓励使用 Web 平台的标准元素和功能。

例如，在创建根布局时，Next.js 不会自动添加 `<html>` 和 `<body>` 标签。它们由你显式添加，使得在这些元素上设置如 `lang` 属性或访问第三方脚本的 `<body>` 标签更加简单。

### 流布局

布局支持使用 React 的流式传输和 [Suspense boundaries](/docs/app/building-your-application/routing/loading-ui-and-streaming)。这允许从服务器到客户端逐步流式传输布局，包括即时显示已加载部分的 UI。同时为其他部分加载 UI 的[后备内容](/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)。

例如，你可以在导航带下使用 Suspense 边界来流式传输产品页面的内容：

```tsx filename="app/products/[id]/layout.tsx" switcher
import { Suspense } from 'react'
import { ProductHeader, ProductTabs, ProductFeed } from 'components/product'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const { id } = params
  return (
    <>
      <ProductHeader id={id} />
      <ProductTabs id={id} />
      <Suspense fallback={<ProductFeed.Skeleton />}>
        <ProductFeed id={id} />
      </Suspense>
      {children}
    </>
  )
}
```

```jsx filename="app/products/[id]/layout.js" switcher
import { Suspense } from 'react'
import { ProductHeader, ProductTabs, ProductFeed } from 'components/product'

export default async function Layout({ children, params }) {
  const { id } = params
  return (
    <>
      <ProductHeader id={id} />
      <ProductTabs id={id} />
      <Suspense fallback={<ProductFeed.Skeleton />}>
        <ProductFeed id={id} />
      </Suspense>
      {children}
    </>
  )
}
```

使用 Suspense 的更多信息，请参阅[加载 UI](/docs/app/building-your-application/routing/loading-ui-and-streaming) 和 [Streaming](/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)。

## 示例

### Root Layout

下面是一个与 [Tailwind CSS](/docs/app/building-your-application/styling/tailwind-css) 一起使用的根布局示例：

```tsx filename="app/layout.tsx" switcher
import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> **须知**：
>
> - 根布局默认替换了 `_app.js` 和 `_document.js` 文件。
> - 你可以使用 [`head.js` 文件](/docs/app/api-reference/file-conventions/head) 来定义页面的头部元数据。

### 创建嵌套布局

要创建嵌套布局，请在文件夹内添加布局文件，该布局将应用于特定的路由段并在其中渲染任何子布局。

例如，如果要创建如下所示的嵌套布局：

- app
  - layout.js（根布局）
  - dashboard
    - layout.js（仪表板布局）
    - page.js

根布局（`app/layout.js`）将包装仪表板布局（`app/dashboard/layout.js`），该布局将包装 `app/dashboard/page.js`。

```tsx filename="app/layout.tsx" switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>我在每个页面上</header>
        {children}
        <footer>我在每个页面上</footer>
      </body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>我在每个页面上</header>
        {children}
        <footer>我在每个页面上</footer>
      </body>
    </html>
  )
}
```

```tsx filename="app/dashboard/layout.tsx" switcher
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        <ul>
          <li>首页</li>
          <li>关于</li>
          <li>设置</li>
        </ul>
      </nav>
      {children}
    </section>
  )
}
```

```jsx filename="app/dashboard/layout.js" switcher
export default function DashboardLayout({ children }) {
  return (
    <section>
      <nav>
        <ul>
          <li>首页</li>
          <li>关于</li>
          <li>设置</li>
        </ul>
      </nav>
      {children}
    </section>
  )
}
```

### 带元数据的布局

你可以定义页面的元数据，这些元数据会导出到布局和页面中。

```tsx filename="app/layout.tsx" switcher
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
export const metadata = {
  title: 'Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

查看[元数据 API 参考](/docs/app/api-reference/functions/generate-metadata)了解更多信息。

### 将状态保持在导航之间

布局可以包装多个页面，这种情况下布局在导航过程中是**保持状态的**，而不会重新渲染。这可以通过使用[客户端组件](/docs/app/building-your-application/rendering/client-components)和 React 的状态来实现。

```tsx filename="app/dashboard/layout.tsx" switcher
'use client'

import { useState } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const segment = useSelectedLayoutSegment()

  return (
    <section>
      <p onClick={() => setIsOpen(!isOpen)}>仪表板（当前：{segment}）</p>
      {isOpen && <div>显示更多...</div>}
      {children}
    </section>
  )
}
```

```jsx filename="app/dashboard/layout.js" switcher
'use client'

import { useState } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const segment = useSelectedLayoutSegment()

  return (
    <section>
      <p onClick={() => setIsOpen(!isOpen)}>仪表板（当前：{segment}）</p>
      {isOpen && <div>显示更多...</div>}
      {children}
    </section>
  )
}
```

> **须知**：在页面组件重新渲染时，客户端组件发送的布局不会在导航过程中重新渲染。查看[客户端组件](/docs/app/building-your-application/rendering/client-components)了解更多信息。

### 从布局中获取数据

从布局中获取数据时有多种选择，包括使用 `fetch` API 或 React 服务器组件。这些方法在[数据获取](/docs/app/building-your-application/data-fetching)部分有详细描述。

```tsx filename="app/products/layout.tsx" switcher
export default async function Layout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()

  return (
    <section>
      <aside>
        <nav>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </nav>
      </aside>
      {children}
    </section>
  )
}
```

```jsx filename="app/products/layout.js" switcher
export default async function Layout({ children }) {
  const categories = await getCategories()

  return (
    <section>
      <aside>
        <nav>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </nav>
      </aside>
      {children}
    </section>
  )
}
```

> **须知**：在上面的示例中，`getCategories()` 表示一个自定义函数，返回类别数据。

## 版本历史

| 版本      | 变更            |
| --------- | --------------- |
| `v13.0.0` | `layout` 引入。 |
