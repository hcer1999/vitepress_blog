---
title: mdxRs
description: 在 App Router 中使用新的 Rust 编译器编译 MDX 文件。
version: experimental.
---

用于与 `@next/mdx` 的实验性使用。使用新的 Rust 编译器编译 MDX 文件。

```js
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}

module.exports = withMDX(nextConfig)
```
