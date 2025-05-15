---
title: Next.js 中文文档 - useSelectedLayoutSegments
description: API参考文档，了解Next.js中useSelectedLayoutSegments钩子的用法和示例。
---

# Next.js 中文文档 - useSelectedLayoutSegments

`useSelectedLayoutSegments` 是一个客户端组件钩子，用于读取当前活动路由中当前布局级别**之下**的所有路由段。

这在创建需要了解当前活动路由的导航UI时非常有用，比如面包屑或多级菜单，这些UI需要了解所有层级的路由信息而不仅仅是直接子路由。

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function ExampleClientComponent() {
  const segments = useSelectedLayoutSegments()

  return (
    <div>
      {segments.map((segment, index) => (
        <span key={index}>
          {index > 0 && ' / '}
          {segment}
        </span>
      ))}
    </div>
  )
}
```

## 参数

`useSelectedLayoutSegments` 接受一个可选参数：

- `parallelRoutesKey` (可选): 字符串，指定要跟踪其段的并行路由插槽的名称（默认为'children'）

## 返回值

`useSelectedLayoutSegments` 返回一个字符串数组，表示当前布局之下的所有活动路由段。如果当前布局是路由的最后一个段，则返回空数组 `[]`。

### 示例：分层导航

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function Nav() {
  const segments = useSelectedLayoutSegments()

  return (
    <nav>
      <p>段: {segments.join(', ')}</p>
    </nav>
  )
}
```

## 行为说明

### 返回所有下级路由段

与仅返回一个直接子路由段的 [`useSelectedLayoutSegment`](/docs/nextjs/app-router/api-reference/functions/use-selected-layout-segment) 不同，`useSelectedLayoutSegments` 返回当前布局级别以下的**所有**路由段，这使得它特别适合需要完整路由上下文的UI组件。

例如，考虑以下嵌套布局结构：

```jsx
// app/layout.js (根布局)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RootNav />  {/* 使用 useSelectedLayoutSegments() */}
        {children}
      </body>
    </html>
  )
}

// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardNav />  {/* 使用 useSelectedLayoutSegments() */}
      {children}
    </>
  )
}
```

对于URL路径 `/dashboard/settings/permissions`：

- 在 `app/layout.js` 中，`useSelectedLayoutSegments` 返回 `["dashboard", "settings", "permissions"]`
- 在 `app/dashboard/layout.js` 中，`useSelectedLayoutSegments` 返回 `["settings", "permissions"]`

### 相对于父布局

`useSelectedLayoutSegments` 是相对于它被调用的父布局的，它只返回当前布局级别以下的路由段，而不是整个URL。

### 动态路由段

对于动态路由段，如 `[id]` 或 `[slug]`，`useSelectedLayoutSegments` 将返回包括方括号的实际段名称。

例如，对于URL `/products/[id]/analytics`，`useSelectedLayoutSegments` 将返回 `["[id]", "analytics"]`。

### 路由组

使用[路由组](/docs/nextjs/app-router/building-your-application/routing/route-groups)时（如 `(marketing)`），路由组名称会被忽略，不会包含在返回数组中。

例如，对于以下结构的URL `/blog/2023/01`：

```
app
  └── (marketing)
      └── blog
          └── [year]
              └── [month]
                  └── page.js
```

`useSelectedLayoutSegments` 将返回 `["blog", "[year]", "[month]"]`，不包含 `(marketing)`。

### 并行路由

当使用[并行路由](/docs/nextjs/app-router/building-your-application/routing/parallel-routes)时，`useSelectedLayoutSegments` 默认跟踪 `children` 插槽。要跟踪特定的命名插槽，可以将插槽名称作为参数传递：

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function MyComponent() {
  // 获取 @analytics 插槽的段
  const analyticsSegments = useSelectedLayoutSegments('analytics')

  return (
    <div>
      <p>Analytics Slot Segments: {analyticsSegments.join('/')}</p>
    </div>
  )
}
```

## 使用场景

### 构建面包屑导航

面包屑导航是 `useSelectedLayoutSegments` 的最常见用例之一：

```jsx
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()

  return (
    <nav aria-label="面包屑">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="text-blue-500 hover:underline">
            首页
          </Link>
        </li>

        {segments.map((segment, index) => {
          // 构建截至当前段的完整路径
          const path = `/${segments.slice(0, index + 1).join('/')}`

          // 表面化显示的文本（去除动态路由的中括号等）
          const displayText = segment
            .replace(/^\[|\]$/g, '') // 去除动态路由的中括号
            .replace(/^\.{3}/, '') // 去除拦截路由的前缀
            .replace(/-/g, ' ') // 用空格替换破折号
            .split('')
            .map(
              (char, i) => (i === 0 ? char.toUpperCase() : char), // 首字母大写
            )
            .join('')

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {index === segments.length - 1 ? (
                // 最后一个项目是当前页面，不是链接
                <span className="font-medium text-gray-800">{displayText}</span>
              ) : (
                <Link href={path} className="text-blue-500 hover:underline">
                  {displayText}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

### 构建多级导航菜单

`useSelectedLayoutSegments` 可以帮助创建智能导航菜单，显示当前路由的深度结构：

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import Link from 'next/link'

export default function MultiLevelNavigation() {
  const segments = useSelectedLayoutSegments()

  // 定义导航结构
  const navigation = [
    {
      name: '仪表盘',
      href: '/dashboard',
      segment: 'dashboard',
      children: [
        {
          name: '分析',
          href: '/dashboard/analytics',
          segment: 'analytics',
          children: [
            {
              name: '实时',
              href: '/dashboard/analytics/realtime',
              segment: 'realtime',
            },
            {
              name: '历史',
              href: '/dashboard/analytics/historical',
              segment: 'historical',
            },
          ],
        },
        {
          name: '设置',
          href: '/dashboard/settings',
          segment: 'settings',
          children: [],
        },
      ],
    },
    // ... 其他顶级导航项
  ]

  // 递归渲染导航项及其子项
  const renderNavItems = (items, depth = 0, currentPath = '') => {
    return (
      <ul className={`nav-level-${depth} ${depth === 0 ? 'space-y-2' : 'ml-4 space-y-1 mt-1'}`}>
        {items.map((item) => {
          // 检查此项是否是当前活动路径的一部分
          const isActive = segments.length > depth && segments[depth] === item.segment
          // 计算此项的完整路径（用于嵌套项）
          const itemPath = currentPath ? `${currentPath}/${item.segment}` : `/${item.segment}`

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-1 px-2 rounded ${
                  isActive
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>

              {/* 如果该项是活动的且有子项，则递归渲染子项 */}
              {isActive &&
                item.children.length > 0 &&
                renderNavItems(item.children, depth + 1, itemPath)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <nav className="w-64 bg-white p-4 shadow-sm h-screen">
      <div className="text-xl font-bold mb-6">应用名称</div>
      {renderNavItems(navigation)}
    </nav>
  )
}
```

### 构建日志记录组件

一个记录用户导航路径的组件：

```jsx
'use client'

import { useEffect } from 'react'
import { useSelectedLayoutSegments, usePathname } from 'next/navigation'

export function NavigationLogger() {
  const segments = useSelectedLayoutSegments()
  const pathname = usePathname()

  useEffect(() => {
    // 页面导航时记录
    console.log(`导航到: ${pathname}`)
    console.log(`路由段: ${segments.join('/')}`)

    // 这里可以发送分析数据
    const analyticsData = {
      path: pathname,
      segments: segments,
      timestamp: new Date().toISOString(),
    }

    // 示例: 发送到分析服务
    // sendToAnalytics(analyticsData)
  }, [pathname, segments])

  // 这个组件不渲染任何UI
  return null
}
```

### 条件权限控制

使用路由段进行动态权限检查：

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import { useAuth } from '@/hooks/auth' // 假设的认证钩子

export function PermissionGuard({ children }) {
  const segments = useSelectedLayoutSegments()
  const { user, hasPermission } = useAuth()

  // 当前路径所需的权限映射表
  const permissionMap = {
    admin: ['admin', 'super-admin'],
    users: ['user-read'],
    'users/create': ['user-create'],
    settings: ['settings-access'],
    // ...更多权限映射
  }

  // 获取当前路径的权限要求
  const currentPath = segments.join('/')
  const requiredPermissions = permissionMap[currentPath] || []

  // 检查用户是否有权限访问此路径
  const hasAccess =
    requiredPermissions.length === 0 ||
    requiredPermissions.some((permission) => hasPermission(permission))

  if (!user) {
    return <div>请登录后查看此内容</div>
  }

  if (!hasAccess) {
    return <div>您没有查看此页面的权限</div>
  }

  return children
}
```

## 与 `useSelectedLayoutSegment` 对比

| 特性           | useSelectedLayoutSegment | useSelectedLayoutSegments |
| -------------- | ------------------------ | ------------------------- |
| 返回值类型     | 字符串或null             | 字符串数组                |
| 返回内容       | 仅一个直接子路由段       | 所有子孙路由段            |
| 用例           | 简单的标签栏、单级导航   | 面包屑导航、多级导航菜单  |
| 空路由时返回值 | `null`                   | `[]` (空数组)             |

## 最佳实践

1. **处理路由段值**：对于动态路由段，使用处理函数将 `[id]` 转换为更友好的显示文本：

```jsx
function formatSegment(segment) {
  // 移除动态路由的方括号
  const withoutBrackets = segment.replace(/^\[|\]$/g, '')

  // 将破折号替换为空格并每个单词首字母大写
  return withoutBrackets
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// 使用示例
const segments = useSelectedLayoutSegments()
const formattedSegments = segments.map(formatSegment)
```

2. **结合使用路由上下文**：将 `useSelectedLayoutSegments` 与其他路由钩子结合使用，以获取完整的上下文：

```jsx
'use client'

import { useSelectedLayoutSegments, usePathname, useParams } from 'next/navigation'

function RouteContext() {
  const segments = useSelectedLayoutSegments()
  const pathname = usePathname()
  const params = useParams()

  return (
    <div>
      <p>路径: {pathname}</p>
      <p>段: {segments.join('/')}</p>
      <p>参数: {JSON.stringify(params)}</p>
    </div>
  )
}
```

3. **懒加载导航组件**：对于复杂的导航，考虑使用懒加载：

```jsx
'use client'

import { Suspense, lazy } from 'react'
import { useSelectedLayoutSegments } from 'next/navigation'

// 懒加载导航组件
const ComplexBreadcrumbs = lazy(() => import('./complex-breadcrumbs'))

export default function Navigation() {
  const segments = useSelectedLayoutSegments()

  // 如果路由级别很深，加载更复杂的导航
  const useComplex = segments.length > 2

  return (
    <nav>
      {useComplex ? (
        <Suspense fallback={<div>加载导航...</div>}>
          <ComplexBreadcrumbs segments={segments} />
        </Suspense>
      ) : (
        <SimpleBreadcrumbs segments={segments} />
      )}
    </nav>
  )
}

function SimpleBreadcrumbs({ segments }) {
  // 简单导航实现
  return <div>简单导航: {segments.join(' / ')}</div>
}
```

## 常见陷阱与解决方案

### 1. 引用动态段的实际值

**问题**: `useSelectedLayoutSegments` 返回的是包含括号的段名（如 `[id]`），而不是实际值。

**解决方案**: 结合使用 `useParams()` 钩子获取实际参数值：

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function BreadcrumbsWithDynamicValues() {
  const segments = useSelectedLayoutSegments()
  const params = useParams()

  // 将段名替换为实际值的函数
  const replaceWithActualValues = (segment) => {
    // 检查是否是动态段
    if (segment.startsWith('[') && segment.endsWith(']')) {
      // 提取参数名（去掉括号）
      const paramName = segment.slice(1, -1)
      // 返回实际值，如果有的话
      return params[paramName] || segment
    }
    return segment
  }

  const displaySegments = segments.map(replaceWithActualValues)

  return (
    <div>
      <p>路径段: {displaySegments.join(' / ')}</p>
    </div>
  )
}
```

### 2. 处理并行路由

**问题**: 在复杂的并行路由结构中，跟踪多个插槽的段可能会很混乱。

**解决方案**: 为每个插槽创建单独的导航组件：

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function ParallelRoutesNav() {
  // 跟踪主内容插槽
  const mainSegments = useSelectedLayoutSegments()
  // 跟踪 @analytics 插槽
  const analyticsSegments = useSelectedLayoutSegments('analytics')
  // 跟踪 @team 插槽
  const teamSegments = useSelectedLayoutSegments('team')

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-bold">主导航</h3>
        <p>{mainSegments.join(' / ') || '根路径'}</p>
      </div>

      <div>
        <h3 className="font-bold">分析导航</h3>
        <p>{analyticsSegments.join(' / ') || '无分析路径'}</p>
      </div>

      <div>
        <h3 className="font-bold">团队导航</h3>
        <p>{teamSegments.join(' / ') || '无团队路径'}</p>
      </div>
    </div>
  )
}
```

### 3. 处理复杂的嵌套结构

**问题**: 深度嵌套的路由结构可能会导致面包屑或导航组件过长。

**解决方案**: 实现折叠/截断策略：

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import Link from 'next/link'

export default function CollapsibleBreadcrumbs() {
  const segments = useSelectedLayoutSegments()

  // 如果段太多，折叠中间部分
  const shouldCollapse = segments.length > 4
  let displaySegments = segments

  if (shouldCollapse) {
    // 保留第一个和最后三个段
    displaySegments = [
      segments[0],
      '...', // 表示折叠
      ...segments.slice(-3),
    ]
  }

  return (
    <nav aria-label="面包屑">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link href="/" className="text-blue-500 hover:underline">
            首页
          </Link>
        </li>

        {displaySegments.map((segment, index) => {
          // 为折叠项目特殊处理
          if (segment === '...') {
            return (
              <li key="collapsed" className="flex items-center">
                <span className="mx-2">/</span>
                <button
                  className="text-gray-500 hover:text-blue-500"
                  title="显示所有路径段"
                  onClick={() => setCollapsed(false)}
                >
                  ...
                </button>
              </li>
            )
          }

          // 构建路径
          const path =
            segment === segments[0]
              ? `/${segment}`
              : `/${segments.slice(0, segments.indexOf(segment) + 1).join('/')}`

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2">/</span>
              {index === displaySegments.length - 1 ? (
                <span className="font-medium">{segment}</span>
              ) : (
                <Link href={path} className="text-blue-500 hover:underline">
                  {segment}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

## 数据流向

`useSelectedLayoutSegments` 从客户端路由器获取信息，该路由器在初始页面加载时从服务器组件获得其初始值，然后通过客户端导航自行更新：

```
Server Component → (during initial page load) → Client Router → useSelectedLayoutSegments
                  ↑                            ↓
                  └─ (during client navigation)┘
```

## 注意事项和限制

1. `useSelectedLayoutSegments` 是一个客户端组件钩子，不能在服务器组件中使用。

2. 返回的段数组不包括路由组名称（如 `(marketing)`）。

3. 动态段会包含方括号（如 `[id]`），而不是实际值。要获取实际值，需要使用 `useParams()` 钩子。

4. 如果布局是在路由的最后一个段，则 `useSelectedLayoutSegments` 将返回空数组 `[]`。

5. 当与并行路由一起使用时，默认跟踪 `children` 插槽，除非指定了其他插槽名称。

## 相关函数

- **[`useSelectedLayoutSegment`](/docs/nextjs/app-router/api-reference/functions/use-selected-layout-segment)**：类似于 `useSelectedLayoutSegments`，但只返回一个直接子路由段，而不是所有段的数组。

- **[`useParams`](/docs/nextjs/app-router/api-reference/functions/use-params)**：返回当前路由的动态参数对象。

- **[`usePathname`](/docs/nextjs/app-router/api-reference/functions/use-pathname)**：返回当前URL的路径名部分。

## 版本历史

| 版本    | 变更                                 |
| ------- | ------------------------------------ |
| v13.0.0 | `useSelectedLayoutSegments` 钩子引入 |
| v13.3.0 | 添加了对并行路由插槽跟踪的支持       |

```

```
