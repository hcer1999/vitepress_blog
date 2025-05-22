---
title: redirects
description: 向你的 Next.js 应用添加重定向。
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<PagesOnly>Content</PagesOnly>` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

重定向允许你将传入的请求路径重定向到不同的目标路径。

要使用重定向，你可以在 `next.config.js` 中使用 `redirects` 键：

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
```

`redirects` 是一个异步函数，期望返回一个数组，数组中包含带有 `source`、`destination` 和 `permanent` 属性的对象：

- `source` 是传入请求路径模式。
- `destination` 是你想要路由到的路径。
- `permanent` `true` 或 `false` - 如果为 `true`，将使用 308 状态码，指示客户端/搜索引擎永久缓存该重定向；如果为 `false`，将使用 307 状态码，这是临时的，不会被缓存。

> **为什么 Next.js 使用 307 和 308？** 传统上，302 用于临时重定向，301 用于永久重定向，但许多浏览器改变了重定向的请求方法为 `GET`，无论原始方法是什么。例如，如果浏览器向 `POST /v1/users` 发出请求，该请求返回状态码 `302` 和位置 `/v2/users`，那么随后的请求可能是 `GET /v2/users` 而不是预期的 `POST /v2/users`。Next.js 使用 307 临时重定向和 308 永久重定向状态码，明确保留所使用的请求方法。

- `basePath`: `false` 或 `undefined` - 如果为 false，则在匹配时不会包含 `basePath`，只能用于外部重定向。
- `locale`: `false` 或 `undefined` - 是否在匹配时不应包含语言环境。
- `has` 是具有 `type`、`key` 和 `value` 属性的 [has 对象](#头部-cookie-和查询匹配) 数组。
- `missing` 是具有 `type`、`key` 和 `value` 属性的 [missing 对象](#头部-cookie-和查询匹配) 数组。

重定向在文件系统之前检查，包括页面和 `/public` 文件。

当使用 Pages Router 时，重定向不会应用于客户端路由（`Link`，`router.push`），除非存在 [Middleware](/docs/app/building-your-application/routing/middleware) 并匹配路径。

当应用重定向时，请求中提供的任何查询值都将传递到重定向目标。例如，请看以下重定向配置：

```js
{
  source: '/old-blog/:path*',
  destination: '/blog/:path*',
  permanent: false
}
```

> **须知**：记得在 `source` 和 `destination` 路径中冒号 `:` 前包含正斜杠 `/`，否则路径将被视为字面字符串，你可能会导致无限重定向的风险。

当请求 `/old-blog/post-1?hello=world` 时，客户端将被重定向到 `/blog/post-1?hello=world`。

## 路径匹配

允许路径匹配，例如 `/old-blog/:slug` 将匹配 `/old-blog/hello-world`（不包括嵌套路径）：

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug', // 匹配的参数可以在目标中使用
        permanent: true,
      },
    ]
  },
}
```

### 通配符路径匹配

要匹配通配符路径，可以在参数后使用 `*`，例如 `/blog/:slug*` 将匹配 `/blog/a/b/c/d/hello-world`：

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*', // 匹配的参数可以在目标中使用
        permanent: true,
      },
    ]
  },
}
```

### 正则表达式路径匹配

要匹配正则表达式路径，可以在参数后用括号包装正则表达式，例如 `/post/:slug(\\d{1,})` 将匹配 `/post/123` 但不匹配 `/post/abc`：

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [
      {
        source: '/post/:slug(\\d{1,})',
        destination: '/news/:slug', // 匹配的参数可以在目标中使用
        permanent: false,
      },
    ]
  },
}
```

以下字符 `(`、`)`、`{`、`}`、`:`、`*`、`+`、`?` 用于正则表达式路径匹配，因此当在 `source` 中作为非特殊值使用时，必须通过在它们前面添加 `\\` 来转义：

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [
      {
        // 这将匹配请求的 `/english(default)/something`
        source: '/english\\(default\\)/:slug',
        destination: '/en-us/:slug',
        permanent: false,
      },
    ]
  },
}
```

## 头部、Cookie 和查询匹配

要只在头部、cookie 或查询值也匹配 `has` 字段或不匹配 `missing` 字段时匹配重定向，可以使用这两个字段。重定向只有在 `source` 和所有 `has` 项都匹配且所有 `missing` 项都不匹配时才会应用。

`has` 和 `missing` 项可以具有以下字段：

- `type`: `String` - 必须是 `header`、`cookie`、`host` 或 `query` 之一。
- `key`: `String` - 从所选类型中要匹配的键。
- `value`: `String` 或 `undefined` - 要检查的值，如果未定义，则任何值都将匹配。可以使用类似正则表达式的字符串来捕获值的特定部分，例如，如果值 `first-(?<paramName>.*)` 用于 `first-second`，则 `second` 可以在目标中使用 `:paramName`。

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [
      // 如果存在 `x-redirect-me` 头部，
      // 将应用此重定向
      {
        source: '/:path((?!another-page$).*)',
        has: [
          {
            type: 'header',
            key: 'x-redirect-me',
          },
        ],
        permanent: false,
        destination: '/another-page',
      },
      // 如果存在 `x-dont-redirect` 头部，
      // 将不会应用此重定向
      {
        source: '/:path((?!another-page$).*)',
        missing: [
          {
            type: 'header',
            key: 'x-do-not-redirect',
          },
        ],
        permanent: false,
        destination: '/another-page',
      },
      // 如果源、查询和 cookie 都匹配，
      // 将应用此重定向
      {
        source: '/specific/:path*',
        has: [
          {
            type: 'query',
            key: 'page',
            // 由于提供了 value 且不使用命名捕获组
            // 例如 (?<page>home)，所以页面值在目标中不可用
            value: 'home',
          },
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/another/:path*',
      },
      // 如果存在 `x-authorized` 头部
      // 且包含匹配值，将应用此重定向
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: '(?<authorized>yes|true)',
          },
        ],
        permanent: false,
        destination: '/home?authorized=:authorized',
      },
      // 如果主机是 `example.com`，
      // 将应用此重定向
      {
        source: '/:path((?!another-page$).*)',
        has: [
          {
            type: 'host',
            value: 'example.com',
          },
        ],
        permanent: false,
        destination: '/another-page',
      },
    ]
  },
}
```

### 支持 basePath 的重定向

当使用 [`basePath` 支持](/docs/app/api-reference/config/next-config-js/basePath) 与重定向时，每个 `source` 和 `destination` 会自动加上 `basePath` 前缀，除非你在重定向中添加 `basePath: false`：

```js filename="next.config.js"
module.exports = {
  basePath: '/docs',

  async redirects() {
    return [
      {
        source: '/with-basePath', // 自动变为 /docs/with-basePath
        destination: '/another', // 自动变为 /docs/another
        permanent: false,
      },
      {
        // 由于设置了 basePath: false，所以不添加 /docs
        source: '/without-basePath',
        destination: 'https://example.com',
        basePath: false,
        permanent: false,
      },
    ]
  },
}
```

### 支持 i18n 的重定向

<AppOnly>

当使用 [`i18n` 支持](/docs/app/building-your-application/routing/internationalization) 与重定向时，每个 `source` 和 `destination` 会自动添加前缀以处理配置的 `locales`，除非你在重定向中添加 `locale: false`。如果使用了 `locale: false`，你必须为 `source` 和 `destination` 添加语言环境前缀，以便正确匹配。

</AppOnly>

<PagesOnly>

当使用 [`i18n` 支持](/docs/pages/building-your-application/routing/internationalization) 与重定向时，每个 `source` 和 `destination` 会自动添加前缀以处理配置的 `locales`，除非你在重定向中添加 `locale: false`。如果使用了 `locale: false`，你必须为 `source` 和 `destination` 添加语言环境前缀，以便正确匹配。

</PagesOnly>

```js filename="next.config.js"
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async redirects() {
    return [
      {
        source: '/with-locale', // 自动处理所有语言环境
        destination: '/another', // 自动传递语言环境
        permanent: false,
      },
      {
        // 由于设置了 locale: false，所以不自动处理语言环境
        source: '/nl/with-locale-manual',
        destination: '/nl/another',
        locale: false,
        permanent: false,
      },
      {
        // 由于 `en` 是 defaultLocale，所以这匹配 '/'
        source: '/en',
        destination: '/en/another',
        locale: false,
        permanent: false,
      },
      // 即使设置了 locale: false，也可以匹配所有语言环境
      {
        source: '/:locale/page',
        destination: '/en/newpage',
        permanent: false,
        locale: false,
      },
      {
        // 这会转换为 /(en|fr|de)/(.*) 所以不会匹配顶级
        // `/` 或 `/fr` 路由，就像 /:path* 会匹配的那样
        source: '/(.*)',
        destination: '/another',
        permanent: false,
      },
    ]
  },
}
```

在某些罕见情况下，你可能需要为较旧的 HTTP 客户端分配自定义状态码以正确重定向。在这些情况下，你可以使用 `statusCode` 属性而不是 `permanent` 属性，但不能同时使用两者。为确保 IE11 兼容性，对于 308 状态码会自动添加 `Refresh` 头部。

## 其他重定向

- 在 [API 路由](/docs/pages/building-your-application/routing/api-routes) 和 [路由处理程序](/docs/app/building-your-application/routing/route-handlers) 内，你可以基于传入请求进行重定向。
- 在 [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props) 和 [`getServerSideProps`](/docs/pages/building-your-application/data-fetching/get-server-side-props) 内，你可以在请求时重定向特定页面。

## 版本历史

| 版本      | 变更               |
| --------- | ------------------ |
| `v13.3.0` | 添加 `missing`。   |
| `v10.2.0` | 添加 `has`。       |
| `v9.5.0`  | 添加 `redirects`。 |
