---
title: unstable_rethrow
description: unstable_rethrow 函数的 API 参考。
version: unstable
---

`unstable_rethrow` 可用于避免在尝试处理应用程序代码中抛出的错误时捕获 Next.js 内部抛出的错误。

例如，调用 `notFound` 函数将抛出一个 Next.js 内部错误并渲染 [`not-found.js`](/nextjs-cn/app/api-reference/file-conventions/not-found) 组件。然而，如果在 `try/catch` 块内使用，错误将被捕获，阻止 `not-found.js` 渲染：

```tsx
import { notFound } from 'next/navigation'

export default async function Page() {
  try {
    const post = await fetch('https://.../posts/1').then((res) => {
      if (res.status === 404) notFound()
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
  } catch (err) {
    console.error(err)
  }
}
```

你可以使用 `unstable_rethrow` API 重新抛出内部错误并继续预期的行为：

```tsx
import { notFound, unstable_rethrow } from 'next/navigation'

export default async function Page() {
  try {
    const post = await fetch('https://.../posts/1').then((res) => {
      if (res.status === 404) notFound()
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
  } catch (err) {
    unstable_rethrow(err)
    console.error(err)
  }
}
```

以下 Next.js API 依赖于抛出错误，这些错误应该被重新抛出并由 Next.js 本身处理：

- [`notFound()`](/nextjs-cn/app/api-reference/functions/not-found)
- [`redirect()`](/nextjs-cn/app/building-your-application/routing/redirecting#redirect-function)
- [`permanentRedirect()`](/nextjs-cn/app/building-your-application/routing/redirecting#permanentredirect-function)

如果路由段被标记为除非是静态的否则抛出错误，动态 API 调用也会抛出一个类似的错误，开发者不应该捕获这个错误。请注意，部分预渲染 (PPR) 也会影响这种行为。这些 API 包括：

- [`cookies`](/nextjs-cn/app/api-reference/functions/cookies)
- [`headers`](/nextjs-cn/app/api-reference/functions/headers)
- [`searchParams`](/nextjs-cn/app/api-reference/file-conventions/page#searchparams-optional)
- `fetch(..., { cache: 'no-store' })`
- `fetch(..., { next: { revalidate: 0 } })`

> **须知**:
>
> - 此方法应该在 catch 块的顶部调用，将错误对象作为其唯一参数传递。它也可以在 promise 的 `.catch` 处理程序中使用。
> - 如果你确保对会抛出错误的 API 的调用没有被 try/catch 包装，那么你不需要使用 `unstable_rethrow`。
> - 任何资源清理（如清除间隔、计时器等）必须在调用 `unstable_rethrow` 之前进行，或者在 `finally` 块内进行。

## 版本历史

| 版本      | 变更                      |
| --------- | ------------------------- |
| `v15.0.0` | 引入 `unstable_rethrow`。 |
