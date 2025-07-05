---
title: 如何处理错误
nav_title: 错误处理
description: 了解如何显示预期错误和处理未捕获的异常。
related:
  title: API 参考
  description: 通过阅读 API 参考来了解本页面提到的功能。
  links:
    - app/api-reference/functions/redirect
    - app/api-reference/file-conventions/error
    - app/api-reference/functions/not-found
    - app/api-reference/file-conventions/not-found
---

# NextJS中文文档 - Error Handling

错误可以分为两类：[预期错误](#handling-expected-errors)和[未捕获的异常](#handling-uncaught-exceptions)。本页将指导你如何在 Next.js 应用程序中处理这些错误。

## 处理预期错误

预期错误是那些可能在应用程序正常运行期间发生的错误，例如来自[服务器端表单验证](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-form-validation)或请求失败的错误。这些错误应该被明确处理并返回给客户端。

### 服务器函数

你可以使用 [`useActionState`](https://react.dev/reference/react/useActionState) hook 来处理[服务器函数](https://react.dev/reference/rsc/server-functions)中的预期错误。

对于这些错误，避免使用 `try`/`catch` 块和抛出错误。相反，应该将预期错误建模为返回值。

```ts switcher
'use server'

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title, content },
  })
  const json = await res.json()

  if (!res.ok) {
    return { message: '创建文章失败' }
  }
}
```

```js switcher
'use server'

export async function createPost(prevState, formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title, content },
  })
  const json = await res.json()

  if (!res.ok) {
    return { message: '创建文章失败' }
  }
}
```

你可以将你的操作传递给 `useActionState` hook，并使用返回的 `state` 来显示错误消息。

```tsx highlight={11,19} switcher
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'

const initialState = {
  message: '',
}

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="title">标题</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">内容</label>
      <textarea id="content" name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>创建文章</button>
    </form>
  )
}
```

```jsx highlight={11,19} switcher
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'

const initialState = {
  message: '',
}

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="title">标题</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">内容</label>
      <textarea id="content" name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>创建文章</button>
    </form>
  )
}
```

### 服务器组件

在服务器组件内部获取数据时，你可以使用响应来有条件地渲染错误消息或[`重定向`](/nextjs-cn/app/api-reference/functions/redirect)。

```tsx switcher
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!res.ok) {
    return '发生了错误。'
  }

  return '...'
}
```

```jsx switcher
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!res.ok) {
    return '发生了错误。'
  }

  return '...'
}
```

### 未找到

你可以在路由段内调用 [`notFound`](/nextjs-cn/app/api-reference/functions/not-found) 函数，并使用 [`not-found.js`](/nextjs-cn/app/api-reference/file-conventions/not-found) 文件来显示 404 UI。

```tsx switcher
import { getPostBySlug } from '@/lib/posts'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <div>{post.title}</div>
}
```

```jsx switcher
import { getPostBySlug } from '@/lib/posts'

export default async function Page({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <div>{post.title}</div>
}
```

```tsx switcher
export default function NotFound() {
  return <div>404 - 页面未找到</div>
}
```

```jsx switcher
export default function NotFound() {
  return <div>404 - 页面未找到</div>
}
```

## 处理未捕获的异常

未捕获的异常是那些表明存在 bug 或在应用程序正常流程中不应该发生的问题的意外错误。这些应该通过抛出错误来处理，然后由错误边界捕获。

### 嵌套错误边界

Next.js 使用错误边界来处理未捕获的异常。错误边界会捕获其子组件中的错误，并显示一个回退 UI，而不是显示崩溃的组件树。

通过在路由段内添加 [`error.js`](/nextjs-cn/app/api-reference/file-conventions/error) 文件并导出一个 React 组件来创建错误边界：

```tsx switcher
'use client' // 错误边界必须是客户端组件

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 将错误记录到错误报告服务
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>出错了！</h2>
      <button
        onClick={
          // 尝试通过重新渲染段来恢复
          () => reset()
        }
      >
        重试
      </button>
    </div>
  )
}
```

```jsx switcher
'use client' // 错误边界必须是客户端组件

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // 将错误记录到错误报告服务
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  )
}
```

错误将冒泡到最近的父级错误边界。这允许通过在[路由层次结构](/nextjs-cn/app/getting-started/project-structure#component-hierarchy)的不同级别放置 `error.tsx` 文件来进行细粒度的错误处理。

<Image
  alt="嵌套错误组件层次结构"
  srcLight="/docs/light/nested-error-component-hierarchy.png"
  srcDark="/docs/dark/nested-error-component-hierarchy.png"
  width="1600"
  height="687"
/>

### 全局错误

虽然不太常见，但你可以使用位于根 app 目录中的 [`global-error.js`](/nextjs-cn/app/api-reference/file-conventions/error#global-error) 文件来处理根布局中的错误，即使在使用[国际化](/nextjs-cn/app/building-your-application/routing/internationalization)时也是如此。全局错误 UI 必须定义自己的 `<html>` 和 `<body>` 标签，因为它在激活时会替换根布局或模板。

```tsx switcher
'use client' // 错误边界必须是客户端组件

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error 必须包含 html 和 body 标签
    <html>
      <body>
        <h2>出错了！</h2>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  )
}
```

```jsx switcher
'use client' // 错误边界必须是客户端组件

export default function GlobalError({ error, reset }) {
  return (
    // global-error 必须包含 html 和 body 标签
    <html>
      <body>
        <h2>出错了！</h2>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  )
}
```
