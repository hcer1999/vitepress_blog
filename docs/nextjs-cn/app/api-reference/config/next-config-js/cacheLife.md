---
title: cacheLife
description: 了解如何在 Next.js 中设置 cacheLife 配置。
version: canary
---

# NextJS中文文档 - CacheLife

`cacheLife` 选项允许你在组件或函数内部使用 [`cacheLife`](/nextjs-cn/app/api-reference/functions/cacheLife) 函数以及在 [`use cache` 指令](/nextjs-cn/app/api-reference/directives/use-cache)范围内定义**自定义缓存配置文件**。

## 使用方法

要定义配置文件，请启用 [`dynamicIO` 标志](/nextjs-cn/app/api-reference/config/next-config-js/dynamicIO)并在 `next.config.js` 文件的 `cacheLife` 对象中添加缓存配置文件。例如，一个 `blog` 配置文件：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      blog: {
        stale: 3600, // 1小时
        revalidate: 900, // 15分钟
        expire: 86400, // 1天
      },
    },
  },
}

export default nextConfig
```

```js switcher
module.exports = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      blog: {
        stale: 3600, // 1小时
        revalidate: 900, // 15分钟
        expire: 86400, // 1天
      },
    },
  },
}
```

你现在可以在组件或函数中使用这个自定义 `blog` 配置，如下所示：

```tsx highlight={4,5} switcher
import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function getCachedData() {
  'use cache'
  cacheLife('blog')
  const data = await fetch('/api/data')
  return data
}
```

```jsx highlight={4,5} switcher
import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function getCachedData() {
  'use cache'
  cacheLife('blog')
  const data = await fetch('/api/data')
  return data
}
```

## 参考

配置对象具有以下格式的键值：

| **属性**     | **值**   | **描述**                                                 | **要求**                        |
| ------------ | -------- | -------------------------------------------------------- | ------------------------------- |
| `stale`      | `number` | 客户端应该缓存值而不检查服务器的持续时间。               | 可选                            |
| `revalidate` | `number` | 缓存应在服务器上刷新的频率；重新验证时可能提供过时的值。 | 可选                            |
| `expire`     | `number` | 一个值在切换到动态之前可以保持过时状态的最长持续时间。   | 可选 - 必须比 `revalidate` 更长 |
