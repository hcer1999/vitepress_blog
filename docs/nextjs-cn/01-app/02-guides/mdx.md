---
title: 如何在 Next.js 中使用 markdown 和 MDX
nav_title: MDX
description: 学习如何配置 MDX 并在 Next.js 应用中使用它。
---

{/_ 本文档的内容在 app 和 pages 路由之间共享。你可以使用 `<PagesOnly>Content</PagesOnly>` 组件来添加特定于 Pages 路由的内容。任何共享内容都不应该被包装在组件中。 _/}

[Markdown](https://daringfireball.net/projects/markdown/syntax) 是一种用于格式化文本的轻量级标记语言。它允许你使用纯文本语法编写并将其转换为结构有效的 HTML。它通常用于编写网站和博客上的内容。

你编写...

```md
我 **喜欢** 使用 [Next.js](https://nextjs.org/)
```

输出：

```html
<p>
  我
  <strong>喜欢</strong>
  使用
  <a href="https://nextjs.org/">Next.js</a>
</p>
```

[MDX](https://mdxjs.com/) 是 markdown 的超集，它允许你在 markdown 文件中直接编写 [JSX](https://react.dev/learn/writing-markup-with-jsx)。这是一种强大的方式，可以添加动态交互性并在内容中嵌入 React 组件。

Next.js 可以支持应用程序内的本地 MDX 内容，以及从服务器动态获取的远程 MDX 文件。Next.js 插件处理将 markdown 和 React 组件转换为 HTML，包括支持在服务器组件（App Router 中的默认设置）中使用。

> **须知**：查看 [Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) 模板获取完整的工作示例。

## 安装依赖

`@next/mdx` 包和相关包用于配置 Next.js，使其能够处理 markdown 和 MDX。**它从本地文件获取数据**，允许你在 `/pages` 或 `/app` 目录中直接创建具有 `.md` 或 `.mdx` 扩展名的页面。

安装这些包以使用 Next.js 渲染 MDX：

```bash filename="Terminal"
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

## 配置 `next.config.mjs`

更新项目根目录下的 `next.config.mjs` 文件，以配置使用 MDX：

```js filename="next.config.mjs"
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置 `pageExtensions` 以包含 markdown 和 MDX 文件
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // 可选，在下面添加任何其他 Next.js 配置
}

const withMDX = createMDX({
  // 按需在此处添加 markdown 插件
})

// 合并 MDX 配置与 Next.js 配置
export default withMDX(nextConfig)
```

这允许 `.mdx` 文件作为应用程序中的页面、路由或导入使用。

### 处理 `.md` 文件

默认情况下，`next/mdx` 只编译具有 `.mdx` 扩展名的文件。要使用 webpack 处理 `.md` 文件，请更新 `extension` 选项：

```js filename="next.config.mjs"
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})
```

> **须知**：[Turbopack](/docs/app/api-reference/turbopack) 目前不支持 `extension` 选项，因此不支持 `.md` 文件。

## 添加 `mdx-components.tsx` 文件

在项目根目录创建一个 `mdx-components.tsx`（或 `.js`）文件，用于定义全局 MDX 组件。例如，与 `pages` 或 `app` 在同一级别，或者在适用的情况下放在 `src` 内。

```tsx filename="mdx-components.tsx" switcher
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

```js filename="mdx-components.js" switcher
export function useMDXComponents(components) {
  return {
    ...components,
  }
}
```

> **须知**：
>
> - 在 App Router 中使用 `@next/mdx` **必须**有 `mdx-components.tsx` 文件，否则将无法工作。
> - 了解更多关于 [`mdx-components.tsx` 文件约定](/docs/app/api-reference/file-conventions/mdx-components)。
> - 了解如何[使用自定义样式和组件](#using-custom-styles-and-components)。

## 渲染 MDX

你可以使用 Next.js 的基于文件的路由或通过将 MDX 文件导入到其他页面来渲染 MDX。

### 使用基于文件的路由

使用基于文件的路由时，你可以像使用任何其他页面一样使用 MDX 页面。

<AppOnly>

在 App Router 应用中，这包括能够使用[元数据](/docs/app/getting-started/metadata-and-og-images)。

在 `/app` 目录中创建一个新的 MDX 页面：

```txt
  my-project
  ├── app
  │   └── mdx-page
  │       └── page.(mdx/md)
  |── mdx-components.(tsx/js)
  └── package.json
```

</AppOnly>

<PagesOnly>

在 `/pages` 目录中创建一个新的 MDX 页面：

```txt
  my-project
  |── mdx-components.(tsx/js)
  ├── pages
  │   └── mdx-page.(mdx/md)
  └── package.json
```

</PagesOnly>

你可以在这些文件中使用 MDX，甚至可以直接在 MDX 页面中导入 React 组件：

```mdx
import { MyComponent } from 'my-component'

# 欢迎来到我的 MDX 页面！

这是一些**粗体**和*斜体*文本。

这是 markdown 中的列表：

- 一
- 二
- 三

查看我的 React 组件：

<MyComponent />
```

导航到 `/mdx-page` 路由应该显示你的已渲染 MDX 页面。

### 使用动态导入

你可以导入动态 MDX 组件，而不是使用文件系统路由来处理 MDX 文件。

例如，你可以有一个动态路由段，它从单独的目录加载 MDX 组件：

<Image
  alt="动态 MDX 组件的路由段"
  srcLight="/docs/light/mdx-files.png"
  srcDark="/docs/dark/mdx-files.png"
  width="1600"
  height="849"
/>

可以使用 [`generateStaticParams`](/docs/app/api-reference/functions/generate-static-params) 预渲染提供的路由。通过将 `dynamicParams` 标记为 `false`，访问未在 `generateStaticParams` 中定义的路由将返回 404。

```tsx filename="app/blog/[slug]/page.tsx" switcher
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/${slug}.mdx`)

  return <Post />
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }]
}

export const dynamicParams = false
```

```jsx filename="app/blog/[slug]/page.js" switcher
export default async function Page({ params }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/${slug}.mdx`)

  return <Post />
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }]
}

export const dynamicParams = false
```

> **须知**：确保在导入中指定 `.mdx` 文件扩展名。虽然不需要使用[模块路径别名](/docs/app/getting-started/installation#set-up-absolute-imports-and-module-path-aliases)（例如 `@/content`），但它确实简化了你的导入路径。

## 使用自定义样式和组件

渲染后的 Markdown 会映射到原生 HTML 元素。例如，编写以下 markdown：

```md
## 这是一个标题

这是 markdown 中的列表：

- 一
- 二
- 三
```

生成以下 HTML：

```html
<h2>这是一个标题</h2>

<p>这是 markdown 中的列表：</p>

<ul>
  <li>一</li>
  <li>二</li>
  <li>三</li>
</ul>
```

要为 markdown 添加样式，你可以提供映射到生成的 HTML 元素的自定义组件。样式和组件可以全局实现、局部实现，也可以通过共享布局实现。

### 全局样式和组件

在 `mdx-components.tsx` 中添加样式和组件将影响应用程序中的*所有* MDX 文件。

```tsx filename="mdx-components.tsx" switcher
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// 此文件允许你提供自定义 React 组件
// 在 MDX 文件中使用。你可以导入和使用任何
// 你想要的 React 组件，包括内联样式，
// 来自其他库的组件等等。

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 允许自定义内置组件，例如添加样式。
    h1: ({ children }) => <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>,
    img: (props) => (
      <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />
    ),
    ...components,
  }
}
```

```js filename="mdx-components.js" switcher
import Image from 'next/image'

// 此文件允许你提供自定义 React 组件
// 在 MDX 文件中使用。你可以导入和使用任何
// 你想要的 React 组件，包括内联样式，
// 来自其他库的组件等等。

export function useMDXComponents(components) {
  return {
    // 允许自定义内置组件，例如添加样式。
    h1: ({ children }) => <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>,
    img: (props) => <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...props} />,
    ...components,
  }
}
```

### 局部样式和组件

你可以通过将局部样式和组件传递给导入的 MDX 组件来将它们应用于特定页面。这些将与[全局样式和组件](#global-styles-and-components)合并并覆盖它们。

<AppOnly>

```tsx filename="app/mdx-page/page.tsx" switcher
import Welcome from '@/markdown/welcome.mdx'

function CustomH1({ children }) {
  return <h1 style={{ color: 'blue', fontSize: '100px' }}>{children}</h1>
}

const overrideComponents = {
  h1: CustomH1,
}

export default function Page() {
  return <Welcome components={overrideComponents} />
}
```

```jsx filename="app/mdx-page/page.js" switcher
import Welcome from '@/markdown/welcome.mdx'

function CustomH1({ children }) {
  return <h1 style={{ color: 'blue', fontSize: '100px' }}>{children}</h1>
}

const overrideComponents = {
  h1: CustomH1,
}

export default function Page() {
  return <Welcome components={overrideComponents} />
}
```

</AppOnly>

<PagesOnly>

```tsx filename="pages/mdx-page.tsx" switcher
import Welcome from '@/markdown/welcome.mdx'

function CustomH1({ children }) {
  return <h1 style={{ color: 'blue', fontSize: '100px' }}>{children}</h1>
}

const overrideComponents = {
  h1: CustomH1,
}

export default function Page() {
  return <Welcome components={overrideComponents} />
}
```

```jsx filename="pages/mdx-page.js" switcher
import Welcome from '@/markdown/welcome.mdx'

function CustomH1({ children }) {
  return <h1 style={{ color: 'blue', fontSize: '100px' }}>{children}</h1>
}

const overrideComponents = {
  h1: CustomH1,
}

export default function Page() {
  return <Welcome components={overrideComponents} />
}
```

</PagesOnly>

### 共享布局

<AppOnly>

要在 MDX 页面之间共享布局，可以使用 App Router 的[内置布局支持](/docs/app/building-your-application/routing/layouts-and-templates#layouts)。

```tsx filename="app/mdx-page/layout.tsx" switcher
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // 在此处创建任何共享布局或样式
  return <div style={{ color: 'blue' }}>{children}</div>
}
```

```jsx filename="app/mdx-page/layout.js" switcher
export default function MdxLayout({ children }) {
  // 在此处创建任何共享布局或样式
  return <div style={{ color: 'blue' }}>{children}</div>
}
```

</AppOnly>

<PagesOnly>

要在 MDX 页面周围共享布局，请创建一个布局组件：

```tsx filename="components/mdx-layout.tsx" switcher
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // 在此处创建任何共享布局或样式
  return <div style={{ color: 'blue' }}>{children}</div>
}
```

```jsx filename="components/mdx-layout.js" switcher
export default function MdxLayout({ children }) {
  // 在此处创建任何共享布局或样式
  return <div style={{ color: 'blue' }}>{children}</div>
}
```

然后，将布局组件导入到 MDX 页面中，用布局包装 MDX 内容，并导出它：

```mdx
import MdxLayout from '../components/mdx-layout'

# 欢迎来到我的 MDX 页面！

export default function MDXPage({ children }) {
  return <MdxLayout>{children}</MdxLayout>

}
```

</PagesOnly >

### 使用 Tailwind typography 插件

如果你使用 [Tailwind](https://tailwindcss.com) 来为你的应用程序添加样式，使用 [`@tailwindcss/typography` 插件](https://tailwindcss.com/docs/plugins#typography) 将允许你在 markdown 文件中重用你的 Tailwind 配置和样式。

该插件添加了一组 `prose` 类，可用于向来自 markdown 等源的内容块添加排版样式。

[安装 Tailwind typography](https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#installation) 并与[共享布局](#shared-layouts)一起使用，以添加你想要的 `prose`。

<AppOnly>

```tsx filename="app/mdx-page/layout.tsx" switcher
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // 在此处创建任何共享布局或样式
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
      {children}
    </div>
  )
}
```

```jsx filename="app/mdx-page/layout.js" switcher
export default function MdxLayout({ children }) {
  // 在此处创建任何共享布局或样式
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
      {children}
    </div>
  )
}
```

</AppOnly>

<PagesOnly>

要在 MDX 页面周围共享布局，请创建一个布局组件：

```tsx filename="components/mdx-layout.tsx" switcher
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // 在此处创建任何共享布局或样式
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
      {children}
    </div>
  )
}
```

```jsx filename="components/mdx-layout.js" switcher
export default function MdxLayout({ children }) {
  // 在此处创建任何共享布局或样式
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
      {children}
    </div>
  )
}
```

然后，将布局组件导入到 MDX 页面中，用布局包装 MDX 内容，并导出它：

```mdx
import MdxLayout from '../components/mdx-layout'

# 欢迎来到我的 MDX 页面！

export default function MDXPage({ children }) {
  return <MdxLayout>{children}</MdxLayout>

}
```

</PagesOnly >

## Frontmatter

Frontmatter 是一种类似 YAML 的键/值对，可用于存储有关页面的数据。`@next/mdx` 默认**不**支持 frontmatter，尽管有许多解决方案可以将 frontmatter 添加到 MDX 内容中，例如：

- [remark-frontmatter](https://github.com/remarkjs/remark-frontmatter)
- [remark-mdx-frontmatter](https://github.com/remcohaszing/remark-mdx-frontmatter)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)

`@next/mdx` **确实**允许你像使用任何其他 JavaScript 组件一样使用导出：

```mdx filename="content/blog-post.mdx" switcher
export const metadata = {
  author: 'John Doe',
}

# 博客文章
```

现在可以在 MDX 文件外部引用元数据：

<AppOnly>

```tsx filename="app/blog/page.tsx" switcher
import BlogPost, { metadata } from '@/content/blog-post.mdx'

export default function Page() {
  console.log('metadata: ', metadata)
  //=> { author: 'John Doe' }
  return <BlogPost />
}
```

```jsx filename="app/blog/page.js" switcher
import BlogPost, { metadata } from '@/content/blog-post.mdx'

export default function Page() {
  console.log('metadata: ', metadata)
  //=> { author: 'John Doe' }
  return <BlogPost />
}
```

</AppOnly>

<PagesOnly>

```tsx filename="pages/blog.tsx" switcher
import BlogPost, { metadata } from '@/content/blog-post.mdx'

export default function Page() {
  console.log('metadata: ', metadata)
  //=> { author: 'John Doe' }
  return <BlogPost />
}
```

```jsx filename="pages/blog.js" switcher
import BlogPost, { metadata } from '@/content/blog-post.mdx'

export default function Page() {
  console.log('metadata: ', metadata)
  //=> { author: 'John Doe' }
  return <BlogPost />
}
```

</PagesOnly>

这种方法的一个常见用例是当你想要遍历 MDX 集合并提取数据时。例如，从所有博客文章创建博客索引页面。你可以使用像 [Node 的 `fs` 模块](https://nodejs.org/api/fs.html) 或 [globby](https://www.npmjs.com/package/globby) 等包来读取包含文章的目录并提取元数据。

> **须知**：
>
> - 使用 `fs`、`globby` 等只能在服务器端使用。
> - 查看 [Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) 模板获取完整的工作示例。

## remark 和 rehype 插件

你可以选择提供 remark 和 rehype 插件来转换 MDX 内容。

例如，你可以使用 [`remark-gfm`](https://github.com/remarkjs/remark-gfm) 来支持 GitHub 风格的 Markdown。

由于 remark 和 rehype 生态系统仅支持 ESM，你需要使用 `next.config.mjs` 或 `next.config.ts` 作为配置文件。

```js filename="next.config.mjs"
import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允许文件使用 .mdx 扩展名
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // 可选，在下面添加任何其他 Next.js 配置
}

const withMDX = createMDX({
  // 按需在此添加 markdown 插件
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

// 合并 MDX 和 Next.js 配置
export default withMDX(nextConfig)
```

### 在 Turbopack 中使用插件

要在 [Turbopack](/docs/app/api-reference/turbopack) 中使用插件，请升级到最新的 `@next/mdx` 并使用字符串指定插件名称：

```js filename="next.config.mjs"
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [['rehype-katex', { strict: true, throwOnError: true }]],
  },
})

export default withMDX(nextConfig)
```

> **须知**：
>
> 由于[无法将 JavaScript 函数传递给 Rust](https://github.com/vercel/next.js/issues/71819#issuecomment-2461802968)，没有可序列化选项的 remark 和 rehype 插件目前无法在 [Turbopack](/docs/app/api-reference/turbopack) 中使用。

## 远程 MDX

如果你的 MDX 文件或内容位于*其他地方*，你可以在服务器上动态获取它。这对于存储在 CMS、数据库或其他任何地方的内容非常有用。用于此用途的社区包是 [`next-mdx-remote-client`](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-app-router)。

> **须知**：请谨慎操作。MDX 编译成 JavaScript 并在服务器上执行。你应该只从可信来源获取 MDX 内容，否则这可能导致远程代码执行（RCE）。

以下示例使用 `next-mdx-remote-client`：

<AppOnly>

```tsx filename="app/mdx-page-remote/page.tsx" switcher
import { MDXRemote } from 'next-mdx-remote-client/rsc'

export default async function RemoteMdxPage() {
  // MDX 文本 - 可以来自数据库、CMS、fetch，任何地方...
  const res = await fetch('https://...')
  const markdown = await res.text()
  return <MDXRemote source={markdown} />
}
```

```jsx filename="app/mdx-page-remote/page.js" switcher
import { MDXRemote } from 'next-mdx-remote-client/rsc'

export default async function RemoteMdxPage() {
  // MDX 文本 - 可以来自数据库、CMS、fetch，任何地方...
  const res = await fetch('https://...')
  const markdown = await res.text()
  return <MDXRemote source={markdown} />
}
```

</AppOnly>

<PagesOnly>

```tsx filename="pages/mdx-page-remote.tsx" switcher
import { serialize, type SerializeResult } from 'next-mdx-remote-client/serialize'
import { MDXClient } from 'next-mdx-remote-client'

type Props = {
  mdxSource: SerializeResult
}

export default function RemoteMdxPage({ mdxSource }: Props) {
  if ('error' in mdxSource) {
    // 要么渲染错误 UI，要么抛出 `mdxSource.error`
  }
  return <MDXClient {...mdxSource} />
}

export async function getStaticProps() {
  // MDX 文本 - 可以来自数据库、CMS、fetch，任何地方...
  const res = await fetch('https:...')
  const mdxText = await res.text()
  const mdxSource = await serialize({ source: mdxText })
  return { props: { mdxSource } }
}
```

```jsx filename="pages/mdx-page-remote.js" switcher
import { serialize } from 'next-mdx-remote-client/serialize'
import { MDXClient } from 'next-mdx-remote-client'

export default function RemoteMdxPage({ mdxSource }) {
  if ('error' in mdxSource) {
    // 要么渲染错误 UI，要么抛出 `mdxSource.error`
  }
  return <MDXClient {...mdxSource} />
}

export async function getStaticProps() {
  // MDX 文本 - 可以来自数据库、CMS、fetch，任何地方...
  const res = await fetch('https:...')
  const mdxText = await res.text()
  const mdxSource = await serialize({ source: mdxText })
  return { props: { mdxSource } }
}
```

</PagesOnly>

导航到 `/mdx-page-remote` 路由应该显示你的已渲染 MDX。

## 深入探讨：如何将 markdown 转换为 HTML？

React 原生不理解 markdown。markdown 纯文本首先需要转换为 HTML。这可以通过 `remark` 和 `rehype` 实现。

`remark` 是围绕 markdown 的工具生态系统。`rehype` 是相同的，但用于 HTML。例如，以下代码片段将 markdown 转换为 HTML：

```js
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

main()

async function main() {
  const file = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process('Hello, Next.js!')

  console.log(String(file)) // <p>Hello, Next.js!</p>
}
```

The `remark` and `rehype` ecosystem contains plugins for [syntax highlighting](https://github.com/atomiks/rehype-pretty-code), [linking headings](https://github.com/rehypejs/rehype-autolink-headings), [generating a table of contents](https://github.com/remarkjs/remark-toc), and more.

When using `@next/mdx` as shown above, you **do not** need to use `remark` or `rehype` directly, as it is handled for you. We're describing it here for a deeper understanding of what the `@next/mdx` package is doing underneath.

## 使用基于 Rust 的 MDX 编译器（实验性）

Next.js 支持用 Rust 编写的新 MDX 编译器。这个编译器仍处于实验阶段，不建议在生产环境中使用。要使用新编译器，你需要在将其传递给 `withMDX` 时配置 `next.config.js`：

```js filename="next.config.js"
module.exports = withMDX({
  experimental: {
    mdxRs: true,
  },
})
```

`mdxRs` 也接受一个对象来配置如何转换 mdx 文件。

```js filename="next.config.js"
module.exports = withMDX({
  experimental: {
    mdxRs: {
      jsxRuntime?: string            // Custom jsx runtime
      jsxImportSource?: string       // Custom jsx import source,
      mdxType?: 'gfm' | 'commonmark' // Configure what kind of mdx syntax will be used to parse & transform
    },
  },
})
```

## 有用的链接

- [MDX](https://mdxjs.com)
- [`@next/mdx`](https://www.npmjs.com/package/@next/mdx)
- [remark](https://github.com/remarkjs/remark)
- [rehype](https://github.com/rehypejs/rehype)
- [Markdoc](https://markdoc.dev/docs/nextjs)
