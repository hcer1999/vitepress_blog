---
title: 字体模块
nav_title: 字体
description: 使用内置的 `next/font` 加载器优化 Web 字体加载。
---

[`next/font`](/nextjs-cn/app/api-reference/components/font) 自动优化你的字体（包括自定义字体）并移除外部网络请求，以提高隐私和性能。

它包括\*_内置的自动自托管_/nextjs-cn/味着你可以以零[布局偏移](https://web.dev/articles/cls)的方式最佳地加载网页字体。

你还可以方便地使用所有 [Google Fonts](https://fonts.google.com/)。CSS 和字体文件在构建时下载，并与其他静态资产一起自托管。**浏览器不会向 Google 发送任何请求。**

<AppOnly>

```tsx switcher
import { Inter } from 'next/font/google'

// 如果加载的是可变字体，则不需要指定字体粗细
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
import { Inter } from 'next/font/google'

// 如果加载的是可变字体，则不需要指定字体粗细
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

要在所有页面中使用字体，请将其添加到 `/pages` 下的 [`_app.js` 文件](/nextjs-cn/pages/building-your-application/routing/custom-app)中，如下所示：

```jsx
import { Inter } from 'next/font/google'

// 如果加载的是可变字体，则不需要指定字体粗细
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
```

</PagesOnly>

> **🎥 观看：** 了解更多关于使用 `next/font` 的信息 → [YouTube (6 分钟)](https://www.youtube.com/watch?v=L8_98i_bMMA)。

## 参考

| 键                                          | `font/google`       | `font/local`        | 类型             | 是否必需  |
| ------------------------------------------- | ------------------- | ------------------- | ---------------- | --------- |
| [`src`](#src)                               | <Cross size={18} /> | <Check size={18} /> | 字符串或对象数组 | 是        |
| [`weight`](#weight)                         | <Check size={18} /> | <Check size={18} /> | 字符串或数组     | 必需/可选 |
| [`style`](#style)                           | <Check size={18} /> | <Check size={18} /> | 字符串或数组     | -         |
| [`subsets`](#subsets)                       | <Check size={18} /> | <Cross size={18} /> | 字符串数组       | -         |
| [`axes`](#axes)                             | <Check size={18} /> | <Cross size={18} /> | 字符串数组       | -         |
| [`display`](#display)                       | <Check size={18} /> | <Check size={18} /> | 字符串           | -         |
| [`preload`](#preload)                       | <Check size={18} /> | <Check size={18} /> | 布尔值           | -         |
| [`fallback`](#fallback)                     | <Check size={18} /> | <Check size={18} /> | 字符串数组       | -         |
| [`adjustFontFallback`](#adjustfontfallback) | <Check size={18} /> | <Check size={18} /> | 布尔值或字符串   | -         |
| [`variable`](#variable)                     | <Check size={18} /> | <Check size={18} /> | 字符串           | -         |
| [`declarations`](#declarations)             | <Cross size={18} /> | <Check size={18} /> | 对象数组         | -         |

### `src`

字体文件的路径，可以是字符串或对象数组（类型为 `Array<{path: string, weight?: string, style?: string}>`），相对于调用字体加载器函数的目录。

用于 `next/font/local`

- 必需

示例：

- `src:'./fonts/my-font.woff2'`，其中 `my-font.woff2` 放置在 `app` 目录中的名为 `fonts` 的目录中
- `src:[{path: './inter/Inter-Thin.ttf', weight: '100',},{path: './inter/Inter-Regular.ttf',weight: '400',},{path: './inter/Inter-Bold-Italic.ttf', weight: '700',style: 'italic',},]`
- 如果在 `app/page.tsx` 中调用字体加载器函数，使用 `src:'../styles/fonts/my-font.ttf'`，则 `my-font.ttf` 放置在项目根目录的 `styles/fonts` 中

### `weight`

字体的[`weight`](https://fonts.google.com/knowledge/glossary/weight)，可能的值如下：

- 一个字符串，可能的值为特定字体可用的粗细，或者如果是[可变](https://fonts.google.com/variablefonts)字体，则为值范围
- 如果字体不是[可变 Google 字体](https://fonts.google.com/variablefonts)，则为粗细值数组。仅适用于 `next/font/google`。

用于 `next/font/google` 和 `next/font/local`

- 如果使用的字体**不是**[可变](https://fonts.google.com/variablefonts)字体，则必需

示例：

- `weight: '400'`：单一粗细值的字符串 - 对于[`Inter`](https://fonts.google.com/specimen/Inter?query=inter)字体，可能的值是 `'100'`、`'200'`、`'300'`、`'400'`、`'500'`、`'600'`、`'700'`、`'800'`、`'900'` 或 `'variable'`（其中 `'variable'` 是默认值）
- `weight: '100 900'`：可变字体的 `100` 到 `900` 范围的字符串
- `weight: ['100','400','900']`：非可变字体的 3 个可能值的数组

### `style`

字体的[`style`](https://developer.mozilla.org/docs/Web/CSS/font-style)，可能的值如下：

- 默认值为 `'normal'` 的字符串[值](https://developer.mozilla.org/docs/Web/CSS/font-style#values)
- 如果字体不是[可变 Google 字体](https://fonts.google.com/variablefonts)，则为样式值数组。仅适用于 `next/font/google`。

用于 `next/font/google` 和 `next/font/local`

- 可选

示例：

- `style: 'italic'`：字符串 - 对于 `next/font/google`，可以是 `normal` 或 `italic`
- `style: 'oblique'`：字符串 - 对于 `next/font/local`，可以采用任何值，但预期来自[标准字体样式](https://developer.mozilla.org/docs/Web/CSS/font-style)
- `style: ['italic','normal']`：对于 `next/font/google` 的两个值的数组 - 值来自 `normal` 和 `italic`

### `subsets`

字体的[`subsets`](https://fonts.google.com/knowledge/glossary/subsetting)，由字符串数组定义，包含每个你想要[预加载](/nextjs-cn/app/api-reference/components/font#specifying-a-subset)的子集的名称。当 [`preload`](#preload) 选项为 true（默认）时，通过 `subsets` 指定的字体将在 head 中注入 link 预加载标签。

用于 `next/font/google`/nextjs-cn/

- 可选

示例：

- `subsets: ['latin']`：包含 `latin` 子集的数组

你可以在 Google Fonts 页面上找到你的字体的所有子集列表。

### `axes`

一些可变字体有额外的 `axes` 可以包含。默认情况下，仅包括字体粗细以保持文件大小。`axes` 的可能值取决于特定的字体。

用于 `next/font/google`

- 可选

示例：

- `axes: ['slnt']`：包含值 `slnt` 的数组，用于 `Inter` 可变字体，该字体具有 `slnt` 作为附加 `axes`，如 [这里](https://fonts.google.com/variablefonts?vfquery=inter#font-families) 所示。你可以通过在 [Google 可变字体页面](https://fonts.google.com/variablefonts#font-families) 上使用过滤器并查找除 `wght` 以外的轴来找到你字体的可能 `axes` 值

### `display`

字体的[`display`](https://developer.mozilla.org/docs/Web/CSS/@font-face/font-display)，可能的字符串[值](https://developer.mozilla.org/docs/Web/CSS/@font-face/font-display#values)为 `'auto'`、`'block'`、`'swap'`、`'fallback'` 或 `'optional'`，默认值为 `'swap'`。

用于 `next/font/google` 和 `next/font/local`

- 可选

示例：

- `display: 'optional'`：分配给 `optional` 值的字符串

### `preload`

布尔值，指定字体是否应[预加载](/nextjs-cn/app/api-reference/components/font#preloading)或不预加载。默认值为 `true`。

用于 `next/font/goo/nextjs-cn/t/local`

- 可选

示例：

- `preload: false`

### `fallback`

如果字体无法加载，则使用的备用字体。没有默认值的字符串数组。

- 可选

用于 `next/font/google` 和 `next/font/local`

示例：

- `fallback: ['system-ui', 'arial']`：设置备用字体为 `system-ui` 或 `arial` 的数组

### `adjustFontFallback`

- 对于 `next/font/google`：布尔值，设置是否应使用自动备用字体以减少 [Cumulative Layout Shift](https://web.dev/cls/)。默认值为 `true`。
- 对于 `next/font/local`：字符串或布尔值 `false` 值，设置是否应使用自动备用字体以减少 [Cumulative Layout Shift](https://web.dev/cls/)。可能的值是 `'Arial'`、`'Times New Roman'` 或 `false`。默认值为 `'Arial'`。

用于 `next/font/google` 和 `next/font/local`

- 可选

示例：

- `adjustFontFallback: false`：对于 `next/font/google`
- `adjustFontFallback: 'Times New Roman'`：对于 `next/font/local`

### `variable`

字符串值，用于定义 CSS 变量名称，如果样式通过 [CSS 变量方法](#css-variables) 应用。

用于 `next/font/google` 和 `next/font/local`

- 可选

示例：

- `variable: '--my-font'`：声明 CSS 变量 `--my-font`

### `declarations`

字体面[描述符](https://developer.mozilla.org/docs/Web/CSS/@font-face#descriptors)键值对数组，进一步定义生成的 `@font-face`。

用于 `next/font/local`

- 可选

示例：

- `declarations: [{ prop: 'ascent-override', value: '90%' }]`

## 示例

## Google Fonts

要使用 Google 字体，请从 `next/font/google` 作为函数导入它。我们建议使用 [variable fonts](https://fonts.google.com/variablefonts) 以获得最佳性能和灵活性。

<AppOnly>

```tsx switcher
import { Inter } from 'next/font/google'

// 如果加载的是可变字体，则不需要指定字体粗细
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
import { Inter } from 'next/font/google'

// 如果加载的是可变字体，则不需要指定字体粗细
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

如果不能使用可变字体，则**需要指定权重**：

```tsx switcher
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

要在所有页面中使用字体，请将其添加到 `/pages` 下的 [`_app.js` 文件](/nextjs-cn/pages/building-your-application/routing/custom-app)中，如下所示：

```jsx
import { Inter } from 'next/font/google'

// 如果加载的是可变字体，则不需要指定字体粗细
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
```

如果不能使用可变字体，则**需要指定权重**：

```jsx
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
```

</PagesOnly>

你可以通过使用数组来指定多个权重和/或样式：

```jsx
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
```

> **Good to know**：使用下划线 (\_) 为字体名称添加多个单词。例如，`Roboto Mono` 应导入为 `Roboto_Mono`。

<PagesOnly>

### Apply the font in `<head>`

你还可以使用字体而不使用包装器和 `className`，通过将其注入 `<head>` 中来实现，如下所示：

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
```

### Single page usage

要在单个页面中使用字体，请将其添加到特定页面中，如下所示：

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={inter.className}>
      <p>Hello World</p>
    </div>
  )
}
```

</PagesOnly>

### Specifying a subset

Google Fonts 是自动[子集](https://fonts.google.com/knowledge/glossary/subsetting)。这减少了字体文件的大小并提高了性能。你需要定义要预加载哪些子集。如果 [`preload`](/nextjs-cn/app/api-reference/components/font#preload) 为 `true` 而未指定任何子集，则会发出警告。

这可以通过添加到函数调用中来完成：/nextjs-cn/

<AppOnly>

```tsx switcher
const inter = Inter({ subsets: ['latin'] })
```

```jsx switcher
const inter = Inter({ subsets: ['latin'] })
```

</AppOnly>

<PagesOnly>

```jsx
const inter = Inter({ subsets: ['latin'] })
```

</PagesOnly>

查看 [Font API Reference](/nextjs-cn/app/api-reference/components/font) 以获取更多信息。

## Using Multiple Fonts/nextjs-cn/

你可以在应用程序中导入和使用多个字体。有两种方法可以采用。

第一种方法是创建一个实用函数，该函数导出字体，导入它，并将其 `className` 应用于需要它的地方。这确保字体仅在渲染时预加载：

```ts switcher
import { Inter, Roboto_Mono } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})
```

```js switcher
import { Inter, Roboto_Mono } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})
```

<AppOnly>

```tsx switcher
import { inter } from './fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
```

```jsx switcher
import { inter } from './fonts'

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
```

```tsx switcher
import { roboto_mono } from './fonts'

export default function Page() {
  return (
    <>
      <h1 className={roboto_mono.className}>My page</h1>
    </>
  )
}
```

```jsx switcher
import { roboto_mono } from './fonts'

export default function Page() {
  return (
    <>
      <h1 className={roboto_mono.className}>My page</h1>
    </>
  )
}
```

</AppOnly>

在上述示例中，`Inter` 将全局应用，并且可以导入和应用于需要的 `Roboto Mono`。

或者，你可以创建一个 [CSS variable](/nextjs-cn/app/api-reference/components/font#variable) 并将其与你的首选 CSS 解决方案一起使用：

<AppOnly>/nextjs-cn/

```tsx switcher
import { Inter, Roboto_Mono } from 'next/font/google'
import styles from './global.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <h1>My App</h1>
        <div>{children}</div>
      </body>
    </html>
  )
}
```

```jsx switcher
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <h1>My App</h1>
        <div>{children}</div>
      </body>
    </html>
  )
}
```

</AppOnly>

```css
html {
  font-family: var(--font-inter);
}

h1 {
  font-family: var(--font-roboto-mono);
}
```

在上述示例中，`Inter` 将全局应用，并且任何 `<h1>` 标签都将使用 `Roboto Mono` 样式。

> **Recommendation**：谨慎使用多个字体，因为每个新字体都是客户端需要下载的额外资源。

### Local Fonts

导入 `next/font/local` 并指定本地字体文件的 `src`。我们建议使用 [variable fonts](https://fonts.google.com/variablefonts) 以获得最佳性能和灵活性。

<AppOnly>

```tsx switcher
import localFont from 'next/font/local'

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
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

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './my-font.woff2' })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}
```

</PagesOnly>

如果要对单个字体系列使用多个文件，则 `src` 可以是数组：

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

查看 [Font API Reference](/nextjs-cn/app/api-reference/components/font) 以获取更多信息。

### With Tailwind CSS

`next/font` 无缝集成 [Tailwind CSS](https://tailwindcss.com/) 使用 [CSS variables](/nextjs-cn/app/api-reference/components/font#css-variables)。

在下面的示例中，我们使用 `Inter` 和 `Roboto_Mono` 字体从 `next/font/google`（你可以使用任何 Google Fo/nextjs-cn/。使用 `variable` 选项定义 CSS 变量名称，例如 `inter` 和 `roboto_mono` 用于这些字体，分别。然后，将这些变量应用到你的 HTML 文档中。

> **Good to know**：你可以将这些变量添加到 `<html>` 或 `<body>` 标签中，具体取决于你的偏好、样式需求或项目要求。

<AppOnly>

```tsx switcher
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${inter.variable} ${roboto_mono.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
```

</PagesOnly>

最后，将 CSS 变量添加到你的 [Tailwind CSS 配置](/nextjs-cn/app/guides/tailwind-css#configuring-tailwind)：

### Tailwind CSS v4/nextjs-cn/

自 [Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4) 起，默认情况下不需要任何配置。如果你需要配置 Tailwind，可以按照 [官方文档](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration) 配置全局 CSS 文件。

```js
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-roboto-mono);
}
```

### Tailwind CSS v3

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
}
```

你可以现在使用 `font-sans` 和 `font-mono` 实用程序类将字体应用到你的元素。

```
<p class="font-sans ...">The quick brown fox ...</p>
<p class="font-mono ...">The quick brown fox ...</p>
```

### Applying Styles

你可以通过三种方式应用字体样式：

- [`className`](#classname)
- [`style`](#style-1)
- [CSS Variables](#css-variables)

#### `className`

Returns a read-only CSS `className` for the loaded font to be passed to an HTML element.

```tsx
<p className={inter.className}>Hello, Next.js!</p>
```

#### `style`

Returns a read-only CSS `style` object for the loaded font to be passed to an HTML element, including `style.fontFamily` to access the font family name and fallback fonts.

```tsx
<p style={inter.style}>Hello World</p>
```

#### CSS Variables

If you would like to set your styles in an external style sheet and specify additional options there, use the CSS variable method.

In addition to importing the font, also import the CSS file where the CSS variable is defined and set the variable option of the font loader object as follows:

```tsx switcher
import { Inter } from 'next/font/google'
import styles from '../styles/component.module.css'

const inter = Inter({
  variable: '--font-inter',
})
```

```jsx switcher
import { Inter } from 'next/font/google'
import styles from '../styles/component.module.css'

const inter = Inter({
  variable: '--font-inter',
})
```

To use the font, set the `className` of the parent container of the text you would like to style to the font loader's `variable` value and the `className` of the text to the `styles` property from the external CSS file.

```tsx switcher
<main className={inter.variable}>
  <p className={styles.text}>Hello World</p>
</main>
```

```jsx switcher
<main className={inter.variable}>
  <p className={styles.text}>Hello World</p>
</main>
```

Define the `text` selector class in the `component.module.css` CSS file as follows:

```css
.text {
  font-family: var(--font-inter);
  font-weight: 200;
  font-style: italic;
}
```

In the example above, the text `Hello World` is styled using the `Inter` font and the generated font fallback with `font-weight: 200` and `font-style: italic`.

### Using a font definitions file

Every time you call the `localFont` or Google font function, that font will be hosted as one instance in your application. Therefore, if you need to use the same font in multiple places, you should load it in one place and import the related font object where you need it. This is done using a font definitions file.

For example, create a `fonts.ts` file in a `styles` folder at the root of your app directory.

Then, specify your font definitions as follows:

```ts switcher
import { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'

// define your variable fonts
const inter = Inter()
const lora = Lora()
// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ weight: '400' })
const sourceCodePro700 = Source_Sans_3({ weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }
```

```js switcher
import { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'

// define your variable fonts
const inter = Inter()
const lora = Lora()
// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ weight: '400' })
const sourceCodePro700 = Source_Sans_3({ weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }
```

You can now use these definitions in your code as follows:

```tsx switcher
import { inter, lora, sourceCodePro700, greatVibes } from '../styles/fonts'

export default function Page() {
  return (
    <div>
      <p className={inter.className}>Hello world using Inter font</p>
      <p style={lora.style}>Hello world using Lora font</p>
      <p className={sourceCodePro700.className}>
        Hello world using Source_Sans_3 font with weight 700
      </p>
      <p className={greatVibes.className}>My title in Great Vibes font</p>
    </div>
  )
}
```

```jsx switcher
import { inter, lora, sourceCodePro700, greatVibes } from '../styles/fonts'

export default function Page() {
  return (
    <div>
      <p className={inter.className}>Hello world using Inter font</p>
      <p style={lora.style}>Hello world using Lora font</p>
      <p className={sourceCodePro700.className}>
        Hello world using Source_Sans_3 font with weight 700
      </p>
      <p className={greatVibes.className}>My title in Great Vibes font</p>
    </div>
  )
}
```

To make it easier to access the font definitions in your code, you can define a path alias in your `tsconfig.json` or `jsconfig.json` files as follows:

```json
{
  "compilerOptions": {
    "paths": {
      "@/fonts": ["./styles/fonts"]
    }
  }
}
```

You can now import any font definition as follows:

```tsx switcher
import { greatVibes, sourceCodePro400 } from '@/fonts'
```

```jsx switcher
import { greatVibes, sourceCodePro400 } from '@/fonts'
```

### Preloading

<AppOnly>

When a font function is called on a page of your site, it is not globally available and preloaded on all routes. Rather, the font is only preloaded on the related routes based on the type of file where it is used:

- If it's a [unique page](/nextjs-cn/app/api-reference/file-conventions/page), it is preloaded on the unique route for that page.
- If it's a [layout](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#layouts), it is preloaded on all the routes wrapped by the layout.
- If it's the [root layout/nextjs-cn/n/app/building-your-application/routing/index/layouts-and-templates#root-layout-required), it is preloaded on all routes.
  /nextjs-cn/
  </AppOnly>/nextjs-cn/

<PagesOnly>

When a font function is called on a page of your site, it is not globally available and preloaded on all routes. Rather, the font is only preloaded on the related route/s based on the type of file where it is used:

- if it's a [unique page](/nextjs-cn/pages/building-your-application/routing/pages-and-layouts), it is preloaded on the unique route for that page
- if it's in the [custom App](/nextjs-cn/pages/building-your-application/routing/custom-app), it is preloaded on all the routes of the site under `/pages`
  /nextjs-cn/
  </PagesOnly>/nextjs-cn/

## Version Changes

| Version   | Changes                                                               |
| --------- | --------------------------------------------------------------------- |
| `v13.2.0` | `@next/font` renamed to `next/font`. Installation no longer required. |
| `v13.0.0` | `@next/font` was added.                                               |
