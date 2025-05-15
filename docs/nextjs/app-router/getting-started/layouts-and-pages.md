---
title: Next.js 中文文档 - 布局和页面
description: 学习如何创建布局和页面
---

# Next.js 中文文档 - 如何创建布局和页面

Next.js使用**基于文件系统的路由**，意味着您可以使用文件夹和文件来定义路由。本页将指导您如何创建布局和页面，以及如何在它们之间链接。

## 创建页面

**页面**是在特定路由上渲染的UI。要创建页面，请在`app`目录中添加一个页面文件并默认导出一个React组件。例如，要创建一个索引页（`/`）：

app/page.tsx

```tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

## 创建布局

布局是在多个页面之间**共享**的UI。在导航时，布局会保持状态、保持交互性且不会重新渲染。

您可以通过从布局文件默认导出一个React组件来定义布局。该组件应该接受一个`children`属性，这可以是一个页面或另一个布局。

例如，要创建一个接受索引页为子项的布局，请在`app`目录中添加一个`layout`文件：

app/layout.tsx

```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 布局UI */}
        {/* 在您希望渲染页面或嵌套布局的地方放置children */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

上面的布局被称为根布局，因为它定义在`app`目录的根目录中。根布局是**必需的**，并且必须包含`html`和`body`标签。

## 创建嵌套路由

嵌套路由是由多个URL段组成的路由。例如，`/blog/[slug]`路由由三个段组成：

- `/`（根段）
- `blog`（段）
- `[slug]`（叶段）

在Next.js中：

- **文件夹**用于定义映射到URL段的路由段。
- **文件**（如`page`和`layout`）用于创建在段中显示的UI。

要创建嵌套路由，您可以将文件夹相互嵌套。例如，要添加`/blog`路由，请在`app`目录中创建一个名为`blog`的文件夹。然后，要使`/blog`可公开访问，添加一个`page.tsx`文件：

app/blog/page.tsx

```tsx
// 模拟导入
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

您可以继续嵌套文件夹以创建嵌套路由。例如，要创建特定博客文章的路由，在`blog`内创建一个新的`[slug]`文件夹并添加一个`page`文件：

app/blog/[slug]/page.tsx

```tsx
function generateStaticParams() {}

export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}
```

将文件夹名称包装在方括号中（例如`[slug]`）创建动态路由段，用于从数据生成多个页面，如博客文章、产品页面等。

## 嵌套布局

默认情况下，层次结构中的布局也是嵌套的，这意味着它们通过其`children`属性包装子布局。您可以通过在特定路由段（文件夹）中添加`layout`来嵌套布局。

例如，要为`/blog`路由创建一个布局，请在`blog`文件夹中添加一个新的`layout`文件：

app/blog/layout.tsx

```tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

如果您将上述两个布局组合起来，根布局（`app/layout.js`）将包装博客布局（`app/blog/layout.js`），博客布局将包装博客（`app/blog/page.js`）和博客文章页面（`app/blog/[slug]/page.js`）。

## 页面之间的链接

您可以使用`<Link>`组件在路由之间导航。`<Link>`是Next.js内置的组件，扩展了HTML `<a>`标签，提供预取和客户端导航功能。

例如，要生成博客文章列表，从`next/link`导入`<Link>`并将`href`属性传递给组件：

app/ui/post.tsx

```tsx
import Link from 'next/link'

export default async function Post({ post }) {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

`<Link>`是在Next.js应用程序中导航路由的主要且推荐的方式。但是，您也可以使用`useRouter`钩子进行更高级的导航。

## API参考

了解本页提到的特性的更多信息，请阅读API参考：

- [layout.js](/nextjs/app-router/api-reference/file-conventions/layout) - Layout API参考
- [page.js](/nextjs/app-router/api-reference/file-conventions/page) - Page API参考
- [Link](/nextjs/app-router/api-reference/components/link) - Link组件API参考
