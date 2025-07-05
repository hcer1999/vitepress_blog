---
title: 如何优化本地开发环境
nav_title: 开发环境
description: 学习如何使用 Next.js 优化本地开发环境。
---

Next.js 旨在提供出色的开发者体验。随着应用程序的增长，你可能会注意到本地开发期间的编译时间变慢。本指南将帮助你识别并解决常见的编译时性能问题。

## 本地开发环境 vs. 生产环境

使用 `next dev` 的开发过程与 `next build` 和 `next start` 不同。

`next dev` 会在你打开或导航到应用程序中的路由时编译它们。这使你能够启动开发服务器而无需等待应用程序中的每个路由都编译完成，这样既快速又使用较少的内存。运行生产构建时会应用其他优化，如压缩文件和创建内容哈希，这些在本地开发中并不需要。

## 提高本地开发性能

### 1. 检查你的计算机杀毒软件

杀毒软件可能会减慢文件访问速度。

尝试将你的项目文件夹添加到杀毒软件的排除列表中。虽然这在 Windows 机器上更为常见，但我们建议对安装了杀毒工具的任何系统都进行此操作。

### 2. 更新 Next.js 并启用 Turbopack

确保你使用的是最新版本的 Next.js。每个新版本通常包含性能改进。

Turbopack 是集成到 Next.js 中的新打包工具，可以提高本地性能。

```bash
npm install next@latest
npm run dev --turbopack
```

[了解更多关于 Turbopack]()。查看我们的[升级指南](/nextjs-cn/app/guides/upgrading/index)和代码模块获取更多信息。

### 3. 检查你的导入

导入代码的方式可能会极大地影响编译和打包时间。了解更多关于[优化包打包](/nextjs-cn/app/guides/package-bundling)并探索诸如 [Dependency Cruiser](https://github.com/sverweij/dependency-cruiser) 或 [Madge](https://github.com/pahen/madge) 等工具。

### 图标库

像 `@material-ui/icons` 或 `react-icons` 这样的库可能会导入数千个图标，即使你只使用其中的几个。尝试只导入你需要的图标：

```jsx
// 不要这样做：
import { Icon1, Icon2 } from 'react-icons/md'

// 应该这样做：
import Icon1 from 'react-icons/md/Icon1'
import Icon2 from 'react-icons/md/Icon2'
```

像 `react-icons` 这样的库包含许多不同的图标集。选择一个集合并坚持使用该集合。

例如，如果你的应用程序使用 `react-icons` 并导入所有这些：

- `pi` (Phosphor Icons)
- `md` (Material Design Icons)
- `tb` (tabler-icons)
- `cg` (cssgg)

合起来将有数万个模块需要编译器处理，即使你只使用每个集合中的一个导入。

### 桶文件

"桶文件"是从其他文件导出多个项的文件。它们可能会减慢构建速度，因为编译器必须解析它们以查找是否通过使用导入在模块范围内有副作用。

尽可能直接从特定文件导入。[了解更多关于桶文件](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)以及 Next.js 中的内置优化。

### 优化包导入

Next.js 可以自动优化某些包的导入。如果你使用的包利用了桶文件，将它们添加到你的 `next.config.js` 中：

```jsx
module.exports = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
}
```

Turbopack 会自动分析导入并优化它们。它不需要这个配置。

### 4. 检查你的 Tailwind CSS 设置

如果你正在使用 Tailwind CSS，确保它设置正确。

一个常见的错误是配置 `content` 数组时包含了 `node_modules` 或其他不应该被扫描的大型文件目录。

Tailwind CSS 3.4.8 或更新版本会警告你可能会减慢构建速度的设置。

1. 在你的 `tailwind.config.js` 中，明确指定要扫描的文件：

   ```jsx
   module.exports = {
     content: [
       './src/**/*.{js,ts,jsx,tsx}', // 好的
       // 这可能太广泛
       // 它也会匹配 `packages/**/node_modules`
       // '../../packages/**/*.{js,ts,jsx,tsx}',
     ],
   }
   ```

2. 避免扫描不必要的文件：

   ```jsx
   module.exports = {
     content: [
       // 更好 - 只扫描 'src' 文件夹
       '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
     ],
   }
   ```

### 5. 检查自定义 webpack 设置

如果你添加了自定义 webpack 设置，它们可能会减慢编译速度。

考虑是否真的需要它们用于本地开发。你可以选择只在生产构建中包含某些工具，或者考虑迁移到 Turbopack 并使用[加载器](/nextjs-cn/app/api-reference/config/next-config-js/turbopack#supported-loaders)。

### 6. 优化内存使用

如果你的应用程序非常大，它可能需要更多内存。

[了解更多关于优化内存使用](/nextjs-cn/app/guides/memory-usage)。

### 7. 服务器组件和数据获取

对服务器组件的更改会导致整个页面在本地重新渲染，以显示新的更改，这包括为组件获取新数据。

实验性的 `serverComponentsHmrCache` 选项允许你在本地开发中跨热模块替换 (HMR) 刷新缓存服务器组件中的 `fetch` 响应。这会带来更快的响应时间，并减少计费 API 调用的成本。

[了解更多关于实验性选项](/nextjs-cn/app/api-reference/config/next-config-js/serverComponentsHmrCache)。

## 查找问题的工具

### 详细的获取日志

使用此命令查看开发期间发生的事情的更详细信息：

```bash
next dev --verbose
```

## Turbopack 跟踪

Turbopack 跟踪是一个工具，可帮助你了解应用程序在本地开发期间的性能。
它提供了每个模块编译所需时间的详细信息，以及它们之间的关系。

1. 确保你安装了最新版本的 Next.js。
1. 生成 Turbopack 跟踪文件：

   ```bash
   NEXT_TURBOPACK_TRACING=1 npm run dev
   ```

1. 在你的应用程序中导航或编辑文件以重现问题。
1. 停止 Next.js 开发服务器。
1. `.next` 文件夹中将有一个名为 `trace-turbopack` 的文件。
1. 你可以使用 `next internal trace [path-to-file]` 解释该文件：

   ```bash
   next internal trace .next/trace-turbopack
   ```

   在 `trace` 不可用的版本中，命令被命名为 `turbo-trace-server`：

   ```bash
   next internal turbo-trace-server .next/trace-turbopack
   ```

1. 跟踪服务器运行后，你可以在 https://trace.nextjs.org/ 查看跟踪。
1. 默认情况下，跟踪查看器会聚合时间，为了查看每个单独的时间，你可以在查看器右上角将"Aggregated in order"切换为"Spans in order"。

## 仍然有问题？

生成[Turbopack 跟踪](#turbopack-tracing)部分中的跟踪文件，并在 [GitHub Discussions](https://github.com/vercel/next.js/discussions) 或 [Discord](https://nextjs.org/discord) 上分享。
