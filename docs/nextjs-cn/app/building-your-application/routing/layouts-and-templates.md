---
title: 布局和模板
description: 在 Next.js 中创建你的第一个共享布局。
---

特殊文件 [layout.js](#layouts) 和 [template.js](#templates) 允许你创建在路由之间共享的 UI。本页将指导你如何以及何时使用这些特殊文件。

## 布局

布局是在多个路由之间**共享**的 UI。在导航过程中，布局会保持状态，保持交互性，不会重新渲染。布局也可以[嵌套](#nesting-layouts)。

你可以通过从 `layout.js` 文件中默认导出一个 React 组件来定义布局。该组件应接受一个 `children` 属性，在渲染过程中，该属性将填充子布局（如果存在）或页面。

例如，布局将与 `/dashboard` 和 `/dashboard/settings` 页面共享：

<Image
  alt="layout.js 特殊文件"
  srcLight="/docs/light/layout-special-file.png"
  srcDark="/docs/dark/layout-special-file.png"
  width="1600"
  height="606"
/>

```tsx switcher
export default function DashboardLayout({
  children, // 将是页面或嵌套布局
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* 在此处包含共享 UI，例如标题或侧边栏 */}
      <nav></nav>

      {children}
    </section>
  )
}
```

```jsx switcher
export default function DashboardLayout({
  children, // 将是页面或嵌套布局
}) {
  return (
    <section>
      {/* 在此处包含共享 UI，例如标题或侧边栏 */}
      <nav></nav>

      {children}
    </section>
  )
}
```

### 根布局（必需）

根布局定义在 `app` 目录的顶层，适用于所有路由。这个布局是**必需的**，必须包含 `html` 和 `body` 标签，允许你修改从服务器返回的初始 HTML。

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 布局 UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

```jsx switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 布局 UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

### 嵌套布局

默认情况下，文件夹层次结构中的布局是**嵌套的**，这意味着它们通过 `children` 属性包裹子布局。你可以通过在特定路由段（文件夹）内添加 `layout.js` 来嵌套布局。

例如，要为 `/dashboard` 路由创建布局，请在 `dashboard` 文件夹中添加一个新的 `layout.js` 文件：

<Image
  alt="嵌套布局"
  srcLight="/docs/light/nested-layout.png"
  srcDark="/docs/dark/nested-layout.png"
  width="1600"
  height="606"
/>

```tsx switcher
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

```jsx switcher
export default function DashboardLayout({ children }) {
  return <section>{children}</section>
}
```

如果你将上面的两个布局组合起来，根布局（`app/layout.js`）将包裹仪表板布局（`app/dashboard/layout.js`），后者将包裹 `app/dashboard/*` 内的路由段。

两个布局将如下嵌套：

<Image
  alt="嵌套布局"
  srcLight="/docs/light/nested-layouts-ui.png"
  srcDark="/docs/dark/nested-layouts-ui.png"
  width="1600"
  height="1026"
/>

> **提示**:
>
> - 布局可以使用 `.js`、`.jsx` 或 `.tsx` 文件扩展名。
> - 只有根布局可以包含 `<html>` 和 `<body>` 标签。
> - 当在同一个文件夹中定义了 `layout.js` 和 `page.js` 文件时，布局将包裹页面。
> - 布局默认是[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)，但可以设置为[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)。
> - 布局可以获取数据。有关更多信息，请查看[数据获取](/docs/nextjs-cn/app/building-your-application/data-fetching)部分。
> - 父布局和其子布局之间无法传递数据。但是，你可以在一个路由中多次获取相同的数据，React 将[自动删除重复请求](/docs/nextjs-cn/app/deep-dive/caching#request-memoization)，不会影响性能。
> - 布局无法访问 `pathname` ([了解更多](/docs/nextjs-cn/app/api-reference/file-conventions/layout))。但是，导入的客户端组件可以使用 [`usePathname`](/docs/nextjs-cn/app/api-reference/functions/use-pathname) 钩子访问路径名。
> - 布局无法访问其下面的路由段。要访问所有路由段，你可以在客户端组件中使用 [`useSelectedLayoutSegment`](/docs/nextjs-cn/app/api-reference/functions/use-selected-layout-segment) 或 [`useSelectedLayoutSegments`](/docs/nextjs-cn/app/api-reference/functions/use-selected-layout-segments)。
> - 你可以使用[路由组](/docs/nextjs-cn/app/building-your-application/routing/index/route-groups)将特定路由段选择性地包含或排除在共享布局之外。
> - 你可以使用[路由组](/docs/nextjs-cn/app/building-your-application/routing/index/route-groups)创建多个根布局。[点此查看示例](/docs/nextjs-cn/app/getting-started/project-structure#creating-multiple-root-layouts)。
> - **从 `pages` 目录迁移：** 根布局替代了 [`_app.js`](/docs/nextjs-cn/pages/building-your-application/routing/custom-app) 和 [`_document.js`](/docs/nextjs-cn/pages/building-your-application/routing/custom-document) 文件。[查看迁移指南](/docs/nextjs-cn/app/guides/migrating/app-router-migration#migrating-_documentjs-and-_appjs)。

## 模板

模板与布局类似，都可以包裹子布局或页面。与布局在路由之间持久存在并保持状态不同，模板在导航时为每个子项创建一个新实例。这意味着当用户在共享模板的路由之间导航时，会挂载一个新的子实例，重新创建 DOM 元素，客户端组件中的状态**不会**保留，并且会重新同步 effects。

在某些情况下，你可能需要这些特定行为，此时模板可能比布局更适合。例如：

- 在导航时重新同步 `useEffect`。
- 在导航时重置子客户端组件的状态。

可以通过从 `template.js` 文件导出默认 React 组件来定义模板。该组件应接受 `children` 属性。

<Image
  alt="template.js 特殊文件"
  srcLight="/docs/light/template-special-file.png"
  srcDark="/docs/dark/template-special-file.png"
  width="1600"
  height="444"
/>

```tsx switcher
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

```jsx switcher
export default function Template({ children }) {
  return <div>{children}</div>
}
```

在嵌套方面，`template.js` 在布局和其子项之间渲染。以下是简化的输出：

```jsx
<Layout>
  {/* 注意模板有一个唯一的 key */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

## 示例

### 元数据

你可以使用[元数据 API](/docs/nextjs-cn/app/getting-started/metadata-and-og-images)修改 `<head>` HTML 元素，如 `title` 和 `meta`。

可以通过在 [`layout.js`](/docs/nextjs-cn/app/api-reference/file-conventions/layout) 或 [`page.js`](/docs/nextjs-cn/app/api-reference/file-conventions/page) 文件中导出 [`metadata` 对象](/docs/nextjs-cn/app/api-reference/functions/generate-metadata#the-metadata-object)或 [`generateMetadata` 函数](/docs/nextjs-cn/app/api-reference/functions/generate-metadata#generatemetadata-function)来定义元数据。

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}

export default function Page() {
  return '...'
}
```

```jsx switcher
export const metadata = {
  title: 'Next.js',
}

export default function Page() {
  return '...'
}
```

> **提示**：你**不应该**手动在根布局中添加 `<head>` 标签，如 `<title>` 和 `<meta>`。相反，应使用[元数据 API](/docs/nextjs-cn/app/api-reference/functions/generate-metadata)，它会自动处理高级需求，如流式传输和去重 `<head>` 元素。

了解更多关于可用元数据选项，请参阅 [API 参考](/docs/nextjs-cn/app/api-reference/functions/generate-metadata)。

### 活动导航链接

你可以使用 [usePathname()](/docs/nextjs-cn/app/api-reference/functions/use-pathname) 钩子来确定导航链接是否处于活动状态。

由于 `usePathname()` 是一个客户端钩子，你需要将导航链接提取到客户端组件中，然后可以将其导入布局或模板：

```tsx switcher
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        首页
      </Link>

      <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">
        关于
      </Link>
    </nav>
  )
}
```

```jsx switcher
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Links() {
  const pathname = usePathname()

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        首页
      </Link>

      <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">
        关于
      </Link>
    </nav>
  )
}
```

```tsx switcher
import { NavLinks } from '@/app/ui/nav-links'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavLinks />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

```jsx switcher
import { NavLinks } from '@/app/ui/nav-links'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavLinks />
        <main>{children}</main>
      </body>
    </html>
  )
}
```
