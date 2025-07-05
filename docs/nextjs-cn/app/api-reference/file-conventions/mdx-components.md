---
title: mdx-components.js
description: mdx-components.js 文件的 API 参考。
related:
  title: 了解更多关于 MDX 组件
  links:
    - app/guides/mdx
---

`mdx-components.js|tsx` 文件是使用 [`@next/mdx` 与 App Router](/nextjs-cn/app/guides/mdx) 的**必需**文件，没有它将无法工作。此外，你可以使用它来[自定义样式](/nextjs-cn/app/guides/mdx#using-custom-styles-and-components)。

使用项目根目录中的 `mdx-components.tsx`（或 `.js`）文件定义 MDX 组件。例如，与 `pages` 或 `app` 在同一级别，或者如果适用的话，放在 `src` 内部。

```tsx switcher
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

```js switcher
export function useMDXComponents(components) {
  return {
    ...components,
  }
}
```

## 导出

### `useMDXComponents` 函数

该文件必须导出一个单一的函数，可以是默认导出或命名为 `useMDXComponents`。

```tsx switcher
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

```js switcher
export function useMDXComponents(components) {
  return {
    ...components,
  }
}
```

## 参数

### `components`

定义 MDX 组件时，导出函数接受一个参数 `components`。该参数是 `MDXComponents` 的实例。

- 键是要覆盖的 HTML 元素的名称。
- 值是要渲染的替代组件。

> **须知**：记得传递所有其他没有覆盖的组件（即 `...components`）。

## 版本历史

| 版本      | 变更          |
| --------- | ------------- |
| `v13.1.2` | 添加 MDX 组件 |
