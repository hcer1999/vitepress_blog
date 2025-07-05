---
title: useLightningcss
description: 启用 Lightning CSS 的实验性支持。
version: experimental
---

# NextJS中文文档 - UseLightningcss

使用 [Lightning CSS](https://lightningcss.dev) 的实验性支持，这是一个用 Rust 编写的快速 CSS 打包器和压缩器。

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useLightningcss: true,
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useLightningcss: true,
  },
}

module.exports = nextConfig
```
