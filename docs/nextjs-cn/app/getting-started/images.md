---
title: 如何优化图片
nav_title: 图片
description: 学习如何在 Next.js 中优化图片
related:
  title: API 参考
  description: 查看 API 参考以了解 Next.js Image 的完整功能集。
  links:
    - app/api-reference/components/image
---

Next.js 的 [`<Image>`](/docs/nextjs-cn/app/api-reference/components/image) 组件扩展了 HTML 的 `<img>` 元素，提供以下功能：

- **尺寸优化：** 自动为每个设备提供正确尺寸的图片，使用 WebP 等现代图片格式。
- **视觉稳定性：** 在图片加载时自动防止[布局偏移](https://web.dev/articles/cls)。
- **更快的页面加载：** 使用浏览器原生懒加载，仅在图片进入视口时加载，可选择使用模糊占位符。
- **资源灵活性：** 按需调整图片大小，即使是存储在远程服务器上的图片。

要开始使用 `<Image>`，从 `next/image` 导入它并在你的组件中渲染它。

```tsx switcher
import Image from 'next/image'

export default function Page() {
  return <Image src="" alt="" />
}
```

```jsx switcher
import Image from 'next/image'

export default function Page() {
  return <Image src="" alt="" />
}
```

`src` 属性可以是[本地图片](#local-images)或[远程图片](#remote-images)。

> **🎥 观看：** 了解更多关于如何使用 `next/image` → [YouTube（9 分钟）](https://youtu.be/IU_qq_c_lKA)。

## 本地图片

你可以在根目录下名为 [`public`](/docs/nextjs-cn/app/api-reference/file-conventions/public-folder) 的文件夹中存储静态文件，如图片和字体。然后，你的代码可以从基础 URL（`/`）开始引用 `public` 中的文件。

<Image
  alt="显示 app 和 public 文件夹的文件夹结构"
  srcLight="/docs/light/public-folder.png"
  srcDark="/docs/dark/public-folder.png"
  width="1600"
  height="282"
/>

```tsx switcher
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="作者的照片"
      // width={500} 自动提供
      // height={500} 自动提供
      // blurDataURL="data:..." 自动提供
      // placeholder="blur" // 可选的加载时模糊效果
    />
  )
}
```

```jsx switcher
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="作者的照片"
      // width={500} 自动提供
      // height={500} 自动提供
      // blurDataURL="data:..." 自动提供
      // placeholder="blur" // 可选的加载时模糊效果
    />
  )
}
```

当使用本地图片时，Next.js 会根据导入的文件自动确定图片的固有 [`width`](/docs/nextjs-cn/app/api-reference/components/image#width-and-height) 和 [`height`](/docs/nextjs-cn/app/api-reference/components/image#width-and-height)。这些值用于确定图片比例并防止图片加载时的[累积布局偏移](https://web.dev/articles/cls)。

## 远程图片

要使用远程图片，你可以为 `src` 属性提供一个 URL 字符串。

```tsx switcher
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="作者的照片"
      width={500}
      height={500}
    />
  )
}
```

```jsx switcher
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="作者的照片"
      width={500}
      height={500}
    />
  )
}
```

由于 Next.js 在构建过程中无法访问远程文件，你需要手动提供 [`width`](/docs/nextjs-cn/app/api-reference/components/image#width-and-height)、[`height`](/docs/nextjs-cn/app/api-reference/components/image#width-and-height) 和可选的 [`blurDataURL`](/docs/nextjs-cn/app/api-reference/components/image#blurdataurl) 属性。`width` 和 `height` 用于推断图片的正确宽高比，并避免图片加载时的布局偏移。

要安全地允许来自远程服务器的图片，你需要在 [`next.config.js`](/docs/nextjs-cn/app/api-reference/config/next-config-js) 中定义支持的 URL 模式列表。要尽可能具体以防止恶意使用。例如，以下配置将只允许来自特定 AWS S3 存储桶的图片：

```ts switcher
import { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
}

export default config
```

```js switcher
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
}
```
