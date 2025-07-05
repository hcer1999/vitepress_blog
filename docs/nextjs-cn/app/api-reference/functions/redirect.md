---
title: redirect
description: redirect 函数的 API 参考。
related:
  links:
    - app/api-reference/functions/permanentRedirect
---

`redirect` 函数允许你将用户重定向到另一个 URL。`redirect` 可以在[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)、[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)和[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)中使用。

当在[流式上下文](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming#what-is-streaming)中使用时，这将插入一个 meta 标签，以在客户端执行重定向。当在服务器操作中使用时，它将向调用者提供 303 HTTP 重定向响应。否则，它将向调用者提供 307 HTTP 重定向响应。

如果资源不存在，你可以使用 [`notFound` 函数](/nextjs-cn/app/api-reference/functions/not-found)。

> **须知**：
>
> - 在服务器操作和路由处理程序中，应该在 `try/catch` 块之后调用 `redirect`。
> - 如果你更喜欢返回 308（永久）HTTP 重定向而不是 307（临时），你可以使用 [`permanentRedirect` 函数](/nextjs-cn/app/api-reference/functions/permanentRedirect)。

## 参数

`redirect` 函数接受两个参数：

```js
redirect(path, type)
```

| 参数   | 类型                                                   | 描述                                     |
| ------ | ------------------------------------------------------ | ---------------------------------------- |
| `path` | `string`                                               | 要重定向到的 URL。可以是相对或绝对路径。 |
| `type` | `'replace'`（默认）或 `'push'`（服务器操作中的默认值） | 要执行的重定向类型。                     |

默认情况下，`redirect` 在[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)中使用 `push`（在浏览器历史栈中添加新条目），在其他地方使用 `replace`（替换浏览器历史栈中的当前 URL）。你可以通过指定 `type` 参数来覆盖此行为。

在服务器组件中使用时，`type` 参数没有效果。

## 返回值

`redirect` 不返回值。

## 示例

### 服务器组件

调用 `redirect()` 函数会抛出 `NEXT_REDIRECT` 错误，并终止抛出它的路由段的渲染。

```tsx switcher
import { redirect } from 'next/navigation'

async function fetchTeam(id: string) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const team = await fetchTeam(id)

  if (!team) {
    redirect('/login')
  }

  // ...
}
```

```jsx switcher
import { redirect } from 'next/navigation'

async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const { id } = await params
  const team = await fetchTeam(id)

  if (!team) {
    redirect('/login')
  }

  // ...
}
```

> **须知**：由于 `redirect` 使用 TypeScript [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) 类型，因此不需要使用 `return redirect()`。

### 客户端组件

`redirect` 可以直接在客户端组件中使用。

```tsx switcher
'use client'

import { redirect, usePathname } from 'next/navigation'

export function ClientRedirect() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    redirect('/admin/login')
  }

  return <div>登录页面</div>
}
```

```jsx switcher
'use client'

import { redirect, usePathname } from 'next/navigation'

export function ClientRedirect() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    redirect('/admin/login')
  }

  return <div>登录页面</div>
}
```

> **须知**：在服务器端渲染（SSR）期间的初始页面加载时，在客户端组件中使用 `redirect` 时，它将执行服务器端重定向。

可以通过服务器操作在客户端组件中使用 `redirect`。如果需要使用事件处理程序重定向用户，可以使用 [`useRouter`](/nextjs-cn/app/api-reference/functions/use-router) 钩子。

```tsx switcher
'use client'

import { navigate } from './actions'

export function ClientRedirect() {
  return (
    <form action={navigate}>
      <input type="text" name="id" />
      <button>提交</button>
    </form>
  )
}
```

```jsx switcher
'use client'

import { navigate } from './actions'

export function ClientRedirect() {
  return (
    <form action={navigate}>
      <input type="text" name="id" />
      <button>提交</button>
    </form>
  )
}
```

```ts switcher
'use server'

import { redirect } from 'next/navigation'

export async function navigate(data: FormData) {
  redirect(`/posts/${data.get('id')}`)
}
```

```js switcher
'use server'

import { redirect } from 'next/navigation'

export async function navigate(data) {
  redirect(`/posts/${data.get('id')}`)
}
```

## 常见问题

### 为什么 `redirect` 使用 307 和 308？

使用 `redirect()` 时，你可能会注意到临时重定向使用的状态码是 `307`，永久重定向使用的是 `308`。虽然传统上临时重定向使用 `302`，永久重定向使用 `301`，但许多浏览器在使用 `302` 时会将重定向的请求方法从 `POST` 更改为 `GET` 请求，无论源请求方法是什么。

以从 `/users` 重定向到 `/people` 为例，如果你向 `/users` 发出 `POST` 请求以创建新用户，并遵循 `302` 临时重定向，则请求方法将从 `POST` 更改为 `GET` 请求。这没有意义，因为要创建新用户，你应该向 `/people` 发出 `POST` 请求，而不是 `GET` 请求。

引入 `307` 状态码意味着请求方法将保留为 `POST`。

- `302` - 临时重定向，会将请求方法从 `POST` 更改为 `GET`
- `307` - 临时重定向，会将请求方法保留为 `POST`

`redirect()` 方法默认使用 `307` 而不是 `302` 临时重定向，这意味着你的请求将*始终*保留为 `POST` 请求。

[了解更多](https://developer.mozilla.org/docs/Web/HTTP/Redirections)关于 HTTP 重定向。

## 版本历史

| 版本      | 变更              |
| --------- | ----------------- |
| `v13.0.0` | 引入 `redirect`。 |
