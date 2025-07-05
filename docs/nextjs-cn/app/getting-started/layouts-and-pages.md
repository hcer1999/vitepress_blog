---
title: 如何创建布局和页面
nav_title: 布局和页面
description: 创建你的第一个页面和布局，并在它们之间建立链接。
related:
  title: API 参考
  description: 通过阅读 API 参考来了解本页面提到的功能。
  links:
    - app/api-reference/file-conventions/layout
    - app/api-reference/file-conventions/page
    - app/api-reference/components/link
---

# NextJS中文文档 - Layouts And Pages

Next.js 使用**基于文件系统的路由**，这意味着你可以使用文件夹和文件来定义路由。本页面将指导你如何创建布局和页面，以及如何在它们之间建立链接。

## 创建页面

**页面**是在特定路由上渲染的 UI。要创建页面，在 `app` 目录中添加一个 [`page` 文件](/nextjs-cn/app/api-reference/file-conventions/page)并默认导出一个 React 组件。例如，要创建一个索引页面（`/`）：

<Image
  alt="page.js 特殊文件"
  srcLight="/docs/light/page-special-file.png"
  srcDark="/docs/dark/page-special-file.png"
  width="1600"
  height="282"
/>

```tsx switcher
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

```jsx switcher
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

## 创建布局

布局是在多个页面之间**共享**的 UI。在导航时，布局会保持状态，保持交互性，并且不会重新渲染。

你可以通过从 [`layout` 文件](/nextjs-cn/app/api-reference/file-conventions/layout)中默认导出一个 React 组件来定义布局。该组件应该接受一个 `children` 属性，它可以是一个页面或另一个[布局](#nesting-layouts)。

例如，要创建一个接受索引页面作为子页面的布局，在 `app` 目录中添加一个 `layout` 文件：

<Image
  alt="layout.js 特殊文件"
  srcLight="/docs/light/layout-special-file.png"
  srcDark="/docs/dark/layout-special-file.png"
  width="1600"
  height="363"
/>

```tsx switcher
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 布局 UI */}
        {/* 在你想要渲染页面或嵌套布局的地方放置 children */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

```jsx switcher
export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 布局 UI */}
        {/* 在你想要渲染页面或嵌套布局的地方放置 children */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

上面的布局被称为[根布局](/nextjs-cn/app/api-reference/file-conventions/layout#root-layouts)，因为它定义在 `app` 目录的根目录中。根布局是**必需的**，并且必须包含 `html` 和 `body` 标签。

## 创建嵌套路由

嵌套路由是由多个 URL 段组成的路由。例如，`/blog/[slug]` 路由由三个段组成：

- `/`（根段）
- `blog`（段）
- `[slug]`（叶段）

在 Next.js 中：

- **文件夹**用于定义映射到 URL 段的路由段。
- **文件**（如 `page` 和 `layout`）用于创建为某个段显示的 UI。

要创建嵌套路由，你可以将文件夹嵌套在一起。例如，要添加 `/blog` 路由，在 `app` 目录中创建一个名为 `blog` 的文件夹。然后，要使 `/blog` 可以公开访问，添加一个 `page.tsx` 文件：

<Image
  alt="显示 blog 文件夹和 page.js 文件的文件层次结构"
  srcLight="/docs/light/blog-nested-route.png"
  srcDark="/docs/dark/blog-nested-route.png"
  width="1600"
  height="525"
/>

```tsx switcher
// 示例导入
import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'

export default async function Page() {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```

```jsx switcher
// 示例导入
import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'

export default async function Page() {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```

你可以继续嵌套文件夹来创建嵌套路由。例如，要为特定的博客文章创建路由，在 `blog` 内创建一个新的 `[slug]` 文件夹并添加一个 `page` 文件：

<Image
  alt="显示带有嵌套 slug 文件夹和 page.js 文件的 blog 文件夹的文件层次结构"
  srcLight="/docs/light/blog-post-nested-route.png"
  srcDark="/docs/dark/blog-post-nested-route.png"
  width="1600"
  height="687"
/>

```tsx switcher
function generateStaticParams() {}

export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}
```

```jsx switcher
function generateStaticParams() {}

export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}
```

将文件夹名称用方括号括起来（例如 `[slug]`）会创建一个[动态路由段](/nextjs-cn/app/building-your-application/routing/dynamic-routes)，用于从数据生成多个页面，例如博客文章、产品页面等。

## 嵌套布局

默认情况下，文件夹层次结构中的布局也是嵌套的，这意味着它们通过其 `children` 属性包装子布局。你可以通过在特定路由段（文件夹）中添加 `layout` 来嵌套布局。

例如，要为 `/blog` 路由创建布局，在 `blog` 文件夹中添加一个新的 `layout` 文件。

<Image
  alt="显示根布局包装博客布局的文件层次结构"
  srcLight="/docs/light/nested-layouts.png"
  srcDark="/docs/dark/nested-layouts.png"
  width="1600"
  height="768"
/>

```tsx switcher
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

```jsx switcher
export default function BlogLayout({ children }) {
  return <section>{children}</section>
}
```

现在，当用户访问 `/blog` 或 `/blog/[slug]` 路由时，博客页面将被包装在 `BlogLayout` 中。布局将按以下顺序嵌套：

1. `app/layout.js`
2. `app/blog/layout.js`
3. `app/blog/page.js` 或 `app/blog/[slug]/page.js`

## 链接和导航

有两种方式在 Next.js 中的路由之间进行导航：

- 使用 [`<Link>` 组件](/nextjs-cn/app/api-reference/components/link)
- 使用 [`useRouter` Hook](/nextjs-cn/app/api-reference/functions/use-router)

本节将介绍如何使用 `<Link>` 组件，这是在路由之间导航的主要方式。

### `<Link>` 组件

`<Link>` 是一个扩展了 HTML `<a>` 标签的内置组件，用于在页面之间进行预取和客户端导航。这是在 Next.js 中路由之间导航的主要方式。

要使用它，首先从 `next/link` 导入组件，然后将 `href` 属性传递给它：

```tsx switcher
import Link from 'next/link'

export default function Page() {
  return <Link href="/blog">访问博客</Link>
}
```

```jsx switcher
import Link from 'next/link'

export default function Page() {
  return <Link href="/blog">访问博客</Link>
}
```

你可以在[`<Link>` API 参考](/nextjs-cn/app/api-reference/components/link)中了解更多关于 Link 组件的信息。
