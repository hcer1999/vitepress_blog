---
title: generateBuildId
description: 配置构建 ID，用于标识当前提供应用程序的构建版本。
---

# NextJS中文文档 - GenerateBuildId

Next.js 在 `next build` 期间生成一个 ID，用于标识正在提供的应用程序版本。同一构建应该被用于启动多个容器。

如果你为环境的每个阶段重新构建，则需要生成一个在容器之间使用的一致构建 ID。在 `next.config.js` 中使用 `generateBuildId` 命令：

```jsx
module.exports = {
  generateBuildId: async () => {
    // 这可以是任何内容，使用最新的 git hash
    return process.env.GIT_HASH
  },
}
```
