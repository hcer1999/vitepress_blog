---
title: Turbopack
description: Turbopack 是一个用 Rust 编写的针对 JavaScript 和 TypeScript 优化的增量打包工具，内置于 Next.js 中。
---

Turbopack 是一个用 Rust 编写的针对 JavaScript 和 TypeScript 优化的**增量打包工具**，内置于 **Next.js** 中。你可以在 Pages 和 App Router 中使用 Turbopack，获得**更快速**的本地开发体验。

## 为什么选择 Turbopack?

我们构建 Turbopack 是为了提升 Next.js 的性能，包括：

- **统一图谱：** Next.js 支持多种输出环境（例如客户端和服务器）。管理多个编译器并将打包结果拼接在一起可能很繁琐。Turbopack 为所有环境使用**单一、统一的图谱**。
- **打包 vs 原生 ESM：** 一些工具在开发时跳过打包，依赖浏览器的原生 ESM。这对小型应用效果很好，但对于大型应用，由于过多的网络请求可能会变慢。Turbopack 在开发时**进行打包**，但采用优化的方式保持大型应用的快速响应。
- **增量计算：** Turbopack 跨核心并行处理工作并**缓存**结果到函数级别。一旦完成某项工作，Turbopack 不会重复执行。
- **懒惰打包：** Turbopack 只打包开发服务器实际请求的内容。这种懒惰的方法可以减少初始编译时间和内存使用。

## 开始使用

要在你的 Next.js 项目中启用 Turbopack，在 `package.json` 文件中的 `dev` 和 `build` 脚本添加 `--turbopack` 标志：

```json highlight={3}
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start"
  }
}
```

目前，用于 `dev` 的 Turbopack 已经稳定，而用于 `build` 的功能仍处于 alpha 阶段。随着 Turbopack 逐渐趋于稳定，我们正在积极开发生产环境支持。

## 支持的功能

Next.js 中的 Turbopack 针对常见用例提供**零配置**支持。以下是开箱即用功能的摘要，以及在需要时如何进一步配置 Turbopack 的参考。

### 语言功能

| 功能                         | 状态       | 说明                                                                                                                                                                              |
| ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JavaScript 和 TypeScript** | **已支持** | 底层使用 SWC。Turbopack 不执行类型检查（运行 `tsc --watch` 或依赖你的 IDE 进行类型检查）。                                                                                        |
| **ECMAScript (ESNext)**      | **已支持** | Turbopack 支持最新的 ECMAScript 特性，与 SWC 的覆盖范围相匹配。                                                                                                                   |
| **CommonJS**                 | **已支持** | 开箱即用地处理 `require()` 语法。                                                                                                                                                 |
| **ESM**                      | **已支持** | 完全支持静态和动态 `import`。                                                                                                                                                     |
| **Babel**                    | 部分不支持 | Turbopack 默认不包含 Babel。但是，你可以[通过 Turbopack 配置配置 `babel-loader`](/docs/nextjs-cn/app/api-reference/config/next-config-js/turbopack#configuring-webpack-loaders)。 |

### 框架和 React 功能

| 功能                              | 状态       | 说明                                                               |
| --------------------------------- | ---------- | ------------------------------------------------------------------ |
| **JSX / TSX**                     | **已支持** | SWC 处理 JSX/TSX 编译。                                            |
| **Fast Refresh**                  | **已支持** | 无需配置。                                                         |
| **React Server Components (RSC)** | **已支持** | 适用于 Next.js App Router。Turbopack 确保正确的服务器/客户端打包。 |
| **根布局创建**                    | 不支持     | 在 App Router 中不支持自动创建根布局。Turbopack 会指导你手动创建。 |

### CSS 和样式

| 功能              | 状态                  | 说明                                                                                                                       |
| ----------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **全局 CSS**      | **已支持**            | 在你的应用程序中直接导入 `.css` 文件。                                                                                     |
| **CSS 模块**      | **已支持**            | `.module.css` 文件原生工作（Lightning CSS）。                                                                              |
| **CSS 嵌套**      | **已支持**            | Lightning CSS 支持[现代 CSS 嵌套](https://lightningcss.dev/)。                                                             |
| **@import 语法**  | **已支持**            | 组合多个 CSS 文件。                                                                                                        |
| **PostCSS**       | **已支持**            | 在 Node.js 工作池中自动处理 `postcss.config.js`。对于 Tailwind、Autoprefixer 等非常有用。                                  |
| **Sass / SCSS**   | **已支持**（Next.js） | 对于 Next.js，开箱即用地支持 Sass。未来，Turbopack 独立使用可能需要加载器配置。                                            |
| **Less**          | 计划通过插件支持      | 默认尚未支持。一旦自定义加载器稳定，可能需要加载器配置。                                                                   |
| **Lightning CSS** | **使用中**            | 处理 CSS 转换。一些低使用率的 CSS 模块功能（如作为独立伪类的 `:local/:global`）尚未支持。[详见下文](#不支持和未计划的功能) |

### 资源

| 功能                       | 状态       | 说明                                                                                          |
| -------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| **静态资源**（图片、字体） | **已支持** | 导入 `import img from './img.png'` 开箱即用。在 Next.js 中，为 `<Image />` 组件返回一个对象。 |
| **JSON 导入**              | **已支持** | 支持 `.json` 的命名或默认导入。                                                               |

### 模块解析

| 功能             | 状态       | 说明                                                                                                                                                                 |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **路径别名**     | **已支持** | 读取 `tsconfig.json` 的 `paths` 和 `baseUrl`，匹配 Next.js 行为。                                                                                                    |
| **手动别名**     | **已支持** | [在 `next.config.js` 中配置 `resolveAlias`](/docs/nextjs-cn/app/api-reference/config/next-config-js/turbopack#resolving-aliases)（类似于 `webpack.resolve.alias`）。 |
| **自定义扩展名** | **已支持** | [在 `next.config.js` 中配置 `resolveExtensions`](/docs/nextjs-cn/app/api-reference/config/next-config-js/turbopack#resolving-custom-extensions)。                    |
| **AMD**          | 部分支持   | 基本转换有效；高级 AMD 用法有限。                                                                                                                                    |

### 性能和 Fast Refresh

| 功能             | 状态       | 说明                                                       |
| ---------------- | ---------- | ---------------------------------------------------------- |
| **Fast Refresh** | **已支持** | 更新 JavaScript、TypeScript 和 CSS 而不需要完全刷新。      |
| **增量打包**     | **已支持** | Turbopack 懒加载只构建开发服务器请求的内容，加速大型应用。 |

## 不支持和未计划的功能

一些功能尚未实现或不在计划中：

- **传统 CSS 模块功能**
  - 独立的 `:local` 和 `:global` 伪类（仅支持函数变体 `:global(...)`）。
  - `@value` 规则（被 CSS 变量取代）。
  - `:import` 和 `:export` ICSS 规则。
- **`next.config.js` 中的 `webpack()` 配置**
  Turbopack 替代了 webpack，因此不识别 `webpack()` 配置。请改用 [`turbopack` 配置](/docs/nextjs-cn/app/api-reference/config/next-config-js/turbopack)。
- **AMP**
  在 Next.js 中不计划支持 Turbopack。
- **Yarn PnP**
  在 Next.js 中不计划支持 Turbopack。
- **`experimental.urlImports`**
  不为 Turbopack 计划支持。
- **`experimental.esmExternals`**
  不计划支持。Turbopack 不支持 Next.js 中的传统 `esmExternals` 配置。
- **一些 Next.js 实验性标志**
  - `experimental.typedRoutes`
  - `experimental.nextScriptWorkers`
  - `experimental.sri.algorithm`
  - `experimental.fallbackNodePolyfills`
    我们计划在未来实现这些功能。

有关每个功能标志及其状态的完整详细分析，请参见 [Turbopack API 参考](/docs/nextjs-cn/app/api-reference/config/next-config-js/turbopack)。

## 配置

Turbopack 可以通过 `next.config.js`（或 `next.config.ts`）中的 `turbopack` 键进行配置。配置选项包括：

- **`rules`**
  定义用于文件转换的额外 [webpack 加载器](/docs/nextjs-cn/app/api-reference/config/next-config-js/turbopack#configuring-webpack-loaders)。
- **`resolveAlias`**
  创建手动别名（类似于 webpack 中的 `resolve.alias`）。
- **`resolveExtensions`**
  更改或扩展用于模块解析的文件扩展名。
- **`moduleIds`**
  设置模块 ID 的生成方式（`'named'` vs `'deterministic'`）。
- **`treeShaking`**
  在开发和未来的生产构建中启用或禁用树摇（tree shaking）。
- **`memoryLimit`**
  为 Turbopack 设置内存限制（以字节为单位）。

```js
module.exports = {
  turbopack: {
    // 示例：添加别名和自定义文件扩展名
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
}
```

有关更深入的配置示例，请参见 [Turbopack 配置文档](/docs/nextjs-cn/app/api-reference/config/next-config-js/turbopack)。

## 生成跟踪文件用于性能调试

如果你遇到性能或内存问题，并希望帮助 Next.js 团队诊断，可以通过在开发命令中附加 `NEXT_TURBOPACK_TRACING=1` 来生成跟踪文件：

```bash
NEXT_TURBOPACK_TRACING=1 next dev --turbopack
```

这将生成一个 `.next/trace-turbopack` 文件。在 [Next.js 仓库](https://github.com/vercel/next.js) 创建 GitHub 问题时包含该文件，以帮助我们调查。

## 总结

Turbopack 是一个**基于 Rust**的**增量**打包工具，旨在加快本地开发和构建速度——特别是对于大型应用。它集成到 Next.js 中，提供零配置的 CSS、React 和 TypeScript 支持。

随着我们继续改进 Turbopack 并添加生产构建支持，敬请期待更多更新。同时，请使用 `next dev --turbopack` 试用它，并让我们知道你的反馈。

## 版本变更

| 版本      | 变更                           |
| --------- | ------------------------------ |
| `v15.3.0` | 对 `build` 的实验性支持        |
| `v15.0.0` | 用于 `dev` 的 Turbopack 稳定版 |
