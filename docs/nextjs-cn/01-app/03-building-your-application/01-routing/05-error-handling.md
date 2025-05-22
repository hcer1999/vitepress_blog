---
title: 错误处理
description: 了解如何显示预期错误并处理未捕获的异常。
related:
  links:
    - app/api-reference/file-conventions/error
---

错误可以分为两类：**预期错误**和**未捕获的异常**：

- **将预期错误建模为返回值**：在服务器操作中避免使用 `try`/`catch` 处理预期错误。使用 [`useActionState`](https://react.dev/reference/react/useActionState) 来管理这些错误并将它们返回给客户端。
- **使用错误边界处理意外错误**：实现通过 `error.tsx` 和 `global-error.tsx` 文件的错误边界来处理意外错误并提供备用 UI。

## 处理预期错误

预期错误是那些可能在应用程序正常操作过程中发生的错误，如来自[服务器端表单验证](/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-form-validation)或失败的请求。这些错误应该被明确处理并返回给客户端。

### 处理来自服务器操作的预期错误

使用 `useActionState` 钩子来管理服务器操作的状态，包括处理错误。这种方法避免了对预期错误使用 `try`/`catch` 块，预期错误应该被建模为返回值而不是抛出的异常。

```ts filename="app/actions.ts" switcher
'use server'

import { redirect } from 'next/navigation'

export async function createUser(prevState: any, formData: FormData) {
  const res = await fetch('https://...')
  const json = await res.json()

  if (!res.ok) {
    return { message: '请输入有效的电子邮件' }
  }

  redirect('/dashboard')
}
```

```js filename="app/actions.js" switcher
'use server'

import { redirect } from 'next/navigation'

export async function createUser(prevState, formData) {
  const res = await fetch('https://...')
  const json = await res.json()

  if (!res.ok) {
    return { message: '请输入有效的电子邮件' }
  }

  redirect('/dashboard')
}
```

然后，您可以将您的操作传递给 `useActionState` 钩子，并使用返回的 `state` 显示错误消息。

```tsx filename="app/ui/signup.tsx" highlight={11,18-20} switcher
'use client'

import { useActionState } from 'react'
import { createUser } from '@/app/actions'

const initialState = {
  message: '',
}

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="email">电子邮件</label>
      <input type="text" id="email" name="email" required />
      {/* ... */}
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>注册</button>
    </form>
  )
}
```

```jsx filename="app/ui/signup.js" highlight={11,18-20} switcher
'use client'

import { useActionState } from 'react'
import { createUser } from '@/app/actions'

const initialState = {
  message: '',
}

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="email">电子邮件</label>
      <input type="text" id="email" name="email" required />
      {/* ... */}
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>注册</button>
    </form>
  )
}
```

您也可以使用返回的状态从客户端组件显示一个 toast 消息。

### 处理来自服务器组件的预期错误

在服务器组件内部获取数据时，您可以使用响应有条件地渲染错误消息或[`redirect`](/docs/app/building-your-application/routing/redirecting#redirect-function)。

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!res.ok) {
    return '出现了一个错误。'
  }

  return '...'
}
```

```jsx filename="app/page.js" switcher
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!res.ok) {
    return '出现了一个错误。'
  }

  return '...'
}
```

## 未捕获的异常

未捕获的异常是意外错误，表明在应用程序正常流程中不应该发生的错误或问题。这些应该通过抛出错误来处理，然后由错误边界捕获。

- **常见：** 使用 `error.js` 处理根布局下方的未捕获错误。
- **可选：** 使用嵌套的 `error.js` 文件处理细粒度的未捕获错误（例如 `app/dashboard/error.js`）
- **不常见：** 使用 `global-error.js` 处理根布局中的未捕获错误。

### 使用错误边界

Next.js 使用错误边界来处理未捕获的异常。错误边界捕获其子组件中的错误，并显示备用 UI 而不是崩溃的组件树。

通过在路由段内添加 `error.tsx` 文件并导出 React 组件来创建错误边界：

```tsx filename="app/dashboard/error.tsx" switcher
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

```jsx filename="app/dashboard/error.js" switcher
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

如果您希望错误冒泡到父错误边界，您可以在渲染 `error` 组件时 `throw`。

### 处理嵌套路由中的错误

错误将冒泡到最近的父错误边界。这允许通过在[路由层次结构](/docs/app/getting-started/project-structure#component-hierarchy)的不同级别放置 `error.tsx` 文件来进行细粒度的错误处理。

<Image
  alt="嵌套错误组件层次结构"
  srcLight="/docs/light/nested-error-component-hierarchy.png"
  srcDark="/docs/dark/nested-error-component-hierarchy.png"
  width="1600"
  height="687"
/>

### 处理全局错误

虽然不太常见，但您可以使用位于根 app 目录中的 `app/global-error.js` 处理根布局中的错误，即使在利用[国际化](/docs/app/building-your-application/routing/internationalization)时也是如此。全局错误 UI 必须定义自己的 `<html>` 和 `<body>` 标签，因为它在激活时会替换根布局或模板。

```tsx filename="app/global-error.tsx" switcher
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

```jsx filename="app/global-error.js" switcher
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
