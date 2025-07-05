---
title: Next.js 编译器
description: Next.js 编译器，使用 Rust 编写，用于转换和压缩你的 Next.js 应用程序。
---

Next.js 编译器使用 [SWC](https://swc.rs/) 用 Rust 编写，允许 Next.js 转换和压缩你的 JavaScript 代码以用于生产环境。这替代了单个文件的 Babel 和用于压缩输出包的 Terser。

使用 Next.js 编译器的编译速度比 Babel 快 17 倍，并且自 Next.js 12 版本起默认启用。如果你有现有的 Babel 配置或使用[不支持的功能](#unsupported-features)，你的应用程序将退出 Next.js 编译器并继续使用 Babel。

## 为什么选择 SWC？

[SWC](https://swc.rs/) 是一个基于 Rust 的可扩展平台，用于下一代快速开发者工具。

SWC 可用于编译、压缩、打包等 - 并且设计为可扩展的。它是你可以调用来执行代码转换（内置或自定义）的工具。这些转换的运行通过像 Next.js 这样的高级工具进行。

我们选择在 SWC 上构建有几个原因：

- **可扩展性：** SWC 可以作为 Next.js 内部的 Crate 使用，无需分叉库或绕过设计约束。
- **性能：** 通过切换到 SWC，我们能够在 Next.js 中实现快速刷新速度提高约 3 倍，构建速度提高约 5 倍，并且仍有更多优化空间。
- **WebAssembly：** Rust 对 WASM 的支持对于支持所有可能的平台和将 Next.js 开发带到各处至关重要。
- **社区：** Rust 社区和生态系统非常出色，并且仍在不断发展。

## 支持的功能

### Styled Components

我们正在努力将 `babel-plugin-styled-components` 移植到 Next.js 编译器。

首先，更新到最新版本的 Next.js：`npm install next@latest`。然后，更新你的 `next.config.js` 文件：

```js
module.exports = {
  compiler: {
    styledComponents: true,
  },
}
```

对于高级用例，你可以配置 styled-components 编译的各个属性。

> 注意：在 Next.js 中使用 `styled-components` 的主要要求是 `ssr` 和 `displayName` 转换。

```js
module.exports = {
  compiler: {
    // 有关选项的更多信息，请参阅 https://styled-components.com/docs/tooling#babel-plugin
    styledComponents: {
      // 在开发环境中默认启用，在生产环境中禁用以减少文件大小，
      // 设置此项将覆盖所有环境的默认设置。
      displayName?: boolean,
      // 默认启用。
      ssr?: boolean,
      // 默认启用。
      fileName?: boolean,
      // 默认为空。
      topLevelImportPaths?: string[],
      // 默认为 ["index"]。
      meaninglessFileNames?: string[],
      // 默认启用。
      minify?: boolean,
      // 默认启用。
      transpileTemplateLiterals?: boolean,
      // 默认为空。
      namespace?: string,
      // 默认禁用。
      pure?: boolean,
      // 默认启用。
      cssProp?: boolean,
    },
  },
}
```

### Jest

Next.js 编译器转译你的测试并简化了将 Jest 与 Next.js 一起配置，包括：

- 自动模拟 `.css`、`.module.css`（及其 `.scss` 变体）和图片导入
- 使用 SWC 自动设置 `transform`
- 将 `.env`（及所有变体）加载到 `process.env` 中
- 从测试解析和转换中忽略 `node_modules`
- 从测试解析中忽略 `.next`
- 加载 `next.config.js` 以获取启用实验性 SWC 转换的标志

首先，更新到最新版本的 Next.js：`npm install next@latest`。然后，更新你的 `jest.config.js` 文件：

```js
const nextJest = require('next/jest')

// 提供 Next.js 应用的路径，这将启用加载 next.config.js 和 .env 文件
const createJestConfig = nextJest({ dir: './' })

// 你想传递给 Jest 的任何自定义配置
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

// 以这种方式导出 createJestConfig 是为了确保 next/jest 可以加载 Next.js 配置，这是异步的
module.exports = createJestConfig(customJestConfig)
```

### Relay

要启用 [Relay](https://relay.dev/) 支持：

```js
module.exports = {
  compiler: {
    relay: {
      // 这应该与 relay.config.js 匹配
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
      eagerEsModules: false,
    },
  },
}
```

> **须知**：在 Next.js 中，`pages` 目录中的所有 JavaScript 文件都被视为路由。因此，对于 `relay-compiler`，你需要在 `pages` 外部指定 `artifactDirectory` 配置设置，否则 `relay-compiler` 将在 `__generated__` 目录中的源文件旁边生成文件，而这个文件将被视为路由，这将破坏生产构建。

### 移除 React 属性

允许移除 JSX 属性。这通常用于测试。类似于 `babel-plugin-react-remove-properties`。

要移除匹配默认正则表达式 `^data-test` 的属性：

```js
module.exports = {
  compiler: {
    reactRemoveProperties: true,
  },
}
```

要移除自定义属性：

```js
module.exports = {
  compiler: {
    // 这里定义的正则表达式在 Rust 中处理，所以语法与 JavaScript 的 `RegExp` 不同。
    // 参见 https://docs.rs/regex。
    reactRemoveProperties: { properties: ['^data-custom$'] },
  },
}
```

### 移除控制台

此转换允许移除应用程序代码（不是 `node_modules`）中的所有 `console.*` 调用。类似于 `babel-plugin-transform-remove-console`。

移除所有 `console.*` 调用：

```js
module.exports = {
  compiler: {
    removeConsole: true,
  },
}
```

移除 `console.*` 输出，但保留 `console.error`：

```js
module.exports = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
}
```

### 旧式装饰器

Next.js 将自动检测 `jsconfig.json` 或 `tsconfig.json` 中的 `experimentalDecorators`。旧式装饰器通常与较旧版本的库（如 `mobx`）一起使用。

此标志仅为与现有应用程序兼容而支持。我们不建议在新应用程序中使用旧式装饰器。

首先，更新到最新版本的 Next.js：`npm install next@latest`。然后，更新你的 `jsconfig.json` 或 `tsconfig.json` 文件：

```js
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### importSource

Next.js 将自动检测 `jsconfig.json` 或 `tsconfig.json` 中的 `jsxImportSource` 并应用它。这通常与像 [Theme UI](https://theme-ui.com) 这样的库一起使用。

首先，更新到最新版本的 Next.js：`npm install next@latest`。然后，更新你的 `jsconfig.json` 或 `tsconfig.json` 文件：

```js
{
  "compilerOptions": {
    "jsxImportSource": "theme-ui"
  }
}
```

### Emotion

我们正在努力将 `@emotion/babel-plugin` 移植到 Next.js 编译器。

首先，更新到最新版本的 Next.js：`npm install next@latest`。然后，更新你的 `next.config.js` 文件：

```js

module.exports = {
  compiler: {
    emotion: boolean | {
      // 默认为 true。当构建类型为生产环境时，它将被禁用。
      sourceMap?: boolean,
      // 默认为 'dev-only'。
      autoLabel?: 'never' | 'dev-only' | 'always',
      // 默认为 '[local]'。
      // 允许的值：`[local]` `[filename]` 和 `[dirname]`
      // 此选项仅在 autoLabel 设置为 'dev-only' 或 'always' 时有效。
      // 它允许你定义结果标签的格式。
      // 格式通过字符串定义，其中变量部分用方括号 [] 括起来。
      // 例如 labelFormat: "my-classname--[local]"，其中 [local] 将被替换为结果分配到的变量的名称。
      labelFormat?: string,
      // 默认为 undefined。
      // 此选项允许你告诉编译器它应该查看哪些导入来确定它应该转换什么，
      // 所以如果你重新导出 Emotion 的导出，你仍然可以使用转换。
      importMap?: {
        [packageName: string]: {
          [exportName: string]: {
            canonicalImport?: [string, string],
            styledBaseImport?: [string, string],
          }
        }
      },
    },
  },
}
```

### 压缩

自 v13 起，Next.js 的 swc 编译器默认用于压缩。这比 Terser 快 7 倍。

> **须知**：从 v15 开始，不能再使用 `next.config.js` 自定义压缩。已移除对 `swcMinify` 标志的支持。

### 模块转译

Next.js 可以自动转译和打包来自本地包（如 monorepos）或外部依赖项（`node_modules`）的依赖项。这替代了 `next-transpile-modules` 包。

```js
module.exports = {
  transpilePackages: ['@acme/ui', 'lodash-es'],
}
```

### 模块化导入

此选项已被 Next.js 13.5 中的 [`optimizePackageImports`](/nextjs-cn/app/api-reference/config/next-config-js/optimizePackageImports) 取代。我们建议升级以使用不需要手动配置导入路径的新选项。

### Define（在构建期间替换变量）

`define` 选项允许你在构建时静态替换代码中的变量。该选项接受一个对象作为键值对，其中键是应该被替换的变量，对应的值是替换值。

在 `next.config.js` 中使用 `compiler.define` 字段：

```js
module.exports = {
  compiler: {
    define: {
      MY_STRING_VARIABLE: JSON.stringify('my-string'),
      MY_NUMBER_VARIABLE: '42',
    },
  },
}
```

### 构建生命周期钩子

Next.js 编译器支持生命周期钩子，允许你在构建过程的特定点运行自定义代码。目前，支持以下钩子：

#### runAfterProductionCompile

一个钩子函数，在生产构建编译完成后执行，但在运行后编译任务（如类型检查和静态页面生成）之前执行。此钩子提供对项目元数据的访问，包括项目目录和构建输出目录，使第三方工具能够收集构建输出（如源映射）。

```js
module.exports = {
  compiler: {
    runAfterProductionCompile: async ({ distDir, projectDir }) => {
      // 你的自定义代码
    },
  },
}
```

该钩子接收一个具有以下属性的对象：

- `distDir`：构建输出目录（默认为 `.next`）
- `projectDir`：项目的根目录

## 实验性功能

### SWC 跟踪分析

你可以生成 SWC 的内部转换跟踪，格式为 chromium 的[跟踪事件格式](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview?mode=html#%21=)。

```js
module.exports = {
  experimental: {
    swcTraceProfiling: true,
  },
}
```

一旦启用，swc 将在 `.next/` 下生成名为 `swc-trace-profile-${timestamp}.json` 的跟踪。Chromium 的跟踪查看器（chrome://tracing/、https://ui.perfetto.dev/）或兼容的火焰图查看器（https://www.speedscope.app/）可以加载并可视化生成的跟踪。

### SWC 插件（实验性）

你可以配置 swc 的转换以使用 SWC 的实验性插件支持，这些插件用 wasm 编写，以自定义转换行为。

```js
module.exports = {
  experimental: {
    swcPlugins: [
      [
        'plugin',
        {
          ...pluginOptions,
        },
      ],
    ],
  },
}
```

`swcPlugins` 接受一个元组数组用于配置插件。插件的元组包含插件的路径和一个用于插件配置的对象。插件的路径可以是 npm 模块包名称或 `.wasm` 二进制文件本身的绝对路径。

## 不支持的功能

当你的应用程序有一个 `.babelrc` 文件时，Next.js 将自动回退到使用 Babel 转换单个文件。这确保了与利用自定义 Babel 插件的现有应用程序的向后兼容性。

如果你正在使用自定义 Babel 设置，[请分享你的配置](https://github.com/vercel/next.js/discussions/30174)。我们正在努力移植尽可能多的常用 Babel 转换，并在未来支持插件。

## 版本历史

| 版本      | 变更                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `v13.1.0` | [模块转译](https://nextjs.org/blog/next-1#built-in-module-transpilation-stable) 和 [模块化导入](https://nextjs.org/blog/next-1#import-resolution-for-smaller-bundles) 稳定版。 |
| `v13.0.0` | SWC 压缩器默认启用。                                                                                                                                                           |
| `v12.3.0` | SWC 压缩器[稳定版](https://nextjs.org/blog/next-3#swc-minifier-stable)。                                                                                                       |
| `v12.2.0` | 添加了 [SWC 插件](#swc-plugins-experimental) 实验性支持。                                                                                                                      |
| `v12.1.0` | 添加了对 Styled Components、Jest、Relay、Remove React Properties、Legacy Decorators、Remove Console 和 jsxImportSource 的支持。                                                |
| `v12.0.0` | [引入](https://nextjs.org/blog/next-12) Next.js 编译器。                                                                                                                       |
