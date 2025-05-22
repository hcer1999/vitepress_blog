---
title: 服务器操作和数据变更
nav_title: 服务器操作和数据变更
description: 学习如何使用 Next.js 处理表单提交和数据变更。
related:
  description: 学习如何在 Next.js 中配置服务器操作
  links:
    - app/api-reference/config/next-config-js/serverActions
---

[服务器操作](https://react.dev/reference/rsc/server-actions)是在服务器上执行的**异步函数**。它们可以在服务器组件和客户端组件中调用，用于处理 Next.js 应用程序中的表单提交和数据变更。

> **🎥 观看：** 了解更多关于使用服务器操作进行数据变更的内容 → [YouTube (10 分钟)](https://youtu.be/dDpZfOQBMaU?si=cJZHlUu_jFhCzHUg)。

## 约定

服务器操作可以通过 React 的 [`"use server"`](https://react.dev/reference/react/use-server) 指令定义。你可以将该指令放在 `async` 函数的顶部，将该函数标记为服务器操作，或者放在单独文件的顶部，将该文件的所有导出标记为服务器操作。

### 服务器组件

服务器组件可以使用函数级别或模块级别的 `"use server"` 指令。要内联服务器操作，请在函数体的顶部添加 `"use server"`：

```tsx filename="app/page.tsx" switcher
export default function Page() {
  // 服务器操作
  async function create() {
    'use server'
    // 修改数据
  }

  return '...'
}
```

```jsx filename="app/page.js" switcher
export default function Page() {
  // 服务器操作
  async function create() {
    'use server'
    // 修改数据
  }

  return '...'
}
```

### 客户端组件

要在客户端组件中调用服务器操作，创建一个新文件并在其顶部添加 `"use server"` 指令。该文件中所有导出的函数都将被标记为服务器操作，可以在客户端和服务器组件中重用：

```tsx filename="app/actions.ts" switcher
'use server'

export async function create() {}
```

```js filename="app/actions.js" switcher
'use server'

export async function create() {}
```

```tsx filename="app/button.tsx" switcher
'use client'

import { create } from './actions'

export function Button() {
  return <button onClick={() => create()}>创建</button>
}
```

```jsx filename="app/button.js" switcher
'use client'

import { create } from './actions'

export function Button() {
  return <button onClick={() => create()}>创建</button>
}
```

### 将操作作为属性传递

你还可以将服务器操作作为属性传递给客户端组件：

```jsx
<ClientComponent updateItemAction={updateItem} />
```

```tsx filename="app/client-component.tsx" switcher
'use client'

export default function ClientComponent({
  updateItemAction,
}: {
  updateItemAction: (formData: FormData) => void
}) {
  return <form action={updateItemAction}>{/* ... */}</form>
}
```

```jsx filename="app/client-component.js" switcher
'use client'

export default function ClientComponent({ updateItemAction }) {
  return <form action={updateItemAction}>{/* ... */}</form>
}
```

通常，Next.js TypeScript 插件会标记 `client-component.tsx` 中的 `updateItemAction`，因为它是一个函数，一般情况下无法跨客户端-服务器边界序列化。
然而，名为 `action` 或以 `Action` 结尾的属性被假定为接收服务器操作。
这只是一种启发式方法，因为 TypeScript 插件实际上并不知道它接收的是服务器操作还是普通函数。
运行时类型检查仍然会确保你不会意外地将函数传递给客户端组件。

## 行为

- 服务器操作可以使用 [`<form>` 元素](#forms)中的 `action` 属性调用：
  - 服务器组件默认支持渐进式增强，这意味着即使 JavaScript 尚未加载或被禁用，表单也会被提交。
  - 在客户端组件中，如果 JavaScript 尚未加载，调用服务器操作的表单将排队提交，优先考虑客户端水合。
  - 水合后，浏览器在表单提交时不会刷新。
- 服务器操作不限于 `<form>`，可以从事件处理程序、`useEffect`、第三方库和其他表单元素（如 `<button>`）中调用。
- 服务器操作与 Next.js [缓存和重新验证](/docs/app/deep-dive/caching)架构集成。当调用操作时，Next.js 可以在单个服务器往返中返回更新的 UI 和新数据。
- 在幕后，操作使用 `POST` 方法，并且只有这种 HTTP 方法可以调用它们。
- 服务器操作的参数和返回值必须可被 React 序列化。查看 React 文档了解[可序列化的参数和值](https://react.dev/reference/react/use-server#serializable-parameters-and-return-values)列表。
- 服务器操作是函数。这意味着它们可以在应用程序的任何地方重用。
- 服务器操作继承其所使用的页面或布局的运行时。
- 服务器操作继承其所使用的页面或布局的[路由段配置](/docs/app/api-reference/file-conventions/route-segment-config)，包括 `maxDuration` 等字段。

## 示例

### 表单

React 扩展了 HTML [`<form>`](https://developer.mozilla.org/docs/Web/HTML/Element/form) 元素，允许通过 `action` 属性调用服务器操作。

在表单中调用时，操作会自动接收 [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) 对象。你不需要使用 React 的 `useState` 来管理字段，而是可以使用原生的 [`FormData` 方法](https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods)提取数据：

```tsx filename="app/invoices/page.tsx" switcher
export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server'

    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }

    // 修改数据
    // 重新验证缓存
  }

  return <form action={createInvoice}>...</form>
}
```

```jsx filename="app/invoices/page.js" switcher
export default function Page() {
  async function createInvoice(formData) {
    'use server'

    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }

    // 修改数据
    // 重新验证缓存
  }

  return <form action={createInvoice}>...</form>
}
```

> **值得了解：**
>
> - 示例：[带有加载和错误状态的表单](https://github.com/vercel/next.js/tree/canary/examples/next-forms)
> - 当处理有很多字段的表单时，你可能想考虑使用 [`entries()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries) 方法和 JavaScript 的 [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)。例如：`const rawFormData = Object.fromEntries(formData)`。需要注意的是，`formData` 将包含额外的 `$ACTION_` 属性。
> - 查看 [React `<form>` 文档](https://react.dev/reference/react-dom/components/form#handle-form-submission-with-a-server-action)了解更多信息。

### 传递额外参数

你可以使用 JavaScript 的 `bind` 方法向服务器操作传递额外参数。

```tsx filename="app/client-component.tsx" highlight={6} switcher
'use client'

import { updateUser } from './actions'

export function UserProfile({ userId }: { userId: string }) {
  const updateUserWithId = updateUser.bind(null, userId)

  return (
    <form action={updateUserWithId}>
      <input type="text" name="name" />
      <button type="submit">更新用户名</button>
    </form>
  )
}
```

```jsx filename="app/client-component.js" highlight={6} switcher
'use client'

import { updateUser } from './actions'

export function UserProfile({ userId }) {
  const updateUserWithId = updateUser.bind(null, userId)

  return (
    <form action={updateUserWithId}>
      <input type="text" name="name" />
      <button type="submit">更新用户名</button>
    </form>
  )
}
```

服务器操作将接收 `userId` 参数，除了表单数据之外：

```ts filename="app/actions.ts" switcher
'use server'

export async function updateUser(userId: string, formData: FormData) {}
```

```js filename="app/actions.js" switcher
'use server'

export async function updateUser(userId, formData) {}
```

> **值得了解**：
>
> - 另一种方法是将参数作为隐藏输入字段传递到表单中（例如 `<input type="hidden" name="userId" value={userId} />`）。但是，该值将成为渲染的 HTML 的一部分，并且不会被编码。
> - `.bind` 在服务器组件和客户端组件中都可以工作。它还支持渐进式增强。

### 嵌套表单元素

你还可以在 `<form>` 内部嵌套的元素中调用服务器操作，例如 `<button>`、`<input type="submit">` 和 `<input type="image">`。这些元素接受 `formAction` 属性或[事件处理程序](#event-handlers)。

这在你想在表单中调用多个服务器操作的情况下很有用。例如，你可以创建一个特定的 `<button>` 元素，用于保存帖子草稿，而不是发布它。有关更多信息，请参阅 [React `<form>` 文档](https://react.dev/reference/react-dom/components/form#handling-multiple-submission-types)。

### 程序化表单提交

你可以使用 [`requestSubmit()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) 方法以编程方式触发表单提交。例如，当用户使用 `⌘` + `Enter` 键盘快捷键提交表单时，你可以监听 `onKeyDown` 事件：

```tsx filename="app/entry.tsx" switcher
'use client'

export function Entry() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <div>
      <textarea name="entry" rows={20} required onKeyDown={handleKeyDown} />
    </div>
  )
}
```

```jsx filename="app/entry.js" switcher
'use client'

export function Entry() {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <div>
      <textarea name="entry" rows={20} required onKeyDown={handleKeyDown} />
    </div>
  )
}
```

这将触发最近的 `<form>` 祖先的提交，从而调用服务器操作。

### 服务器端表单验证

你可以使用 HTML 属性，如 `required` 和 `type="email"` 进行基本的客户端表单验证。

对于更高级的服务器端验证，你可以使用像 [zod](https://zod.dev/) 这样的库在修改数据之前验证表单字段：

```tsx filename="app/actions.ts" switcher
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string({
    invalid_type_error: '无效的邮箱',
  }),
})

export default async function createUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  // 如果表单数据无效，提前返回
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 修改数据
}
```

```jsx filename="app/actions.js" switcher
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string({
    invalid_type_error: '无效的邮箱',
  }),
})

export default async function createsUser(formData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  // 如果表单数据无效，提前返回
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 修改数据
}
```

一旦字段在服务器上被验证，你可以在操作中返回一个可序列化的对象，并使用 React 的 `useActionState` 钩子向用户显示消息。

- 通过将操作传递给 `useActionState`，操作的函数签名会改变，以接收一个新的 `prevState` 或 `initialState` 参数作为其第一个参数。
- `useActionState` 是一个 React 钩子，因此必须在客户端组件中使用。

```tsx filename="app/actions.ts" switcher
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

```jsx filename="app/actions.js" switcher
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

然后，你可以将你的操作传递给 `useActionState` 钩子，并使用返回的 `state` 显示错误消息。

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

### 等待状态

[`useActionState`](https://react.dev/reference/react/useActionState) 钩子暴露一个 `pending` 布尔值，可用于在操作执行期间显示加载指示器。

或者，你可以使用 [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) 钩子在操作执行期间显示加载指示器。使用这个钩子时，你需要创建一个单独的组件来渲染加载指示器。例如，当操作待处理时禁用按钮：

```tsx filename="app/ui/button.tsx" highlight={6} switcher
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      注册
    </button>
  )
}
```

```jsx filename="app/ui/button.js" highlight={6} switcher
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      注册
    </button>
  )
}
```

然后，你可以在表单中嵌套 `SubmitButton` 组件：

```tsx filename="app/ui/signup.tsx" switcher
'use client'

import { SubmitButton } from './button'
import { createUser } from '@/app/actions'

export function Signup() {
  return (
    <form action={createUser}>
      {/* 其他表单元素 */}
      <SubmitButton />
    </form>
  )
}
```

```jsx filename="app/ui/signup.js" switcher
'use client'

import { SubmitButton } from './button'
import { createUser } from '@/app/actions'

export function Signup() {
  return (
    <form action={createUser}>
      {/* 其他表单元素 */}
      <SubmitButton />
    </form>
  )
}
```

> **Good to know:** In React 19, `useFormStatus` includes additional keys on the returned object, like data, method, and action. If you are not using React 19, only the `pending` key is available.

### 乐观更新

你可以使用 React 的 [`useOptimistic`](https://react.dev/reference/react/useOptimistic) 钩子在服务器操作完成执行之前乐观地更新 UI，而不是等待响应：

```tsx filename="app/page.tsx" switcher
'use client'

import { useOptimistic } from 'react'
import { send } from './actions'

type Message = {
  message: string
}

export function Thread({ messages }: { messages: Message[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage) => [...state, { message: newMessage }],
  )

  const formAction = async (formData: FormData) => {
    const message = formData.get('message') as string
    addOptimisticMessage(message)
    await send(message)
  }

  return (
    <div>
      {optimisticMessages.map((m, i) => (
        <div key={i}>{m.message}</div>
      ))}
      <form action={formAction}>
        <input type="text" name="message" />
        <button type="submit">发送</button>
      </form>
    </div>
  )
}
```

```jsx filename="app/page.js" switcher
'use client'

import { useOptimistic } from 'react'
import { send } from './actions'

export function Thread({ messages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { message: newMessage }],
  )

  const formAction = async (formData) => {
    const message = formData.get('message')
    addOptimisticMessage(message)
    await send(message)
  }

  return (
    <div>
      {optimisticMessages.map((m) => (
        <div>{m.message}</div>
      ))}
      <form action={formAction}>
        <input type="text" name="message" />
        <button type="submit">发送</button>
      </form>
    </div>
  )
}
```

### 事件处理程序

虽然在 `<form>` 元素中使用服务器操作很常见，但它们也可以通过事件处理程序（如 `onClick`）调用。例如，增加点赞数：

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

你还可以向表单元素添加事件处理程序，例如，在 `onChange` 时保存表单字段：

```tsx filename="app/ui/edit-post.tsx"
'use client'

import { publishPost, saveDraft } from './actions'

export default function EditPost() {
  return (
    <form action={publishPost}>
      <textarea
        name="content"
        onChange={async (e) => {
          await saveDraft(e.target.value)
        }}
      />
      <button type="submit">发布</button>
    </form>
  )
}
```

对于这种情况，多个事件可能在短时间内快速触发，我们建议使用**防抖**来防止不必要的服务器操作调用。

### `useEffect`

你可以使用 React 的 [`useEffect`](https://react.dev/reference/react/useEffect) 钩子在组件挂载或依赖项变化时调用服务器操作。这对于依赖于全局事件或需要自动触发的变更很有用。例如，应用快捷键的 `onKeyDown`，用于无限滚动的交叉观察器钩子，或在组件挂载时更新浏览量：

```tsx filename="app/view-count.tsx" switcher
'use client'

import { incrementViews } from './actions'
import { useState, useEffect } from 'react'

export default function ViewCount({ initialViews }: { initialViews: number }) {
  const [views, setViews] = useState(initialViews)

  useEffect(() => {
    const updateViews = async () => {
      const updatedViews = await incrementViews()
      setViews(updatedViews)
    }

    updateViews()
  }, [])

  return <p>总浏览量：{views}</p>
}
```

```jsx filename="app/view-count.js" switcher
'use client'

import { incrementViews } from './actions'
import { useState, useEffect } from 'react'

export default function ViewCount({ initialViews }) {
  const [views, setViews] = useState(initialViews)

  useEffect(() => {
    const updateViews = async () => {
      const updatedViews = await incrementViews()
      setViews(updatedViews)
    }

    updateViews()
  }, [])

  return <p>总浏览量：{views}</p>
}
```

记得考虑 `useEffect` 的[行为和注意事项](https://react.dev/reference/react/useEffect#caveats)。

### 错误处理

当抛出错误时，它将被客户端上最近的 `error.js` 或 `<Suspense>` 边界捕获。有关更多信息，请参阅[错误处理](/docs/app/building-your-application/routing/error-handling)。

> **值得了解：**
>
> - 除了抛出错误外，你还可以返回一个对象，由 `useActionState` 处理。请参阅[服务器端验证和错误处理](#server-side-form-validation)。

### 重新验证数据

你可以在服务器操作内使用 [`revalidatePath`](/docs/app/api-reference/functions/revalidatePath) API 重新验证 [Next.js 缓存](/docs/app/deep-dive/caching)：

```ts filename="app/actions.ts" switcher
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost() {
  try {
    // ...
  } catch (error) {
    // ...
  }

  revalidatePath('/posts')
}
```

或者使用 [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag) 通过缓存标签使特定的数据获取失效：

```ts filename="app/actions.ts" switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function createPost() {
  try {
    // ...
  } catch (error) {
    // ...
  }

  revalidateTag('posts')
}
```

```js filename="app/actions.js" switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function createPost() {
  try {
    // ...
  } catch (error) {
    // ...
  }

  revalidateTag('posts')
}
```

### 重定向

如果你想在服务器操作完成后将用户重定向到不同的路由，可以使用 [`redirect`](/docs/app/api-reference/functions/redirect) API。`redirect` 需要在 `try/catch` 块外调用：

```ts filename="app/actions.ts" switcher
'use server'

import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export async function createPost(id: string) {
  try {
    // ...
  } catch (error) {
    // ...
  }

  revalidateTag('posts') // 更新缓存的帖子
  redirect(`/post/${id}`) // 导航到新帖子页面
}
```

```js filename="app/actions.js" switcher
'use server'

import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export async function createPost(id) {
  try {
    // ...
  } catch (error) {
    // ...
  }

  revalidateTag('posts') // 更新缓存的帖子
  redirect(`/post/${id}`) // 导航到新帖子页面
}
```

### Cookies

你可以使用 [`cookies`](/docs/app/api-reference/functions/cookies) API 在服务器操作内 `获取`、`设置` 和 `删除` cookies：

```ts filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function exampleAction() {
  const cookieStore = await cookies()

  // 获取 cookie
  cookieStore.get('name')?.value

  // 设置 cookie
  cookieStore.set('name', 'Delba')

  // 删除 cookie
  cookieStore.delete('name')
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function exampleAction() {
  // 获取 cookie
  const cookieStore = await cookies()

  // 获取 cookie
  cookieStore.get('name')?.value

  // 设置 cookie
  cookieStore.set('name', 'Delba')

  // 删除 cookie
  cookieStore.delete('name')
}
```

有关从服务器操作删除 cookie 的[其他示例](/docs/app/api-reference/functions/cookies#deleting-cookies)，请参阅文档。

## 安全性

默认情况下，当创建和导出服务器操作时，它会创建一个公共 HTTP 端点
和应该采用相同的安全假设和授权检查。这意味着，即使服务器操作或实用函数未在代码的其他地方导入，它仍然可以公开访问。

为了提高安全性，Next.js 具有以下内置功能：

- **安全操作 ID：** Next.js 创建加密的、非确定性 ID，允许客户端引用和调用服务器操作。这些 ID 在构建之间定期重新计算，以增强安全性。
- **死代码消除：** 未使用的服务器操作（通过其 ID 引用）从客户端 bundle 中移除，以避免第三方公开访问。

> **值得了解**：
>
> ID 在编译期间创建，并最多缓存 14 天。当启动新的构建或构建缓存失效时，它们将被重新生成。
> 这种安全改进减少了在缺少认证层的情况下的风险。但是，你仍应将服务器操作视为公共 HTTP 端点。

```jsx
// app/actions.js
'use server'

// 这个操作**在**我们的应用程序中使用，所以 Next.js
// 将创建一个安全 ID，允许客户端引用
// 并调用服务器操作。
export async function updateUserAction(formData) {}

// 这个操作**没有**在我们的应用程序中使用，所以 Next.js
// 将在 `next build` 期间自动删除此代码
// 并且不会创建公共端点。
export async function deleteUserAction(formData) {}
```

### 认证和授权

你应该确保用户有权执行操作。例如：

```tsx filename="app/actions.ts"
'use server'

import { auth } from './lib'

export function addItem() {
  const { user } = auth()
  if (!user) {
    throw new Error('你必须登录才能执行此操作')
  }

  // ...
}
```

### 闭包和加密

在组件内定义服务器操作会创建一个[闭包](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)，其中操作可以访问外部函数的作用域。例如，`publish` 操作可以访问 `publishVersion` 变量：

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  const publishVersion = await getLatestVersion();

  async function publish() {
    "use server";
    if (publishVersion !== await getLatestVersion()) {
      throw new Error('自按下发布以来版本已更改');
    }
    ...
  }

  return (
    <form>
      <button formAction={publish}>发布</button>
    </form>
  );
}
```

```jsx filename="app/page.js" switcher
export default async function Page() {
  const publishVersion = await getLatestVersion();

  async function publish() {
    "use server";
    if (publishVersion !== await getLatestVersion()) {
      throw new Error('自按下发布以来版本已更改');
    }
    ...
  }

  return (
    <form>
      <button formAction={publish}>发布</button>
    </form>
  );
}
```

当你需要在渲染时捕获数据的*快照*（例如 `publishVersion`），以便稍后在调用操作时使用时，闭包非常有用。

然而，为了实现这一点，捕获的变量会发送到客户端，并在调用操作时发回服务器。为了防止敏感数据暴露给客户端，Next.js 自动对闭包变量进行加密。每次构建 Next.js 应用程序时，都会为每个操作生成一个新的私钥。这意味着操作只能针对特定的构建调用。

> **值得了解：** 我们不建议仅依靠加密来防止敏感值在客户端上暴露。相反，你应该使用 [React 污点 API](/docs/app/building-your-application/data-fetching/fetching#preventing-sensitive-data-from-being-exposed-to-the-client) 主动防止特定数据发送到客户端。

### 覆盖加密密钥（高级）

当在多个服务器上自托管 Next.js 应用程序时，每个服务器实例可能最终使用不同的加密密钥，导致潜在的不一致性。

为了缓解这种情况，你可以使用 `process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` 环境变量覆盖加密密钥。指定此变量可确保你的加密密钥在构建之间保持持久，并且所有服务器实例使用相同的密钥。此变量**必须**使用 AES-GCM 加密。

这是一个高级用例，在这种情况下，多个部署之间的一致加密行为对你的应用程序至关重要。你应该考虑标准的安全实践，如密钥轮换和签名。

> **值得了解：** 部署到 Vercel 的 Next.js 应用程序会自动处理这一点。

### 允许的来源（高级）

由于服务器操作可以在 `<form>` 元素中调用，这使它们容易受到 [CSRF 攻击](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)。

在背后，服务器操作使用 `POST` 方法，并且只有这种 HTTP 方法才能调用它们。这可以防止现代浏览器中的大多数 CSRF 漏洞，特别是在 [SameSite cookies](https://web.dev/articles/samesite-cookies-explained) 成为默认设置的情况下。

作为额外的保护，Next.js 中的服务器操作还会比较 [Origin 标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin)和 [Host 标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host)（或 `X-Forwarded-Host`）。如果这些不匹配，请求将被中止。换句话说，服务器操作只能在托管它的页面的同一主机上调用。

对于使用反向代理或多层后端架构的大型应用程序（其中服务器 API 与生产域不同），建议使用配置选项 [`serverActions.allowedOrigins`](/docs/app/api-reference/config/next-config-js/serverActions) 来指定安全来源列表。该选项接受字符串数组。

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['my-site.com', '*.my-site.com'],
    },
  },
}
```

Learn more about [Security and Server Actions](https://nextjs.org/blog/security-nextjs-server-components-actions).

## Additional resources

For more information, check out the following React docs:

- [Server Actions](https://react.dev/reference/rsc/server-actions)
- [`"use server"`](https://react.dev/reference/react/use-server)
- [`<form>`](https://react.dev/reference/react-dom/components/form)
- [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus)
- [`useActionState`](https://react.dev/reference/react/useActionState)
- [`useOptimistic`](https://react.dev/reference/react/useOptimistic)
