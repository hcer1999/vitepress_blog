---
title: Next.js 中文文档 - 错误处理
description: 了解如何在Next.js应用中处理和显示错误。
---

# Next.js 中文文档 - 错误处理

Next.js提供了多种错误处理机制，可以优雅地处理应用程序中的错误，提供良好的用户体验，同时帮助开发者快速定位和解决问题。

## 错误组件

从React 18开始，你可以使用错误边界来捕获子组件树中的JavaScript错误，显示备用UI，并隔离错误以防止整个应用崩溃。

在Next.js中，你可以创建一个名为`error.js`的特殊文件，作为路由段的错误UI：

```jsx
// app/dashboard/error.js
'use client' // 错误组件必须是客户端组件

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // 可以将错误发送到日志服务
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <h2>发生了一些错误</h2>
      <p>抱歉，我们遇到了问题。</p>
      <button
        onClick={
          // 尝试恢复，重新渲染出错的子组件树
          () => reset()
        }
      >
        重试
      </button>
    </div>
  )
}
```

重要特点：

1. `error.js`必须是客户端组件
2. 接收两个属性：
   - `error`：捕获到的错误对象
   - `reset`：可用于尝试恢复的函数
3. 嵌套放置：最近的`error.js`文件将处理其下方的错误

## 异常处理层级

错误组件在嵌套路由中形成错误边界层次结构：

```
app/
├── error.js      # 应用级错误边界
├── dashboard/
│   ├── error.js  # dashboard及其子路由的错误边界
│   └── page.js
└── page.js
```

如果子路由中的组件抛出错误：

- 首先查找最近的错误边界（如dashboard/error.js）
- 如果该错误边界本身也失败，则逐级向上查找（如app/error.js）

## 全局错误处理

对于整个应用的全局错误，可以在根目录创建`app/global-error.js`：

```jsx
// app/global-error.js
'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="global-error">
          <h1>糟糕，出现了严重错误</h1>
          <p>请尝试刷新页面或联系我们的支持团队</p>
          <button onClick={() => reset()}>重试</button>
        </div>
      </body>
    </html>
  )
}
```

注意：`global-error.js`只在根`layout.js`组件失败时才会触发，应该很少被触发。

## 处理路由段加载错误

### next/navigation的notFound

对于处理找不到资源的情况，可以使用`notFound`函数：

```jsx
// app/posts/[slug]/page.js
import { notFound } from 'next/navigation'

async function getPost(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`)

  if (res.status === 404) {
    // 触发not-found.js
    notFound()
  }

  return res.json()
}

export default async function Post({ params }) {
  const post = await getPost(params.slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### not-found.js文件

可以创建`not-found.js`文件来自定义404错误UI：

```jsx
// app/posts/[slug]/not-found.js
export default function NotFound() {
  return (
    <div>
      <h2>内容未找到</h2>
      <p>无法找到请求的资源</p>
      <a href="/posts">返回所有文章</a>
    </div>
  )
}
```

## 处理服务器错误

服务器组件中的错误会自动传播到最近的错误边界。

### 异步函数中的错误处理

```jsx
// app/users/page.js
async function getUsers() {
  const res = await fetch('https://api.example.com/users')

  if (!res.ok) {
    throw new Error('获取用户数据失败')
  }

  return res.json()
}

export default async function UsersPage() {
  try {
    const users = await getUsers()

    return (
      <div>
        <h1>用户列表</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    )
  } catch (error) {
    // 这里的错误会传播到最近的错误边界
    throw new Error(`加载用户列表时出错: ${error.message}`)
  }
}
```

### 服务器操作中的错误处理

```jsx
// app/actions.js
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData) {
  try {
    const title = formData.get('title')
    const content = formData.get('content')

    if (!title || title.length < 3) {
      return { error: '标题至少需要3个字符' }
    }

    // 保存到数据库
    await db.post.create({
      data: { title, content },
    })

    revalidatePath('/posts')
    redirect('/posts')
  } catch (error) {
    // 返回错误信息而不是抛出错误
    return {
      error: '创建文章失败: ' + error.message,
    }
  }
}
```

## 处理客户端错误

客户端组件中的错误可以使用标准的JavaScript错误处理方法：

```jsx
// app/components/SubscribeForm.js
'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '订阅失败')
      }

      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">订阅成功！</div>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="输入您的邮箱"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? '处理中...' : '订阅'}
      </button>
    </form>
  )
}
```

## 异常处理最佳实践

### 1. 错误边界分层

根据应用程序的逻辑结构，在适当的位置放置错误边界：

```
app/
├── error.js              # 应用级错误
├── layout.js
├── page.js
├── dashboard/
│   ├── error.js          # 仪表盘级错误
│   ├── layout.js
│   └── page.js
└── profile/
    ├── error.js          # 个人资料级错误
    ├── layout.js
    └── page.js
```

### 2. 精细的错误组件

为不同类型的错误创建特定的错误组件：

```jsx
// app/components/ErrorDisplay.js
export function NetworkError({ reset }) {
  return (
    <div className="error network">
      <h3>网络连接错误</h3>
      <p>请检查您的网络连接。</p>
      <button onClick={reset}>重试</button>
    </div>
  )
}

export function DataError({ message, reset }) {
  return (
    <div className="error data">
      <h3>数据加载错误</h3>
      <p>{message || '无法加载请求的数据。'}</p>
      <button onClick={reset}>重试</button>
    </div>
  )
}

// 在错误边界中使用
export default function Error({ error, reset }) {
  if (error.name === 'NetworkError') {
    return <NetworkError reset={reset} />
  }

  if (error.name === 'DataError') {
    return <DataError message={error.message} reset={reset} />
  }

  // 默认错误UI
  return (
    <div className="error unknown">
      <h3>发生了错误</h3>
      <p>我们正在修复这个问题。</p>
      <button onClick={reset}>重试</button>
    </div>
  )
}
```

### 3. 错误日志记录

记录生产环境中的错误信息：

```jsx
// app/utils/logger.js
export function logError(error, componentName, additionalInfo = {}) {
  // 基本错误信息
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    componentName,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  }

  // 开发环境：在控制台打印
  if (process.env.NODE_ENV === 'development') {
    console.error('错误:', errorInfo)
    return
  }

  // 生产环境：发送到日志服务
  fetch('/api/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorInfo),
  }).catch((err) => {
    // 即使日志记录失败也要静默处理
    console.error('无法记录错误:', err)
  })
}

// 在错误组件中使用
export default function Error({ error, reset }) {
  useEffect(() => {
    logError(error, 'DashboardPage')
  }, [error])

  // 错误UI
}
```

### 4. 自定义错误类

定义应用特定的错误类型：

```jsx
// app/utils/errors.js
export class ApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export class ValidationError extends Error {
  constructor(message, fields) {
    super(message)
    this.name = 'ValidationError'
    this.fields = fields
  }
}

export class AuthenticationError extends Error {
  constructor(message) {
    super(message || '用户未认证')
    this.name = 'AuthenticationError'
  }
}

// 使用示例
async function fetchUserData(userId) {
  const res = await fetch(`/api/users/${userId}`)

  if (res.status === 401) {
    throw new AuthenticationError()
  }

  if (res.status === 400) {
    const data = await res.json()
    throw new ValidationError('验证失败', data.fields)
  }

  if (!res.ok) {
    throw new ApiError('API请求失败', res.status, data.code)
  }

  return res.json()
}
```

### 5. 错误恢复策略

实现不同的错误恢复策略：

```jsx
'use client'

import { useState, useEffect } from 'react'

export default function Error({ error, reset }) {
  const [retryCount, setRetryCount] = useState(0)
  const [retryTimer, setRetryTimer] = useState(null)

  useEffect(() => {
    return () => {
      // 清理计时器
      if (retryTimer) clearTimeout(retryTimer)
    }
  }, [retryTimer])

  // 立即重试
  function handleImmediateRetry() {
    setRetryCount((prev) => prev + 1)
    reset()
  }

  // 延迟重试
  function handleDelayedRetry() {
    const timer = setTimeout(() => {
      setRetryCount((prev) => prev + 1)
      reset()
    }, 5000)

    setRetryTimer(timer)
  }

  // 退回上一页
  function handleGoBack() {
    window.history.back()
  }

  return (
    <div className="error-recovery">
      <h2>发生错误</h2>
      <p>{error.message}</p>

      <div className="actions">
        <button onClick={handleImmediateRetry}>立即重试 ({retryCount})</button>

        <button onClick={handleDelayedRetry}>5秒后自动重试</button>

        <button onClick={handleGoBack}>返回上一页</button>
      </div>
    </div>
  )
}
```

## 生产环境错误处理

### 隐藏敏感错误信息

在生产环境中，应该对错误信息进行清理，避免暴露敏感信息：

```jsx
// app/dashboard/error.js
'use client'

import { useEffect } from 'react'
import { logError } from '@/app/utils/logger'

export default function Error({ error, reset }) {
  useEffect(() => {
    // 记录详细错误信息
    logError(error, 'DashboardError')
  }, [error])

  // 生产环境中显示通用错误信息
  const errorMessage =
    process.env.NODE_ENV === 'production' ? '发生了错误，我们正在处理' : error.message

  return (
    <div className="error-container">
      <h2>出错了</h2>
      <p>{errorMessage}</p>
      <button onClick={reset}>重试</button>
    </div>
  )
}
```

### 错误边界降级UI

为核心功能提供降级体验：

```jsx
// app/dashboard/error.js
'use client'

export default function Error({ error, reset }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>仪表盘</h1>
        <p>显示简化版本</p>
      </div>

      <div className="dashboard-fallback">
        <div className="card">
          <h3>简化模式</h3>
          <p>我们无法加载完整的仪表盘功能。</p>
          <button onClick={reset}>尝试加载完整版本</button>
        </div>

        {/* 显示静态或本地缓存的数据 */}
        <div className="static-content">
          <h3>账户信息</h3>
          <p>查看账户基本信息</p>
          <a href="/account">前往账户页面</a>
        </div>
      </div>
    </div>
  )
}
```

## 了解更多

更多关于错误处理的详细信息，请参考：

- [Next.js错误处理文档](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [React错误边界文档](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [使用React错误边界的最佳实践](https://react.dev/reference/react/Component#displaying-an-error-fallback)
