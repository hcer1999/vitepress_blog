---
title: generateImageMetadata
description: 了解如何在单个元数据 API 特殊文件中生成多个图像。
related:
  title: 后续步骤
  description: 查看所有元数据 API 选项。
  links:
    - app/api-reference/file-conventions/metadata
---

# NextJS中文文档 - Generate Image Metadata

你可以使用 `generateImageMetadata` 生成一张图像的不同版本，或者为一个路由段返回多个图像。这在你想避免硬编码元数据值时很有用，例如对于图标。

## 参数

`generateImageMetadata` 函数接受以下参数：

#### `params`（可选）

一个包含从根段到调用 `generateImageMetadata` 的段的[动态路由参数](/nextjs-cn/app/building-your-application/routing/dynamic-routes)对象。

```tsx switcher
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  // ...
}
```

```jsx switcher
export function generateImageMetadata({ params }) {
  // ...
}
```

| 路由                            | URL         | `params`                  |
| ------------------------------- | ----------- | ------------------------- |
| `app/shop/icon.js`              | `/shop`     | `undefined`               |
| `app/shop/[slug]/icon.js`       | `/shop/1`   | `{ slug: '1' }`           |
| `app/shop/[tag]/[item]/icon.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |

## 返回值

`generateImageMetadata` 函数应该返回一个包含图像元数据的对象`数组`，如 `alt` 和 `size`。此外，每个项目**必须**包含一个 `id` 值，该值将传递给图像生成函数的 props。

| 图像元数据对象 | 类型                                |
| -------------- | ----------------------------------- |
| `id`           | `string`（必需）                    |
| `alt`          | `string`                            |
| `size`         | `{ width: number; height: number }` |
| `contentType`  | `string`                            |

```tsx switcher
import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 48, height: 48 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 72, height: 72 },
      id: 'medium',
    },
  ]
}

export default function Icon({ id }: { id: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 88,
          background: '#000',
          color: '#fafafa',
        }}
      >
        Icon {id}
      </div>
    ),
  )
}
```

```jsx switcher
import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 48, height: 48 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 72, height: 72 },
      id: 'medium',
    },
  ]
}

export default function Icon({ id }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 88,
          background: '#000',
          color: '#fafafa',
        }}
      >
        Icon {id}
      </div>
    ),
  )
}
```

### 示例

#### 使用外部数据

此示例使用 `params` 对象和外部数据为路由段生成多个 [Open Graph 图像](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)。

```tsx switcher
import { ImageResponse } from 'next/og'
import { getCaptionForImage, getOGImages } from '@/app/utils/images'

export async function generateImageMetadata({ params }: { params: { id: string } }) {
  const images = await getOGImages(params.id)

  return images.map((image, idx) => ({
    id: idx,
    size: { width: 1200, height: 600 },
    alt: image.text,
    contentType: 'image/png',
  }))
}

export default async function Image({ params, id }: { params: { id: string }; id: number }) {
  const productId = (await params).id
  const imageId = id
  const text = await getCaptionForImage(productId, imageId)

  return new ImageResponse(
    (
      <div
        style={
          {
            // ...
          }
        }
      >
        {text}
      </div>
    ),
  )
}
```

```jsx switcher
import { ImageResponse } from 'next/og'
import { getCaptionForImage, getOGImages } from '@/app/utils/images'

export async function generateImageMetadata({ params }) {
  const images = await getOGImages(params.id)

  return images.map((image, idx) => ({
    id: idx,
    size: { width: 1200, height: 600 },
    alt: image.text,
    contentType: 'image/png',
  }))
}

export default async function Image({ params, id }) {
  const productId = (await params).id
  const imageId = id
  const text = await getCaptionForImage(productId, imageId)

  return new ImageResponse(
    (
      <div
        style={
          {
            // ...
          }
        }
      >
        {text}
      </div>
    ),
  )
}
```

## 版本历史

| 版本      | 变更                           |
| --------- | ------------------------------ |
| `v13.3.0` | 引入 `generateImageMetadata`。 |
