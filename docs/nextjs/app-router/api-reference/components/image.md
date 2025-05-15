---
title: Next.js 中文文档 - Image
description: Next.js 的内置 Image 组件可以优化图片加载，提供自动图片优化功能。
---

# Next.js 中文文档 - Image 组件

Next.js 的 `Image` 组件扩展了HTML的 `<img>` 元素，提供了多项图片优化功能：

- **尺寸优化**：自动为每个设备提供适当大小的图片
- **视觉稳定性**：防止图片加载时的布局偏移
- **加载速度提升**：图片仅在进入视口时加载，支持模糊占位符
- **图片调整**：按需调整图片大小，无需额外图片处理服务

## 导入

```jsx
import Image from 'next/image'
```

## 必需的属性

`Image` 组件需要以下属性：

### `src`

必须是以下之一：

1. 静态导入的图片文件
2. 路径字符串
3. 对象形式的URL（如从 `loader` 返回的结果）

```jsx
// 1. 静态导入
import profilePic from './me.png'

<Image
  src={profilePic}
  alt="我的头像"
/>

// 2. 路径字符串
<Image
  src="/me.png"
  width={500}
  height={300}
  alt="我的头像"
/>

// 3. 远程URL
<Image
  src="https://example.com/me.png"
  width={500}
  height={300}
  alt="我的头像"
/>
```

> **注意**：使用远程URL时，必须在 `next.config.js` 中配置允许的域名。

### `width` 和 `height`

- 对于静态导入的图片，自动设置
- 对于非静态导入的图片，必须指定这些值（以像素为单位）
- 用于图片初始渲染时的尺寸，防止布局偏移

### `alt`

描述图片内容的替代文本，对屏幕阅读器和SEO非常重要。

如果图片纯粹是装饰性的，应设置 `alt=""`。

## 可选的属性

### `loader`

自定义函数，确定图片URL的生成方式：

```jsx
import Image from 'next/image'

const customLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Page() {
  return <Image loader={customLoader} src="me.png" alt="我的头像" width={500} height={300} />
}
```

### `fill`

当设置为 `true` 时，图片会拉伸以填充其父容器。

- 父容器必须设置 `position: relative`
- 通常与 `object-fit` 属性搭配使用

```jsx
<div style={{ position: 'relative', width: '100%', height: '300px' }}>
  <Image src="/landscape.jpg" alt="风景图片" fill style={{ objectFit: 'cover' }} />
</div>
```

### `sizes`

一个描述图片在不同断点处宽度的字符串，帮助浏览器选择最佳图片源：

```jsx
<Image
  src="/photo.jpg"
  alt="响应式图片"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
/>
```

### `quality`

图片质量参数，从 1 到 100，默认为 75：

```jsx
<Image src="/photo.jpg" alt="高质量图片" width={700} height={475} quality={90} />
```

### `priority`

设置为 `true` 时，图片会立即加载，并获得较高的加载优先级。推荐用于页面视口内的主要图片：

```jsx
<Image src="/hero.jpg" alt="英雄图片" width={1200} height={600} priority />
```

### `placeholder`

控制图片加载时的占位符行为，可选值：

- `empty`：默认，无占位符
- `blur`：显示模糊版本的图片作为占位符

当使用 `blur` 时，还需要提供 `blurDataURL` 属性，或者使用具有可导入图片自带的模糊数据的静态导入：

```jsx
// 使用静态导入的图片（自动提供blurDataURL）
import profilePic from './profile.jpg'

<Image
  src={profilePic}
  alt="个人头像"
  placeholder="blur"
/>

// 使用远程图片时提供blurDataURL
<Image
  src="https://example.com/photo.jpg"
  alt="远程图片"
  width={500}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAKBweIx4ZKCMhIy0rKDA8ZEE8Nzc8e1hdSWSRgJmWj4CMiqC05sOgqtqtiozI/8va7vX///+bwf////r/5v3/+P/bAEMBKy0tPDU8dkFBdviljKX4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+P/AABEIABkAGQMBIgACEQEDEQH/xAAYAAEAAwEAAAAAAAAAAAAAAAAABAUGB//EACEQAAICAgEEAwAAAAAAAAAAAAECAwQABRESFSExQVFh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDTkPVRWQAgSMGQE+8SrUbW2DM1WOhHG5BYlyfAJ9ZE1UlNaxr23aCXiSN15ABGVNlZbL2SxroLHVYZZGDMeB4AA9DAXuou9c6TdKC6fiFYhBk10tzVqmxU8NGp6S2/rEtZdWbhUunbttrqVA4JOfGMmrP/2Q=="
/>
```

### `style`

应用于图片的CSS样式：

```jsx
<Image
  src="/photo.jpg"
  alt="样式化图片"
  width={500}
  height={300}
  style={{
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }}
/>
```

### `onLoad`

图片完全加载后的回调函数：

```jsx
<Image
  src="/photo.jpg"
  alt="加载事件图片"
  width={500}
  height={300}
  onLoad={() => console.log('图片已加载')}
/>
```

### `onError`

图片加载失败时的回调函数：

```jsx
<Image
  src="/photo.jpg"
  alt="错误事件图片"
  width={500}
  height={300}
  onError={() => console.error('图片加载失败')}
/>
```

### 其他属性

还支持大多数标准的 `<img>` 属性，例如：

- `className`
- `id`
- `lang`
- `data-*`
- `loading`（用于控制自定义加载行为）
- `decoding`
- 等等

## 高级用法

### 与响应式设计结合

结合 `fill`、`sizes` 和 CSS 可以创建完全响应式的图片：

```jsx
import Image from 'next/image'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <Image
        src="/hero-image.jpg"
        alt="网站英雄图片"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        priority
      />
      <h1 className={styles.heroTitle}>欢迎访问我们的网站</h1>
    </div>
  )
}
```

```css
/* hero.module.css */
.heroContainer {
  position: relative;
  height: 60vh;
  width: 100%;
}

.heroTitle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
```

### 使用图片懒加载

默认情况下，图片会延迟加载，直到滚动到视口附近。对于屏幕外的图片，可以优化加载策略：

```jsx
<div className="grid">
  {products.map((product) => (
    <div key={product.id} className="card">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        // 图片在滚动到距离视口100px时开始加载
        loading="lazy"
      />
      <h3>{product.name}</h3>
    </div>
  ))}
</div>
```

### 支持未知尺寸的远程图片

当处理尺寸未知的远程图片时，可以：

1. 使用 `fill` 属性替代硬编码的 `width` 和 `height`
2. 使用 `layout="raw"` 的选项（但需注意可能导致布局偏移）

```jsx
// 使用fill选项
<div style={{ position: 'relative', width: '100%', height: '300px' }}>
  <Image
    src="https://example.com/unknown-size-image.jpg"
    alt="未知尺寸的图片"
    fill
    style={{ objectFit: 'contain' }}
  />
</div>
```

### 动态图片导入

可以使用动态导入实现条件图片加载：

```jsx
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function DynamicImage() {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const loadImage = async () => {
      // 动态导入图片
      const image = await import(`../public/images/theme-${theme}.jpg`)
      setImageSrc(image.default)
    }

    loadImage()
  }, [theme])

  if (!imageSrc) {
    return <div>加载中...</div>
  }

  return <Image src={imageSrc} alt="主题图片" placeholder="blur" />
}
```

## 配置选项

在 `next.config.js` 中可以配置 Image 组件的行为：

```js
module.exports = {
  images: {
    // 允许优化的远程图片域名
    domains: ['example.com', 'cdn.example.com'],

    // 远程图片模式的特定域配置
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        port: '',
        pathname: '/images/**',
      },
    ],

    // 设置图片输出格式
    formats: ['image/webp'],

    // 控制设备尺寸断点
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // 控制图片尺寸断点
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 自定义图片加载器
    loader: 'default',
    loaderFile: '',

    // 禁用默认图片优化API
    disableStaticImages: false,

    // 设置图片输出路径
    path: '/_next/image',

    // 设置图片响应的缓存头
    minimumCacheTTL: 60,

    // 设置是否启用SVG图片的处理
    dangerouslyAllowSVG: false,

    // 设置内容安全策略
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}
```

## 性能提示

1. **使用 `priority` 属性**：对于首屏可见的重要图片（如横幅或英雄图片）设置 priority 属性
2. **避免布局偏移**：始终指定 `width` 和 `height`，或使用 `fill` 属性
3. **合理使用 `sizes` 属性**：提供准确的 sizes 描述，帮助浏览器选择合适的图片源
4. **使用模糊占位符**：通过 `placeholder="blur"` 改善用户体验
5. **优化图片资源**：使用适当的图片格式（WebP, AVIF）并压缩源图片

## 与传统 img 标签的区别

| 特性       | Next.js Image          | 传统 img 标签 |
| ---------- | ---------------------- | ------------- |
| 尺寸优化   | 自动生成不同尺寸的图片 | 需要手动处理  |
| 延迟加载   | 默认启用               | 需要手动实现  |
| CLS防止    | 自动预留空间           | 需要手动处理  |
| 格式优化   | 自动转换为现代格式     | 需要手动处理  |
| 跨域优化   | 自动管理               | 需要手动处理  |
| 模糊占位符 | 内置支持               | 需要手动实现  |

## 常见问题解答

### 图片显示错误

如果远程图片无法显示，请检查：

1. 已在 `next.config.js` 中正确配置了 `domains` 或 `remotePatterns`
2. 图片URL是否有效且可公开访问

### 布局偏移问题

如果遇到布局偏移：

1. 确保提供了正确的 `width` 和 `height` 属性
2. 使用 `fill` 时确保父容器具有 `position: relative` 和明确的尺寸

### 响应式图片设置

对于响应式布局：

1. 使用 `fill` 属性
2. 设置 `sizes` 属性以指定不同断点下的图片宽度
3. 使用 CSS 控制父容器大小和 `object-fit` 属性

## 相关资源

- [Next.js 图片优化官方文档](https://nextjs.org/docs/app/api-reference/components/image)
- [Web 图片性能优化指南](https://web.dev/articles/fast#images)
- [响应式图片最佳实践](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
