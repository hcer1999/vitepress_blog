---
title: Next.js 中文文档 - 加载UI和流式传输
description: 使用加载状态和流式传输技术提升用户体验
---

# Next.js 中文文档 - 加载UI和流式传输

App Router内置了一套加载状态和流式传输的解决方案，帮助你创建一个优秀的用户体验。

## 即时加载状态

即时加载状态是在导航期间立即显示的备用UI，此类型的加载状态可以通过特殊的`loading.js`文件创建。

```
app/dashboard/loading.tsx  // 在导航到dashboard时显示
```

在路由导航过程中，`loading.js`会在新路由段的内容加载期间被立即显示，当内容准备就绪时，`loading.js`会自动被新内容替换。

![Loading UI示意图](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Floading-ui.png&w=1920&q=75&dpl=dpl_FXM1t9sbiVDnPakvExiNRDxDfQ2q)

### 示例代码

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>正在加载数据...</p>
    </div>
  )
}
```

在`loading.js`文件中，你可以使用各种加载UI，如骨架屏、加载指示器或最小信息量，创造良好的用户体验。

### 自动包装

Next.js会自动用`<Suspense>`边界包装`page.js`和`loading.js`之间的内容。`loading.js`在被导航导向页面加载期间作为回退内容显示，当页面内容准备好后自动转换。

```tsx
<Layout>
  <Suspense fallback={<Loading />}>
    <Page />
  </Suspense>
</Layout>
```

## 流式传输

Next.js利用React的Suspense和SSR流式传输功能，允许你从服务器向客户端逐步流式传输已渲染的HTML。这样用户可以先看到页面的部分内容，而不必等待整个页面渲染完成。

### 流式传输的工作原理

![流式传输工作原理](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming.png&w=1920&q=75&dpl=dpl_FXM1t9sbiVDnPakvExiNRDxDfQ2q)

1. Next.js在服务器上创建初始HTML
2. 该HTML被发送到客户端并显示出来
3. React hydration开始处理交互部分
4. 慢速数据请求通过Suspense边界流式传输，在加载期间显示你定义的fallback
5. 当数据准备好后，相应UI部分自动显示

### 流式传输示例

下面的例子展示了如何使用`<Suspense>`来流式传输Dashboard组件：

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { RevenueChart, LatestOrders, InventoryStock } from '@/components'

export default function Dashboard() {
  return (
    <main>
      <h1>仪表盘</h1>

      {/* 首先显示RevenueChart（可能速度快） */}
      <Suspense fallback={<div>加载收入图表...</div>}>
        <RevenueChart />
      </Suspense>

      <div className="grid gap-6 grid-cols-2">
        {/* LatestOrders可能需要较长时间加载 */}
        <Suspense fallback={<div>加载最新订单...</div>}>
          <LatestOrders />
        </Suspense>

        {/* InventoryStock也可能是较慢组件 */}
        <Suspense fallback={<div>加载库存信息...</div>}>
          <InventoryStock />
        </Suspense>
      </div>
    </main>
  )
}
```

### 组件级别的加载状态

除了路由级别的`loading.js`，你还可以在单个组件级别使用`<Suspense>`，更精细地控制应用程序的加载体验。

例如创建一个带加载状态的产品详情组件：

```tsx
// components/ProductDetails.tsx
import { Suspense } from 'react'

// 带加载状态的产品图片组件
function ProductImage({ id }) {
  return (
    <Suspense fallback={<div className="image-skeleton"></div>}>
      <AsyncProductImage id={id} />
    </Suspense>
  )
}

// 带加载状态的产品信息组件
function ProductInfo({ id }) {
  return (
    <Suspense fallback={<div className="info-skeleton"></div>}>
      <AsyncProductInfo id={id} />
    </Suspense>
  )
}

// 带加载状态的产品评论组件
function ProductReviews({ id }) {
  return (
    <Suspense fallback={<div className="reviews-skeleton"></div>}>
      <AsyncProductReviews id={id} />
    </Suspense>
  )
}

// 组合所有子组件的产品详情主组件
export function ProductDetails({ id }) {
  return (
    <div className="product-container">
      <ProductImage id={id} />
      <ProductInfo id={id} />
      <ProductReviews id={id} />
    </div>
  )
}
```

在这个例子中，每个产品详情部分都可以独立加载，先到先显示，避免了快速组件被最慢组件阻塞的问题。

## SEO和流式传输

当使用流式传输时，Next.js仍会等待初始HTML生成，包括元数据，然后再开始传输。这确保了搜索引擎和社交媒体平台能够正确爬取你的页面信息。

只有在初始HTML之后流式传输的内容才会延迟加载，而不影响关键的SEO元数据。

## 取消请求

当用户在加载完成前导航到其他页面，Next.js会自动取消流式内容的数据请求，优化性能和减少不必要的计算和网络请求。

## 骨架屏设计

下面是一个使用骨架屏的例子，提供更好的视觉效果：

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="dashboard-skeleton">
      <div className="header-skeleton">
        <div className="title-skeleton"></div>
        <div className="actions-skeleton"></div>
      </div>

      <div className="chart-skeleton">
        <div className="chart-header-skeleton"></div>
        <div className="chart-body-skeleton"></div>
      </div>

      <div className="grid-skeleton">
        <div className="card-skeleton">
          <div className="card-header-skeleton"></div>
          <div className="card-content-skeleton"></div>
        </div>
        <div className="card-skeleton">
          <div className="card-header-skeleton"></div>
          <div className="card-content-skeleton"></div>
        </div>
      </div>
    </div>
  )
}
```

配合以下CSS（你也可以使用Tailwind CSS）：

```css
/* 骨架屏样式 */
.dashboard-skeleton {
  width: 100%;
  padding: 20px;
}

.title-skeleton {
  height: 32px;
  width: 200px;
  background: #eee;
  border-radius: 4px;
  margin-bottom: 16px;
  animation: pulse 1.5s infinite;
}

.chart-skeleton {
  height: 300px;
  background: #eee;
  border-radius: 8px;
  margin-bottom: 24px;
  animation: pulse 1.5s infinite;
}

.card-skeleton {
  height: 200px;
  background: #eee;
  border-radius: 8px;
  margin-bottom: 16px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
```

## 最佳实践

1. **嵌套路由加载状态**：在每个需要的路由段使用`loading.js`，提供多级加载体验

2. **合理使用Suspense边界**：在组件级别包装数据加载组件，避免整个页面等待最慢的数据

3. **路由组加载**：在路由组中使用单个`loading.js`文件可以为整个路由组提供加载体验

4. **微调加载体验**：使用CSS动画、渐变效果和骨架屏提升加载状态的视觉效果

5. **分解大组件**：将大型页面分解为较小的组件，并用Suspense单独包装它们

6. **规划数据瀑布**：根据重要性排序数据获取和组件显示的顺序

## 相关API

- [`loading.js` 约定](/nextjs/app-router/api-reference/file-conventions/loading)
- [Suspense API](https://react.dev/reference/react/Suspense)
- [流式传输相关配置](/nextjs/app-router/api-reference/next-config-js/streaming)
