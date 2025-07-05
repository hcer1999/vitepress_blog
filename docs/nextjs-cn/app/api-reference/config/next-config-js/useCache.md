---
title: useCache
description: 了解如何在 Next.js 中启用 useCache 标志。
version: canary
---

# NextJS中文文档 - UseCache

`useCache` 标志是 Next.js 中的一个实验性功能，它允许独立于 [`dynamicIO`](/nextjs-cn/app/api-reference/config/next-config-js/dynamicIO) 使用 [`use cache` 指令](/nextjs-cn/app/api-reference/directives/use-cache)。启用后，即使 `dynamicIO` 已关闭，你也可以在应用程序中使用 `use cache`。

## 使用方法

要启用 `useCache` 标志，请在 `next.config.ts` 文件的 `experimental` 部分将其设置为 `true`：

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
}

export default nextConfig
```

当启用 `useCache` 时，你可以使用以下缓存函数和配置：

- [`use cache` 指令](/nextjs-cn/app/api-reference/directives/use-cache)
- 与 `use cache` 一起使用的 [`cacheLife` 函数](/nextjs-cn/app/api-reference/config/next-config-js/cacheLife)
- [`cacheTag` 函数](/nextjs-cn/app/api-reference/functions/cacheTag)
