---
title: typedRoutes
description: 启用静态类型链接的实验性支持。
version: experimental
---

# NextJS中文文档 - TypedRoutes

[静态类型链接](/nextjs-cn/app/api-reference/config/typescript#statically-typed-links)的实验性支持。此功能需要在项目中同时使用 App Router 和 TypeScript。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
```
