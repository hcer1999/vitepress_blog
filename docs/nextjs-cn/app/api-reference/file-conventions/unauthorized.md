---
title: unauthorized.js
description: unauthorized.js 特殊文件的 API 参考。
related:
  links:
    - app/api-reference/functions/unauthorized
version: experimental
---

**unauthorized** 文件用于在认证过程中调用 [`unauthorized`](/docs/nextjs-cn/app/api-reference/functions/unauthorized) 函数时渲染 UI。除了允许你自定义 UI 外，Next.js 还将返回 `401` 状态码。

```tsx switcher
import Login from '@/app/components/Login'

export default function Unauthorized() {
  return (
    <main>
      <h1>401 - 未授权</h1>
      <p>请登录以访问此页面。</p>
      <Login />
    </main>
  )
}
```

```jsx switcher
import Login from '@/app/components/Login'

export default function Unauthorized() {
  return (
    <main>
      <h1>401 - 未授权</h1>
      <p>请登录以访问此页面。</p>
      <Login />
    </main>
  )
}
```

## 参考

### Props

`unauthorized.js` 组件不接受任何 props。

## 示例

### 向未认证用户显示登录 UI

你可以使用 [`unauthorized`](/docs/nextjs-cn/app/api-reference/functions/unauthorized) 函数来渲染带有登录 UI 的 `unauthorized.js` 文件。

```tsx switcher
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()

  if (!session) {
    unauthorized()
  }

  return <div>Dashboard</div>
}
```

```jsx switcher
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()

  if (!session) {
    unauthorized()
  }

  return <div>Dashboard</div>
}
```

```tsx switcher
import Login from '@/app/components/Login'

export default function UnauthorizedPage() {
  return (
    <main>
      <h1>401 - 未授权</h1>
      <p>请登录以访问此页面。</p>
      <Login />
    </main>
  )
}
```

```jsx switcher
import Login from '@/app/components/Login'

export default function UnauthorizedPage() {
  return (
    <main>
      <h1>401 - 未授权</h1>
      <p>请登录以访问此页面。</p>
      <Login />
    </main>
  )
}
```

## 版本历史

| 版本      | 变更                     |
| --------- | ------------------------ |
| `v15.1.0` | 引入 `unauthorized.js`。 |
