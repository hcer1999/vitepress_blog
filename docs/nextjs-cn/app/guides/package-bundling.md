---
title: 如何优化包打包
nav_title: 包打包
description: 学习如何优化应用程序的服务器和客户端包。
related:
  description: 详细了解如何为生产环境优化应用程序。
  links:
    - app/guides/production-checklist
---

# NextJS中文文档 - Package Bundling

打包外部包可以显著提高应用程序的性能。<AppOnly>默认情况下，在服务器组件和路由处理程序中导入的包会由 Next.js 自动打包。本页将指导你如何分析和进一步优化包打包。</AppOnly> <PagesOnly>默认情况下，导入到应用程序中的包不会被打包。如果外部包没有预先打包，这可能会影响性能或可能无法工作，例如，如果从 monorepo 或 `node_modules` 导入。本页将指导你如何分析和配置包打包。</PagesOnly>

## 分析 JavaScript 包

[`@next/bundle-analyzer`](https://www.npmjs.com/package/@next/bundle-analyzer) 是 Next.js 的一个插件，可帮助你管理应用程序包的大小。它生成每个包及其依赖项大小的可视化报告。你可以使用这些信息删除大型依赖项，拆分或[懒加载](/nextjs-cn/app/guides/lazy-loading)你的代码。

### 安装

通过运行以下命令安装插件：

```bash
npm i @next/bundle-analyzer
# 或
yarn add @next/bundle-analyzer
# 或
pnpm add @next/bundle-analyzer
```

然后，将捆绑分析器的设置添加到你的 `next.config.js` 中。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

### 生成报告

运行以下命令来分析你的包：

```bash
ANALYZE=true npm run build
# 或
ANALYZE=true yarn build
# 或
ANALYZE=true pnpm build
```

报告将在你的浏览器中打开三个新标签，你可以进行检查。定期评估应用程序的包可以帮助你随着时间的推移维持应用程序性能。

## 优化包导入

一些包，如图标库，可能会导出数百个模块，这可能会在开发和生产环境中造成性能问题。

你可以通过在 `next.config.js` 中添加 [`optimizePackageImports`](/nextjs-cn/app/api-reference/config/next-config-js/optimizePackageImports) 选项来优化这些包的导入方式。此选项将只加载你*实际*使用的模块，同时仍然提供编写具有多个命名导出的导入语句的便利。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['icon-library'],
  },
}

module.exports = nextConfig
```

Next.js 还会自动优化一些库，因此它们不需要包含在 optimizePackageImports 列表中。查看[完整列表](/nextjs-cn/app/api-reference/config/next-config-js/optimizePackageImports)。

<PagesOnly>

## 打包特定包

要打包特定包，你可以在 `next.config.js` 中使用 [`transpilePackages`](/nextjs-cn/app/api-reference/config/next-config-js/transpilePackages) 选项。此选项对于打包未预先打包的外部包很有用，例如，在 monorepo 中或从 `node_modules` 导入的包。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['package-name'],
}

module.exports = nextConfig
```

## 打包所有包

要自动打包所有包（App Router 中的默认行为），你可以在 `next.config.js` 中使用 [`bundlePagesRouterDependencies`](/nextjs-cn/pages/api-reference/config/next-config-js/bundlePagesRouterDependencies) 选项。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  bundlePagesRouterDependencies: true,
}

module.exports = nextConfig
```

## 将特定包排除在打包之外

如果你启用了 [`bundlePagesRouterDependencies`](/nextjs-cn/pages/api-reference/config/next-config-js/bundlePagesRouterDependencies) 选项，你可以使用 `next.config.js` 中的 [`serverExternalPackages`](/nextjs-cn/pages/api-reference/config/next-config-js/serverExternalPackages) 选项将特定包排除在自动打包之外：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 在 Pages Router 中自动打包外部包：
  bundlePagesRouterDependencies: true,
  // 将特定包从 App 和 Pages Router 的打包中排除：
  serverExternalPackages: ['package-name'],
}

module.exports = nextConfig
```

</PagesOnly>

<AppOnly>

## 将特定包排除在打包之外

由于在服务器组件和路由处理程序中导入的包会被 Next.js 自动打包，你可以使用 `next.config.js` 中的 [`serverExternalPackages`](/nextjs-cn/app/api-reference/config/next-config-js/serverExternalPackages) 选项将特定包排除在打包之外。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['package-name'],
}

module.exports = nextConfig
```

Next.js 包含了一个当前正在处理兼容性问题并自动排除的流行包列表。查看[完整列表](/nextjs-cn/app/api-reference/config/next-config-js/serverExternalPackages)。

</AppOnly>
