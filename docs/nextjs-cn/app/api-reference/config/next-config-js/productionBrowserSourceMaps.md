---
title: productionBrowserSourceMaps
description: 在生产构建过程中启用浏览器源映射生成
---

# NextJS中文文档 - ProductionBrowserSourceMaps

源映射在开发过程中默认启用。在生产构建期间，它们被禁用以防止你在客户端泄露源代码，除非你通过配置标志特别选择启用。

Next.js 提供了一个配置标志，你可以使用它在生产构建期间启用浏览器源映射生成：

```js
module.exports = {
  productionBrowserSourceMaps: true,
}
```

当启用 `productionBrowserSourceMaps` 选项时，源映射将输出在与 JavaScript 文件相同的目录中。Next.js 将在请求时自动提供这些文件。

- 添加源映射可能会增加 `next build` 时间
- 增加 `next build` 期间的内存使用量
