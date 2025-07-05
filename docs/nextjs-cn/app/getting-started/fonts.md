---
title: 如何使用字体
nav_title: 字体
description: 学习如何在 Next.js 中使用字体
related:
  title: API 参考
  description: 查看 API 参考以了解 Next.js Font 的完整功能集
  links:
    - app/api-reference/components/font
---

[`next/font`](/nextjs-cn/app/api-reference/components/font) 模块自动优化你的字体，并移除外部网络请求以提高隐私性和性能。

它包括**内置的自托管**功能，适用于任何字体文件。这意味着你可以以最佳方式加载网络字体，且不会出现布局偏移。

要开始使用 `next/font`，从 [`next/font/local`](#local-fonts) 或 [`next/font/google`](#google-fonts) 导入它，以适当的选项调用它作为函数，并设置你想要应用字体的元素的 `className`。例如：

```tsx highlight={1,5,9} switcher
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx highlight={1,5,9} switcher
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
})

export default function Layout({ children }) {
  return (
    <html className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

字体的作用域限定在使用它们的组件中。要将字体应用到整个应用程序，请将其添加到[根布局](/nextjs-cn/app/api-reference/file-conventions/layout#root-layouts)中。

## Google 字体

你可以自动自托管任何 Google 字体。字体作为静态资源存储，并从与你的部署相同的域名提供服务，这意味着当用户访问你的网站时，浏览器不会向 Google 发送请求。

要开始使用 Google 字体，从 `next/font/google` 导入你选择的字体：

```tsx switcher
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

我们建议使用[可变字体](https://fonts.google.com/variablefonts)以获得最佳性能和灵活性。但如果你不能使用可变字体，则需要指定字重：

```tsx highlight={4} switcher
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx highlight={4} switcher
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

## 本地字体

要使用本地字体，从 `next/font/local` 导入你的字体，并指定本地字体文件的 [`src`](/nextjs-cn/app/api-reference/components/font#src)。字体文件可以存储在 [`public`](/nextjs-cn/app/api-reference/file-conventions/public-folder) 文件夹中。例如：

```tsx switcher
import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

如果你想为单个字体家族使用多个文件，`src` 可以是一个数组：

```js
const roboto = localFont({
  src: [
    {
      path: './Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Roboto-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Roboto-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})
```
