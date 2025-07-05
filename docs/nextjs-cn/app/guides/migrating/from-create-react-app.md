---
title: 如何从 Create React App 迁移到 Next.js
nav_title: Create React App
description: 学习如何将现有的 React 应用程序从 Create React App 迁移到 Next.js。
---

本指南将帮助你将现有的 Create React App (CRA) 站点迁移到 Next.js。

## 为什么要切换？

有几个原因可能促使你从 Create React App 切换到 Next.js：

### 初始页面加载速度慢

Create React App 使用纯客户端 React。仅客户端应用程序，也称为[单页应用程序 (SPAs)](/nextjs-cn/app/guides/single-page-applications)，通常会经历初始页面加载速度慢的问题。这发生是由于以下几个原因：

1. 浏览器需要等待 React 代码和整个应用程序包下载并运行，然后你的代码才能发送请求来加载数据。
2. 随着每个新功能和依赖项的添加，你的应用程序代码会不断增长。

### 没有自动代码分割

上述加载时间慢的问题可以通过代码分割在一定程度上缓解。然而，如果你尝试手动进行代码分割，可能会无意中引入网络瀑布流。Next.js 在其路由器和构建管道中内置了自动代码分割和树摇（tree-shaking）功能。

### 网络瀑布流

性能不佳的一个常见原因是应用程序进行顺序客户端-服务器请求来获取数据。[SPA](/nextjs-cn/app/guides/single-page-applications) 中数据获取的一种模式是先渲染占位符，然后在组件挂载后获取数据。不幸的是，子组件只能在其父组件完成加载自己的数据后才能开始获取数据，从而产生请求"瀑布流"。

虽然 Next.js 支持客户端数据获取，但 Next.js 还允许你将数据获取移至服务器。这通常可以完全消除客户端-服务器瀑布流。

### 快速且有意识的加载状态

通过对 [React Suspense 的流式处理](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense) 的内置支持，你可以定义你的 UI 的哪些部分首先加载以及以什么顺序加载，而不会创建网络瀑布流。

这使你能够构建加载更快的页面并消除[布局偏移](https://vercel.com/blog/how-core-web-vitals-affect-seo)。

### 选择数据获取策略

根据你的需求，Next.js 允许你在页面或组件级别选择数据获取策略。例如，你可以在构建时（SSG）从 CMS 获取数据并渲染博客文章以获得快速加载速度，或者在需要时在请求时（SSR）获取数据。

### 中间件

[Next.js 中间件](/nextjs-cn/app/building-your-application/routing/middleware)允许你在完成请求之前在服务器上运行代码。例如，对于只有认证用户才能访问的页面，你可以通过在中间件中将用户重定向到登录页面来避免未认证内容的闪烁。你还可以使用它来实现 A/B 测试、实验和[国际化](/nextjs-cn/app/building-your-application/routing/internationalization)等功能。

### 内置优化

[图像](/nextjs-cn/app/api-reference/components/image)、[字体](/nextjs-cn/app/api-reference/components/font)和[第三方脚本](/nextjs-cn/app/building-your-application/routing/layouts-and-templates)通常对应用程序的性能有很大影响。Next.js 包含专门的组件和 API，可以自动为你优化它们。

## 迁移步骤

我们的目标是尽快获得一个工作的 Next.js 应用程序，以便你可以逐步采用 Next.js 功能。首先，我们将把你的应用程序视为纯客户端应用程序（[SPA](/nextjs-cn/app/guides/single-page-applications)），而不会立即替换你现有的路由器。这减少了复杂性和合并冲突。

> **注意**：如果你使用高级 CRA 配置，例如 `package.json` 中的自定义 `homepage` 字段、自定义服务工作线程或特定的 Babel/webpack 调整，请参阅本指南末尾的**附加考虑事项**部分，了解在 Next.js 中复制或适应这些功能的提示。

### 步骤 1：安装 Next.js 依赖

在你现有的项目中安装 Next.js：

```bash
npm install next@latest
```

### 步骤 2：创建 Next.js 配置文件

在项目根目录（与你的 `package.json` 同级）创建一个 `next.config.ts`。该文件保存你的 [Next.js 配置选项](/nextjs-cn/app/api-reference/config/next-config-js/index)。

```js
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // 输出单页应用程序 (SPA)
  distDir: 'build', // 将构建输出目录更改为 `build`
}

export default nextConfig
```

> **注意**：使用 `output: 'export'` 意味着你正在进行静态导出。你将**无法**访问服务器端功能，如 SSR 或 API。你可以删除此行以利用 Next.js 服务器功能。

### 步骤 3：创建根布局

Next.js [App Router](/nextjs-cn/app/index) 应用程序必须包含一个[根布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#root-layout-required)文件，这是一个将包装所有页面的 [React 服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)。

CRA 应用程序中与根布局文件最接近的等效物是 `public/index.html`，其中包含你的 `<html>`、`<head>` 和 `<body>` 标签。

1. 在 `src` 文件夹内创建一个新的 `app` 目录（或者如果你喜欢 `app` 在根目录，也可以在项目根目录创建）。
2. 在 `app` 目录内，创建一个 `layout.tsx`（或 `layout.js`）文件：

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

现在将你的旧 `index.html` 的内容复制到这个 `<RootLayout>` 组件中。将 `body div#root`（和 `body noscript`）替换为 `<div id="root">{children}</div>`。

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
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
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

> **提示**：默认情况下，Next.js 会忽略 CRA 的 `public/manifest.json`、额外的图标和[测试配置](/nextjs-cn/app/guides/testing/index)。如果你需要这些，Next.js 通过[元数据 API](/nextjs-cn/app/getting-started/metadata-and-og-images)和[测试](/nextjs-cn/app/guides/testing/index)设置提供支持。

### 步骤 4：元数据

Next.js 自动包含 `<meta charset="UTF-8" />` 和 `<meta name="viewport" content="width=device-width, initial-scale=1" />` 标签，所以你可以从 `<head>` 中删除它们：

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
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
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

任何[元数据文件](/nextjs-cn/app/getting-started/metadata-and-og-images#file-based-metadata)，如 `favicon.ico`、`icon.png`、`robots.txt` 只要放在 `app` 目录的顶层，都会被自动添加到应用程序的 `<head>` 标签中。将[所有支持的文件](/nextjs-cn/app/getting-started/metadata-and-og-images#file-based-metadata)移动到 `app` 目录后，你可以安全地删除它们的 `<link>` 标签：

```tsx switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>React App</title>
        <meta name="description" content="Web site created..." />
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
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

最后，Next.js 可以使用[元数据 API](/nextjs-cn/app/getting-started/metadata-and-og-images)管理你的最后几个 `<head>` 标签。将你的最终元数据信息移到导出的 [`metadata` 对象](/nextjs-cn/app/api-reference/functions/generate-metadata#metadata-object)中：

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
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
  title: 'React App',
  description: 'Web site created with Next.js.',
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

通过上述更改，你从在 `index.html` 中声明所有内容转变为使用内置于框架中的 Next.js 基于约定的方法（[元数据 API](/nextjs-cn/app/getting-started/metadata-and-og-images)）。这种方法使你能够更轻松地改进页面的 SEO 和网络共享性。

### 步骤 5：样式

与 CRA 一样，Next.js 开箱即支持 [CSS 模块](/nextjs-cn/app/getting-started/css#css-modules)。它还支持[全局 CSS 导入](/nextjs-cn/app/getting-started/css#global-css)。

如果你有全局 CSS 文件，请将其导入你的 `app/layout.tsx`：

```tsx switcher
import '../index.css'

export const metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
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

如果你使用 Tailwind CSS，请参阅我们的[安装文档](/nextjs-cn/app/guides/tailwind-css)。

### 步骤 6：创建入口点页面

Create React App 使用 `src/index.tsx`（或 `index.js`）作为入口点。在 Next.js（App Router）中，`app` 目录内的每个文件夹对应一个路由，每个文件夹应该有一个 `page.tsx`。

由于我们想暂时将应用程序保持为 SPA 并拦截**所有**路由，我们将使用[可选的全捕获路由](/nextjs-cn/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments)。

1. **在 `app` 内创建一个 `[[...slug]]` 目录。**

```bash
app
 ┣ [[...slug]]
 ┃ ┗ page.tsx
 ┣ layout.tsx
```

2. **在 `page.tsx` 中添加以下内容**：

```tsx switcher
export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return '...' // 我们将更新这个
}
```

```jsx switcher
export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return '...' // 我们将更新这个
}
```

这告诉 Next.js 为空 slug（`/`）生成单个路由，有效地将**所有**路由映射到同一个页面。这个页面是一个[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)，预渲染成静态 HTML。

### 步骤 7：添加仅客户端入口点

接下来，我们将把你的 CRA 根 App 组件嵌入到一个[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)中，以便所有逻辑保持在客户端。如果这是你第一次使用 Next.js，值得知道客户端组件（默认情况下）仍然在服务器上预渲染。你可以将它们视为具有运行客户端 JavaScript 的额外能力。

在 `app/[[...slug]]/` 中创建一个 `client.tsx`（或 `client.js`）：

```tsx switcher
'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return <App />
}
```

```jsx switcher
'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return <App />
}
```

- `'use client'` 指令使此文件成为**客户端组件**。
- 带有 `ssr: false` 的 `dynamic` 导入禁用 `<App />` 组件的服务器端渲染，使其真正只在客户端运行（SPA）。

现在更新你的 `page.tsx`（或 `page.js`）以使用你的新组件：

```tsx switcher
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

```jsx switcher
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

### 步骤 8：更新静态图像导入

在 CRA 中，导入图像文件会返回其公共 URL 作为字符串：

```tsx
import image from './img.png'

export default function App() {
  return <img src={image} />
}
```

在 Next.js 中，静态图像导入返回一个对象。然后可以直接将该对象用于 Next.js 的 [`<Image>` 组件](/nextjs-cn/app/api-reference/components/image)，或者可以将对象的 `src` 属性用于你现有的 `<img>` 标签。

`<Image>` 组件具有[自动图像优化](/nextjs-cn/app/api-reference/components/image)的额外好处。`<Image>` 组件会根据图像的尺寸自动设置生成的 `<img>` 的 `width` 和 `height` 属性。这可以防止图像加载时的布局偏移。然而，如果你的应用程序包含只有一个维度被样式化而另一个没有被样式化为 `auto` 的图像，这可能会导致问题。当未样式化为 `auto` 时，维度将默认为 `<img>` 维度属性的值，这可能导致图像看起来失真。

保留 `<img>` 标签将减少应用程序中的更改数量并防止上述问题。然后你可以选择稍后迁移到 `<Image>` 组件，通过[配置加载器](/nextjs-cn/app/api-reference/components/image#loader)利用图像优化，或者移动到具有自动图像优化功能的默认 Next.js 服务器。

**将从 `/public` 导入图像的绝对导入路径转换为相对导入：**

```tsx
// 之前
import logo from '/logo.png'

// 之后
import logo from '../public/logo.png'
```

**将图像的 `src` 属性而不是整个图像对象传递给你的 `<img>` 标签：**

```tsx
// 之前
<img src={logo} />

// 之后
<img src={logo.src} />
```

或者，你可以根据文件名引用图像资源的公共 URL。例如，`public/logo.png` 将为你的应用程序提供位于 `/logo.png` 的图像，这将是 `src` 值。

> **警告：** 如果你使用 TypeScript，在访问 `src` 属性时可能会遇到类型错误。要修复它们，你需要将 `next-env.d.ts` 添加到你的 `tsconfig.json` 文件的 [`include` 数组](https://www.typescriptlang.org/tsconfig#include)中。当你在步骤 9 中运行应用程序时，Next.js 将自动生成此文件。

### 步骤 9：迁移环境变量

Next.js 支持[环境变量]()，类似于 CRA，但**需要** `NEXT_PUBLIC_` 前缀用于你想在浏览器中公开的任何变量。

主要区别在于用于在客户端公开环境变量的前缀。将所有带有 `REACT_APP_` 前缀的环境变量更改为 `NEXT_PUBLIC_`。

### 步骤 10：更新 `package.json` 中的脚本

更新你的 `package.json` 脚本以使用 Next.js 命令。此外，将 `.next` 和 `next-env.d.ts` 添加到你的 `.gitignore` 中：

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "npx serve@latest ./build"
  }
}
```

```txt
# ...
.next
next-env.d.ts
```

现在你可以运行：

```bash
npm run dev
```

打开 localhost:3000。你应该会看到你的应用程序现在在 Next.js 上运行（在 SPA 模式下）。

### 步骤 11：清理

你现在可以删除特定于 Create React App 的构件：

- `public/index.html`
- `src/index.tsx`
- `src/react-app-env.d.ts`
- `reportWebVitals` 设置
- `react-scripts` 依赖项（从 `package.json` 中卸载它）

## 附加考虑事项

### 在 CRA 中使用自定义 `homepage`

如果你在 CRA 的 `package.json` 中使用了 `homepage` 字段来在特定子路径下提供应用程序，你可以在 `next.config.ts` 中使用 [`basePath` 配置](/nextjs-cn/app/api-reference/config/next-config-js/basePath) 在 Next.js 中复制这一行为：

```ts
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/my-subpath',
  // ...
}

export default nextConfig
```

### 处理自定义 `Service Worker`

如果你使用了 CRA 的服务工作线程（例如，来自 `create-react-app` 的 `serviceWorker.js`），你可以了解如何使用 Next.js 创建[渐进式 Web 应用程序 (PWAs)](/nextjs-cn/app/guides/progressive-web-apps)。

### 代理 API 请求

如果你的 CRA 应用程序在 `package.json` 中使用了 `proxy` 字段将请求转发到后端服务器，你可以在 `next.config.ts` 中使用 [Next.js 重写](/nextjs-cn/app/api-reference/config/next-config-js/rewrites) 复制这一功能：

```ts
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://your-backend.com/:path*',
      },
    ]
  },
}
```

### 自定义 Webpack / Babel 配置

如果你在 CRA 中有自定义的 webpack 或 Babel 配置，你可以在 `next.config.ts` 中扩展 Next.js 的配置：

```ts
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // 在此处修改 webpack 配置
    return config
  },
}

export default nextConfig
```

> **注意**：这将需要通过从你的 `dev` 脚本中移除 `--turbopack` 来禁用 Turbopack。

### TypeScript 设置

如果你有 `tsconfig.json`，Next.js 会自动设置 TypeScript。确保在你的 `tsconfig.json` 的 `include` 数组中列出了 `next-env.d.ts`：

```json
{
  "include": ["next-env.d.ts", "app/**/*", "src/**/*"]
}
```

## 打包器兼容性

Create React App 和 Next.js 都默认使用 webpack 进行打包。Next.js 还提供 [Turbopack](/nextjs-cn/app/api-reference/config/next-config-js/turbopack) 用于更快的本地开发：

```bash
next dev --turbopack
```

如果你需要从 CRA 迁移高级 webpack 设置，你仍然可以提供[自定义 webpack 配置](/nextjs-cn/app/api-reference/config/next-config-js/webpack)。

## 下一步

如果一切正常，你现在有一个作为单页应用程序运行的功能性 Next.js 应用程序。你还没有利用 Next.js 的功能，如服务器端渲染或基于文件的路由，但你现在可以逐步采用这些功能：

- **从 React Router 迁移**到 [Next.js App Router](/nextjs-cn/app/building-your-application/routing/index) 以获得：
  - 自动代码分割
  - [流式服务器渲染](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming)
  - [React 服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)
- **使用 [`<Image>` 组件](/nextjs-cn/app/api-reference/components/image) 优化图像**
- **使用 [`next/font`](/nextjs-cn/app/api-reference/components/font) 优化字体**
- **使用 [`<Script>` 组件](/nextjs-cn/app/building-your-application/routing/layouts-and-templates) 优化第三方脚本**
- **通过运行 `npx next lint` 启用 ESLint**，并配置它以匹配你项目的需求

> **注意**：使用静态导出（`output: 'export'`）[目前不支持](https://github.com/vercel/next.js/issues/54393) `useParams` 钩子或其他服务器功能。要使用所有 Next.js 功能，请从你的 `next.config.ts` 中删除 `output: 'export'`。
