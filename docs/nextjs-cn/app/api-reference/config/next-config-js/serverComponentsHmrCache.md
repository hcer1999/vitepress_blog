---
title: serverComponentsHmrCache
description: 配置服务器组件中的 fetch 响应是否在 HMR 刷新请求之间缓存。
version: experimental
---

实验性的 `serverComponentsHmrCache` 选项允许你在本地开发中跨热模块替换（HMR）刷新缓存服务器组件中的 `fetch` 响应。这可以带来更快的响应速度并减少计费 API 调用的成本。

默认情况下，HMR 缓存适用于所有 `fetch` 请求，包括那些带有 `cache: 'no-store'` 选项的请求。这意味着未缓存的请求在 HMR 刷新之间不会显示新数据。但是，缓存会在导航或完整页面重新加载时被清除。

你可以通过在 `next.config.js` 文件中将 `serverComponentsHmrCache` 设置为 `false` 来禁用 HMR 缓存：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // 默认为 true
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // 默认为 true
  },
}

module.exports = nextConfig
```

> **须知：** 为了更好的可观察性，我们建议使用 [`logging.fetches`](/nextjs-cn/app/api-reference/config/next-config-js/logging) 选项，它在开发过程中在控制台中记录 fetch 缓存命中和未命中情况。
