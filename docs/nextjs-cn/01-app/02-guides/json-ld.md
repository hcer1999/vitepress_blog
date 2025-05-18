---
title: 如何在 Next.js 应用程序中实现 JSON-LD
nav_title: JSON-LD
description: 学习如何在 Next.js 应用程序中添加 JSON-LD，向搜索引擎和 AI 描述你的内容。
---

[JSON-LD](https://json-ld.org/) 是一种结构化数据格式，可以被搜索引擎和 AI 用来帮助它们理解页面的结构，而不仅仅是纯内容。例如，你可以用它来描述一个人、一个事件、一个组织、一部电影、一本书、一个食谱，以及许多其他类型的实体。

我们目前对 JSON-LD 的建议是在 `layout.js` 或 `page.js` 组件中以 `<script>` 标签的形式渲染结构化数据。例如：

```tsx filename="app/products/[id]/page.tsx" switcher
export default async function Page({ params }) {
  const { id } = await params
  const product = await getProduct(id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  }

  return (
    <section>
      {/* 将 JSON-LD 添加到你的页面 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  )
}
```

```jsx filename="app/products/[id]/page.js" switcher
export default async function Page({ params }) {
  const { id } = await params
  const product = await getProduct(id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  }

  return (
    <section>
      {/* 将 JSON-LD 添加到你的页面 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  )
}
```

你可以使用 [Rich Results Test](https://search.google.com/test/rich-results) 工具（针对 Google）或通用的 [Schema Markup Validator](https://validator.schema.org/) 来验证和测试你的结构化数据。

你可以使用社区包如 [`schema-dts`](https://www.npmjs.com/package/schema-dts) 在 TypeScript 中为你的 JSON-LD 添加类型：

```tsx
import { Product, WithContext } from 'schema-dts'

const jsonLd: WithContext<Product> = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Next.js Sticker',
  image: 'https://nextjs.org/imgs/sticker.png',
  description: 'Dynamic at the speed of static.',
}
```
