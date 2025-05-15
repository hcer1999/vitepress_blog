---
title: Next.js 中文文档 - 国际化
description: 为你的Next.js应用添加国际化（i18n）支持
---

# Next.js 中文文档 - 国际化（i18n）

Next.js使你能够配置内容的国际化（i18n）路由和渲染。使应用程序适配不同的语言和地区需要两个主要步骤：

1. 路由：将用户引导到他们首选语言的正确版本
2. 翻译：为不同的语言提供翻译的字符串和格式化的日期、数字等内容

本页将介绍如何在App Router中为应用程序实现国际化。

## 路由方法

有两种主要的路由国际化方法：

1. **子路径路由**：将语言添加到URL路径中（例如`/fr/products`）
2. **域名路由**：使用不同的域名为每种语言提供内容（例如`my-product.fr`）

Next.js支持这两种方法。以下是如何实现它们的指南：

### 子路径路由

通过自定义中间件（middleware）功能可以轻松实现子路径路由：

```tsx
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// 支持的语言列表
const locales = ['en', 'zh', 'fr', 'de', 'ja']

// 获取请求的本地语言（如果存在）
function getLocale(request: NextRequest) {
  // 从cookie、header或其他地方获取语言偏好
  const acceptLanguage = request.headers.get('accept-language') ?? 'en'
  return acceptLanguage.split(',')[0].split('-')[0]
}

export function middleware(request: NextRequest) {
  // 检查请求路径是否已经包含语言
  const pathname = request.nextUrl.pathname

  // `/_next/` and `/api/` 是Next.js内部路径，不应重写
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/')
  ) {
    return NextResponse.next()
  }

  // 检查路径是否已经包含语言
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  // 重定向到用户首选语言的路径
  const locale = getLocale(request) ?? 'en'
  const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)

  // 保留原始的查询参数
  newUrl.search = request.nextUrl.search

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // 排除所有内部路径（/api, /_next）和静态资源
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

现在，即使用户访问`/products`，他们也会被重定向到`/en/products`或其他语言的版本。

### 域名路由

如果你想使用不同域名，可以根据主机名检测语言：

```tsx
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// 域名到语言的映射
const domainToLocaleMap = {
  'my-product.com': 'en',
  'my-product.fr': 'fr',
  'my-product.de': 'de',
  'my-product.jp': 'ja',
}

export function middleware(request: NextRequest) {
  // 获取主机名
  const { hostname } = request.nextUrl

  // 获取主机名对应的语言
  let locale = 'en' // 默认语言

  // 处理其他语言域名
  Object.entries(domainToLocaleMap).forEach(([domain, localeValue]) => {
    if (hostname === domain || hostname.endsWith(`.${domain}`)) {
      locale = localeValue
    }
  })

  // 获取请求路径
  const pathname = request.nextUrl.pathname

  // 处理默认情况
  return NextResponse.next()
}
```

## 检测用户语言偏好

有多种方法可以检测用户语言偏好：

### 1. 从`Accept-Language`头部

可以从浏览器发送的`Accept-Language`头部检测用户首选语言：

```tsx
// 从Accept-Language头部获取
function getLocaleFromHeader(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? 'en'
  const locales = acceptLanguage.split(',').map((l) => l.split(';')[0].trim())
  // 找到支持的第一种语言
  const supportedLocales = ['en', 'zh', 'fr', 'de', 'ja']
  return locales.find((l) => supportedLocales.includes(l)) ?? 'en'
}
```

### 2. 从Cookie

可以存储用户的语言偏好在Cookie中：

```tsx
// 从Cookie获取语言
function getLocaleFromCookie(request: NextRequest) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  return cookieLocale
}
```

### 3. 从用户账户

如果用户已登录，还可以从他们的账户设置中获取语言偏好：

```tsx
// 从用户账户中获取（需要服务器端API或数据库查询）
async function getLocaleFromUser(userId: string) {
  const user = await fetchUser(userId) // 示例函数
  return user?.preferredLanguage ?? 'en'
}
```

## 实现语言切换器

用户需要能够手动切换语言。下面是一个语言切换器的示例：

```tsx
// app/[locale]/components/language-switcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const locales = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value

    // 替换URL中的当前语言
    const currentPathname = pathname
    const segments = currentPathname.split('/')

    // 第一段是当前语言
    segments[1] = newLocale

    const newPathname = segments.join('/')

    startTransition(() => {
      router.push(newPathname)
    })
  }

  // 获取当前语言
  const currentLocale = pathname.split('/')[1]

  return (
    <div className={isPending ? 'language-switcher loading' : 'language-switcher'}>
      <select value={currentLocale} onChange={onSelectChange} disabled={isPending}>
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
    </div>
  )
}
```

## 翻译内容

有几种方式可以管理翻译内容：

### 1. 使用JSON字典

最简单的方法是创建包含所有翻译字符串的JSON文件：

```
// 文件结构
app/
├── [locale]/
│   ├── page.tsx
│   └── layout.tsx
├── dictionaries/
│   ├── en.json
│   ├── zh.json
│   ├── fr.json
│   ├── de.json
│   └── ja.json
└── ...
```

```json
// dictionaries/en.json
{
  "homepage": {
    "title": "Welcome to our website",
    "description": "Find everything you need here"
  },
  "products": {
    "title": "Our Products",
    "addToCart": "Add to Cart"
  }
}

// dictionaries/zh.json
{
  "homepage": {
    "title": "欢迎访问我们的网站",
    "description": "在这里找到你需要的一切"
  },
  "products": {
    "title": "我们的产品",
    "addToCart": "加入购物车"
  }
}
```

然后创建一个获取字典的函数：

```tsx
// lib/dictionaries.ts
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  zh: () => import('@/dictionaries/zh.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default),
}

export async function getDictionary(locale: string) {
  if (!Object.keys(dictionaries).includes(locale)) {
    locale = 'en' // 默认使用英语
  }
  return dictionaries[locale as keyof typeof dictionaries]()
}
```

在页面或组件中使用字典：

```tsx
// app/[locale]/page.tsx
import { getDictionary } from '@/lib/dictionaries'

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale)

  return (
    <main>
      <h1>{dict.homepage.title}</h1>
      <p>{dict.homepage.description}</p>
    </main>
  )
}
```

### 2. 使用i18n库

对于更复杂的需求，可以使用专业的i18n库，例如`react-intl`、`i18next`或`next-intl`：

```tsx
// 使用next-intl示例
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }, { locale: 'fr' }]
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages

  try {
    messages = (await import(`@/dictionaries/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

然后在组件中使用：

```tsx
'use client'

import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('products')

  return (
    <div>
      <h2>{t('title')}</h2>
      <button>{t('addToCart')}</button>
    </div>
  )
}
```

## 格式化日期、数字和货币

除了翻译文本，国际化还涉及按照用户区域设置格式化日期、数字和货币：

```tsx
// 使用Intl API格式化日期
function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// 格式化货币
function formatCurrency(amount: number, locale: string, currency: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

// 在组件中使用
export default function ProductPrice({ locale, price }: { locale: string; price: number }) {
  const formattedPrice = formatCurrency(price, locale, 'USD')
  return <div>{formattedPrice}</div>
}
```

## 处理RTL（从右到左）语言

对于阿拉伯语、希伯来语等从右到左（RTL）阅读的语言，需要额外的配置：

```tsx
// app/[locale]/layout.tsx
import { useLocale } from '@/lib/i18n-config'

const rtlLocales = ['ar', 'he']

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const isRtl = rtlLocales.includes(locale)

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={isRtl ? 'rtl-layout' : 'ltr-layout'}>{children}</body>
    </html>
  )
}
```

为RTL样式添加CSS：

```css
/* 在全局CSS或组件中 */
.rtl-layout {
  direction: rtl;
  text-align: right;
}

/* 处理特定元素 */
.rtl-layout .navigation {
  flex-direction: row-reverse;
}
```

## 静态和动态渲染

如果你的应用程序使用静态生成，确保通过`generateStaticParams`生成所有支持的语言路由：

```tsx
// app/[locale]/layout.tsx
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }, { locale: 'fr' }, { locale: 'de' }, { locale: 'ja' }]
}
```

这将为每种支持的语言生成静态页面。

## SEO和元数据

为了优化SEO，确保设置适当的语言相关元数据：

```tsx
// app/[locale]/layout.tsx
import { Metadata } from 'next'

type Props = {
  params: { locale: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params

  return {
    title: {
      template: '%s | My Website',
      default: 'My Website',
    },
    alternates: {
      languages: {
        en: '/en',
        zh: '/zh',
        fr: '/fr',
        de: '/de',
        ja: '/ja',
      },
    },
    // 根据locale提供不同的描述
    description:
      locale === 'zh'
        ? '这是一个国际化的Next.js应用程序'
        : 'This is an internationalized Next.js application',
  }
}
```

同时添加`hreflang`标签告诉搜索引擎每种语言的对应URL：

```tsx
// app/[locale]/layout.tsx
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  return (
    <html lang={locale}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://mywebsite.com/en" />
        <link rel="alternate" hrefLang="zh" href="https://mywebsite.com/zh" />
        <link rel="alternate" hrefLang="fr" href="https://mywebsite.com/fr" />
        <link rel="alternate" hrefLang="de" href="https://mywebsite.com/de" />
        <link rel="alternate" hrefLang="ja" href="https://mywebsite.com/ja" />
        <link rel="alternate" hrefLang="x-default" href="https://mywebsite.com/en" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 最佳实践

1. **使用字典文件**：每种语言使用单独的JSON文件管理翻译
2. **动态导入翻译**：仅加载用户所需的语言，减少包大小
3. **记住用户选择**：使用Cookies或本地存储保存用户的语言偏好
4. **语言回退**：始终有一个默认语言作为回退选项
5. **路径模式一致性**：保持所有语言的URL结构一致
6. **考虑RTL语言**：为阿拉伯语、希伯来语等右到左语言添加适当的样式支持
7. **避免硬编码文本**：不要在代码中硬编码任何显示文本，始终从翻译字典中读取
8. **处理多元内容**：考虑数量、性别和其他语言变体的不同形式

## 相关资源

- [路由基础](/nextjs/app-router/building-your-application/routing)
- [中间件](/nextjs/app-router/building-your-application/routing/middleware)
- [元数据](/nextjs/app-router/building-your-application/optimizing/metadata)
