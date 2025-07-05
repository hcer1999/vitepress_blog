---
title: opengraph-image 和 twitter-image
description: Open Graph 图像和 Twitter 图像文件约定的 API 参考。
---

`opengraph-image` 和 `twitter-image` 文件约定允许你为路由段设置 Open Graph 和 Twitter 图像。

这些图像在用户分享你网站链接时，会显示在社交网络和消息应用中，非常有用。

设置 Open Graph 和 Twitter 图像有两种方式：

- [使用图像文件 (.jpg, .png, .gif)](#图像文件-jpg-png-gif)
- [使用代码生成图像 (.js, .ts, .tsx)](#使用代码生成图像-js-ts-tsx)

## 图像文件 (.jpg, .png, .gif)

通过在路由段中放置 `opengraph-image` 或 `twitter-image` 图像文件，可以设置该路由段的共享图像。

Next.js 将评估文件并自动将适当的标签添加到应用的 `<head>` 元素中。

| 文件约定                                        | 支持的文件类型                  |
| ----------------------------------------------- | ------------------------------- |
| [`opengraph-image`](#opengraph-image)           | `.jpg`, `.jpeg`, `.png`, `.gif` |
| [`twitter-image`](#twitter-image)               | `.jpg`, `.jpeg`, `.png`, `.gif` |
| [`opengraph-image.alt`](#opengraph-imagealttxt) | `.txt`                          |
| [`twitter-image.alt`](#twitter-imagealttxt)     | `.txt`                          |

> **须知**：
>
> `twitter-image` 文件大小不得超过 [5MB](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary)，`opengraph-image` 文件大小不得超过 [8MB](https://developers.facebook.com/docs/sharing/webmasters/images)。如果图像文件大小超过这些限制，构建将失败。

### `opengraph-image`

在任何路由段中添加 `opengraph-image.(jpg|jpeg|png|gif)` 图像文件。

```html
<meta property="og:image" content="<generated>" />
<meta property="og:image:type" content="<generated>" />
<meta property="og:image:width" content="<generated>" />
<meta property="og:image:height" content="<generated>" />
```

### `twitter-image`

在任何路由段中添加 `twitter-image.(jpg|jpeg|png|gif)` 图像文件。

```html
<meta name="twitter:image" content="<generated>" />
<meta name="twitter:image:type" content="<generated>" />
<meta name="twitter:image:width" content="<generated>" />
<meta name="twitter:image:height" content="<generated>" />
```

### `opengraph-image.alt.txt`

在与 `opengraph-image.(jpg|jpeg|png|gif)` 图像相同的路由段中添加 `opengraph-image.alt.txt` 文件作为其替代文本。

```txt
About Acme
```

```html
<meta property="og:image:alt" content="About Acme" />
```

### `twitter-image.alt.txt`

在与 `twitter-image.(jpg|jpeg|png|gif)` 图像相同的路由段中添加 `twitter-image.alt.txt` 文件作为其替代文本。

```txt
About Acme
```

```html
<meta property="twitter:image:alt" content="About Acme" />
```

## 使用代码生成图像 (.js, .ts, .tsx)

除了使用[实际图像文件](#图像文件-jpg-png-gif)外，你还可以使用代码以编程方式**生成**图像。

通过创建默认导出函数的 `opengraph-image` 或 `twitter-image` 路由来生成路由段的共享图像。

| 文件约定          | 支持的文件类型       |
| ----------------- | -------------------- |
| `opengraph-image` | `.js`, `.ts`, `.tsx` |
| `twitter-image`   | `.js`, `.ts`, `.tsx` |

> **须知**：
>
> - 默认情况下，生成的图像会进行[**静态优化**](/docs/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)（在构建时生成并缓存），除非它们使用[动态 API](/docs/nextjs-cn/app/building-your-application/rendering/server-components#server-rendering-strategies#dynamic-apis)或未缓存的数据。
> - 你可以使用 [`generateImageMetadata`](/docs/nextjs-cn/app/api-reference/functions/generate-image-metadata) 在同一文件中生成多个图像。
> - `opengraph-image.js` 和 `twitter-image.js` 是默认被缓存的特殊路由处理程序，除非它们使用了[动态 API](/docs/nextjs-cn/app/deep-dive/caching#dynamic-apis)或[动态配置](/docs/nextjs-cn/app/deep-dive/caching#segment-config-options)选项。

生成图像最简单的方法是使用 `next/og` 中的 [ImageResponse](/docs/nextjs-cn/app/api-reference/functions/image-response) API。

```tsx switcher
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// 图像元数据
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// 图像生成
export default async function Image() {
  // 字体加载，process.cwd() 是 Next.js 项目目录
  const interSemiBold = await readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf'))

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
        About Acme
      </div>
    ),
    // ImageResponse 选项
    {
      // 为方便起见，我们可以重用导出的 opengraph-image
      // 尺寸配置来设置 ImageResponse 的宽度和高度。
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
```

```jsx switcher
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// 图像元数据
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// 图像生成
export default async function Image() {
  // 字体加载，process.cwd() 是 Next.js 项目目录
  const interSemiBold = await readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf'))

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
        About Acme
      </div>
    ),
    // ImageResponse 选项
    {
      // 为方便起见，我们可以重用导出的 opengraph-image
      // 尺寸配置来设置 ImageResponse 的宽度和高度。
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
```

```html
<meta property="og:image" content="<generated>" />
<meta property="og:image:alt" content="About Acme" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### Props

默认导出函数接收以下 props：

#### `params`（可选）

一个包含从根段到 `opengraph-image` 或 `twitter-image` 所在段的[动态路由参数](/docs/nextjs-cn/app/building-your-application/routing/index/dynamic-routes)对象。

```tsx switcher
export default function Image({ params }: { params: { slug: string } }) {
  // ...
}
```

```jsx switcher
export default function Image({ params }) {
  // ...
}
```

| 路由                                       | URL         | `params`                  |
| ------------------------------------------ | ----------- | ------------------------- |
| `app/shop/opengraph-image.js`              | `/shop`     | `undefined`               |
| `app/shop/[slug]/opengraph-image.js`       | `/shop/1`   | `{ slug: '1' }`           |
| `app/shop/[tag]/[item]/opengraph-image.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |

### 返回值

默认导出函数应返回 `Blob` | `ArrayBuffer` | `TypedArray` | `DataView` | `ReadableStream` | `Response`。

> **须知**：`ImageResponse` 满足此返回类型。

### 配置导出

你可以通过从 `opengraph-image` 或 `twitter-image` 路由导出 `alt`、`size` 和 `contentType` 变量来选择性地配置图像的元数据。

| 选项                          | 类型                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`alt`](#alt)                 | `string`                                                                                                       |
| [`size`](#size)               | `{ width: number; height: number }`                                                                            |
| [`contentType`](#contenttype) | `string` - [图像 MIME 类型](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types) |

#### `alt`

```tsx switcher
export const alt = 'My images alt text'

export default function Image() {}
```

```jsx switcher
export const alt = 'My images alt text'

export default function Image() {}
```

```html
<meta property="og:image:alt" content="My images alt text" />
```

#### `size`

```tsx switcher
export const size = { width: 1200, height: 630 }

export default function Image() {}
```

```jsx switcher
export const size = { width: 1200, height: 630 }

export default function Image() {}
```

```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

#### `contentType`

```tsx switcher
export const contentType = 'image/png'

export default function Image() {}
```

```jsx switcher
export const contentType = 'image/png'

export default function Image() {}
```

```html
<meta property="og:image:type" content="image/png" />
```

#### 路由段配置

`opengraph-image` 和 `twitter-image` 是专门的[路由处理程序](/docs/nextjs-cn/app/building-your-application/routing/index/route-handlers)，可以使用与页面和布局相同的[路由段配置](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config)选项。

### 示例

#### 使用外部数据

此示例使用 `params` 对象和外部数据生成图像。

> **须知**：
> 默认情况下，这个生成的图像将被[静态优化](/docs/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)。你可以配置单个 `fetch` [`选项`](/docs/nextjs-cn/app/api-reference/functions/fetch)或路由段[选项](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config#revalidate)来更改此行为。

```tsx switcher
import { ImageResponse } from 'next/og'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://.../posts/${params.slug}`).then((res) => res.json())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
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
    {
      ...size,
    },
  )
}
```

```jsx switcher
import { ImageResponse } from 'next/og'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }) {
  const post = await fetch(`https://.../posts/${params.slug}`).then((res) => res.json())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
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
    {
      ...size,
    },
  )
}
```

#### 使用 Node.js 运行时和本地资源

此示例使用 Node.js 运行时从文件系统获取本地图像，并将其作为 `ArrayBuffer` 传递给 `<img>` 元素的 `src` 属性。本地资源应放置在项目根目录下，而不是示例源文件的位置。

```tsx switcher
import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'logo.png'))
  const logoSrc = Uint8Array.from(logoData).buffer

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logoSrc} height="100" />
      </div>
    ),
  )
}
```

```jsx switcher
import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'logo.png'))
  const logoSrc = Uint8Array.from(logoData).buffer

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logoSrc} height="100" />
      </div>
    ),
  )
}
```

## 版本历史

| 版本      | 变更                                        |
| --------- | ------------------------------------------- |
| `v13.3.0` | 引入 `opengraph-image` 和 `twitter-image`。 |
