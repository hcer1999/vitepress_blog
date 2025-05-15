---
title: Next.js 中文文档 - 拦截路由
description: 使用路由拦截在当前上下文中保留当前页面，同时显示另一个路由的内容
---

# Next.js 中文文档 - 拦截路由

路由拦截允许你在不改变URL的情况下，从应用中的一个部分"拦截"路由到另一个部分。这种模式对于保留上下文很有用，例如：

- 显示一个照片的模态窗口，同时保持底层照片库的界面可见
- 在用户导航到其他页面时显示登录表单
- 在展开一个菜单项的同时保持侧边栏的可见性
- 在用户将内容添加到购物车时显示产品详情

## 约定

你可以通过在文件夹名称前加上括号和省略号来拦截路由：`(..)` 代表上一级，`(...)` 代表根目录，`(..)(..)` 代表上两级，依此类推。

拦截路由的匹配顺序如下，从最高优先级到最低：

1. `(..)photo/[id]/page.js` (匹配同级段: `photo/1`)
2. `(.)photo/[id]/page.js` (匹配相同段: `photo/1`)
3. `(...)photo/[id]/page.js` (匹配根段: `photo/1`)
4. `photo/[id]/page.js` (匹配无拦截: `photo/1`)

## 示例

### 模态窗口

一个常见的拦截路由用例是创建一个模态窗口，显示一个路由的内容，同时在背景中保持当前页面可见。

例如，想象一个照片列表，点击照片时希望它在模态窗口中打开，同时保持列表页面可见。如果用户刷新页面，模态窗口应该展开为完整的照片页面，而不是保持模态状态。

这可以通过结合[并行路由](/nextjs/app-router/building-your-application/routing/parallel-routes)和拦截路由实现：

```
app/
├── photo/
│   ├── [id]/
│   │   └── page.tsx // 照片完整页面 /photos/123
├── @modal/
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx // 拦截的模态界面
└── page.tsx // 首页
```

`@modal` 命名的插槽会渲染与当前URL匹配的内容。

在 `app/@modal/(.)photo/[id]/page.tsx` 中，`(.)` 表示与当前段匹配的路由。这意味着当从以 `/photo` 开头的URL导航到 `/photo/[id]` 时，将拦截导航，并在模态窗口中显示 `@modal/(.)photo/[id]/page.tsx` 的内容。

```tsx
// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <h1>照片库</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <Link key={photo.id} href={`/photo/${photo.id}`}>
            <Image src={photo.src} alt={photo.alt} width={300} height={200} />
          </Link>
        ))}
      </div>
    </main>
  )
}

// 模拟数据
const photos = [
  { id: '1', src: '/photo1.jpg', alt: '照片 1' },
  { id: '2', src: '/photo2.jpg', alt: '照片 2' },
  // ...
]
```

```tsx
// app/photo/[id]/page.tsx
// 完整的照片页面
import Image from 'next/image'
import { getPhoto } from '@/lib/photos'

export default async function PhotoPage({ params }: { params: { id: string } }) {
  const photo = await getPhoto(params.id)

  return (
    <div className="photo-page">
      <h1>{photo.name}</h1>
      <Image src={photo.src} alt={photo.alt} width={800} height={600} className="photo-full" />

      <div className="photo-details">
        <p>{photo.description}</p>
        <p>拍摄于: {photo.date}</p>
      </div>
    </div>
  )
}
```

```tsx
// app/@modal/(.)photo/[id]/page.tsx
// 照片模态窗口视图
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getPhoto } from '@/lib/photos'

export default async function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter()
  const photo = await getPhoto(params.id)

  return (
    <div className="modal-backdrop" onClick={() => router.back()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => router.back()}>
          关闭
        </button>

        <Image src={photo.src} alt={photo.alt} width={600} height={400} className="modal-image" />

        <h2>{photo.name}</h2>
      </div>
    </div>
  )
}
```

最后，需要将模态窗口插槽添加到根布局中：

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
    <html lang="zh">
      <body>
        {children}
        {modal}
      </body>
    </html>
  )
}
```

### 导航行为

拦截路由的行为取决于你导航到它的方式：

- 如果你直接访问URL（例如通过刷新页面或直接输入URL），会加载完整的路由，而不是拦截的版本。
- 如果你通过客户端导航（如点击`<Link>`组件），则会加载拦截的路由。

这允许你为直接URL访问和上下文导航提供不同的体验，同时保持URL一致。

### 软导航与硬导航

- **软导航**：当使用Next.js的`<Link>`组件或`router.push()`进行的客户端导航。这会触发拦截路由。
- **硬导航**：直接URL访问或页面刷新。这会加载目标路由的完整版本，而不是拦截的版本。

### 从模态窗口中关闭

以下是关闭模态窗口的几种常见方式：

1. 使用`router.back()`返回前一个路由

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Modal() {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.back()}>关闭</button>
      {/* 模态内容... */}
    </div>
  )
}
```

2. 导航到特定路由

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Modal() {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.push('/photos')}>关闭</button>
      {/* 模态内容... */}
    </div>
  )
}
```

3. 处理模态背景点击

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Modal() {
  const router = useRouter()

  return (
    <div
      className="modal-backdrop"
      onClick={() => router.back()} // 点击背景关闭
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // 阻止点击内容时关闭
      >
        {/* 模态内容... */}
      </div>
    </div>
  )
}
```

### 捕捉所有匹配的拦截路由

你可以使用捕获所有路由段来拦截多个路由。例如，你可能希望在用户访问特定区域时显示登录表单：

```
app/
├── login/
│   └── page.tsx        // 登录页面
├── dashboard/
│   ├── page.tsx        // 仪表盘页面
│   ├── settings/
│   │   └── page.tsx    // 设置页面
│   └── profile/
│       └── page.tsx    // 个人资料页面
├── @auth/
│   └── (...)dashboard/ // 拦截任何以dashboard开头的路由
│       └── [...slug]/
│           └── page.tsx // 显示登录模态窗口
└── layout.tsx         // 根布局
```

在这个例子中，当用户尝试访问任何以`/dashboard`开头的路由（如`/dashboard`、`/dashboard/settings`、`/dashboard/profile`等）但未登录时，我们会拦截导航并显示登录表单：

```tsx
// app/@auth/(...)dashboard/[...slug]/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { login } from '@/lib/auth'

export default function LoginModal() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      // 登录逻辑
      await login(email, password)
      // 成功登录后刷新页面
      router.refresh()
    } catch (error) {
      console.error('登录失败', error)
    }
  }

  return (
    <div className="auth-modal">
      <div className="auth-form">
        <h2>请先登录</h2>
        <p>您需要登录后才能访问仪表盘</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="电子邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">登录</button>
        </form>

        <button onClick={() => router.push('/')} className="cancel-button">
          返回首页
        </button>
      </div>
    </div>
  )
}
```

然后在布局中根据用户登录状态有条件地显示内容：

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

  return (
    <html lang="zh">
      <body>{user ? children : auth}</body>
    </html>
  )
}
```

### 跨级拦截

可以使用多个点号从上级目录拦截路由：

- `(..)` - 从父级拦截
- `(..)(..)` - 从父级的父级拦截
- `(..)(..)(..)` - 从更上层拦截

这在需要拦截上级路由的场景中非常有用，例如嵌套的评论回复界面：

```
app/
├── posts/
│   ├── [postId]/
│   │   ├── page.tsx                 // 帖子页面
│   │   └── comments/
│   │       ├── page.tsx             // 所有评论页面
│   │       └── [commentId]/
│   │           ├── page.tsx         // 单个评论页面
│   │           └── reply/
│   │               └── page.tsx     // 回复页面
└── @modal/
    └── (..)(..)posts/
        └── [postId]/
            └── comments/
                └── [commentId]/
                    └── reply/
                        └── page.tsx  // 拦截的回复模态窗口
```

在这个例子中，`(..)(..)posts`表示从两级上的路由拦截，这样当导航到回复页面时，可以在模态窗口中显示回复表单，同时保持底层帖子可见。

## 高级模式

### 包含拦截模式的条件路由

结合拦截路由和条件渲染，可以创建更复杂的导航体验：

```tsx
// app/layout.tsx
export default function Layout({
  children,
  auth,
  modal,
}: {
  children: React.ReactNode
  auth: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        {children}
        {modal}
        {auth}
      </body>
    </html>
  )
}
```

然后在不同的插槽中使用拦截路由，实现不同的行为：

```
app/
├── feed/
│   └── page.tsx             // 内容流
├── photo/
│   └── [id]/
│       └── page.tsx         // 照片详情
├── @modal/
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx     // 照片模态窗口
└── @auth/
    └── (...)photo/
        └── [id]/
            └── page.tsx     // 当需要身份验证访问照片时
```

这样，当用户访问照片页面时，会根据条件显示完整页面、模态窗口或身份验证表单。

## 相关资源

- [并行路由](/nextjs/app-router/building-your-application/routing/parallel-routes)
- [路由基础](/nextjs/app-router/building-your-application/routing)
- [动态路由](/nextjs/app-router/building-your-application/routing/dynamic-routes)
