---
title: error.js
description: error.js 特殊文件的 API 参考。
related:
  title: 了解更多关于错误处理
  links:
    - app/building-your-application/routing/error-handling
---

# NextJS中文文档 - Error

**error** 文件允许你处理意外的运行时错误并显示备用 UI。

<Image
  alt="error.js 特殊文件"
  srcLight="/docs/light/error-special-file.png"
  srcDark="/docs/dark/error-special-file.png"
  width="1600"
  height="606"
/>

```tsx switcher
'use client' // 错误边界必须是客户端组件

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 将错误记录到错误报告服务
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>出错了！</h2>
      <button
        onClick={
          // 尝试通过重新渲染段来恢复
          () => reset()
        }
      >
        重试
      </button>
    </div>
  )
}
```

```jsx switcher
'use client' // 错误边界必须是客户端组件

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // 将错误记录到错误报告服务
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>出错了！</h2>
      <button
        onClick={
          // 尝试通过重新渲染段来恢复
          () => reset()
        }
      >
        重试
      </button>
    </div>
  )
}
```

`error.js` 将路由段及其嵌套子组件包装在 [React 错误边界](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) 中。当边界内抛出错误时，`error` 组件作为备用 UI 显示。

<Image
  alt="error.js 如何工作"
  srcLight="/docs/light/error-overview.png"
  srcDark="/docs/dark/error-overview.png"
  width="1600"
  height="903"
/>

> **须知**：
>
> - [React 开发工具](https://react.dev/learn/react-developer-tools) 允许你切换错误边界来测试错误状态。
> - 如果你希望错误冒泡到父级错误边界，可以在渲染 `error` 组件时使用 `throw`。

## 参考

### Props

#### `error`

一个转发到 `error.js` 客户端组件的 [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) 对象实例。

> **须知：** 在开发过程中，转发到客户端的 `Error` 对象将被序列化，并包含原始错误的 `message`，以便更容易调试。但是，**在生产环境中这种行为会有所不同**，以避免将错误中包含的可能敏感信息泄露给客户端。

#### `error.message`

- 从客户端组件转发的错误显示原始的 `Error` 消息。
- 从服务器组件转发的错误显示带有标识符的通用消息。这是为了防止泄露敏感信息。你可以使用 `errors.digest` 下的标识符与服务器端日志中的相应错误进行匹配。

#### `error.digest`

自动生成的错误哈希值。它可用于匹配服务器端日志中的相应错误。

#### `reset`

错误的原因有时可能是临时的。在这些情况下，重试可能会解决问题。

错误组件可以使用 `reset()` 函数提示用户尝试从错误中恢复。执行该函数时，它将尝试重新渲染错误边界的内容。如果成功，备用错误组件将被重新渲染的结果替换。

```tsx switcher
'use client' // 错误边界必须是客户端组件

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  )
}
```

```jsx switcher
'use client' // 错误边界必须是客户端组件

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  )
}
```

## 示例

### 全局错误

虽然不太常见，但你可以使用 `global-error.js` 处理根布局或模板中的错误，该文件位于根 app 目录中，即使在使用[国际化](/nextjs-cn/app/building-your-application/routing/internationalization)时也是如此。全局错误 UI 必须定义自己的 `<html>` 和 `<body>` 标签。当激活时，此文件替换根布局或模板。

```tsx switcher
'use client' // 错误边界必须是客户端组件

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error 必须包含 html 和 body 标签
    <html>
      <body>
        <h2>出错了！</h2>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  )
}
```

```jsx switcher
'use client' // 错误边界必须是客户端组件

export default function GlobalError({ error, reset }) {
  return (
    // global-error 必须包含 html 和 body 标签
    <html>
      <body>
        <h2>出错了！</h2>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  )
}
```

### 使用自定义错误边界优雅地恢复错误

当客户端渲染失败时，显示最后已知的服务器渲染 UI 可能会提供更好的用户体验。

`GracefullyDegradingErrorBoundary` 是一个自定义错误边界的示例，它在错误发生前捕获并保留当前的 HTML。如果发生渲染错误，它会重新渲染捕获的 HTML 并显示一个持久性通知栏来通知用户。

```tsx switcher
'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class GracefullyDegradingErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private contentRef: React.RefObject<HTMLDivElement>

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
    this.contentRef = React.createRef()
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // 在没有水合的情况下渲染当前的 HTML 内容
      return (
        <>
          <div
            ref={this.contentRef}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: this.contentRef.current?.innerHTML || '',
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-4 px-6 text-center">
            出现了一个错误。请稍后重试。
          </div>
        </>
      )
    }

    return <div ref={this.contentRef}>{this.props.children}</div>
  }
}

// 嵌套的 error.js 边界可以使用该组件来保存服务器端的 HTML
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="text-vercel-pink text-sm font-medium">
        <h2 className="text-lg font-bold">出错了！</h2>
        <p>无法渲染仪表板。尝试重试或查看控制台获取更多信息。</p>
      </div>
      <button
        className="rounded bg-vercel-pink px-4 py-2 text-sm text-white hover:bg-pink-600 active:bg-pink-700"
        onClick={reset}
      >
        重试
      </button>
    </div>
  )
}
```

```jsx switcher
'use client'

import React from 'react'

export class GracefullyDegradingErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    this.contentRef = React.createRef()
  }

  static getDerivedStateFromError(_) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // 在没有水合的情况下渲染当前的 HTML 内容
      return (
        <>
          <div
            ref={this.contentRef}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: this.contentRef.current?.innerHTML || '',
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-4 px-6 text-center">
            出现了一个错误。请稍后重试。
          </div>
        </>
      )
    }

    return <div ref={this.contentRef}>{this.props.children}</div>
  }
}

// 嵌套的 error.js 边界可以使用该组件来保存服务器端的 HTML
export default function DashboardError({ error, reset }) {
  return (
    <div className="space-y-4">
      <div className="text-vercel-pink text-sm font-medium">
        <h2 className="text-lg font-bold">出错了！</h2>
        <p>无法渲染仪表板。尝试重试或查看控制台获取更多信息。</p>
      </div>
      <button
        className="rounded bg-vercel-pink px-4 py-2 text-sm text-white hover:bg-pink-600 active:bg-pink-700"
        onClick={reset}
      >
        重试
      </button>
    </div>
  )
}

## 版本历史

| 版本      | 变更                                  |
|--------- | ------------------------------------- |
| `v15.2.0` | 在开发环境中也显示 `global-error`。    |
| `v13.1.0` | 引入 `global-error`。                 |
| `v13.0.0` | 引入 `error`。                        |
```
