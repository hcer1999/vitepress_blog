---
title: serverActions
description: 在 Next.js 应用程序中配置服务器操作的行为。
---

# NextJS中文文档 - ServerActions

用于在 Next.js 应用程序中配置服务器操作行为的选项。

## `allowedOrigins`

一个额外的安全源域列表，允许从这些域调用服务器操作。Next.js 会比较服务器操作请求的源与主机域，确保它们匹配以防止 CSRF 攻击。如果未提供，则只允许同源请求。

```js
/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
    },
  },
}
```

## `bodySizeLimit`

默认情况下，发送到服务器操作的请求体的最大大小为 1MB，以防止在解析大量数据时消耗过多的服务器资源，以及潜在的 DDoS 攻击。

但是，你可以使用 `serverActions.bodySizeLimit` 选项配置此限制。它可以接受字节数或任何 bytes 支持的字符串格式，例如 `1000`、`'500kb'` 或 `'3mb'`。

```js
/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}
```

## 启用服务器操作（v13）

服务器操作在 Next.js 14 中成为稳定功能，默认启用。但是，如果你使用的是早期版本的 Next.js，可以通过将 `experimental.serverActions` 设置为 `true` 来启用它们。

```js
/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true,
  },
}

module.exports = config
```
