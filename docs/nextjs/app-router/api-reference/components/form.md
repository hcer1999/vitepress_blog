---
title: Next.js 中文文档 - Form
description: 用于在Next.js应用中创建集成了服务器操作的表单组件。
---

# Next.js 中文文档 - Form 组件

`<form>` 组件是HTML原生表单元素的扩展，它已集成了Next.js的[服务器操作](../directives/use-server.md)功能。它通过无需JavaScript即可处理表单提交，并提供渐进式增强能力，实现了更好的用户体验。

## 导入

```jsx
// 不需要显式导入，直接使用HTML表单元素即可
```

## 属性

`<form>` 组件支持所有标准的HTML form属性，同时提供了以下增强功能：

| 属性         | 类型                                            | 描述                                                   |
| ------------ | ----------------------------------------------- | ------------------------------------------------------ |
| `action`     | `(formData: FormData) => void \| Promise<void>` | 指向一个使用`"use server"`指令标记的服务器操作函数     |
| `formAction` | `(formData: FormData) => void \| Promise<void>` | 可在按钮或输入元素上使用，用于指定元素特定的服务器操作 |

## 基本用法

```jsx
// app/page.js
export default function Page() {
  async function create(formData) {
    'use server'

    // 获取表单数据
    const name = formData.get('name')

    // 执行服务器操作，如保存到数据库
    await saveToDatabase({ name })

    // 重新验证缓存
    revalidatePath('/')
  }

  return (
    <form action={create}>
      <input type="text" name="name" />
      <button type="submit">提交</button>
    </form>
  )
}
```

## 服务器组件中使用

在服务器组件中，你可以直接在表单中使用服务器操作：

```jsx
// app/page.js - 服务器组件
import { createItem } from '@/app/actions'

export default function Page() {
  return (
    <form action={createItem}>
      <input type="text" name="name" />
      <button type="submit">创建项目</button>
    </form>
  )
}
```

```jsx
// app/actions.js
'use server'

export async function createItem(formData) {
  const name = formData.get('name')
  await saveToDatabase({ name })
  revalidatePath('/')
}
```

## 客户端组件中使用

在客户端组件中，你可以导入服务器操作并将它们传递给表单：

```jsx
'use client'

import { createItem } from '@/app/actions'
import { useState } from 'react'

export default function Form() {
  const [message, setMessage] = useState('')

  async function clientAction(formData) {
    // 客户端验证
    const name = formData.get('name')
    if (!name || name.length < 3) {
      setMessage('名称必须至少包含3个字符')
      return
    }

    // 提交到服务器
    const result = await createItem(formData)
    setMessage(result.message)
  }

  return (
    <form action={clientAction}>
      {message && <p>{message}</p>}
      <input type="text" name="name" />
      <button type="submit">创建项目</button>
    </form>
  )
}
```

## 带有多个操作的表单

你可以在同一个表单中使用多个操作按钮，每个按钮对应不同的服务器操作：

```jsx
// app/page.js
import { createItem, deleteItem, updateItem } from '@/app/actions'

export default function Page() {
  return (
    <form action={createItem}>
      <input type="text" name="name" />

      <button type="submit">创建</button>

      <button formAction={updateItem} type="submit" name="id" value="1">
        更新
      </button>

      <button formAction={deleteItem} type="submit" name="id" value="1">
        删除
      </button>
    </form>
  )
}
```

## 进度状态管理

结合React的`useFormStatus`钩子可以管理表单提交状态：

```jsx
'use client'

import { useFormStatus } from 'react-dom'
import { createItem } from '@/app/actions'

// 提交按钮组件
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}

// 表单组件
export default function Form() {
  return (
    <form action={createItem}>
      <input type="text" name="name" />
      <SubmitButton />
    </form>
  )
}
```

> **注意**：`useFormStatus`必须在是表单组件的子组件中使用。

## 使用useFormState管理表单状态

使用`useFormState`钩子可以维护表单状态，跟踪错误和成功消息：

```jsx
'use client'

import { useFormState } from 'react-dom'
import { createItem } from '@/app/actions'

// 修改服务器操作以返回状态
async function createItemWithState(prevState, formData) {
  try {
    const name = formData.get('name')
    if (!name || name.length < 3) {
      return { error: '名称必须至少包含3个字符' }
    }

    await saveToDatabase({ name })
    return { success: '项目创建成功!' }
  } catch (e) {
    return { error: '创建项目时出错' }
  }
}

export default function Form() {
  const [state, formAction] = useFormState(createItemWithState, {
    error: null,
    success: null,
  })

  return (
    <form action={formAction}>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">{state.success}</p>}

      <input type="text" name="name" />
      <button type="submit">创建项目</button>
    </form>
  )
}
```

## 文件上传

处理文件上传需要特别注意`encType`属性：

```jsx
// app/page.js
export default function Page() {
  async function uploadImage(formData) {
    'use server'

    const file = formData.get('image')
    if (!file || !(file instanceof File)) {
      return
    }

    // 处理文件上传
    const buffer = await file.arrayBuffer()
    // 保存文件到存储服务
    // ...
  }

  return (
    <form action={uploadImage} encType="multipart/form-data">
      <input type="file" name="image" accept="image/*" />
      <button type="submit">上传图片</button>
    </form>
  )
}
```

## 动态表单字段

创建包含动态字段的表单：

```jsx
'use client'

import { useState } from 'react'
import { createItemWithFields } from '@/app/actions'

export default function DynamicForm() {
  const [fields, setFields] = useState([''])

  function addField() {
    setFields([...fields, ''])
  }

  return (
    <form action={createItemWithFields}>
      {fields.map((_, index) => (
        <div key={index}>
          <input type="text" name={`field-${index}`} placeholder={`字段 ${index + 1}`} />
        </div>
      ))}

      <button type="button" onClick={addField}>
        添加字段
      </button>

      <button type="submit">提交</button>
    </form>
  )
}
```

```jsx
// app/actions.js
'use server'

export async function createItemWithFields(formData) {
  // 提取所有动态字段值
  const fields = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('field-')) {
      fields[key] = value
    }
  }

  // 处理字段数据
  console.log(fields)
  // ...
}
```

## 最佳实践

1. **使用TypeScript进行类型安全**：

```tsx
'use server'

import { z } from 'zod'

// 表单数据验证schema
const FormSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
})

type FormData = z.infer<typeof FormSchema>

export async function createItem(formData: FormData) {
  const result = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!result.success) {
    return { error: result.error.format() }
  }

  // 处理有效数据
  const { name, email } = result.data
  // ...
}
```

2. **错误处理**：

   - 在服务器操作中包含错误处理逻辑
   - 返回有意义的错误消息给用户
   - 使用`try/catch`块来捕获异常

3. **渐进式增强**：

   - 确保表单在JavaScript禁用时仍能工作
   - 逐步添加客户端验证和交互增强

4. **数据安全**：
   - 始终在服务器端验证用户输入
   - 过滤和净化提交的数据
   - 使用CSRF保护（Next.js内置）

## 限制

1. 服务器组件不能使用`useFormStatus`和`useFormState`等客户端钩子
2. 服务器操作只能处理可序列化的数据
3. 表单提交期间，页面不会自动重新验证其他数据

## 与传统表单处理的比较

| 特性     | Form 组件 + 服务器操作         | 传统API路由处理        |
| -------- | ------------------------------ | ---------------------- |
| 初始渲染 | 无需JavaScript即可工作         | 需要JavaScript         |
| 提交处理 | 默认渐进增强                   | 需要自定义客户端代码   |
| 用户体验 | 自动处理加载状态               | 需要手动管理加载状态   |
| 数据验证 | 可在客户端和服务器端验证       | 通常需要更多自定义代码 |
| SEO      | 更好，因为可以不依赖JavaScript | 依赖JavaScript         |

## 相关资源

- [服务器操作和表单](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [use server 指令](../directives/use-server.md)
- [React useFormStatus 文档](https://react.dev/reference/react-dom/hooks/useFormStatus)
- [React useFormState 文档](https://react.dev/reference/react-dom/hooks/useFormState)
