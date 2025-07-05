---
title: 如何添加元数据和创建 OG 图片
nav_title: 元数据和 OG 图片
description: 学习如何为你的页面添加元数据和创建动态 OG 图片。
related:
  title: API 参考
  description: 了解本页面提到的元数据 API 的更多信息。
  links:
    - app/api-reference/functions/generate-metadata
    - app/api-reference/functions/generate-viewport
    - app/api-reference/functions/image-response
    - app/api-reference/file-conventions/metadata
    - app/api-reference/file-conventions/metadata/app-icons
    - app/api-reference/file-conventions/metadata/opengraph-image
    - app/api-reference/file-conventions/metadata/robots
    - app/api-reference/file-conventions/metadata/sitemap
---

元数据 API 可用于定义你的应用程序元数据，以改善 SEO 和网页分享效果，包括：

1. [静态 `metadata` 对象](#static-metadata)
2. [动态 `generateMetadata` 函数](#generated-metadata)
3. 特殊的[文件约定](/nextjs-cn/app/api-reference/file-conventions/metadata/index)，可用于添加静态或动态生成的[网站图标](#favicons)和 [OG 图片](#static-open-graph-images)。

使用以上任何选项，Next.js 都会自动为你的页面生成相关的 `<head>` 标签，你可以在浏览器的开发者工具中查看这些标签。

## 默认字段

即使路由没有定义元数据，也会始终添加两个默认的 `meta` 标签：

- [meta charset 标签](https://developer.mozilla.org/docs/Web/HTML/Element/meta#attr-charset)设置网站的字符编码。
- [meta viewport 标签](https://developer.mozilla.org/docs/Web/HTML/Viewport_meta_tag)设置网站的视口宽度和缩放比例，以适应不同的设备。

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

其他元数据字段可以通过 `Metadata` 对象（用于[静态元数据](#static-metadata)）或 `generateMetadata` 函数（用于[生成的元数据](#generated-metadata)）来定义。

## 静态元数据

要定义静态元数据，从静态的 [`layout.js`](/nextjs-cn/app/api-reference/file-conventions/layout) 或 [`page.js`](/nextjs-cn/app/api-reference/file-conventions/page) 文件中导出一个 [`Metadata` 对象](/nextjs-cn/app/api-reference/functions/generate-metadata#metadata-object)。例如，要为博客路由添加标题和描述：

```tsx switcher
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的博客',
  description: '...',
}

export default function Page() {}
```

```jsx switcher
export const metadata = {
  title: '我的博客',
  description: '...',
}

export default function Page() {}
```

你可以在 [`generateMetadata` 文档](/nextjs-cn/app/api-reference/functions/generate-metadata#metadata-fields)中查看完整的可用选项列表。

## 生成的元数据

你可以使用 [`generateMetadata`](/nextjs-cn/app/api-reference/functions/generate-metadata) 函数来 `fetch` 依赖于数据的元数据。例如，获取特定博客文章的标题和描述：

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
  const slug = (await params).slug

  // 获取文章信息
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) => res.json())

  return {
    title: post.title,
    description: post.description,
  }
}

export default function Page({ params, searchParams }: Props) {}
```

```jsx switcher
export async function generateMetadata({ params, searchParams }, parent) {
  const slug = (await params).slug

  // 获取文章信息
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) => res.json())

  return {
    title: post.title,
    description: post.description,
  }
}

export default function Page({ params, searchParams }) {}
```

在后台，Next.js 会将元数据与 UI 分开流式传输，并在元数据解析完成后立即将其注入到 HTML 中。

### 记忆化数据请求

在某些情况下，你可能需要为元数据和页面本身获取**相同**的数据。为了避免重复请求，你可以使用 React 的 [`cache` 函数](https://react.dev/reference/react/cache)来记忆化返回值，只获取一次数据。例如，为元数据和页面获取博客文章信息：

```tsx highlight={5} switcher
import { cache } from 'react'
import { db } from '@/app/lib/db'

// getPost 将被使用两次，但只执行一次
export const getPost = cache(async (slug: string) => {
  const res = await db.query.posts.findFirst({ where: eq(posts.slug, slug) })
  return res
})
```

```jsx highlight={5} switcher
import { cache } from 'react'
import { db } from '@/app/lib/db'

// getPost 将被使用两次，但只执行一次
export const getPost = cache(async (slug) => {
  const res = await db.query.posts.findFirst({ where: eq(posts.slug, slug) })
  return res
})
```

```tsx switcher
import { getPost } from '@/app/lib/data'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return <div>{post.title}</div>
}
```

```jsx switcher
import { getPost } from '@/app/lib/data'

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function Page({ params }) {
  const post = await getPost(params.slug)
  return <div>{post.title}</div>
}
```

## 基于文件的元数据

以下是可用的特殊元数据文件：

- [favicon.ico、apple-icon.jpg 和 icon.jpg](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons)
- [opengraph-image.jpg 和 twitter-image.jpg](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)
- [robots.txt](/nextjs-cn/app/api-reference/file-conventions/metadata/robots)
- [sitemap.xml](/nextjs-cn/app/api-reference/file-conventions/metadata/sitemap)

你可以将这些用于静态元数据，或者使用代码以编程方式生成这些文件。

## 网站图标

网站图标是在书签和搜索结果中代表你的网站的小图标。要为你的应用程序添加网站图标，请创建一个 `favicon.ico` 并将其添加到 app 文件夹的根目录。

<Image
  alt="app 文件夹中的 Favicon 特殊文件与相邻的 layout 和 page 文件"
  srcLight="/docs/light/favicon-ico.png"
  srcDark="/docs/dark/favicon-ico.png"
  width="1600"
  height="444"
/>

> 你也可以使用代码以编程方式生成网站图标。查看[网站图标文档](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons)了解更多信息。

## 静态 Open Graph 图片

Open Graph (OG) 图片是在社交媒体中代表你的网站的图片。要为你的应用程序添加静态 OG 图片，请在 app 文件夹的根目录创建一个 `opengraph-image.png` 文件。

<Image
  alt="app 文件夹中的 OG 图片特殊文件与相邻的 layout 和 page 文件"
  srcLight="/docs/light/opengraph-image.png"
  srcDark="/docs/dark/opengraph-image.png"
  width="1600"
  height="444"
/>

你也可以通过在文件夹结构的更深层次创建 `opengraph-image.png` 来为特定路由添加 OG 图片。例如，要为 `/blog` 路由创建特定的 OG 图片，请在 `blog` 文件夹中添加一个 `opengraph-image.jpg` 文件。

<Image
  alt="blog 文件夹中的 OG 图片特殊文件"
  srcLight="/docs/light/opengraph-image-blog.png"
  srcDark="/docs/dark/opengraph-image-blog.png"
  width="1600"
  height="525"
/>

更具体的图片将优先于文件夹结构中其上方的任何 OG 图片。

> 其他图片格式如 `jpeg`、`png` 和 `webp` 也受支持。查看 [Open Graph 图片文档](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)了解更多信息。

## 生成的 Open Graph 图片

[`ImageResponse` 构造函数](/nextjs-cn/app/api-reference/functions/image-response)允许你使用 JSX 和 CSS 生成动态图片。这对于依赖数据的 OG 图片很有用。

例如，要为每个博客文章生成唯一的 OG 图片，请在 `blog` 文件夹中添加一个 `opengraph-image.ts` 文件，并从 `next/og` 导入 `ImageResponse` 构造函数：

```tsx switcher
import { ImageResponse } from 'next/og'
import { getPost } from '@/app/lib/data'

// 图片元数据
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// 图片生成
export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return new ImageResponse(
    (
      // ImageResponse JSX 元素
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    ),
  )
}
```

```jsx switcher
import { ImageResponse } from 'next/og'
import { getPost } from '@/app/lib/data'

// 图片元数据
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// 图片生成
export default async function Image({ params }) {
  const post = await getPost(params.slug)

  return new ImageResponse(
    (
      // ImageResponse JSX 元素
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    ),
  )
}
```

`ImageResponse` 支持常见的 CSS 属性，包括 flexbox 和绝对定位、自定义字体、文本换行、居中和嵌套图片。[查看支持的 CSS 属性完整列表](/nextjs-cn/app/api-reference/functions/image-response)。

> **注意事项**：
>
> - 示例可在 [Vercel OG Playground](https://og-playground.vercel.app/) 中查看。
> - `ImageResponse` 使用 [`@vercel/og`](https://vercel.com/docs/og-image-generation)、[`satori`](https://github.com/vercel/satori) 和 `resvg` 将 HTML 和 CSS 转换为 PNG。
> - 仅支持 flexbox 和部分 CSS 属性。高级布局（如 `display: grid`）将无法工作。
