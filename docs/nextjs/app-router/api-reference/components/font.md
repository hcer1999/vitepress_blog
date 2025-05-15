---
title: Next.js 中文文档 - Font
description: 使用Next.js Font组件自动优化字体，包括自定义字体和Google字体
---

# Next.js 中文文档 - Font 组件

Next.js在App Router中提供了内置的`next/font`模块，它可以自动优化你的字体，包括自定义字体和来自Google Fonts的字体。此功能通过零布局偏移(zero layout shift)、提前预加载和缓存字体文件来提升性能和用户体验。

## 特性

- **零布局偏移**：自动内联字体CSS，消除累积布局偏移(CLS)
- **预加载**：字体文件在构建时下载并与其他静态资产一起托管
- **隐私保护**：请求不发送到Google服务器，字体文件在你自己的域名上托管
- **类型安全**：提供TypeScript类型支持
- **灵活配置**：支持各种字体显示策略和后备方案

## Google字体

### 导入

可以使用`next/font/google`模块导入和使用任何Google字体：

```tsx
import { Inter } from 'next/font/google'

// 字体对象可以在函数外部定义
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
```

### 基本使用

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### 指定字重

```tsx
// 单个字重
const inter = Inter({ weight: '400', subsets: ['latin'] })

// 多个字重
const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] })

// 可变字重字体
const inter = Inter({ weight: '100 900', subsets: ['latin'] })
```

## 本地字体

### 导入

使用`next/font/local`导入自定义本地字体：

```tsx
import localFont from 'next/font/local'

// 导入单个字体文件
const myFont = localFont({ src: './fonts/my-font.woff2' })

// 导入多个字体文件组合成一个字体族
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
  ],
})
```

### 基本使用

```tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/my-custom-font.woff2',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

## 在特定元素上应用字体

除了在整个文档中应用字体，你还可以将字体仅应用于特定元素：

```tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto_Mono({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={inter.className}>
      <body>
        <h1>这是使用Inter字体</h1>
        <div className={roboto.className}>
          <h2>这个标题和其中的内容使用Roboto Mono字体</h2>
        </div>
      </body>
    </html>
  )
}
```

## 组合多个字体

使用CSS变量组合多个字体：

```tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${inter.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

然后在CSS中使用变量：

```css
/* app/globals.css */
:root {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-roboto-mono);
}

h1 {
  font-family: var(--font-sans);
}

code {
  font-family: var(--font-mono);
}
```

## 预加载优化

默认情况下，只会预加载当前路由所需的字体。如果你知道将需要特定字体，可以预加载它们：

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={inter.className}>
      <head>
        {/* 预加载特定页面字体 */}
        <link
          rel="preload"
          href="/fonts/some-special-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## API参考

### Google字体配置选项

| 属性                 | 类型                              | 描述                                                                 |
| -------------------- | --------------------------------- | -------------------------------------------------------------------- |
| `weight`             | `string \| string[]`              | 要加载的字重。可以是单个值、多个值的数组或变量字体的范围。           |
| `style`              | `string \| string[]`              | 字体样式，如 'normal'、'italic'。                                    |
| `subsets`            | `string[]`                        | 要预加载的子集。必须指定至少一个子集，或使用`preload: false`。       |
| `axes`               | `string[]`                        | 要加载的可变字体轴。                                                 |
| `display`            | `string`                          | 字体显示策略，如 'auto'、'block'、'swap'、'fallback' 或 'optional'。 |
| `preload`            | `boolean`                         | 是否预加载字体文件，默认为 `true`。                                  |
| `fallback`           | `string[]`                        | 当主字体未加载时使用的后备字体。                                     |
| `adjustFontFallback` | `boolean \| string`               | 控制是否或如何应用自动后备字体，默认为 `true`。                      |
| `variable`           | `string`                          | 定义CSS变量名，如 `--font-inter`。                                   |
| `declarations`       | `{prop: string, value: string}[]` | 自定义CSS `@font-face` 声明。                                        |

### 本地字体配置选项

| 属性                 | 类型                                                               | 描述                                                   |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `src`                | `string \| Array<{path: string, weight?: string, style?: string}>` | 本地字体文件路径。可以是单个文件或多个文件的配置数组。 |
| `display`            | `string`                                                           | 字体显示策略。                                         |
| `weight`             | `string`                                                           | 单个文件的字重。当`src`为字符串时使用。                |
| `style`              | `string`                                                           | 单个文件的样式。当`src`为字符串时使用。                |
| `preload`            | `boolean`                                                          | 是否预加载字体。                                       |
| `fallback`           | `string[]`                                                         | 后备字体。                                             |
| `adjustFontFallback` | `boolean \| string`                                                | 控制自动后备字体。                                     |
| `variable`           | `string`                                                           | CSS变量名。                                            |
| `declarations`       | `{prop: string, value: string}[]`                                  | 自定义`@font-face`声明。                               |

## 示例

### 使用可变字体

```tsx
import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: ['100', '400', '900'], // 指定离散字重
  axes: ['slnt', 'wdth'], // 指定可变轴
  display: 'swap',
})

export default function MyComponent() {
  return (
    <div className={roboto.className}>
      <p>使用Roboto Flex可变字体</p>
    </div>
  )
}
```

### 在Tailwind CSS中使用

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
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

## 最佳实践

1. **尽早加载关键字体**：在根布局中定义和应用主要字体，确保尽早加载
2. **限制字体数量**：不要加载过多字体或过多字重，这会影响性能
3. **使用合适的子集**：只加载你需要的语言子集，如`latin`对于英文
4. **使用可变字体**：可变字体提供多种字重和样式，同时减少文件大小
5. **使用`swap`显示策略**：对于关键内容使用`font-display: swap`策略
6. **提供良好的后备字体**：指定合适的后备字体族
7. **为静态页面预加载**：对于静态内容可以预加载所有字体

## 相关资源

- [Next.js官方文档：字体优化](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Fonts](https://fonts.google.com/) - 查找可用的Google字体
- [Web.dev：字体最佳实践](https://web.dev/articles/font-best-practices) - 网页字体性能最佳实践指南
