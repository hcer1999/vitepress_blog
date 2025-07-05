---
title: usePathname
description: usePathname 钩子的 API 参考。
---

`usePathname` 是一个**客户端组件**钩子，让你可以读取当前 URL 的**路径名**。

```tsx switcher
'use client'

import { usePathname } from 'next/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

```jsx switcher
'use client'

import { usePathname } from 'next/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

`usePathname` 有意要求使用[客户端组件](/docs/nextjs-cn/app/building-your-application/rendering/client-components)。重要的是要注意，客户端组件并不是一种优化上的妥协。它们是[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)架构的重要组成部分。

例如，在初始页面加载时，带有 `usePathname` 的客户端组件将被渲染成 HTML。在导航到新路由时，不需要重新获取此组件。相反，组件只被下载一次（在客户端 JavaScript 包中），并根据当前状态重新渲染。

> **须知**：
>
> - 不支持从[服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)读取当前 URL。这种设计是有意为之的，目的是支持布局状态在页面导航过程中得到保存。
> - 兼容性模式：
>   - 当渲染[回退路由](/docs/nextjs-cn/pages/api-reference/functions/get-static-paths#fallback-true)时，或者当 `pages` 目录页面被 Next.js [自动静态优化](/docs/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization)且路由器未准备好时，`usePathname` 可能返回 `null`。
>   - 当在 [`next.config`](/docs/nextjs-cn/app/api-reference/config/next-config-js/rewrites) 或 [`Middleware`](/docs/nextjs-cn/app/building-your-application/routing/index/middleware) 中使用带有重写的 `usePathname` 时，必须同时使用 `useState` 和 `useEffect` 以避免水合不匹配错误。
>   - 如果 Next.js 检测到你的项目中同时存在 `app` 和 `pages` 目录，它将自动更新你的类型。

## 参数

```tsx
const pathname = usePathname()
```

`usePathname` 不接受任何参数。

## 返回值

`usePathname` 返回当前 URL 路径名的字符串。例如：

| URL                 | 返回值                |
| ------------------- | --------------------- |
| `/`                 | `'/'`                 |
| `/dashboard`        | `'/dashboard'`        |
| `/dashboard?v=2`    | `'/dashboard'`        |
| `/blog/hello-world` | `'/blog/hello-world'` |

## 示例

### 响应路由变化执行操作

```tsx switcher
'use client'

import { usePathname, useSearchParams } from 'next/navigation'

function ExampleClientComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // 在这里执行操作...
  }, [pathname, searchParams])
}
```

```jsx switcher
'use client'

import { usePathname, useSearchParams } from 'next/navigation'

function ExampleClientComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // 在这里执行操作...
  }, [pathname, searchParams])
}
```

| 版本      | 变更                 |
| --------- | -------------------- |
| `v13.0.0` | 引入 `usePathname`。 |
