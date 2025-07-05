---
title: 如何使用 OpenTelemetry 设置检测
nav_title: OpenTelemetry
description: 学习如何使用 OpenTelemetry 对 Next.js 应用进行检测。
---

可观测性对于理解和优化 Next.js 应用的行为和性能至关重要。

随着应用程序变得越来越复杂，识别和诊断可能出现的问题变得越来越困难。通过利用可观测性工具，如日志记录和指标，开发人员可以深入了解其应用程序的行为并识别需要优化的领域。借助可观测性，开发人员可以在问题成为主要问题之前主动解决问题，并提供更好的用户体验。因此，强烈建议在 Next.js 应用程序中使用可观测性来提高性能、优化资源和增强用户体验。

我们建议使用 OpenTelemetry 进行应用程序检测。
这是一种平台无关的应用程序检测方式，允许你在不更改代码的情况下更改可观测性提供商。
阅读 [OpenTelemetry 官方文档](https://opentelemetry.io/docs/) 获取有关 OpenTelemetry 及其工作原理的更多信息。

本文档使用诸如 _Span_、_Trace_ 或 _Exporter_ 等术语，所有这些都可以在 [OpenTelemetry 可观测性入门](https://opentelemetry.io/docs/concepts/observability-primer/) 中找到。

Next.js 原生支持 OpenTelemetry 检测，这意味着我们已经对 Next.js 本身进行了检测。

<PagesOnly>
  当你启用 OpenTelemetry 时，我们会自动将你的所有代码（如 `getStaticProps`）包装在具有有用属性的 _spans_ 中。
</PagesOnly>

## 入门

OpenTelemetry 是可扩展的，但正确设置它可能会相当冗长。
这就是为什么我们准备了 `@vercel/otel` 包，帮助你快速入门。

### 使用 `@vercel/otel`

首先，安装以下包：

```bash
npm install @vercel/otel @opentelemetry/sdk-logs @opentelemetry/api-logs @opentelemetry/instrumentation
```

<AppOnly>

接下来，在项目的**根目录**（或者如果使用 `src` 文件夹，则在其中）创建一个自定义的 [`instrumentation.ts`](/docs/nextjs-cn/app/guides/configuring/instrumentation)（或 `.js`）文件：

</AppOnly>

<PagesOnly>

接下来，在项目的**根目录**（或者如果使用 `src` 文件夹，则在其中）创建一个自定义的 [`instrumentation.ts`](/docs/nextjs-cn/pages/guides/configuring/instrumentation)（或 `.js`）文件：

</PagesOnly>

```ts switcher
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({ serviceName: 'next-app' })
}
```

```js switcher
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({ serviceName: 'next-app' })
}
```

有关其他配置选项，请参阅 [`@vercel/otel` 文档](https://www.npmjs.com/package/@vercel/otel)。

<AppOnly>

> **须知**：
>
> - `instrumentation` 文件应该位于项目的根目录，而不是在 `app` 或 `pages` 目录内。如果你使用的是 `src` 文件夹，则将文件放在 `src` 中，与 `pages` 和 `app` 并列。
> - 如果你使用 [`pageExtensions` 配置选项](/docs/nextjs-cn/app/api-reference/config/next-config-js/pageExtensions) 添加后缀，你还需要更新 `instrumentation` 文件名以匹配。
> - 我们创建了一个基础的 [with-opentelemetry](https://github.com/vercel/next.js/tree/canary/examples/with-opentelemetry) 示例供你使用。

</AppOnly>

<PagesOnly>

> **须知**：
>
> - `instrumentation` 文件应该位于项目的根目录，而不是在 `app` 或 `pages` 目录内。如果你使用的是 `src` 文件夹，则将文件放在 `src` 中，与 `pages` 和 `app` 并列。
> - 如果你使用 [`pageExtensions` 配置选项](/docs/nextjs-cn/pages/api-reference/config/next-config-js/pageExtensions) 添加后缀，你还需要更新 `instrumentation` 文件名以匹配。
> - 我们创建了一个基础的 [with-opentelemetry](https://github.com/vercel/next.js/tree/canary/examples/with-opentelemetry) 示例供你使用。

</PagesOnly>

### 手动 OpenTelemetry 配置

`@vercel/otel` 包提供了许多配置选项，应该满足大多数常见用例。但如果它不适合你的需求，你可以手动配置 OpenTelemetry。

首先你需要安装 OpenTelemetry 包：

```bash
npm install @opentelemetry/sdk-node @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-http
```

现在你可以在 `instrumentation.ts` 中初始化 `NodeSDK`。
与 `@vercel/otel` 不同，`NodeSDK` 与 edge 运行时不兼容，因此你需要确保仅在 `process.env.NEXT_RUNTIME === 'nodejs'` 时导入它们。我们建议创建一个新文件 `instrumentation.node.ts`，仅在使用 node 时有条件地导入：

```ts switcher
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation.node.ts')
  }
}
```

```js switcher
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation.node.js')
  }
}
```

```ts switcher
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
})
sdk.start()
```

```js switcher
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
})
sdk.start()
```

这样做等同于使用 `@vercel/otel`，但可以修改和扩展 `@vercel/otel` 未公开的一些功能。如果需要 edge 运行时支持，你必须使用 `@vercel/otel`。

## 测试你的检测

你需要一个带有兼容后端的 OpenTelemetry 收集器来在本地测试 OpenTelemetry 跟踪。
我们推荐使用我们的 [OpenTelemetry 开发环境](https://github.com/vercel/opentelemetry-collector-dev-setup)。

如果一切正常，你应该能够看到标记为 `GET /requested/pathname` 的根服务器 span。
来自该特定跟踪的所有其他 span 将嵌套在其下。

Next.js 跟踪的 span 比默认发出的更多。
要查看更多 span，必须设置 `NEXT_OTEL_VERBOSE=1`。

## 部署

### 使用 OpenTelemetry Collector

当你使用 OpenTelemetry Collector 部署时，你可以使用 `@vercel/otel`。
它在 Vercel 上和自托管时都能正常工作。

#### 在 Vercel 上部署

我们确保 OpenTelemetry 在 Vercel 上开箱即用。

按照 [Vercel 文档](https://vercel.com/docs/concepts/observability/otel-overview/quickstart) 将你的项目连接到可观测性提供商。

#### 自托管

部署到其他平台也很简单。你需要启动自己的 OpenTelemetry Collector 来接收和处理来自 Next.js 应用的遥测数据。

为此，请按照 [OpenTelemetry Collector 入门指南](https://opentelemetry.io/docs/collector/getting-started/) 操作，该指南将引导你设置收集器并将其配置为接收来自 Next.js 应用的数据。

一旦你的收集器启动并运行，你可以按照各自的部署指南将 Next.js 应用部署到你选择的平台。

### 自定义导出器

OpenTelemetry Collector 不是必需的。你可以使用自定义 OpenTelemetry 导出器与 [`@vercel/otel`](#using-vercelotel) 或 [手动 OpenTelemetry 配置](#manual-opentelemetry-configuration)。

## 自定义 Span

你可以使用 [OpenTelemetry API](https://opentelemetry.io/docs/instrumentation/js/instrumentation) 添加自定义 span。

```bash
npm install @opentelemetry/api
```

以下示例演示了一个获取 GitHub stars 的函数，并添加了一个自定义 `fetchGithubStars` span 来跟踪获取请求的结果：

```ts
import { trace } from '@opentelemetry/api'

export async function fetchGithubStars() {
  return await trace
    .getTracer('nextjs-example')
    .startActiveSpan('fetchGithubStars', async (span) => {
      try {
        return await getValue()
      } finally {
        span.end()
      }
    })
}
```

`register` 函数将在你的代码在新环境中运行之前执行。
你可以开始创建新的 span，它们应该被正确地添加到导出的跟踪中。

## Next.js 中的默认 Span

Next.js 自动为你设置了几个 span，以提供关于应用程序性能的有用见解。

span 上的属性遵循 [OpenTelemetry 语义约定](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/)。我们还在 `next` 命名空间下添加了一些自定义属性：

- `next.span_name` - 复制 span 名称
- `next.span_type` - 每种 span 类型都有一个唯一标识符
- `next.route` - 请求的路由模式（例如，`/[param]/user`）。
- `next.rsc`（true/false）- 请求是否为 RSC 请求，例如预取。
- `next.page`
  - 这是应用路由器使用的内部值。
  - 你可以将其视为特殊文件的路由（如 `page.ts`、`layout.ts`、`loading.ts` 等）
  - 仅当与 `next.route` 配对时才能用作唯一标识符，因为 `/layout` 可以用于标识 `/(groupA)/layout.ts` 和 `/(groupB)/layout.ts`

### `[http.method] [next.route]`

- `next.span_type`: `BaseServer.handleRequest`

此 span 表示每个传入到 Next.js 应用程序的请求的根 span。它跟踪请求的 HTTP 方法、路由、目标和状态代码。

属性：

- [通用 HTTP 属性](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/http/#common-attributes)
  - `http.method`
  - `http.status_code`
- [服务器 HTTP 属性](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/http/#http-server-semantic-conventions)
  - `http.route`
  - `http.target`
- `next.span_name`
- `next.span_type`
- `next.route`

### `render route (app) [next.route]`

- `next.span_type`: `AppRender.getBodyResult`。

此 span 表示在应用路由器中渲染路由的过程。

属性：

- `next.span_name`
- `next.span_type`
- `next.route`

### `fetch [http.method] [http.url]`

- `next.span_type`: `AppRender.fetch`

此 span 表示在你的代码中执行的获取请求。

属性：

- [通用 HTTP 属性](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/http/#common-attributes)
  - `http.method`
- [客户端 HTTP 属性](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/http/#http-client)
  - `http.url`
  - `net.peer.name`
  - `net.peer.port`（仅当指定时）
- `next.span_name`
- `next.span_type`

可以通过在环境中设置 `NEXT_OTEL_FETCH_DISABLED=1` 来关闭此 span。当你想使用自定义获取检测库时，这很有用。

### `executing api route (app) [next.route]`

- `next.span_type`: `AppRouteRouteHandlers.runHandler`。

此 span 表示在应用路由器中执行 API 路由处理程序。

属性：

- `next.span_name`
- `next.span_type`
- `next.route`

### `getServerSideProps [next.route]`

- `next.span_type`: `Render.getServerSideProps`。

此 span 表示为特定路由执行 `getServerSideProps`。

属性：

- `next.span_name`
- `next.span_type`
- `next.route`

### `getStaticProps [next.route]`

- `next.span_type`: `Render.getStaticProps`。

此 span 表示为特定路由执行 `getStaticProps`。

属性：

- `next.span_name`
- `next.span_type`
- `next.route`

### `render route (pages) [next.route]`

- `next.span_type`: `Render.renderDocument`。

此 span 表示为特定路由渲染文档的过程。

属性：

- `next.span_name`
- `next.span_type`
- `next.route`

### `generateMetadata [next.page]`

- `next.span_type`: `ResolveMetadata.generateMetadata`。

此 span 表示为特定页面生成元数据的过程（单个路由可以有多个这些 span）。

属性：

- `next.span_name`
- `next.span_type`
- `next.page`

### `resolve page components`

- `next.span_type`: `NextNodeServer.findPageComponents`。

此 span 表示为特定页面解析页面组件的过程。

属性：

- `next.span_name`
- `next.span_type`
- `next.route`

### `resolve segment modules`

- `next.span_type`: `NextNodeServer.getLayoutOrPageModule`。

此 span 表示加载布局或页面的代码模块。

属性：

- `next.span_name`
- `next.span_type`
- `next.segment`

### `start response`

- `next.span_type`: `NextNodeServer.startResponse`。

这个零长度 span 表示响应中发送第一个字节的时间。
