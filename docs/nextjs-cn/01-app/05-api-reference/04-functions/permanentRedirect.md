---
title: permanentRedirect
description: permanentRedirect 函数的 API 参考。
related:
  links:
    - app/api-reference/functions/redirect
---

`permanentRedirect` 函数允许你将用户重定向到另一个 URL。`permanentRedirect` 可以在服务器组件、客户端组件、[路由处理程序](/docs/app/building-your-application/routing/route-handlers)和[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)中使用。

在流式上下文中使用时，它将插入一个元标签，以在客户端上发出重定向。在服务器操作中使用时，它将向调用者返回一个 303 HTTP 重定向响应。否则，它将向调用者提供一个 308（永久）HTTP 重定向响应。

如果资源不存在，你可以使用 [`notFound` 函数](/docs/app/api-reference/functions/not-found)代替。

> **须知**：如果你更喜欢返回 307（临时）HTTP 重定向而不是 308（永久）HTTP 重定向，可以使用 [`redirect` 函数](/docs/app/api-reference/functions/redirect)代替。

## 参数

`permanentRedirect` 函数接受两个参数：

```js
permanentRedirect(path, type)
```

| 参数   | 类型                                                   | 描述                                     |
| ------ | ------------------------------------------------------ | ---------------------------------------- |
| `path` | `string`                                               | 要重定向到的 URL。可以是相对或绝对路径。 |
| `type` | `'replace'`（默认）或 `'push'`（服务器操作中的默认值） | 要执行的重定向类型。                     |

默认情况下，`permanentRedirect` 在[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)中使用 `push`（在浏览器历史堆栈中添加新条目），在其他地方使用 `replace`（替换浏览器历史堆栈中的当前 URL）。你可以通过指定 `type` 参数覆盖此行为。

`type` 参数在服务器组件中使用时没有效果。

## 返回值

`permanentRedirect` 不返回值。

## 示例

调用 `permanentRedirect()` 函数会抛出一个 `NEXT_REDIRECT` 错误，并终止渲染抛出它的路由段。

```jsx filename="app/team/[id]/page.js"
import { permanentRedirect } from 'next/navigation'

async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const { id } = await params
  const team = await fetchTeam(id)
  if (!team) {
    permanentRedirect('/login')
  }

  // ...
}
```

> **须知**：`permanentRedirect` 不要求你使用 `return permanentRedirect()`，因为它使用 TypeScript [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) 类型。
