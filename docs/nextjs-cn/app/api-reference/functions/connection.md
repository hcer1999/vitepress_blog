---
title: connection
description: connection 函数的 API 参考。
---

`connection()` 函数允许你指示渲染应等待传入的用户请求后再继续。

当组件不使用[动态 API](/docs/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-apis)，但你希望它在运行时动态渲染而不是在构建时静态渲染时，这个函数很有用。这通常发生在你访问外部信息，并有意让它改变渲染结果的情况下，例如 `Math.random()` 或 `new Date()`。

```ts switcher
import { connection } from 'next/server'

export default async function Page() {
  await connection()
  // 下面的所有内容将被排除在预渲染之外
  const rand = Math.random()
  return <span>{rand}</span>
}
```

```jsx switcher
import { connection } from 'next/server'

export default async function Page() {
  await connection()
  // 下面的所有内容将被排除在预渲染之外
  const rand = Math.random()
  return <span>{rand}</span>
}
```

## 参考

### 类型

```jsx
function connection(): Promise<void>
```

### 参数

- 该函数不接受任何参数。

### 返回值

- 该函数返回一个 `void` Promise。它不需要被消费。

## 须知

- `connection` 替代了 [`unstable_noStore`](/docs/nextjs-cn/app/api-reference/functions/unstable_noStore)，以更好地与 Next.js 的未来发展方向保持一致。
- 只有在需要动态渲染且没有使用常见的动态 API 时，才需要使用该函数。

### 版本历史

| 版本       | 变更                      |
| ---------- | ------------------------- |
| `v15.0.0`  | `connection` 稳定版发布。 |
| `v15.0.RC` | 引入 `connection`。       |
