---
title: 如何从页面路由器迁移到应用路由器
nav_title: 应用路由器
description: 了解如何将现有的 Next.js 应用程序从页面路由器升级到应用路由器。
---

本指南将帮助你：

- [将你的 Next.js 应用程序从第 12 版更新到第 13 版](#nextjs-version)
- [升级在 `pages` 和 `app` 目录中都能工作的功能](#upgrading-new-features)
- [从 `pages` 逐步迁移你的现有应用程序到 `app`](#migrating-from-pages-to-app)

## 升级

### Node.js 版本

现在最低 Node.js 版本是 **v18.17**。查看 [Node.js 文档](https://nodejs.org/docs/latest-v18.x/api/) 了解更多信息。

### Next.js 版本

要更新到 Next.js 第 13 版，请使用你喜欢的包管理器运行以下命令：

```bash
npm install next@latest react@latest react-dom@latest
```

### ESLint 版本

如果你正在使用 ESLint，你需要升级你的 ESLint 版本：

```bash
npm install -D eslint-config-next@latest
```

> **提示**：你可能需要重启 VS Code 中的 ESLint 服务器，以使 ESLint 更改生效。打开命令面板（Mac 上为 `cmd+shift+p`；Windows 上为 `ctrl+shift+p`）并搜索 `ESLint: Restart ESLint Server`。

## 下一步

更新后，请参阅以下部分了解后续步骤：

- [升级新功能](#upgrading-new-features)：帮助你升级到新功能（如改进的图像和链接组件）的指南。
- [从 `pages` 迁移到 `app` 目录](#migrating-from-pages-to-app)：帮助你逐步从 `pages` 迁移到 `app` 目录的分步指南。

## 升级新功能

Next.js 13 引入了新的[应用路由器](/docs/nextjs-cn/app/building-your-application/routing/index)，具有新的功能和约定。新的路由器在 `app` 目录中可用，并与 `pages` 目录共存。

升级到 Next.js 13 **不**需要使用应用路由器。你可以继续使用 `pages`，同时使用在两个目录中都能工作的新功能，如更新的[图像组件](#image-component)、[链接组件](#link-component)、[脚本组件](#script-component)和[字体优化](#font-optimization)。

### `<Image/>` 组件

Next.js 12 引入了图像组件的新改进，使用临时导入：`next/future/image`。这些改进包括更少的客户端 JavaScript、更容易扩展和样式化图像、更好的可访问性以及原生浏览器懒加载。

在第 13 版中，这种新行为现在是 `next/image` 的默认行为。

有两个代码修改工具可以帮助你迁移到新的图像组件：

- [**`next-image-to-legacy-image` 代码修改工具**](/docs/nextjs-cn/app/guides/upgrading/codemods#next-image-to-legacy-image)：安全且自动地将 `next/image` 导入重命名为 `next/legacy/image`。现有组件将保持相同的行为。
- [**`next-image-experimental` 代码修改工具**](/docs/nextjs-cn/app/guides/upgrading/codemods#next-image-experimental)：危险地添加内联样式并移除未使用的属性。这将改变现有组件的行为以匹配新的默认设置。要使用此代码修改工具，你需要先运行 `next-image-to-legacy-image` 代码修改工具。

### `<Link>` 组件

[`<Link>` 组件](/docs/nextjs-cn/app/building-your-application/routing/index/linking-and-navigating#link-component)不再需要手动添加 `<a>` 标签作为子元素。此行为在[版本 12.2](https://nextjs.org/blog/next-2) 中作为实验选项添加，现在是默认行为。在 Next.js 13 中，`<Link>` 始终渲染 `<a>` 并允许你将属性转发到底层标签。

例如：

```jsx
import Link from 'next/link'

// Next.js 12: 必须嵌套 `<a>` 否则会被排除
<Link href="/about">
  <a>关于</a>
</Link>

// Next.js 13: `<Link>` 在底层始终渲染 `<a>`
<Link href="/about">
  关于
</Link>
```

要将链接升级到 Next.js 13，你可以使用 [`new-link` 代码修改工具](/docs/nextjs-cn/app/guides/upgrading/codemods#new-link)。

### `<Script>` 组件

[`next/script`](/docs/nextjs-cn/app/api-reference/components/script) 的行为已更新，以支持 `pages` 和 `app`，但需要进行一些更改以确保平稳迁移：

- 将之前包含在 `_document.js` 中的任何 `beforeInteractive` 脚本移动到根布局文件（`app/layout.tsx`）。
- 实验性的 `worker` 策略在 `app` 中尚不起作用，使用此策略标记的脚本将必须删除或修改为使用不同的策略（例如 `lazyOnload`）。
- `onLoad`、`onReady` 和 `onError` 处理程序在服务器组件中不起作用，因此确保将它们移到[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)中或完全删除它们。

### 字体优化

以前，Next.js 通过[内联字体 CSS](/docs/nextjs-cn/app/api-reference/components/font) 帮助优化字体。第 13 版引入了新的 [`next/font`](/docs/nextjs-cn/app/api-reference/components/font) 模块，它使你能够自定义字体加载体验，同时仍然确保出色的性能和隐私。`next/font` 在 `pages` 和 `app` 目录中都受支持。

虽然[内联 CSS](/docs/nextjs-cn/app/api-reference/components/font) 在 `pages` 中仍然有效，但在 `app` 中不起作用。你应该改用 [`next/font`](/docs/nextjs-cn/app/api-reference/components/font)。

查看[字体优化](/docs/nextjs-cn/app/api-reference/components/font)页面了解如何使用 `next/font`。

## 从 `pages` 迁移到 `app`

> **🎥 观看：** 了解如何逐步采用应用路由器 → [YouTube（16 分钟）](https://www.youtube.com/watch?v=YQMSietiFm0)。

迁移到应用路由器可能是第一次使用 Next.js 构建的 React 功能，例如服务器组件、Suspense 等。当这些与 Next.js 的新功能（如[特殊文件](/docs/nextjs-cn/app/api-reference/file-conventions)和[布局](/docs/nextjs-cn/app/api-reference/file-conventions/layout)）结合使用时，迁移意味着需要学习新概念、心智模型和行为变化。

我们建议通过将迁移分解为更小的步骤来减少这些更新的复杂性。`app` 目录被有意设计成与 `pages` 目录同时工作，以允许逐页增量迁移。

- `app` 目录支持嵌套路由 _和_ 布局。[了解更多](/docs/nextjs-cn/app/building-your-application/routing/index)。
- 使用嵌套文件夹定义路由，并使用特殊的 `page.js` 文件使路由段可公开访问。[了解更多](#step-migrating-pages)。
- [特殊文件约定](/docs/nextjs-cn/app/api-reference/file-conventions)用于为每个路由段创建 UI。最常见的特殊文件是 `page.js` 和 `layout.js`。
  - 使用 `page.js` 定义特定于路由的 UI。
  - 使用 `layout.js` 定义在多个路由之间共享的 UI。
  - 特殊文件可以使用 `.js`、`.jsx` 或 `.tsx` 文件扩展名。
- 你可以在 `app` 目录中放置其他文件，如组件、样式、测试等。[了解更多](/docs/nextjs-cn/app/building-your-application/routing/index)。
- 数据获取函数，如 `getServerSideProps` 和 `getStaticProps`，已被 `app` 中的[新 API](/docs/nextjs-cn/app/building-your-application/data-fetching) 取代。`getStaticPaths` 已被 [`generateStaticParams`](/docs/nextjs-cn/app/api-reference/functions/generate-static-params) 取代。
- `pages/_app.js` 和 `pages/_document.js` 已被单个 `app/layout.js` 根布局取代。[了解更多](/docs/nextjs-cn/app/building-your-application/routing/index/layouts-and-templates#root-layout-required)。
- `pages/_error.js` 已被更细粒度的 `error.js` 特殊文件取代。[了解更多](/docs/nextjs-cn/app/building-your-application/routing/index/error-handling)。
- `pages/404.js` 已被 [`not-found.js`](/docs/nextjs-cn/app/api-reference/file-conventions/not-found) 文件取代。
- `pages/api/*` API 路由已被 [`route.js`](/docs/nextjs-cn/app/api-reference/file-conventions/route)（路由处理程序）特殊文件取代。

### 步骤 1：创建 `app` 目录

更新到最新的 Next.js 版本（需要 13.4 或更高版本）：

```bash
npm install next@latest
```

然后，在项目根目录（或 `src/` 目录）创建一个新的 `app` 目录。

### 步骤 2：创建根布局

在 `app` 目录中创建一个新的 `app/layout.tsx` 文件。这是一个[根布局](/docs/nextjs-cn/app/building-your-application/routing/index/layouts-and-templates#root-layout-required)，将应用于 `app` 内的所有路由。

```tsx switcher
export default function RootLayout({
  // 布局必须接受一个 children 属性。
  // 这将被嵌套的布局或页面填充
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
export default function RootLayout({
  // 布局必须接受一个 children 属性。
  // 这将被嵌套的布局或页面填充
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- `app` 目录**必须**包含一个根布局。
- 根布局必须定义 `<html>` 和 `<body>` 标签，因为 Next.js 不会自动创建它们
- 根布局替代了 `pages/_app.tsx` 和 `pages/_document.tsx` 文件。
- 布局文件可以使用 `.js`、`.jsx` 或 `.tsx` 扩展名。

要管理 `<head>` HTML 元素，你可以使用[内置的 SEO 支持](/docs/nextjs-cn/app/getting-started/metadata-and-og-images)：

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '首页',
  description: '欢迎来到 Next.js',
}
```

```jsx switcher
export const metadata = {
  title: '首页',
  description: '欢迎来到 Next.js',
}
```

#### 迁移 `_document.js` 和 `_app.js`

如果你有现有的 `_app` 或 `_document` 文件，你可以将内容（例如全局样式）复制到根布局（`app/layout.tsx`）中。`app/layout.tsx` 中的样式将*不会*应用于 `pages/*`。在迁移过程中，你应该保留 `_app`/`_document`，以防止 `pages/*` 路由中断。一旦完全迁移，你才可以安全地删除它们。

如果你正在使用任何 React Context 提供程序，它们将需要移动到[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)中。

#### 迁移 `getLayout()` 模式到布局（可选）

Next.js 建议在[页面组件中添加属性](/docs/nextjs-cn/pages/building-your-application/routing/pages-and-layouts#layout-pattern#per-page-layouts)以实现 `pages` 目录中的每页布局。这种模式可以用 `app` 目录中原生支持的[嵌套布局](/docs/nextjs-cn/app/building-your-application/routing/index/layouts-and-templates#layouts)替代。

<details>
  <summary>查看前后示例</summary>

**之前**

```jsx
export default function DashboardLayout({ children }) {
  return (
    <div>
      <h2>我的仪表板</h2>
      {children}
    </div>
  )
}
```

```jsx
import DashboardLayout from '../components/DashboardLayout'

export default function Page() {
  return <p>我的页面</p>
}

Page.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
```

**之后**

- 从 `pages/dashboard/index.js` 中移除 `Page.getLayout` 属性，并按照[迁移页面的步骤](#step-migrating-pages)迁移到 `app` 目录。

  ```jsx
  export default function Page() {
    return <p>我的页面</p>
  }
  ```

- 将 `DashboardLayout` 的内容移动到一个新的[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)中，以保留 `pages` 目录的行为。

  ```jsx
  'use client' // 这个指令应该在文件顶部，在任何导入之前。

  // 这是一个客户端组件
  export default function DashboardLayout({ children }) {
    return (
      <div>
        <h2>我的仪表板</h2>
        {children}
      </div>
    )
  }
  ```

- 将 `DashboardLayout` 导入到 `app` 目录中的一个新 `layout.js` 文件中。

  ```jsx
  import DashboardLayout from './DashboardLayout'

  // 这是一个服务器组件
  export default function Layout({ children }) {
    return <DashboardLayout>{children}</DashboardLayout>
  }
  ```

- 你可以逐步将 `DashboardLayout.js`（客户端组件）中的非交互部分移动到 `layout.js`（服务器组件）中，以减少发送到客户端的组件 JavaScript 数量。

</details>

### 步骤 3：迁移 `next/head`

在 `pages` 目录中，`next/head` React 组件用于管理 `<head>` HTML 元素，如 `title` 和 `meta`。在 `app` 目录中，`next/head` 被新的[内置 SEO 支持](/docs/nextjs-cn/app/getting-started/metadata-and-og-images)所取代。

**之前：**

```tsx switcher
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>我的页面标题</title>
      </Head>
    </>
  )
}
```

```jsx switcher
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>我的页面标题</title>
      </Head>
    </>
  )
}
```

**之后：**

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的页面标题',
}

export default function Page() {
  return '...'
}
```

```jsx switcher
export const metadata = {
  title: '我的页面标题',
}

export default function Page() {
  return '...'
}
```

[查看所有元数据选项](/docs/nextjs-cn/app/api-reference/functions/generate-metadata)。

### 步骤 4：迁移页面

- `app` 目录中的页面默认是[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)。这与 `pages` 目录不同，在 `pages` 目录中，页面是[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)。
- [数据获取](/docs/nextjs-cn/app/building-your-application/data-fetching)在 `app` 中发生了变化。`getServerSideProps`、`getStaticProps` 和 `getInitialProps` 已被更简单的 API 所取代。
- `app` 目录使用嵌套文件夹定义路由，并使用特殊的 `page.js` 文件使路由段可公开访问。
- | `pages` 目录     | `app` 目录            | 路由           |
  | ---------------- | --------------------- | -------------- |
  | `index.js`       | `page.js`             | `/`            |
  | `about.js`       | `about/page.js`       | `/about`       |
  | `blog/[slug].js` | `blog/[slug]/page.js` | `/blog/post-1` |

我们建议将页面迁移分为两个主要步骤：

- 步骤 1：将默认导出的页面组件移到一个新的客户端组件中。
- 步骤 2：将新的客户端组件导入到 `app` 目录中的新 `page.js` 文件中。

> **提示**：这是最简单的迁移路径，因为它与 `pages` 目录的行为最为相似。

**步骤 1：创建一个新的客户端组件**

- 在 `app` 目录中创建一个新的单独文件（例如 `app/home-page.tsx` 或类似文件），该文件导出一个客户端组件。要定义客户端组件，请在文件顶部（在任何导入之前）添加 `'use client'` 指令。
  - 与页面路由器类似，这里有一个[优化步骤](/docs/nextjs-cn/app/building-your-application/rendering/client-components#full-page-load)，在初始页面加载时将客户端组件预渲染为静态 HTML。
- 将默认导出的页面组件从 `pages/index.js` 移动到 `app/home-page.tsx`。

```tsx switcher
'use client'

// 这是一个客户端组件（与 `pages` 目录中的组件相同）
// 它以 props 形式接收数据，可以访问状态和效果，并且
// 在初始页面加载期间在服务器上进行预渲染。
export default function HomePage({ recentPosts }) {
  return (
    <div>
      {recentPosts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

```jsx switcher
'use client'

// 这是一个客户端组件。它以 props 形式接收数据，并且
// 可以访问状态和效果，就像 `pages` 目录中的
// 页面组件一样。
export default function HomePage({ recentPosts }) {
  return (
    <div>
      {recentPosts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

**步骤 2：创建一个新页面**

- 在 `app` 目录中创建一个新的 `app/page.tsx` 文件。这默认是一个服务器组件。
- 将 `home-page.tsx` 客户端组件导入到页面中。
- 如果你之前在 `pages/index.js` 中获取数据，请使用新的[数据获取 API](/docs/nextjs-cn/app/building-your-application/data-fetching/fetching)直接将数据获取逻辑移动到服务器组件中。有关更多详细信息，请参阅[数据获取升级指南](#step-migrating-data-fetching-methods)。

  ```tsx switcher
  // 导入你的客户端组件
  import HomePage from './home-page'

  async function getPosts() {
    const res = await fetch('https://...')
    const posts = await res.json()
    return posts
  }

  export default async function Page() {
    // 直接在服务器组件中获取数据
    const recentPosts = await getPosts()
    // 将获取的数据转发给你的客户端组件
    return <HomePage recentPosts={recentPosts} />
  }
  ```

  ```jsx switcher
  // 导入你的客户端组件
  import HomePage from './home-page'

  async function getPosts() {
    const res = await fetch('https://...')
    const posts = await res.json()
    return posts
  }

  export default async function Page() {
    // 直接在服务器组件中获取数据
    const recentPosts = await getPosts()
    // 将获取的数据转发给你的客户端组件
    return <HomePage recentPosts={recentPosts} />
  }
  ```

- 如果你之前的页面使用了 `useRouter`，你需要更新到新的路由钩子。[了解更多](/docs/nextjs-cn/app/api-reference/functions/use-router)。
- 启动你的开发服务器并访问 [`http://localhost:3000`](http://localhost:3000)。你应该看到你现有的索引路由，现在通过 app 目录提供服务。

### 步骤 5：迁移路由钩子

一个新的路由器已被添加，以支持 `app` 目录中的新行为。

在 `app` 中，你应该使用从 `next/navigation` 导入的三个新钩子：[`useRouter()`](/docs/nextjs-cn/app/api-reference/functions/use-router)、[`usePathname()`](/docs/nextjs-cn/app/api-reference/functions/use-pathname) 和 [`useSearchParams()`](/docs/nextjs-cn/app/api-reference/functions/use-search-params)。

- 新的 `useRouter` 钩子从 `next/navigation` 导入，其行为与从 `next/router` 导入的 `pages` 中的 `useRouter` 钩子不同。
  - 从 `next/router` 导入的 [`useRouter` 钩子](/docs/nextjs-cn/pages/api-reference/functions/use-router)在 `app` 目录中不受支持，但可以继续在 `pages` 目录中使用。
- 新的 `useRouter` 不返回 `pathname` 字符串。请改用单独的 `usePathname` 钩子。
- 新的 `useRouter` 不返回 `query` 对象。搜索参数和动态路由参数现在是分开的。请改用 `useSearchParams` 和 `useParams` 钩子。
- 你可以一起使用 `useSearchParams` 和 `usePathname` 来监听页面变化。有关更多详细信息，请参阅[路由器事件](/docs/nextjs-cn/app/api-reference/functions/use-router#router-events)部分。
- 这些新钩子仅在客户端组件中受支持。它们不能在服务器组件中使用。

```tsx switcher
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // ...
}
```

```jsx switcher
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // ...
}
```

此外，新的 `useRouter` 钩子有以下变化：

- `isFallback` 已被移除，因为 `fallback` 已[被替代](#replacing-fallback)。
- `locale`、`locales`、`defaultLocales`、`domainLocales` 值已被移除，因为内置的 i18n Next.js 功能在 `app` 目录中不再必要。[了解更多关于 i18n](/docs/nextjs-cn/app/building-your-application/routing/index/internationalization)。
- `basePath` 已被移除。替代方案将不会是 `useRouter` 的一部分。它尚未实现。
- `asPath` 已被移除，因为 `as` 的概念已从新路由器中移除。
- `isReady` 已被移除，因为它不再必要。在[静态渲染](/docs/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)期间，任何使用 [`useSearchParams()`](/docs/nextjs-cn/app/api-reference/functions/use-search-params) 钩子的组件将跳过预渲染步骤，而是在运行时在客户端上渲染。
- `route` 已被移除。`usePathname` 或 `useSelectedLayoutSegments()` 提供了替代方案。

[查看 `useRouter()` API 参考](/docs/nextjs-cn/app/api-reference/functions/use-router)。

#### 在 `pages` 和 `app` 之间共享组件

要使组件在 `pages` 和 `app` 路由器之间兼容，请参考 [`useRouter` 钩子从 `next/compat/router`](/docs/nextjs-cn/pages/api-reference/functions/use-router#the-nextcompatrouter-export)。
这是来自 `pages` 目录的 `useRouter` 钩子，但旨在在路由器之间共享组件时使用。一旦你准备好仅在 `app` 路由器上使用它，请更新到来自 `next/navigation` 的新 [`useRouter`](/docs/nextjs-cn/app/api-reference/functions/use-router)。

### 步骤 6：迁移数据获取方法

`pages` 目录使用 `getServerSideProps` 和 `getStaticProps` 为页面获取数据。在 `app` 目录中，这些之前的数据获取函数被基于 `fetch()` 和 `async` React 服务器组件的[更简单的 API](/docs/nextjs-cn/app/building-your-application/data-fetching) 所取代。

```tsx switcher
export default async function Page() {
  // 此请求应该被缓存，直到手动失效。
  // 类似于 `getStaticProps`。
  // `force-cache` 是默认值，可以省略。
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })

  // 此请求应该在每个请求上重新获取。
  // 类似于 `getServerSideProps`。
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })

  // 此请求应该被缓存，寿命为 10 秒。
  // 类似于带有 `revalidate` 选项的 `getStaticProps`。
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })

  return <div>...</div>
}
```

```jsx switcher
export default async function Page() {
  // 此请求应该被缓存，直到手动失效。
  // 类似于 `getStaticProps`。
  // `force-cache` 是默认值，可以省略。
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })

  // 此请求应该在每个请求上重新获取。
  // 类似于 `getServerSideProps`。
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })

  // 此请求应该被缓存，寿命为 10 秒。
  // 类似于带有 `revalidate` 选项的 `getStaticProps`。
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })

  return <div>...</div>
}
```

#### 服务器端渲染 (`getServerSideProps`)

在 `pages` 目录中，`getServerSideProps` 用于在服务器上获取数据并将属性转发给文件中默认导出的 React 组件。页面的初始 HTML 从服务器预渲染，然后在浏览器中"水合"页面（使其具有交互性）。

```jsx
// `pages` 目录

export async function getServerSideProps() {
  const res = await fetch(`https://...`)
  const projects = await res.json()

  return { props: { projects } }
}

export default function Dashboard({ projects }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

在应用路由器中，我们可以使用[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)在 React 组件内部放置数据获取逻辑。这允许我们向客户端发送更少的 JavaScript，同时保持来自服务器的渲染 HTML。

通过将 `cache` 选项设置为 `no-store`，我们可以指示获取的数据[永不缓存](/docs/nextjs-cn/app/building-your-application/data-fetching/fetching)。这类似于 `pages` 目录中的 `getServerSideProps`。

```tsx switcher
// `app` 目录

// 此函数可以命名为任何名称
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()

  return projects
}

export default async function Dashboard() {
  const projects = await getProjects()

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

```jsx switcher
// `app` 目录

// 此函数可以命名为任何名称
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()

  return projects
}

export default async function Dashboard() {
  const projects = await getProjects()

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

#### 访问请求对象

在 `pages` 目录中，你可以基于 Node.js HTTP API 检索请求数据。

例如，你可以从 `getServerSideProps` 中检索 `req` 对象，并使用它来检索请求的 cookies 和 headers。

```jsx
// `pages` 目录

export async function getServerSideProps({ req, query }) {
  const authHeader = req.getHeaders()['authorization'];
  const theme = req.cookies['theme'];

  return { props: { ... }}
}

export default function Page(props) {
  return ...
}
```

`app` 目录公开了新的只读函数来检索请求数据：

- [`headers`](/docs/nextjs-cn/app/api-reference/functions/headers)：基于 Web Headers API，可以在[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)中用于检索请求头。
- [`cookies`](/docs/nextjs-cn/app/api-reference/functions/cookies)：基于 Web Cookies API，可以在[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)中用于检索 cookies。

```tsx switcher
// `app` 目录
import { cookies, headers } from 'next/headers'

async function getData() {
  const authHeader = (await headers()).get('authorization')

  return '...'
}

export default async function Page() {
  // 你可以在服务器组件中直接使用 `cookies` 或 `headers`
  // 或者在你的数据获取函数中使用
  const theme = (await cookies()).get('theme')
  const data = await getData()
  return '...'
}
```

```jsx switcher
// `app` 目录
import { cookies, headers } from 'next/headers'

async function getData() {
  const authHeader = (await headers()).get('authorization')

  return '...'
}

export default async function Page() {
  // 你可以在服务器组件中直接使用 `cookies` 或 `headers`
  // 或者在你的数据获取函数中使用
  const theme = (await cookies()).get('theme')
  const data = await getData()
  return '...'
}
```

#### 静态站点生成 (`getStaticProps`)

在 `pages` 目录中，`getStaticProps` 函数用于在构建时预渲染页面。这个函数可以用来从外部 API 或直接从数据库获取数据，并在页面生成过程中将这些数据传递给整个页面。

```jsx
// `pages` 目录

export async function getStaticProps() {
  const res = await fetch(`https://...`)
  const projects = await res.json()

  return { props: { projects } }
}

export default function Index({ projects }) {
  return projects.map((project) => <div>{project.name}</div>)
}
```

在 `app` 目录中，使用 [`fetch()`](/docs/nextjs-cn/app/api-reference/functions/fetch) 的数据获取将默认为 `cache: 'force-cache'`，这将缓存请求数据，直到手动失效。这类似于 `pages` 目录中的 `getStaticProps`。

```jsx
// `app` 目录

// 此函数可以命名为任何名称
async function getProjects() {
  const res = await fetch(`https://...`)
  const projects = await res.json()

  return projects
}

export default async function Index() {
  const projects = await getProjects()

  return projects.map((project) => <div>{project.name}</div>)
}
```

#### 动态路径 (`getStaticPaths`)

在 `pages` 目录中，`getStaticPaths` 函数用于定义在构建时应该预渲染的动态路径。

```jsx
// `pages` 目录
import PostLayout from '@/components/post-layout'

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  return { props: { post } }
}

export default function Post({ post }) {
  return <PostLayout post={post} />
}
```

在 `app` 目录中，`getStaticPaths` 被 [`generateStaticParams`](/docs/nextjs-cn/app/api-reference/functions/generate-static-params) 取代。

[`generateStaticParams`](/docs/nextjs-cn/app/api-reference/functions/generate-static-params) 的行为类似于 `getStaticPaths`，但 API 更简单，用于返回路由参数，并且可以在[布局](/docs/nextjs-cn/app/building-your-application/routing/index/layouts-and-templates)中使用。`generateStaticParams` 的返回形状是段数组，而不是嵌套的 `param` 对象数组或解析路径的字符串。

```jsx
// `app` 目录
import PostLayout from '@/components/post-layout'

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

async function getPost(params) {
  const res = await fetch(`https://.../posts/${(await params).id}`)
  const post = await res.json()

  return post
}

export default async function Post({ params }) {
  const post = await getPost(params)

  return <PostLayout post={post} />
}
```

使用名称 `generateStaticParams` 比 `getStaticPaths` 更适合 `app` 目录中的新模型。`get` 前缀被更具描述性的 `generate` 所取代，单独使用时更合适，因为 `getStaticProps` 和 `getServerSideProps` 不再需要。`Paths` 后缀被 `Params` 取代，这对于具有多个动态段的嵌套路由更为合适。

---

#### 替换 `fallback`

在 `pages` 目录中，从 `getStaticPaths` 返回的 `fallback` 属性用于定义在构建时未预渲染的页面的行为。此属性可以设置为 `true` 以在生成页面时显示回退页面，设置为 `false` 以显示 404 页面，或设置为 `blocking` 以在请求时生成页面。

```jsx
// `pages` 目录

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  ...
}

export default function Post({ post }) {
  return ...
}
```

在 `app` 目录中，[`config.dynamicParams` 属性](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamicparams) 控制如何处理 [`generateStaticParams`](/docs/nextjs-cn/app/api-reference/functions/generate-static-params) 之外的参数：

- **`true`**：（默认）不包含在 `generateStaticParams` 中的动态段会按需生成。
- **`false`**：不包含在 `generateStaticParams` 中的动态段将返回 404。

这取代了 `pages` 目录中 `getStaticPaths` 的 `fallback: true | false | 'blocking'` 选项。`fallback: 'blocking'` 选项不包含在 `dynamicParams` 中，因为使用流式处理时，`'blocking'` 和 `true` 之间的区别可以忽略不计。

```jsx
// `app` 目录

export const dynamicParams = true;

export async function generateStaticParams() {
  return [...]
}

async function getPost(params) {
  ...
}

export default async function Post({ params }) {
  const post = await getPost(params);

  return ...
}
```

将 [`dynamicParams`](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamicparams) 设置为 `true`（默认值）后，当请求尚未生成的路由段时，它将在服务器上渲染并缓存。

#### 增量静态再生 (`getStaticProps` 带有 `revalidate`)

在 `pages` 目录中，`getStaticProps` 函数允许你添加 `revalidate` 字段，以便在一定时间后自动重新生成页面。

```jsx
// `pages` 目录

export async function getStaticProps() {
  const res = await fetch(`https://.../posts`)
  const posts = await res.json()

  return {
    props: { posts },
    revalidate: 60,
  }
}

export default function Index({ posts }) {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  )
}
```

在 `app` 目录中，使用 [`fetch()`](/docs/nextjs-cn/app/api-reference/functions/fetch) 的数据获取可以使用 `revalidate`，这将缓存请求指定的秒数。

```jsx
// `app` 目录

async function getPosts() {
  const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  const data = await res.json()

  return data.posts
}

export default async function PostList() {
  const posts = await getPosts()

  return posts.map((post) => <div>{post.name}</div>)
}
```

#### API 路由

API 路由继续在 `pages/api` 目录中工作，无需任何更改。但是，它们已被 `app` 目录中的[路由处理程序](/docs/nextjs-cn/app/building-your-application/routing/index/route-handlers)所取代。

路由处理程序允许你使用 Web [Request](https://developer.mozilla.org/docs/Web/API/Request) 和 [Response](https://developer.mozilla.org/docs/Web/API/Response) API 为给定路由创建自定义请求处理程序。

```ts switcher
export async function GET(request: Request) {}
```

```js switcher
export async function GET(request) {}
```

> **提示：** 如果你以前使用 API 路由从客户端调用外部 API，现在你可以使用[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)代替安全地获取数据。了解更多关于[数据获取](/docs/nextjs-cn/app/building-your-application/data-fetching/fetching)的信息。

#### 单页应用程序

如果你同时从单页应用程序 (SPA) 迁移到 Next.js，请参阅我们的[文档](/docs/nextjs-cn/app/guides/single-page-applications)了解更多信息。

### 步骤 7：样式

在 `pages` 目录中，全局样式表仅限于 `pages/_app.js`。在 `app` 目录中，这一限制已被取消。全局样式可以添加到任何布局、页面或组件中。

- [CSS 模块](/docs/nextjs-cn/app/getting-started/css#css-modules)
- [Tailwind CSS](/docs/nextjs-cn/app/guides/tailwind-css)
- [全局样式](/docs/nextjs-cn/app/getting-started/css#global-css)
- [CSS-in-JS](/docs/nextjs-cn/app/guides/css-in-js)
- [外部样式表](/docs/nextjs-cn/app/getting-started/css#external-stylesheets)
- [Sass](/docs/nextjs-cn/app/guides/styling/sass)

#### Tailwind CSS

如果你正在使用 Tailwind CSS，你需要将 `app` 目录添加到你的 `tailwind.config.js` 文件中：

```js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // <-- 添加这一行
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

你还需要在你的 `app/layout.js` 文件中导入全局样式：

```jsx
import '../styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

了解更多关于[使用 Tailwind CSS 进行样式设置](/docs/nextjs-cn/app/guides/tailwind-css)

## 同时使用应用路由器和页面路由器

当在由不同 Next.js 路由器提供的路由之间导航时，将会有一个硬导航。`next/link` 的自动链接预取不会跨路由器预取。

相反，你可以[优化导航](https://vercel.com/guides/optimizing-hard-navigations)在应用路由器和页面路由器之间保留预取和快速页面转换。[了解更多](https://vercel.com/guides/optimizing-hard-navigations)。

## 代码修改工具

Next.js 提供代码修改工具转换，帮助在功能被弃用时升级你的代码库。有关更多信息，请参阅[代码修改工具](/docs/nextjs-cn/app/guides/upgrading/codemods)。
