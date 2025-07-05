---
title: ImageResponse
description: ImageResponse 构造函数的 API 参考。
---

# NextJS中文文档 - Image Response

`ImageResponse` 构造函数允许你使用 JSX 和 CSS 生成动态图像。这对于生成社交媒体图像（如 Open Graph 图像、Twitter 卡片等）非常有用。

## 参考

### 参数

`ImageResponse` 可用的参数如下：

```jsx
import { ImageResponse } from 'next/og'

new ImageResponse(
  element: ReactElement,
  options: {
    width?: number = 1200
    height?: number = 630
    emoji?: 'twemoji' | 'blobmoji' | 'noto' | 'openmoji' = 'twemoji',
    fonts?: {
      name: string,
      data: ArrayBuffer,
      weight: number,
      style: 'normal' | 'italic'
    }[]
    debug?: boolean = false

    // 将传递给 HTTP 响应的选项
    status?: number = 200
    statusText?: string
    headers?: Record<string, string>
  },
)
```

> 示例可在 [Vercel OG Playground](https://og-playground.vercel.app/) 中查看。

### 支持的 HTML 和 CSS 特性

`ImageResponse` 支持常见的 CSS 属性，包括弹性盒布局和绝对定位、自定义字体、文本换行、居中和嵌套图像。

请参阅 [Satori 的文档](https://github.com/vercel/satori#css) 获取支持的 HTML 和 CSS 特性列表。

## 行为

- `ImageResponse` 使用 [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)、[Satori](https://github.com/vercel/satori) 和 Resvg 将 HTML 和 CSS 转换为 PNG。
- 只支持弹性盒布局和部分 CSS 属性。高级布局（如 `display: grid`）将不起作用。
- 最大包体积为 `500KB`。包体积包括你的 JSX、CSS、字体、图像和任何其他资源。如果超出限制，请考虑减小资源大小或在运行时获取。
- 仅支持 `ttf`、`otf` 和 `woff` 字体格式。为了最大化字体解析速度，推荐使用 `ttf` 或 `otf` 而不是 `woff`。

## 示例

### 路由处理程序

`ImageResponse` 可以在路由处理程序中使用，以在请求时动态生成图像。

```js
import { ImageResponse } from 'next/og'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}
          >
            Welcome to My Site
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#666',
              marginTop: '20px',
            }}
          >
            Generated with Next.js ImageResponse
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
```

### 基于文件的元数据

你可以在 [`opengraph-image.tsx`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image) 文件中使用 `ImageResponse` 来在构建时或请求时动态生成 Open Graph 图像。

```tsx
import { ImageResponse } from 'next/og'

// 图像元数据
export const alt = 'My site'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// 图像生成
export default async function Image() {
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
        My site
      </div>
    ),
    // ImageResponse 选项
    {
      // 为方便起见，我们可以重用导出的 opengraph-image
      // size 配置来设置 ImageResponse 的宽度和高度。
      ...size,
    },
  )
}
```

### 自定义字体

你可以通过在选项中提供 `fonts` 数组来在 `ImageResponse` 中使用自定义字体。

```tsx
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// 图像元数据
export const alt = 'My site'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// 图像生成
export default async function Image() {
  // 字体加载，process.cwd() 是 Next.js 项目目录
  const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-SemiBold.ttf')
  )

  return new ImageResponse(
    (
      // ...
    ),
    // ImageResponse 选项
    {
      // 为方便起见，我们可以重用导出的 opengraph-image
      // size 配置来设置 ImageResponse 的宽度和高度。
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
```

## 版本历史

| 版本      | 变更                                              |
| --------- | ------------------------------------------------- |
| `v14.0.0` | `ImageResponse` 从 `next/server` 移动到 `next/og` |
| `v13.3.0` | `ImageResponse` 可以从 `next/server` 导入。       |
| `v13.0.0` | 通过 `@vercel/og` 包引入 `ImageResponse`。        |
