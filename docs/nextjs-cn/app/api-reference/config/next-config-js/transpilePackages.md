---
title: transpilePackages
description: 自动转译和打包来自本地包（如 monorepos）或外部依赖（`node_modules`）的依赖项。
---

Next.js 可以自动转译和打包来自本地包（如 monorepos）或外部依赖（`node_modules`）的依赖项。这取代了 `next-transpile-modules` 包。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['package-name'],
}

module.exports = nextConfig
```

## 版本历史

| 版本      | 变更                         |
| --------- | ---------------------------- |
| `v13.0.0` | 添加了 `transpilePackages`。 |
