---
title: Next.js 中文文档 - 并行路由
description: 同时在同一个视图中渲染多个页面，并通过独立的路由导航，支持复杂应用场景
---

# Next.js 中文文档 - 并行路由

并行路由允许你在同一个布局中同时渲染多个页面，每个页面有自己独立的导航状态。对于高度动态的应用程序部分（如仪表盘、社交网站的信息流、电商网站等），并行路由让你实现复杂的路由模式。

例如，你可以同时渲染团队页面和分析页面，它们可以独立导航而不会相互影响。

![并行路由示例](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fparallel-routes.png&w=1920&q=75&dpl=dpl_8UmJmJPgfVYKzkZd9171XQZsSj3W)

并行路由还允许你基于特定条件（如身份验证状态）有条件地渲染UI，同时保持单一URL。这使得你可以根据应用状态渲染不同的UI片段，同时保持URL一致。

## 约定

并行路由是使用命名的插槽(slots)创建的。插槽由`@folder`约定定义，并作为props传递给同级布局。

例如，可以使用以下文件结构，在同一URL上同时显示`@analytics`和`@team`：

```
app/
├── @analytics/
│   └── page.tsx // /dashboard 路由的 analytics 页面
├── @team/
│   └── page.tsx // /dashboard 路由的 team 页面
└── layout.tsx // 使用 @analytics 和 @team 插槽的布局
```

> **提示**：`@folder`命名是约定，指定了这些文件夹作为插槽。在路由中，这些文件夹不会影响URL路径（类似于路由组）。

在`layout.tsx`文件中，可以通过命名的props获取插槽，然后在布局组件中并行渲染它们：

```tsx
// app/layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      {children}
      <div className="flex">
        {/* 在同一视图中并排渲染两个插槽 */}
        <div className="w-1/2">{team}</div>
        <div className="w-1/2">{analytics}</div>
      </div>
    </div>
  )
}
```

> **注意**：`children` prop是一个隐式插槽，不需要通过`@folder`映射到文件系统。这意味着`app/page.tsx`会自动作为`children`传递给布局。

## 不匹配的路由

默认情况下，在导航时会保持并行路由中每个插槽的活动状态。

但是，当导航到一个路由时，其中一个或多个插槽不存在于目标页面下，你可以定义回退UI（Fallback UI）来处理这种不匹配的情况。

例如，假设用户从`/dashboard`（存在`@team`和`@analytics`插槽）导航到`/settings`（只有`@team`插槽存在，没有`@analytics`插槽）：

```
app/
├── dashboard/
│   ├── @analytics/
│   │   └── page.tsx // /dashboard 的 analytics 页面
│   ├── @team/
│   │   └── page.tsx // /dashboard 的 team 页面
│   └── layout.tsx // 使用 @analytics 和 @team 的布局
└── settings/
    ├── @team/
    │   └── page.tsx // /settings 的 team 页面
    └── layout.tsx // 只使用 @team 的布局
```

为了处理这种不匹配情况，你可以创建一个`default.js`文件，作为回退UI显示：

```tsx
// app/settings/@analytics/default.tsx
export default function DefaultAnalytics() {
  return (
    <div>
      <h2>选择一个分析项目</h2>
    </div>
  )
}
```

当目标路由不存在特定插槽时，Next.js会回退到使用`default.js`文件，确保UI仍能正常渲染。

如果没有提供`default.js`文件，且没有匹配的插槽内容，就会发生运行时错误。

## 条件路由

并行路由可用于实现条件路由。例如，基于用户身份验证状态渲染不同的页面：

```
app/
├── @auth/
│   ├── login/
│   │   └── page.tsx // 登录页面
│   └── register/
│       └── page.tsx // 注册页面
├── (main)/
│   ├── page.tsx // 主页
│   ├── dashboard/
│   │   └── page.tsx // 仪表盘页面
│   └── profile/
│       └── page.tsx // 个人资料页面
└── layout.tsx // 使用 @auth 和 children 的条件布局
```

在`layout.tsx`中，你可以基于用户是否已登录，有条件地渲染`@auth`插槽或主应用程序内容：

```tsx
// app/layout.tsx
import { getUser } from '@/lib/auth'

export default async function Layout({
  children,
  auth,
}: {
  children: React.ReactNode
  auth: React.ReactNode
}) {
  const user = await getUser()
  const isLoggedIn = !!user

  return isLoggedIn ? children : auth
}
```

## 模态窗口

并行路由与[拦截路由](/nextjs/app-router/building-your-application/routing/intercepting-routes)结合，可用于创建模态窗口：

```
app/
├── @modal/
│   ├── photo/[id]/
│   │   └── page.tsx // 照片模态页面
│   ├── login/
│   │   └── page.tsx // 登录模态页面
│   └── default.tsx // 默认回退UI
├── photo/
│   └── [id]/
│       └── page.tsx // 完整照片页面
├── login/
│   └── page.tsx // 完整登录页面
└── layout.tsx // 使用 @modal 插槽的布局
```

在`layout.tsx`中，你可以基于是否有活动的模态窗口来控制显示：

```tsx
// app/layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
```

在模态窗口组件中，你可以使用`useRouter`或`Link`组件返回到之前的路由，关闭模态窗口：

```tsx
// app/@modal/photo/[id]/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="modal">
      <button onClick={() => router.back()} className="modal-close">
        关闭
      </button>
      <Image
        src={`/photos/${params.id}.jpg`}
        alt={`Photo ${params.id}`}
        className="modal-image"
        width={1200}
        height={800}
      />
    </div>
  )
}
```

要确保模态窗口行为正确，你需要创建一个`default.js`文件，在没有活动模态窗口时显示：

```tsx
// app/@modal/default.tsx
export default function Default() {
  return null
}
```

这确保当没有模态窗口需要显示时，该插槽不会渲染任何内容。

## 高级模式

### 导航中共享布局

使用插槽的一个重要特性是，在导航中它们保持自己的状态，即使在整个应用程序中共享布局时也是如此。

这对于像选项卡式界面这样的场景特别有用，每个选项卡都可以有自己独立的导航状态：

```
app/
├── @tabs/
│   ├── activity/
│   │   └── page.tsx // 活动选项卡
│   ├── mentions/
│   │   └── page.tsx // 提及选项卡
│   └── default.tsx // 默认选中活动选项卡
└── layout.tsx // 包含选项卡界面的布局
```

```tsx
// app/layout.tsx
import TabNavigation from '@/components/tab-navigation'

export default function Layout({
  children,
  tabs,
}: {
  children: React.ReactNode
  tabs: React.ReactNode
}) {
  return (
    <div>
      {children}
      <div className="tabs-container">
        <TabNavigation />
        <div>{tabs}</div>
      </div>
    </div>
  )
}
```

### 同步路由组之间的导航

当使用并行路由时，有时你需要在导航时同步多个插槽的状态。比如，在一个电子邮件应用程序中，点击一封邮件应该同时更新预览窗格和邮件列表：

```
app/
├── @list/
│   └── inbox/
│       ├── page.tsx // 收件箱邮件列表
│       └── [id]/
│           └── page.tsx // 特定邮件的选中状态
├── @preview/
│   └── inbox/
│       └── [id]/
│           └── page.tsx // 预览特定邮件
└── layout.tsx // 协调两个插槽的布局
```

为了实现这种同步，可以使用`usePathname`和`useRouter`结合客户端组件，确保在用户交互时多个插槽同时导航：

```tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import cn from 'classnames'

export function MailList({ mails }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // 当选择某封邮件时，同时更新两个路由插槽
  function selectMail(mailId: string) {
    const newPath = `/inbox/${mailId}`
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <ul>
      {mails.map((mail) => {
        const isActive = pathname.includes(mail.id)

        return (
          <li
            key={mail.id}
            className={cn({ active: isActive, pending: isPending })}
            onClick={() => selectMail(mail.id)}
          >
            <h3>{mail.subject}</h3>
            <p>{mail.preview}</p>
          </li>
        )
      })}
    </ul>
  )
}
```

### 在新标签页中打开并行路由

在某些情况下，你可能希望用户在新标签页中打开并行路由中的某些内容，例如在预览窗口中按住Ctrl键点击链接时。

你可以使用`target="_blank"`属性实现这一点，确保链接在新标签页中打开相应页面的完整版本，而不是保持在并行路由内：

```tsx
// app/@docs/tasks/[id]/page.tsx
import Link from 'next/link'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>任务 {params.id}</h1>
      {/* 允许用户在新标签中打开完整版本 */}
      <Link href={`/tasks/${params.id}`} target="_blank">
        在新标签页中打开
      </Link>
    </div>
  )
}
```

## 相关资源

- [拦截路由](/nextjs/app-router/building-your-application/routing/intercepting-routes)
- [路由基础](/nextjs/app-router/building-your-application/routing)
- [Loading UI与Suspense](/nextjs/app-router/building-your-application/routing/loading-ui-and-streaming)
