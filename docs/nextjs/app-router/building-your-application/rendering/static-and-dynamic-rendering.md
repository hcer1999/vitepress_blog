---
title: Next.js 中文文档 - 静态和动态渲染
description: 了解Next.js中的静态和动态渲染以及它们如何影响您的应用程序性能
---

# Next.js 中文文档 - 静态和动态渲染

Next.js允许您选择路由级别的渲染策略：静态渲染或动态渲染。本指南将帮助您理解这两种渲染方法之间的差异，以及如何根据您的应用需求选择最合适的渲染方式。

## 渲染环境

在讨论静态和动态渲染之前，了解Next.js的渲染环境很重要：

1. **服务器环境**：在这里，您的组件在用户请求时或构建时在服务器上渲染
2. **客户端环境**：在用户的浏览器中，JavaScript代码在这里执行并使页面具有交互性

Next.js允许您为每个路由选择最合适的渲染方法，根据该路由的特定需求来优化性能。

## 静态渲染

静态渲染（也称为预渲染）是指在**构建时**或者在**数据重新验证**期间，服务器上预先渲染路由。结果会被缓存并在多个用户请求之间重用。

### 静态渲染的工作原理

当使用静态渲染时：

1. 在构建时或者使用[增量静态再生成(ISR)](/nextjs/app-router/building-your-application/data-fetching/revalidating)时，路由的HTML和JSON数据被生成并缓存
2. 缓存的内容可以分发到CDN（内容分发网络）上，接近用户的位置
3. 当用户访问路由时，缓存的内容立即提供服务，无需服务器处理

```tsx
// app/blog/page.tsx - 静态渲染示例
// 默认情况下，没有动态函数或获取请求的路由是静态渲染的
export default function Blog() {
  return (
    <main>
      <h1>博客文章列表</h1>
      {/* 静态内容 */}
    </main>
  )
}
```

### 静态数据获取

即使您的路由包含数据获取，只要数据在构建时可用，它仍然可以静态渲染：

```tsx
// app/products/page.tsx - 静态数据获取示例
export default async function Products() {
  // 此数据获取发生在构建时或重新验证期间
  // 结果被缓存并重用于每个请求
  const products = await fetchProducts()

  return (
    <main>
      <h1>产品列表</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  )
}
```

### 静态渲染的优势

静态渲染提供许多重要的优势：

- **更快的初始页面加载**：预渲染的内容可以立即提供服务和缓存在CDN上
- **减轻服务器负担**：服务器不需要在每个用户请求时生成页面
- **更好的SEO**：搜索引擎爬虫可以更容易地索引完全呈现的内容
- **更低的基础设施成本**：减少服务器计算需求
- **更高的可靠性**：即使后端服务暂时不可用，静态内容仍可提供服务

### 适用场景

静态渲染最适合：

- 营销页面、博客文章、产品列表等内容不经常变化的页面
- 无需个性化内容的公共页面
- 纯展示性内容，如文档或教程
- 非常注重SEO的页面，如登陆页面

## 动态渲染

动态渲染是指在**用户请求时**（而不是在构建时）在服务器上渲染路由。每个用户请求都会触发一次新的渲染。

### 动态渲染的工作原理

当使用动态渲染时：

1. 当用户请求路由时，服务器为该特定请求生成HTML
2. 服务器发送生成的HTML以及必要的JavaScript
3. 浏览器接收HTML并显示内容，然后JavaScript使页面具有交互性

```tsx
// app/dashboard/page.tsx - 使用动态函数
import { cookies } from 'next/headers'

export default function Dashboard() {
  // 使用cookies()是一个动态函数
  // 这会使整个路由动态渲染
  const userCookie = cookies().get('user')
  const user = userCookie ? JSON.parse(userCookie.value) : null

  return (
    <main>
      <h1>欢迎, {user ? user.name : '访客'}</h1>
      {/* 动态内容 */}
    </main>
  )
}
```

### 触发动态渲染的操作

以下任何操作都会导致路由使用动态渲染：

1. **使用动态函数**：

   - `cookies()`
   - `headers()`
   - `searchParams` prop
   - 某些React钩子（例如`useSearchParams`）

2. **设置特定缓存选项的数据请求**：

   - `fetch(URL, { cache: 'no-store' })`
   - `fetch(URL, { next: { revalidate: 0 } })`

3. **路由段配置**：
   - 设置 `export const dynamic = 'force-dynamic'`

```tsx
// app/stock-prices/page.tsx - 动态数据获取示例
export default async function StockPrices() {
  // 此数据获取将在每个请求上执行
  // 设置 cache: 'no-store' 以使其动态
  const stocks = await fetch('https://api.example.com/stocks', {
    cache: 'no-store',
  }).then((res) => res.json())

  return (
    <main>
      <h1>当前股票价格</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol}: {stock.price}
          </li>
        ))}
      </ul>
      <p>最后更新时间: {new Date().toLocaleTimeString()}</p>
    </main>
  )
}
```

### 动态渲染的优势

动态渲染提供了这些关键优势：

- **实时数据**：可以显示实时或频繁变化的信息
- **用户特定内容**：可以为每个用户渲染个性化内容
- **请求时信息**：可以访问只有在请求时才知道的信息（如cookies或URL参数）
- **更灵活的缓存控制**：可以按需更新内容，而不依赖于固定的重新验证间隔

### 适用场景

动态渲染最适合：

- 仪表板、用户个人资料等需要用户特定信息的页面
- 电子商务网站上需要实时库存或价格信息的页面
- 依赖于查询参数或实时API数据的搜索结果页面
- 有频繁更新内容的高度交互式应用程序

## 选择合适的渲染策略

Next.js默认选择静态渲染以优化性能，除非检测到使用动态功能。这是一个有意的默认选择，因为静态渲染通常提供更好的用户体验。

### 静态渲染的选择原因

选择静态渲染当：

- 页面内容对所有用户相同
- 数据可以在构建时获取
- 内容不经常变化
- 性能和SEO是关键优先事项

### 动态渲染的选择原因

选择动态渲染当：

- 内容需要是实时的或频繁更新
- 页面显示用户特定信息
- 内容依赖于请求时的信息（如cookies或URL参数）
- 页面需要访问只有在用户请求时才知道的信息

### 混合渲染方法

即使在单个页面中，您也可以混合使用静态和动态内容：

```tsx
// app/hybrid/page.tsx
import { Suspense } from 'react'
import StaticContent from './static-content'
import DynamicContent from './dynamic-content'

export default function HybridPage() {
  return (
    <main>
      {/* 静态部分 - 对所有用户相同 */}
      <StaticContent />

      {/* 动态部分 - 每个请求生成 */}
      <Suspense fallback={<p>加载中...</p>}>
        <DynamicContent />
      </Suspense>
    </main>
  )
}
```

## 配置渲染行为

Next.js提供了多种配置路由渲染行为的方式。

### 使用路由段配置

您可以明确设置路由的渲染行为，使用路由段配置选项：

```tsx
// app/products/[id]/page.tsx - 强制动态渲染
export const dynamic = 'force-dynamic'

export default function Product({ params }) {
  // 即使没有动态数据获取，此路由也将始终动态渲染
  return <div>产品ID: {params.id}</div>
}
```

```tsx
// app/posts/[slug]/page.tsx - 强制静态渲染
export const dynamic = 'force-static'

export default function Post({ params }) {
  // 此路由将被静态生成，即使有动态参数
  // 您需要提供generateStaticParams以预渲染所有可能的路径
  return <div>文章: {params.slug}</div>
}
```

### 配置选项

主要的路由段配置选项包括：

| 配置选项                          | 说明                                   |
| --------------------------------- | -------------------------------------- |
| `dynamic = 'auto'`                | 默认值。根据使用的功能自动确定渲染类型 |
| `dynamic = 'force-dynamic'`       | 强制路由动态渲染                       |
| `dynamic = 'force-static'`        | 强制路由静态渲染，忽略动态函数         |
| `revalidate = 3600`               | 设置静态路由的缓存生命周期，单位为秒   |
| `fetchCache = 'auto'`             | 默认值。遵循每个fetch请求的缓存指令    |
| `fetchCache = 'default-cache'`    | 所有fetch默认缓存                      |
| `fetchCache = 'only-cache'`       | 所有fetch必须缓存或预加载              |
| `fetchCache = 'force-cache'`      | 所有fetch使用force-cache               |
| `fetchCache = 'default-no-store'` | 所有fetch默认为no-store                |
| `fetchCache = 'only-no-store'`    | 所有fetch必须使用no-store              |
| `fetchCache = 'force-no-store'`   | 所有fetch使用force-no-store            |

### 示例：配置动态渲染

```tsx
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Dashboard() {
  const data = await fetch('https://api.example.com/dashboard')
  const dashboard = await data.json()

  return (
    <main>
      <h1>仪表板</h1>
      <p>最后更新时间：{new Date().toLocaleTimeString()}</p>
      {/* 仪表板内容 */}
    </main>
  )
}
```

### 示例：配置静态渲染与ISR

```tsx
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // 每小时重新验证

// 预渲染特定路径
export async function generateStaticParams() {
  const posts = await fetchPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }) {
  const post = await fetchPostBySlug(params.slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>发布于: {new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

## 部分预渲染（实验性）

Next.js正在开发部分预渲染，这是一种混合方法，允许在同一路由中使用静态和动态部分：

```tsx
// 这是一个未来的API（实验性）示例
export default async function Page() {
  // 静态外壳立即加载
  return (
    <main>
      <h1>欢迎使用我的应用</h1>

      {/* 动态内容在请求时加载 */}
      <Suspense fallback={<p>加载个性化内容...</p>}>
        <DynamicPersonalizedContent />
      </Suspense>

      {/* 这部分是静态的 */}
      <ImportantStaticInfo />
    </main>
  )
}
```

部分预渲染将允许：

1. 静态生成尽可能多的内容以获取性能
2. 对需要动态生成的内容进行流式传输
3. 保持页面的整体静态外壳以提供快速初始加载

## 渲染性能优化

无论您选择哪种渲染策略，这里有一些优化性能的技巧：

### 静态渲染优化

1. **增量静态再生成(ISR)**：使用`revalidate`设置合理的重新验证周期
2. **并行数据获取**：同时获取多个数据源
3. **使用generateStaticParams**：预渲染动态路由的所有预期变体
4. **懒加载非关键内容**：推迟加载视口之外的内容
5. **图像优化**：使用Next.js的图像组件自动优化图像

### 动态渲染优化

1. **流式渲染**：使用React Suspense将页面分解为流式段
2. **使用CDN缓存API响应**：降低源服务器负载
3. **最小化阻塞数据获取**：避免长链数据依赖
4. **使用边缘运行时**：当合适时使用Edge运行时减少冷启动延迟
5. **避免不必要的渲染**：仅使需要动态的部分动态化

## 测试和调试渲染行为

### 确定渲染类型

要检查您的页面是静态还是动态渲染，您可以：

1. 使用Next.js开发工具
2. 查看代码中的缓存设置
3. 在页面上添加时间戳并多次刷新观察是否变化
4. 检查构建日志中预渲染的路由

### 常见问题排查

1. **意外的动态渲染**

   - 检查是否有使用动态函数
   - 查找设置了`cache: 'no-store'`的fetch请求
   - 检查路由段配置是否有`dynamic='force-dynamic'`

2. **缓存未更新**

   - 检查重新验证设置
   - 确认正确实现了ISR
   - 尝试手动清除服务器缓存

3. **静态页面显示过时数据**
   - 调整重新验证时间间隔
   - 对频繁变化的内容考虑使用动态渲染
   - 实现按需重新验证

## 下一步

要深入了解渲染和性能优化，请查看：

- [服务器组件](/nextjs/app-router/building-your-application/rendering/server-components)：了解服务器组件如何与渲染策略交互
- [客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)：学习在哪里使用客户端组件
- [数据获取](/nextjs/app-router/building-your-application/data-fetching)：探索与渲染策略相关的数据获取模式
- [缓存机制](/nextjs/app-router/building-your-application/caching)：详细了解Next.js的缓存层
- [Edge和Node.js运行时](/nextjs/app-router/building-your-application/rendering/edge-and-nodejs-runtimes)：了解不同运行时如何影响渲染
