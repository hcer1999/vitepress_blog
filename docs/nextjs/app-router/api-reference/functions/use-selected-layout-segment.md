---
title: Next.js 中文文档 - useSelectedLayoutSegment
description: API参考文档，了解Next.js中useSelectedLayoutSegment钩子的使用方法。
---

# Next.js 中文文档 - useSelectedLayoutSegment

`useSelectedLayoutSegment` 是一个客户端组件钩子，用于读取当前路由中活动的路由段。

这对于创建反映当前活动路由段的导航UI（如标签栏）非常有用，因为它允许在布局中高亮显示当前活动的子段。

```jsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()

  return <p>活动段: {segment}</p>
}
```

## 参数

`useSelectedLayoutSegment` 不接受任何参数。

## 返回值

`useSelectedLayoutSegment` 返回当前活动的路由段（字符串）或者当没有活动段时返回 `null`。

### 显示活动路由段

```jsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function Navigation() {
  const segment = useSelectedLayoutSegment()

  return (
    <nav>
      <ul>
        <li>
          <a className={segment === null ? 'active' : ''} href="/">
            首页
          </a>
        </li>
        <li>
          <a className={segment === 'analytics' ? 'active' : ''} href="/analytics">
            分析
          </a>
        </li>
        <li>
          <a className={segment === 'settings' ? 'active' : ''} href="/settings">
            设置
          </a>
        </li>
      </ul>
    </nav>
  )
}
```

## 行为说明

### 相对于父布局

重要的是要理解，`useSelectedLayoutSegment` 返回的段是相对于它被调用的父布局的。

例如，考虑以下嵌套布局结构：

```jsx
// app/layout.js (根布局)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RootNav />  {/* 使用 useSelectedLayoutSegment() */}
        {children}
      </body>
    </html>
  )
}

// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardNav />  {/* 使用 useSelectedLayoutSegment() */}
      {children}
    </>
  )
}
```

对于URL路径 `/dashboard/settings`：

- 在 `app/layout.js` 中，`useSelectedLayoutSegment` 返回 `"dashboard"`
- 在 `app/dashboard/layout.js` 中，`useSelectedLayoutSegment` 返回 `"settings"`

这种相对特性使布局组件更易于重用，因为它们只关心其直接子路由而不依赖完整路由结构。

### 动态路由段

对于动态路由段，如 `[id]` 或 `[slug]`，`useSelectedLayoutSegment` 将返回实际的动态段字符串，包括方括号。

例如，对于URL `/products/[id]`，`useSelectedLayoutSegment` 将返回 `"[id]"`。

如果您需要访问动态段的实际值（例如 `/products/123` 中的 `"123"`），应使用 [`useParams()`](/docs/nextjs/app-router/api-reference/functions/use-params) 钩子。

### 截获路由

当使用[截获路由](/docs/nextjs/app-router/building-your-application/routing/intercepting-routes)（如 `(..)photo`）时，`useSelectedLayoutSegment` 将返回截获的路由段名称（包括截获标记）。

例如，如果你有一个 `app/feed/(..)photo/[id]/page.js` 布局，当用户导航到截获的路由时，`useSelectedLayoutSegment` 会返回 `"(..)photo"`。

### 路由组

使用[路由组](/docs/nextjs/app-router/building-your-application/routing/route-groups)时（如 `(marketing)`）时，该组不会被算作路由段，组名会被忽略。

例如，对于URL `/blog`，如果您有以下结构：

```
app
  └── (marketing)
      └── blog
          └── page.js
```

`useSelectedLayoutSegment` 将返回 `"blog"` 而非 `"(marketing)"`。

## 示例

### 创建标签式导航

```jsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx' // 用于条件类名

// 在app/dashboard/layout.js中使用
export default function DashboardNav() {
  const segment = useSelectedLayoutSegment()

  const tabs = [
    { name: '概览', href: '/dashboard', segment: null },
    { name: '数据分析', href: '/dashboard/analytics', segment: 'analytics' },
    { name: '报表', href: '/dashboard/reports', segment: 'reports' },
    { name: '用户管理', href: '/dashboard/users', segment: 'users' },
    { name: '设置', href: '/dashboard/settings', segment: 'settings' },
  ]

  return (
    <nav className="dashboard-tabs">
      <ul className="flex border-b">
        {tabs.map((tab) => (
          <li key={tab.href} className="mr-2">
            <Link
              href={tab.href}
              className={clsx(
                'inline-block px-4 py-2 rounded-t-lg',
                segment === tab.segment
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200',
              )}
            >
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

### 面包屑导航

结合 `useSelectedLayoutSegment` 和 `usePathname` 创建面包屑：

```jsx
'use client'

import { useSelectedLayoutSegment, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segment = useSelectedLayoutSegment()

  // 面包屑映射表
  const breadcrumbMap = {
    dashboard: '仪表盘',
    users: '用户',
    settings: '设置',
    analytics: '分析',
    reports: '报表',
  }

  // 如果在根路径，只显示首页
  if (pathname === '/') {
    return (
      <div className="breadcrumbs">
        <span>首页</span>
      </div>
    )
  }

  // 分割路径为段
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <div className="breadcrumbs flex">
      <Link href="/" className="text-blue-500 hover:underline">
        首页
      </Link>

      {pathSegments.map((pathSegment, index) => {
        // 构建当前链接的URL
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`
        const isLast = index === pathSegments.length - 1
        const displayText = breadcrumbMap[pathSegment] || pathSegment

        return (
          <span key={href}>
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="font-medium">{displayText}</span>
            ) : (
              <Link href={href} className="text-blue-500 hover:underline">
                {displayText}
              </Link>
            )}
          </span>
        )
      })}
    </div>
  )
}
```

### 响应式移动导航

为移动设备创建响应式导航:

```jsx
'use client'

import { useState } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
import { Menu, XIcon } from 'lucide-react' // 图标库

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false)
  const segment = useSelectedLayoutSegment()

  const navItems = [
    { name: '首页', href: '/', segment: null },
    { name: '产品', href: '/products', segment: 'products' },
    { name: '博客', href: '/blog', segment: 'blog' },
    { name: '关于', href: '/about', segment: 'about' },
    { name: '联系', href: '/contact', segment: 'contact' },
  ]

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                品牌名称
              </Link>
            </div>

            {/* 桌面导航 - 隐藏在移动设备上 */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    segment === item.segment
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 移动菜单按钮 */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <XIcon size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 移动导航菜单 */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  segment === item.segment
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
```

### 多级导航处理

当你有多层级的路由结构，并想要创建一个能够处理任意多级别的侧边导航时：

```jsx
'use client'

import { useState } from 'react'
import { useSelectedLayoutSegment, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react' // 图标

// 递归菜单项组件
function NavItem({ item, pathname, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(false)
  const segment = useSelectedLayoutSegment()
  const isActive = pathname.startsWith(item.href)

  // 检查是否有子项
  const hasChildren = item.children && item.children.length > 0

  return (
    <li className={`nav-item ${depth > 0 ? 'ml-4' : ''}`}>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className={`block py-2 ${
            isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-500'
          }`}
        >
          {item.name}
        </Link>

        {hasChildren && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-100">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>

      {/* 递归渲染子菜单 */}
      {hasChildren && isOpen && (
        <ul className="pl-2 border-l border-gray-200 mt-1">
          {item.children.map((child) => (
            <NavItem key={child.href} item={child} pathname={pathname} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function MultilevelNav() {
  const pathname = usePathname()

  // 多级导航结构
  const navItems = [
    {
      name: '仪表盘',
      href: '/dashboard',
      children: [],
    },
    {
      name: '用户管理',
      href: '/users',
      children: [
        {
          name: '所有用户',
          href: '/users/list',
          children: [],
        },
        {
          name: '用户组',
          href: '/users/groups',
          children: [],
        },
        {
          name: '权限',
          href: '/users/permissions',
          children: [
            {
              name: '角色管理',
              href: '/users/permissions/roles',
              children: [],
            },
            {
              name: '能力管理',
              href: '/users/permissions/capabilities',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: '内容管理',
      href: '/content',
      children: [
        {
          name: '文章',
          href: '/content/articles',
          children: [],
        },
        {
          name: '页面',
          href: '/content/pages',
          children: [],
        },
        {
          name: '媒体库',
          href: '/content/media',
          children: [],
        },
      ],
    },
    {
      name: '设置',
      href: '/settings',
      children: [],
    },
  ]

  return (
    <nav className="w-64 bg-white p-4 shadow-sm h-screen">
      <div className="text-xl font-bold mb-6">应用名称</div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} pathname={pathname} />
        ))}
      </ul>
    </nav>
  )
}
```

## 数据流向

`useSelectedLayoutSegment` 从客户端路由器获取信息，该路由器在初始页面加载时从服务器组件获得其初始值，然后通过客户端导航自行更新。数据流向图如下：

```
Server Component → (during initial page load) → Client Router → useSelectedLayoutSegment
                  ↑                            ↓
                  └─ (during client navigation)┘
```

## 注意事项和限制

1. `useSelectedLayoutSegment` 是一个客户端组件钩子，不能在服务器组件中使用。

2. `useSelectedLayoutSegment` 只返回该布局的直接子路由段，不会返回后代段。如果需要访问所有下级路由段，请使用 [`useSelectedLayoutSegments`](/docs/nextjs/app-router/api-reference/functions/use-selected-layout-segments)。

3. 如果布局是在路由的最后一个段，则 `useSelectedLayoutSegment` 将返回 `null`，因为没有下一个子段。

4. 路由组（如 `(marketing)`）不会被 `useSelectedLayoutSegment` 计入为段。

5. 当与[并行路由](/docs/nextjs/app-router/building-your-application/routing/parallel-routes)一起使用时，`useSelectedLayoutSegment` 默认跟踪默认插槽（`@children`）。要跟踪特定的命名插槽，您需要将插槽名称作为参数传递：`useSelectedLayoutSegment('slotName')`。

## 常见用法

- **导航栏高亮显示**：根据当前活动段设置导航项的活动状态。
- **面包屑导航**：构建基于当前路径的面包屑组件。
- **条件渲染UI元素**：根据当前活动段显示或隐藏特定UI元素。
- **特定路由的特殊样式**：为特定路由应用独特的风格或布局变化。

## 相关函数

- **[`useSelectedLayoutSegments`](/docs/nextjs/app-router/api-reference/functions/use-selected-layout-segments)**：类似于 `useSelectedLayoutSegment`，但返回包含当前布局之下所有活动段的数组，而不仅仅是直接子段。
- **[`useParams`](/docs/nextjs/app-router/api-reference/functions/use-params)**：返回当前路由的动态参数对象。
- **[`usePathname`](/docs/nextjs/app-router/api-reference/functions/use-pathname)**：返回当前URL的路径名部分。

## 版本历史

| 版本    | 变更                                |
| ------- | ----------------------------------- |
| v13.0.0 | `useSelectedLayoutSegment` 钩子引入 |
| v13.3.0 | 添加了对并行路由插槽跟踪的支持      |

</rewritten_file>
