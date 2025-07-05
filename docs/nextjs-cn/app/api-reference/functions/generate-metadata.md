---
title: generateMetadata
description: 了解如何向 Next.js 应用程序添加元数据，以改善搜索引擎优化 (SEO) 和网络分享性。
related:
  title: 后续步骤
  description: 查看所有元数据 API 选项。
  links:
    - app/api-reference/file-conventions/metadata
    - app/api-reference/functions/generate-viewport
---

你可以使用 `metadata` 对象或 `generateMetadata` 函数来定义元数据。

## `metadata` 对象

要定义静态元数据，从 `layout.js` 或 `page.js` 文件中导出一个 [`Metadata` 对象](#metadata-fields)。

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export default function Page() {}
```

```jsx switcher
export const metadata = {
  title: '...',
  description: '...',
}

export default function Page() {}
```

> 查看[元数据字段](#metadata-fields)获取支持选项的完整列表。

## `generateMetadata` 函数

依赖于**动态信息**的元数据，如当前路由参数、外部数据或父段中的 `metadata`，可以通过导出返回 [`Metadata` 对象](#metadata-fields)的 `generateMetadata` 函数来设置。

```tsx switcher
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // 读取路由参数
  const { id } = await params

  // 获取数据
  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // 可选地访问和扩展（而非替换）父元数据
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Page({ params, searchParams }: Props) {}
```

```jsx switcher
export async function generateMetadata({ params, searchParams }, parent) {
  // 读取路由参数
  const { id } = await params

  // 获取数据
  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // 可选地访问和扩展（而非替换）父元数据
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Page({ params, searchParams }) {}
```

> **须知**:
>
> - 元数据可以添加到 `layout.js` 和 `page.js` 文件中。
> - Next.js 将自动解析元数据，并为页面创建相关的 `<head>` 标签。
> - `metadata` 对象和 `generateMetadata` 函数导出**仅在服务器组件中支持**。
> - 你不能从同一路由段同时导出 `metadata` 对象和 `generateMetadata` 函数。
> - 在 `generateMetadata` 内部的 `fetch` 请求会自动在 `generateMetadata`、`generateStaticParams`、布局、页面和服务器组件之间进行[记忆化](/nextjs-cn/app/deep-dive/caching#request-memoization)。
> - 如果 `fetch` 不可用，可以使用 React [`cache` 函数](/nextjs-cn/app/deep-dive/caching#react-cache-function)。
> - [基于文件的元数据](/nextjs-cn/app/api-reference/file-conventions/metadata/index)具有更高的优先级，并会覆盖 `metadata` 对象和 `generateMetadata` 函数。

## 参考

### 参数

`generateMetadata` 函数接受以下参数：

- `props` - 包含当前路由参数的对象：

  - `params` - 包含从根段到调用 `generateMetadata` 的段的[动态路由参数](/nextjs-cn/app/building-your-application/routing/dynamic-routes)对象。示例：

    | 路由                            | URL         | `params`                  |
    | ------------------------------- | ----------- | ------------------------- |
    | `app/shop/[slug]/page.js`       | `/shop/1`   | `{ slug: '1' }`           |
    | `app/shop/[tag]/[item]/page.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |
    | `app/shop/[...slug]/page.js`    | `/shop/1/2` | `{ slug: ['1', '2'] }`    |

  - `searchParams` - 包含当前 URL 的[搜索参数](https://developer.mozilla.org/docs/Learn/Common_questions/What_is_a_URL#parameters)的对象。示例：

    | URL             | `searchParams`       |
    | --------------- | -------------------- |
    | `/shop?a=1`     | `{ a: '1' }`         |
    | `/shop?a=1&b=2` | `{ a: '1', b: '2' }` |
    | `/shop?a=1&a=2` | `{ a: ['1', '2'] }`  |

- `parent` - 来自父路由段的已解析元数据的 Promise。

### 返回值

`generateMetadata` 应该返回一个包含一个或多个元数据字段的 [`Metadata` 对象](#metadata-fields)。

> **须知**:
>
> - 如果元数据不依赖于运行时信息，应该使用静态的 [`metadata` 对象](#the-metadata-object) 而不是 `generateMetadata` 来定义。
> - `fetch` 请求在 `generateMetadata`、`generateStaticParams`、布局、页面和服务器组件之间自动进行[记忆化](/nextjs-cn/app/deep-dive/caching#request-memoization)。如果 `fetch` 不可用，可以使用 React [`cache` 函数](/nextjs-cn/app/deep-dive/caching#react-cache-function)。
> - `searchParams` 只在 `page.js` 段中可用。
> - Next.js 的 [`redirect()`](/nextjs-cn/app/api-reference/functions/redirect) 和 [`notFound()`](/nextjs-cn/app/api-reference/functions/not-found) 方法也可以在 `generateMetadata` 中使用。

### 元数据字段

支持以下字段：

#### `title`

`title` 属性用于设置文档的标题。它可以定义为简单的[字符串](#string)或可选的[模板对象](#template)。

##### 字符串

```jsx
export const metadata = {
  title: 'Next.js',
}
```

```html hideLineNumbers
<title>Next.js</title>
```

##### `default`

`title.default` 可用于为没有定义 `title` 的子路由段提供**回退标题**。

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Acme',
  },
}
```

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {}

// 输出: <title>Acme</title>
```

##### `template`

`title.template` 可用于为**子**路由段中定义的 `titles` 添加前缀或后缀。

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Acme',
    default: 'Acme', // 创建模板时需要默认值
  },
}
```

```jsx switcher
export const metadata = {
  title: {
    template: '%s | Acme',
    default: 'Acme', // 创建模板时需要默认值
  },
}
```

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

// 输出: <title>About | Acme</title>
```

```jsx switcher
export const metadata = {
  title: 'About',
}

// 输出: <title>About | Acme</title>
```

> **须知**:
>
> - `title.template` 适用于**子**路由段，而**不是**定义它的段。这意味着：
>
>   - 添加 `title.template` 时**需要** `title.default`。
>   - 在 `layout.js` 中定义的 `title.template` 不会应用于同一路由段的 `page.js` 中定义的 `title`。
>   - 在 `page.js` 中定义的 `title.template` 没有效果，因为页面始终是终止段（它没有任何子路由段）。
>
> - 如果路由没有定义 `title` 或 `title.default`，则 `title.template` **没有效果**。

##### `absolute`

`title.absolute` 可用于提供一个**忽略**父段中设置的 `title.template` 的标题。

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Acme',
  },
}
```

```jsx switcher
export const metadata = {
  title: {
    template: '%s | Acme',
  },
}
```

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
}

// Output: <title>About</title>
```

```jsx switcher
export const metadata = {
  title: {
    absolute: 'About',
  },
}

// Output: <title>About</title>
```

> **须知**:
>
> - `layout.js`
>
>   - `title` (字符串) 和 `title.default` 为不定义自己的 `title` 的子段定义默认标题。如果存在，它将使用最近父段的 `title.template` 进行增强。
>   - `title.absolute` 为子段定义默认标题。它忽略父段中的 `title.template`。
>   - `title.template` 为子段定义一个新的标题模板。
>
> - `page.js`
>   - 如果页面未定义自己的标题，将使用最近父级解析的标题。
>   - `title` (字符串) 定义路由的标题。如果存在，它将使用最近父段的 `title.template` 进行增强。
>   - `title.absolute` 定义路由标题。它忽略父段中的 `title.template`。
>   - `title.template` 在 `page.js` 中没有效果，因为页面始终是路由的终止段。

### `description`

```jsx
export const metadata = {
  description: 'The React Framework for the Web',
}
```

```html hideLineNumbers
<meta name="description" content="The React Framework for the Web" />
```

### Other fields

#### 基本字段

通过添加标准元数据字段可以改进 SEO、社交媒体分享以及 Web 体验:

```jsx
export const metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  creator: 'Jiachi Liu',
  publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
```

```html hideLineNumbers
<meta name="application-name" content="Next.js" />
<meta name="author" content="Seb" />
<link rel="author" href="https://nextjs.org" />
<meta name="author" content="Josh" />
<meta name="generator" content="Next.js" />
<meta name="keywords" content="Next.js,React,JavaScript" />
<meta name="creator" content="Jiachi Liu" />
<meta name="publisher" content="Sebastian Markbåge" />
<meta name="format-detection" content="telephone=no, address=no, email=no" />
```

#### `metadataBase`

`metadataBase` 是一种便捷选项，用于为需要完全限定 URL 的 `metadata` 字段设置基本 URL 前缀。

- `metadataBase` 允许**当前路由段及其以下**定义的基于 URL 的 `metadata` 字段使用**相对路径**，而不是原本需要的绝对 URL。
- 字段的相对路径将与 `metadataBase` 组合，形成完全限定的 URL。

```jsx
export const metadata = {
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
}
```

```html hideLineNumbers
<link rel="canonical" href="https://acme.com" />
<link rel="alternate" hreflang="en-US" href="https://acme.com/en-US" />
<link rel="alternate" hreflang="de-DE" href="https://acme.com/de-DE" />
<meta property="og:image" content="https://acme.com/og-image.png" />
```

> **须知**:
>
> - `metadataBase` 通常在根 `app/layout.js` 中设置，以应用于所有路由的基于 URL 的 `metadata` 字段。
> - 所有需要绝对 URL 的基于 URL 的 `metadata` 字段都可以用 `metadataBase` 选项配置。
> - `metadataBase` 可以包含子域名，如 `https://app.acme.com` 或基本路径，如 `https://acme.com/start/from/here`。
> - 如果 `metadata` 字段提供了绝对 URL，则 `metadataBase` 将被忽略。
> - 在基于 URL 的 `metadata` 字段中使用相对路径而不配置 `metadataBase` 将导致构建错误。
> - Next.js 将规范化 `metadataBase`（例如 `https://acme.com/`）和相对字段（例如 `/path`）之间的重复斜杠为单个斜杠（例如 `https://acme.com/path`）。

#### URL 组合

URL 组合倾向于开发者的意图，而不是默认的目录遍历语义。

- `metadataBase` 和 `metadata` 字段之间的尾部斜杠会被规范化。
- `metadata` 字段中的"绝对"路径（通常会替换整个 URL 路径）被视为"相对"路径（从 `metadataBase` 的末尾开始）。

例如，给定以下 `metadataBase`：

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://acme.com'),
}
```

```jsx switcher
export const metadata = {
  metadataBase: new URL('https://acme.com'),
}
```

继承上述 `metadataBase` 并设置自己的值的任何 `metadata` 字段将按以下方式解析：

| `metadata` 字段                  | 解析后的 URL                     |
| -------------------------------- | -------------------------------- |
| `/`                              | `https://acme.com`               |
| `./`                             | `https://acme.com`               |
| `payments`                       | `https://acme.com/payments`      |
| `/payments`                      | `https://acme.com/payments`      |
| `./payments`                     | `https://acme.com/payments`      |
| `../payments`                    | `https://acme.com/payments`      |
| `https://beta.acme.com/payments` | `https://beta.acme.com/payments` |

### `openGraph`

```jsx
export const metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png', // 必须是绝对 URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // 必须是绝对 URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    videos: [
      {
        url: 'https://nextjs.org/video.mp4', // 必须是绝对 URL
        width: 800,
        height: 600,
      },
    ],
    audio: [
      {
        url: 'https://nextjs.org/audio.mp3', // 必须是绝对 URL
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
```

```html hideLineNumbers
<meta property="og:title" content="Next.js" />
<meta property="og:description" content="The React Framework for the Web" />
<meta property="og:url" content="https://nextjs.org/" />
<meta property="og:site_name" content="Next.js" />
<meta property="og:locale" content="en_US" />
<meta property="og:image" content="https://nextjs.org/og.png" />
<meta property="og:image:width" content="800" />
<meta property="og:image:height" content="600" />
<meta property="og:image" content="https://nextjs.org/og-alt.png" />
<meta property="og:image:width" content="1800" />
<meta property="og:image:height" content="1600" />
<meta property="og:image:alt" content="My custom alt" />
<meta property="og:video" content="https://nextjs.org/video.mp4" />
<meta property="og:video:width" content="800" />
<meta property="og:video:height" content="600" />
<meta property="og:audio" content="https://nextjs.org/audio.mp3" />
<meta property="og:type" content="website" />
```

```jsx
export const metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    type: 'article',
    publishedTime: '01T00:00:00.000Z',
    authors: ['Seb', 'Josh'],
  },
}
```

```html hideLineNumbers
<meta property="og:title" content="Next.js" />
<meta property="og:description" content="The React Framework for the Web" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="01T00:00:00.000Z" />
<meta property="article:author" content="Seb" />
<meta property="article:author" content="Josh" />
```

> **须知**: 我们建议使用[基于文件的元数据 API](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image#image-files-jpg-png-gif) 处理 Open Graph 图像。与必须同步配置导出和实际文件相比，基于文件的 API 将自动为您生成正确的元数据。

### `robots`

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

```html hideLineNumbers
<meta name="robots" content="index, follow" />
<meta
  name="googlebot"
  content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
/>
```

### `icons`

> **须知**: 我们建议尽可能使用[基于文件的元数据 API](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons#image-files-ico-jpg-png)处理图标。与必须同步配置导出和实际文件相比，基于文件的 API 将自动为您生成正确的元数据。

```jsx
export const metadata = {
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
}
```

```html hideLineNumbers
<link rel="shortcut icon" href="/shortcut-icon.png" />
<link rel="icon" href="/icon.png" />
<link rel="apple-touch-icon" href="/apple-icon.png" />
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
```

```jsx
export const metadata = {
  icons: {
    icon: [
      { url: '/icon.png' },
      new URL('/icon.png', 'https://example.com'),
      { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: ['/shortcut-icon.png'],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
}
```

```html hideLineNumbers
<link rel="shortcut icon" href="/shortcut-icon.png" />
<link rel="icon" href="/icon.png" />
<link rel="icon" href="https://example.com/icon.png" />
<link rel="icon" href="/icon-dark.png" media="(prefers-color-scheme: dark)" />
<link rel="apple-touch-icon" href="/apple-icon.png" />
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
<link rel="apple-touch-icon" href="/apple-icon-x3.png" sizes="180x180" type="image/png" />
```

> **须知**: 微软 Edge 的 Chromium 版本不再支持 `msapplication-*` 元标签，因此不再需要这些标签。

### `themeColor`

> **已弃用**: 自 Next.js 14 起，`metadata` 中的 `themeColor` 选项已被弃用。请改用 [`viewport` 配置](/nextjs-cn/app/api-reference/functions/generate-viewport)。

### `colorScheme`

> **已弃用**: 自 Next.js 14 起，`metadata` 中的 `colorScheme` 选项已被弃用。请改用 [`viewport` 配置](/nextjs-cn/app/api-reference/functions/generate-viewport)。

### `manifest`

网络应用程序清单，在[网络应用程序清单规范](https://developer.mozilla.org/docs/Web/Manifest)中定义。

```jsx
export const metadata = {
  manifest: 'https://nextjs.org/manifest.json',
}
```

```html hideLineNumbers
<link rel="manifest" href="https://nextjs.org/manifest.json" />
```

### `twitter`

Twitter 规范（令人惊讶地）不仅用于 X（原 Twitter）。

了解更多关于 [Twitter 卡片标记参考](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup)。

```jsx
export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'], // 必须是绝对 URL
  },
}
```

```html hideLineNumbers
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site:id" content="1467726470533754880" />
<meta name="twitter:creator" content="@nextjs" />
<meta name="twitter:creator:id" content="1467726470533754880" />
<meta name="twitter:title" content="Next.js" />
<meta name="twitter:description" content="The React Framework for the Web" />
<meta name="twitter:image" content="https://nextjs.org/og.png" />
```

```jsx
export const metadata = {
  twitter: {
    card: 'app',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: {
      url: 'https://nextjs.org/og.png',
      alt: 'Next.js Logo',
    },
    app: {
      name: 'twitter_app',
      id: {
        iphone: 'twitter_app://iphone',
        ipad: 'twitter_app://ipad',
        googleplay: 'twitter_app://googleplay',
      },
      url: {
        iphone: 'https://iphone_url',
        ipad: 'https://ipad_url',
      },
    },
  },
}
```

```html hideLineNumbers
<meta name="twitter:site:id" content="1467726470533754880" />
<meta name="twitter:creator" content="@nextjs" />
<meta name="twitter:creator:id" content="1467726470533754880" />
<meta name="twitter:title" content="Next.js" />
<meta name="twitter:description" content="The React Framework for the Web" />
<meta name="twitter:card" content="app" />
<meta name="twitter:image" content="https://nextjs.org/og.png" />
<meta name="twitter:image:alt" content="Next.js Logo" />
<meta name="twitter:app:name:iphone" content="twitter_app" />
<meta name="twitter:app:id:iphone" content="twitter_app://iphone" />
<meta name="twitter:app:id:ipad" content="twitter_app://ipad" />
<meta name="twitter:app:id:googleplay" content="twitter_app://googleplay" />
<meta name="twitter:app:url:iphone" content="https://iphone_url" />
<meta name="twitter:app:url:ipad" content="https://ipad_url" />
<meta name="twitter:app:name:ipad" content="twitter_app" />
<meta name="twitter:app:name:googleplay" content="twitter_app" />
```

### `viewport`

> **已弃用**: 自 Next.js 14 起，`metadata` 中的 `viewport` 选项已被弃用。请改用 [`viewport` 配置](/nextjs-cn/app/api-reference/functions/generate-viewport)。

### `verification`

```jsx
export const metadata = {
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['my-email', 'my-link'],
    },
  },
}
```

```html hideLineNumbers
<meta name="google-site-verification" content="google" />
<meta name="y_key" content="yahoo" />
<meta name="yandex-verification" content="yandex" />
<meta name="me" content="my-email" />
<meta name="me" content="my-link" />
```

### `appleWebApp`

```jsx
export const metadata = {
  itunes: {
    appId: 'myAppStoreID',
    appArgument: 'myAppArgument',
  },
  appleWebApp: {
    title: 'Apple Web App',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/assets/startup/apple-touch-startup-image-768x1004.png',
      {
        url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
}
```

```html hideLineNumbers
<meta name="apple-itunes-app" content="app-id=myAppStoreID, app-argument=myAppArgument" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="Apple Web App" />
<link
  href="/assets/startup/apple-touch-startup-image-768x1004.png"
  rel="apple-touch-startup-image"
/>
<link media="(device-width: 768px) and (device-height: 1024px)" rel="apple-touch-startup-image" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### `alternates`

```jsx
export const metadata = {
  alternates: {
    canonical: 'https://nextjs.org',
    languages: {
      'en-US': 'https://nextjs.org/en-US',
      'de-DE': 'https://nextjs.org/de-DE',
    },
    media: {
      'only screen and (max-width: 600px)': 'https://nextjs.org/mobile',
    },
    types: {
      'application/rss+xml': 'https://nextjs.org/rss',
    },
  },
}
```

```html hideLineNumbers
<link rel="canonical" href="https://nextjs.org" />
<link rel="alternate" hreflang="en-US" href="https://nextjs.org/en-US" />
<link rel="alternate" hreflang="de-DE" href="https://nextjs.org/de-DE" />
<link rel="alternate" media="only screen and (max-width: 600px)" href="https://nextjs.org/mobile" />
<link rel="alternate" type="application/rss+xml" href="https://nextjs.org/rss" />
```

### `appLinks`

```jsx
export const metadata = {
  appLinks: {
    ios: {
      url: 'https://nextjs.org/ios',
      app_store_id: 'app_store_id',
    },
    android: {
      package: 'com.example.android/package',
      app_name: 'app_name_android',
    },
    web: {
      url: 'https://nextjs.org/web',
      should_fallback: true,
    },
  },
}
```

```html hideLineNumbers
<meta property="al:ios:url" content="https://nextjs.org/ios" />
<meta property="al:ios:app_store_id" content="app_store_id" />
<meta property="al:android:package" content="com.example.android/package" />
<meta property="al:android:app_name" content="app_name_android" />
<meta property="al:web:url" content="https://nextjs.org/web" />
<meta property="al:web:should_fallback" content="true" />
```

### `archives`

描述历史记录、文档或其他具有历史意义的材料的集合（[来源](https://www.w3.org/TR/2011/WD-html20110113/links.html#rel-archives)）。

```jsx
export const metadata = {
  archives: ['https://nextjs.org/13'],
}
```

```html hideLineNumbers
<link rel="archives" href="https://nextjs.org/13" />
```

### `assets`

```jsx
export const metadata = {
  assets: ['https://nextjs.org/assets'],
}
```

```html hideLineNumbers
<link rel="assets" href="https://nextjs.org/assets" />
```

### `bookmarks`

```jsx
export const metadata = {
  bookmarks: ['https://nextjs.org/13'],
}
```

```html hideLineNumbers
<link rel="bookmarks" href="https://nextjs.org/13" />
```

### `category`

```jsx
export const metadata = {
  category: 'technology',
}
```

```html hideLineNumbers
<meta name="category" content="technology" />
```

### `facebook`

您可以将 Facebook 应用或 Facebook 账户连接到您的网页，以便使用某些 Facebook 社交插件 [Facebook 文档](https://developers.facebook.com/docs/plugins/comments/#moderation-setup-instructions)

> **须知**: 您只能指定 appId 或 admins 之一，不能同时指定两者。

```jsx
export const metadata = {
  facebook: {
    appId: '12345678',
  },
}
```

```html hideLineNumbers
<meta property="fb:app_id" content="12345678" />
```

```jsx
export const metadata = {
  facebook: {
    admins: '12345678',
  },
}
```

```html hideLineNumbers
<meta property="fb:admins" content="12345678" />
```

如果您想生成多个 fb:admins 元标签，可以使用数组值。

```jsx
export const metadata = {
  facebook: {
    admins: ['12345678', '87654321'],
  },
}
```

```html hideLineNumbers
<meta property="fb:admins" content="12345678" />
<meta property="fb:admins" content="87654321" />
```

### `pinterest`

您可以在网页上启用或禁用 [Pinterest 富媒体引脚](https://developers.pinterest.com/docs/web-features/rich-pins-overview/)。

```jsx
export const metadata = {
  pinterest: {
    richPin: true,
  },
}
```

```html hideLineNumbers
<meta name="pinterest-rich-pin" content="true" />
```

### `other`

所有元数据选项都应使用内置支持进行覆盖。但是，可能存在特定于您网站的自定义元数据标签，或者刚刚发布的全新元数据标签。您可以使用 `other` 选项来渲染任何自定义元数据标签。

```jsx
export const metadata = {
  other: {
    custom: 'meta',
  },
}
```

```html hideLineNumbers
<meta name="custom" content="meta" />
```

如果您想生成多个相同键的元标签，可以使用数组值。

```jsx
export const metadata = {
  other: {
    custom: ['meta1', 'meta2'],
  },
}
```

```html hideLineNumbers
<meta name="custom" content="meta1" />
<meta name="custom" content="meta2" />
```

### 不支持的元数据

以下元数据类型目前没有内置支持。但是，它们仍然可以在布局或页面本身中渲染。

### 类型

您可以使用 `Metadata` 类型为元数据添加类型安全。如果您在 IDE 中使用[内置 TypeScript 插件](/nextjs-cn/app/api-reference/config/typescript)，则不需要手动添加类型，但您仍然可以显式添加它。

#### `metadata` 对象

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}
```

#### `generateMetadata` 函数

##### 常规函数

```tsx
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Next.js',
  }
}
```

##### 异步函数

```tsx
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Next.js',
  }
}
```

##### 使用段参数

```tsx
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  return {
    title: 'Next.js',
  }
}

export default function Page({ params, searchParams }: Props) {}
```

##### 使用父元数据

```tsx
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'Next.js',
  }
}
```

##### JavaScript 项目

对于 JavaScript 项目，您可以使用 JSDoc 添加类型安全。

```js
/** @type {import("next").Metadata} */
export const metadata = {
  title: 'Next.js',
}
```

| 元数据                        | 建议                                                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<meta http-equiv="...">`     | 通过 [`redirect()`](/nextjs-cn/app/api-reference/functions/redirect)、[中间件](/nextjs-cn/app/building-your-application/routing/middleware#nextresponse)、[安全头](/nextjs-cn/app/api-reference/config/next-config-js/headers) 使用适当的 HTTP 头 |
| `<base>`                      | 在布局或页面本身中渲染标签。                                                                                                                                                                                                                      |
| `<noscript>`                  | 在布局或页面本身中渲染标签。                                                                                                                                                                                                                      |
| `<style>`                     | 了解有关 [Next.js 中的样式](/nextjs-cn/app/getting-started/css)的更多信息。                                                                                                                                                                       |
| `<script>`                    | 了解有关[使用脚本](/nextjs-cn/app/building-your-application/routing/layouts-and-templates)的更多信息。                                                                                                                                            |
| `<link rel="stylesheet" />`   | 直接在布局或页面本身中 `import` 样式表。                                                                                                                                                                                                          |
| `<link rel="preload />`       | 使用 [ReactDOM preload 方法](#link-relpreload)                                                                                                                                                                                                    |
| `<link rel="preconnect" />`   | 使用 [ReactDOM preconnect 方法](#link-relpreconnect)                                                                                                                                                                                              |
| `<link rel="dns-prefetch" />` | 使用 [ReactDOM prefetchDNS 方法](#link-reldns-prefetch)                                                                                                                                                                                           |

### 资源提示

`<link>` 元素有许多 `rel` 关键字，可用于提示浏览器可能需要外部资源。浏览器使用此信息根据关键字应用预加载优化。

虽然元数据 API 不直接支持这些提示，但您可以使用新的 [`ReactDOM` 方法](https://github.com/facebook/react/pull/26237) 安全地将它们插入到文档的 `<head>` 中。

```tsx switcher
'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preload('...', { as: '...' })
  ReactDOM.preconnect('...', { crossOrigin: '...' })
  ReactDOM.prefetchDNS('...')

  return '...'
}
```

```jsx switcher
'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preload('...', { as: '...' })
  ReactDOM.preconnect('...', { crossOrigin: '...' })
  ReactDOM.prefetchDNS('...')

  return '...'
}
```

#### `<link rel="preload">`

在页面渲染（浏览器）生命周期早期开始加载资源。[MDN 文档](https://developer.mozilla.org/docs/Web/HTML/Attributes/rel/preload)。

```tsx
ReactDOM.preload(href: string, options: { as: string })
```

```html hideLineNumbers
<link rel="preload" href="..." as="..." />
```

##### `<link rel="preconnect">`

预先建立与源的连接。[MDN 文档](https://developer.mozilla.org/docs/Web/HTML/Attributes/rel/preconnect)。

```tsx
ReactDOM.preconnect(href: string, options?: { crossOrigin?: string })
```

```html hideLineNumbers
<link rel="preconnect" href="..." crossorigin />
```

#### `<link rel="dns-prefetch">`

尝试在请求资源之前解析域名。[MDN 文档](https://developer.mozilla.org/docs/Web/HTML/Attributes/rel/dns-prefetch)。

```tsx
ReactDOM.prefetchDNS(href: string)
```

```html hideLineNumbers
<link rel="dns-prefetch" href="..." />
```

> **须知**:
>
> - 这些方法目前仅在客户端组件中支持，这些组件在初始页面加载时仍然进行服务器端渲染。
> - Next.js 内置功能如 `next/font`、`next/image` 和 `next/script` 自动处理相关资源提示。

## 行为

### 默认字段

即使路由没有定义元数据，也会始终添加两个默认 `meta` 标签：

- [meta charset 标签](https://developer.mozilla.org/docs/Web/HTML/Element/meta#attr-charset) 设置网站的字符编码。
- [meta viewport 标签](https://developer.mozilla.org/docs/Web/HTML/Viewport_meta_tag) 设置网站的视口宽度和缩放，以适应不同的设备。

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

> **须知**: 您可以覆盖默认的 [`viewport`](/nextjs-cn/app/api-reference/functions/generate-metadata#viewport) meta 标签。

### 流式元数据

由 `generateMetadata` 返回的元数据会流式传输到客户端。这允许 Next.js 在元数据解析后立即将其注入到 HTML 中。

由于页面元数据主要针对机器人和爬虫，Next.js 将为能够执行 JavaScript 并检查完整页面 DOM 的机器人（例如 `Googlebot`）流式传输元数据。但是，元数据将继续阻塞**HTML 受限**机器人（例如 `Twitterbot`）的页面渲染，因为这些机器人在爬取时无法执行 JavaScript。

Next.js 自动检测传入请求的用户代理，以确定是提供流式元数据还是回退到阻塞元数据。

如果您需要自定义此列表，可以在 `next.config.js` 中使用 `htmlLimitedBots` 选项手动定义它们。Next.js 将确保与此正则表达式匹配的用户代理在请求您的网页时接收阻塞元数据。

```ts switcher
import type { NextConfig } from 'next'

const config: NextConfig = {
  htmlLimitedBots: 'MySpecialBot|MyAnotherSpecialBot|SimpleCrawler',
}

export default config
```

```js switcher
module.exports = {
  htmlLimitedBots: 'MySpecialBot|MyAnotherSpecialBot|SimpleCrawler',
}
```

指定 `htmlLimitedBots` 配置将覆盖 Next.js 的默认列表，让您可以完全控制哪些用户代理应该选择使用此行为。这是高级行为，默认值对于大多数情况应该足够了。

### 排序

元数据按顺序评估，从根段开始，然后向下到最终 `page.js` 段最近的段。例如：

1. `app/layout.tsx`（根布局）
2. `app/blog/layout.tsx`（嵌套博客布局）
3. `app/blog/[slug]/page.tsx`（博客页面）

### 合并

按照[评估顺序](#ordering)，从同一路由的多个段导出的元数据对象**浅层**合并在一起，形成路由的最终元数据输出。重复的键将根据它们的顺序**替换**。

这意味着具有嵌套字段的元数据，如在较早段中定义的 [`openGraph`](/nextjs-cn/app/api-reference/functions/generate-metadata#opengraph) 和 [`robots`](/nextjs-cn/app/api-reference/functions/generate-metadata#robots)，将被最后定义它们的段**覆盖**。

#### 覆盖字段

```jsx
export const metadata = {
  title: 'Acme',
  openGraph: {
    title: 'Acme',
    description: 'Acme is a...',
  },
}
```

```jsx
export const metadata = {
  title: 'Blog',
  openGraph: {
    title: 'Blog',
  },
}

// Output:
// <title>Blog</title>
// <meta property="og:title" content="Blog" />
```

在上面的例子中：

- `app/layout.js` 中的 `title` 被 `app/blog/page.js` 中的 `title` **替换**。
- `app/layout.js` 中的所有 `openGraph` 字段都在 `app/blog/page.js` 中被**替换**，因为 `app/blog/page.js` 设置了 `openGraph` 元数据。请注意缺少 `openGraph.description`。

如果您想在段之间共享一些嵌套字段而覆盖其他字段，可以将它们提取到单独的变量中：

```jsx
export const openGraphImage = { images: ['http://...'] }
```

```jsx
import { openGraphImage } from './shared-metadata'

export const metadata = {
  openGraph: {
    ...openGraphImage,
    title: 'Home',
  },
}
```

```jsx
import { openGraphImage } from '../shared-metadata'

export const metadata = {
  openGraph: {
    ...openGraphImage,
    title: 'About',
  },
}
```

在上面的例子中，OG 图像在 `app/layout.js` 和 `app/about/page.js` 之间共享，而标题不同。

#### 继承字段

```jsx
export const metadata = {
  title: 'Acme',
  openGraph: {
    title: 'Acme',
    description: 'Acme is a...',
  },
}
```

```jsx
export const metadata = {
  title: 'About',
}

// Output:
// <title>About</title>
// <meta property="og:title" content="Acme" />
// <meta property="og:description" content="Acme is a..." />
```

**Notes**

- `title` from `app/layout.js` is **replaced** by `title` in `app/about/page.js`.
- All `openGraph` fields from `app/layout.js` are **inherited** in `app/about/page.js` because `app/about/page.js` doesn't set `openGraph` metadata.

## Version History

| Version   | Changes                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `v15.2.0` | Introduced streaming support to `generateMetadata`.                                                                                                          |
| `v13.2.0` | `viewport`, `themeColor`, and `colorScheme` deprecated in favor of the [`viewport` configuration](/nextjs-cn/app/api-reference/functions/generate-viewport). |
| `v13.2.0` | `metadata` and `generateMetadata` introduced.                                                                                                                |
