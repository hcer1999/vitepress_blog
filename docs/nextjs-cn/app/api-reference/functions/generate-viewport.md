---
title: generateViewport
description: generateViewport 函数的 API 参考。
related:
  title: 相关内容
  description: 查看所有元数据 API 选项。
  links:
    - app/api-reference/file-conventions/metadata
---

# NextJS中文文档 - Generate Viewport

你可以使用静态的 `viewport` 对象或动态的 `generateViewport` 函数来自定义页面的初始视口。

> **须知**:
>
> - `viewport` 对象和 `generateViewport` 函数导出**仅在服务器组件中支持**。
> - 你不能从同一路由段同时导出 `viewport` 对象和 `generateViewport` 函数。
> - 如果你是从 `metadata` 导出迁移过来的，可以使用 [metadata-to-viewport-export codemod](/nextjs-cn/app/guides/upgrading/codemods#metadata-to-viewport-export) 来更新你的更改。

## `viewport` 对象

要定义视口选项，从 `layout.jsx` 或 `page.jsx` 文件中导出一个 `viewport` 对象。

```tsx switcher
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}

export default function Page() {}
```

```jsx switcher
export const viewport = {
  themeColor: 'black',
}

export default function Page() {}
```

## `generateViewport` 函数

`generateViewport` 应返回一个包含一个或多个视口字段的 [`Viewport` 对象](#viewport-fields)。

```tsx switcher
export function generateViewport({ params }) {
  return {
    themeColor: '...',
  }
}
```

```jsx switcher
export function generateViewport({ params }) {
  return {
    themeColor: '...',
  }
}
```

> **须知**:
>
> - 如果视口不依赖运行时信息，则应该使用静态 [`viewport` 对象](#the-viewport-object)而不是 `generateViewport` 来定义。

## 视口字段

### `themeColor`

了解更多关于 [`theme-color`](https://developer.mozilla.org/docs/Web/HTML/Element/meta/name/theme-color) 的信息。

**简单主题颜色**

```tsx switcher
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}
```

```jsx switcher
export const viewport = {
  themeColor: 'black',
}
```

```html hideLineNumbers
<meta name="theme-color" content="black" />
```

**带媒体属性**

```tsx switcher
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
```

```jsx switcher
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
```

```html hideLineNumbers
<meta name="theme-color" media="(prefers-color-scheme: light)" content="cyan" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
```

### `width`、`initialScale`、`maximumScale` 和 `userScalable`

> **须知**：`viewport` 元标签会自动设置，通常不需要手动配置，因为默认设置已经足够。但为了完整性，提供以下信息。

```tsx switcher
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // 也支持但不常用
  // interactiveWidget: 'resizes-visual',
}
```

```jsx switcher
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // 也支持但不常用
  // interactiveWidget: 'resizes-visual',
}
```

```html hideLineNumbers
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>
```

### `colorScheme`

了解更多关于 [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#:~:text=color%2Dscheme%3A-specifies,of-the-following%3A) 的信息。

```tsx switcher
import type { Viewport } from 'next'

export const viewport: Viewport = {
  colorScheme: 'dark',
}
```

```jsx switcher
export const viewport = {
  colorScheme: 'dark',
}
```

```html hideLineNumbers
<meta name="color-scheme" content="dark" />
```

## 类型

你可以使用 `Viewport` 类型为你的视口对象添加类型安全。如果你在 IDE 中使用[内置 TypeScript 插件](/nextjs-cn/app/api-reference/config/typescript)，则不需要手动添加类型，但你仍然可以明确添加。

### `viewport` 对象

```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}
```

### `generateViewport` 函数

#### 常规函数

```tsx
import type { Viewport } from 'next'

export function generateViewport(): Viewport {
  return {
    themeColor: 'black',
  }
}
```

#### 带段参数

```tsx
import type { Viewport } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export function generateViewport({ params, searchParams }: Props): Viewport {
  return {
    themeColor: 'black',
  }
}

export default function Page({ params, searchParams }: Props) {}
```

#### JavaScript 项目

对于 JavaScript 项目，你可以使用 JSDoc 添加类型安全。

```js
/** @type {import("next").Viewport} */
export const viewport = {
  themeColor: 'black',
}
```

## 版本历史

| 版本      | 变更                                    |
| --------- | --------------------------------------- |
| `v14.0.0` | 引入 `viewport` 和 `generateViewport`。 |
