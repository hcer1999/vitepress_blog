---
title: 如何升级到第 15 版
nav_title: 第 15 版
description: 将你的 Next.js 应用程序从第 14 版升级到第 15 版。
---

## 从第 14 版升级到第 15 版

要更新到 Next.js 第 15 版，你可以使用 `upgrade` 代码修改工具：

```bash
npx @next/codemod@canary upgrade latest
```

如果你更喜欢手动操作，请确保安装最新的 Next 和 React 版本：

```bash
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

> **提示：**
>
> - 如果你看到对等依赖警告，你可能需要将 `react` 和 `react-dom` 更新到建议的版本，或者使用 `--force` 或 `--legacy-peer-deps` 标志忽略警告。一旦 Next.js 15 和 React 19 都稳定后，这将不再必要。

## React 19

- `react` 和 `react-dom` 的最低版本现在是 19。
- `useFormState` 已被 `useActionState` 替代。`useFormState` 钩子在 React 19 中仍然可用，但已被弃用，将在未来版本中移除。推荐使用 `useActionState`，它包含额外的属性，如直接读取 `pending` 状态。[了解更多](https://react.dev/reference/react/useActionState)。
- `useFormStatus` 现在包含额外的键，如 `data`、`method` 和 `action`。如果你不使用 React 19，则只有 `pending` 键可用。[了解更多](https://react.dev/reference/react-dom/hooks/useFormStatus)。
- 在 [React 19 升级指南](https://react.dev/blog/2024/04/25/react-upgrade-guide)中阅读更多内容。

> **提示：** 如果你使用的是 TypeScript，请确保也将 `@types/react` 和 `@types/react-dom` 升级到最新版本。

## 异步请求 API（破坏性变更）

以前依赖运行时信息的同步动态 API 现在是**异步的**：

- [`cookies`](/nextjs-cn/app/api-reference/functions/cookies)
- [`headers`](/nextjs-cn/app/api-reference/functions/headers)
- [`draftMode`](/nextjs-cn/app/api-reference/functions/draft-mode)
- [`params`] (/nextjs-cn/app/api-reference/file-conventions/layout)、[`page.js`](/nextjs-cn/app/api-reference/file-conventions/page)、[`route.js`](/nextjs-cn/app/api-reference/file-conventions/route)、[`default.js`](/nextjs-cn/app/api-reference/file-conventions/default)、[`opengraph-image`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)、[`twitter-image`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)、[`icon`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons) 和 [`apple-icon`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons) 中。
- [`searchParams`](/nextjs-cn/app/api-reference/file-conventions/page) 中
  为了减轻迁移负担，提供了一个[代码修改工具](/nextjs-cn/app/guides/upgrading/codemods#150)来自动化这个过程，并且可以临时同步访问这些 API。

### `cookies`

#### 推荐的异步用法

```tsx
import { cookies } from 'next/headers'

// 之前
const cookieStore = cookies()
const token = cookieStore.get('token')

// 之后
const cookieStore = await cookies()
const token = cookieStore.get('token')
```

#### 临时同步用法

```tsx
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'

// 之前
const cookieStore = cookies()
const token = cookieStore.get('token')

// 之后
const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
// 在开发环境中会输出警告
const token = cookieStore.get('token')
```

```jsx
import { cookies } from 'next/headers'

// 之前
const cookieStore = cookies()
const token = cookieStore.get('token')

// 之后
const cookieStore = cookies()
// 在开发环境中会输出警告
const token = cookieStore.get('token')
```

### `headers`

#### 推荐的异步用法

```tsx
import { headers } from 'next/headers'

// 之前
const headersList = headers()
const userAgent = headersList.get('user-agent')

// 之后
const headersList = await headers()
const userAgent = headersList.get('user-agent')
```

#### 临时同步用法

```tsx
import { headers, type UnsafeUnwrappedHeaders } from 'next/headers'

// 之前
const headersList = headers()
const userAgent = headersList.get('user-agent')

// 之后
const headersList = headers() as unknown as UnsafeUnwrappedHeaders
// 在开发环境中会输出警告
const userAgent = headersList.get('user-agent')
```

```jsx
import { headers } from 'next/headers'

// 之前
const headersList = headers()
const userAgent = headersList.get('user-agent')

// 之后
const headersList = headers()
// 在开发环境中会输出警告
const userAgent = headersList.get('user-agent')
```

### `draftMode`

#### 推荐的异步用法

```tsx
import { draftMode } from 'next/headers'

// 之前
const { isEnabled } = draftMode()

// 之后
const { isEnabled } = await draftMode()
```

#### 临时同步用法

```tsx
import { draftMode, type UnsafeUnwrappedDraftMode } from 'next/headers'

// 之前
const { isEnabled } = draftMode()

// 之后
// 在开发环境中会输出警告
const { isEnabled } = draftMode() as unknown as UnsafeUnwrappedDraftMode
```

```jsx
import { draftMode } from 'next/headers'

// 之前
const { isEnabled } = draftMode()

// 之后
// 在开发环境中会输出警告
const { isEnabled } = draftMode()
```

### `params` 和 `searchParams`

#### 异步布局

```tsx
// 之前
type Params = { slug: string }

export function generateMetadata({ params }: { params: Params }) {
  const { slug } = params
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = params
}

// 之后
type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = await params
}
```

```jsx
// 之前
export function generateMetadata({ params }) {
  const { slug } = params
}

export default async function Layout({ children, params }) {
  const { slug } = params
}

// 之后
export async function generateMetadata({ params }) {
  const { slug } = await params
}

export default async function Layout({ children, params }) {
  const { slug } = await params
}
```

#### 同步布局

```tsx
// 之前
type Params = { slug: string }

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = params
}

// 之后
import { use } from 'react'

type Params = Promise<{ slug: string }>

export default function Layout(props: { children: React.ReactNode; params: Params }) {
  const params = use(props.params)
  const slug = params.slug
}
```

```jsx
// 之前
export default function Layout({ children, params }) {
  const { slug } = params
}

// 之后
import { use } from 'react'
export default async function Layout(props) {
  const params = use(props.params)
  const slug = params.slug
}

```

#### 异步页面

```tsx
// 之前
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export function generateMetadata({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
}

// 之后
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}

export default async function Page(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

```jsx
// 之前
export function generateMetadata({ params, searchParams }) {
  const { slug } = params
  const { query } = searchParams
}

export default function Page({ params, searchParams }) {
  const { slug } = params
  const { query } = searchParams
}

// 之后
export async function generateMetadata(props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}

export async function Page(props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

#### 同步页面

```tsx
'use client'

// 之前
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
}

// 之后
import { use } from 'react'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function Page(props: { params: Params; searchParams: SearchParams }) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const slug = params.slug
  const query = searchParams.query
}
```

```jsx
// 之前
export default function Page({ params, searchParams }) {
  const { slug } = params
  const { query } = searchParams
}

// 之后
import { use } from "react"

export default function Page(props) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const slug = params.slug
  const query = searchParams.query
}

```

#### 路由处理程序

```tsx
// 之前
type Params = { slug: string }

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = segmentData.params
  const slug = params.slug
}

// 之后
type Params = Promise<{ slug: string }>

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params
  const slug = params.slug
}
```

```js
// 之前
export async function GET(request, segmentData) {
  const params = segmentData.params
  const slug = params.slug
}

// 之后
export async function GET(request, segmentData) {
  const params = await segmentData.params
  const slug = params.slug
}
```

<AppOnly>

## `runtime` 配置（破坏性变更）

[段配置](/nextjs-cn/app/api-reference/file-conventions/route-segment-config#runtime)中的 `runtime` 之前支持除 `edge` 以外的 `experimental-edge` 值。这两种配置指的是同一件事，为了简化选项，如果使用 `experimental-edge` 我们现在会报错。要修复此问题，请将 `runtime` 配置更新为 `edge`。提供了一个[代码修改工具](/nextjs-cn/app/guides/upgrading/codemods#app-dir-runtime-config-experimental-edge)来自动执行此操作。

</AppOnly>

## `fetch` 请求

默认情况下，[`fetch` 请求](/nextjs-cn/app/api-reference/functions/fetch)不再被缓存。

要使特定的 `fetch` 请求选择缓/nextjs-cn/'force-cache'` 选项。

```js
export default async function RootLayout() {
  const a = await fetch('https://...') // 不缓存
  const b = await fetch('https://...', { cache: 'force-cache' }) // 缓存

  // ...
}
```

要使布局或页面中的所有 `fetch` 请求选择缓存，你可以使用 `export const fetchCache = 'default-cache'` [段配置选项](/nextjs-cn/app/api-reference/file-conventions/route-segment-config)。如果单个 `fetch` 请求指定了 `cache` 选项，则将使用该选项。

```js
// 由于这是根布局，应用程序中所有未设置自己的缓存选项的 fetch 请求都将被缓存。
export const fetchCache = 'default-cache'

export default async function RootLayout() {
  const a = await fetch('https://...') // 缓存
  const b = await fetch('https://...', { cache: 'no-store' }) // 不缓存

  // ...
}
```

## 路由处理程序

默认情况下，[路由处理程序](/nextjs-cn/app/api-reference/file-conventions/route)中的 `GET` 函数不再被缓存。要使 `GET` 方法选择缓存，你可以在路由处理程序文件中使用 [路由配置选项](/nextjs-cn/app/api-reference/file-conventions/route-segment-config)，如 `export const dynamic = 'force-static'`。

```js
export const dynamic = 'force-static'

export async function GET() {}
```

## 客户端路由器缓存

通过 `<Link>` 或 `useRouter` 在页面之间导航时，[页面](/nextjs-cn/app/api-reference/file-conventions/page)段不再从客户端路由器缓存中重用。但是，它们在浏览器的后退和前进导航以及共享布局中仍然被重用。

要让页面段选择缓存，你可以使用 [`staleTimes`](/nextjs-cn/app/api-reference/config/next-config-js/staleTimes) 配置选项：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}

module.exports = nextConfig
```

在导航时，[布局](/nextjs-cn/app/api-reference/file-conventions/layout)和[加载状态](/nextjs-cn/app/api-reference/file-conventions/loading)仍然被缓存和重用。

## next/font

`@next/font` 包已被移除，改为使用内置的 [`next/font`](/nextjs-cn/app/api-reference/components/font)。有一个[代码修改工具](/nextjs-cn/app/guides/upgrading/codemods#built-in-next-font)可以安全自动地重命名你的导入。

```js
// 之前
import { Inter } from '@next/font/google'

// 之后
import { Inter } from 'next/font/google'
```

## bundlePagesRouterDependencies

`experimental.bundlePagesExternals` 现在已稳定，并更名为 `bundlePagesRouterDependencies`。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 之前
  experimental: {
    bundlePagesExternals: true,
  },

  // 之后
  bundlePagesRouterDependencies: true,
}

module.exports = nextConfig
```

## serverExternalPackages

`experimental.serverComponentsExternalPackages` 现在已稳定，并更名为 `serverExternalPackages`。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 之前
  experimental: {
    serverComponentsExternalPackages: ['package-name'],
  },

  // 之后
  serverExternalPackages: ['package-name'],
}

module.exports = nextConfig
```

## Speed Insights

Next.js 15 中移除了 Speed Insights 的自动检测。

要继续使用 Speed Insights，请按照 [Vercel Speed Insights 快速入门](https://vercel.com/docs/speed-insights/quickstart) 指南进行操作。

## `NextRequest` 地理位置

`NextRequest` 上的 `geo` 和 `ip` 属性已被移除，因为这些值由你的托管提供商提供。提供了一个[代码修改工具](/nextjs-cn/app/guides/upgrading/codemods#150)来自动化此迁移。

如果你使用 Vercel，你可以使用 [`@vercel/functions`](https://vercel.com/docs/fu/nextjs-cn/unctions-package) 中的 `geolocation` 和 `ipAddress` 函数：

```ts
import { geolocation } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { city } = geolocation(request)

  // ...
}
```

```ts
import { ipAddress } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ip = ipAddress(request)

  // ...
}
```
