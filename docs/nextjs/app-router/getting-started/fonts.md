---
title: Next.js 中文文档 - 字体优化
description: 了解如何使用Next.js自动优化字体，包括Google字体和本地字体。
---

# Next.js 中文文档 - 字体优化

Next.js提供了内置的字体系统，通过零布局偏移的字体加载来改善应用程序的性能和用户体验。

## Next.js字体系统

Next.js的字体系统通过`next/font`提供以下功能：

- 自动优化：字体文件与其他静态资产一起托管
- 零布局偏移：通过CSS预先标准化字体布局
- 隐私保护：没有到字体提供商的外部网络请求
- 灵活性：支持Google字体和任何自托管字体

## 使用Google字体

### 基本用法

```jsx
import { Inter } from 'next/font/google'

// 初始化字体对象
const inter = Inter({
  subsets: ['latin'], // 字符子集
  weight: ['400', '700'], // 字重
  display: 'swap', // 字体显示策略
})

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### 单个变体

```jsx
import { Roboto } from 'next/font/google'

// 加载单一字重
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function MyComponent() {
  return (
    <div className={roboto.className}>
      <p>这段文字使用Roboto字体的400字重。</p>
    </div>
  )
}
```

### 多个变体

```jsx
import { Roboto } from 'next/font/google'

// 加载多个字重
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})
```

### 可变字体

```jsx
import { Inter } from 'next/font/google'

// 加载整个可变字重范围
const inter = Inter({
  subsets: ['latin'],
  weight: '100 900', // 从100到900的所有字重
})
```

## 本地字体

### 单个本地字体

```jsx
import localFont from 'next/font/local'

// 加载单个本地字体文件
const myFont = localFont({
  src: './fonts/my-font.woff2',
  display: 'swap',
})

export default function MyComponent() {
  return (
    <div className={myFont.className}>
      <p>这段文字使用本地字体。</p>
    </div>
  )
}
```

### 多个本地字体变体

```jsx
import localFont from 'next/font/local'

// 加载多个本地字体文件作为一个字体族
const myFont = localFont({
  src: [
    {
      path: './fonts/my-font-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/my-font-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/my-font-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
})
```

## 在特定元素上应用字体

字体可以应用于特定元素，而不是整个应用程序：

```jsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto_Mono({ subsets: ['latin'] })

export default function Page() {
  return (
    <div>
      {/* 默认使用Inter字体 */}
      <p className={inter.className}>这段文本使用Inter字体。</p>

      {/* 使用Roboto Mono字体 */}
      <div className={roboto.className}>
        <p>这段文本使用Roboto Mono字体。</p>
        <p>这段也是。</p>
      </div>
    </div>
  )
}
```

## 使用CSS变量

为了在CSS中更灵活地使用字体，可以使用CSS变量：

```jsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className={`${inter.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

然后在你的CSS中：

```css
/* app/globals.css */
.title {
  font-family: var(--font-inter);
}

.code {
  font-family: var(--font-roboto-mono);
}
```

## 预加载

默认情况下，`next/font`会预加载字体文件以提高性能。可以通过`preload`选项控制此行为：

```jsx
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  preload: false, // 禁用预加载
})
```

## 后备字体

指定字体加载前应使用的后备字体：

```jsx
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  fallback: ['system-ui', 'Helvetica Neue', 'Arial'], // 后备字体
})
```

## 自动调整字体大小

Next.js会自动为每种字体生成适当的`size-adjust`值，确保后备字体的尺寸与最终字体匹配，减少布局偏移：

```jsx
const inter = Inter({
  subsets: ['latin'],
  adjustFontFallback: true, // 默认为true
})
```

## 与Tailwind CSS集成

可以将Next.js字体系统与Tailwind CSS集成：

```jsx
// app/layout.js
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
```

## 性能优势

Next.js字体系统相比传统的网络字体引入方式具有以下优势：

1. **零布局偏移**：通过预先计算字体度量并使用size-adjust，避免了内容跳动
2. **更快的加载**：通过自托管字体文件并优化预加载，减少加载时间
3. **隐私增强**：无需向第三方字体提供商发出请求
4. **一致的体验**：更一致的字体显示行为，避免了FOUT(无样式文本闪烁)和FOIT(不可见文本闪烁)

## 高级配置选项

`next/font`提供多种配置选项以满足特定需求：

```jsx
const myFont = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap', // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  preload: true,
  fallback: ['system-ui', 'Arial'],
  adjustFontFallback: true,
  variable: '--font-roboto',
  axes: ['slnt', 'wdth'], // 用于可变字体的可选轴
})
```

## 了解更多

更详细的API文档，请查看[Font组件API参考](/nextjs/app-router/api-reference/components/font)。
