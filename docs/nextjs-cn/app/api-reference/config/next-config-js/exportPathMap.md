---
title: exportPathMap
description: 使用 `next export` 时，自定义将导出为 HTML 文件的页面。
version: legacy
---

> 此功能仅适用于 `next export`，目前已被 `pages` 中的 `getStaticPaths` 或 `app` 中的 `generateStaticParams` **弃用**。

`exportPathMap` 允许你在导出过程中指定请求路径到页面目标的映射。在 `exportPathMap` 中定义的路径在使用 [`next dev`](/docs/nextjs-cn/app/api-reference/cli/next#next-dev-options) 时也可用。

让我们从一个例子开始，为一个具有以下页面的应用创建自定义 `exportPathMap`：

- `pages/index.js`
- `pages/about.js`
- `pages/post.js`

打开 `next.config.js` 并添加以下 `exportPathMap` 配置：

```js
module.exports = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  },
}
```

> **须知**：`exportPathMap` 中的 `query` 字段不能与[自动静态优化页面](/docs/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization)或 [`getStaticProps` 页面](/docs/nextjs-cn/pages/building-your-application/data-fetching/get-static-props)一起使用，因为它们在构建时被渲染为 HTML 文件，而在 `next export` 期间无法提供额外的查询信息。

然后，这些页面将被导出为 HTML 文件，例如，`/about` 将变成 `/about.html`。

`exportPathMap` 是一个 `async` 函数，接收 2 个参数：第一个是 `defaultPathMap`，这是 Next.js 使用的默认映射。第二个参数是一个对象，包含：

- `dev` - 当在开发环境中调用 `exportPathMap` 时为 `true`。运行 `next export` 时为 `false`。在开发环境中，`exportPathMap` 用于定义路由。
- `dir` - 项目目录的绝对路径
- `outDir` - `out/` 目录的绝对路径（可通过 `-o` 配置）。当 `dev` 为 `true` 时，`outDir` 的值将为 `null`。
- `distDir` - `.next/` 目录的绝对路径（可通过 [`distDir`](/docs/nextjs-cn/pages/api-reference/config/next-config-js/distDir) 配置）
- `buildId` - 生成的构建 ID

返回的对象是页面的映射，其中 `key` 是 `pathname`，`value` 是一个接受以下字段的对象：

- `page`：`String` - 要渲染的 `pages` 目录中的页面
- `query`：`Object` - 预渲染时传递给 `getInitialProps` 的 `query` 对象。默认为 `{}`

> 导出的 `pathname` 也可以是文件名（例如，`/readme.md`），但如果内容与 `.html` 不同，你可能需要在提供其内容时将 `Content-Type` 头部设置为 `text/html`。

## 添加尾部斜杠

可以配置 Next.js 将页面导出为 `index.html` 文件并要求尾部斜杠，`/about` 变为 `/about/index.html` 并可通过 `/about/` 路由。这是 Next.js 9 之前的默认行为。

要切换回来并添加尾部斜杠，打开 `next.config.js` 并启用 `trailingSlash` 配置：

```js
module.exports = {
  trailingSlash: true,
}
```

## 自定义输出目录

<AppOnly>

[`next export`](/docs/nextjs-cn/app/guides/deployment/static-exports) 将使用 `out` 作为默认输出目录，你可以使用 `-o` 参数自定义它，如下所示：

</AppOnly>

<PagesOnly>

[`next export`](/docs/nextjs-cn/pages/guides/deployment/static-exports) 将使用 `out` 作为默认输出目录，你可以使用 `-o` 参数自定义它，如下所示：

</PagesOnly>

```bash
next export -o outdir
```

> **警告**：使用 `exportPathMap` 已被弃用，并被 `pages` 内的 `getStaticPaths` 覆盖。我们不建议同时使用它们。
