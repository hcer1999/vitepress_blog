---
title: 代码修改工具
description: 当新功能发布时，使用代码修改工具升级你的 Next.js 代码库。
---

代码修改工具（Codemods）是在你的代码库上以编程方式运行的转换。这允许在不必手动检查每个文件的情况下，以编程方式应用大量更改。

Next.js 提供代码修改工具转换，帮助在 API 更新或弃用时升级你的 Next.js 代码库。

## 使用方法

在终端中，导航（`cd`）到你项目的文件夹，然后运行：

```bash
npx @next/codemod <transform> <path>
```

将 `<transform>` 和 `<path>` 替换为适当的值。

- `transform` - 转换的名称
- `path` - 要转换的文件或目录
- `--dry` 进行试运行，不会编辑任何代码
- `--print` 打印更改后的输出以进行比较

## 代码修改工具

### 15.0

#### 将 App Router 路由段配置 `runtime` 值从 `experimental-edge` 转换为 `edge`

##### `app-dir-runtime-config-experimental-edge`

> **注意**：此代码修改工具仅适用于 App Router。

```bash
npx @next/codemod@latest app-dir-runtime-config-experimental-edge .
```

此代码修改工具将[路由段配置 `runtime`](/docs/nextjs-cn/nextjs-cn/app/api-reference/file-conventions/route-segment-config#runtime) 值 `experimental-edge` 转换为 `edge`。

例如：

```ts
export const runtime = 'experimental-edge'
```

转换为：

```ts
export const runtime = 'edge'
```

#### 迁移到异步动态 API

之前支持同步访问的动态渲染 API 现在是异步的。你可以在[升级指南](/docs/nextjs-cn/app/guides/upgrading/version-15)中阅读有关此破坏性变更的更多信息。

##### `next-async-request-api`

```bash
npx @next/codemod@latest next-async-request-api .
```

此代码修改工具会将现在是异步的动态 API（来自 `next/headers` 的 `cookies()`、`headers()` 和 `draftMode()`）转换为正确地等待或在适用的情况下用 `React.use()` 包装。
当无法自动迁移时，代码修改工具会添加类型转换（如果是 TypeScript 文件）或注释，告知用户需要手动检查和更新。

例如：

```tsx
import { cookies, headers } from 'next/headers'
const token = cookies().get('token')

function useToken() {
  const token = cookies().get('token')
  return token
}

export default function Page() {
  const name = cookies().get('name')
}

function getHeader() {
  return headers().get('x-foo')
}
```

转换为：

```tsx
import { use } from 'react'
import {
  cookies,
  headers,
  type UnsafeUnwrappedCookies,
  type UnsafeUnwrappedHeaders,
} from 'next/headers'
const token = (cookies() as unknown as UnsafeUnwrappedCookies).get('token')

function useToken() {
  const token = use(cookies()).get('token')
  return token
}

export default async function Page() {
  const name = (await cookies()).get('name')
}

function getHeader() {
  return (headers() as unknown as UnsafeUnwrappedHeaders).get('x-foo')
}
```

当我们检测到页面/路由条目（`page.js`、`layout.js`、`route.js` 或 `default.js`）或 `generateMetadata` / `generateViewport` API 中对 `params` 或 `searchParams` 属性的访问时，它将尝试将调用点从同步函数转换为异步函数，并等待属性访问。如果无法使其异步（例如在客户端组件中），它将使用 `React.use` 来解包 promise。

例如：

```tsx
// page.tsx
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { value } = searchParams
  if (value === 'foo') {
    // ...
  }
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  return {
    title: `My Page - ${slug}`,
  }
}
```

转换为：

```tsx
// page.tsx
export default async function Page(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const { value } = searchParams
  if (value === 'foo') {
    // ...
  }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const { slug } = params
  return {
    title: `My Page - ${slug}`,
  }
}
```

> **提示：** 当此代码修改工具识别出可能需要手动干预但我们无法确定确切修复方法的地方时，它会在代码中添加注释或类型转换，通知用户需要手动更新。这些注释以 **@next/codemod** 为前缀，类型转换以 `UnsafeUnwrapped` 为前缀。
> 在这些注释被明确删除之前，你的构建将会出错。[阅读更多](/docs/messages/sync-dynamic-apis)。

#### 用 `@vercel/functions` 替换 `NextRequest` 的 `geo` 和 `ip` 属性

##### `next-request-geo-ip`

```bash
npx @next/codemod@latest next-request-geo-ip .
```

此代码修改工具安装 `@vercel/functions` 并将 `NextRequest` 的 `geo` 和 `ip` 属性转换为相应的 `@vercel/functions` 功能。

例如：

```ts
import type { NextRequest } from 'next/server'

export function GET(req: NextRequest) {
  const { geo, ip } = req
}
```

转换为：

```ts
import type { NextRequest } from 'next/server'
import { geolocation, ipAddress } from '@vercel/functions'

export function GET(req: NextRequest) {
  const geo = geolocation(req)
  const ip = ipAddress(req)
}
```

### 14.0

#### 迁移 `ImageResponse` 导入

##### `next-og-import`

```bash
npx @next/codemod@latest next-og-import .
```

此代码修改工具将 [动态 OG 图像生成](/docs/nextjs-cn/app/getting-started/metadata-and-og-images#generated-open-graph-images) 的导入从 `next/server` 移至 `next/og`。

例如：

```js
import { ImageResponse } from 'next/server'
```

转换为：

```js
import { ImageResponse } from 'next/og'
```

#### 使用 `viewport` 导出

##### `metadata-to-viewport-export`

```bash
npx @next/codemod@latest metadata-to-viewport-export .
```

此代码修改工具将某些视口元数据迁移到 `viewport` 导出。

例如：

```js
export const metadata = {
  title: 'My App',
  themeColor: 'dark',
  viewport: {
    width: 1,
  },
}
```

转换为：

```js
export const metadata = {
  title: 'My App',
}

export const viewport = {
  width: 1,
  themeColor: 'dark',
}
```

### 13.2

#### 使用内置字体

##### `built-in-next-font`

```bash
npx @next/codemod@latest built-in-next-font .
```

此代码修改工具卸载 `@next/font` 包并将 `@next/font` 导入转换为内置的 `next/font`。

例如：

```js
import { Inter } from '@next/font/google'
```

转换为：

```js
import { Inter } from 'next/font/google'
```

### 13.0

#### 重命名 Next Image 导入

##### `next-image-to-legacy-image`

```bash
npx @next/codemod@latest next-image-to-legacy-image .
```

安全地将现有 Next.js 10、11 或 12 应用程序中的 `next/image` 导入重命名为 Next.js 13 中的 `next/legacy/image`。同时将 `next/future/image` 重命名为 `next/image`。

例如：

```jsx
import Image1 from 'next/image'
import Image2 from 'next/future/image'

export default function Home() {
  return (
    <div>
      <Image1 src="/test.jpg" width="200" height="300" />
      <Image2 src="/test.png" width="500" height="400" />
    </div>
  )
}
```

转换为：

```jsx
// 'next/image' 变为 'next/legacy/image'
import Image1 from 'next/legacy/image'
// 'next/future/image' 变为 'next/image'
import Image2 from 'next/image'

export default function Home() {
  return (
    <div>
      <Image1 src="/test.jpg" width="200" height="300" />
      <Image2 src="/test.png" width="500" height="400" />
    </div>
  )
}
```

#### 迁移到新的 Image 组件

##### `next-image-experimental`

```bash
npx @next/codemod@latest next-image-experimental .
```

危险地从 `next/legacy/image` 迁移到新的 `next/image`，通过添加内联样式并移除未使用的属性。

- 移除 `layout` 属性并添加 `style`。
- 移除 `objectFit` 属性并添加 `style`。
- 移除 `objectPosition` 属性并添加 `style`。
- 移除 `lazyBoundary` 属性。
- 移除 `lazyRoot` 属性。

#### 从 Link 组件中移除 `<a>` 标签

##### `new-link`

```bash
npx @next/codemod@latest new-link .
```

<AppOnly>

从 [Link 组件](/docs/nextjs-cn/app/api-reference/components/link) 中移除 `<a>` 标签，或为无法自动修复的 Link 添加 `legacyBehavior` 属性。

</AppOnly>

<PagesOnly>

从 [Link 组件](/docs/nextjs-cn/pages/api-reference/components/link) 中移除 `<a>` 标签，或为无法自动修复的 Link 添加 `legacyBehavior` 属性。

</PagesOnly>

例如：

```jsx
<Link href="/about">
  <a>About</a>
</Link>
// 转换为
<Link href="/about">
  About
</Link>

<Link href="/about">
  <a onClick={() => console.log('clicked')}>About</a>
</Link>
// 转换为
<Link href="/about" onClick={() => console.log('clicked')}>
  About
</Link>
```

在无法应用自动修复的情况下，会添加 `legacyBehavior` 属性。这允许你的应用程序继续使用该特定链接的旧行为。

```jsx
const Component = () => <a>About</a>

<Link href="/about">
  <Component />
</Link>
// 变为
<Link href="/about" legacyBehavior>
  <Component />
</Link>
```

### 11

#### 从 CRA 迁移

##### `cra-to-next`

```bash
npx @next/codemod cra-to-next
```

将 Create React App 项目迁移到 Next.js；创建一个 Pages Router 和必要的配置以匹配行为。最初利用仅客户端渲染来防止由于 SSR 期间使用 `window` 而破坏兼容性，并且可以无缝启用以允许逐步采用 Next.js 特定功能。

请在[此讨论](https://github.com/vercel/next.js/discussions/25858)中分享与此转换相关的任何反馈。

### 10

#### 添加 React 导入

##### `add-missing-react-import`

```bash
npx @next/codemod add-missing-react-import
```

转换不导入 `React` 的文件以包含导入，以便新的 [React JSX 转换](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) 能够工作。

例如：

```jsx
export default class Home extends React.Component {
  render() {
    return <div>Hello World</div>
  }
}
```

转换为：

```jsx
import React from 'react'
export default class Home extends React.Component {
  render() {
    return <div>Hello World</div>
  }
}
```

### 9

#### 将匿名组件转换为命名组件

##### `name-default-component`

```bash
npx @next/codemod name-default-component
```

**版本 9 及以上。**

将匿名组件转换为命名组件，以确保它们与 [Fast Refresh](https://nextjs.org/blog/next-4#fast-refresh) 一起工作。

例如：

```jsx
export default function () {
  return <div>Hello World</div>
}
```

转换为：

```jsx
export default function MyComponent() {
  return <div>Hello World</div>
}
```

该组件将根据文件名具有驼峰式命名，它也适用于箭头函数。

### 8

#### 将 AMP HOC 转换为页面配置

##### `withamp-to-config`

```bash
npx @next/codemod withamp-to-config
```

将 `withAmp` HOC 转换为 Next.js 9 页面配置。

例如：

```js
// 之前
import { withAmp } from 'next/amp'

function Home() {
  return <h1>My AMP Page</h1>
}

export default withAmp(Home)
```

```js
// 之后
export default function Home() {
  return <h1>My AMP Page</h1>
}

export const config = {
  amp: true,
}
```

### 6

#### 使用 `withRouter`

##### `url-to-withrouter`

```bash
npx @next/codemod url-to-withrouter
```

转换已弃用的自动注入到顶级页面的 `url` 属性，使用 `withRouter` 和它注入的 `router` 属性。在此处阅读更多信息：[https://nextjs.org/docs/messages/url-deprecated](/docs/messages/url-deprecated)

例如：

```js
import React from 'react'
export default class extends React.Component {
  render() {
    const { pathname } = this.props.url
    return <div>Current pathname: {pathname}</div>
  }
}
```

```js
import React from 'react'
import { withRouter } from 'next/router'
export default withRouter(
  class extends React.Component {
    render() {
      const { pathname } = this.props.router
      return <div>Current pathname: {pathname}</div>
    }
  },
)
```

这只是一种情况。所有被转换（和测试）的情况都可以在 [`__testfixtures__` 目录](https://github.com/vercel/next.js/tree/canary/packages/next-codemod/transforms/__testfixtures__/url-to-withrouter) 中找到。
