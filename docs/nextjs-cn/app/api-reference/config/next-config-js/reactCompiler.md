---
title: reactCompiler
description: 启用 React 编译器自动优化组件渲染。
version: experimental
---

# NextJS中文文档 - ReactCompiler

Next.js 包含对 [React 编译器](https://react.dev/learn/react-compiler) 的支持，这是一个通过自动优化组件渲染来提高性能的工具。这减少了使用 `useMemo` 和 `useCallback` 进行手动记忆化的需求。

Next.js 包含一个用 SWC 编写的自定义性能优化，使 React 编译器更加高效。Next.js 不是在每个文件上运行编译器，而是分析你的项目并只将 React 编译器应用于相关文件。这避免了不必要的工作，与单独使用 Babel 插件相比，可以实现更快的构建。

## 工作原理

React 编译器通过 Babel 插件运行。为了保持构建速度，Next.js 使用自定义 SWC 优化，只将 React 编译器应用于相关文件——比如那些包含 JSX 或 React Hooks 的文件。

这避免了编译所有内容，并将性能成本保持在最低水平。与默认的基于 Rust 的编译器相比，你可能仍会看到略微较慢的构建，但影响很小且局部化。

要使用它，请安装 `babel-plugin-react-compiler`：

```bash
npm install babel-plugin-react-compiler
```

然后，在 `next.config.js` 中添加 `experimental.reactCompiler` 选项：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
}

module.exports = nextConfig
```

## 注解

你可以将编译器配置为以"选择性加入"模式运行，如下所示：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
}

module.exports = nextConfig
```

然后，你可以使用 React 的 `"use memo"` 指令注解特定组件或钩子以选择性加入：

```ts switcher
export default function Page() {
  'use memo'
  // ...
}
```

```js switcher
export default function Page() {
  'use memo'
  // ...
}
```

> **注意：** 你也可以使用 React 的 `"use no memo"` 指令来达到相反的效果，即选择性退出组件或钩子。
