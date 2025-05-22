---
title: headers
description: headers 函数的 API 参考。
---

`headers` 是一个**异步**函数，允许你从[服务器组件](/docs/app/building-your-application/rendering/server-components)中**读取** HTTP 传入请求头。

```tsx filename="app/page.tsx" switcher
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
}
```

```jsx filename="app/page.js" switcher
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
}
```

## 参考

### 参数

`headers` 不接受任何参数。

### 返回值

`headers` 返回一个**只读**的 [Web Headers](https://developer.mozilla.org/docs/Web/API/Headers) 对象。

- [`Headers.entries()`](https://developer.mozilla.org/docs/Web/API/Headers/entries)：返回一个[`迭代器`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols)，允许遍历此对象中包含的所有键/值对。
- [`Headers.forEach()`](https://developer.mozilla.org/docs/Web/API/Headers/forEach)：对此 `Headers` 对象中的每个键/值对执行提供的函数一次。
- [`Headers.get()`](https://developer.mozilla.org/docs/Web/API/Headers/get)：返回给定名称的 `Headers` 对象中某个标头的所有值的[`字符串`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)序列。
- [`Headers.has()`](https://developer.mozilla.org/docs/Web/API/Headers/has)：返回一个布尔值，说明 `Headers` 对象是否包含某个标头。
- [`Headers.keys()`](https://developer.mozilla.org/docs/Web/API/Headers/keys)：返回一个[`迭代器`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols)，允许你遍历此对象中包含的所有键/值对的键。
- [`Headers.values()`](https://developer.mozilla.org/docs/Web/API/Headers/values)：返回一个[`迭代器`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols)，允许你遍历此对象中包含的所有键/值对的值。

## 须知

- `headers` 是一个**异步**函数，返回一个 promise。你必须使用 `async/await` 或 React 的 [`use`](https://react.dev/reference/react/use) 函数。
  - 在版本 14 及更早版本中，`headers` 是一个同步函数。为了向后兼容，你在 Next.js 15 中仍然可以同步访问它，但这种行为将在未来被废弃。
- 由于 `headers` 是只读的，你不能 `set` 或 `delete` 传出请求头。
- `headers` 是一个[动态 API](/docs/app/building-your-application/rendering/server-components#server-rendering-strategies#dynamic-apis)，其返回值不能提前知道。在路由中使用它将使该路由选择**[动态渲染](/docs/app/building-your-application/rendering/server-components#dynamic-rendering)**。

## 示例

### 使用 Authorization 标头

```jsx filename="app/page.js"
import { headers } from 'next/headers'

export default async function Page() {
  const authorization = (await headers()).get('authorization')
  const res = await fetch('...', {
    headers: { authorization }, // 转发 authorization 标头
  })
  const user = await res.json()

  return <h1>{user.name}</h1>
}
```

## 版本历史

| 版本         | 变更                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `headers` 现在是一个异步函数。提供了一个 [codemod](/docs/app/guides/upgrading/codemods#150)。 |
| `v13.0.0`    | 引入 `headers`。                                                                              |
