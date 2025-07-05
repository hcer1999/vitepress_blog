---
title: next.config.js
description: 了解如何使用 next.config.js 配置你的应用程序。
---

Next.js 可以通过项目根目录（例如与 `package.json` 同级）中的 `next.config.js` 文件进行配置，该文件需要包含默认导出。

```js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 这里是配置选项 */
}

module.exports = nextConfig
```

## ECMAScript 模块

`next.config.js` 是一个常规的 Node.js 模块，而不是 JSON 文件。它被 Next.js 服务器和构建阶段使用，不会包含在浏览器构建中。

如果你需要使用 [ECMAScript 模块](https://nodejs.org/api/esm.html)，可以使用 `next.config.mjs`：

```js
// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* 这里是配置选项 */
}

export default nextConfig
```

> **须知**：目前**不**支持带有 `.cjs`、`.cts` 或 `.mts` 扩展名的 `next.config`。

## 配置为函数

你也可以使用函数：

```js
// @ts-check

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* 这里是配置选项 */
  }
  return nextConfig
}
```

### 异步配置

从 Next.js 12.1.0 开始，你可以使用异步函数：

```js
// @ts-check

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* 这里是配置选项 */
  }
  return nextConfig
}
```

### 阶段

`phase` 是加载配置的当前上下文。你可以查看[可用阶段](https://github.com/vercel/next.js/blob/5e6b008b561caf2710ab7be63320a3d549474a5b/packages/next/shared/lib/constants.ts#LL23)。阶段可以从 `next/constants` 导入：

```js
// @ts-check

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* 仅开发环境的配置选项 */
    }
  }

  return {
    /* 除开发环境外所有阶段的配置选项 */
  }
}
```

## TypeScript

如果你在项目中使用 TypeScript，可以使用 `next.config.ts` 在配置中使用 TypeScript：

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* 这里是配置选项 */
}

export default nextConfig
```

注释行是你可以放置 `next.config.js` 允许的配置的地方，这些配置[在此文件中定义](https://github.com/vercel/next.js/blob/canary/packages/next/src/server/config-shared.ts)。

然而，所有这些配置都不是必需的，也不需要了解每个配置的作用。相反，在本节中搜索你需要启用或修改的功能，它们会告诉你该怎么做。

> 避免使用目标 Node.js 版本中不可用的新 JavaScript 功能。`next.config.js` 不会被 Webpack 或 Babel 解析。

本页面记录了所有可用的配置选项：

## 单元测试（实验性）

从 Next.js 15.1 开始，`next/experimental/testing/server` 包含帮助对 `next.config.js` 文件进行单元测试的实用工具。

`unstable_getResponseFromNextConfig` 函数运行 `next.config.js` 中的 [`headers`](/docs/nextjs-cn/app/api-reference/config/next-config-js/headers)、[`redirects`](/docs/nextjs-cn/app/api-reference/config/next-config-js/redirects) 和 [`rewrites`](/docs/nextjs-cn/app/api-reference/config/next-config-js/rewrites) 函数，使用提供的请求信息并返回带有路由结果的 `NextResponse`。

> `unstable_getResponseFromNextConfig` 的响应仅考虑 `next.config.js` 字段，不考虑中间件或文件系统路由，因此生产环境中的结果可能与单元测试不同。

```js
import {
  getRedirectUrl,
  unstable_getResponseFromNextConfig,
} from 'next/experimental/testing/server'

const response = await unstable_getResponseFromNextConfig({
  url: 'https://nextjs.org/test',
  nextConfig: {
    async redirects() {
      return [{ source: '/test', destination: '/test2', permanent: false }]
    },
  },
})
expect(response.status).toEqual(307)
expect(getRedirectUrl(response)).toEqual('https://nextjs.org/test2')
```
