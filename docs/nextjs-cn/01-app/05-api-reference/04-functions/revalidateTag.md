---
title: revalidateTag
description: revalidateTag 函数的 API 参考。
---

`revalidateTag` 允许你按需为特定缓存标签清除[缓存数据](/docs/app/deep-dive/caching)。

> **须知**：
>
> - `revalidateTag` 仅在下次访问路径时才会使缓存失效。这意味着使用动态路由段调用 `revalidateTag` 不会立即触发多个重新验证。失效仅在下次访问路径时发生。

## 参数

```tsx
revalidateTag(tag: string): void;
```

- `tag`：表示要重新验证的数据相关的缓存标签的字符串。必须小于或等于 256 个字符。此值区分大小写。

你可以按如下方式向 `fetch` 添加标签：

```tsx
fetch(url, { next: { tags: [...] } });
```

## 返回值

`revalidateTag` 不返回值。

## 示例

### 服务器操作

```ts filename="app/actions.ts" switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

```js filename="app/actions.js" switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

### 路由处理程序

```ts filename="app/api/revalidate/route.ts" switcher
import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() })
}
```

```js filename="app/api/revalidate/route.js" switcher
import { revalidateTag } from 'next/cache'

export async function GET(request) {
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() })
}
```
