---
title: Next.js 中文文档 - 服务器操作和修改
description: 学习如何使用Next.js的服务器操作进行数据修改和表单处理
---

# Next.js 中文文档 - 服务器操作和修改

在Web应用程序中，除了获取数据外，修改数据也是一个关键部分。服务器操作（Server Actions）是Next.js的一项功能，允许你在服务器上定义和执行数据修改逻辑，而无需创建API端点。

## 什么是服务器操作？

服务器操作是一种在服务器上执行的异步函数，可以在客户端组件或服务器组件中调用。它们特别适合处理表单提交、数据更新和其他需要向服务器发送数据的操作。

### 主要优势

- **无需API端点**：不再需要创建和管理单独的API路由
- **渐进式增强**：默认支持JavaScript被禁用的情况
- **优化的数据修改**：自动集成了重新验证和错误处理
- **减少客户端JavaScript**：因为逻辑在服务器上执行

## 创建服务器操作

### 使用"use server"指令

你可以使用`"use server"`指令来标记一个函数作为服务器操作：

```tsx
// app/actions.ts
'use server'

export async function addToCart(productId: string, quantity: number) {
  // 服务器端数据库操作
  await db.insert({ productId, quantity })

  // 重新验证相关数据
  revalidatePath('/cart')

  return { success: true }
}
```

你也可以在单个函数上使用`"use server"`指令：

```tsx
// app/components/add-button.tsx
export default function AddButton({ productId }: { productId: string }) {
  async function handleAddToCart(formData: FormData) {
    'use server'

    const quantity = Number(formData.get('quantity') || '1')
    await db.insert({ productId, quantity })
    revalidatePath('/cart')
  }

  return (
    <form action={handleAddToCart}>
      <input type="hidden" name="productId" value={productId} />
      <button type="submit">添加到购物车</button>
    </form>
  )
}
```

### 客户端组件中使用服务器操作

在客户端组件中，你可以导入服务器操作并像普通函数一样使用它们：

```tsx
'use client'
// app/components/add-to-cart-button.tsx
import { useState } from 'react'
import { addToCart } from '@/app/actions'

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      await addToCart(productId, 1)
      alert('添加成功！')
    } catch (error) {
      console.error('添加失败', error)
      alert('添加失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? '添加中...' : '添加到购物车'}
    </button>
  )
}
```

## 表单处理与服务器操作

### 基本表单处理

Next.js允许你直接将服务器操作作为表单的`action`属性值：

```tsx
// app/products/[id]/page.tsx
import { addToCart } from '@/app/actions'

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>产品详情</h1>

      <form action={addToCart}>
        <input type="hidden" name="productId" value={params.id} />
        <input type="number" name="quantity" defaultValue="1" min="1" />
        <button type="submit">添加到购物车</button>
      </form>
    </div>
  )
}
```

当用户提交表单时，`addToCart`服务器操作会在服务器上执行，而不需要任何额外的JavaScript。

### 表单状态与错误处理

你可以使用React的`useFormStatus`和`useFormState`钩子来处理表单提交的状态：

```tsx
'use client'
// app/components/submit-button.tsx
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}
```

结合React的`useFormState`钩子处理服务器操作的结果：

```tsx
'use client'
// app/contact/form.tsx
import { useFormState } from 'react-dom'
import { SubmitButton } from '@/app/components/submit-button'
import { submitContactForm } from '@/app/actions'

// 初始状态
const initialState = {
  message: '',
  errors: {},
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState)

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">姓名</label>
        <input type="text" id="name" name="name" required />
        {state.errors?.name && <p className="error">{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">电子邮件</label>
        <input type="email" id="email" name="email" required />
        {state.errors?.email && <p className="error">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message">消息</label>
        <textarea id="message" name="message" required />
        {state.errors?.message && <p className="error">{state.errors.message}</p>}
      </div>

      {state.message && (
        <p className={`status ${state.success ? 'success' : 'error'}`}>{state.message}</p>
      )}

      <SubmitButton />
    </form>
  )
}
```

## 安全考虑

服务器操作中应当考虑以下安全措施：

1. **输入验证**：使用像Zod这样的库验证所有用户输入
2. **身份验证和授权**：确保用户有权执行请求的操作
3. **速率限制**：防止滥用和DDoS攻击
4. **CSRF保护**：Next.js内置了对服务器操作的CSRF保护
5. **避免暴露敏感信息**：不要在响应中返回敏感数据

安全的服务器操作示例：

```tsx
'use server'

import { auth } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

export async function deletePost(postId: string) {
  // 1. 身份验证
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('必须登录')
  }

  // 2. 速率限制检查
  const rateLimitResult = await rateLimit.check(session.user.id)
  if (!rateLimitResult.success) {
    throw new Error('尝试次数过多，请稍后再试')
  }

  // 3. 输入验证
  const validatedPostId = z.string().uuid().safeParse(postId)
  if (!validatedPostId.success) {
    throw new Error('无效的文章ID')
  }

  // 4. 授权检查
  const post = await db.post.findUnique({ where: { id: postId } })
  if (!post) {
    throw new Error('文章不存在')
  }

  if (post.authorId !== session.user.id) {
    throw new Error('无权删除此文章')
  }

  // 5. 执行操作
  await db.post.delete({ where: { id: postId } })

  // 6. 重新验证相关路径
  revalidatePath('/posts')

  return { success: true }
}
```

## 最佳实践

1. **保持服务器操作的专注**：每个操作应执行单一任务
2. **使用TypeScript**：为服务器操作和状态添加类型
3. **错误处理**：始终使用try/catch并返回有意义的错误消息
4. **验证用户输入**：在执行任何数据库操作前验证所有输入
5. **使用服务器组件**：优先在服务器组件中处理数据逻辑
6. **避免大型响应**：只返回客户端需要的最小数据集

## 相关文档

- [数据获取和缓存](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching) - 学习如何获取和缓存数据
- [表单和事件处理](/nextjs/app-router/building-your-application/building-your-application/forms-and-events) - 学习如何处理表单和事件
- [缓存机制](/nextjs/app-router/deep-dive/caching) - 深入了解Next.js的缓存系统如何工作
