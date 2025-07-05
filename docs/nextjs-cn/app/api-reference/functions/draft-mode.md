---
title: draftMode
description: draftMode 函数的 API 参考。
related:
  title: 后续步骤
  description: 通过这个分步指南学习如何使用草稿模式。
  links:
    - app/guides/draft-mode
---

# NextJS中文文档 - Draft Mode

`draftMode` 是一个**异步**函数，允许你启用和禁用[草稿模式](/nextjs-cn/app/guides/draft-mode)，以及检查草稿模式在[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)中是否启用。

```tsx switcher
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
}
```

```jsx switcher
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
}
```

## 参考

提供了以下方法和属性：

| 方法        | 描述                                                                      |
| ----------- | ------------------------------------------------------------------------- |
| `isEnabled` | 一个布尔值，指示草稿模式是否启用。                                        |
| `enable()`  | 通过设置一个 cookie（`__prerender_bypass`）在路由处理程序中启用草稿模式。 |
| `disable()` | 通过删除 cookie 在路由处理程序中禁用草稿模式。                            |

## 须知

- `draftMode` 是一个**异步**函数，返回一个 Promise。你必须使用 `async/await` 或 React 的 [`use`](https://react.dev/reference/react/use) 函数。
  - 在版本 14 及更早版本中，`draftMode` 是一个同步函数。为了向后兼容，你在 Next.js 15 中仍然可以同步访问它，但这种行为将在未来被废弃。
- 每次运行 `next build` 时都会生成一个新的绕过 cookie 值。这确保绕过 cookie 不能被猜测。
- 要在 HTTP 上本地测试草稿模式，你的浏览器需要允许第三方 cookie 和本地存储访问。

## 示例

### 启用草稿模式

要启用草稿模式，创建一个新的[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)并调用 `enable()` 方法：

```tsx switcher
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.enable()
  return new Response('Draft mode is enabled')
}
```

```js switcher
import { draftMode } from 'next/headers'

export async function GET(request) {
  const draft = await draftMode()
  draft.enable()
  return new Response('Draft mode is enabled')
}
```

### 禁用草稿模式

默认情况下，草稿模式会话在浏览器关闭时结束。

要手动禁用草稿模式，在[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)中调用 `disable()` 方法：

```tsx switcher
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()
  return new Response('Draft mode is disabled')
}
```

```js switcher
import { draftMode } from 'next/headers'

export async function GET(request) {
  const draft = await draftMode()
  draft.disable()
  return new Response('Draft mode is disabled')
}
```

然后，发送请求以调用路由处理程序。如果使用 [`<Link>` 组件](/nextjs-cn/app/api-reference/components/link)调用路由，必须传递 `prefetch={false}` 以防止在预取时意外删除 cookie。

### 检查草稿模式是否启用

你可以在服务器组件中使用 `isEnabled` 属性检查草稿模式是否启用：

```tsx switcher
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
  return (
    <main>
      <h1>My Blog Post</h1>
      <p>Draft Mode is currently {isEnabled ? 'Enabled' : 'Disabled'}</p>
    </main>
  )
}
```

```jsx switcher
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
  return (
    <main>
      <h1>My Blog Post</h1>
      <p>Draft Mode is currently {isEnabled ? 'Enabled' : 'Disabled'}</p>
    </main>
  )
}
```

## 版本历史

| 版本       | 变更                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `v15.0.RC` | `draftMode` 现在是一个异步函数。提供了一个 [codemod](/nextjs-cn/app/guides/upgrading/codemods#150)。 |
| `v13.4.0`  | 引入 `draftMode`。                                                                                   |
