---
title: Next.js 中文文档 - 数据更新
description: 学习如何在Next.js应用中使用服务器操作更新数据。
---

# Next.js 中文文档 - 数据更新

Next.js提供了服务器操作(Server Actions)功能，让你可以直接在服务器上执行代码，这是一种安全且高效的数据变更方式。

## 服务器操作基础

服务器操作是使用`"use server"`指令标记的异步函数，可以在服务器上执行数据修改操作。

### 启用服务器操作

在Next.js应用中，服务器操作默认已启用。你可以通过两种方式使用它们：

1. **文件级别声明**：在文件顶部添加`"use server"`指令，文件中所有导出的异步函数都将变成服务器操作

```jsx
// app/actions.js
'use server'

export async function createTodo(formData) {
  const title = formData.get('title')
  // 数据库操作...
}

export async function updateTodo(id, data) {
  // 数据库操作...
}
```

2. **函数级别声明**：在特定函数内部使用`"use server"`指令

```jsx
// app/components/form.jsx
export default function Form() {
  async function handleSubmit(formData) {
    'use server'

    const title = formData.get('title')
    // 数据库操作...
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">创建</button>
    </form>
  )
}
```

## 在表单中使用服务器操作

Next.js的表单原生支持服务器操作，这是最常见的数据更新场景：

```jsx
// app/todos/page.jsx
import { createTodo } from '../actions'

export default function Todos() {
  return (
    <div>
      <h1>待办事项</h1>

      <form action={createTodo}>
        <input type="text" name="title" placeholder="添加新待办..." />
        <button type="submit">添加</button>
      </form>
    </div>
  )
}
```

## 处理表单数据

服务器操作可以直接访问表单数据：

```jsx
'use server'

export async function createTodo(formData) {
  // 获取表单数据
  const title = formData.get('title')
  const description = formData.get('description')

  // 验证数据
  if (!title || title.length < 3) {
    return { error: '标题至少需要3个字符' }
  }

  // 保存到数据库
  try {
    await db.todos.create({
      data: {
        title,
        description: description || '',
      },
    })

    return { success: true }
  } catch (error) {
    return { error: '保存数据时出错' }
  }
}
```

## 重新验证数据

更新数据后，通常需要重新验证页面数据，确保用户看到最新的数据：

```jsx
'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function createTodo(formData) {
  // ... 保存数据逻辑

  // 更新后重新验证页面
  revalidatePath('/todos')

  // 或者重新验证特定标签的数据
  // revalidateTag('todos');
}
```

## 与服务器组件一起使用

在服务器组件中，你可以直接调用其他服务器操作：

```jsx
// app/todos/[id]/page.jsx
import { getTodo, deleteTodo } from '@/app/actions'

export default async function TodoPage({ params }) {
  const todo = await getTodo(params.id)

  async function handleDelete() {
    'use server'
    await deleteTodo(params.id)
    redirect('/todos')
  }

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>

      <form action={handleDelete}>
        <button type="submit">删除</button>
      </form>
    </div>
  )
}
```

## 与客户端组件一起使用

在客户端组件中，你可以导入服务器操作：

```jsx
'use client'

import { useState } from 'react'
import { updateTodo } from '@/app/actions'

export default function EditTodoForm({ todo }) {
  const [title, setTitle] = useState(todo.title)

  return (
    <form
      action={async (formData) => {
        const result = await updateTodo(todo.id, {
          title: formData.get('title'),
        })

        if (result.error) {
          alert(result.error)
        }
      }}
    >
      <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">更新</button>
    </form>
  )
}
```

## 进阶用法

### 乐观更新

在客户端组件中结合React的状态，可以实现乐观更新，提供更好的用户体验：

```jsx
'use client'

import { useState } from 'react'
import { createTodo } from '@/app/actions'

export default function TodoForm() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  return (
    <div>
      <form
        action={async (formData) => {
          // 乐观更新：立即更新UI
          const newTodo = { id: Date.now(), title: title, status: 'pending' }
          setTodos([...todos, newTodo])
          setTitle('')

          // 然后发送到服务器
          const result = await createTodo(formData)

          if (result.error) {
            // 如果出错，回滚UI
            setTodos(todos.filter((todo) => todo.id !== newTodo.id))
            setTitle(title)
            alert(result.error)
          }
        }}
      >
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">添加</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

### 使用useFormStatus

使用React的`useFormStatus`钩子可以跟踪表单提交状态：

```jsx
'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}

export default function TodoForm() {
  return (
    <form action={createTodo}>
      <input type="text" name="title" />
      <SubmitButton />
    </form>
  )
}
```

### 使用useFormState

使用React的`useFormState`钩子可以捕获服务器操作的返回状态：

```jsx
'use client'

import { useFormState } from 'react-dom'
import { createTodo } from '@/app/actions'

const initialState = { message: null }

export default function TodoForm() {
  const [state, formAction] = useFormState(createTodo, initialState)

  return (
    <form action={formAction}>
      {state.message && <p>{state.message}</p>}
      <input type="text" name="title" />
      <button type="submit">添加</button>
    </form>
  )
}
```

```jsx
// actions.js
'use server'

export async function createTodo(prevState, formData) {
  const title = formData.get('title')

  if (!title || title.length < 3) {
    return { message: '标题至少需要3个字符' }
  }

  try {
    await db.todo.create({ data: { title } })
    return { message: '待办事项创建成功!' }
  } catch (error) {
    return { message: '创建失败: ' + error.message }
  }
}
```

## 数据更新模式

### 创建数据

```jsx
'use server'

export async function createItem(formData) {
  const name = formData.get('name')
  const description = formData.get('description')

  await db.items.create({
    data: { name, description },
  })

  revalidatePath('/items')
}
```

### 更新数据

```jsx
'use server'

export async function updateItem(id, formData) {
  const name = formData.get('name')
  const description = formData.get('description')

  await db.items.update({
    where: { id },
    data: { name, description },
  })

  revalidatePath(`/items/${id}`)
}
```

### 删除数据

```jsx
'use server'

export async function deleteItem(id) {
  await db.items.delete({
    where: { id },
  })

  revalidatePath('/items')
  redirect('/items')
}
```

## 安全考虑

服务器操作提供了内置的保护机制，但你仍应注意：

1. **数据验证**：总是验证用户输入数据
2. **授权检查**：确保用户有权执行相应的操作
3. **速率限制**：对敏感操作实施速率限制
4. **错误处理**：不要将敏感错误信息暴露给客户端

```jsx
'use server'

import { auth } from '@/lib/auth'

export async function updateUserProfile(formData) {
  // 检查身份验证
  const session = await auth()
  if (!session) {
    throw new Error('未授权')
  }

  // 验证数据
  const name = formData.get('name')
  if (!name || name.length < 2) {
    return { error: '姓名必须至少包含2个字符' }
  }

  try {
    // 执行操作
    await db.user.update({
      where: { id: session.user.id },
      data: { name },
    })

    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    console.error('更新用户资料失败:', error)
    return { error: '更新资料失败，请稍后重试' }
  }
}
```

## 与外部API交互

服务器操作可以安全地与外部API交互：

```jsx
'use server'

export async function sendPayment(formData) {
  const amount = formData.get('amount')

  // 获取敏感API密钥（安全地存储在服务器环境变量中）
  const apiKey = process.env.PAYMENT_API_KEY

  try {
    const response = await fetch('https://payment-api.example.com/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ amount }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '支付处理失败')
    }

    revalidatePath('/account')
    return { success: true, transactionId: data.transactionId }
  } catch (error) {
    return { error: error.message }
  }
}
```

## 最佳实践

1. **集中管理服务器操作**：将相关操作组织在单独的文件中
2. **使用类型安全**：为数据和返回值定义明确的TypeScript类型
3. **数据验证**：使用如Zod等库进行数据验证
4. **错误处理**：实现全面的错误处理策略
5. **测试**：为服务器操作编写单元和集成测试

## 了解更多

更多关于服务器操作和数据更新的详细信息，请参考：

- [Next.js服务器操作文档](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [API参考：use server](/nextjs/app-router/api-reference/directives/use-server)
- [React Form组件文档](/nextjs/app-router/api-reference/components/form)
