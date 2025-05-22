---
title: dynamicIO
description: 了解如何在 Next.js 中启用 dynamicIO 标志。
version: canary
---

`dynamicIO` 标志是 Next.js 中的一个实验性功能，它会使 App Router 中的数据获取操作从预渲染中排除，除非它们被显式缓存。这对于优化服务器组件中动态数据获取的性能很有用。

如果您的应用程序需要在运行时获取新鲜数据而不是从预渲染缓存中提供服务，这个功能会很有用。

预期它会与 [`use cache`](/docs/app/api-reference/directives/use-cache) 一起使用，这样默认情况下您的数据获取会在运行时进行，除非您通过在页面、函数或组件级别使用 `use cache` 来定义应用程序的特定部分被缓存。

## 使用方法

要启用 `dynamicIO` 标志，请在 `next.config.ts` 文件的 `experimental` 部分将其设置为 `true`：

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
```

启用 `dynamicIO` 后，您可以使用以下缓存函数和配置：

- [`use cache` 指令](/docs/app/api-reference/directives/use-cache)
- 带有 `use cache` 的 [`cacheLife` 函数](/docs/app/api-reference/config/next-config-js/cacheLife)
- [`cacheTag` 函数](/docs/app/api-reference/functions/cacheTag)

## 注意事项

- 虽然 `dynamicIO` 可以通过确保在运行时获取新鲜数据来优化性能，但与提供预渲染内容相比，它也可能引入额外的延迟。
