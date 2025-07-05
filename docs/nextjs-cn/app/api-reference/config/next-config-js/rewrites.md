---
title: rewrites
description: 向你的 Next.js 应用添加重写。
---

# NextJS中文文档 - Rewrites

重写允许你将传入的请求路径映射到不同的目标路径。

<AppOnly>

重写充当 URL 代理并掩盖目标路径，使其看起来用户没有改变他们在网站上的位置。相比之下，[重定向](/nextjs-cn/app/api-reference/config/next-config-js/redirects)会路由到新页面并显示 URL 变化。

</AppOnly>/nextjs-cn/

<PagesOnly>

重写充当 URL 代理并掩盖目标路径，使其看起来用户没有改变他们在网站上的位置。相比之下，[重定向](/nextjs-cn/pages/api-reference/config/next-config-js/redirects)会路由到新页面并显示 URL 变化。

</PagesOnly>/nextjs-cn/

要使用重写，你可以在 `next.config.js` 中使用 `rewrites` 键：

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ]
  },
}
```

重写应用于客户端路由，在上面的例子中，`<Link href="/about">` 将应用重写规则。

`rewrites` 是一个异步函数，期望返回一个数组或一个数组对象（见下文），数组中包含具有 `source` 和 `destination` 属性的对象：

- `source`：`String` - 是传入请求路径模式。
- `destination`：`String` - 是你想要路由到的路径。
- `basePath`：`false` 或 `undefined` - 如果为 false，则在匹配时不会包含 basePath，只能用于外部重写。
- `locale`：`false` 或 `undefined` - 是否在匹配时不应包含语言环境。
- `has` 是一个 [has 对象](#头部-cookie-和查询匹配) 数组，具有 `type`、`key` 和 `value` 属性。
- `missing` 是一个 [missing 对象](#头部-cookie-和查询匹配) 数组，具有 `type`、`key` 和 `value` 属性。

当 `rewrites` 函数返回一个数组时，重写会在检查文件系统（页面和 `/public` 文件）之后和动态路由之前应用。当 `rewrites` 函数返回一个具有特定形状的数组对象时，这种行为可以被改变并更精细地控制，从 Next.js 的 `v10.1` 开始：

```js
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        // 这些重写在 headers/redirects 之后
        // 和所有文件（包括 _next/public 文件）之前检查，
        // 这允许覆盖页面文件
        {
          source: '/some-page',
          destination: '/somewhere-else',
          has: [{ type: 'query', key: 'overrideMe' }],
        },
      ],
      afterFiles: [
        // 这些重写在检查页面/公共文件
        // 之后但在动态路由之前检查
        {
          source: '/non-existent',
          destination: '/somewhere-else',
        },
      ],
      fallback: [
        // 这些重写在页面/公共文件
        // 和动态路由都检查之后检查
        {
          source: '/:path*',
          destination: `https://my-old-site.com/:path*`,
        },
      ],
    }
  },
}
```

> **须知**：`beforeFiles` 中的重写在匹配源后不会立即检查文件系统/动态路由，它们会继续检查直到所有 `beforeFiles` 都已被检查。

Next.js 路由检查的顺序是：

<AppOnly>

1. [headers](/nextjs-cn/app/api-reference/config/next-config-js/headers) 被检查/应用
2. [redirects](/nextjs-cn/app/api-reference/config/next-config-js/redirects) 被检查/应用
3. `beforeFil/nextjs-cn/
4. 来自 [public 目/nextjs-cn/cn/app/api-reference/file-conventions/public-folder) 的静态文件、`_next/static` 文件和非动态页面被检查/服务
5. `afterFiles` 重写被检查/应用，如果这些重写之一被匹配，我们会在每次匹配后检查动态路由/静态文件
6. `fallback` 重写被检/nextjs-cn/面之前和动态路由/所有静态资产被检查之后应用。如果你在 `getStaticPaths` 中使用 [fallback: true/'blocking'](/nextjs-cn/pages/api-reference/functions/get-static-paths#fallback-true)，你在 `next.config.js` 中定义的 fallback `rewrites` 将*不会*运行。

</AppOnly>/nextjs-cn/

<PagesOnly>

1. [headers](/nextjs-cn/pages/api-reference/config/next-config-js/headers) 被检查/应用
2. [redirects](/nextjs-cn/pages/api-reference/config/next-config-js/redirects) 被检查/应用
3. `beforeFil/nextjs-cn/
4. 来自 [public 目/nextjs-cn/cn/pages/api-reference/file-conventions/public-folder) 的静态文件、`_next/static` 文件和非动态页面被检查/服务
5. `afterFiles` 重写被检查/应用，如果这些重写之一被匹配，我们会在每次匹配后检查动态路由/静态文件
6. `fallback` 重写被检/nextjs-cn/面之前和动态路由/所有静态资产被检查之后应用。如果你在 `getStaticPaths` 中使用 [fallback: true/'blocking'](/nextjs-cn/pages/api-reference/functions/get-static-paths#fallback-true)，你在 `next.config.js` 中定义的 fallback `rewrites` 将*不会*运行。

</PagesOnly>/nextjs-cn/

## 重写参数

在重写中使用参数时，当没有参数用于 `destination` 时，参数默认会在查询中传递。

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/old-about/:path*',
        destination: '/about', // :path 参数在这里没有使用，所以会自动在查询中传递
      },
    ]
  },
}
```

如果参数用于目标，则所有参数都不会自动在查询中传递。

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/:path*', // :path 参数在这里使用，所以不会自动在查询中传递
      },
    ]
  },
}
```

即使参数已经在目标中使用，你仍然可以通过在 `destination` 中指定查询来手动在查询中传递参数。

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:first/:second',
        destination: '/:first?second=:second',
        // 由于 :first 参数用于目标，:second 参数
        // 不会自动添加到查询中，尽管我们可以手动添加它
        // 如上所示
      },
    ]
  },
}
```

> **须知**：来自[自动静态优化](/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization)或[预渲染](/nextjs-cn/pages/building-your-application/data-fetching/get-static-props)的静态页面，重写中的参数将在客户端水合后解析并在查询中提供。

## 路径匹配

允许路径匹配，例如 `/blog/:slug` 将匹配 `/blog/hello-world`（不包括嵌套路径）：

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/news/:slug', // 匹配的参数可以在目标中使用
      },
    ]
  },
}
```

### 通配符路径匹配

要匹配通配符路径，可以在参数后使用 `*`，例如 `/blog/:slug*` 将匹配 `/blog/a/b/c/d/hello-world`：

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*', // 匹配的参数可以在目标中使用
      },
    ]
  },
}
```

### 正则表达式路径匹配

要匹配正则表达式路径，可以在参数后用括号包装正则表达式，例如 `/blog/:slug(\\d{1,})` 将匹配 `/blog/123` 但不匹配 `/blog/abc`：

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/old-blog/:post(\\d{1,})',
        destination: '/blog/:post', // Matched parameters can be used in the destination
      },
    ]
  },
}
```

以下字符 `(`, `)`, `{`, `}`, `[`, `]`, `|`, `\`, `^`, `.`, `:`, `*`, `+`, `-`, `?`, `$` 用于正则表达式路径匹配，因此当在 `source` 中用作非特殊值时必须添加 `\\` 前缀：

```js
module.exports = {
  async rewrites() {
    return [
      {
        // this will match `/english(default)/something` being requested
        source: '/english\\(default\\)/:slug',
        destination: '/en-us/:slug',
      },
    ]
  },
}
```

## Header, Cookie, and Query Matching

To only match a rewrite when header, cookie, or query values also match the `has` field or don't match the `missing` field can be used. Both the `source` and all `has` items must match and all `missing` items must not match for the rewrite to be applied.

`has` and `missing` items can have the following fields:

- `type`: `String` - must be either `header`, `cookie`, `host`, or `query`.
- `key`: `String` - the key from the selected type to match against.
- `value`: `String` or `undefined` - the value to check for, if undefined any value will match. A regex like string can be used to capture a specific part of the value, e.g. if the value `first-(?<paramName>.*)` is used for `first-second` then `second` will be usable in the destination with `:paramName`.

```js
module.exports = {
  async rewrites() {
    return [
      // if the header `x-rewrite-me` is present,
      // this rewrite will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-rewrite-me',
          },
        ],
        destination: '/another-page',
      },
      // if the header `x-rewrite-me` is not present,
      // this rewrite will be applied
      {
        source: '/:path*',
        missing: [
          {
            type: 'header',
            key: 'x-rewrite-me',
          },
        ],
        destination: '/another-page',
      },
      // if the source, query, and cookie are matched,
      // this rewrite will be applied
      {
        source: '/specific/:path*',
        has: [
          {
            type: 'query',
            key: 'page',
            // the page value will not be available in the
            // destination since value is provided and doesn't
            // use a named capture group e.g. (?<page>home)
            value: 'home',
          },
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',
          },
        ],
        destination: '/:path*/home',
      },
      // if the header `x-authorized` is present and
      // contains a matching value, this rewrite will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: '(?<authorized>yes|true)',
          },
        ],
        destination: '/home?authorized=:authorized',
      },
      // if the host is `example.com`,
      // this rewrite will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'example.com',
          },
        ],
        destination: '/another-page',
      },
    ]
  },
}
```

## Rewriting to an external URL

<details>
  <summary>Examples</summary>

- [Using Multiple Zones](https://github.com/vercel/next.js/tree/canary/examples/with-zones)

</details>

Rewrites allow you to rewrite to an external URL. This is especially useful for incrementally adopting Next.js. The following is an example rewrite for redirecting the `/blog` route of your main app to an external site.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'https://example.com/blog',
      },
      {
        source: '/blog/:slug',
        destination: 'https://example.com/blog/:slug', // Matched parameters can be used in the destination
      },
    ]
  },
}
```

If you're using `trailingSlash: true`, you also need to insert a trailing slash in the `source` parameter. If the destination server is also expecting a trailing slash it should be included in the `destination` parameter as well.

```js
module.exports = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/blog/',
        destination: 'https://example.com/blog/',
      },
      {
        source: '/blog/:path*/',
        destination: 'https://example.com/blog/:path*/',
      },
    ]
  },
}
```

### Incremental adoption of Next.js

You can also have Next.js fall back to proxying to an existing website after checking all Next.js routes.

This way you don't have to change the rewrites configuration when migrating more pages to Next.js

```js
module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `https://custom-routes-proxying-endpoint.vercel.app/:path*`,
        },
      ],
    }
  },
}
```

### Rewrites with basePath support

When leveraging [`basePath` support](/nextjs-cn/app/api-reference/config/next-config-js/basePath) with rewrites each `source` and `destination` is automatically prefixed with the `basePath` unless you add `basePath: false` to the rewrite:

```js
module.exports = {
  basePath: '/docs',

  async rewrites() {
    return [
      {
        source: '/with-basePath', // automatically becomes /docs/with-basePath
        destination: '/another', // automatically becomes /docs/another
      },
      {
        // does not add /docs to /without-basePath since basePath: false is set
        // Note: this can not be used for internal rewrites e.g. `destination: '/another'`
        source: '/without-basePath',
        destination: 'https://example.com',
        basePath: false,
      },
    ]
  },
}
```

<PagesOnly>

### Rewrites with i18n support

When leveraging [`i18n` support](/nextjs-cn/pages/building-your-application/routing/internationalization) with rewrites each `source` and `destination` is automatically prefixed to handle the configured `locales` unless you add `locale: false` to the rewrite. If `locale: false` is used you must prefix the `source` and `destination` with a locale for it to be matched correctly.

```js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async rewrites() {
    return [
      {
        source: '/with-locale', // automatically handles all locales
        destination: '/another', // automatically passes the locale on
      },
      {
        // does not handle locales automatically since locale: false is set
        source: '/nl/with-locale-manual',
        destination: '/nl/another',
        locale: false,
      },
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/en',
        destination: '/en/another',
        locale: false,
      },
      {
        // it's possible to match all locales even when locale: false is set
        source: '/:locale/api-alias/:path*',
        destination: '/api/:path*',
        locale: false,
      },
      {
        // this gets converted to /(en|fr|de)/(.*) so will not match the top-level
        // `/` or `/fr` routes like /:path* would
        source: '/(.*)',
        destination: '/another',
      },
    ]
  },
}
```

</PagesOnly>

## Version History

| Version   | Changes          |
| --------- | ---------------- |
| `v13.3.0` | `missing` added. |
| `v10.2.0` | `has` added.     |
| `v9.5.0`  | Headers added.   |
