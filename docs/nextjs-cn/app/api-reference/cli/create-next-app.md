---
title: create-next-app
description: 使用 create-next-app CLI 一键创建 Next.js 应用程序。
---

# NextJS中文文档 - Create Next App

`create-next-app` CLI 允许您使用默认模板或来自公共 GitHub 仓库的[示例](https://github.com/vercel/next.js/tree/canary/examples)创建新的 Next.js 应用程序。这是开始使用 Next.js 的最简单方式。

基本用法：

```bash
npx create-next-app@latest [project-name] [options]
```

## 参考

以下选项可用：

| 选项                                    | 描述                                  |
| --------------------------------------- | ------------------------------------- |
| `-h` 或 `--help`                        | 显示所有可用选项                      |
| `-v` 或 `--version`                     | 输出版本号                            |
| `--no-*`                                | 否定默认选项。例如 `--no-eslint`      |
| `--ts` 或 `--typescript`                | 初始化为 TypeScript 项目（默认）      |
| `--js` 或 `--javascript`                | 初始化为 JavaScript 项目              |
| `--tailwind`                            | 初始化 Tailwind CSS 配置（默认）      |
| `--eslint`                              | 初始化 ESLint 配置                    |
| `--app`                                 | 初始化为 App Router 项目              |
| `--api`                                 | 初始化一个仅包含路由处理程序的项目    |
| `--src-dir`                             | 在 `src/` 目录内初始化                |
| `--turbopack`                           | 默认启用 Turbopack 进行开发           |
| `--import-alias <alias-to-configure>`   | 指定要使用的导入别名（默认 "@/\*"）   |
| `--empty`                               | 初始化一个空项目                      |
| `--use-npm`                             | 明确告诉 CLI 使用 npm 引导应用程序    |
| `--use-pnpm`                            | 明确告诉 CLI 使用 pnpm 引导应用程序   |
| `--use-yarn`                            | 明确告诉 CLI 使用 Yarn 引导应用程序   |
| `--use-bun`                             | 明确告诉 CLI 使用 Bun 引导应用程序    |
| `-e` 或 `--example [name] [github-url]` | 用于引导应用程序的示例                |
| `--example-path <path-to-example>`      | 单独指定示例的路径                    |
| `--reset-preferences`                   | 明确告诉 CLI 重置任何已存储的偏好设置 |
| `--skip-install`                        | 明确告诉 CLI 跳过安装包               |
| `--yes`                                 | 对所有选项使用之前的偏好设置或默认值  |

## 示例

### 使用默认模板

要使用默认模板创建新应用程序，请在终端中运行以下命令：

```bash
npx create-next-app@latest
```

然后您将被问及以下提示：

```txt
What is your project named?  my-app
Would you like to use TypeScript?  No / Yes
Would you like to use ESLint?  No / Yes
Would you like to use Tailwind CSS?  No / Yes
Would you like your code inside a `src/` directory?  No / Yes
Would you like to use App Router? (recommended)  No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)?  No / Yes
```

一旦您回答了这些提示，将会使用您选择的配置创建一个新项目。

### 使用官方 Next.js 示例

要使用官方 Next.js 示例创建新应用程序，请使用 `--example` 标志。例如：

```bash
npx create-next-app@latest --example [example-name] [your-project-name]
```

您可以在 [Next.js 仓库](https://github.com/vercel/next.js/tree/canary/examples)中查看所有可用示例的列表以及设置说明。

### 使用任何公共 GitHub 示例

要使用任何公共 GitHub 示例创建新应用程序，请使用带有 GitHub 仓库 URL 的 `--example` 选项。例如：

```bash
npx create-next-app@latest --example "https://github.com/.../" [your-project-name]
```
