---
title: 元数据文件 API 参考
nav_title: 元数据文件
description: 元数据文件约定的 API 文档。
---

# NextJS中文文档 - Metadata

文档的这一部分涵盖**元数据文件约定**。基于文件的元数据可以通过向路由段添加特殊的元数据文件来定义。

每个文件约定可以使用静态文件（例如 `opengraph-image.jpg`）定义，或使用代码生成文件的动态变体（例如 `opengraph-image.js`）。

一旦定义了文件，Next.js 将自动提供该文件（在生产环境中带有哈希值以便缓存），并使用正确的元数据更新相关的头部元素，例如资源的 URL、文件类型和图像尺寸。

> **须知**：
>
> - 特殊路由处理程序如 [`sitemap.ts`](/nextjs-cn/app/api-reference/file-conventions/metadata/sitemap)、[`opengraph-image.tsx`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image) 和 [`icon.tsx`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons) 以及其他[元数据文件](/nextjs-cn/app/api-reference/file-conventions/metadata/index)默认情况下是被缓存的。
> - 如果与 [`middleware.ts`](/nextjs-cn/app/api-reference/file-conventions/middleware) 一起使用，请[配置匹配器](/nextjs-cn/app/building-your-application/routing/middleware#matcher)以排除元数据文件。
