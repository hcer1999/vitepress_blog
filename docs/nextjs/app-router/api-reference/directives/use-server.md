---
title: Next.js 中文文档 - 'use server'
description: 'use server指令用于在服务器组件中标记在服务器上运行的函数。'
---

# Next.js 中文文档 - use server

`'use server'`指令允许你在客户端组件中标记可以在服务器上执行的异步函数。这些函数可以作为服务器操作（Server Actions）被客户端组件调用。

## 语法

可以在文件顶部添加 `'use server'` 指令来标记整个文件中的所有导出函数:

```js
'use server'

export async function createTodo(formData) {
  const todo = await db.todo.create({
    title: formData.get('title'),
    completed: false,
  })

  revalidatePath('/todos')
  return todo
}
```

也可以单独为特定函数添加 `'use server'` 指令:

```js
export async function createTodo(formData) {
  'use server'

  const todo = await db.todo.create({
    title: formData.get('title'),
    completed: false,
  })

  revalidatePath('/todos')
  return todo
}
```

## 特性

### 在服务器组件中使用

在服务器组件中，你可以直接导入和使用标记了 `'use server'` 的函数:

```jsx
import { createTodo } from './actions'

export default function NewTodoForm() {
  return (
    <form action={createTodo}>
      <input type="text" name="title" />
      <button type="submit">添加任务</button>
    </form>
  )
}
```

### 在客户端组件中使用

在客户端组件中，你可以导入标记了 `'use server'` 的函数:

```jsx
'use client'

import { createTodo } from './actions'
import { useState } from 'react'

export default function NewTodoForm() {
  const [title, setTitle] = useState('')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        await createTodo(formData)
        setTitle('')
      }}
    >
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">添加任务</button>
    </form>
  )
}
```

### 与表单一起使用

服务器操作可以与 React 的新 `<form>` 组件一起使用，通过 `action` 属性传递:

```jsx
<form action={createTodo}>
  <input type="text" name="title" />
  <button type="submit">添加任务</button>
</form>
```

也可以使用 `formAction` 在特定按钮上调用不同的服务器操作:

```jsx
<form action={createTodo}>
  <input type="text" name="title" />
  <button type="submit">添加任务</button>
  <button formAction={deleteTodos} type="submit">
    删除所有任务
  </button>
</form>
```

### 异步特性

所有标记了 `'use server'` 的函数必须是异步的，即使它们不包含异步操作:

```js
'use server'

// ✅ 正确: 异步函数
export async function increment(value) {
  return value + 1
}

// ❌ 错误: 非异步函数
export function decrement(value) {
  return value - 1
}
```

### 接受序列化参数

服务器操作只能接受和返回可序列化的参数，因为它们需要通过网络传输。支持的数据类型包括:

- 原始类型: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`
- 带有可序列化属性的对象
- 可序列化值的数组或元组
- `Date` 对象
- `FormData` 实例
- `URLSearchParams` 实例
- `ReadableStream` 实例

不支持复杂对象如函数、类实例、`Map`、`Set` 等。

### 安全性考虑

服务器操作会自动绑定到用户发出请求时的身份验证信息，这提供了自动的安全保护机制。使用服务器操作时应注意:

1. 始终验证和清理用户输入
2. 在处理数据库操作前进行权限检查
3. 避免在返回值中包含敏感信息
4. 使用 CSRF 保护（Next.js 自动提供）

## 最佳实践

### 按功能组织服务器操作

将相关服务器操作放在同一个文件中:

```js
// app/actions.js
'use server'

export async function createTodo(formData) {
  /* ... */
}
export async function updateTodo(id, data) {
  /* ... */
}
export async function deleteTodo(id) {
  /* ... */
}
```

### 使用 FormData

使用 `formData` 可以更容易地从表单中获取数据:

```js
'use server'

export async function createTodo(formData) {
  const title = formData.get('title')
  // 访问其他表单字段...
}
```

### 使用 zod 验证数据

使用 `zod` 等库验证输入数据:

```js
'use server'

import { z } from 'zod'

const TodoSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(100),
})

export async function createTodo(formData) {
  const result = TodoSchema.safeParse({
    title: formData.get('title'),
  })

  if (!result.success) {
    return { error: result.error.format() }
  }

  // 继续处理数据...
}
```

### 错误处理

优雅地处理服务器操作中的错误:

```js
'use server'

export async function createTodo(formData) {
  try {
    // 处理数据...
    return { success: true }
  } catch (error) {
    console.error('创建任务失败:', error)
    return {
      success: false,
      error: '创建任务失败，请稍后重试',
    }
  }
}
```

## 限制

1. 只能在服务器组件中定义服务器操作
2. 函数必须是异步的
3. 只能传递和返回可序列化的值
4. 不支持直接在服务器操作内部获取前端状态
5. 从一个服务器操作调用另一个服务器操作时，不会保留请求头和 cookie

## 与 useTransition 的关系

在客户端组件中，可以将服务器操作与 `useTransition` 配合使用，提供更好的用户体验:

```jsx
'use client'

import { useTransition } from 'react'
import { createTodo } from './actions'

function TodoForm() {
  const [isPending, startTransition] = useTransition()

  return (
    <form>
      <input name="title" />
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const formData = new FormData()
            formData.append('title', 'New Task')
            await createTodo(formData)
          })
        }}
      >
        {isPending ? '添加中...' : '添加任务'}
      </button>
    </form>
  )
}
```

## 相关资源

- [官方文档：服务器操作](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [官方文档：表单和事件处理](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
- [API 参考：use client](https://nextjs.org/docs/app/api-reference/directives/use-client)
