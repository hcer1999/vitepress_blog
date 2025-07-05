---
title: 如何从 Vite 迁移到 Next.js
nav_title: Vite
description: 学习如何将现有的 React 应用程序从 Vite 迁移到 Next.js。
---

# NextJS中文文档 - From Vite

本指南将帮助你将现有的 Vite 应用程序迁移到 Next.js。

## 为什么要切换？

以下是你可能想从 Vite 切换到 Next.js 的几个原因：

### 初始页面加载时间慢

如果你使用[默认的 Vite React 插件](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)构建应用程序，你的应用程序是一个纯客户端应用程序。仅客户端应用程序，也称为单页应用程序（SPA），通常会经历较慢的初始页面加载时间。这是由于以下几个原因：

1. 浏览器需要等待 React 代码和整个应用程序包下载并运行，然后你的代码才能发送请求加载一些数据。
2. 随着每个新功能和额外依赖项的添加，你的应用程序代码会不断增长。

### 没有自动代码分割

之前提到的加载时间慢的问题可以通过代码分割在一定程度上得到管理。然而，如果你尝试手动进行代码分割，通常会使性能变得更糟。在手动代码分割时很容易无意中引入网络瀑布。Next.js 在其路由器中内置了自动代码分割。

### 网络瀑布

当应用程序进行顺序的客户端-服务器请求来获取数据时，常常会导致性能不佳。SPA 中一种常见的数据获取模式是最初渲染一个占位符，然后在组件挂载后获取数据。不幸的是，这意味着获取数据的子组件只能在父组件完成加载自己的数据后才能开始获取。

虽然 Next.js 支持在客户端获取数据，但它也给你提供了将数据获取转移到服务器的选项，这可以消除客户端-服务器瀑布。

### 快速且有意图的加载状态

通过对 [React Suspense 流式传输](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)的内置支持，你可以更有意图地决定 UI 的哪些部分想要首先加载以及以何种顺序加载，而不会引入网络瀑布。

这使你能够构建加载更快的页面并消除[布局偏移](https://vercel.com/blog/how-core-web-vitals-affect-seo)。

### 选择数据获取策略

根据你的需求，Next.js 允许你在页面和组件基础上选择数据获取策略。你可以决定在构建时、在服务器上的请求时或在客户端获取数据。例如，你可以在构建时从 CMS 获取数据并渲染博客文章，然后可以在 CDN 上高效缓存。

### 中间件

[Next.js 中间件](/nextjs-cn/app/building-your-application/routing/middleware)允许你在请求完成前在服务器上运行代码。这对于避免用户访问仅认证页面时出现未认证内容闪烁特别有用，可以通过将用户重定向到登录页面来实现。中间件也适用于实验和[国际化](/nextjs-cn/app/building-your-application/routing/internationalization)。

### 内置优化

[图片](/nextjs-cn/app/api-reference/components/image)、[字体](/nextjs-cn/app/api-reference/components/font)和[第三方脚本](/nextjs-cn/app/building-your-application/routing/layouts-and-templates)通常对应用程序的性能有显著影响。Next.js 自带内置组件，可以自动为你优化这些内容。

## 迁移步骤

我们这次迁移的目标是尽快获得一个可运行的 Next.js 应用程序，以便你可以逐步采用 Next.js 功能。首先，我们将保持应用程序作为纯客户端应用程序（SPA），而不迁移你现有的路由器。这有助于最小化迁移过程中遇到问题的可能性，并减少合并冲突。

### 步骤 1：安装 Next.js 依赖

你需要做的第一件事是安装 `next` 作为依赖项：

```bash
npm install next@latest
```

### 步骤 2：创建 Next.js 配置文件

在项目根目录创建一个 `next.config.mjs` 文件。该文件将保存你的 [Next.js 配置选项](/nextjs-cn/app/api-reference/config/next-config-js/index)。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 输出单页应用程序 (SPA)。
  distDir: './dist', // 将构建输出目录更改为 `./dist/`。
}

export default nextConfig
```

> **需要了解：** 你可以对 Next.js 配置文件使用 `.js` 或 `.mjs` 扩展名。

### 步骤 3：更新 TypeScript 配置

如果你使用 TypeScript，你需要对 `tsconfig.json` 文件进行以下更改，使其与 Next.js 兼容。如果你不使用 TypeScript，可以跳过此步骤。

1. 删除对 `tsconfig.node.json` 的[项目引用](https://www.typescriptlang.org/tsconfig#references)
2. 将 `./dist/types/**/*.ts` 和 `./next-env.d.ts` 添加到 [`include` 数组](https://www.typescriptlang.org/tsconfig#include)
3. 将 `./node_modules` 添加到 [`exclude` 数组](https://www.typescriptlang.org/tsconfig#exclude)
4. 将 `{ "name": "next" }` 添加到 [`compilerOptions` 中的 `plugins` 数组](https://www.typescriptlang.org/tsconfig#plugins)：`"plugins": [{ "name": "next" }]`
5. 将 [`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop) 设置为 `true`：`"esModuleInterop": true`
6. 将 [`jsx`](https://www.typescriptlang.org/tsconfig#jsx) 设置为 `preserve`：`"jsx": "preserve"`
7. 将 [`allowJs`](https://www.typescriptlang.org/tsconfig#allowJs) 设置为 `true`：`"allowJs": true`
8. 将 [`forceConsistentCasingInFileNames`](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames) 设置为 `true`：`"forceConsistentCasingInFileNames": true`
9. 将 [`incremental`](https://www.typescriptlang.org/tsconfig#incremental) 设置为 `true`：`"incremental": true`

以下是一个包含这些更改的可工作 `tsconfig.json` 示例：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["./src", "./dist/types/**/*.ts", "./next-env.d.ts"],
  "exclude": ["./node_modules"]
}
```

你可以在 [Next.js 文档](/nextjs-cn/app/api-reference/config/typescript#ide-plugin)中找到更多关于配置 TypeScript 的信息。

### 步骤 4：创建根布局

Next.js [App Router](/nextjs-cn/app/index) 应用程序必须包含一个
[根布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#root-layout-required)
文件，该文件是一个 [React 服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)，
将包裹应用程序中的所有页面。此文件定义在 `app` 目录的顶层。

在 Vite 应用程序中，与根布局文件最接近的等效物是
[`index.html` 文件](https://vitejs.dev/guide/#index-html-and-project-root)，其中包含你的
`<html>`、`<head>` 和 `<body>` 标签。

在此步骤中，你将把 `index.html` 文件转换为根布局文件：

1. 在 `src` 文件夹中创建一个新的 `app` 目录。
2. 在该 `app` 目录中创建一个新的 `layout.tsx` 文件：

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return '...'
}
```

```jsx switcher
export default function RootLayout({ children }) {
  return '...'
}
```

> **需要了解**：布局文件可以使用 `.js`、`.jsx` 或 `.tsx` 扩展名。

3. 将 `index.html` 文件的内容复制到之前创建的 `<RootLayout>` 组件中，
   同时将 `body.div#root` 和 `body.script` 标签替换为 `<div id="root">{children}</div>`：

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

```jsx switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

4. Next.js 默认已经包含
   [meta charset](https://developer.mozilla.org/docs/Web/HTML/Element/meta#charset) 和
   [meta viewport](https://developer.mozilla.org/docs/Web/HTML/Viewport_meta_tag) 标签，所以你
   可以安全地从 `<head>` 中删除这些标签：

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

```jsx switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

5. 任何 [元数据文件](/nextjs-cn/app/getting-started/metadata-and-og-images#file-based-metadata)，
   如 `favicon.ico`、`icon.png`、`robots.txt` 等，只要放置在 `app` 目录的顶层，就会自动添加到应用程序的
   `<head>` 标签中。在将[所有支持的文件](/nextjs-cn/app/getting-started/metadata-and-og-images#file-based-metadata)
   移动到 `app` 目录后，你可以安全地删除它们的 `<link>` 标签：

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

```jsx switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

6. 最后，Next.js 可以使用 [元数据 API](/nextjs-cn/app/getting-started/metadata-and-og-images) 管理你的最后几个 `<head>` 标签。
   将你的最终元数据信息移动到导出的 [`metadata` 对象](/nextjs-cn/app/api-reference/functions/generate-metadata#metadata-object) 中：

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

```jsx switcher
export const metadata = {
  title: 'My App',
  description: 'My App is a...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

通过上述更改，你从在 `index.html` 中声明所有内容转变为使用 Next.js 内置于框架中的基于约定的方法
（[元数据 API](/nextjs-cn/app/getting-started/metadata-and-og-images)）。这种方法使你能够更轻松地改进 SEO 和页面的网络共享性。

### 步骤 5：创建入口点页面

在 Next.js 中，你通过创建 `page.tsx` 文件来声明应用程序的入口点。
在 Vite 中，与此文件最接近的等效物是 `main.tsx` 文件。在此步骤中，你将设置应用程序的入口点。

1. **在你的 `app` 目录中创建一个 `[[...slug]]` 目录。**

由于在本指南中，我们首先旨在将 Next.js 设置为 SPA（单页应用程序），因此你需要让页面入口点捕获应用程序的所有可能路由。为此，在 `app` 目录中创建一个新的 `[[...slug]]` 目录。

这个目录被称为[可选的全捕获路由段](/nextjs-cn/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments)。Next.js 使用基于文件系统的路由器，其中文件夹用于定义路由。这个特殊目录将确保应用程序的所有路由都指向其包含的 `page.tsx` 文件。

2. **在 `app/[[...slug]]` 目录中创建一个包含以下内容的新 `page.tsx` 文件：**

```tsx switcher
import '../../index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

```jsx switcher
import '../../index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

> **需要了解**：页面文件可以使用 `.js`、`.jsx` 或 `.tsx` 扩展名。

这个文件是一个 [客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)，由 `'use client'`
指令定义。客户端组件在发送到客户端之前仍然在服务器上[预渲染为 HTML](/nextjs-cn/app/building-your-application/rendering/client-components#how-are-client-components-rendered)。

由于我们希望从一个仅客户端的应用程序开始，我们可以配置 Next.js 从 `App` 组件开始禁用预渲染。

```tsx
const App = dynamic(() => import('../../App'), { ssr: false })
```

现在，更新你的入口点页面以使用新组件：

```tsx switcher
import '../../index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

```jsx switcher
import '../../index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

### 步骤 6：更新静态图片导入

Next.js 处理静态图片导入的方式与 Vite 略有不同。使用 Vite，导入图片文件将返回其公共 URL 作为字符串：

```tsx
import image from './img.png' // `image` 在生产环境中将是 '/assets/img.2d8efhg.png'

export default function App() {
  return <img src={image} />
}
```

使用 Next.js，静态图片导入返回一个对象。然后，该对象可以直接与 Next.js [`<Image>` 组件](/nextjs-cn/app/api-reference/components/image) 一起使用，或者你可以将对象的 `src` 属性与现有的 `<img>` 标签一起使用。

`<Image>` 组件具有 [自动图像优化](/nextjs-cn/app/api-reference/components/image) 的额外好处。`<Image>` 组件会根据图像的尺寸自动设置结果 `<img>` 的 `width` 和 `height` 属性。这可以防止图像加载时出现布局偏移。然而，如果你的应用程序包含仅对其中一个维度进行样式设置而没有将另一个设置为 `auto` 的图像，这可能会导致问题。当维度没有设置为 `auto` 时，维度将默认为 `<img>` 维度属性的值，这可能导致图像显示失真。

保留 `<img>` 标签将减少应用程序中的更改量并防止上述问题。然后，你可以选择稍后迁移到 `<Image>` 组件，以通过[配置加载器](/nextjs-cn/app/api-reference/components/image#loader)利用图像优化的优势，或移动到默认的 Next.js 服务器，该服务器具有自动图像优化功能。

1. **将从 `/public` 导入的图像的绝对导入路径转换为相对导入：**

```tsx
// 之前
import logo from '/logo.png'

// 之后
import logo from '../public/logo.png'
```

2. **将图像的 `src` 属性而不是整个图像对象传递给 `<img>` 标签：**

```tsx
// 之前
<img src={logo} />

// 之后
<img src={logo.src} />
```

或者，你可以基于文件名引用图像资产的公共 URL。例如，`public/logo.png` 将在你的应用程序中以 `/logo.png` 提供图像，这将是 `src` 值。

> **警告：** 如果你使用 TypeScript，在访问 `src` 属性时可能会遇到类型错误。你现在可以安全地忽略这些错误。这些错误将在本指南结束前解决。

### 步骤 7：迁移环境变量

Next.js 支持 `.env` [环境变量]()，类似于 Vite。主要区别在于用于在客户端暴露环境变量的前缀。

- 将所有带有 `VITE_` 前缀的环境变量更改为 `NEXT_PUBLIC_`。

Vite 在特殊的 `import.meta.env` 对象上暴露了一些内置的环境变量，这些变量在 Next.js 中不受支持。你需要按以下方式更新它们的用法：

- `import.meta.env.MODE` ⇒ `process.env.NODE_ENV`
- `import.meta.env.PROD` ⇒ `process.env.NODE_ENV === 'production'`
- `import.meta.env.DEV` ⇒ `process.env.NODE_ENV !== 'production'`
- `import.meta.env.SSR` ⇒ `typeof window !== 'undefined'`

Next.js 也不提供内置的 `BASE_URL` 环境变量。但是，如果需要，你仍然可以配置一个：

1. **将以下内容添加到你的 `.env` 文件：**

```bash
# ...
NEXT_PUBLIC_BASE_PATH="/some-base-path"
```

2. **在你的 `next.config.mjs` 文件中将 [`basePath`](/nextjs-cn/app/api-reference/config/next-config-js/basePath) 设置为 `process.env.NEXT_PUBLIC_BASE_PATH`：**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 输出单页应用程序 (SPA)。
  distDir: './dist', // 将构建输出目录更改为 `./dist/`。
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // 将基本路径设置为 `/some-base-path`。
}

export default nextConfig
```

3. **将 `import.meta.env.BASE_URL` 用法更新为 `process.env.NEXT_PUBLIC_BASE_PATH`**

### 步骤 8：更新 `package.json` 中的脚本

你现在应该能够运行应用程序，测试是否成功迁移到 Next.js。但在此之前，你需要使用 Next.js 相关命令更新 `package.json` 中的 `scripts`，并将 `.next` 和 `next-env.d.ts` 添加到 `.gitignore`：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

```txt
# ...
.next
next-env.d.ts
dist
```

现在运行 `npm run dev`，并打开`http://localhost:3000`, 你应该看到你的应用程序现在运行在 Next.js 上。

> **示例：** 查看[这个拉取请求](https://github.com/inngest/vite-to-nextjs/pull/1)，了解从 Vite 迁移到 Next.js 的工作示例。

### 步骤 9：清理

你现在可以从你的代码库中清理 Vite 相关的遗留内容：

- 删除 `main.tsx`
- 删除 `index.html`
- 删除 `vite-env.d.ts`
- 删除 `tsconfig.node.json`
- 删除 `vite.config.ts`
- 卸载 Vite 依赖项

## 后续步骤

如果一切按计划进行，你现在拥有一个作为单页应用程序运行的功能正常的 Next.js 应用程序。然而，你尚未利用 Next.js 的大多数优势，但你现在可以开始进行增量更改，以获得所有好处。以下是你可能想要做的下一步：

- 从 React Router 迁移到 [Next.js App Router](/nextjs-cn/app/building-your-application/routing/index) 以获取：
  - 自动代码分割
  - [流式服务器渲染](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming)
  - [React 服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)
- [使用 `<Image>` 组件优化图像](/nextjs-cn/app/api-reference/components/image)
- [使用 `next/font` 优化字体](/nextjs-cn/app/api-reference/components/font)
- [使用 `<Script>` 组件优化第三方脚本](/nextjs-cn/app/building-your-application/routing/layouts-and-templates)
- [更新你的 ESLint 配置以支持 Next.js 规则](/nextjs-cn/app/api-reference/config/eslint)
