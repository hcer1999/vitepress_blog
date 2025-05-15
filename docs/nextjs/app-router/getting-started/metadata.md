---
title: Next.js 中文文档 - 元数据和Open Graph图片
description: 学习如何使用Next.js的元数据API优化SEO和社交分享。
---

# Next.js 中文文档 - 元数据和Open Graph图片

Next.js提供了元数据API，让你可以修改应用程序的`<head>`元素，这对于改善SEO和网页在社交媒体上的展示效果至关重要。

## 元数据类型

Next.js支持两种配置元数据的方式：

1. **基于配置的元数据**：通过在`layout.js`或`page.js`文件中导出静态`metadata`对象或动态`generateMetadata`函数
2. **基于文件的元数据**：通过在路由段中放置特殊文件，如`favicon.ico`、`opengraph-image.jpg`

## 基于配置的元数据

### 静态元数据

```jsx
// app/page.jsx
export const metadata = {
  title: '我的应用',
  description: '我的Next.js应用描述',
}

export default function Page() {
  return (
    // ...
  )
}
```

### 动态元数据

```jsx
// app/blog/[id]/page.jsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.id)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default function BlogPost({ params }) {
  // ...
}
```

## 常用元数据字段

### 基本元数据

```jsx
export const metadata = {
  title: '页面标题',
  description: '页面描述',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: '开发者', url: 'https://example.com' }],
  creator: '创建者名称',
  publisher: '发布者名称',
}
```

### 元标题

```jsx
export const metadata = {
  // 基本标题
  title: '页面标题',

  // 绝对标题（不使用模板）
  title: {
    absolute: '页面标题 - 不使用模板',
  },

  // 标题模板
  title: {
    template: '%s | 网站名称',
    default: '网站名称',
  },
}
```

### Open Graph

```jsx
export const metadata = {
  openGraph: {
    title: 'My Website',
    description: 'My Website Description',
    url: 'https://example.com',
    siteName: 'Site Name',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
}
```

### Twitter

```jsx
export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'My Website',
    description: 'My Website Description',
    creator: '@username',
    images: ['https://example.com/twitter-image.jpg'],
  },
}
```

### 图标

```jsx
export const metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
}
```

### 机器人和索引设置

```jsx
export const metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### 验证

```jsx
export const metadata = {
  verification: {
    google: 'google-site-verification=value',
    yandex: 'yandex-verification=value',
    baidu: 'baidu-site-verification=value',
  },
}
```

## 基于文件的元数据

Next.js支持放置特殊文件在路由段中，会自动作为元数据使用：

- `favicon.ico`、`apple-icon.jpg`、`icon.jpg` - 图标文件
- `opengraph-image.jpg` - Open Graph图片
- `twitter-image.jpg` - Twitter图片
- `robots.txt` - 机器人规则
- `sitemap.xml` - 网站地图

这些文件可以是静态文件，也可以是使用代码动态生成的。

### 静态图片文件

简单放置图片文件到相应的路由段目录：

```
app
├── favicon.ico
├── opengraph-image.jpg
└── page.js
```

### 动态生成图片

可以使用代码动态生成这些图片：

```jsx
// app/opengraph-image.js
import { ImageResponse } from 'next/server'

export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 64,
          background: '#000',
          color: '#fff',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        我的网站
      </div>
    ),
    size,
  )
}
```

## 元数据字段参考

这些是可以在`metadata`对象中使用的主要字段：

```jsx
export const metadata = {
  // 基本元数据
  title: '页面标题',
  description: '页面描述',

  // 基本SEO
  keywords: ['关键词1', '关键词2'],
  authors: [{ name: '作者名', url: '作者URL' }],
  creator: '创建者',
  publisher: '发布者',

  // Open Graph
  openGraph: {
    type: 'website',
    title: 'Open Graph标题',
    description: 'Open Graph描述',
    url: 'https://example.com',
    siteName: '网站名称',
    locale: 'zh_CN',
    images: [
      {
        url: 'https://example.com/og.jpg',
        width: 1200,
        height: 630,
        alt: '图片描述',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter标题',
    description: 'Twitter描述',
    creator: '@用户名',
    images: ['https://example.com/twitter.jpg'],
  },

  // 图标
  icons: {
    icon: [{ url: '/icon.png' }],
    shortcut: '/shortcut-icon.png',
    apple: [{ url: '/apple-icon.png' }],
  },

  // 其他
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': 'https://example.com/en',
      'zh-CN': 'https://example.com/zh',
    },
  },

  robots: {
    index: true,
    follow: true,
  },

  // 验证
  verification: {
    google: 'google验证码',
    baidu: '百度验证码',
  },
}
```

## 元数据文件生成器

Next.js提供了Web API来动态生成元数据相关图片：

```jsx
// app/about/opengraph-image.jsx
import { ImageResponse } from 'next/server'

export const alt = '关于我们'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const imageData = await fetch('https://example.com/og-background.png').then((res) =>
    res.arrayBuffer(),
  )

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#fff',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img width={1200} height={630} src={imageData} style={{ objectFit: 'cover' }} />
        <h1 style={{ fontSize: 64, marginTop: -200 }}>关于我们</h1>
      </div>
    ),
    {
      ...size,
    },
  )
}
```

## 元数据规则

元数据遵循以下规则：

1. **嵌套路由合并**：子路由的元数据会与父路由的元数据合并
2. **冲突时覆盖**：相同字段会被子路由覆盖
3. **模板支持**：支持诸如`%s`的标题模板占位符
4. **内置类型**：所有元数据对象都提供TypeScript类型支持

## 最佳实践

1. **网站通用元数据**：在根布局`app/layout.js`中设置通用元数据
2. **模块化元数据**：每个页面或部分应设置其特定元数据
3. **动态内容**：使用`generateMetadata`获取和生成动态内容的元数据
4. **视觉验证**：使用[sharing debugger](https://developers.facebook.com/tools/debug/)等工具测试Open Graph图片

## 示例：完整的元数据实现

```jsx
// app/layout.js
export const metadata = {
  // 网站通用元数据
  metadataBase: new URL('https://example.com'),
  title: {
    template: '%s | 我的网站',
    default: '我的网站 - 首页',
  },
  description: '这是我的Next.js网站描述',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: '开发者', url: 'https://example.com/about' }],
  creator: '网站创建者',
  publisher: '网站发布者',
  formatDetection: {
    email: false,
    telephone: false,
  },

  // 基本Open Graph
  openGraph: {
    type: 'website',
    siteName: '我的网站',
    title: {
      template: '%s | 我的网站',
      default: '我的网站',
    },
    description: 'Open Graph默认描述',
  },

  // 基本Twitter卡片
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | 我的网站',
      default: '我的网站',
    },
    description: 'Twitter默认描述',
    creator: '@creator',
    site: '@site',
  },

  // 图标
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // 机器人和验证
  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: 'google-site-verification=code',
    baidu: 'baidu-site-verification=code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
```

## 了解更多

随着元数据API和功能的不断更新，请参考[官方文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)以获取最新信息。
