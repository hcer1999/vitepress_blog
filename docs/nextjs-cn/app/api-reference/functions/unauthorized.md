---
title: unauthorized
description: unauthorized 函数的 API 参考。
version: experimental
related:
  links:
    - app/api-reference/file-conventions/unauthorized
---

`unauthorized` 函数抛出一个错误，用于渲染 Next.js 401 错误页面。它对于处理应用程序中的授权错误非常有用。你可以使用 [`unauthorized.js` 文件](/nextjs-cn/app/api-reference/file-conventions/unauthorized)自定义用户界面。

要开始使用 `unauthorized`，请在 `next.config.js` 文件中启用实验性的 [`authInterrupts`](/nextjs-cn/app/api-reference/config/next-config-js/authInterrupts) 配置选项：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
}

export default nextConfig
```

```js switcher
module.exports = {
  experimental: {
    authInterrupts: true,
  },
}
```

`unauthorized` 可以在[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)、[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)和[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)中调用。

```tsx switcher
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()

  if (!session) {
    unauthorized()
  }

  // 为已认证用户渲染仪表板
  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <p>Hi, {session.user.name}.</p>
    </main>
  )
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

  // 为已认证用户渲染仪表板
  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <p>Hi, {session.user.name}.</p>
    </main>
  )
}
```

## 须知

- `unauthorized` 函数不能在[根布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#root-layout-required)中调用。

## 示例

### 向未认证用户显示登录界面

你可以使用 `unauthorized` 函数显示带有登录界面的 `unauthorized.js` 文件。

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
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
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
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Login />
    </main>
  )
}
```

### 使用服务器操作进行修改

你可以在服务器操作中调用 `unauthorized`，以确保只有经过认证的用户才能执行特定的修改。

```ts switcher
'use server'

import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'
import db from '@/app/lib/db'

export async function updateProfile(data: FormData) {
  const session = await verifySession()

  // 如果用户未认证，返回401
  if (!session) {
    unauthorized()
  }

  // 继续进行修改
  // ...
}
```

```js switcher
'use server'

import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'
import db from '@/app/lib/db'

export async function updateProfile(data) {
  const session = await verifySession()

  // 如果用户未认证，返回401
  if (!session) {
    unauthorized()
  }

  // 继续进行修改
  // ...
}
```

### 使用路由处理程序获取数据

你可以在路由处理程序中使用 `unauthorized`，以确保只有经过认证的用户才能访问该端点。

```tsx switcher
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export async function GET(req: NextRequest): Promise<NextResponse> {
  // 验证用户会话
  const session = await verifySession()

  // 如果不存在会话，返回401并渲染unauthorized.tsx
  if (!session) {
    unauthorized()
  }

  // 获取数据
  // ...
}
```

```jsx switcher
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export async function GET() {
  const session = await verifySession()

  // 如果用户未认证，返回401并渲染unauthorized.tsx
  if (!session) {
    unauthorized()
  }

  // 获取数据
  // ...
}
```

## 版本历史

| 版本      | 变更                  |
| --------- | --------------------- |
| `v15.1.0` | 引入 `unauthorized`。 |
