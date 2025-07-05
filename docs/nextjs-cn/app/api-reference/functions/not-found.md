---
title: notFound
description: notFound 函数的 API 参考。
---

`notFound` 函数允许你在路由段内渲染 [`not-found 文件`](/nextjs-cn/app/api-reference/file-conventions/not-found)，同时注入一个 `<meta name="robots" content="noindex" />` 标签。

## `notFound()`

调用 `notFound()` 函数会抛出一个 `NEXT_HTTP_ERROR_FALLBACK;404` 错误，并终止调用它的路由段的渲染。指定一个 [**not-found** 文件](/nextjs-cn/app/api-reference/file-conventions/not-found) 允许你通过在该段内渲染"未找到"UI 来优雅地处理此类错误。

```jsx
import { notFound } from 'next/navigation'

async function fetchUser(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const { id } = await params
  const user = await fetchUser(id)

  if (!user) {
    notFound()
  }

  // ...
}
```

> **须知**：由于使用了 TypeScript 的 [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) 类型，`notFound()` 不需要你使用 `return notFound()`。

## 版本历史

| 版本      | 变更              |
| --------- | ----------------- |
| `v13.0.0` | 引入 `notFound`。 |
