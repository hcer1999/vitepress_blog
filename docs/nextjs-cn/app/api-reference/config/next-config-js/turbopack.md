---
title: turbopack
description: 使用 Turbopack 特定选项配置 Next.js
---

`turbopack` 选项允许你自定义 [Turbopack](/nextjs-cn/app/api-reference/turbopack) 来转换不同的文件并更改模块的解析方式。

```ts switcher/nextjs-cn/
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    // ...
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // ...
  },
}

module.exports = nextConfig
```

> **须知**:
>
> - Next.js 的 Turbopack 不需要为内置功能配置加载器或加载器配置。Turbopack 内置支持 CSS 和编译现代 JavaScript，所以如果你使用 `@babel/preset-env`，就不需要 `css-loader`、`postcss-loader` 或 `babel-loader`。

## 参考

### 选项

`turbo` 配置有以下可用选项：

| 选项                | 描述                                                     |
| ------------------- | -------------------------------------------------------- |
| `root`              | 设置应用程序根目录。应该是绝对路径。                     |
| `rules`             | 使用 Turbopack 运行时要应用的支持的 webpack 加载器列表。 |
| `resolveAlias`      | 将别名导入映射到要加载的模块。                           |
| `resolveExtensions` | 导入文件时要解析的扩展名列表。                           |

### 支持的加载器

以下加载器已经过测试，可以与 Turbopack 的 webpack 加载器实现一起工作：

- [`babel-loader`](https://www.npmjs.com/package/babel-loader)
- [`@svgr/webpack`](https://www.npmjs.com/package/@svgr/webpack)
- [`svg-inline-loader`](https://www.npmjs.com/package/svg-inline-loader)
- [`yaml-loader`](https://www.npmjs.com/package/yaml-loader)
- [`string-replace-loader`](https://www.npmjs.com/package/string-replace-loader)
- [`raw-loader`](https://www.npmjs.com/package/raw-loader)
- [`sass-loader`](https://www.npmjs.com/package/sass-loader)

## 示例

### 根目录

Turbopack 使用根目录解析模块。项目根目录之外的文件不会被解析。

Next.js 会自动检测项目的根目录。它通过寻找以下文件之一来实现：

- `pnpm-lock.yaml`
- `package-lock.json`
- `yarn.lock`
- `bun.lock`
- `bun.lockb`

如果你有不同的项目结构，例如，如果你不使用工作区，你可以手动设置 `root` 选项：

```js
const path = require('path')
module.exports = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
}
```

### 配置 webpack 加载器

如果你需要超出内置支持的加载器，许多 webpack 加载器已经可以与 Turbopack 一起工作。目前有一些限制：

- 只实现了 webpack 加载器 API 的核心子集。目前，有足够的覆盖范围支持一些流行的加载器，我们将在未来扩展我们的 API 支持。
- 只支持返回 JavaScript 代码的加载器。目前不支持转换样式表或图像等文件的加载器。
- 传递给 webpack 加载器的选项必须是简单的 JavaScript 原始类型、对象和数组。例如，不可能将 `require()` 插件模块作为选项值传递。

要配置加载器，在 `next.config.js` 中添加你已安装的加载器的名称和任何选项，将文件扩展名映射到加载器列表。

下面是一个使用 [`@svgr/webpack`](https://www.npmjs.com/package/@svgr/webpack) 加载器的示例，它允许导入 `.svg` 文件并将它们渲染为 React 组件。

```js
module.exports = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}
```

> **须知**：在 Next.js 13.4.4 版本之前，`turbo.rules` 被命名为 `turbo.loaders`，并且只接受像 `.mdx` 这样的文件扩展名，而不是 `*.mdx`。

### 解析别名

Turbopack 可以配置通过别名修改模块解析，类似于 webpack 的 [`resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias) 配置。

要配置解析别名，在 `next.config.js` 中将导入的模式映射到它们的新目标：

```js
module.exports = {
  turbopack: {
    resolveAlias: {
      underscore: 'lodash',
      mocha: { browser: 'mocha/browser-entry.js' },
    },
  },
}
```

这将 `underscore` 包的导入别名为 `lodash` 包。换句话说，`import underscore from 'underscore'` 将加载 `lodash` 模块而不是 `underscore`。

Turbopack 还支持通过此字段进行条件别名，类似于 Node.js 的[条件导出](https://nodejs.org/docs/latest-v18.x/api/packages.html#conditional-exports)。目前只支持 `browser` 条件。在上述情况下，当 Turbopack 针对浏览器环境时，`mocha` 模块的导入将被别名为 `mocha/browser-entry.js`。

### 解析自定义扩展名

Turbopack 可以配置为解析具有自定义扩展名的模块，类似于 webpack 的 [`resolve.extensions`](https://webpack.js.org/configuration/resolve/#resolveextensions) 配置。

要配置解析扩展名，在 `next.config.js` 中使用 `resolveExtensions` 字段：

```js
module.exports = {
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
}
```

这将用提供的列表覆盖原始解析扩展名。确保包含默认扩展名。

有关如何将你的应用从 webpack 迁移到 Turbopack 的更多信息和指导，请参阅 [Turbopack 关于 webpack 兼容性的文档](https://turbo.build/pack/docs/migrating-from-webpack)。

## 版本历史

| 版本     | 变更                                      |
| -------- | ----------------------------------------- |
| `15.3.0` | `experimental.turbo` 更改为 `turbopack`。 |
| `13.0.0` | 引入 `experimental.turbo`。               |
