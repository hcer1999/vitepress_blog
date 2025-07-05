---
title: output
description: Next.js 自动跟踪每个页面所需的文件，以便轻松部署应用程序。在此了解其工作原理。
---

在构建过程中，Next.js 会自动跟踪每个页面及其依赖项，以确定部署应用程序生产版本所需的所有文件。

此功能有助于大幅减小部署规模。以前，使用 Docker 部署时，你需要安装包的 `dependencies` 中的所有文件才能运行 `next start`。从 Next.js 12 开始，你可以利用 `.next/` 目录中的输出文件跟踪功能，只包含必要的文件。

此外，这消除了对已弃用的 `serverless` 目标的需求，该目标可能导致各种问题，并且还会造成不必要的重复。

## 工作原理

在 `next build` 期间，Next.js 将使用 [`@vercel/nft`](https://github.com/vercel/nft) 静态分析 `import`、`require` 和 `fs` 的使用情况，以确定页面可能加载的所有文件。

Next.js 的生产服务器也会被跟踪其所需的文件，并输出到 `.next/next-server.js.nft.json`，可以在生产环境中利用。

要利用输出到 `.next` 目录的 `.nft.json` 文件，你可以读取每个跟踪中相对于 `.nft.json` 文件的文件列表，然后将它们复制到你的部署位置。

## 自动复制跟踪文件

Next.js 可以自动创建一个 `standalone` 文件夹，仅复制生产部署所需的必要文件，包括 `node_modules` 中的特定文件。

要利用这种自动复制功能，你可以在 `next.config.js` 中启用它：

```js
module.exports = {
  output: 'standalone',
}
```

这将在 `.next/standalone` 创建一个文件夹，然后可以单独部署，而无需安装 `node_modules`。

此外，还会输出一个最小的 `server.js` 文件，可以用来代替 `next start`。默认情况下，这个最小服务器不会复制 `public` 或 `.next/static` 文件夹，因为这些文件夹理想情况下应该由 CDN 处理，尽管这些文件夹可以手动复制到 `standalone/public` 和 `standalone/.next/static` 文件夹中，之后 `server.js` 文件将自动提供这些文件。

要手动复制这些文件，你可以在 `next build` 之后使用 `cp` 命令行工具：

```bash
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
```

要在本地启动最小的 `server.js` 文件，请运行以下命令：

```bash
node .next/standalone/server.js
```

<AppOnly>

> **须知**：
>
> - 如果你的项目需要监听特定的端口或主机名，你可以在运行 `server.js` 之前定义 `PORT` 或 `HOSTNAME` 环境变量。例如，运行 `PORT=8080 HOSTNAME=0.0.0.0 node server.js` 以在 `http://0.0.0.0:8080` 上启动服务器。

</AppOnly>

<PagesOnly>

> **须知**：
>
> - `next.config.js` 在 `next build` 期间被读取并序列化到 `server.js` 输出文件中。如果使用了旧版的 [`serverRuntimeConfig` 或 `publicRuntimeConfig` 选项](/docs/nextjs-cn/pages/api-reference/config/next-config-js/runtime-configuration)，则这些值将特定于构建时的值。
> - 如果你的项目需要监听特定的端口或主机名，你可以在运行 `server.js` 之前定义 `PORT` 或 `HOSTNAME` 环境变量。例如，运行 `PORT=8080 HOSTNAME=0.0.0.0 node server.js` 以在 `http://0.0.0.0:8080` 上启动服务器。

</PagesOnly>

## 注意事项

- 在 monorepo 设置中进行跟踪时，默认使用项目目录进行跟踪。对于 `next build packages/web-app`，`packages/web-app` 将是跟踪根目录，该文件夹外的任何文件都不会被包含。要包含此文件夹外的文件，你可以在 `next.config.js` 中设置 `outputFileTracingRoot`。

```js
module.exports = {
  // 这包括上两层目录的 monorepo 基础文件
  outputFileTracingRoot: path.join(__dirname, '../../'),
}
```

- 在某些情况下，Next.js 可能无法包含所需的文件，或者可能错误地包含未使用的文件。在这些情况下，你可以分别在 `next.config.js` 中利用 `outputFileTracingExcludes` 和 `outputFileTracingIncludes`。每个配置接受一个对象，对象的键是 [minimatch globs](https://www.npmjs.com/package/minimatch)，用于匹配特定页面，值是一个数组，包含相对于项目根目录的 glob，用于在跟踪中包含或排除。

```js
module.exports = {
  outputFileTracingExcludes: {
    '/api/hello': ['./un-necessary-folder/**/*'],
  },
  outputFileTracingIncludes: {
    '/api/another': ['./necessary-folder/**/*'],
    '/api/login/\\[\\[\\.\\.\\.slug\\]\\]': ['./node_modules/aws-crt/dist/bin/**/*'],
  },
}
```

**注意：** `outputFileTracingIncludes`/`outputFileTracingExcludes` 的键是一个 [glob](https://www.npmjs.com/package/picomatch#basic-globbing)，所以特殊字符需要被转义。

## 实验性 `turbotrace`

跟踪依赖项可能很慢，因为它需要非常复杂的计算和分析。我们用 Rust 创建了 `turbotrace`，作为 JavaScript 实现的更快、更智能的替代方案。

要启用它，你可以在 `next.config.js` 中添加以下配置：

```js
module.exports = {
  experimental: {
    turbotrace: {
      // 控制 turbotrace 的日志级别，默认为 `error`
      logLevel?:
      | 'bug'
      | 'fatal'
      | 'error'
      | 'warning'
      | 'hint'
      | 'note'
      | 'suggestions'
      | 'info',
      // 控制 turbotrace 的日志是否应包含分析的详细信息，默认为 `false`
      logDetail?: boolean
      // 显示所有日志消息，不限制
      // turbotrace 默认情况下每个类别只显示 1 条日志消息
      logAll?: boolean
      // 控制 turbotrace 的上下文目录
      // 上下文目录外的文件不会被跟踪
      // 设置 `outputFileTracingRoot` 具有相同效果
      // 如果同时设置了 `outputFileTracingRoot` 和此选项，将使用 `experimental.turbotrace.contextDirectory`
      contextDirectory?: string
      // 如果代码中有 `process.cwd()` 表达式，可以设置此选项告诉 `turbotrace` 在跟踪时 `process.cwd()` 的值。
      // 例如，require(process.cwd() + '/package.json') 将被跟踪为 require('/path/to/cwd/package.json')
      processCwd?: string
      // 控制 `turbotrace` 的最大内存使用量，单位为 `MB`，默认为 `6000`。
      memoryLimit?: number
    },
  },
}
```
