---
title: 自定义 Webpack 配置
nav_title: webpack
description: 了解如何自定义 Next.js 使用的 webpack 配置
---

> **注意**：webpack 配置的更改不在语义化版本的覆盖范围内，所以请自行承担风险

在继续为你的应用添加自定义 webpack 配置之前，请确保 Next.js 尚未支持你的用例：

<AppOnly>

- [CSS 导入](/docs/nextjs-cn/app/getting-started/css)
- [CSS 模块](/docs/nextjs-cn/app/getting-started/css#css-modules)
- [Sass/SCSS 导入](/docs/nextjs-cn/app/guides/styling/sass)
- [Sass/SCSS 模块](/docs/nextjs-cn/app/guides/styling/sass)

</AppOnly>

<PagesOnly>

- [CSS 导入](/docs/nextjs-cn/app/getting-started/css)
- [CSS 模块](/docs/nextjs-cn/app/getting-started/css)
- [Sass/SCSS 导入](/docs/nextjs-cn/pages/guides/styling/sass)
- [Sass/SCSS 模块](/docs/nextjs-cn/pages/guides/styling/sass)
- [自定义 babel 配置](/docs/nextjs-cn/pages/guides/configuring/babel)

</PagesOnly>

一些常见的功能以插件形式提供：

- [@next/mdx](https://github.com/vercel/next.js/tree/canary/packages/next-mdx)
- [@next/bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)

为了扩展我们对 `webpack` 的使用，你可以在 `next.config.js` 中定义一个扩展其配置的函数，如下所示：

```js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // 重要：返回修改后的配置
    return config
  },
}
```

> `webpack` 函数会被执行三次，服务器端两次（nodejs / edge 运行时）和客户端一次。这允许你使用 `isServer` 属性区分客户端和服务器端配置。

`webpack` 函数的第二个参数是一个具有以下属性的对象：

- `buildId`：`String` - 构建 ID，用作构建之间的唯一标识符。
- `dev`：`Boolean` - 表示编译是否将在开发环境中完成。
- `isServer`：`Boolean` - 对于服务器端编译为 `true`，对于客户端编译为 `false`。
- `nextRuntime`：`String | undefined` - 服务器端编译的目标运行时；可以是 `"edge"` 或 `"nodejs"`，对于客户端编译则为 `undefined`。
- `defaultLoaders`：`Object` - Next.js 内部使用的默认加载器：
  - `babel`：`Object` - 默认的 `babel-loader` 配置。

`defaultLoaders.babel` 的使用示例：

```js
// 添加依赖于 babel-loader 的加载器的配置示例
// 此源代码取自 @next/mdx 插件源：
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    })

    return config
  },
}
```

#### `nextRuntime`

请注意，当 `nextRuntime` 为 `"edge"` 或 `"nodejs"` 时，`isServer` 为 `true`，当前 `nextRuntime` `"edge"` 仅用于中间件和 Edge 运行时中的服务器组件。
