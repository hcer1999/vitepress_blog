---
title: 如何设置检测功能
nav_title: 检测
description: 学习如何在 Next.js 应用中使用检测功能在服务器启动时运行代码
related:
  title: 了解更多关于检测功能
  links:
    - app/api-reference/file-conventions/instrumentation
---

{/_ 本文档的内容在 app 和 pages 路由之间共享。你可以使用 `<PagesOnly>Content</PagesOnly>` 组件来添加特定于 Pages 路由的内容。任何共享内容都不应该被包装在组件中。 _/}

检测是使用代码将监控和日志工具集成到应用程序中的过程。这允许你跟踪应用程序的性能和行为，以及在生产环境中调试问题。

## 约定

要设置检测功能，请在项目的**根目录**中创建 `instrumentation.ts|js` 文件（或者如果使用 [`src`](/docs/app/api-reference/file-conventions/src-folder) 文件夹，则放在其中）。

然后，在文件中导出 `register` 函数。当新的 Next.js 服务器实例启动时，这个函数将被调用**一次**。

例如，要将 Next.js 与 [OpenTelemetry](https://opentelemetry.io/) 和 [@vercel/otel](https://vercel.com/docs/observability/otel-overview) 一起使用：

```ts filename="instrumentation.ts" switcher
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
```

```js filename="instrumentation.js" switcher
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
```

查看 [Next.js with OpenTelemetry 示例](https://github.com/vercel/next.js/tree/canary/examples/with-opentelemetry) 获取完整实现。

> **须知**：
>
> - `instrumentation` 文件应该位于项目的根目录，而不是在 `app` 或 `pages` 目录内。如果你使用的是 `src` 文件夹，那么将文件放在 `src` 中，与 `pages` 和 `app` 并列。
> - 如果你使用 [`pageExtensions` 配置选项](/docs/app/api-reference/config/next-config-js/pageExtensions) 添加后缀，你还需要更新 `instrumentation` 文件名以匹配。

## 示例

### 导入具有副作用的文件

有时，因为某个文件会产生的副作用，在代码中导入它可能很有用。例如，你可能导入一个定义了一组全局变量的文件，但在代码中从不显式使用导入的文件。你仍然可以访问该包已声明的全局变量。

我们建议在 `register` 函数中使用 JavaScript 的 `import` 语法导入文件。以下示例演示了在 `register` 函数中使用 `import` 的基本用法：

```ts filename="instrumentation.ts" switcher
export async function register() {
  await import('package-with-side-effect')
}
```

```js filename="instrumentation.js" switcher
export async function register() {
  await import('package-with-side-effect')
}
```

> **须知：**
>
> 我们建议在 `register` 函数内部导入文件，而不是在文件顶部。通过这样做，你可以将所有副作用集中在代码的一个地方，并避免在文件顶部全局导入可能带来的任何意外后果。

### 导入特定运行时的代码

Next.js 在所有环境中调用 `register`，因此有条件地导入不支持特定运行时（例如 [Edge 或 Node.js](/docs/app/api-reference/edge)）的代码非常重要。你可以使用 `NEXT_RUNTIME` 环境变量获取当前环境：

```ts filename="instrumentation.ts" switcher
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./instrumentation-edge')
  }
}
```

```js filename="instrumentation.js" switcher
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./instrumentation-edge')
  }
}
```
