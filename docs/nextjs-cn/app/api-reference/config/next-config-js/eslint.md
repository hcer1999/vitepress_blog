---
title: eslint
description: Next.js 在构建过程中默认会报告 ESLint 错误和警告。在此了解如何选择退出此行为。
---

# NextJS中文文档 - Eslint

当在你的项目中检测到 ESLint 时，如果存在错误，Next.js 会使你的**生产构建**（`next build`）失败。

如果你希望 Next.js 即使在应用程序有 ESLint 错误的情况下也能生成生产代码，你可以完全禁用内置的检查步骤。除非你已经配置了 ESLint 在工作流程的其他部分运行（例如，在 CI 或预提交钩子中），否则不建议这样做。

打开 `next.config.js` 并在 `eslint` 配置中启用 `ignoreDuringBuilds` 选项：

```js
module.exports = {
  eslint: {
    // 警告：这允许即使你的项目有 ESLint 错误，生产构建也能成功完成。
    ignoreDuringBuilds: true,
  },
}
```
