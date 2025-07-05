---
title: sitemap.xml
description: sitemap.xml 文件的 API 参考。
related:
  title: 下一步
  description: 了解如何使用 generateSitemaps 函数。
  links:
    - app/api-reference/functions/generate-sitemaps
---

`sitemap.(xml|js|ts)` 是一个特殊文件，符合 [Sitemaps XML 格式](https://www.sitemaps.org/protocol.html)，帮助搜索引擎爬虫更高效地索引你的网站。

### 站点地图文件 (.xml)

对于较小的应用程序，你可以创建一个 `sitemap.xml` 文件并将其放置在 `app` 目录的根目录下。

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 使用代码生成站点地图 (.js, .ts)

你可以使用 `sitemap.(js|ts)` 文件约定通过导出返回 URL 数组的默认函数来以编程方式**生成**站点地图。如果使用 TypeScript，可以使用 [`Sitemap`](#返回值) 类型。

> **须知**：`sitemap.js` 是一个默认被缓存的特殊路由处理程序，除非它使用了[动态 API](/nextjs-cn/app/deep-dive/caching#dynamic-apis) 或[动态配置](/nextjs-cn/app/deep-dive/caching#segment-config-options)选项。

```ts switcher
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
```

```js switcher
export default function sitemap() {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
```

输出：

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 图像站点地图

你可以使用 `images` 属性创建图像站点地图。在 [Google 开发者文档](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps) 中了解更多详情。

```ts switcher
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: '01',
      changeFrequency: 'weekly',
      priority: 0.5,
      images: ['https://example.com/image.jpg'],
    },
  ]
}
```

输出：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>https://example.com</loc>
    <image:image>
      <image:loc>https://example.com/image.jpg</image:loc>
    </image:image>
    <lastmod>01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 视频站点地图

你可以使用 `videos` 属性创建视频站点地图。在 [Google 开发者文档](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps) 中了解更多详情。

```ts switcher
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: '01',
      changeFrequency: 'weekly',
      priority: 0.5,
      videos: [
        {
          title: 'example',
          thumbnail_loc: 'https://example.com/image.jpg',
          description: 'this is the description',
        },
      ],
    },
  ]
}
```

输出：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>https://example.com</loc>
    <video:video>
      <video:title>example</video:title>
      <video:thumbnail_loc>https://example.com/image.jpg</video:thumbnail_loc>
      <video:description>this is the description</video:description>
    </video:video>
    <lastmod>01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 生成本地化站点地图

```ts switcher
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es',
          de: 'https://acme.com/de',
        },
      },
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es/about',
          de: 'https://acme.com/de/about',
        },
      },
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es/blog',
          de: 'https://acme.com/de/blog',
        },
      },
    },
  ]
}
```

```js switcher
export default function sitemap() {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es',
          de: 'https://acme.com/de',
        },
      },
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es/about',
          de: 'https://acme.com/de/about',
        },
      },
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es/blog',
          de: 'https://acme.com/de/blog',
        },
      },
    },
  ]
}
```

输出：

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://acme.com</loc>
    <xhtml:link
      rel="alternate"
      hreflang="es"
      href="https://acme.com/es"/>
    <xhtml:link
      rel="alternate"
      hreflang="de"
      href="https://acme.com/de"/>
    <lastmod>06T15:02:24.021Z</lastmod>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <xhtml:link
      rel="alternate"
      hreflang="es"
      href="https://acme.com/es/about"/>
    <xhtml:link
      rel="alternate"
      hreflang="de"
      href="https://acme.com/de/about"/>
    <lastmod>06T15:02:24.021Z</lastmod>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <xhtml:link
      rel="alternate"
      hreflang="es"
      href="https://acme.com/es/blog"/>
    <xhtml:link
      rel="alternate"
      hreflang="de"
      href="https://acme.com/de/blog"/>
    <lastmod>06T15:02:24.021Z</lastmod>
  </url>
</urlset>
```

### 生成多个站点地图

虽然单个站点地图适用于大多数应用程序，但对于大型 Web 应用程序，你可能需要将站点地图拆分为多个文件。

有两种方法可以创建多个站点地图：

- 通过在多个路由段内嵌套 `sitemap.(xml|js|ts)`，例如 `app/sitemap.xml` 和 `app/products/sitemap.xml`。
- 通过使用 [`generateSitemaps`](/nextjs-cn/app/api-reference/functions/generate-sitemaps) 函数。

例如，要使用 `generateSitemaps` 拆分站点地图，返回带有站点地图 `id` 的对象数组。然后，使用 `id` 生成唯一的站点地图。

```ts switcher
import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/app/lib/constants'

export async function generateSitemaps() {
  // 获取产品总数并计算所需的站点地图数量
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Google 的限制是每个站点地图 50,000 个 URL
  const start = id * 50000
  const end = start + 50000
  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`,
  )
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.date,
  }))
}
```

```js switcher
import { BASE_URL } from '@/app/lib/constants'

export async function generateSitemaps() {
  // 获取产品总数并计算所需的站点地图数量
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({ id }) {
  // Google 的限制是每个站点地图 50,000 个 URL
  const start = id * 50000
  const end = start + 50000
  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`,
  )
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.date,
  }))
}
```

你生成的站点地图将可在 `/.../sitemap/[id]` 获取。例如，`/product/sitemap/1.xml`。

有关更多信息，请参阅 [`generateSitemaps` API 参考](/nextjs-cn/app/api-reference/functions/generate-sitemaps)。

## 返回值

从 `sitemap.(xml|ts|js)` 导出的默认函数应返回具有以下属性的对象数组：

```tsx
type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternates?: {
    languages?: Languages<string>
  }
}>
```

## 版本历史

| 版本       | 变更                                                  |
| ---------- | ----------------------------------------------------- |
| `v14.2.0`  | 添加本地化支持。                                      |
| `v13.4.14` | 向站点地图添加 `changeFrequency` 和 `priority` 属性。 |
| `v13.3.0`  | 引入 `sitemap`。                                      |
