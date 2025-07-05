---
title: src 文件夹
nav_title: src
description: 将页面保存在 `src` 文件夹下，作为根 `pages` 目录的替代方案。
related:
  links:
    - app/getting-started/project-structure
---

作为在项目根目录中放置特殊的 Next.js `app` 或 `pages` 目录的替代方案，Next.js 还支持将应用程序代码放在 `src` 文件夹下的常见模式。

这将应用程序代码与大多数位于项目根目录中的项目配置文件分开，这是一些个人和团队所偏好的方式。

要使用 `src` 文件夹，将 `app` 路由器文件夹或 `pages` 路由器文件夹分别移至 `src/app` 或 `src/pages`。

<Image
  alt="使用 `src` 文件夹的示例文件夹结构"
  srcLight="/docs/light/project-organization-src-directory.png"
  srcDark="/docs/dark/project-organization-src-directory.png"
  width="1600"
  height="687"
/>

> **须知**：
>
> - `/public` 目录应保留在项目的根目录中。
> - 配置文件如 `package.json`、`next.config.js` 和 `tsconfig.json` 应保留在项目的根目录中。
> - `.env.*` 文件应保留在项目的根目录中。
> - 如果根目录中存在 `app` 或 `pages`，则 `src/app` 或 `src/pages` 将被忽略。
> - 如果您使用 `src`，您可能还会移动其他应用程序文件夹，如 `/components` 或 `/lib`。
> - 如果您使用中间件，请确保将其放在 `src` 文件夹内。
> - 如果您使用 Tailwind CSS，您需要在 `tailwind.config.js` 文件的 [content 部分](https://tailwindcss.com/docs/content-configuration)中添加 `/src` 前缀。
> - 如果您使用 TypeScript 路径来导入，例如 `@/*`，您应该更新 `tsconfig.json` 中的 `paths` 对象以包含 `src/`。

## 版本历史

| 版本     | 变更                |
| -------- | ------------------- |
| `v9.0.0` | 引入 `src` 文件夹。 |
