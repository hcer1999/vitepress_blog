---
title: 如何在应用程序中使用 CSS
nav_title: CSS
description: 了解在应用程序中添加 CSS 的不同方式，包括 CSS Modules、全局 CSS、Tailwind CSS 等。
related:
  title: 下一步
  description: 了解更多在应用程序中使用 CSS 的替代方式。
  links:
    - app/guides/tailwind-css
    - app/guides/sass
    - app/guides/css-in-js
---

Next.js 提供了几种在应用程序中使用 CSS 的方式，包括：

- [CSS Modules](#css-modules)
- [全局 CSS](#global-css)
- [外部样式表](#external-stylesheets)
- [Tailwind CSS](/docs/app/guides/tailwind-css)
- [Sass](/docs/app/guides/sass)
- [CSS-in-JS](/docs/app/guides/css-in-js)

## CSS Modules

CSS Modules 通过生成唯一的类名来局部作用域化 CSS。这允许你在不同的文件中使用相同的类名，而不用担心命名冲突。

<AppOnly>

要开始使用 CSS Modules，创建一个扩展名为 `.module.css` 的新文件，并将其导入到 `app` 目录中的任何组件中：

```css filename="app/blog/styles.module.css"
.blog {
  padding: 24px;
}
```

```tsx filename="app/blog/page.tsx" switcher
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

```jsx filename="app/blog/page.js" switcher
import styles from './blog.module.css'

export default function Layout() {
  return <main className={styles.blog}></main>
}
```

</AppOnly>

<PagesOnly>

要开始使用 CSS Modules，创建一个扩展名为 `.module.css` 的新文件，并将其导入到 `pages` 目录中的任何组件中：

```css filename="/styles/blog.module.css"
.blog {
  padding: 24px;
}
```

```tsx filename="pages/blog/index.tsx" switcher
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

```jsx filename="pages/blog/index.js" switcher
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

</PagesOnly>

## 全局 CSS

你可以使用全局 CSS 在整个应用程序中应用样式。

<AppOnly>

创建一个 `app/global.css` 文件并在根布局中导入它，以将样式应用到应用程序的**每个路由**：

```css filename="app/global.css"
body {
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

```tsx filename="app/layout.tsx" switcher
// 这些样式应用于应用程序中的每个路由
import './global.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
// 这些样式应用于应用程序中的每个路由
import './global.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> **注意事项：** 全局样式可以导入到 `app` 目录中的任何布局、页面或组件中。但是，由于 Next.js 使用 React 的内置样式表支持来集成 Suspense，目前在路由之间导航时不会移除样式表，这可能会导致冲突。我们建议将全局样式用于*真正*全局的 CSS，并使用 [CSS Modules](#css-modules) 来实现作用域 CSS。

</AppOnly>

<PagesOnly>

在 `pages/_app.js` 文件中导入样式表，以将样式应用到应用程序的**每个路由**：

```tsx filename="pages/_app.js"
import '@/styles/global.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

由于样式表的全局性质，以及为了避免冲突，你应该在 [`pages/_app.js`](/docs/pages/building-your-application/routing/custom-app) 中导入它们。

</PagesOnly>

## 外部样式表

<AppOnly>

外部包发布的样式表可以在 `app` 目录中的任何位置导入，包括共同定位的组件：

```tsx filename="app/layout.tsx" switcher
import 'bootstrap/dist/css/bootstrap.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="container">{children}</body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
import 'bootstrap/dist/css/bootstrap.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">{children}</body>
    </html>
  )
}
```

> **注意事项：** 在 React 19 中，也可以使用 `<link rel="stylesheet" href="..." />`。更多信息请参见 [React `link` 文档](https://react.dev/reference/react-dom/components/link)。

</AppOnly>

<PagesOnly>

Next.js 允许你从 JavaScript 文件中导入 CSS 文件。
这是可能的，因为 Next.js 扩展了 [`import`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) 的概念，超出了 JavaScript 的范围。

### 从 `node_modules` 导入样式

从 Next.js **9.5.4** 开始，允许在应用程序的任何位置导入来自 `node_modules` 的 CSS 文件。

对于全局样式表，如 `bootstrap` 或 `nprogress`，你应该在 `pages/_app.js` 中导入文件。例如：

```jsx filename="pages/_app.js"
import 'bootstrap/dist/css/bootstrap.css'
```

</PagesOnly>

## 样式化技巧

### 条件样式

在 React 中，你可以使用条件语句来有条件地应用类名：

```tsx filename="app/page.tsx" switcher
import styles from './styles.module.css'

export default function Page() {
  const isActive = true

  return (
    <div className={`${styles.button} ${isActive ? styles.active : styles.inactive}`}>按钮</div>
  )
}
```

```jsx filename="app/page.js" switcher
import styles from './styles.module.css'

export default function Page() {
  const isActive = true

  return (
    <div className={`${styles.button} ${isActive ? styles.active : styles.inactive}`}>按钮</div>
  )
}
```

### 动态样式

由于 CSS Modules 生成唯一的类名，你可以安全地动态生成类名：

```tsx filename="app/page.tsx" switcher
import styles from './styles.module.css'

export default function Page() {
  const color = 'red'

  return <div className={styles[color]}>Hello</div>
}
```

```jsx filename="app/page.js" switcher
import styles from './styles.module.css'

export default function Page() {
  const color = 'red'

  return <div className={styles[color]}>Hello</div>
}
```

### 模板字符串

你也可以使用模板字符串来组合多个类名：

```tsx filename="app/page.tsx" switcher
import styles from './styles.module.css'

export default function Page() {
  return <div className={`${styles.button} ${styles.primary}`}>按钮</div>
}
```

```jsx filename="app/page.js" switcher
import styles from './styles.module.css'

export default function Page() {
  return <div className={`${styles.button} ${styles.primary}`}>按钮</div>
}
```

### clsx 库

[clsx](https://www.npmjs.com/package/clsx) 是一个流行的库，用于有条件地构建 `className` 字符串。我们建议使用它来管理多个类名：

```tsx filename="app/page.tsx" switcher
import clsx from 'clsx'
import styles from './styles.module.css'

export default function Page() {
  return (
    <div
      className={clsx(styles.button, {
        [styles.primary]: true,
        [styles.secondary]: false,
      })}
    >
      按钮
    </div>
  )
}
```

```jsx filename="app/page.js" switcher
import clsx from 'clsx'
import styles from './styles.module.css'

export default function Page() {
  return (
    <div
      className={clsx(styles.button, {
        [styles.primary]: true,
        [styles.secondary]: false,
      })}
    >
      按钮
    </div>
  )
}
```

## 顺序和合并

Next.js 在生产构建过程中通过自动分块（合并）样式表来优化 CSS。你的 CSS 的**顺序**取决于你在代码中**导入样式的顺序**。

例如，`base-button.module.css` 会在 `page.module.css` 之前排序，因为 `<BaseButton>` 在 `page.module.css` 之前导入：

```tsx filename="page.ts" switcher
import { BaseButton } from './base-button'
import styles from './page.module.css'

export default function Page() {
  return <BaseButton className={styles.primary} />
}
```

```jsx filename="page.js" switcher
import { BaseButton } from './base-button'
import styles from './page.module.css'

export default function Page() {
  return <BaseButton className={styles.primary} />
}
```

```tsx filename="base-button.tsx" switcher
import styles from './base-button.module.css'

export function BaseButton() {
  return <button className={styles.primary} />
}
```

```jsx filename="base-button.js" switcher
import styles from './base-button.module.css'

export function BaseButton() {
  return <button className={styles.primary} />
}
```

### 建议

为了保持 CSS 顺序的可预测性：

- 尽量将 CSS 导入限制在单个 JavaScript 或 TypeScript 入口文件中
- 在应用程序的根目录中导入全局样式和 Tailwind 样式表
- 对于嵌套组件，使用 CSS Modules 而不是全局样式
- 为你的 CSS 模块使用一致的命名约定。例如，使用 `<name>.module.css` 而不是 `<name>.tsx`
- 将共享样式提取到共享组件中，以避免重复导入
- 关闭自动排序导入的 linter 或格式化工具，如 ESLint 的 [`sort-imports`](https://eslint.org/docs/latest/rules/sort-imports)
- 你可以使用 `next.config.js` 中的 [`cssChunking`](/docs/app/api-reference/config/next-config-js/cssChunking) 选项来控制 CSS 如何分块

## 开发环境与生产环境

- 在开发环境（`next dev`）中，CSS 更新会通过 [Fast Refresh](/docs/architecture/fast-refresh) 立即应用
- 在生产环境（`next build`）中，所有 CSS 文件会自动连接成**多个经过压缩和代码分割**的 `.css` 文件，确保为每个路由加载最少量的 CSS
- 在生产环境中，即使禁用 JavaScript，CSS 仍然会加载，但在开发环境中需要 JavaScript 来支持 Fast Refresh
- CSS 顺序在开发环境中的行为可能不同，始终要检查构建（`next build`）以验证最终的 CSS 顺序
