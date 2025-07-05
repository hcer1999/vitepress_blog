---
title: generateEtags
description: Next.js 默认会为每个页面生成 etag。在此了解如何禁用 etag 生成。
---

# NextJS中文文档 - GenerateEtags

Next.js 默认会为每个页面生成 [etags](https://en.wikipedia.org/wiki/HTTP_ETag)。根据你的缓存策略，你可能希望禁用 HTML 页面的 etag 生成。

打开 `next.config.js` 并禁用 `generateEtags` 选项：

```js
module.exports = {
  generateEtags: false,
}
```
