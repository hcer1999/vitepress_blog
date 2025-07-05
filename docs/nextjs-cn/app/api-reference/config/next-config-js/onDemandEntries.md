---
title: onDemandEntries
description: 配置 Next.js 如何在开发中处理和保持内存中创建的页面。
---

# NextJS中文文档 - OnDemandEntries

Next.js 提供了一些选项，让你可以控制服务器如何处理或在内存中保留开发环境中构建的页面。

要更改默认设置，打开 `next.config.js` 并添加 `onDemandEntries` 配置：

```js
module.exports = {
  onDemandEntries: {
    // 服务器将在缓冲区中保留页面的时间（以毫秒为单位）
    maxInactiveAge: 25 * 1000,
    // 应同时保留而不被释放的页面数量
    pagesBufferLength: 2,
  },
}
```
