---
title: 如何自托管你的 Next.js 应用程序
nav_title: 自托管
description: 了解如何在 Node.js 服务器、Docker 镜像或静态 HTML 文件（静态导出）上自托管你的 Next.js 应用程序。
---

{/_ 本文档的内容在 app 和 pages 路由之间共享。你可以使用 `<PagesOnly>Content</PagesOnly>` 组件来添加特定于 Pages 路由的内容。任何共享内容都不应该被包装在组件中。 _/}

在[部署](docs/app/getting-started/deploying)你的 Next.js 应用程序时，你可能希望根据你的基础设施配置不同功能的处理方式。

> **🎥 观看：** 了解更多关于自托管 Next.js 的信息 → [YouTube（45分钟）](https://www.youtube.com/watch?v=sIVL4JMqRfc)。

## 图像优化

通过 `next/image` 进行的[图像优化](/docs/app/api-reference/components/image)在使用 `next start` 部署时可以零配置自托管。如果你更喜欢使用单独的服务来优化图像，你可以[配置图像加载器](/docs/app/api-reference/components/image#loader)。

图像优化可以通过在 `next.config.js` 中定义自定义图像加载器与[静态导出](/docs/app/guides/static-exports#image-optimization)一起使用。请注意，图像是在运行时优化的，而不是在构建过程中。

> **须知：**
>
> - 在基于 glibc 的 Linux 系统上，图像优化可能需要[额外配置](https://sharp.pixelplumbing.com/install#linux-memory-allocator)以防止过度内存使用。
> - 了解更多关于[优化图像的缓存行为](/docs/app/api-reference/components/image#minimumcachettl)以及如何配置 TTL。
> - 如果你愿意，你也可以[禁用图像优化](/docs/app/api-reference/components/image#unoptimized)，同时保留使用 `next/image` 的其他好处。例如，如果你自己单独优化图像。

## 中间件

使用 `next start` 部署时，[中间件](/docs/app/building-your-application/routing/middleware)可以零配置自托管。由于它需要访问传入请求，因此在使用[静态导出](/docs/app/guides/static-exports)时不支持。

中间件使用 [Edge 运行时](/docs/app/api-reference/edge)，这是所有可用 Node.js API 的子集，有助于确保低延迟，因为它可能在应用程序中的每个路由或资源之前运行。如果你不想这样，你可以使用[完整的 Node.js 运行时](/blog/next-15-2#nodejs-middleware-experimental)来运行中间件。

如果你想添加需要所有 Node.js API 的逻辑（或使用外部包），你可能可以将此逻辑移至[布局](/docs/app/building-your-application/routing/layouts-and-templates#layouts)中作为[服务器组件](/docs/app/building-your-application/rendering/server-components)。例如，检查[头信息](/docs/app/api-reference/functions/headers)和[重定向](/docs/app/api-reference/functions/redirect)。你还可以使用头信息、cookies 或查询参数通过 `next.config.js` 进行[重定向](/docs/app/api-reference/config/next-config-js/redirects#header-cookie-and-query-matching)或[重写](/docs/app/api-reference/config/next-config-js/rewrites#header-cookie-and-query-matching)。如果这些方法都不能满足需求，你还可以使用[自定义服务器](/docs/pages/guides/custom-server)。

## 环境变量

Next.js 可以支持构建时和运行时环境变量。

**默认情况下，环境变量仅在服务器上可用**。要将环境变量暴露给浏览器，必须以 `NEXT_PUBLIC_` 为前缀。但是，这些公共环境变量将在 `next build` 期间内联到 JavaScript 包中。

<PagesOnly>

要读取运行时环境变量，我们建议使用 `getServerSideProps` 或[逐步采用 App Router](/docs/app/guides/migrating/app-router-migration)。

</PagesOnly>

<AppOnly>

你可以在动态渲染期间安全地在服务器上读取环境变量。

```tsx filename="app/page.ts" switcher
import { connection } from 'next/server'

export default async function Component() {
  await connection()
  // cookies, headers, 和其他动态 API
  // 也将选择动态渲染，这意味着
  // 这个环境变量在运行时评估
  const value = process.env.MY_VALUE
  // ...
}
```

```jsx filename="app/page.js" switcher
import { connection } from 'next/server'

export default async function Component() {
  await connection()
  // cookies, headers, 和其他动态 API
  // 也将选择动态渲染，这意味着
  // 这个环境变量在运行时评估
  const value = process.env.MY_VALUE
  // ...
}
```

</AppOnly>

这允许你使用单一的 Docker 镜像，可以在具有不同值的多个环境中提升。

> **须知：**
>
> - 你可以使用 [`register` 函数](/docs/app/guides/instrumentation) 在服务器启动时运行代码。
> - 我们不建议使用 [runtimeConfig](/docs/pages/api-reference/config/next-config-js/runtime-configuration) 选项，因为它不适用于独立输出模式。相反，我们建议[逐步采用](/docs/app/guides/migrating/app-router-migration) App Router。

## 缓存和 ISR

Next.js 可以缓存响应、生成的静态页面、构建输出以及其他静态资源，如图像、字体和脚本。

缓存和重新验证页面（使用[增量静态再生成](/docs/app/building-your-application/data-fetching/incremental-static-regeneration)）使用**相同的共享缓存**。默认情况下，此缓存存储在 Next.js 服务器的文件系统（磁盘）上。**这在使用 Pages 和 App Router 自托管时自动工作**。

如果你想将缓存的页面和数据持久化到持久存储，或者在多个 Next.js 应用程序容器或实例之间共享缓存，则可以配置 Next.js 缓存位置。

### 自动缓存

- Next.js 对真正不可变的资源设置 `Cache-Control` 头为 `public, max-age=31536000, immutable`。这不能被覆盖。这些不可变文件在文件名中包含 SHA 哈希，因此它们可以安全地无限期缓存。例如，[静态图像导入](/docs/app/getting-started/images#local-images)。你可以[配置图像的 TTL](/docs/app/api-reference/components/image#minimumcachettl)。
- 增量静态再生成 (ISR) 设置 `Cache-Control` 头为 `s-maxage: <revalidate in getStaticProps>, stale-while-revalidate`。这个重新验证时间是在你的 [`getStaticProps` 函数](/docs/pages/building-your-application/data-fetching/get-static-props)中以秒为单位定义的。如果你设置 `revalidate: false`，它将默认为一年的缓存持续时间。
- 动态渲染的页面设置 `Cache-Control` 头为 `private, no-cache, no-store, max-age=0, must-revalidate`，以防止缓存用户特定的数据。这适用于 App Router 和 Pages Router。这也包括[草稿模式](/docs/app/guides/draft-mode)。

### 静态资源

如果你想在不同的域或 CDN 上托管静态资源，你可以在 `next.config.js` 中使用 `assetPrefix` [配置](/docs/app/api-reference/config/next-config-js/assetPrefix)。Next.js 将在检索 JavaScript 或 CSS 文件时使用此资源前缀。将资源分离到不同的域确实有 DNS 和 TLS 解析所花费的额外时间的缺点。

[了解更多关于 `assetPrefix`](/docs/app/api-reference/config/next-config-js/assetPrefix)。

### 配置缓存

默认情况下，生成的缓存资源将存储在内存中（默认为 50mb）和磁盘上。如果你使用像 Kubernetes 这样的容器编排平台托管 Next.js，每个 Pod 将有一个缓存副本。为了防止由于默认情况下缓存不在 Pod 之间共享而显示过时数据，你可以配置 Next.js 缓存以提供缓存处理程序并禁用内存缓存。

在自托管时配置 ISR/Data 缓存位置，你可以在 `next.config.js` 文件中配置自定义处理程序：

```jsx filename="next.config.js"
module.exports = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0, // 禁用默认的内存缓存
}
```

然后，在项目根目录中创建 `cache-handler.js`，例如：

```jsx filename="cache-handler.js"
const cache = new Map()

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options
  }

  async get(key) {
    // 这可以存储在任何地方，如持久存储
    return cache.get(key)
  }

  async set(key, data, ctx) {
    // 这可以存储在任何地方，如持久存储
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    })
  }

  async revalidateTag(tags) {
    // tags 是一个字符串或字符串数组
    tags = [tags].flat()
    // 迭代缓存中的所有条目
    for (let [key, value] of cache) {
      // 如果值的标签包含指定的标签，删除此条目
      if (value.tags.some((tag) => tags.includes(tag))) {
        cache.delete(key)
      }
    }
  }

  // 如果你想为单个请求有临时内存缓存，并在
  // 下一个请求前重置，你可以利用此方法
  resetRequestCache() {}
}
```

使用自定义缓存处理程序将允许你确保托管 Next.js 应用程序的所有 Pod 之间的一致性。例如，你可以将缓存的值保存在任何地方，如 [Redis](https://github.com/vercel/next.js/tree/canary/examples/cache-handler-redis) 或 AWS S3。

> **须知：**
>
> - `revalidatePath` 是缓存标签之上的便利层。调用 `revalidatePath` 将调用 `revalidateTag` 函数，并为提供的页面使用特殊的默认标签。

## 构建缓存

Next.js 在 `next build` 期间生成一个 ID 来标识正在提供的应用程序版本。相同的构建应该被使用并引导多个容器。

如果你为环境的每个阶段重新构建，你将需要生成一个一致的构建 ID 在容器之间使用。使用 `next.config.js` 中的 `generateBuildId` 命令：

```jsx filename="next.config.js"
module.exports = {
  generateBuildId: async () => {
    // 这可以是任何东西，使用最新的 git hash
    return process.env.GIT_HASH
  },
}
```

## 版本倾斜

Next.js 将自动缓解大多数[版本倾斜](https://www.industrialempathy.com/posts/version-skew/)实例，并在检测到时自动重新加载应用程序以检索新资源。例如，如果 `deploymentId` 不匹配，页面之间的转换将执行硬导航，而不是使用预取的值。

当应用程序重新加载时，如果应用程序状态没有设计为在页面导航之间持久化，则可能会丢失。例如，使用 URL 状态或本地存储会在页面刷新后保持状态。但是，像 `useState` 这样的组件状态在这类导航中会丢失。

<AppOnly>

## 流式传输和 Suspense

Next.js App Router 支持自托管时的[流式响应](/docs/app/building-your-application/routing/loading-ui-and-streaming)。如果你使用 Nginx 或类似的代理，你需要配置它以禁用缓冲以启用流式传输。

例如，你可以通过将 `X-Accel-Buffering` 设置为 `no` 来禁用 Nginx 中的缓冲：

```js filename="next.config.js"
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ]
  },
}
```

## 部分预渲染

[部分预渲染（实验性）](/docs/app/getting-started/partial-prerendering) 默认与 Next.js 一起工作，并不是 CDN 特有的功能。这包括通过 `next start` 部署为 Node.js 服务器以及与 Docker 容器一起使用时。

## 与 CDN 一起使用

当在 Next.js 应用程序前面使用 CDN 时，在访问动态 API 时，页面将包含 `Cache-Control: private` 响应头。这确保生成的 HTML 页面被标记为不可缓存。如果页面完全预渲染为静态，它将包含 `Cache-Control: public` 以允许页面在 CDN 上缓存。

如果你不需要静态和动态组件的混合，你可以使整个路由静态并缓存 CDN 上的输出 HTML。当运行 `next build` 且未使用动态 API 时，这种自动静态优化是默认行为。

随着部分预渲染趋于稳定，我们将通过部署适配器 API 提供支持。

</AppOnly>

<AppOnly>

## `after`

自托管时，使用 `next start` 完全支持 [`after`](/docs/app/api-reference/functions/after)。

当停止服务器时，通过发送 `SIGINT` 或 `SIGTERM` 信号并等待来确保优雅关闭。这允许 Next.js 服务器等待，直到 `after` 内部使用的挂起回调函数或承诺完成。

</AppOnly>

<PagesOnly>

## 手动优雅关闭

在自托管时，你可能希望在服务器收到 `SIGTERM` 或 `SIGINT` 信号时运行代码。

你可以将环境变量 `NEXT_MANUAL_SIG_HANDLE` 设置为 `true`，然后在 `_document.js` 文件中为该信号注册一个处理程序。你需要直接在 `package.json` 脚本中注册环境变量，而不是在 `.env` 文件中。

> **须知**：手动信号处理在 `next dev` 中不可用。

```json filename="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "NEXT_MANUAL_SIG_HANDLE=true next start"
  }
}
```

```js filename="pages/_document.js"
if (process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on('SIGTERM', () => {
    console.log('收到 SIGTERM：正在清理')
    process.exit(0)
  })
  process.on('SIGINT', () => {
    console.log('收到 SIGINT：正在清理')
    process.exit(0)
  })
}
```

</PagesOnly>
