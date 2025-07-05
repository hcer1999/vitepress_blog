---
title: compress
description: Next.js 提供 gzip 压缩来压缩渲染内容和静态文件，它仅适用于服务器目标。在此了解更多信息。
---

默认情况下，Next.js 在使用 `next start` 或自定义服务器时使用 `gzip` 来压缩渲染内容和静态文件。这是对未配置压缩的应用程序的优化。如果应用程序已通过自定义服务器配置了压缩，Next.js 将不会添加压缩。

你可以通过查看响应中的 [`Accept-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding)（浏览器接受的选项）和 [`Content-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding)（当前使用的）头部来检查压缩是否已启用以及使用的算法。

## 禁用压缩

要禁用**压缩**，请将 `compress` 配置选项设置为 `false`：

```js
module.exports = {
  compress: false,
}
```

我们**不建议禁用压缩**，除非你已经在服务器上配置了压缩，因为压缩可以减少带宽使用并提高应用程序的性能。例如，如果你使用 [nginx](https://nginx.org/) 并想切换到 `brotli`，请将 `compress` 选项设置为 `false` 以允许 nginx 处理压缩。
