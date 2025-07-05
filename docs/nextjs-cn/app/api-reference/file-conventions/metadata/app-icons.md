---
title: favicon, icon, 和 apple-icon
description: Favicon, Icon 和 Apple Icon 文件约定的 API 参考。
---

`favicon`、`icon` 或 `apple-icon` 文件约定允许你为应用程序设置图标。

这些图标在网络浏览器标签页、手机主屏幕和搜索引擎结果等场所显示，非常有用。

设置应用图标有两种方式：

- [使用图像文件 (.ico, .jpg, .png)](#图像文件-ico-jpg-png)
- [使用代码生成图标 (.js, .ts, .tsx)](#使用代码生成图标-js-ts-tsx)

## 图像文件 (.ico, .jpg, .png)

通过在 `/app` 目录中放置 `favicon`、`icon` 或 `apple-icon` 图像文件来设置应用图标。
`favicon` 图像只能位于 `app/` 的顶层。

Next.js 将评估文件并自动将适当的标签添加到应用的 `<head>` 元素中。

| 文件约定                    | 支持的文件类型                          | 有效位置   |
| --------------------------- | --------------------------------------- | ---------- |
| [`favicon`](#favicon)       | `.ico`                                  | `app/`     |
| [`icon`](#icon)             | `.ico`, `.jpg`, `.jpeg`, `.png`, `.svg` | `app/**/*` |
| [`apple-icon`](#apple-icon) | `.jpg`, `.jpeg`, `.png`                 | `app/**/*` |

### `favicon`

将 `favicon.ico` 图像文件添加到根 `/app` 路由段。

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
```

### `icon`

添加 `icon.(ico|jpg|jpeg|png|svg)` 图像文件。

```html
<link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
```

### `apple-icon`

添加 `apple-icon.(jpg|jpeg|png)` 图像文件。

```html
<link
  rel="apple-touch-icon"
  href="/apple-icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
```

> **须知**：
>
> - 你可以通过在文件名中添加数字后缀来设置多个图标。例如，`icon1.png`、`icon2.png` 等。带编号的文件将按字典顺序排序。
> - Favicon 只能在根 `/app` 段中设置。如果你需要更精细的控制，可以使用 [`icon`](#icon)。
> - 根据图标类型和评估文件的元数据，会自动确定适当的 `<link>` 标签和属性，如 `rel`、`href`、`type` 和 `sizes`。
> - 例如，一个 32x32 像素的 `.png` 文件将具有 `type="image/png"` 和 `sizes="32x32"` 属性。
> - 当扩展名为 `.svg` 或无法确定文件的图像大小时，会添加 `sizes="any"`。更多详情请参阅这个 [favicon 手册](https://evilmartians.com/chronicles/how-to-favicon-in-six-files-that-fit-most-needs)。

## 使用代码生成图标 (.js, .ts, .tsx)

除了使用[实际图像文件](#图像文件-ico-jpg-png)外，你还可以使用代码以编程方式**生成**图标。

通过创建默认导出函数的 `icon` 或 `apple-icon` 路由来生成应用图标。

| 文件约定     | 支持的文件类型       |
| ------------ | -------------------- |
| `icon`       | `.js`, `.ts`, `.tsx` |
| `apple-icon` | `.js`, `.ts`, `.tsx` |

生成图标最简单的方法是使用 `next/og` 中的 [`ImageResponse`](/docs/nextjs-cn/app/api-reference/functions/image-response) API。

```tsx switcher
import { ImageResponse } from 'next/og'

// 图像元数据
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// 图像生成
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX 元素
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        A
      </div>
    ),
    // ImageResponse 选项
    {
      // 为方便起见，我们可以重用导出的图标尺寸元数据
      // 配置来设置 ImageResponse 的宽度和高度。
      ...size,
    },
  )
}
```

```jsx switcher
import { ImageResponse } from 'next/og'

// 图像元数据
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// 图像生成
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX 元素
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        A
      </div>
    ),
    // ImageResponse 选项
    {
      // 为方便起见，我们可以重用导出的图标尺寸元数据
      // 配置来设置 ImageResponse 的宽度和高度。
      ...size,
    },
  )
}
```

```html
<link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
```

> **须知**：
>
> - 默认情况下，生成的图标会进行[**静态优化**](/docs/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)（在构建时生成并缓存），除非它们使用[动态 API](/docs/nextjs-cn/app/building-your-application/rendering/server-components#server-rendering-strategies#dynamic-apis)或未缓存的数据。
> - 你可以使用 [`generateImageMetadata`](/docs/nextjs-cn/app/api-reference/functions/generate-image-metadata) 在同一文件中生成多个图标。
> - 你不能生成 `favicon` 图标。请使用 [`icon`](#icon) 或 [favicon.ico](#favicon) 文件。
> - 应用图标是默认被缓存的特殊路由处理程序，除非它使用了[动态 API](/docs/nextjs-cn/app/deep-dive/caching#dynamic-apis)或[动态配置](/docs/nextjs-cn/app/deep-dive/caching#segment-config-options)选项。

### Props

默认导出函数接收以下 props：

#### `params`（可选）

一个包含从根段到 `icon` 或 `apple-icon` 所在段的[动态路由参数](/docs/nextjs-cn/app/building-your-application/routing/index/dynamic-routes)对象。

```tsx switcher
export default function Icon({ params }: { params: { slug: string } }) {
  // ...
}
```

```jsx switcher
export default function Icon({ params }) {
  // ...
}
```

| 路由                            | URL         | `params`                  |
| ------------------------------- | ----------- | ------------------------- |
| `app/shop/icon.js`              | `/shop`     | `undefined`               |
| `app/shop/[slug]/icon.js`       | `/shop/1`   | `{ slug: '1' }`           |
| `app/shop/[tag]/[item]/icon.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |

### 返回值

默认导出函数应返回 `Blob` | `ArrayBuffer` | `TypedArray` | `DataView` | `ReadableStream` | `Response`。

> **须知**：`ImageResponse` 满足此返回类型。

### 配置导出

你可以通过从 `icon` 或 `apple-icon` 路由导出 `size` 和 `contentType` 变量来选择性地配置图标的元数据。

| 选项                          | 类型                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`size`](#size)               | `{ width: number; height: number }`                                                                            |
| [`contentType`](#contenttype) | `string` - [图像 MIME 类型](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types) |

#### `size`

```tsx switcher
export const size = { width: 32, height: 32 }

export default function Icon() {}
```

```jsx switcher
export const size = { width: 32, height: 32 }

export default function Icon() {}
```

```html
<link rel="icon" sizes="32x32" />
```

#### `contentType`

```tsx switcher
export const contentType = 'image/png'

export default function Icon() {}
```

```jsx switcher
export const contentType = 'image/png'

export default function Icon() {}
```

```html
<link rel="icon" type="image/png" />
```

#### 路由段配置

`icon` 和 `apple-icon` 是专门的[路由处理程序](/docs/nextjs-cn/app/building-your-application/routing/index/route-handlers)，可以使用与页面和布局相同的[路由段配置](/docs/nextjs-cn/app/api-reference/file-conventions/route-segment-config)选项。

## 版本历史

| 版本      | 变更                                   |
| --------- | -------------------------------------- |
| `v13.3.0` | 引入 `favicon`、`icon` 和 `apple-icon` |
