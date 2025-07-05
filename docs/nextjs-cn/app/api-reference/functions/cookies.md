---
title: cookies
description: cookies 函数的 API 参考。
---

# NextJS中文文档 - Cookies

`cookies` 是一个**异步**函数，允许你在[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)中读取 HTTP 传入请求的 cookie，并在[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)或[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)中读取/写入传出请求的 cookie。

```tsx switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```js switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

## 参考

### 方法

可以使用以下方法：

| 方法                        | 返回类型 | 描述                                                     |
| --------------------------- | -------- | -------------------------------------------------------- |
| `get('name')`               | 对象     | 接受一个 cookie 名称并返回一个包含名称和值的对象。       |
| `getAll()`                  | 对象数组 | 返回所有匹配名称的 cookie 列表。                         |
| `has('name')`               | 布尔值   | 接受一个 cookie 名称，并根据 cookie 是否存在返回布尔值。 |
| `set(name, value, options)` | -        | 接受 cookie 名称、值和选项，并设置传出请求的 cookie。    |
| `delete(name)`              | -        | 接受一个 cookie 名称并删除该 cookie。                    |
| `clear()`                   | -        | 删除所有 cookie。                                        |
| `toString()`                | 字符串   | 返回 cookie 的字符串表示。                               |

### 选项

设置 cookie 时，支持 `options` 对象中的以下属性：

| 选项              | 类型                                    | 描述                                                         |
| ----------------- | --------------------------------------- | ------------------------------------------------------------ |
| `name`            | 字符串                                  | 指定 cookie 的名称。                                         |
| `value`           | 字符串                                  | 指定要存储在 cookie 中的值。                                 |
| `expires`         | 日期                                    | 定义 cookie 将过期的确切日期。                               |
| `maxAge`          | 数字                                    | 设置 cookie 的生命周期（以秒为单位）。                       |
| `domain`          | 字符串                                  | 指定 cookie 可用的域。                                       |
| `path`            | 字符串，默认值：`'/'`                   | 将 cookie 的范围限制在域内的特定路径。                       |
| `secure`          | 布尔值                                  | 确保 cookie 仅通过 HTTPS 连接发送，以提高安全性。            |
| `httpOnly`        | 布尔值                                  | 将 cookie 限制为 HTTP 请求，防止客户端访问。                 |
| `sameSite`        | 布尔值，`'lax'`，`'strict'`，`'none'`   | 控制 cookie 的跨站请求行为。                                 |
| `priority`        | 字符串（`"low"`，`"medium"`，`"high"`） | 指定 cookie 的优先级。                                       |
| `encode('value')` | 函数                                    | 指定一个用于编码 cookie 值的函数。                           |
| `partitioned`     | 布尔值                                  | 指示 cookie 是否[分区](https://github.com/privacycg/CHIPS)。 |

唯一具有默认值的选项是 `path`。

要了解更多关于这些选项的信息，请参阅 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)。

## 须知

- `cookies` 是一个**异步**函数，它返回一个 promise。你必须使用 `async/await` 或 React 的 [`use`](https://react.dev/reference/react/use) 函数来访问 cookie。
  - 在版本 14 及更早版本中，`cookies` 是一个同步函数。为了帮助向后兼容，你仍然可以在 Next.js 15 中同步访问它，但这种行为将在未来被弃用。
- `cookies` 是一个[动态 API](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-apis)，其返回值无法提前知道。在布局或页面中使用它将使路由采用[动态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)。
- `.delete` 方法只能在以下情况下调用：
  - 在[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)或[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)中。
  - 如果它属于调用 `.set` 的同一域。对于通配符域，特定子域必须完全匹配。此外，代码必须在与要删除的 cookie 相同的协议（HTTP 或 HTTPS）上执行。
- HTTP 不允许在流式传输开始后设置 cookie，因此你必须在[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)或[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)中使用 `.set`。

## 理解服务器组件中的 Cookie 行为

在使用服务器组件中的 cookie 时，重要的是要理解 cookie 本质上是一种客户端存储机制：

- **读取 cookie** 在服务器组件中有效，因为你正在访问客户端浏览器在 HTTP 请求头中发送到服务器的 cookie 数据。
- **设置 cookie** 不能直接在服务器组件中完成，即使使用路由处理程序或服务器操作也是如此。这是因为 cookie 实际上是由浏览器存储的，而不是服务器。

服务器只能发送指令（通过 `Set-Cookie` 头）告诉浏览器存储 cookie - 实际存储发生在客户端。这就是为什么修改状态的 cookie 操作（`.set`、`.delete`、`.clear`）必须在路由处理程序或服务器操作中执行，在那里可以正确设置响应头。

## 示例

### 获取一个 cookie

你可以使用 `(await cookies()).get('name')` 方法获取单个 cookie：

```tsx switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```jsx switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

### 获取所有 cookie

你可以使用 `(await cookies()).getAll()` 方法获取所有具有匹配名称的 cookie。如果未指定 `name`，它将返回所有可用的 cookie。

```tsx switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>名称: {cookie.name}</p>
      <p>值: {cookie.value}</p>
    </div>
  ))
}
```

```jsx switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>名称: {cookie.name}</p>
      <p>值: {cookie.value}</p>
    </div>
  ))
}
```

### 设置一个 cookie

你可以在[服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations)或[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)中使用 `(await cookies()).set(name, value, options)` 方法设置 cookie。[`options` 对象](#选项)是可选的。

```tsx switcher
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // 或
  cookieStore.set('name', 'lee', { secure: true })
  // 或
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/',
  })
}
```

```js switcher
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // 或
  cookieStore.set('name', 'lee', { secure: true })
  // 或
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/',
  })
}
```

### 检查 cookie 是否存在

你可以使用 `(await cookies()).has(name)` 方法检查 cookie 是否存在：

```tsx switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

```jsx switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

### 删除 cookie

有三种方法可以删除 cookie。

使用 `delete()` 方法：

```tsx switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).delete('name')
}
```

```js switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).delete('name')
}
```

设置一个同名的空值新 cookie：

```tsx switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', '')
}
```

```js switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', '')
}
```

将 `maxAge` 设置为 0 将立即使 cookie 过期。`maxAge` 接受以秒为单位的值。

```tsx switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', 'value', { maxAge: 0 })
}
```

```js switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', 'value', { maxAge: 0 })
}
```

## 版本历史

| 版本       | 变更                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `v15.0.RC` | `cookies` 现在是一个异步函数。提供了一个[代码修改器](/nextjs-cn/app/guides/upgrading/codemods#150)。 |
| `v13.0.0`  | 引入 `cookies`。                                                                                     |
