---
title: poweredByHeader
description: Next.js 默认会添加 `x-powered-by` 头部。在这里了解如何选择不使用它。
---

# NextJS中文文档 - PoweredByHeader

默认情况下，Next.js 会添加 `x-powered-by` 头部。要选择不使用它，打开 `next.config.js` 并禁用 `poweredByHeader` 配置：

```js
module.exports = {
  poweredByHeader: false,
}
```
