---
title: sassOptions
description: 配置 Sass 选项。
---

`sassOptions` 允许你配置 Sass 编译器。

```ts switcher
import type { NextConfig } from 'next'

const sassOptions = {
  additionalData: `
    $var: red;
  `,
}

const nextConfig: NextConfig = {
  sassOptions: {
    ...sassOptions,
    implementation: 'sass-embedded',
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */

const sassOptions = {
  additionalData: `
    $var: red;
  `,
}

const nextConfig = {
  sassOptions: {
    ...sassOptions,
    implementation: 'sass-embedded',
  },
}

module.exports = nextConfig
```

> **须知：** 除了 `implementation` 之外，`sassOptions` 没有类型定义，因为 Next.js 不维护其他可能的属性。
