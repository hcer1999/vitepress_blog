---
title: next CLI
description: 了解如何使用 Next.js CLI 运行和构建应用程序。
---

Next.js CLI 允许您开发、构建、启动应用程序等。

基本用法：

```bash
npx next [command] [options]
```

## 参考

以下选项可用：

| 选项                | 描述                |
| ------------------- | ------------------- |
| `-h` 或 `--help`    | 显示所有可用选项    |
| `-v` 或 `--version` | 输出 Next.js 版本号 |

### 命令

以下命令可用：

| 命令                                   | 描述                                                                                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`dev`](#next-dev-options)             | 以开发模式启动 Next.js，包含热模块替换、错误报告等功能。                                                                                                  |
| [`build`](#next-build-options)         | 创建应用程序的优化生产构建。显示有关每个路由的信息。                                                                                                      |
| [`start`](#next-start-options)         | 以生产模式启动 Next.js。应用程序应先使用 `next build` 进行编译。                                                                                          |
| [`info`](#next-info-options)           | 打印当前系统的相关详细信息，可用于报告 Next.js 错误。                                                                                                     |
| [`lint`](#next-lint-options)           | 为 `/src`、`/app`、`/pages`、`/components` 和 `/lib` 目录中的所有文件运行 ESLint。如果应用程序中尚未配置 ESLint，它还提供引导式安装任何所需依赖项的设置。 |
| [`telemetry`](#next-telemetry-options) | 允许您启用或禁用 Next.js 完全匿名的遥测收集。                                                                                                             |

> **小提示**：不带命令运行 `next` 相当于运行 `next dev`。

### `next dev` 选项

`next dev` 以开发模式启动应用程序，包含热模块替换 (HMR)、错误报告等功能。运行 `next dev` 时可使用以下选项：

| 选项                                     | 描述                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| `-h, --help`                             | 显示所有可用选项。                                                                |
| `[directory]`                            | 构建应用程序的目录。如果未提供，则使用当前目录。                                  |
| `--turbopack`                            | 使用 [Turbopack](/docs/nextjs-cn/app/api-reference/turbopack) 启动开发模式。      |
| `-p` 或 `--port <port>`                  | 指定启动应用程序的端口号。默认值：3000，环境变量：PORT                            |
| `-H` 或 `--hostname <hostname>`          | 指定启动应用程序的主机名。用于使应用程序在网络上的其他设备上可用。默认值：0.0.0.0 |
| `--experimental-https`                   | 使用 HTTPS 启动服务器并生成自签名证书。                                           |
| `--experimental-https-key <path>`        | HTTPS 密钥文件的路径。                                                            |
| `--experimental-https-cert <path>`       | HTTPS 证书文件的路径。                                                            |
| `--experimental-https-ca <path>`         | HTTPS 证书颁发机构文件的路径。                                                    |
| `--experimental-upload-trace <traceUrl>` | 将调试跟踪的子集报告到远程 HTTP URL。                                             |

### `next build` 选项

`next build` 创建应用程序的优化生产构建。输出显示有关每个路由的信息。例如：

```bash
Route (app)                              Size     First Load JS
┌ ○ /_not-found                          0 B               0 kB
└ ƒ /products/[id]                       0 B               0 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

- **Size**：客户端导航到页面时下载的资产大小。每个路由的大小仅包括其依赖项。
- **First Load JS**：从服务器访问页面时下载的资产大小。所有共享的 JS 大小显示为单独的指标。

这两个值都是使用 [**gzip 压缩**](/docs/nextjs-cn/app/api-reference/config/next-config-js/compress)。首次加载用绿色、黄色或红色表示。高性能应用应该以绿色为目标。

`next build` 命令可用的选项如下：

| 选项                               | 描述                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `-h, --help`                       | 显示所有可用选项。                                                                                |
| `[directory]`                      | 构建应用程序的目录。如果未提供，则使用当前目录。                                                  |
| `-d` 或 `--debug`                  | 启用更详细的构建输出。启用此标志后，将显示额外的构建输出，如重写、重定向和标头。                  |
|                                    |
| `--profile`                        | 启用 React 的生产[分析](https://react.dev/reference/react/Profiler)。                             |
| `--no-lint`                        | 禁用代码检查。                                                                                    |
| `--no-mangling`                    | 禁用[名称混淆](https://en.wikipedia.org/wiki/Name_mangling)。这可能会影响性能，应仅用于调试目的。 |
| `--experimental-app-only`          | 仅构建 App Router 路由。                                                                          |
| `--experimental-build-mode [mode]` | 使用实验性构建模式。(选项："compile"、"generate"，默认："default")                                |

### `next start` 选项

`next start` 以生产模式启动应用程序。应用程序应先使用 [`next build`](#next-build-options) 进行编译。

`next start` 命令可用的选项如下：

| 选项                                    | 描述                                                     |
| --------------------------------------- | -------------------------------------------------------- |
| `-h` 或 `--help`                        | 显示所有可用选项。                                       |
| `[directory]`                           | 启动应用程序的目录。如果未提供目录，则使用当前目录。     |
| `-p` 或 `--port <port>`                 | 指定启动应用程序的端口号。(默认值：3000，环境变量：PORT) |
| `-H` 或 `--hostname <hostname>`         | 指定启动应用程序的主机名 (默认值：0.0.0.0)。             |
| `--keepAliveTimeout <keepAliveTimeout>` | 指定关闭非活动连接前等待的最大毫秒数。                   |

### `next info` 选项

`next info` 打印当前系统的相关详细信息，可用于在创建 [GitHub issue](https://github.com/vercel/next.js/issues) 时报告 Next.js 错误。此信息包括操作系统平台/架构/版本、二进制文件（Node.js、npm、Yarn、pnpm）、包版本（`next`、`react`、`react-dom`）等。

输出应如下所示：

```bash
Operating System:
  Platform: darwin
  Arch: arm64
  Version: Darwin Kernel Version 23.6.0
  Available memory (MB): 65536
  Available CPU cores: 10
Binaries:
  Node: 20.12.0
  npm: 10.5.0
  Yarn: 1.22.19
  pnpm: 9.6.0
Relevant Packages:
  next: 15.0.canary.115 // Latest available version is detected (15.0.canary.115).
  eslint-config-next: 14.2.5
  react: 19.0.rc
  react-dom: 19.0.0
  typescript: 5.5.4
Next.js Config:
  output: N/A
```

`next info` 命令可用的选项如下：

| 选项             | 描述                 |
| ---------------- | -------------------- |
| `-h` 或 `--help` | 显示所有可用选项     |
| `--verbose`      | 收集额外的调试信息。 |

### `next lint` 选项

`next lint` 为 `pages/`、`app/`、`components/`、`lib/` 和 `src/` 目录中的所有文件运行 ESLint。如果应用程序中尚未配置 ESLint，它还提供引导式安装任何所需依赖项的设置。

`next lint` 命令可用的选项如下：

| 选项                                                  | 描述                                                                                                 |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `[directory]`                                         | 对应用程序进行代码检查的基本目录。如果未提供，则使用当前目录。                                       |
| `-d, --dir, <dirs...>`                                | 包含要运行 ESLint 的目录。                                                                           |
| `--file, <files...>`                                  | 包含要运行 ESLint 的文件。                                                                           |
| `--ext, [exts...]`                                    | 指定 JavaScript 文件扩展名。(默认值：[".js", ".mjs", ".cjs", ".jsx", ".ts", ".mts", ".cts", ".tsx"]) |
| `-c, --config, <config>`                              | 使用此配置文件，覆盖所有其他配置选项。                                                               |
| `--resolve-plugins-relative-to, <rprt>`               | 指定应从中解析插件的目录。                                                                           |
| `--strict`                                            | 使用 Next.js 严格配置创建 `.eslintrc.json` 文件。                                                    |
| `--rulesdir, <rulesdir...>`                           | 使用此目录（或多个目录）中的其他规则。                                                               |
| `--fix`                                               | 自动修复代码检查问题。                                                                               |
| `--fix-type <fixType>`                                | 指定要应用的修复类型（例如 problem、suggestion、layout）。                                           |
| `--ignore-path <path>`                                | 指定要忽略的文件。                                                                                   |
| `--no-ignore <path>`                                  | 禁用 `--ignore-path` 选项。                                                                          |
| `--quiet`                                             | 仅报告错误。                                                                                         |
| `--max-warnings [maxWarnings]`                        | 指定触发非零退出代码前的警告数。(默认值：-1)                                                         |
| `-o, --output-file, <outputFile>`                     | 指定写入报告的文件。                                                                                 |
| `-f, --format, <format>`                              | 使用特定的输出格式。                                                                                 |
| `--no-inline-config`                                  | 防止注释更改配置或规则。                                                                             |
| `--report-unused-disable-directives-severity <level>` | 指定未使用的 eslint-disable 指令的严重级别。(选项："error"、"off"、"warn")                           |
| `--no-cache`                                          | 禁用缓存。                                                                                           |
| `--cache-location, <cacheLocation>`                   | 指定缓存的位置。                                                                                     |
| `--cache-strategy, [cacheStrategy]`                   | 指定用于检测缓存中已更改文件的策略。(默认值："metadata")                                             |
| `--error-on-unmatched-pattern`                        | 当任何文件模式不匹配时报告错误。                                                                     |
| `-h, --help`                                          | 显示此消息。                                                                                         |

### `next telemetry` 选项

Next.js 收集**完全匿名**的遥测数据，用于一般使用情况。参与此匿名计划是可选的，如果您不希望共享信息，可以选择退出。

`next telemetry` 命令可用的选项如下：

| 选项         | 描述                      |
| ------------ | ------------------------- |
| `-h, --help` | 显示所有可用选项。        |
| `--enable`   | 启用 Next.js 的遥测收集。 |
| `--disable`  | 禁用 Next.js 的遥测收集。 |

了解更多关于[遥测](/docs/nextjs-cn/architecture/docs/nextjs-cn/architecture/docs/nextjs-cn/architecture/telemetry)的信息。

## 示例

### 更改默认端口

默认情况下，Next.js 在开发过程中和使用 `next start` 时使用 `http://localhost:3000`。可以使用 `-p` 选项更改默认端口，如下所示：

```bash
next dev -p 4000
```

或使用 `PORT` 环境变量：

```bash
PORT=4000 next dev
```

> **小提示**：`PORT` 不能在 `.env` 中设置，因为 HTTP 服务器的启动发生在任何其他代码初始化之前。

### 在开发过程中使用 HTTPS

对于某些使用场景，如 webhook 或身份验证，您可以使用 [HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS) 在 `localhost` 上创建安全环境。Next.js 可以使用 `--experimental-https` 标志通过 `next dev` 生成自签名证书：

```bash
next dev --experimental-https
```

使用生成的证书，Next.js 开发服务器将位于 `https://localhost:3000`。除非使用 `-p`、`--port` 或 `PORT` 指定端口，否则使用默认端口 `3000`。

您还可以使用 `--experimental-https-key` 和 `--experimental-https-cert` 提供自定义证书和密钥。还可以选择使用 `--experimental-https-ca` 提供自定义 CA 证书。

```bash
next dev --experimental-https --experimental-https-key ./certificates/localhost-key.pem --experimental-https-cert ./certificates/localhost.pem
```

`next dev --experimental-https` 仅用于开发，并使用 [`mkcert`](https://github.com/FiloSottile/mkcert) 创建本地受信任的证书。在生产环境中，请使用来自受信任机构的正式颁发的证书。

### 为下游代理配置超时

当在下游代理（例如 AWS ELB/ALB 之类的负载均衡器）后部署 Next.js 时，重要的是要为 Next.js 的底层 HTTP 服务器配置比下游代理超时时间更长的 [keep-alive 超时](https://nodejs.org/api/http.html#http_server_keepalivetimeout)。否则，一旦给定 TCP 连接的 keep-alive 超时时间到达，Node.js 将立即终止该连接，而不会通知下游代理。这会导致代理在尝试重用 Node.js 已经终止的连接时出现错误。

要为生产 Next.js 服务器配置超时值，请在 `next start` 中传递 `--keepAliveTimeout`（以毫秒为单位），如下所示：

```bash
next start --keepAliveTimeout 70000
```

### 传递 Node.js 参数

您可以向 `next` 命令传递任何 [node 参数](https://nodejs.org/api/cli.html#cli_node_options_options)。例如：

```bash
NODE_OPTIONS='--throw-deprecation' next
NODE_OPTIONS='-r esm' next
NODE_OPTIONS='--inspect' next
```
