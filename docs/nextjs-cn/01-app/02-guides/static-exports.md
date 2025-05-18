---
title: 如何创建 Next.js 应用程序的静态导出
nav_title: 静态导出
description: Next.js 允许从静态站点或单页应用程序 (SPA) 开始，然后以后可以选择升级以使用需要服务器的功能。
---

{/_ 本文档的内容在 app 和 pages 路由之间共享。你可以使用 `<PagesOnly>Content</PagesOnly>` 组件来添加特定于 Pages 路由的内容。任何共享内容都不应该被包装在组件中。 _/}

Next.js 允许从静态站点或单页应用程序 (SPA) 开始，然后以后可以选择升级以使用需要服务器的功能。

当运行 `next build` 时，Next.js 为每个路由生成一个 HTML 文件。通过将严格的 SPA 分解为单独的 HTML 文件，Next.js 可以避免在客户端加载不必要的 JavaScript 代码，减小包的大小并实现更快的页面加载。

由于 Next.js 支持这种静态导出，它可以部署和托管在任何能够提供 HTML/CSS/JS 静态资源的 Web 服务器上。

## 配置

要启用静态导出，请在 `next.config.js` 中更改输出模式：

```js filename="next.config.js" highlight={5}
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',

  // 可选：更改链接 `/me` -> `/me/` 并生成 `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // 可选：阻止自动 `/me` -> `/me/`，而是保留 `href`
  // skipTrailingSlashRedirect: true,

  // 可选：更改输出目录 `out` -> `dist`
  // distDir: 'dist',
}

module.exports = nextConfig
```

运行 `next build` 后，Next.js 将创建一个包含应用程序 HTML/CSS/JS 资源的 `out` 文件夹。

<PagesOnly>

你可以使用 [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props) 和 [`getStaticPaths`](/docs/pages/building-your-application/data-fetching/get-static-paths) 为 `pages` 目录中的每个页面（或对于[动态路由](/docs/app/building-your-application/routing/dynamic-routes)生成更多）生成一个 HTML 文件。

</PagesOnly>

<AppOnly>

## 支持的功能

Next.js 的核心设计支持静态导出。

### 服务器组件

当你运行 `next build` 生成静态导出时，`app` 目录中使用的服务器组件将在构建期间运行，类似于传统的静态站点生成。

生成的组件将被渲染为初始页面加载的静态 HTML 和路由之间客户端导航的静态负载。使用静态导出时，除非它们使用[动态服务器函数](#unsupported-features)，否则你的服务器组件不需要任何更改。

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  // 此获取将在 `next build` 期间在服务器上运行
  const res = await fetch('https://api.example.com/...')
  const data = await res.json()

  return <main>...</main>
}
```

### 客户端组件

如果你想在客户端执行数据获取，你可以使用带有 [SWR](https://github.com/vercel/swr) 的客户端组件来记忆请求。

```tsx filename="app/other/page.tsx" switcher
'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Page() {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts/1`, fetcher)
  if (error) return '加载失败'
  if (!data) return '加载中...'

  return data.title
}
```

```jsx filename="app/other/page.js" switcher
'use client'

import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Page() {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts/1`, fetcher)
  if (error) return '加载失败'
  if (!data) return '加载中...'

  return data.title
}
```

由于路由转换在客户端发生，这表现得像传统的 SPA。例如，以下索引路由允许你在客户端导航到不同的帖子：

```tsx filename="app/page.tsx" switcher
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1>索引页面</h1>
      <hr />
      <ul>
        <li>
          <Link href="/post/1">帖子 1</Link>
        </li>
        <li>
          <Link href="/post/2">帖子 2</Link>
        </li>
      </ul>
    </>
  )
}
```

```jsx filename="app/page.js" switcher
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1>索引页面</h1>
      <p>
        <Link href="/other">其他页面</Link>
      </p>
    </>
  )
}
```

</AppOnly>

<PagesOnly>

## 支持的功能

构建静态站点所需的大多数核心 Next.js 功能都受支持，包括：

- [使用 `getStaticPaths` 的动态路由](/docs/app/building-your-application/routing/dynamic-routes)
- 使用 `next/link` 预取
- 预加载 JavaScript
- [动态导入](/docs/pages/guides/lazy-loading)
- 任何样式选项（例如 CSS Modules、styled-jsx）
- [客户端数据获取](/docs/pages/building-your-application/data-fetching/client-side)
- [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props)
- [`getStaticPaths`](/docs/pages/building-your-application/data-fetching/get-static-paths)

</PagesOnly>

### 图像优化

通过 `next/image` 进行的[图像优化](/docs/app/api-reference/components/image)可以通过在 `next.config.js` 中定义自定义图像加载器与静态导出一起使用。例如，你可以使用 Cloudinary 等服务优化图像：

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
  },
}

module.exports = nextConfig
```

这个自定义加载器将定义如何从远程源获取图像。例如，以下加载器将构造 Cloudinary 的 URL：

```ts filename="my-loader.ts" switcher
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/demo/image/upload/${params.join(',')}${src}`
}
```

```js filename="my-loader.js" switcher
export default function cloudinaryLoader({ src, width, quality }) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/demo/image/upload/${params.join(',')}${src}`
}
```

然后，你可以在你的应用程序中使用 `next/image`，定义 Cloudinary 中图像的相对路径：

```tsx filename="app/page.tsx" switcher
import Image from 'next/image'

export default function Page() {
  return <Image alt="海龟" src="/turtles.jpg" width={300} height={300} />
}
```

```jsx filename="app/page.js" switcher
import Image from 'next/image'

export default function Page() {
  return <Image alt="海龟" src="/turtles.jpg" width={300} height={300} />
}
```

<AppOnly>

### 路由处理程序

路由处理程序在运行 `next build` 时将渲染静态响应。只支持 `GET` HTTP 动词。这可以用来从缓存或未缓存的数据生成静态 HTML、JSON、TXT 或其他文件。例如：

```ts filename="app/data.json/route.ts" switcher
export async function GET() {
  return Response.json({ name: 'Lee' })
}
```

```js filename="app/data.json/route.js" switcher
export async function GET() {
  return Response.json({ name: 'Lee' })
}
```

上述文件 `app/data.json/route.ts` 将在 `next build` 期间渲染为静态文件，生成包含 `{ name: 'Lee' }` 的 `data.json`。

如果你需要从传入请求中读取动态值，则不能使用静态导出。

### 浏览器 API

客户端组件在 `next build` 期间预渲染为 HTML。因为 [Web API](https://developer.mozilla.org/docs/Web/API) 如 `window`、`localStorage` 和 `navigator` 在服务器上不可用，你需要仅在浏览器中运行时安全地访问这些 API。例如：

```jsx
'use client';

import { useEffect } from 'react';

export default function ClientComponent() {
  useEffect(() => {
    // 现在你可以访问 `window`
    console.log(window.innerHeight);
  }, [])

  return ...;
}
```

</AppOnly>

## 不支持的功能

需要 Node.js 服务器或无法在构建过程中计算的动态逻辑的功能**不**受支持：

<AppOnly>

- 带有 `dynamicParams: true` 的[动态路由](/docs/app/building-your-application/routing/dynamic-routes)
- 没有 `generateStaticParams()` 的[动态路由](/docs/app/building-your-application/routing/dynamic-routes)
- 依赖于 Request 的[路由处理程序](/docs/app/building-your-application/routing/route-handlers)
- [Cookies](/docs/app/api-reference/functions/cookies)
- [重写](/docs/app/api-reference/config/next-config-js/rewrites)
- [重定向](/docs/app/api-reference/config/next-config-js/redirects)
- [头信息](/docs/app/api-reference/config/next-config-js/headers)
- [中间件](/docs/app/building-your-application/routing/middleware)
- [增量静态再生成](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- 使用默认 `loader` 的[图像优化](/docs/app/api-reference/components/image)
- [草稿模式](/docs/app/guides/draft-mode)
- [服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [拦截路由](/docs/app/building-your-application/routing/intercepting-routes)

使用 `next dev` 尝试使用这些功能中的任何一个将导致错误，类似于在根布局中设置 [`dynamic`](/docs/app/api-reference/file-conventions/route-segment-config#dynamic) 选项为 `error`。

```jsx
export const dynamic = 'error'
```

</AppOnly>

<PagesOnly>

- [国际化路由](/docs/pages/building-your-application/routing/internationalization)
- [API 路由](/docs/pages/building-your-application/routing/api-routes)
- [重写](/docs/pages/api-reference/config/next-config-js/rewrites)
- [重定向](/docs/pages/api-reference/config/next-config-js/redirects)
- [头信息](/docs/pages/api-reference/config/next-config-js/headers)
- [中间件](/docs/pages/building-your-application/routing/middleware)
- [增量静态再生成](/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)
- 使用默认 `loader` 的[图像优化](/docs/pages/api-reference/components/image)
- [草稿模式](/docs/pages/guides/draft-mode)
- [带有 `fallback: true` 的 `getStaticPaths`](/docs/pages/api-reference/functions/get-static-paths#fallback-true)
- [带有 `fallback: 'blocking'` 的 `getStaticPaths`](/docs/pages/api-reference/functions/get-static-paths#fallback-blocking)
- [`getServerSideProps`](/docs/pages/building-your-application/data-fetching/get-server-side-props)

</PagesOnly>

## 部署

使用静态导出，Next.js 可以部署和托管在任何能够提供 HTML/CSS/JS 静态资源的 Web 服务器上。

运行 `next build` 时，Next.js 将静态导出生成到 `out` 文件夹中。例如，假设你有以下路由：

- `/`
- `/blog/[id]`

运行 `next build` 后，Next.js 将生成以下文件：

- `/out/index.html`
- `/out/404.html`
- `/out/blog/post-1.html`
- `/out/blog/post-2.html`

如果你使用像 Nginx 这样的静态主机，你可以配置从传入请求到正确文件的重写：

```nginx filename="nginx.conf"
server {
  listen 80;
  server_name acme.com;

  root /var/www/out;

  location / {
      try_files $uri $uri.html $uri/ =404;
  }

  # 当 `trailingSlash: false` 时这是必需的。
  # 当 `trailingSlash: true` 时你可以省略这个。
  location /blog/ {
      rewrite ^/blog/(.*)$ /blog/$1.html break;
  }

  error_page 404 /404.html;
  location = /404.html {
      internal;
  }
}
```

## 版本历史

| 版本      | 变更                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| `v14.0.0` | `next export` 已被移除，转而使用 `"output": "export"`                                   |
| `v13.4.0` | App Router（稳定版）添加了增强的静态导出支持，包括使用 React 服务器组件和路由处理程序。 |
| `v13.3.0` | `next export` 已弃用，替换为 `"output": "export"`                                       |
