---
title: Next.js 中文文档 - 图片优化
description: 了解如何使用Next.js的Image组件来优化网站图片。
---

# Next.js 中文文档 - 图片优化

Next.js内置图片组件和自动图片优化功能，提供了改进的性能及现代图片最佳实践。

## Image组件

Next.js提供了一个`Image`组件，扩展了HTML的`<img>`元素，具有多项自动优化功能：

- **尺寸优化**：自动为每个设备提供适当大小的图片
- **视觉稳定性**：防止图片加载时的布局偏移(CLS)
- **快速加载**：图片仅在进入视口时加载，支持模糊占位符
- **格式灵活性**：支持现代格式如WebP和AVIF

## 基本用法

要使用Image组件，首先从`next/image`导入它：

```jsx
import Image from 'next/image'
```

### 本地图片

```jsx
import Image from 'next/image'
import profilePic from './profile.jpg'

function Profile() {
  return (
    <Image
      src={profilePic}
      alt="个人头像"
      // width和height会自动从导入的图片提供
      // 或者可以明确设置：
      // width={500}
      // height={500}
    />
  )
}
```

### 远程图片

使用远程图片时，需要提供`width`和`height`属性，并配置允许的图片域名：

```jsx
import Image from 'next/image'

function Banner() {
  return <Image src="https://example.com/banner.jpg" alt="网站横幅" width={1200} height={400} />
}
```

在`next.config.js`中配置允许的图片源：

```js
module.exports = {
  images: {
    domains: ['example.com'],
  },
}
```

## 响应式图片

使用`fill`属性让图片填充父容器：

```jsx
import Image from 'next/image'

function Hero() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <Image src="/hero.jpg" alt="hero section" fill style={{ objectFit: 'cover' }} />
    </div>
  )
}
```

使用`sizes`属性定义响应式布局中的图片大小：

```jsx
<Image
  src="/responsive.jpg"
  alt="响应式图片"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  style={{ objectFit: 'cover' }}
/>
```

## 图片加载优化

### 懒加载

默认情况下，图片组件使用懒加载 - 只有当图片接近视口时才会加载。

对于视口内最重要的图片，使用`priority`属性：

```jsx
<Image src="/hero.jpg" alt="Hero图片" width={1200} height={600} priority />
```

### 图片占位符

在图片加载时显示占位符：

```jsx
<Image
  src="/large-image.jpg"
  alt="大图片"
  width={1200}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg12AAAAIQAAABZ6EAAQAAAAEAAAAAAAAAAAABAAAAAAAAAgAAAAAAAAAAAAAAQlIAAAAA"
/>
```

## 图片样式

可以使用CSS模块或内联样式设置图片样式：

```jsx
// 使用style属性
<Image
  src="/profile.jpg"
  alt="Profile"
  width={300}
  height={300}
  style={{ borderRadius: '50%' }}
/>

// 使用CSS类
<Image
  src="/profile.jpg"
  alt="Profile"
  width={300}
  height={300}
  className={styles.profileImage}
/>
```

## 高级配置

在`next.config.js`中配置图片优化的更多选项：

```js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'], // 允许的图片域名
    formats: ['image/avif', 'image/webp'], // 支持的图片格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 设备尺寸断点
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 图片尺寸断点
    minimumCacheTTL: 60, // 缓存TTL（秒）
  },
}
```

## 最佳实践

1. **总是设置`alt`描述**：为每个图片添加替代文本，提升可访问性和SEO
2. **避免布局偏移**：静态导入图片或指定`width`和`height`
3. **使用正确的优先级**：对于首屏图片使用`priority`属性
4. **谨慎使用远程图片**：只允许受信任域名的图片
5. **使用正确的响应式策略**：适当设置`sizes`属性以获得最佳性能

## 性能对比

与传统HTML图片标签相比，Next.js的Image组件：

- 减少了加载未在视口中的图片的带宽
- 自动优化图片格式和大小
- 显著减少累积布局偏移(CLS)
- 提高了页面加载速度和灯塔(Lighthouse)性能得分

## 了解更多

更详细的API文档，请查看[Image组件API参考](/nextjs/app-router/api-reference/components/image)。
