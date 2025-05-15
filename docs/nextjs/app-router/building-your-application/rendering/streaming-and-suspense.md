---
title: Next.js 中文文档 - 流式渲染和Suspense
description: 使用流式渲染和React Suspense在Next.js中创建更快的用户体验
---

# Next.js 中文文档 - 流式渲染和Suspense

流式渲染是一种将HTML从服务器渐进式地发送到客户端的技术。它允许您的应用程序更快地显示内容，同时异步加载较慢的部分。Next.js支持通过React Suspense实现流式渲染，使您能够创建更具响应性的用户体验。

## 流式渲染的工作原理

传统的服务器渲染会阻塞整个页面的渲染，直到所有数据都获取完成才将完整的HTML发送到客户端。但在流式渲染中：

1. 服务器生成**初始HTML**并立即发送到客户端
2. 浏览器渲染这个初始状态，使用户能够立即看到页面框架
3. 剩余的HTML块在准备好时**流式传输**到客户端
4. React**无缝地合并**这些新的HTML块到已存在的页面中

这种方法显著改善了用户体验指标，如首次内容绘制(FCP)和交互时间(TTI)。

<div style="margin: 20px 0; border-radius: 8px; padding: 20px; background-color: #f3f4f6;">
  <img src="/images/streaming-chart.png" alt="对比显示阻塞渲染与流式渲染速度差异的图表" style="width: 100%; max-width: 600px;">
  <p style="margin-top: 10px; font-style: italic; text-align: center;">流式渲染使用户能够更快地看到和交互页面</p>
</div>

## Next.js中的React Suspense

React Suspense是流式渲染的基础，它允许您：

- 将UI组件"包装"在一个可以等待的边界中
- 在异步内容加载期间显示备用内容（加载状态）
- 一旦数据准备好，自动无缝地替换备用内容

Next.js与React Suspense深度集成，使开发人员能够轻松实现优雅的加载状态和内容流。

### 基本用法

```tsx
import { Suspense } from 'react'
import Loading from './loading'
import SlowComponent from './slow-component'

export default function Page() {
  return (
    <div>
      <h1>立即显示的内容</h1>

      <Suspense fallback={<Loading />}>
        {/* SlowComponent可能会暂停渲染 */}
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

在这个例子中：

- `<h1>` 标题会立即显示
- `<Loading />` 会在等待 `SlowComponent` 数据时显示
- 当 `SlowComponent` 的数据就绪时，`Loading` 组件会自动替换为 `SlowComponent`

## 流式渲染的优势

### 1. 改善用户体验

流式渲染显著提高了感知性能和用户体验：

- **快速初始呈现**：用户立即看到页面布局，不必等待所有数据
- **渐进式内容载入**：内容随着数据到达而逐步显示，提供有意义的进度感
- **降低交互延迟**：核心页面功能可以更早地变得可交互

### 2. 避免瀑布式数据获取阻塞

没有流式渲染时，一个慢的数据请求会阻塞整个页面：

```tsx
// 没有Suspense - 必须等待所有数据
async function Page() {
  // 这些操作是顺序的，整个页面被阻塞
  const userData = await fetchUser() // 500ms
  const productData = await fetchProducts() // 500ms
  const recommendationData = await fetchRecommendations() // 1000ms
  // 总计: 2000ms
  return (
    <main>
      <UserProfile userData={userData} />
      <Products productData={productData} />
      <Recommendations recommendations={recommendationData} />
    </main>
  )
}
```

使用流式渲染，快速部分可以立即显示：

```tsx
// 使用Suspense进行流式渲染
function Page() {
  return (
    <main>
      {/* 立即显示 */}
      <h1>欢迎来到我们的商店</h1>

      {/* 500ms后显示 */}
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile />
      </Suspense>

      {/* 500ms后显示 */}
      <Suspense fallback={<ProductsSkeleton />}>
        <Products />
      </Suspense>

      {/* 1000ms后显示 */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />
      </Suspense>
    </main>
  )
}
```

### 3. 内置SEO支持

使用Next.js的流式渲染，您不需要担心SEO问题：

- 搜索引擎爬虫会接收完整的HTML
- 即使一些内容是流式传输的，整个页面内容都会被索引
- 页面的核心内容可以优先快速传递

## 流式渲染模式

### 整页流式渲染

您可以流式渲染整个页面，这对于复杂的数据依赖应用很有价值：

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import DashboardLayout from './dashboard-layout'
import DashboardSkeleton from './dashboard-skeleton'

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardLayout />
    </Suspense>
  )
}
```

### 组件级流式渲染

更常见的是在页面内流式渲染特定组件：

```tsx
// app/products/[id]/page.tsx
import { Suspense } from 'react'
import ProductInfo from './product-info'
import ProductReviews from './product-reviews'
import ProductRecommendations from './product-recommendations'
import { InfoSkeleton, ReviewsSkeleton, RecommendationsSkeleton } from './skeletons'

export default function ProductPage({ params }) {
  return (
    <div className="product-page">
      <Suspense fallback={<InfoSkeleton />}>
        <ProductInfo id={params.id} />
      </Suspense>

      <div className="product-subContent">
        <Suspense fallback={<ReviewsSkeleton />}>
          <ProductReviews id={params.id} />
        </Suspense>

        <Suspense fallback={<RecommendationsSkeleton />}>
          <ProductRecommendations id={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
```

### 嵌套Suspense边界

您可以嵌套Suspense边界以创建更复杂的加载序列：

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import MainDashboard from './main-dashboard'
import DetailSection from './detail-section'
import ActivityFeed from './activity-feed'
import { MainSkeleton, DetailsSkeleton, ActivitySkeleton, ChartSkeleton } from './skeletons'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Suspense fallback={<MainSkeleton />}>
        <MainDashboard />

        <div className="dashboard-content">
          <Suspense fallback={<DetailsSkeleton />}>
            <DetailSection />

            <Suspense fallback={<ChartSkeleton />}>
              <DetailChart />
            </Suspense>
          </Suspense>

          <Suspense fallback={<ActivitySkeleton />}>
            <ActivityFeed />
          </Suspense>
        </div>
      </Suspense>
    </div>
  )
}
```

## 使用Suspense进行数据获取

在Next.js中，您可以直接在组件内获取数据并依赖Suspense处理加载状态：

```tsx
// app/products/[id]/product-info.tsx
async function fetchProductInfo(id) {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  const res = await fetch(`https://api.example.com/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')

  return res.json()
}

export default async function ProductInfo({ id }) {
  // 这个组件会停止渲染，直到数据获取完成
  // 父Suspense边界会显示fallback内容
  const product = await fetchProductInfo(id)

  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span className="price">{product.price}</span>
    </div>
  )
}
```

## 错误处理与Suspense

Suspense可以与React错误边界配合使用，处理数据获取过程中的错误：

```tsx
// app/products/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // 记录错误到监控服务
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <h2>加载出错</h2>
      <p>{error.message || '很抱歉，加载数据时发生错误。'}</p>
      <button
        onClick={
          // 尝试恢复，重新渲染组件
          () => reset()
        }
      >
        重试
      </button>
    </div>
  )
}
```

```tsx
// app/products/page.tsx
import { Suspense } from 'react'
import ProductList from './product-list'
import { ProductListSkeleton } from './skeletons'
import Error from './error'

export default function Products() {
  return (
    <div>
      <h1>产品目录</h1>

      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
```

## 优化流式渲染性能

### 设置合理的Suspense边界

设置过多的Suspense边界会产生额外的客户端-服务器往返：

```tsx
// 不推荐: 过多的细粒度Suspense边界
<Suspense fallback={<TitleSkeleton />}>
  <ProductTitle id={id} />
</Suspense>
<Suspense fallback={<PriceSkeleton />}>
  <ProductPrice id={id} />
</Suspense>
<Suspense fallback={<DescriptionSkeleton />}>
  <ProductDescription id={id} />
</Suspense>
```

更好的方式是根据逻辑关系和加载速度分组组件：

```tsx
// 推荐: 逻辑相关的组件分组
<Suspense fallback={<ProductInfoSkeleton />}>
  <ProductInfo id={id} /> {/* 包含标题、价格和描述 */}
</Suspense>

<Suspense fallback={<ProductDetailsSkeleton />}>
  <ProductSpecs id={id} />
  <ProductOptions id={id} />
</Suspense>

<Suspense fallback={<RelatedItemsSkeleton />}>
  <RelatedProducts id={id} />
</Suspense>
```

### 预加载数据

通过预加载数据减少感知延迟：

```tsx
// app/lib/api.ts
let cachedProductData = null
let dataPromise = null

export function preloadProductData(id) {
  if (!dataPromise) {
    dataPromise = fetchProductData(id)
    dataPromise.then((data) => {
      cachedProductData = data
    })
  }
  return dataPromise
}

export async function getProductData(id) {
  if (cachedProductData) {
    return cachedProductData
  }

  if (!dataPromise) {
    dataPromise = fetchProductData(id)
    dataPromise.then((data) => {
      cachedProductData = data
    })
  }

  return dataPromise
}

async function fetchProductData(id) {
  const res = await fetch(`https://api.example.com/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product data')
  return res.json()
}
```

然后在布局或顶级组件中预加载：

```tsx
// app/products/[id]/layout.tsx
import { preloadProductData } from '@/app/lib/api'

export default function ProductLayout({ params, children }) {
  // 预加载数据，但不等待它完成
  preloadProductData(params.id)

  return <div className="product-layout">{children}</div>
}
```

## 流式渲染与SEO

Next.js的流式渲染对SEO是友好的，因为：

1. 搜索引擎爬虫会接收完整的HTML内容
2. 核心内容可以首先发送，使其对爬虫更为可见
3. 元数据组件独立于Suspense边界工作

```tsx
// app/products/[id]/page.tsx
import { Suspense } from 'react'
import ProductDetails from './product-details'
import ProductSkeleton from './product-skeleton'
import { getProductBasicInfo } from '@/lib/products'

export async function generateMetadata({ params }) {
  // 获取基本产品信息用于元数据
  // 这应该是轻量级的请求
  const basicInfo = await getProductBasicInfo(params.id)

  return {
    title: `${basicInfo.name} | 我的商店`,
    description: basicInfo.shortDescription,
    // 其他SEO相关元数据...
  }
}

export default function ProductPage({ params }) {
  return (
    <main>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>

      <noscript>
        <p className="warning">
          此页面需要JavaScript来显示完整内容。 请启用JavaScript或使用支持JavaScript的浏览器。
        </p>
      </noscript>
    </main>
  )
}
```

## 最佳实践总结

1. **设置合理的边界**：根据数据相关性和UI结构放置Suspense边界

2. **提供优质的加载状态**：使用骨架UI或加载指示器，而不仅仅是加载文本

3. **预加载关键数据**：在导航前或布局组件中开始数据获取

4. **考虑进行性能测量**：使用Web Vitals或Lighthouse跟踪实际用户体验改进

5. **分解大组件**：将大型页面分解为较小的组件，并用Suspense单独包装它们

6. **规划数据瀑布**：根据重要性排序数据获取和组件显示的顺序

## 相关API

- [`loading.js` 约定](/nextjs/app-router/api-reference/file-conventions/loading)
- [Suspense API](https://react.dev/reference/react/Suspense)
- [流式传输相关配置](/nextjs/app-router/api-reference/next-config-js/streaming)

## 下一步

要深入了解流式渲染和相关技术，请查看：

- [React Suspense 文档](https://react.dev/reference/react/Suspense) - 了解React Suspense的完整功能
- [数据获取](/nextjs/app-router/building-your-application/data-fetching) - 了解Next.js中的数据获取模式
- [加载UI和Streaming](/nextjs/app-router/building-your-application/routing/loading-ui-and-streaming) - 学习如何在路由中使用加载UI
- [错误处理](/nextjs/app-router/building-your-application/routing/error-handling) - 了解如何处理Suspense流中的错误
- [缓存机制](/nextjs/app-router/building-your-application/caching) - 了解Next.js的缓存如何与流式渲染交互

```

```
