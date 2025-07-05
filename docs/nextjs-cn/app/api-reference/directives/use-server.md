---
title: 'use server'
description: 了解如何使用 'use server' 指令来标记可以从客户端代码中调用的异步函数。
---

`'use server'` 指令允许你在客户端组件内调用服务器函数，启用仅服务器代码的服务器操作。这是一个 React 功能。

> **须知**
>
> 此功能要求使用 [服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components)，且仅在 [服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components) 和特定的工件（例如 [服务器操作](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions)）中可用。

## 用法

有两种方式使用 `'use server'` 指令：

- 文件级别：将 `'use server'` 添加到文件顶部，使该文件中所有导出的函数都能作为服务器函数在客户端调用。
- 函数级别：将 `'use server'` 添加到一个异步函数的正文顶部，使该特定函数能作为服务器函数被调用。

### 文件级别

```js
'use server'

export async function addItem(data) {
  await saveItemToDatabase(data)
}
```

### 函数级别

```jsx
export async function addItem(data) {
  'use server'
  await saveItemToDatabase(data)
}
```

### 带传递数据的表单

```tsx highlight={3, 6, 12, 21} switcher
'use client'

import { addItem } from '../actions'
import { useState } from 'react'

export default function AddForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = await addItem(formData)
    setMessage(result.message)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="item" />
        <button type="submit">添加项目</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
```

```jsx highlight={3, 6, 12, 21} switcher
'use client'

import { addItem } from '../actions'
import { useState } from 'react'

export default function AddForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = await addItem(formData)
    setMessage(result.message)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="item" />
        <button type="submit">添加项目</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
```

## 使用带有 TypeScript 的服务器操作

你可以使用 `FormData` 或原生序列化类型（例如字符串、数字等）来定义你的服务器动作。

```tsx switcher highlight={5}
'use server'

// 使用带类型注解的 `T` 形式参数
// 客户端组件会推断此类型
export async function addItem(formData: FormData) {
  const item = formData.get('item')
  if (!item || typeof item !== 'string') {
    return { message: '无效的项目' }
  }

  // 操作数据库
  await saveItemToDatabase(item)
  return { message: '添加的项目: ' + item }
}
```

```tsx switcher highlight={3, 13}
'use client'

import { addItem } from '../actions'
import { useState } from 'react'

export default function AddForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    // TypeScript 推断 `result` 的类型
    const result = await addItem(formData)
    // TypeScript 推断 `result.message` 的类型
    setMessage(result.message)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="item" />
        <button type="submit">添加项目</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
```

## 参考

有关 `'use server'` 的更多信息，请参阅 [React 文档](https://react.dev/reference/rsc/use-server)。
