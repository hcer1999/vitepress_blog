---
title: revalidatePath
description: revalidatePath 函数的 API 参考。
---

`revalidatePath` 允许你按需为特定路径清除[缓存数据](/docs/app/deep-dive/caching)。

> **须知**：
>
> - `revalidatePath` 仅在下次访问包含的路径时才会使缓存失效。这意味着使用动态路由段调用 `revalidatePath` 不会立即触发多个重新验证。失效仅在下次访问路径时发生。
> - 目前，当在服务器操作中使用时，`revalidatePath` 会使[客户端路由器缓存](/docs/app/deep-dive/caching#client-side-router-cache)中的所有路由失效。这种行为是临时的，将来会更新为仅应用于特定路径。
> - 使用 `revalidatePath` 仅使[服务器端路由缓存](/docs/app/deep-dive/caching#full-route-cache)中的**特定路径**失效。

## 参数

```tsx
revalidatePath(path: string, type?: 'page' | 'layout'): void;
```

- `path`：表示要重新验证的数据相关的文件系统路径的字符串（例如，`/product/[slug]/page`），或字面路由段（例如，`/product/123`）。必须少于 1024 个字符。此值区分大小写。
- `type`：（可选）`'page'` 或 `'layout'` 字符串，用于更改要重新验证的路径类型。如果 `path` 包含动态段（例如，`/product/[slug]/page`），则此参数是必需的。如果路径是动态页面的字面路由段（例如，`/product/[slug]/page` 的 `/product/1`），则不应提供 `type`。

## 返回值

`revalidatePath` 不返回值。

## 示例

### 重新验证特定 URL

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post-1')
```

这将在下一次页面访问时重新验证一个特定的 URL。

### 重新验证页面路径

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'page')
// 或使用路由组
revalidatePath('/(main)/blog/[slug]', 'page')
```

这将在下一次页面访问时重新验证任何与提供的 `page` 文件匹配的 URL。这*不会*使特定页面下方的页面失效。例如，`/blog/[slug]` 不会使 `/blog/[slug]/[author]` 失效。

### 重新验证布局路径

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'layout')
// 或使用路由组
revalidatePath('/(main)/post/[slug]', 'layout')
```

这将在下一次页面访问时重新验证任何与提供的 `layout` 文件匹配的 URL。这将导致具有相同布局的下层页面在下次访问时重新验证。例如，在上面的情况下，`/blog/[slug]/[another]` 也会在下次访问时重新验证。

### 重新验证所有数据

```ts
import { revalidatePath } from 'next/cache'

revalidatePath('/', 'layout')
```

这将清除客户端路由器缓存，并在下一次页面访问时重新验证数据缓存。

### 服务器操作

```ts filename="app/actions.ts" switcher
'use server'

import { revalidatePath } from 'next/cache'

export default async function submit() {
  await submitForm()
  revalidatePath('/')
}
```

### 路由处理程序

```ts filename="app/api/revalidate/route.ts" switcher
import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')

  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
```

```js filename="app/api/revalidate/route.js" switcher
import { revalidatePath } from 'next/cache'

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path')

  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
```
