---
title: 如何更新数据
nav_title: 更新数据
description: 了解如何在你的 Next.js 应用程序中更新数据。
related:
  title: API 参考
  description: 通过阅读 API 参考来了解本页面提到的功能。
  links:
    - app/api-reference/functions/revalidatePath
    - app/api-reference/functions/revalidateTag
    - app/api-reference/functions/redirect
---

你可以使用 React 的[服务器函数](https://react.dev/reference/rsc/server-functions)在 Next.js 中更新数据。本页将介绍如何[创建](#creating-server-functions)和[调用](#invoking-server-functions)服务器函数。

## 创建服务器函数

服务器函数可以通过使用 [`use server`](https://react.dev/reference/rsc/use-server) 指令来定义。你可以将该指令放在**异步**函数的顶部以将该函数标记为服务器函数，或者放在单独文件的顶部以将该文件的所有导出标记为服务器函数。

```ts filename="app/lib/actions.ts" switcher
export async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')

  // 更新数据
  // 重新验证缓存
}

export async function deletePost(formData: FormData) {
  'use server'
  const id = formData.get('id')

  // 更新数据
  // 重新验证缓存
}
```

```js filename="app/lib/actions.js" switcher
export async function createPost(formData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')

  // 更新数据
  // 重新验证缓存
}

export async function deletePost(formData) {
  'use server'
  const id = formData.get('id')

  // 更新数据
  // 重新验证缓存
}
```

### 服务器组件

服务器函数可以通过在函数体顶部添加 `"use server"` 指令来内联在服务器组件中：

```tsx filename="app/page.tsx" switcher
export default function Page() {
  // 服务器操作
  async function createPost(formData: FormData) {
    'use server'
    // ...
  }

  return <></>
}
```

```jsx filename="app/page.js" switcher
export default function Page() {
  // 服务器操作
  async function createPost(formData) {
    'use server'
    // ...
  }

  return <></>
}
```

### 客户端组件

不能在客户端组件中定义服务器函数。但是，你可以通过从顶部有 `"use server"` 指令的文件中导入它们来在客户端组件中调用它们：

```ts filename="app/actions.ts" switcher
'use server'

export async function createPost() {}
```

```js filename="app/actions.js" switcher
'use server'

export async function createPost() {}
```

```tsx filename="app/ui/button.tsx" switcher
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)

  return <button onClick={async () => action()}>{pending ? <LoadingSpinner /> : '创建文章'}</button>
}
```

```jsx filename="app/ui/button.js" switcher
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)

  return <button onClick={async () => action()}>{pending ? <LoadingSpinner /> : '创建文章'}</button>
}
```

## 调用服务器函数

有两种主要方式可以调用服务器函数：

1. 在服务器和客户端组件中使用[表单](#forms)
2. 在客户端组件中使用[事件处理程序](#event-handlers)

### 表单

React 扩展了 HTML [`<form>`](https://react.dev/reference/react-dom/components/form) 元素，允许通过 HTML `action` 属性调用服务器函数。

当在表单中调用时，该函数会自动接收 [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData/FormData) 对象。你可以使用原生的 [`FormData` 方法](https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods)提取数据：

```tsx filename="app/ui/form.tsx" switcher
import { createPost } from '@/app/actions'

export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">创建</button>
    </form>
  )
}
```

```jsx filename="app/ui/form.js" switcher
import { createPost } from '@/app/actions'

export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">创建</button>
    </form>
  )
}
```

```ts filename="app/actions.ts" switcher
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  // 更新数据
  // 重新验证缓存
}
```

```js filename="app/actions.js" switcher
'use server'

export async function createPost(formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  // 更新数据
  // 重新验证缓存
}
```

> **注意：** 当传递给 `action` 属性时，服务器函数也被称为*服务器操作*。

### 事件处理程序

你可以在客户端组件中使用 `onClick` 等事件处理程序来调用服务器函数。

```tsx filename="app/like-button.tsx" switcher
'use client'

import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)

  return (
    <>
      <p>总点赞数：{likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        点赞
      </button>
    </>
  )
}
```

```jsx filename="app/like-button.js" switcher
'use client'

import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)

  return (
    <>
      <p>总点赞数：{likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        点赞
      </button>
    </>
  )
}
```

## 示例

### 显示等待状态

在执行服务器函数时，你可以使用 React 的 [`useActionState`](https://react.dev/reference/react/useActionState) hook 显示加载指示器。这个 hook 返回一个 `pending` 布尔值：

```tsx filename="app/ui/button.tsx" switcher
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)

  return <button onClick={async () => action()}>{pending ? <LoadingSpinner /> : '创建文章'}</button>
}
```

```jsx filename="app/ui/button.js" switcher
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)

  return <button onClick={async () => action()}>{pending ? <LoadingSpinner /> : '创建文章'}</button>
}
```

### 重新验证缓存

执行更新后，你可以通过在服务器函数中调用 [`revalidatePath`](/docs/app/api-reference/functions/revalidatePath) 或 [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag) 来重新验证 Next.js 缓存并显示更新后的数据：

```ts filename="app/lib/actions.ts" switcher
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  'use server'
  // 更新数据
  // ...

  revalidatePath('/posts')
}
```

```js filename="app/actions.js" switcher
import { revalidatePath } from 'next/cache'

export async function createPost(formData) {
  'use server'
  // 更新数据
  // ...
  revalidatePath('/posts')
}
```

### 重定向

在执行更新后，你可能想要将用户重定向到不同的页面。你可以通过在服务器函数中调用 [`redirect`](/docs/app/api-reference/functions/redirect) 来实现这一点：

```ts filename="app/lib/actions.ts" switcher
'use server'

import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  // 更新数据
  // ...

  redirect('/posts')
}
```

```js filename="app/actions.js" switcher
'use server'

import { redirect } from 'next/navigation'

export async function createPost(formData) {
  // 更新数据
  // ...

  redirect('/posts')
}
```
