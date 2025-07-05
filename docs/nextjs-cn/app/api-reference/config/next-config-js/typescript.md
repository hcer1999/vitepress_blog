---
title: typescript
description: Next.js 默认会报告 TypeScript 错误。在此了解如何选择退出此行为。
---

当你的项目中存在 TypeScript 错误时，Next.js 会使你的**生产构建**（`next build`）失败。

如果你希望 Next.js 即使在应用程序有错误的情况下也能生成生产代码，你可以禁用内置的类型检查步骤。

如果禁用了类型检查，请确保你在构建或部署过程中运行类型检查，否则这可能非常危险。

打开 `next.config.js` 并在 `typescript` 配置中启用 `ignoreBuildErrors` 选项：

```js
module.exports = {
  typescript: {
    // !! 警告 !!
    // 危险地允许即使你的项目有类型错误，生产构建也能成功完成。
    // !! 警告 !!
    ignoreBuildErrors: true,
  },
}
```
