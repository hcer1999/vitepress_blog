---
title: useRouter
description: useRouter 钩子的 API 参考。
---

# NextJS中文文档 - Use Router

`useRouter` 钩子允许你在[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)中以编程方式更改路由。

> **建议：** 除非你有使用 `useRouter` 的特定需求，否则请使用 [`<Link>` 组件](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#link-component) 进行导航。

```tsx switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表盘
    </button>
  )
}
```

```jsx switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      仪表盘
    </button>
  )
}
```

## `useRouter()`

- `router.push(href: string, { scroll: boolean })`: 执行客户端导航到提供的路由。在[浏览器的历史](https://developer.mozilla.org/docs/Web/API/History_API)栈中添加一个新条目。
- `router.replace(href: string, { scroll: boolean })`: 执行客户端导航到提供的路由，但不在[浏览器的历史栈](https://developer.mozilla.org/docs/Web/API/History_API)中添加新条目。
- `router.refresh()`: 刷新当前路由。向服务器发送新请求，重新获取数据请求，并重新渲染服务器组件。客户端将合并更新后的 React 服务器组件有效载荷，而不会丢失不受影响的客户端 React 状态（例如 `useState`）或浏览器状态（例如滚动位置）。
- `router.prefetch(href: string)`: [预取](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#prefetching)提供的路由，以便更快的客户端过渡。
- `router.back()`: 导航回浏览器历史栈中的上一个路由。
- `router.forward()`: 导航到浏览器历史栈中的下一个页面。

> **须知**：
>
> - 你不能向 `router.push` 或 `router.replace` 发送不受信任或未经净化的 URL，因为这可能会使你的网站面临跨站脚本攻击（XSS）的风险。例如，发送到 `router.push` 或 `router.replace` 的 `javascript:` URL 将在你的页面上下文中执行。
> - `<Link>` 组件会在路由进入视口时自动预取路由。
> - 如果获取请求被缓存，`refresh()` 可能会产生相同的结果。其他动态 API（如 `cookies` 和 `headers`）也可能改变响应。

### 从 `next/router` 迁移

- 在使用 App Router 时，`useRouter` 钩子应该从 `next/navigation` 导入，而不是从 `next/router` 导入
- `pathname` 字符串已被移除，替换为 [`usePathname()`](/nextjs-cn/app/api-reference/functions/use-pathname)
- `query` 对象已被移除，替换为 [`useSearchParams()`](/nextjs-cn/app/api-reference/functions/use-search-params)
- `router.events` 已被替换。[见下文。](#router-events)

[查看完整迁移指南](/nextjs-cn/app/guides/migrating/app-router-migration)。

## 示例

### 路由事件

你可以通过组合其他客户端组件钩子（如 `usePathname` 和 `useSearchParams`）来监听页面变化。

```jsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    // 现在你可以使用当前 URL
    // ...
  }, [pathname, searchParams])

  return '...'
}
```

可以导入到布局中。

```jsx highlight={2,12}
import { Suspense } from 'react'
import { NavigationEvents } from './components/navigation-events'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  )
}
```

> **须知**：`<NavigationEvents>` 被包装在一个 [`Suspense` 边界](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming#example)中，因为 [`useSearchParams()`](/nextjs-cn/app/api-reference/functions/use-search-params) 在[静态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)期间会导致客户端渲染到最近的 `Suspense` 边界。[了解更多](/nextjs-cn/app/api-reference/functions/use-search-params#behavior)。

### 禁用滚动到顶部

默认情况下，Next.js 在导航到新路由时会滚动到页面顶部。你可以通过向 `router.push()` 或 `router.replace()` 传递 `scroll: false` 来禁用此行为。

```tsx switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard', { scroll: false })}>
      仪表盘
    </button>
  )
}
```

```jsx switcher
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard', { scroll: false })}>
      仪表盘
    </button>
  )
}
```

## 版本历史

| 版本      | 变更                                        |
| --------- | ------------------------------------------- |
| `v13.0.0` | 引入来自 `next/navigation` 的 `useRouter`。 |
