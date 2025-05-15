---
title: Next.js 中文文档 - 错误处理
description: 学习如何在Next.js应用中处理错误，创建自定义错误UI
---

# Next.js 中文文档 - 错误处理

Next.js提供了内置的错误处理机制，使你能够捕获运行时错误，并向用户展示备用UI。本页将介绍如何在Next.js应用中处理错误。

## Error组件

`error.js`文件约定允许你在发生错误时优雅地处理运行时错误，为嵌套路由分段创建独立的UI边界。

### 工作原理

当组件中发生错误时，`error.js`文件会：

1. 自动创建一个[React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)，包裹嵌套的子分段或`page.js`组件
2. 当抛出错误时渲染`error.js`中导出的React组件作为备用UI
3. 将发生的错误作为`error`属性传递给备用组件

### 基本实现示例

```tsx
// app/dashboard/error.tsx
'use client' // 错误组件必须是客户端组件

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以选择将错误记录到错误报告服务
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <h2>出现了错误！</h2>
      <p>{error.message || '发生了意外错误'}</p>
      <button
        onClick={
          // 尝试恢复，重新渲染此分段
          () => reset()
        }
      >
        重试
      </button>
    </div>
  )
}
```

### 重置错误

传递给错误组件的`reset()`函数可用于尝试重新渲染发生错误的路由段。当成功执行时，备用错误组件将被替换为原始路由段的重新渲染。

### 嵌套路由

在嵌套路由中，`error.js`定界边界会嵌套在父路由段的`error.js`边界内部。

- 错误冒泡到最近的父级错误边界
- 每个`error.js`文件只会处理其子组件中的错误，而不处理自身的错误

#### 嵌套路由错误处理示例

```
app/
├── dashboard/
│   ├── error.js      # 处理dashboard/*的错误
│   └── [team]/
│       ├── error.js  # 处理team子路由的错误
│       └── page.js
└── layout.js
```

### 处理布局错误

`error.js`边界不会捕获在同一段的`layout.js`或`template.js`组件中抛出的错误。这种设计是有意的，因为当布局发生错误时，通常不希望只显示部分损坏的UI。

为了处理布局或模板中的错误，将`error.js`文件放在布局的父级段中。

#### 处理根布局错误

要处理根`app/layout.js`或`app/template.js`中的错误，创建一个特殊的`app/global-error.js`文件：

```tsx
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="global-error">
          <h2>系统错误</h2>
          <p>很抱歉，应用程序发生了意外错误</p>
          <button onClick={() => reset()}>重试</button>
        </div>
      </body>
    </html>
  )
}
```

> 注意：`global-error.js`仅在根`layout.js`抛出错误时才替代它。由于`global-error.js`不包含共享的布局UI，所以它应该被视为最后的错误处理机制。

## 页面不存在的处理

用户访问不存在的路由时，Next.js会先尝试使用`not-found.js`文件渲染UI。如果这个文件不存在，Next.js将渲染内置的404页面。

要创建自定义404页面，创建`app/not-found.js`文件：

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>页面不存在</h2>
      <p>很抱歉，您访问的页面不存在</p>
      <Link href="/">返回首页</Link>
    </div>
  )
}
```

## 处理异步错误

使用`try/catch`语句或`Promise`的`catch`方法来捕获异步错误。

```tsx
// app/dashboard/page.tsx
async function fetchData() {
  const res = await fetch('https://api.example.com/data')

  if (!res.ok) {
    throw new Error('获取数据失败')
  }

  return res.json()
}

export default async function DashboardPage() {
  let data

  try {
    data = await fetchData()
  } catch (error) {
    // 可以在此处记录错误
    console.error('获取数据时出错:', error)

    // 显示备用UI或重定向
    return <p>加载数据时出错，请稍后再试</p>
  }

  return (
    <main>
      <h1>仪表盘</h1>
      {/* 正常渲染数据 */}
    </main>
  )
}
```

## 高级错误处理模式

### 错误监控与上报

在生产环境中，应使用第三方服务(如Sentry、Bugsnag等)监控错误：

```tsx
'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div>
      <h2>出现了错误</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  )
}
```

### 错误降级策略

在大型应用中，可能需要针对不同的错误实施不同的降级策略：

```tsx
'use client'

export default function Error({ error, reset }) {
  // 根据错误类型采取不同的处理方式
  const isNetworkError = error.message.includes('network') || error.message.includes('fetch')
  const isAuthError = error.message.includes('unauthorized') || error.message.includes('forbidden')

  // 网络错误
  if (isNetworkError) {
    return (
      <div>
        <h2>网络连接出错</h2>
        <p>请检查您的网络连接，然后重试</p>
        <button onClick={() => reset()}>重试</button>
      </div>
    )
  }

  // 授权错误
  if (isAuthError) {
    return (
      <div>
        <h2>访问未授权</h2>
        <p>您没有权限访问该资源</p>
        <a href="/login">重新登录</a>
      </div>
    )
  }

  // 默认错误处理
  return (
    <div>
      <h2>出现了错误</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  )
}
```

## 相关API

- [`error.js` 约定](/nextjs/app-router/api-reference/file-conventions/error)
- [`not-found.js` 约定](/nextjs/app-router/api-reference/file-conventions/not-found)
- [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
