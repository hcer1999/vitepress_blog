---
title: 国际化
description: 添加对多语言的支持，包括国际化路由和本地化内容。
---

Next.js 使您能够配置路由和内容渲染以支持多种语言。使您的网站适应不同地区包括翻译内容（本地化）和国际化路由。

## 术语

- **区域设置（Locale）:** 一组语言和格式化偏好的标识符。这通常包括用户的首选语言，可能还包括其地理区域。
  - `en-US`: 美国使用的英语
  - `nl-NL`: 荷兰使用的荷兰语
  - `nl`: 荷兰语，无特定区域

## 路由概述

建议使用浏览器中的用户语言偏好来选择要使用的区域设置。更改您的首选语言将修改发送到应用程序的 `Accept-Language` 请求头。

例如，使用以下库，您可以检查传入的 `Request` 来确定要选择的区域设置，基于 `Headers`、您计划支持的区域设置和默认区域设置。

```js filename="middleware.js"
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en-US', 'nl-NL', 'nl']
let defaultLocale = 'en-US'

match(languages, locales, defaultLocale) // -> 'en-US'
```

路由可以通过子路径（`/fr/products`）或域名（`my-site.fr/products`）进行国际化。有了这些信息，您现在可以在[中间件](/docs/app/building-your-application/routing/middleware)中基于区域设置重定向用户。

```js filename="middleware.js"
import { NextResponse } from "next/server";

let locales = ['en-US', 'nl-NL', 'nl']

// 获取首选区域设置，类似于上述方法或使用库
function getLocale(request) { ... }

export function middleware(request) {
  // 检查路径中是否有任何支持的区域设置
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 如果没有区域设置则重定向
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // 例如，传入请求是 /products
  // 新的 URL 现在是 /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)
    '/((?!_next).*)',
    // 可选：仅在根 (/) URL 上运行
    // '/'
  ],
}
```

最后，确保 `app/` 内的所有特殊文件都嵌套在 `app/[lang]` 下。这使 Next.js 路由器能够在路由中动态处理不同的区域设置，并将 `lang` 参数转发到每个布局和页面。例如：

```tsx filename="app/[lang]/page.tsx" switcher
// 现在您可以访问当前区域设置
// 例如，/en-US/products -> `lang` 是 "en-US"
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return ...
}
```

```jsx filename="app/[lang]/page.js" switcher
// 现在您可以访问当前区域设置
// 例如，/en-US/products -> `lang` 是 "en-US"
export default async function Page({ params }) {
  const { lang } = await params
  return ...
}
```

根布局也可以嵌套在新文件夹中（例如 `app/[lang]/layout.js`）。

## 本地化

根据用户的首选区域设置更改显示内容，或称为本地化，并不是 Next.js 特有的。下面描述的模式在任何 Web 应用程序中都是相同的。

假设我们想在应用程序中支持英语和荷兰语内容。我们可能会维护两个不同的"字典"，这些字典是对象，为我们提供从某个键到本地化字符串的映射。例如：

```json filename="dictionaries/en.json"
{
  "products": {
    "cart": "Add to Cart"
  }
}
```

```json filename="dictionaries/nl.json"
{
  "products": {
    "cart": "Toevoegen aan Winkelwagen"
  }
}
```

然后我们可以创建一个 `getDictionary` 函数来加载请求区域设置的翻译：

```ts filename="app/[lang]/dictionaries.ts" switcher
import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'nl') => dictionaries[locale]()
```

```js filename="app/[lang]/dictionaries.js" switcher
import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}

export const getDictionary = async (locale) => dictionaries[locale]()
```

根据当前选择的语言，我们可以在布局或页面中获取字典。

```tsx filename="app/[lang]/page.tsx" switcher
import { getDictionary } from './dictionaries'

export default async function Page({ params }: { params: Promise<{ lang: 'en' | 'nl' }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang) // en
  return <button>{dict.products.cart}</button> // Add to Cart
}
```

```jsx filename="app/[lang]/page.js" switcher
import { getDictionary } from './dictionaries'

export default async function Page({ params }) {
  const { lang } = await params
  const dict = await getDictionary(lang) // en
  return <button>{dict.products.cart}</button> // Add to Cart
}
```

因为 `app/` 目录中的所有布局和页面默认为[服务器组件](/docs/app/building-your-application/rendering/server-components)，我们不需要担心翻译文件的大小影响我们的客户端 JavaScript 包大小。这段代码将**仅在服务器上运行**，只有生成的 HTML 会被发送到浏览器。

## 静态生成

要为给定的一组区域设置生成静态路由，我们可以在任何页面或布局中使用 `generateStaticParams`。这可以是全局的，例如，在根布局中：

```tsx filename="app/[lang]/layout.tsx" switcher
export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en-US' | 'de' }>
}>) {
  return (
    <html lang={(await params).lang}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx filename="app/[lang]/layout.js" switcher
export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }]
}

export default async function RootLayout({ children, params }) {
  return (
    <html lang={(await params).lang}>
      <body>{children}</body>
    </html>
  )
}
```

## 资源

- [最小化 i18n 路由和翻译](https://github.com/vercel/next.js/tree/canary/examples/i18n-routing)
- [`next-intl`](https://next-intl.dev)
- [`next-international`](https://github.com/QuiiBz/next-international)
- [`next-i18n-router`](https://github.com/i18nexus/next-i18n-router)
- [`paraglide-next`](https://inlang.com/m/osslbuzt/paraglide-next-i18n)
- [`lingui`](https://lingui.dev)
