---
title: 如何使用调试工具调试 Next.js
nav_title: 调试
description: 学习如何使用 VS Code、Chrome DevTools 或 Firefox DevTools 调试你的 Next.js 应用程序。
---

# NextJS中文文档 - Debugging

本文档介绍如何使用 [VS Code 调试器](https://code.visualstudio.com/docs/editor/debugging)、[Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) 或 [Firefox DevTools](https://firefox-source-docs.mozilla.org/devtools-user/) 来调试你的 Next.js 前端和后端代码，并提供完整的源映射支持。

任何能够连接到 Node.js 的调试器也可以用于调试 Next.js 应用程序。你可以在 Node.js 的[调试指南](https://nodejs.org/en/docs/guides/debugging-getting-started/)中找到更多详细信息。

## 使用 VS Code 进行调试

在项目根目录创建一个名为 `.vscode/launch.json` 的文件，内容如下：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug client-side (Firefox)",
      "type": "firefox",
      "request": "launch",
      "url": "http://localhost:3000",
      "reAttach": true,
      "pathMappings": [
        {
          "url": "webpack://_N_E",
          "path": "${workspaceFolder}"
        }
      ]
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "runtimeArgs": ["--inspect"],
      "skipFiles": ["<node_internals>/**"],
      "serverReadyAction": {
        "action": "debugWithEdge",
        "killOnServerStop": true,
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
```

> **注意**：要在 VS Code 中使用 Firefox 调试，你需要安装 [Firefox Debugger 扩展](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)。

如果你使用的是 Yarn，可以将 `npm run dev` 替换为 `yarn dev`；如果使用的是 pnpm，则替换为 `pnpm dev`。

在 "Next.js: debug full stack" 配置中，`serverReadyAction.action` 指定了服务器就绪时要打开的浏览器。`debugWithEdge` 表示启动 Edge 浏览器。如果你使用的是 Chrome，请将此值更改为 `debugWithChrome`。

如果你[更改了应用程序启动的端口号](/nextjs-cn/pages/api-reference/cli/next#next-dev-options)，请将 `http://localhost:3000` 中的 `3000` 替换为你使用的端口。

如果你从非根目录运行 Next.js（/nextjs-cn/po），则需要将 `cwd` 添加到服务器端和全栈调试任务中。例如，`"cwd": "${workspaceFolder}/apps/web"`。

现在转到调试面板（Windows/Linux 上为 `Ctrl+Shift+D`，macOS 上为 `⇧+⌘+D`），选择启动配置，然后按 `F5` 或从命令面板中选择 **Debug: Start Debugging** 来开始调试会话。

## 在 Jetbrains WebStorm 中使用调试器

点击列出运行时配置的下拉菜单，然后点击 `Edit Configurations...`。创建一个 URL 为 `http://localhost:3000` 的 `JavaScript Debug` 调试配置。根据你的喜好进行自定义（例如，用于调试的浏览器，存储为项目文件），然后点击 `OK`。运行此调试配置，选定的浏览器应该会自动打开。此时，你应该有 2 个处于调试模式的应用程序：NextJS 节点应用程序和客户端/浏览器应用程序。

## 使用浏览器 DevTools 进行调试

### 客户端代码

像往常一样通过运行 `next dev`、`npm run dev` 或 `yarn dev` 启动你的开发服务器。服务器启动后，在你首选的浏览器中打开 `http://localhost:3000`（或你的替代 URL）。

对于 Chrome：

- 打开 Chrome 的开发者工具（Windows/Linux 上为 `Ctrl+Shift+J`，macOS 上为 `⌥+⌘+I`）
- 转到 **Sources** 标签

对于 Firefox：

- 打开 Firefox 的开发者工具（Windows/Linux 上为 `Ctrl+Shift+I`，macOS 上为 `⌥+⌘+I`）
- 转到 **Debugger** 标签

在任一浏览器中，每当你的客户端代码遇到 [`debugger`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/debugger) 语句时，代码执行将暂停，并且该文件将出现在调试区域中。你还可以搜索文件以手动设置断点：

- 在 Chrome 中：Windows/Linux 上按 `Ctrl+P`，macOS 上按 `⌘+P`
- 在 Firefox 中：Windows/Linux 上按 `Ctrl+P`，macOS 上按 `⌘+P`，或使用左侧面板中的文件树

请注意，在搜索时，你的源文件路径将以 `webpack://_N_E/./` 开头。

### 服务器端代码

要使用浏览器 DevTools 调试服务器端 Next.js 代码，你需要向底层 Node.js 进程传递 [`--inspect`](https://nodejs.org/api/cli.html#cli_inspect_host_port) 标志：

```bash
NODE_OPTIONS='--inspect' next dev
```

> **需要了解**：使用 `NODE_OPTIONS='--inspect=0.0.0.0'` 允许在 localhost 之外进行远程调试访问，例如在 Docker 容器中运行应用程序时。

如果你使用的是 `npm run dev` 或 `yarn dev`，那么你应该更新 `package.json` 中的 `dev` 脚本：

```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--inspect' next dev"
  }
}
```

使用 `--inspect` 标志启动 Next.js 开发服务器将看起来像这样：

```bash
Debugger listening on ws://127.0.0.1:9229/0cf350d-acd60f4e47c95
For help, see: https://nodejs.org/en/docs/inspector
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

对于 Chrome：

1. 打开一个新标签页并访问 `chrome://inspect`
2. 点击 **Configure...** 确保列出了两个调试端口
3. 如果尚未存在，添加 `localhost:9229` 和 `localhost:9230`
4. 在 **Remote Target** 部分中查找你的 Next.js 应用程序
5. 点击 **inspect** 打开单独的 DevTools 窗口
6. 转到 **Sources** 标签

对于 Firefox：

1. 打开一个新标签页并访问 `about:debugging`
2. 点击左侧边栏中的 **This Firefox**
3. 在 **Remote Targets** 下找到你的 Next.js 应用程序
4. 点击 **Inspect** 打开调试器
5. 转到 **Debugger** 标签

调试服务器端代码的工作方式与客户端调试类似。当搜索文件时（`Ctrl+P`/`⌘+P`），你的源文件路径将以 `webpack://{application-name}/./` 开头（其中 `{application-name}` 将根据你的 `package.json` 文件替换为你的应用程序名称）。

### 使用浏览器 DevTools 检查服务器错误

当你遇到错误时，检查源代码可以帮助追踪错误的根本原因。

Next.js 将在错误覆盖层上的 Next.js 版本指示器下方显示一个 Node.js 图标。通过点击该图标，DevTools URL 会复制到你的剪贴板。你可以用该 URL 打开一个新的浏览器标签页来检查 Next.js 服务器进程。

### 在 Windows 上调试

Windows 用户在使用 `NODE_OPTIONS='--inspect'` 时可能会遇到问题，因为 Windows 平台不支持该语法。要解决这个问题，请安装 [`cross-env`](https://www.npmjs.com/package/cross-env) 包作为开发依赖（使用 `npm` 和 `yarn` 时带 `-D`），并将 `dev` 脚本替换为以下内容。

```json
{
  "scripts": {
    "dev": "cross-env NODE_OPTIONS='--inspect' next dev"
  }
}
```

无论你使用的是哪个平台（包括 Mac、Linux 和 Windows），`cross-env` 都会设置 `NODE_OPTIONS` 环境变量，让你可以在不同设备和操作系统上一致地进行调试。

> **需要了解**：确保在你的机器上禁用 Windows Defender。这个外部服务会检查*每个读取的文件*，据报道会大大增加使用 `next dev` 时的 Fast Refresh 时间。这是一个已知问题，与 Next.js 无关，但它确实影响 Next.js 开发。

## 更多信息

要了解更多关于如何使用 JavaScript 调试器的信息，请查看以下文档：

- [VS Code 中的 Node.js 调试：断点](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_breakpoints)
- [Chrome DevTools：调试 JavaScript](https://developers.google.com/web/tools/chrome-devtools/javascript)
- [Firefox DevTools：调试器](https://firefox-source-docs.mozilla.org/devtools-user/debugger/)
