---
title: httpAgentOptions
description: Next.js 默认会自动使用 HTTP Keep-Alive。在此了解如何禁用 HTTP Keep-Alive。
---

在 18 版本之前的 Node.js 中，Next.js 自动使用 [undici](/docs/nextjs-cn/architecture/supported-browsers#polyfills) 对 `fetch()` 进行填充，并默认启用 [HTTP Keep-Alive](https://developer.mozilla.org/docs/Web/HTTP/Headers/Keep-Alive)。

要为服务器端的所有 `fetch()` 调用禁用 HTTP Keep-Alive，打开 `next.config.js` 并添加 `httpAgentOptions` 配置：

```js
module.exports = {
  httpAgentOptions: {
    keepAlive: false,
  },
}
```
