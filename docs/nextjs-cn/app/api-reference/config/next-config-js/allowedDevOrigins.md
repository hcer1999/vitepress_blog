---
title: allowedDevOrigins
description: 使用 `allowedDevOrigins` 配置可以请求开发服务器的其他源。
---

# NextJS中文文档 - AllowedDevOrigins

Next.js 在开发过程中不会自动阻止跨域请求，但在未来的 Next.js 主要版本中将默认阻止，以防止未经授权请求开发模式下可用的内部资源/端点。

要配置 Next.js 应用程序允许来自服务器初始化主机名（默认为 `localhost`）以外的源的请求，你可以使用 `allowedDevOrigins` 配置选项。

`allowedDevOrigins` 允许你设置可以在开发模式下使用的其他源。例如，要使用 `local-origin.dev` 而不仅仅是 `localhost`，打开 `next.config.js` 并添加 `allowedDevOrigins` 配置：

```js
module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}
```
