---
title: useSelectedLayoutSegments
description: useSelectedLayoutSegments 钩子的 API 参考。
---

`useSelectedLayoutSegments` 是一个**客户端组件**钩子，它允许你读取调用它的布局**下方**的活动路由段。

它对于在父布局中创建需要了解活动子段的 UI（如面包屑导航）非常有用。

```tsx switcher
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function ExampleClientComponent() {
  const segments = useSelectedLayoutSegments()

  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  )
}
```

```jsx switcher
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function ExampleClientComponent() {
  const segments = useSelectedLayoutSegments()

  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  )
}
```

> **须知**：
>
> - 由于 `useSelectedLayoutSegments` 是一个[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)钩子，而布局默认是[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)，所以 `useSelectedLayoutSegments` 通常通过导入到布局中的客户端组件调用。
> - 返回的段包括[路由组](/nextjs-cn/app/building-your-application/routing/route-groups)，你可能不希望将其包含在 UI 中。你可以使用 `filter()` 数组方法来移除以括号开头的项。

## 参数

```tsx
const segments = useSelectedLayoutSegments(parallelRoutesKey?: string)
```

`useSelectedLayoutSegments` *可选择性地*接受一个 [`parallelRoutesKey`](/nextjs-cn/app/building-your-application/routing/parallel-routes#useselectedlayoutsegments)，它允许你读取该插槽内的活动路由段。

## 返回值

`useSelectedLayoutSegments` 返回一个字符串数组，包含从调用钩子的布局向下一级的活动段。如果不存在，则返回空数组。

例如，给定以下布局和 URL，返回的段将是：

| 布局                      | 访问的 URL            | 返回的段                    |
| ------------------------- | --------------------- | --------------------------- |
| `app/layout.js`           | `/`                   | `[]`                        |
| `app/layout.js`           | `/dashboard`          | `['dashboard']`             |
| `app/layout.js`           | `/dashboard/settings` | `['dashboard', 'settings']` |
| `app/dashboard/layout.js` | `/dashboard`          | `[]`                        |
| `app/dashboard/layout.js` | `/dashboard/settings` | `['settings']`              |

## 版本历史

| 版本      | 变更                               |
| --------- | ---------------------------------- |
| `v13.0.0` | 引入 `useSelectedLayoutSegments`。 |
