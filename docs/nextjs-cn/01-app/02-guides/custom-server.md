---
title: 如何在 Next.js 中设置自定义服务器
nav_title: 自定义服务器
description: 使用自定义服务器以编程方式启动 Next.js 应用程序。
---

{/_ 本文档的内容在 app 和 pages 路由之间共享。你可以使用 `<PagesOnly>Content</PagesOnly>` 组件来添加仅适用于 Pages 路由的内容。任何共享内容都不应该被包装在组件中。 _/}

Next.js 默认通过 `next start` 包含自己的服务器。如果你有现有的后端，你仍然可以将其与 Next.js 一起使用（这不是自定义服务器）。自定义 Next.js 服务器允许你以编程方式启动服务器，以实现自定义模式。大多数情况下，你不需要这种方法。但是，如果你需要脱离默认设置，这个选项是可用的。

> **需要了解**:
>
> - 在决定使用自定义服务器之前，请记住，只有当 Next.js 的集成路由器无法满足你的应用需求时，才应该使用它。自定义服务器将移除重要的性能优化，如 **[自动静态优化](/docs/pages/building-your-application/rendering/automatic-static-optimization)。**
> - 当使用独立输出模式时，它不会跟踪自定义服务器文件。这种模式会输出一个单独的最小化 `server.js` 文件。这两者不能一起使用。

看一下自定义服务器的[以下示例](https://github.com/vercel/next.js/tree/canary/examples/custom-server)：

```ts filename="server.ts" switcher
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  )
})
```

```js filename="server.js" switcher
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  )
})
```

> `server.js` 不会通过 Next.js 编译器或打包过程运行。确保此文件所需的语法和源代码与你正在使用的当前 Node.js 版本兼容。[查看示例](https://github.com/vercel/next.js/tree/canary/examples/custom-server)。

要运行自定义服务器，你需要像这样更新 `package.json` 中的 `scripts`：

```json filename="package.json"
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

或者，你可以设置 `nodemon`（[示例](https://github.com/vercel/next.js/tree/canary/examples/custom-server)）。自定义服务器使用以下导入将服务器与 Next.js 应用程序连接：

```js
import next from 'next'

const app = next({})
```

上面的 `next` 导入是一个接收具有以下选项的对象的函数：

| 选项         | 类型               | 描述                                                  |
| ------------ | ------------------ | ----------------------------------------------------- |
| `conf`       | `Object`           | 与 `next.config.js` 中使用的对象相同。默认为 `{}`     |
| `dev`        | `Boolean`          | (_可选_) 是否在开发模式下启动 Next.js。默认为 `false` |
| `dir`        | `String`           | (_可选_) Next.js 项目的位置。默认为 `'.'`             |
| `quiet`      | `Boolean`          | (_可选_) 隐藏包含服务器信息的错误消息。默认为 `false` |
| `hostname`   | `String`           | (_可选_) 服务器运行的主机名                           |
| `port`       | `Number`           | (_可选_) 服务器运行的端口                             |
| `httpServer` | `node:http#Server` | (_可选_) Next.js 运行的 HTTP 服务器                   |
| `turbo`      | `Boolean`          | (_可选_) 启用 Turbopack                               |

然后可以使用返回的 `app` 让 Next.js 根据需要处理请求。

<PagesOnly>

## 禁用文件系统路由

默认情况下，`Next` 会根据文件名的路径名提供 `pages` 文件夹中的每个文件。如果你的项目使用自定义服务器，这种行为可能会导致相同的内容从多个路径提供，这可能会给 SEO 和用户体验带来问题。

要禁用此行为并防止基于 `pages` 中的文件进行路由，请打开 `next.config.js` 并禁用 `useFileSystemPublicRoutes` 配置：

```js filename="next.config.js"
module.exports = {
  useFileSystemPublicRoutes: false,
}
```

> 请注意，`useFileSystemPublicRoutes` 会禁用来自 SSR 的文件名路由；客户端路由仍然可以访问这些路径。使用此选项时，你应该以编程方式防止导航到你不想要的路由。

> 你可能还希望配置客户端路由器，以禁止客户端重定向到文件名路由；为此，请参考 [`router.beforePopState`](/docs/pages/api-reference/functions/use-router#routerbeforepopstate)。

</PagesOnly>
