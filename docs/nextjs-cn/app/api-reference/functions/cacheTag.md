---
title: cacheTag
description: 了解如何使用 cacheTag 函数管理 Next.js 应用程序中的缓存失效。
version: canary
related:
  title: 相关内容
  description: 查看相关的 API 参考。
  links:
    - app/api-reference/config/next-config-js/dynamicIO
    - app/api-reference/directives/use-cache
    - app/api-reference/functions/revalidateTag
    - app/api-reference/functions/cacheLife
---

`cacheTag` 函数允许你为缓存数据添加标签，以便按需失效。通过将标签与缓存条目关联，你可以选择性地清除或重新验证特定的缓存条目，而不影响其他缓存数据。

## 用法

要使用 `cacheTag`，请在 `next.config.js` 文件中启用 [`dynamicIO` 标志](/nextjs-cn/app/api-reference/config/next-config-js/dynamicIO)：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
```

```js switcher
const nextConfig = {
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
```

`cacheTag` 函数接受单个字符串值或字符串数组。

```tsx switcher
import { unstable_cacheTag as cacheTag } from 'next/cache'

export async function getData() {
  'use cache'
  cacheTag('my-data')
  const data = await fetch('/api/data')
  return data
}
```

```jsx switcher
import { unstable_cacheTag as cacheTag } from 'next/cache'

export async function getData() {
  'use cache'
  cacheTag('my-data')
  const data = await fetch('/api/data')
  return data
}
```

然后，你可以使用 [`revalidateTag`](/nextjs-cn/app/api-reference/functions/revalidateTag) API 在另一个函数中按需清除缓存，例如，在[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)或[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)中：

```tsx switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('my-data')
}
```

```jsx switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('my-data')
}
```

## 须知

- **幂等标签**：多次应用相同的标签没有额外的效果。
- **多个标签**：你可以通过向 `cacheTag` 传递数组来为单个缓存条目分配多个标签。

```tsx
cacheTag('tag-one', 'tag-two')
```

## 示例

### 标记组件或函数

通过在缓存的函数或组件中调用 `cacheTag` 来标记你的缓存数据：

```tsx switcher
import { unstable_cacheTag as cacheTag } from 'next/cache'

interface BookingsProps {
  type: string
}

export async function Bookings({ type = 'haircut' }: BookingsProps) {
  'use cache'
  cacheTag('bookings-data')

  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }

  return //...
}
```

```jsx switcher
import { unstable_cacheTag as cacheTag } from 'next/cache'

export async function Bookings({ type = 'haircut' }) {
  'use cache'
  cacheTag('bookings-data')

  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }

  return //...
}
```

### 从外部数据创建标签

你可以使用从异步函数返回的数据来标记缓存条目。

```tsx switcher
import { unstable_cacheTag as cacheTag } from 'next/cache'

interface BookingsProps {
  type: string
}

export async function Bookings({ type = 'haircut' }: BookingsProps) {
  async function getBookingsData() {
    'use cache'
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    cacheTag('bookings-data', data.id)
    return data
  }
  return //...
}
```

```jsx switcher
import { unstable_cacheTag as cacheTag } from 'next/cache'

export async function Bookings({ type = 'haircut' }) {
  async function getBookingsData() {
    'use cache'
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    cacheTag('bookings-data', data.id)
    return data
  }
  return //...
}
```

### 使标记的缓存失效

使用 [`revalidateTag`](/nextjs-cn/app/api-reference/functions/revalidateTag)，你可以在需要时使特定标签的缓存失效：

```tsx switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function updateBookings() {
  await updateBookingData()
  revalidateTag('bookings-data')
}
```

```jsx switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function updateBookings() {
  await updateBookingData()
  revalidateTag('bookings-data')
}
```

## 版本历史

| 版本      | 变更              |
| --------- | ----------------- |
| `v15.0.0` | 引入 `cacheTag`。 |
