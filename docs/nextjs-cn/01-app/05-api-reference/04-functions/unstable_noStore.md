---
title: unstable_noStore
description: unstable_noStore 函数的 API 参考。
version: legacy
---

**在版本 15 中，我们建议使用 [`connection`](/docs/app/api-reference/functions/connection) 而不是 `unstable_noStore`。**

`unstable_noStore` 可用于声明性地选择退出静态渲染，并指示特定组件不应被缓存。

```jsx
import { unstable_noStore as noStore } from 'next/cache';

export default async function ServerComponent() {
  noStore();
  const result = await db.query(...);
  ...
}
```

> **须知**:
>
> - `unstable_noStore` 等同于在 `fetch` 上使用 `cache: 'no-store'`
> - `unstable_noStore` 优先于 `export const dynamic = 'force-dynamic'`，因为它更加精细，可以基于每个组件使用

- 在 [`unstable_cache`](/docs/app/api-reference/functions/unstable_cache) 内使用 `unstable_noStore` 不会选择退出静态生成。相反，它将遵循缓存配置来决定是否缓存结果。

## 用法

如果你不想向 `fetch` 传递额外选项，如 `cache: 'no-store'`、`next: { revalidate: 0 }` 或在 `fetch` 不可用的情况下，你可以使用 `noStore()` 作为所有这些用例的替代方案。

```jsx
import { unstable_noStore as noStore } from 'next/cache';

export default async function ServerComponent() {
  noStore();
  const result = await db.query(...);
  ...
}
```

## 版本历史

| 版本      | 变更                                      |
| --------- | ----------------------------------------- |
| `v15.0.0` | `unstable_noStore` 被 `connection` 取代。 |
| `v14.0.0` | 引入 `unstable_noStore`。                 |
