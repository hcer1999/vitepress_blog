---
title: generateSitemaps
nav_title: generateSitemaps
description: 了解如何使用 generateSiteMaps 函数为应用程序创建多个站点地图。
related:
  title: 后续步骤
  description: 了解如何为 Next.js 应用程序创建站点地图。
  links:
    - app/api-reference/file-conventions/metadata/sitemap
---

你可以使用 `generateSitemaps` 函数为你的应用程序生成多个站点地图。

## 返回值

`generateSitemaps` 返回一个包含 `id` 属性的对象数组。

## URL

你生成的站点地图将在 `/.../sitemap/[id].xml` 可用。例如，`/product/sitemap/1.xml`。

## 示例

例如，要使用 `generateSitemaps` 拆分站点地图，返回一个包含站点地图 `id` 的对象数组。然后，使用 `id` 生成唯一的站点地图。

```ts filename="app/product/sitemap.ts" switcher
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

```js filename="app/product/sitemap.js" switcher
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
    url: `${BASE_URL}/product/${id}`,
    lastModified: product.date,
  }))
}
```

## 版本历史

| 版本      | 变更                                                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `v15.0.0` | `generateSitemaps` 现在在开发和生产环境之间生成一致的 URL                                                                    |
| `v13.3.2` | 引入 `generateSitemaps`。在开发环境中，你可以在 `/.../sitemap.xml/[id]` 查看生成的站点地图。例如，`/product/sitemap.xml/1`。 |
