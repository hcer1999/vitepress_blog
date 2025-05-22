---
title: robots.txt
description: robots.txt 文件的 API 参考。
---

在 `app` 目录的**根目录**中添加或生成符合[机器人排除标准](https://en.wikipedia.org/wiki/Robots.txt#Standard)的 `robots.txt` 文件，以告诉搜索引擎爬虫他们可以访问你网站上的哪些 URL。

## 静态 `robots.txt`

```txt filename="app/robots.txt"
User-Agent: *
Allow: /
Disallow: /private/

Sitemap: https://acme.com/sitemap.xml
```

## 生成 Robots 文件

添加一个返回 [`Robots` 对象](#robots-对象)的 `robots.js` 或 `robots.ts` 文件。

> **须知**：`robots.js` 是一个默认被缓存的特殊路由处理程序，除非它使用了[动态 API](/docs/app/deep-dive/caching#dynamic-apis)或[动态配置](/docs/app/deep-dive/caching#segment-config-options)选项。

```ts filename="app/robots.ts" switcher
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
```

```js filename="app/robots.js" switcher
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
```

输出：

```txt
User-Agent: *
Allow: /
Disallow: /private/

Sitemap: https://acme.com/sitemap.xml
```

### 自定义特定用户代理

你可以通过向 `rules` 属性传递用户代理数组来自定义各个搜索引擎机器人如何爬取你的网站。例如：

```ts filename="app/robots.ts" switcher
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: '/private/',
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
```

```js filename="app/robots.js" switcher
export default function robots() {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/private/'],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
```

输出：

```txt
User-Agent: Googlebot
Allow: /
Disallow: /private/

User-Agent: Applebot
Disallow: /

User-Agent: Bingbot
Disallow: /

Sitemap: https://acme.com/sitemap.xml
```

### Robots 对象

```tsx
type Robots = {
  rules:
    | {
        userAgent?: string | string[]
        allow?: string | string[]
        disallow?: string | string[]
        crawlDelay?: number
      }
    | Array<{
        userAgent: string | string[]
        allow?: string | string[]
        disallow?: string | string[]
        crawlDelay?: number
      }>
  sitemap?: string | string[]
  host?: string
}
```

## 版本历史

| 版本      | 变更            |
| --------- | --------------- |
| `v13.3.0` | 引入 `robots`。 |
