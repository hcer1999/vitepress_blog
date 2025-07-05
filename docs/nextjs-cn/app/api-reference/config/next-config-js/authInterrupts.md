---
title: authInterrupts
description: 了解如何启用实验性的 `authInterrupts` 配置选项以使用 `forbidden` 和 `unauthorized`。
version: canary
related:
  links:
    - app/api-reference/functions/forbidden
    - app/api-reference/functions/unauthorized
    - app/api-reference/file-conventions/forbidden
    - app/api-reference/file-conventions/unauthorized
---

`authInterrupts` 配置选项允许你在应用程序中使用 [`forbidden`](/docs/nextjs-cn/app/api-reference/functions/forbidden) 和 [`unauthorized`](/docs/nextjs-cn/app/api-reference/functions/unauthorized) API。由于这些函数是实验性的，你必须在 `next.config.js` 文件中启用 `authInterrupts` 选项才能使用它们：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
}

export default nextConfig
```

```js switcher
module.exports = {
  experimental: {
    authInterrupts: true,
  },
}
```
