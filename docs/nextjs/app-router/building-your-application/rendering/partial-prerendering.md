---
title: Next.js 中文文档 - 部分预渲染
description: 了解Next.js的部分预渲染功能如何结合静态和动态内容的优势
---

# Next.js 中文文档 - 部分预渲染

部分预渲染（Partial Prerendering）是Next.js的一项实验性功能，它允许您在同一页面中兼具静态内容和动态内容的优势。这种混合渲染方法能够提供更快的初始加载体验，同时保持动态内容的灵活性。

## 部分预渲染概述

部分预渲染是Next.js渲染策略的一项重要创新，它解决了长期以来静态渲染与动态渲染之间的二选一问题。

通过部分预渲染，Next.js可以：

1. 在构建时生成页面的静态"外壳"（静态HTML）
2. 在该静态外壳中包含"空白区域"，用于动态内容
3. 在用户请求时，同时流式传输动态内容以填充这些空白区域

这种方法结合了静态渲染的性能优势和动态渲染的灵活性，创造了"最佳两者兼得"的渲染策略。

## 工作原理

### 传统渲染模型的限制

在理解部分预渲染之前，让我们回顾传统的渲染模型：

- **静态渲染**：整个页面在构建时预渲染，速度快但不够灵活
- **动态渲染**：整个页面在请求时渲染，灵活但初始加载较慢

这两种方法之间存在一个基本的权衡：性能与灵活性难以兼得。

### 部分预渲染的创新

部分预渲染通过React Suspense的创新使用，实现了一种混合渲染策略：

1. **静态外壳**：页面的静态部分在构建时预渲染，并立即发送给用户
2. **静态内容流**：页面的静态部分在CDN上缓存并快速交付
3. **动态岛屿**：页面中的动态区域被Suspense边界包裹
4. **并行流处理**：动态内容在用户查看静态内容的同时流式传输

<div style="margin: 20px 0; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f8f9fa;">
  <h3 style="margin-top: 0;">部分预渲染的视觉表示</h3>

  <div style="display: flex; margin-bottom: 15px;">
    <div style="flex: 1; padding: 10px; background-color: #e6f7ff; border-radius: 4px; margin-right: 10px;">
      <strong>请求时</strong>
      <div style="height: 100px; margin-top: 10px; background-color: #bae7ff; border-radius: 4px; position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">静态外壳立即加载</div>
      </div>
    </div>
    <div style="flex: 1; padding: 10px; background-color: #e6f7ff; border-radius: 4px;">
      <strong>流式传输阶段</strong>
      <div style="height: 100px; margin-top: 10px; background-color: #bae7ff; border-radius: 4px; position: relative;">
        <div style="position: absolute; width: 80%; height: 30px; top: 35px; left: 10%; background-color: #fff; border: 1px dashed #1890ff; border-radius: 4px;"></div>
        <div style="position: absolute; top: 75%; left: 50%; transform: translate(-50%, -50%); font-size: 12px;">动态内容区域（流式传输中）</div>
      </div>
    </div>
  </div>

  <div style="padding: 10px; background-color: #e6f7ff; border-radius: 4px;">
    <strong>完成加载</strong>
    <div style="height: 100px; margin-top: 10px; background-color: #bae7ff; border-radius: 4px; position: relative;">
      <div style="position: absolute; width: 80%; height: 30px; top: 35px; left: 10%; background-color: #91caff; border-radius: 4px; display: flex; justify-content: center; align-items: center;">动态内容加载完成</div>
    </div>
  </div>
</div>

### 技术实现

部分预渲染在技术上是通过以下方式实现的：

1. **静态-动态分界**：React Suspense用于标记页面的哪些部分是静态的，哪些部分是动态的
2. **编译时优化**：Next.js编译器识别Suspense边界并据此分离静态和动态内容
3. **混合HTML流**：服务器发送包含静态内容的初始HTML，然后流式传输动态内容

## 使用部分预渲染

> **注意**：部分预渲染目前是一项实验性功能，可能会在未来的版本中发生变化。

### 启用部分预渲染

要在Next.js项目中启用部分预渲染，首先在`next.config.js`中开启此实验性功能：

```js
// next.config.js
module.exports = {
  experimental: {
    partialPrerendering: true,
  },
}
```

### 基本用法示例

使用部分预渲染的基本模式如下：

```tsx
// app/page.tsx
import { Suspense } from 'react'
import StaticContent from './static-content'
import DynamicContent from './dynamic-content'

export default function Page() {
  return (
    <main>
      {/* 这部分在构建时预渲染 */}
      <h1>我的应用</h1>
      <StaticContent />

      {/* 这部分在请求时渲染并流式传输 */}
      <Suspense fallback={<p>加载动态内容...</p>}>
        <DynamicContent />
      </Suspense>
    </main>
  )
}
```

```tsx
// app/static-content.tsx
export default function StaticContent() {
  return (
    <section>
      <h2>静态内容</h2>
      <p>这部分内容在构建时生成，对所有用户都相同。</p>
    </section>
  )
}
```

```tsx
// app/dynamic-content.tsx
export default async function DynamicContent() {
  // 这个组件包含动态数据获取
  const data = await fetch('https://api.example.com/data', { cache: 'no-store' }).then((res) =>
    res.json(),
  )

  return (
    <section>
      <h2>动态内容</h2>
      <p>当前时间: {new Date().toLocaleTimeString()}</p>
      <p>API数据: {data.message}</p>
    </section>
  )
}
```

在这个例子中：

- 页面的静态部分（标题和`StaticContent`组件）在构建时预渲染
- 动态部分（`DynamicContent`组件）在请求时渲染并流式传输
- 用户立即看到静态内容，同时动态内容加载中

### 复杂用例：个性化仪表板

部分预渲染特别适合包含个性化内容的页面，如用户仪表板：

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import DashboardShell from './dashboard-shell'
import UserGreeting from './user-greeting'
import UserStats from './user-stats'
import RecommendedContent from './recommended-content'

export default function Dashboard() {
  return (
    <DashboardShell>
      {/* 静态布局和设计 */}
      <h1>仪表板</h1>

      {/* 用户特定内容 */}
      <Suspense fallback={<p>加载个人信息...</p>}>
        <UserGreeting />
      </Suspense>

      <div className="dashboard-grid">
        {/* 需要身份验证的动态数据 */}
        <Suspense fallback={<div className="stats-skeleton" />}>
          <UserStats />
        </Suspense>

        {/* 个性化推荐 */}
        <Suspense fallback={<div className="recommendations-skeleton" />}>
          <RecommendedContent />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
```

## 部分预渲染的优势

### 1. 性能优化

部分预渲染提供显著的性能优势：

- **更快的首次内容绘制(FCP)**：静态外壳立即可见
- **更快的交互时间(TTI)**：关键UI元素更早可用
- **减少布局偏移**：预渲染的静态外壳保持稳定布局
- **减少服务器负载**：只有动态部分需要在请求时处理

### 2. 用户体验改进

更好的性能转化为更好的用户体验：

- **减少感知加载时间**：用户立即看到页面框架
- **渐进式内容加载**：内容按优先级顺序显示
- **减少空白屏时间**：静态外壳提供即时上下文

### 3. 开发人员体验

部分预渲染简化了开发流程：

- **避免渲染模式二选一**：不再需要在整个页面的静态或动态渲染之间做选择
- **更简单的心智模型**：使用Suspense边界自然地表达静态/动态边界
- **更好的可维护性**：静态和动态关注点明确分离

## 最佳实践

### 优化静态/动态分界

为获得最佳性能，请考虑这些指导原则：

1. **将关键UI放在静态部分**：

   - 页面标题和导航
   - 页面布局和结构
   - 品牌元素和主要内容

2. **将以下内容保留为动态**：

   - 用户特定内容
   - 实时数据
   - 频繁变化的内容
   - 需要服务器端权限检查的内容

3. **有效使用Suspense边界**：
   - 为逻辑上相关的动态内容分组创建Suspense边界
   - 避免过多的细粒度Suspense边界
   - 为Suspense边界提供有意义的加载状态

### 布局考虑

1. **防止布局偏移**：

   - 为动态内容的加载状态设置明确的尺寸和结构
   - 使用`min-height`和其他CSS属性保持一致的布局

2. **优先级加载**：
   - 使用多个Suspense边界实现内容的优先级加载
   - 首先加载重要的动态内容，然后加载次要内容

```tsx
// 示例：内容优先级加载
<main>
  {/* 静态外壳 */}
  <h1>产品详情</h1>

  {/* 高优先级动态内容 */}
  <Suspense fallback={<ProductInfoSkeleton />}>
    <ProductInfo productId={id} />
  </Suspense>

  <div className="product-secondary">
    {/* 中等优先级动态内容 */}
    <Suspense fallback={<ReviewsSkeleton />}>
      <ProductReviews productId={id} />
    </Suspense>

    {/* 低优先级动态内容 */}
    <Suspense fallback={<RecommendationsSkeleton />}>
      <RelatedProducts productId={id} />
    </Suspense>
  </div>
</main>
```

## 限制和注意事项

虽然部分预渲染提供了强大的优势，但也有一些限制需要了解：

1. **实验性功能**：

   - 部分预渲染目前是实验性的，API可能会改变
   - 在生产环境中使用时应谨慎

2. **编译复杂性**：

   - 复杂应用中的静态/动态边界识别可能会很复杂
   - 确保正确测试所有呈现路径

3. **调试挑战**：
   - 混合渲染模式可能使问题排查变得更复杂
   - 使用Next.js开发工具帮助识别渲染边界

## 与其他渲染策略的比较

| 特性         | 静态渲染               | 动态渲染      | 部分预渲染            |
| ------------ | ---------------------- | ------------- | --------------------- |
| 初始加载性能 | ✅ 极佳                | ❌ 较慢       | ✅ 极佳               |
| 内容新鲜度   | ❌ 仅在构建/重新验证时 | ✅ 每次请求时 | ✅ 动态部分每次请求时 |
| 个性化内容   | ❌ 有限                | ✅ 完全支持   | ✅ 在动态区域内支持   |
| 服务器负载   | ✅ 最小                | ❌ 较高       | ⚠️ 中等（仅动态部分） |
| 缓存策略     | ✅ 完全缓存            | ❌ 有限缓存   | ✅ 静态部分缓存       |
| 实现复杂性   | ✅ 简单                | ✅ 简单       | ⚠️ 中等               |

## 未来展望

部分预渲染代表了Next.js和React渲染模型的重要进步。随着这一功能的发展，我们可以期待：

1. **更细粒度的缓存控制**：对动态部分的更精细缓存策略
2. **更好的构建工具集成**：改进的分析和可视化工具
3. **更多优化自动化**：自动确定最佳静态/动态边界

## 下一步

要进一步了解Next.js的渲染策略，请参阅：

- [静态和动态渲染](/nextjs/app-router/building-your-application/rendering/static-and-dynamic-rendering) - 深入了解基本渲染模式
- [流式渲染和Suspense](/nextjs/app-router/building-your-application/rendering/streaming-and-suspense) - 了解流式传输的工作原理
- [缓存机制](/nextjs/app-router/deep-dive/caching) - 了解Next.js的缓存层如何与部分预渲染交互
