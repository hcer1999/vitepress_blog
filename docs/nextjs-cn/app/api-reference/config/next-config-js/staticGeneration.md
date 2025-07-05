---
title: staticGeneration*
description: 了解如何在 Next.js 应用程序中配置静态生成。
version: experimental
---

# NextJS中文文档 - StaticGeneration

`staticGeneration*` 选项允许你为高级用例配置静态生成过程。

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
  },
}

export default nextConfig
```

```js switcher
const nextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
  },
}

export default nextConfig
```

## 配置选项

以下选项可用：

- `staticGenerationRetryCount`：在构建失败之前重试失败页面生成的次数。
- `staticGenerationMaxConcurrency`：每个工作进程可处理的最大页面数。
- `staticGenerationMinPagesPerWorker`：在启动新工作进程之前要处理的最小页面数。
