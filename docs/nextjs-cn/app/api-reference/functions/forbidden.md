---
title: forbidden
description: forbidden 函数的 API 参考。
version: experimental
related:
  links:
    - app/api-reference/file-conventions/forbidden
---

# NextJS中文文档 - Forbidden

`forbidden` 函数抛出一个错误，渲染 Next.js 403 错误页面。它对处理应用程序中的授权错误很有用。您可以使用 [`forbidden.js` 文件](/nextjs-cn/app/api-reference/file-conventions/forbidden) 自定义 UI。

要开始使用 `forbidden`，请在 `next.config.js` 文件中启用实验性的 [`authInterrupts`](/nextjs-cn/app/api-reference/config/next-config-js/authInterrupts) 配置选项：

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

`forbidden` 可以在 [服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)、[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations) 和 [路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers) 中调用。

```tsx switcher
import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()

  // 检查用户是否具有 'admin' 角色
  if (session.role !== 'admin') {
    forbidden()
  }

  // 为授权用户渲染管理页面
  return <></>
}
```

```jsx switcher
import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()

  // 检查用户是否具有 'admin' 角色
  if (session.role !== 'admin') {
    forbidden()
  }

  // 为授权用户渲染管理页面
  return <></>
}
```

## 须知

- `forbidden` 函数不能在 [根布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#root-layout-required) 中调用。

## 示例

### 基于角色的路由保护

您可以使用 `forbidden` 基于用户角色限制对某些路由的访问。这确保已认证但缺乏所需权限的用户无法访问该路由。

```tsx switcher
import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()

  // 检查用户是否具有 'admin' 角色
  if (session.role !== 'admin') {
    forbidden()
  }

  // 为授权用户渲染管理页面
  return (
    <main>
      <h1>管理员仪表板</h1>
      <p>欢迎，{session.user.name}！</p>
    </main>
  )
}
```

```jsx switcher
import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()

  // 检查用户是否具有 'admin' 角色
  if (session.role !== 'admin') {
    forbidden()
  }

  // 为授权用户渲染管理页面
  return (
    <main>
      <h1>管理员仪表板</h1>
      <p>欢迎，{session.user.name}！</p>
    </main>
  )
}
```

### 使用服务器操作的数据变更

在服务器操作中实现数据变更时，您可以使用 `forbidden` 只允许具有特定角色的用户更新敏感数据。

```ts switcher
'use server'

import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'
import db from '@/app/lib/db'

export async function updateRole(formData: FormData) {
  const session = await verifySession()

  // 确保只有管理员可以更新角色
  if (session.role !== 'admin') {
    forbidden()
  }

  // 为授权用户执行角色更新
  // ...
}
```

```js switcher
'use server'

import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'
import db from '@/app/lib/db'

export async function updateRole(formData) {
  const session = await verifySession()

  // 确保只有管理员可以更新角色
  if (session.role !== 'admin') {
    forbidden()
  }

  // 为授权用户执行角色更新
  // ...
}
```

## 版本历史

| 版本      | 变更               |
| --------- | ------------------ |
| `v15.1.0` | 引入 `forbidden`。 |
