---
title: unstable_cache
description: unstable_cache 函数的 API 参考。
---

> **注意：** 当 [`use cache`](/docs/app/api-reference/directives/use-cache) 稳定后，此 API 将被替换。

`unstable_cache` 允许你缓存昂贵操作的结果，如数据库查询，并在多个请求中重复使用它们。

```jsx
import { getUser } from './data';
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (id) => getUser(id),
  ['my-app-user']
);

export default async function Component({ userID }) {
  const user = await getCachedUser(userID);
  ...
}
```

> **须知**:
>
> - 在缓存作用域内访问动态数据源（如 `headers` 或 `cookies`）是不支持的。如果你需要在缓存函数内使用这些数据，请在缓存函数外部使用 `headers`，并将所需的动态数据作为参数传入。
> - 此 API 使用 Next.js 内置的[数据缓存](/docs/app/deep-dive/caching#data-cache)来在请求和部署之间持久化结果。

> **警告**：此 API 不稳定，将来可能会改变。随着此 API 的稳定，我们将在需要时提供迁移文档和代码修改工具。

## 参数

```jsx
const data = unstable_cache(fetchData, keyParts, options)()
```

- `fetchData`：这是一个异步函数，用于获取你想要缓存的数据。它必须是一个返回 `Promise` 的函数。
- `keyParts`：这是一个额外的键数组，进一步为缓存添加标识。默认情况下，`unstable_cache` 已经使用参数和函数的字符串化版本作为缓存键。在大多数情况下它是可选的；只有当你使用外部变量而不将它们作为参数传递时，才需要使用它。但是，如果你没有将闭包作为参数传递，则在函数内使用闭包时添加它们很重要。
- `options`：这是一个控制缓存行为的对象。它可以包含以下属性：
  - `tags`：一个标签数组，可用于控制缓存失效。Next.js 不会使用它来唯一标识函数。
  - `revalidate`：缓存应该重新验证的秒数。省略或传递 `false` 将无限期缓存，直到调用匹配的 `revalidateTag()` 或 `revalidatePath()` 方法。

## 返回值

`unstable_cache` 返回一个函数，当调用时，返回一个解析为缓存数据的 Promise。如果数据不在缓存中，将调用提供的函数，并缓存和返回其结果。

## 示例

```tsx filename="app/page.tsx" switcher
import { unstable_cache } from 'next/cache'

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  const getCachedUser = unstable_cache(
    async () => {
      return { id: userId }
    },
    [userId], // 将用户 ID 添加到缓存键
    {
      tags: ['users'],
      revalidate: 60,
    },
  )

  //...
}
```

```jsx filename="app/page.jsx" switcher
import { unstable_cache } from 'next/cache';

export default async function Page({ params } }) {
  const { userId } = await params
  const getCachedUser = unstable_cache(
    async () => {
      return { id: userId };
    },
    [userId], // 将用户 ID 添加到缓存键
    {
      tags: ["users"],
      revalidate: 60,
    }
  );

  //...
}
```

## 版本历史

| 版本      | 变更                    |
| --------- | ----------------------- |
| `v14.0.0` | 引入 `unstable_cache`。 |
