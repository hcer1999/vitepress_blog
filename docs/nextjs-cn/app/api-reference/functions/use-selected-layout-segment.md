---
title: useSelectedLayoutSegment
description: useSelectedLayoutSegment 钩子的 API 参考。
---

# NextJS中文文档 - Use Selected Layout Segment

`useSelectedLayoutSegment` 是一个**客户端组件**钩子，允许你读取调用它的 Layout 下**一级**的活动路由段。

它对导航 UI 很有用，例如父级布局中的标签，这些标签会根据活动的子段改变样式。

```tsx switcher
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()

  return <p>Active segment: {segment}</p>
}
```

```jsx switcher
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()

  return <p>Active segment: {segment}</p>
}
```

> **须知**：
>
> - 由于 `useSelectedLayoutSegment` 是一个[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)钩子，而 Layout 默认是[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)，`useSelectedLayoutSegment` 通常通过导入到 Layout 中的客户端组件调用。
> - `useSelectedLayoutSegment` 只返回下一级的段。要返回所有活动段，请参见 [`useSelectedLayoutSegments`](/nextjs-cn/app/api-reference/functions/use-selected-layout-segments)。

## 参数

```tsx
const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)
```

`useSelectedLayoutSegment` *可选地*接受一个 [`parallelRoutesKey`](/nextjs-cn/app/building-your-application/routing/parallel-routes#useselectedlayoutsegments)，允许你读取该插槽内的活动路由段。

## 返回值

`useSelectedLayoutSegment` 返回活动段的字符串，如果不存在则返回 `null`。

例如，给定以下的 Layout 和 URL，返回的段将是：

| Layout                    | 访问的 URL                     | 返回的段      |
| ------------------------- | ------------------------------ | ------------- |
| `app/layout.js`           | `/`                            | `null`        |
| `app/layout.js`           | `/dashboard`                   | `'dashboard'` |
| `app/dashboard/layout.js` | `/dashboard`                   | `null`        |
| `app/dashboard/layout.js` | `/dashboard/settings`          | `'settings'`  |
| `app/dashboard/layout.js` | `/dashboard/analytics`         | `'analytics'` |
| `app/dashboard/layout.js` | `/dashboard/analytics/monthly` | `'analytics'` |

## 示例

### 创建活动链接组件

你可以使用 `useSelectedLayoutSegment` 创建一个活动链接组件，该组件根据活动段改变样式。例如，博客侧边栏中的精选文章列表：

```tsx switcher
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

// 这个*客户端*组件将被导入到博客布局中
export default function BlogNavLink({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  // 导航到 `/blog/hello-world` 将返回 'hello-world'
  // 作为选定的布局段
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (
    <Link
      href={`/blog/${slug}`}
      // 根据链接是否活动来改变样式
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {children}
    </Link>
  )
}
```

```jsx switcher
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

// 这个*客户端*组件将被导入到博客布局中
export default function BlogNavLink({ slug, children }) {
  // 导航到 `/blog/hello-world` 将返回 'hello-world'
  // 作为选定的布局段
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (
    <Link
      href={`/blog/${slug}`}
      // 根据链接是否活动来改变样式
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {children}
    </Link>
  )
}
```

```tsx switcher
// 将客户端组件导入到父级布局（服务器组件）中
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

```jsx switcher
// 将客户端组件导入到父级布局（服务器组件）中
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'

export default async function Layout({ children }) {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

## 版本历史

| 版本      | 变更                              |
| --------- | --------------------------------- |
| `v13.0.0` | 引入 `useSelectedLayoutSegment`。 |
