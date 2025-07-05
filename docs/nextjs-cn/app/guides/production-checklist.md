---
title: 如何优化 Next.js 应用程序以投入生产环境
nav_title: 生产环境
description: 在将 Next.js 应用程序投入生产环境前，确保最佳性能和用户体验的建议。
---

在将 Next.js 应用程序投入生产环境之前，有一些优化和模式你应该考虑实施，以获得最佳的用户体验、性能和安全性。

本页提供了最佳实践，你可以在[构建应用程序](#during-development)和[投入生产环境之前](#before-going-to-production)使用这些实践作为参考，以及你应该了解的[自动 Next.js 优化](#automatic-optimizations)。

## 自动优化

这些 Next.js 优化默认启用，无需配置：

<AppOnly>

- **[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)：** Next.js 默认使用服务器组件。服务器组件在服务器上运行，不需要 JavaScript 在客户端渲染。因此，它们对客户端 JavaScript 包的大小没有影响。然后，你可以根据需要使用[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)来实现交互性。
- **[代码拆分](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)：** 服务器组件通过路由段实现自动代码拆分。你还可以考虑在适当的地方[延迟加载](/nextjs-cn/app/guides/lazy-loading)客户端组件和第三方库。
- **[预取](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#prefetching)：** 当指向新路由的链接进入用户的视口时，Next.js 会在后台预取该路由。这使得导航到新路由几乎是即时的。你可以在适当的地方选择退出预取。
- **[静态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)：** Next.js 在构建时在服务器上静态渲染服务器和客户端组件，并缓存渲染结果以提高应用程序的性能。你可以在适当的地方为特定路由选择[动态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)。<!-- TODO: 当 PPR 稳定时更新 -->
- **[缓存](/nextjs-cn/app/deep-dive/caching)：** Next.js 缓存数据请求、服务器和客户端组件的渲染结果、静态资源等，以减少对服务器、数据库和后端服务的网络请求。你可以在适当的地方选择退出缓存。

</AppOnly>

<PagesOnly>

- **[代码拆分](/nextjs-cn/pages/building-your-application/routing/pages-and-layouts)：** Next.js 自动按页面拆分应用程序代码。这意味着在导航时只加载当前页面所需的代码。你还可以考虑在适当的地方[延迟加载](/nextjs-cn/pages/guides/lazy-loading)第三方库。
- **[预取](/nextjs-cn/pages/api-reference/components/link#prefetch)：** 当指向新路由的链接进入用户的视口时，Next.js 会在后台预取该路由。这使得导航到新路由几乎是即时的。你可以在适当的地方选择退出预取。
- **[自动静态优化](/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization)：** Next.js 自动确定页面是静态的（可以预渲染）如果它没有阻塞数据要求。优化的页面可以被缓存，并从多个 CDN 位置提供给最终用户。你可以在适当的地方选择[服务器端渲染](/nextjs-cn/pages/building-your-application/data-fetching/get-server-side-props)。

</PagesOnly>

这些默认设置旨在提高应用程序的性能，并减少每个网络请求的成本和传输的数据量。

## 开发过程中

在构建应用程序时，我们建议使用以下功能来确保最佳性能和用户体验：

### 路由和渲染

<AppOnly>

- **[布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#layouts)：** 使用布局在页面之间共享 UI，并在导航时启用[部分渲染](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#partial-rendering)。
- **[`<Link>` 组件](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#link-component)：** 使用 `<Link>` 组件进行[客户端导航和预取](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)。
- **[错误处理](/nextjs-cn/app/building-your-application/routing/error-handling)：** 通过创建自定义错误页面，在生产环境中优雅地处理[全部捕获错误](/nextjs-cn/app/building-your-application/routing/error-handling)和 [404 错误](/nextjs-cn/app/api-reference/file-conventions/not-found)。
- **[组合模式](/nextjs-cn/app/building-your-application/rendering/composition-patterns)：** 遵循服务器和客户端组件的推荐组合模式，并检查 [`'use client'` 边界](/nextjs-cn/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree)的位置，以避免不必要地增加客户端 JavaScript 包。
- **[动态 API](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-apis)：** 请注意，像 [`cookies`](/nextjs-cn/app/api-reference/functions/cookies) 和 [`searchParams`](/nextjs-cn/app/api-reference/file-conventions/page#searchparams-optional) 属性这样的动态 API 将使整个路由选择[动态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)（如果在[根布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#root-layout-required)中使用，则是整个应用程序）。确保动态 API 的使用是有意为之的，并在适当的地方用 `<Suspense>` 边界包装它们。

> **注意事项：** [部分预渲染（实验性）]()将允许路由的部分动态化，而不会使整个路由选择动态渲染。

</AppOnly>

<PagesOnly>

- **[`<Link>` 组件](/nextjs-cn/pages/building-your-application/routing/linking-and-navigating)：** 使用 `<Link>` 组件进行客户端导航和预取。
- **[自定义错误](/nextjs-cn/pages/building-your-application/routing/custom-error)：** 优雅地处理 [500](/nextjs-cn/pages/building-your-application/routing/custom-error#page) 和 [404 错误](/nextjs-cn/pages/building-your-application/routing/custom-error#page)

</PagesOnly>

### 数据获取和缓存

<AppOnly>

- **[服务器组件](/nextjs-cn/app/building-your-application/data-fetching/fetching)：** 利用在服务器上使用服务器组件获取数据的优势。
- **[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)：** 使用路由处理程序从客户端组件访问后端资源。但不要从服务器组件调用路由处理程序，以避免额外的服务器请求。
- **[流式传输](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming)：** 使用加载 UI 和 React Suspense 逐步从服务器向客户端发送 UI，并防止整个路由在获取数据时阻塞。
- **[并行数据获取](/nextjs-cn/app/building-your-application/data-fetching/fetching#parallel-and-sequential-data-fetching)：** 通过在适当的地方并行获取数据来减少网络瀑布流。还可以考虑在适当的地方[预加载数据](/nextjs-cn/app/building-your-application/data-fetching/fetching#preloading-data)。
- **[数据缓存](/nextjs-cn/app/deep-dive/caching#data-cache)：** 验证你的数据请求是否被缓存，并在适当的地方选择缓存。确保不使用 `fetch` 的请求也被[缓存](/nextjs-cn/app/api-reference/functions/unstable_cache)。
- **[静态图像](/nextjs-cn/app/api-reference/file-conventions/public-folder)：** 使用 `public` 目录自动缓存应用程序的静态资源，例如图像。

</AppOnly>

<PagesOnly>

- **[API 路由](/nextjs-cn/pages/building-your-application/routing/api-routes)：** 使用路由处理程序访问后端资源，并防止敏感密钥暴露给客户端。
- **[数据缓存](/nextjs-cn/pages/building-your-application/data-fetching/get-static-props)：** 验证你的数据请求是否被缓存，并在适当的地方选择缓存。确保不使用 `getStaticProps` 的请求在适当的地方被缓存。
- **[增量静态再生成](/nextjs-cn/pages/building-your-application/data-fetching/incremental-static-regeneration)：** 使用增量静态再生成在构建后更新静态页面，而不需要重建整个站点。
- **[静态图像](/nextjs-cn/pages/api-reference/file-conventions/public-folder)：** 使用 `public` 目录自动缓存应用程序的静态资源，例如图像。

</PagesOnly>

### UI 和可访问性

<AppOnly>

- **[表单和验证](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#forms)：** 使用服务器操作处理表单提交、服务器端验证和处理错误。

</AppOnly>

- **[字体模块](/nextjs-cn/app/api-reference/components/font)：** 通过使用字体模块优化字体，该模块自动将你的字体文件与其他静态资源一起托管，消除外部网络请求，并减少[布局偏移](https://web.dev/articles/cls)。
- **[`<Image>` 组件](/nextjs-cn/app/api-reference/components/image)：** 通过使用图像组件优化图像，该组件自动优化图像，防止布局偏移，并以 WebP 等现代格式提供图像。
- **[`<Script>` 组件](/nextjs-cn/app/building-your-application/routing/layouts-and-templates)：** 通过使用脚本组件优化第三方脚本，该组件自动延迟脚本并防止它们阻塞主线程。
- **[ESLint](/nextjs-cn/architecture/accessibility#linting)：** 使用内置的 `eslint-plugin-jsx-a11y` 插件尽早捕获可访问性问题。

### 安全性

<AppOnly>

- **[污点处理](/nextjs-cn/app/building-your-application/data-fetching/fetching#preventing-sensitive-data-from-being-exposed-to-the-client)：** 通过污染数据对象和/或特定值来防止敏感数据暴露给客户端。
- **[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#authentication-and-authorization)：** 确保用户有权调用服务器操作。查看推荐的[安全实践]()。

</AppOnly>

- **[环境变量]()：** 确保你的 `.env.*` 文件添加到 `.gitignore` 中，只有公共变量以 `NEXT_PUBLIC_` 为前缀。
- **[内容安全策略]()：** 考虑添加内容安全策略，以保护你的应用程序免受跨站脚本、点击劫持和其他代码注入攻击等各种安全威胁。

### 元数据和 SEO

<AppOnly>

- **[元数据 API](/nextjs-cn/app/getting-started/metadata-and-og-images)：** 使用元数据 API 通过添加页面标题、描述等来改善应用程序的搜索引擎优化（SEO）。
- **[Open Graph (OG) 图像](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)：** 创建 OG 图像，准备你的应用程序进行社交分享。
- **[站点地图](/nextjs-cn/app/api-reference/functions/generate-sitemaps)和[机器人](/nextjs-cn/app/api-reference/file-conventions/metadata/robots)：** 通过生成站点地图和机器人文件帮助搜索引擎抓取和索引你的页面。

</AppOnly>

<PagesOnly>

- **[`<Head>` 组件]()：** 使用 `next/head` 组件添加页面标题、描述等。

</PagesOnly>

### 类型安全

- **TypeScript 和 [TS 插件](/nextjs-cn/app/api-reference/config/typescript)：** 使用 TypeScript 和 TypeScript 插件获得更好的类型安全性，并帮助你尽早发现错误。

## 投入生产环境之前

在投入生产环境之前，你可以运行 `next build` 在本地构建应用程序并捕获任何构建错误，然后运行 `next start` 在类似生产的环境中测量应用程序的性能。

### 核心网络指标

- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)：** 在隐身模式下运行 Lighthouse，以更好地了解用户将如何体验你的网站，并识别需要改进的领域。这是一个模拟测试，应与查看实际数据（如核心网络指标）结合使用。

<AppOnly>

- **[`useReportWebVitals` 钩子](/nextjs-cn/app/api-reference/functions/use-report-web-vitals)：** 使用此钩子将[核心网络指标](https://web.dev/articles/vitals)数据发送到分析工具。

</AppOnly>

### 分析包

使用 [`@next/bundle-analyzer` 插件](/nextjs-cn/app/guides/package-bundling#analyzing-javascript-bundles)分析 JavaScript 包的大小，并识别可能影响应用程序性能的大型模块和依赖项。

此外，以下工具可以帮助你了解向应用程序添加新依赖项的影响：

- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Package Phobia](https://packagephobia.com/)
- [Bundle Phobia](https://bundlephobia.com/)
- [bundlejs](https://bundlejs.com/)
