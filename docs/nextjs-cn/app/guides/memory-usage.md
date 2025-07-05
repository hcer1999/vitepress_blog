---
title: 如何优化内存使用
nav_title: 内存使用
description: 优化应用程序在开发和生产环境中使用的内存。
---

随着应用程序的增长和功能的丰富，它们在本地开发或创建生产构建时可能会需要更多资源。

让我们探讨一些策略和技术来优化内存并解决 Next.js 中常见的内存问题。

## 减少依赖项数量

具有大量依赖项的应用程序将使用更多内存。

[Bundle Analyzer](/nextjs-cn/app/guides/package-bundling) 可以帮助你调查应用程序中可能可以移除的大型依赖项，以提高性能和减少内存使用。

## 尝试 `experimental.webpackMemoryOptimizations`

从 `v15.0.0` 开始，你可以在 `next.config.js` 文件中添加 `experimental.webpackMemoryOptimizations: true` 来更改 Webpack 的行为，减少最大内存使用量，但可能会略微增加编译时间。

> **须知**：这个功能目前是实验性的，主要是为了在更多项目上进行测试，但被认为是低风险的。

## 使用 `--experimental-debug-memory-usage` 运行 `next build`

从 `14.2.0` 开始，你可以运行 `next build --experimental-debug-memory-usage` 来以一种模式运行构建，在这种模式下 Next.js 将在整个构建过程中持续输出有关内存使用情况的信息，例如堆使用情况和垃圾回收统计信息。当内存使用接近配置的限制时，还会自动拍摄堆快照。

> **须知**：除非你有自定义的 webpack 配置，否则此功能与自动启用的 Webpack 构建工作器选项不兼容。

## 记录堆分析文件

要查找内存问题，你可以从 Node.js 记录堆分析文件，并将其加载到 Chrome DevTools 中，以识别潜在的内存泄漏源。

在终端中，在启动 Next.js 构建时向 Node.js 传递 `--heap-prof` 标志：

```sh
node --heap-prof node_modules/next/dist/bin/next build
```

构建结束时，Node.js 将创建一个 `.heapprofile` 文件。

在 Chrome DevTools 中，你可以打开 Memory 标签，然后点击"Load Profile"按钮来可视化该文件。

## 分析堆的快照

你可以使用检查工具来分析应用程序的内存使用情况。

在运行 `next build` 或 `next dev` 命令时，在命令的开头添加 `NODE_OPTIONS=--inspect`。这将在默认端口上公开检查器代理。
如果你希望在任何用户代码启动之前中断，你可以改为传递 `--inspect-brk`。在进程运行时，你可以使用 Chrome DevTools 等工具连接到调试端口，记录和分析堆的快照，以查看内存被保留的内容。

从 `14.2.0` 开始，你还可以使用 `--experimental-debug-memory-usage` 标志运行 `next build`，以更轻松地获取堆快照。

在这种模式下运行时，你可以随时向进程发送 `SIGUSR2` 信号，进程将获取堆快照。

堆快照将保存到 Next.js 应用程序的项目根目录，可以在任何堆分析器（如 Chrome DevTools）中加载，以查看保留了哪些内存。此模式尚不兼容 Webpack 构建工作器。

有关更多信息，请参阅[如何记录和分析堆快照](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots)。

## Webpack 构建工作器

Webpack 构建工作器允许你在单独的 Node.js 工作器中运行 Webpack 编译，这将减少构建期间应用程序的内存使用量。

从 `v14.1.0` 开始，如果你的应用程序没有自定义 Webpack 配置，则默认启用此选项。

如果你使用的是较旧版本的 Next.js 或者你有自定义 Webpack 配置，可以通过在 `next.config.js` 中设置 `experimental.webpackBuildWorker: true` 来启用此选项。

> **须知**：此功能可能与所有自定义 Webpack 插件不兼容。

## 禁用 Webpack 缓存

[Webpack 缓存](https://webpack.js.org/configuration/cache/)将生成的 Webpack 模块保存在内存和/或磁盘中，以提高构建速度。这可以帮助提高性能，但也会增加应用程序的内存使用量来存储缓存数据。

你可以通过向应用程序添加[自定义 Webpack 配置](/nextjs-cn/app/api-reference/config/next-config-js/webpack)来禁用此行为：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      })
    }
    // 重要：返回修改后的配置
    return config
  },
}

export default nextConfig
```

## 禁用静态分析

类型检查和代码检查可能需要大量内存，尤其是在大型项目中。
但是，大多数项目都有专用的 CI 运行器来处理这些任务。
当构建在"检查代码和类型有效性"步骤中出现内存不足问题时，你可以在构建期间禁用这些任务：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 警告：这允许生产构建成功完成，即使
    // 你的项目有 ESLint 错误。
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! 警告 !!
    // 危险地允许生产构建成功完成，即使
    // 你的项目有类型错误。
    // !! 警告 !!
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

- [忽略 TypeScript 错误](/nextjs-cn/app/api-reference/config/typescript#disabling-typescript-errors-in-production)
- [Next.js 配置中的 ESLint](/nextjs-cn/pages/api-reference/config/next-config-js/eslint)

请记住，这可能会由于类型错误或代码检查问题而产生有缺陷的部署。
我们强烈建议仅在静态分析完成后将构建提升到生产环境。
如果你部署到 Vercel，你可以查看[暂存部署指南](https://vercel.com/docs/deployments/managing-deployments#staging-and-promoting-a-production-deployment)，了解如何在自定义任务成功后将构建提升到生产环境。

## 禁用源映射

生成源映射会在构建过程中消耗额外的内存。

你可以通过在 Next.js 配置中添加 `productionBrowserSourceMaps: false` 和 `experimental.serverSourceMaps: false` 来禁用源映射生成。

> **须知**：某些插件可能会开启源映射，并可能需要自定义配置来禁用。

## Edge 内存问题

Next.js `v14.1.3` 修复了使用 Edge 运行时时的内存问题。请更新到此版本（或更高版本）以查看是否解决了你的问题。
