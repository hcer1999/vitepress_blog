---
title: 如何升级到第 14 版
nav_title: 第 14 版
description: 将你的 Next.js 应用程序从第 13 版升级到第 14 版。
---

## 从第 13 版升级到第 14 版

要更新到 Next.js 第 14 版，请使用你偏好的包管理器运行以下命令：

```bash
npm i next@next-14 react@18 react-dom@18 && npm i eslint-config-next@next-14 -D
```

```bash
yarn add next@next-14 react@18 react-dom@18 && yarn add eslint-config-next@next-14 -D
```

```bash
pnpm i next@next-14 react@18 react-dom@18 && pnpm i eslint-config-next@next-14 -D
```

```bash
bun add next@next-14 react@18 react-dom@18 && bun add eslint-config-next@next-14 -D
```

> **提示：** 如果你使用的是 TypeScript，请确保也将 `@types/react` 和 `@types/react-dom` 升级到最新版本。

### 第 14 版概述

- 最低 Node.js 版本已从 16.14 提升到 18.17，因为 16.x 已达到生命周期结束。
- `next export` 命令已被移除，改为使用 `output: 'export'` 配置。更多信息请参见[文档]()。
- `next/server` 中的 `ImageResponse` 导入已更名为 `next/og`。有一个[代码修改工具](/nextjs-cn/app/guides/upgrading/codemods#next-og-import)可以安全自动地重命名你的导入。
- `@next/font` 包已完全移除，改为使用内置的 `next/font`。有一个[代码修改工具]()可以安全自动地重命名你的导入。
- `next-swc` 的 WASM 目标已被移除。
