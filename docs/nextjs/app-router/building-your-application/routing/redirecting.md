---
title: Next.js 中文文档 - 重定向
description: 学习如何在Next.js应用中重定向用户
---

# Next.js 中文文档 - 重定向

Next.js允许你以多种方式将用户从一个URL重定向到另一个URL。本页将介绍各种重定向方法及其使用场景。

## 重定向类型

Next.js提供了多种重定向方式，可以在不同的上下文中使用：

- **永久重定向** (308): 表示永久移动的资源
- **临时重定向** (307): 表示临时移动的资源
- **客户端重定向**: 在客户端(浏览器)执行的重定向
- **服务器端重定向**: 在服务器端执行的重定向

## redirect() 函数

你可以使用`redirect()`函数将用户重定向到另一个URL。这个函数可以在服务器组件、路由处理器和服务器操作中使用。

```tsx
// app/team/[id]/page.tsx
import { redirect } from 'next/navigation'

async function fetchTeam(id: string) {
  const res = await fetch(`https://api.example.com/team/${id}`)
  if (!res.ok) return undefined
  return res.json()
}

export default async function TeamPage({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id)

  if (!team) {
    redirect('/teams') // 如果团队不存在，重定向到团队列表
  }

  return (
    <main>
      <h1>{team.name}</h1>
      {/* 显示团队详情 */}
    </main>
  )
}
```

> 注意：`redirect()`函数使用了临时重定向(307)。如果你需要永久重定向，请使用`permanentRedirect()`函数。

`redirect()`在内部抛出错误，所以不需要使用`return redirect()`。

## permanentRedirect() 函数

`permanentRedirect()`函数与`redirect()`类似，但它使用永久重定向(308)状态码。这在资源永久移动时很有用，例如URL结构变更。

```tsx
// app/old-products/[id]/page.tsx
import { permanentRedirect } from 'next/navigation'

export default async function OldProductPage({ params }: { params: { id: string } }) {
  // 永久重定向到新的产品URL结构
  permanentRedirect(`/products/${params.id}`)
}
```

## 在中间件中重定向

你可以使用中间件拦截请求并重定向用户，这对于鉴权、地理位置路由或访问控制很有用。

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取用户国家/地区信息（例如通过IP地址）
  const country = request.geo?.country || 'US'

  // 从URL获取路径名
  const { pathname } = request.nextUrl

  // 根据国家/地区重定向
  if (pathname === '/products' && country === 'CN') {
    return NextResponse.redirect(new URL('/products/cn', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products'],
}
```

## 在路由处理器中重定向

在API路由和路由处理器中，你可以使用`NextResponse.redirect()`重定向用户：

```tsx
// app/api/create-post/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createPost } from '@/lib/posts'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  try {
    const post = await createPost({ title, content })
    // 创建成功后重定向到新帖子
    return NextResponse.redirect(new URL(`/posts/${post.id}`, request.url))
  } catch (error) {
    // 处理错误
    return NextResponse.json({ error: '创建帖子失败' }, { status: 500 })
  }
}
```

## 在服务器操作中重定向

在服务器操作中，你可以使用`redirect()`函数在操作完成后重定向用户：

```tsx
// app/actions.ts
'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // 保存到数据库
  const post = await db.post.create({
    data: { title, content },
  })

  // 重新验证相关路径
  revalidatePath('/posts')

  // 重定向到新帖子页面
  redirect(`/posts/${post.id}`)
}
```

## 使用useRouter钩子重定向

在客户端组件中，你可以使用`useRouter`钩子的`push()`或`replace()`方法进行客户端导航：

```tsx
// app/components/login-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/login', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      // 登录成功，重定向到仪表盘
      router.push('/dashboard')
    } else {
      // 显示错误
      setError('登录失败，请检查凭据')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* 表单字段 */}
    </form>
  )
}
```

## 在配置中重定向

你可以在`next.config.js`文件中配置重定向规则：

```js
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true, // 使用308永久重定向
      },
      {
        source: '/marketing',
        destination: '/about/marketing',
        permanent: false, // 使用307临时重定向
      },
      {
        source: '/docs/:path*',
        destination: 'https://new-docs.example.com/:path*',
        permanent: false,
        basePath: false, // 跳过自动添加basePath
      },
    ]
  },
}
```

这种方法适合处理旧URL结构的迁移或将用户重定向到新的内容位置。

## 条件重定向

你可以根据特定条件重定向用户：

```tsx
// app/products/[id]/page.tsx
import { redirect } from 'next/navigation'
import { getProduct, getUser } from '@/lib/data'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const user = await getUser()

  // 如果产品不存在
  if (!product) {
    redirect('/products')
  }

  // 如果产品不可用且用户不是管理员
  if (!product.available && user?.role !== 'admin') {
    redirect('/products?notAvailable=true')
  }

  // 如果产品需要特定年龄
  if (product.ageRestricted && (!user || user.age < 18)) {
    redirect('/age-verification?returnTo=' + encodeURIComponent(`/products/${params.id}`))
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {/* 产品详情 */}
    </div>
  )
}
```

## 重定向与状态码

重定向使用的HTTP状态码决定了浏览器和搜索引擎如何处理它：

1. **307 临时重定向**: 表示资源临时移动到新位置，浏览器不应缓存这个重定向
2. **308 永久重定向**: 表示资源永久移动到新位置，浏览器和搜索引擎应更新其索引

> 注意：在SEO敏感场景中，正确选择重定向类型非常重要。永久重定向告诉搜索引擎新位置是规范URL。

## 相关API

- [`redirect()` 函数](/nextjs/app-router/api-reference/functions/redirect)
- [`permanentRedirect()` 函数](/nextjs/app-router/api-reference/functions/permanent-redirect)
- [`useRouter()` 钩子](/nextjs/app-router/api-reference/functions/use-router)
- [中间件API](/nextjs/app-router/api-reference/functions/next-response)
- [配置重定向](/nextjs/app-router/api-reference/next-config-js/redirects)
