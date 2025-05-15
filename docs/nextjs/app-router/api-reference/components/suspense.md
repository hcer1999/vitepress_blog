---
title: Next.js 中文文档 - Suspense
description: 使用React Suspense在数据加载期间显示后备UI以提高用户体验。
---

# Next.js 中文文档 - Suspense 组件

`Suspense`是一个React组件，允许你在子组件完成加载前展示后备UI（如加载状态），然后在加载完成后无缝切换到实际内容。在Next.js中，Suspense是实现流式渲染和渐进式水合的关键技术。

## 导入

```jsx
import { Suspense } from 'react'
```

## 属性

### `children`

需要被悬挂（可能暂停渲染）的组件。

### `fallback`

当`children`组件加载时显示的替代UI。

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

## 使用场景

### 1. 流式服务器渲染 (SSR)

在服务器渲染过程中，通过Suspense包裹的组件可以独立流式传输到客户端，而不必等待整个页面完成渲染。

```jsx
// app/dashboard/page.js
import { Suspense } from 'react'
import { DashboardMetrics, DashboardActivities, DashboardTopProducts } from './components'

export default function Dashboard() {
  return (
    <section>
      <h1>仪表盘</h1>

      {/* 核心指标可以立即加载 */}
      <Suspense fallback={<div>加载核心指标...</div>}>
        <DashboardMetrics />
      </Suspense>

      {/* 活动数据可能需要更长时间 */}
      <Suspense fallback={<div>加载活动数据...</div>}>
        <DashboardActivities />
      </Suspense>

      {/* 热门产品可能需要更长时间 */}
      <Suspense fallback={<div>加载热门产品...</div>}>
        <DashboardTopProducts />
      </Suspense>
    </section>
  )
}
```

这样，用户可以先看到页面框架和部分内容，随着数据加载完成，页面内容逐步填充。

### 2. 加载路由段

在布局组件中使用Suspense包裹页面内容，可以在路由切换时显示加载状态。

```jsx
// app/layout.js
import { Suspense } from 'react'
import Loading from './loading'

export default function Layout({ children }) {
  return (
    <html lang="zh">
      <body>
        <header>网站导航</header>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <footer>页脚内容</footer>
      </body>
    </html>
  )
}
```

### 3. 数据获取

在使用`fetch`或其他数据请求方法时，可以用Suspense提供加载状态：

```jsx
// app/products/page.js
import { Suspense } from 'react'
import ProductList from './product-list'
import Loading from './loading'

export default function ProductsPage() {
  return (
    <main>
      <h1>产品列表</h1>
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </main>
  )
}

// app/products/product-list.js
async function getProducts() {
  const res = await fetch('https://api.example.com/products')
  if (!res.ok) throw new Error('加载产品失败')
  return res.json()
}

export default async function ProductList() {
  const products = await getProducts()

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
```

### 4. 延迟加载组件

结合`React.lazy()`进行组件的延迟加载：

```jsx
// app/page.js
import { Suspense, lazy } from 'react'

// 延迟加载大型组件
const HeavyComponent = lazy(() => import('./components/heavy-component'))

export default function Page() {
  return (
    <main>
      <h1>欢迎</h1>
      {/* 使用Suspense处理延迟加载 */}
      <Suspense fallback={<div>加载中...</div>}>
        <HeavyComponent />
      </Suspense>
    </main>
  )
}
```

## 嵌套Suspense

Suspense可以嵌套使用，形成加载瀑布流，优先显示关键内容：

```jsx
// app/dashboard/page.js
import { Suspense } from 'react'
import DashboardLayout from './layout'
import UserProfile from './user-profile'
import Analytics from './analytics'
import RecentActivities from './recent-activities'

export default function Dashboard() {
  return (
    <Suspense fallback={<div>加载仪表盘...</div>}>
      <DashboardLayout>
        {/* 用户信息优先加载 */}
        <UserProfile />

        {/* 数据分析可能需要更多时间 */}
        <Suspense fallback={<div>加载数据分析...</div>}>
          <Analytics />
        </Suspense>

        {/* 活动数据可以最后加载 */}
        <Suspense fallback={<div>加载最近活动...</div>}>
          <RecentActivities />
        </Suspense>
      </DashboardLayout>
    </Suspense>
  )
}
```

## 与服务器组件结合

在Next.js中，Suspense与React服务器组件结合尤为强大：

```jsx
// app/articles/[id]/page.js
import { Suspense } from 'react'
import Article from './article'
import RelatedArticles from './related-articles'
import Comments from './comments'

export default function ArticlePage({ params }) {
  return (
    <article>
      {/* 文章内容优先加载 */}
      <Suspense fallback={<div>加载文章...</div>}>
        <Article id={params.id} />
      </Suspense>

      {/* 相关文章其次加载 */}
      <div className="related-content">
        <Suspense fallback={<div>加载相关文章...</div>}>
          <RelatedArticles articleId={params.id} />
        </Suspense>
      </div>

      {/* 评论最后加载 */}
      <section className="comments">
        <h2>评论</h2>
        <Suspense fallback={<div>加载评论...</div>}>
          <Comments articleId={params.id} />
        </Suspense>
      </section>
    </article>
  )
}
```

## 与客户端组件结合

Suspense同样适用于客户端组件，特别是在处理数据获取或动态导入时：

```jsx
'use client'

// app/dashboard/client-data-panel.js
import { Suspense, useState, useTransition } from 'react'
import { fetchClientData } from '@/lib/api'

// 使用资源进行数据加载
function ClientData({ resource }) {
  const data = resource.read()
  return <div>{/* 渲染数据 */}</div>
}

export default function ClientDataPanel() {
  const [resource, setResource] = useState(null)
  const [isPending, startTransition] = useTransition()

  function loadData() {
    // 开始过渡以避免UI卡顿
    startTransition(() => {
      const dataResource = fetchClientData()
      setResource(dataResource)
    })
  }

  return (
    <div>
      <button onClick={loadData} disabled={isPending}>
        {isPending ? '加载中...' : '加载客户端数据'}
      </button>

      {resource && (
        <Suspense fallback={<div>获取数据中...</div>}>
          <ClientData resource={resource} />
        </Suspense>
      )}
    </div>
  )
}
```

## 特殊页面文件与Suspense

Next.js的特殊文件（如`loading.js`）在内部使用Suspense实现加载状态：

```jsx
// app/dashboard/loading.js
export default function Loading() {
  return <div className="dashboard-loading">加载仪表盘...</div>
}
```

这等同于：

```jsx
// app/dashboard/layout.js
import { Suspense } from 'react'
import Loading from './loading'

export default function DashboardLayout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
```

## 错误处理与边界

将`Suspense`与`Error Boundary`结合使用，可以处理加载时可能出现的错误：

```jsx
'use client'

// app/components/error-boundary.js
import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// app/dashboard/page.js
import { Suspense } from 'react'
import { ErrorBoundary } from '../components/error-boundary'
import Dashboard from './dashboard'

export default function DashboardPage() {
  return (
    <ErrorBoundary fallback={<div>加载仪表盘时发生错误</div>}>
      <Suspense fallback={<div>加载仪表盘...</div>}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  )
}
```

## 性能优化技巧

### 1. 流式内容分块

将页面内容分解为多个Suspense区域，优先加载重要内容：

```jsx
// app/product/[id]/page.js
import { Suspense } from 'react'
import ProductHeader from './product-header'
import ProductDetails from './product-details'
import ProductReviews from './product-reviews'
import ProductRecommendations from './product-recommendations'

export default function ProductPage({ params }) {
  return (
    <main>
      {/* 核心产品信息优先加载 */}
      <Suspense fallback={<div className="skeleton-header" />}>
        <ProductHeader id={params.id} />
      </Suspense>

      <div className="product-content">
        {/* 产品详情其次加载 */}
        <Suspense fallback={<div className="skeleton-details" />}>
          <ProductDetails id={params.id} />
        </Suspense>

        <div className="secondary-content">
          {/* 评论可以延后加载 */}
          <Suspense fallback={<div className="skeleton-reviews" />}>
            <ProductReviews id={params.id} />
          </Suspense>

          {/* 推荐产品最后加载 */}
          <Suspense fallback={<div className="skeleton-recommendations" />}>
            <ProductRecommendations id={params.id} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
```

### 2. 渐进增强的UI

设计具有渐进增强的后备UI，提供更好的用户体验：

```jsx
// app/components/data-table.js
import { Suspense } from 'react'
import TableSkeleton from './table-skeleton'
import TableData from './table-data'

export default function DataTable({ query }) {
  return (
    <Suspense
      fallback={
        <TableSkeleton rows={10} columns={5} showPulse={true} message="数据加载中，请稍候..." />
      }
    >
      <TableData query={query} />
    </Suspense>
  )
}
```

### 3. 避免加载瀑布

在某些情况下，你可能希望数据并行加载但UI分步显示，可以将数据预加载与UI渲染分开：

```jsx
// app/dashboard/page.js
import { Suspense } from 'react'
import { preloadDashboardData } from '@/lib/preload'

export default function DashboardPage() {
  // 预先触发所有数据加载，但UI仍然分步显示
  preloadDashboardData()

  return (
    <main>
      <h1>仪表盘</h1>

      <Suspense fallback={<div>加载统计数据...</div>}>
        <DashboardStats />
      </Suspense>

      <Suspense fallback={<div>加载图表...</div>}>
        <DashboardCharts />
      </Suspense>
    </main>
  )
}

// lib/preload.js
export function preloadDashboardData() {
  // 预加载所有数据
  fetchDashboardStats()
  fetchDashboardCharts()
}
```

## 最佳实践

### 关键使用原则

1. **识别页面的关键部分**：确定哪些内容对用户最为重要，应该优先加载
2. **设计有意义的后备UI**：后备UI应该与最终内容尺寸相匹配，减少布局偏移
3. **避免过度使用**：不要为每个组件都添加Suspense，而是在逻辑边界处使用
4. **结合Error Boundary**：总是考虑错误情况，提供适当的错误UI

### 典型应用模式

1. **页面骨架加载**

   ```jsx
   <Suspense fallback={<PageSkeleton />}>
     <PageContent />
   </Suspense>
   ```

2. **内容水平分块**

   ```jsx
   <header>
     <SiteNavigation />
   </header>
   <Suspense fallback={<MainContentSkeleton />}>
     <MainContent />
   </Suspense>
   <Suspense fallback={<SidebarSkeleton />}>
     <Sidebar />
   </Suspense>
   ```

3. **内容垂直分块**

   ```jsx
   <Suspense fallback={<HeroSkeleton />}>
     <HeroSection />
   </Suspense>
   <Suspense fallback={<FeaturesSkeleton />}>
     <FeaturesSection />
   </Suspense>
   <Suspense fallback={<TestimonialsSkeleton />}>
     <TestimonialsSection />
   </Suspense>
   ```

4. **延迟加载低优先级内容**

   ```jsx
   {
     /* 主要内容立即加载 */
   }
   ;<MainContent />

   {
     /* 低优先级内容延迟加载 */
   }
   ;<Suspense fallback={null}>
     <LowPriorityContent />
   </Suspense>
   ```

## 常见陷阱与解决方案

### 1. 嵌套Suspense导致加载瀑布

**问题**：过多的嵌套Suspense可能导致串行加载，延长整体加载时间。

**解决方案**：预加载数据，但UI仍然分阶段显示。

```jsx
// 不推荐：嵌套会形成加载瀑布
<Suspense fallback={<Loading1 />}>
  <ComponentA>
    <Suspense fallback={<Loading2 />}>
      <ComponentB>
        <Suspense fallback={<Loading3 />}>
          <ComponentC />
        </Suspense>
      </ComponentB>
    </Suspense>
  </ComponentA>
</Suspense>

// 推荐：扁平化结构，并行加载
<div>
  <Suspense fallback={<Loading1 />}>
    <ComponentA />
  </Suspense>
  <Suspense fallback={<Loading2 />}>
    <ComponentB />
  </Suspense>
  <Suspense fallback={<Loading3 />}>
    <ComponentC />
  </Suspense>
</div>
```

### 2. 布局偏移 (CLS)

**问题**：加载状态与最终内容尺寸不匹配，导致内容跳动。

**解决方案**：设计占位符使其尺寸接近最终内容。

```jsx
// 不推荐：简单文本占位符会导致布局偏移
<Suspense fallback={<div>加载中...</div>}>
  <DataTable />
</Suspense>

// 推荐：结构化骨架屏，维持布局稳定
<Suspense
  fallback={
    <div className="table-skeleton" style={{ height: '400px', width: '100%' }}>
      {/* 类似表格的骨架结构 */}
    </div>
  }
>
  <DataTable />
</Suspense>
```

### 3. 资源争用

**问题**：多个Suspense组件同时加载可能导致资源争用，影响关键内容加载。

**解决方案**：使用`useTransition`或优先级API控制加载顺序。

```jsx
'use client'

import { Suspense, useTransition } from 'react'

export default function Dashboard() {
  const [isPending, startTransition] = useTransition()
  const [showDetails, setShowDetails] = useState(false)

  function handleShowDetails() {
    // 将非关键UI更新标记为过渡
    startTransition(() => {
      setShowDetails(true)
    })
  }

  return (
    <div>
      {/* 关键内容 */}
      <Suspense fallback={<CoreDataSkeleton />}>
        <CoreDashboardData />
      </Suspense>

      <button onClick={handleShowDetails}>{isPending ? '加载中...' : '显示详细信息'}</button>

      {/* 次要内容，仅在需要时加载 */}
      {showDetails && (
        <Suspense fallback={<DetailsSkeleton />}>
          <DashboardDetails />
        </Suspense>
      )}
    </div>
  )
}
```

## 调试技巧

### 模拟慢速加载

可以在开发环境中模拟慢网络，测试Suspense边界：

```jsx
// app/components/product-data.js
async function getProductData(id) {
  const res = await fetch(`https://api.example.com/products/${id}`)

  // DEV环境模拟延迟
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  if (!res.ok) throw new Error('Failed to fetch product data')
  return res.json()
}

export default async function ProductData({ id }) {
  const data = await getProductData(id)
  return <div>{/* 渲染产品数据 */}</div>
}
```

### 使用React开发者工具

React开发者工具可以帮助识别Suspense边界和组件的挂起状态：

```jsx
// 在开发环境启用特殊调试标记
<Suspense
  fallback={<Loading />}
  unstable_expectedLoadTime={2000} // 仅用于调试
>
  <Component />
</Suspense>
```

## 总结

Suspense是React和Next.js中实现优雅加载体验的强大工具。通过将UI分解为独立加载单元并提供有意义的加载状态，你可以：

1. 提高用户感知性能
2. 实现流式服务器渲染
3. 优先加载关键内容
4. 防止用户界面锁定
5. 创建更平滑的加载体验

正确使用Suspense有助于构建感觉快速且反应灵敏的应用，即使在较慢的网络或处理大量数据时也能保持良好的用户体验。

## 相关资源

- [React Suspense文档](https://react.dev/reference/react/Suspense)
- [Next.js数据获取](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [流式服务器渲染](https://nextjs.org/docs/app/building-your-application/rendering/server-components#streaming)
