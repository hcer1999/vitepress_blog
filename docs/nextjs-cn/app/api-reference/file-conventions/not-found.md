---
title: not-found.js
description: not-found.js 特殊文件的 API 参考。
---

# NextJS中文文档 - Not Found

**not-found** 文件用于在路由中找不到内容或使用 `notFound` 函数时渲染 UI。该文件应该导出一个返回 React JSX 的默认 React 组件。

```tsx switcher
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>找不到页面</h2>
      <p>无法找到请求的资源</p>
      <Link href="/">返回主页</Link>
    </div>
  )
}
```

```jsx switcher
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>找不到页面</h2>
      <p>无法找到请求的资源</p>
      <Link href="/">返回主页</Link>
    </div>
  )
}
```

> **须知**：`not-found.js` 不接受任何参数，返回的 UI 组件不会携带任何属性。

## 参考

### `notFound` 函数

除了创建专门的 `not-found` 文件外，你还可以使用 `notFound` 函数触发 `not-found` 文件。调用 `notFound()` 会抛出一个错误，并终止路由段的渲染。然后，将显示最近的 `not-found.js` 文件。

<AppOnly>

```tsx switcher
import { notFound } from 'next/navigation'

export default async function Team({ params }: { params: { team: string } }) {
  const team = await fetchTeam(params.team)

  if (!team) {
    notFound()
  }

  return <TeamInfoPage team={team} />
}
```

```jsx switcher
import { notFound } from 'next/navigation'

export default async function Team({ params }) {
  const team = await fetchTeam(params.team)

  if (!team) {
    notFound()
  }

  return <TeamInfoPage team={team} />
}
```

</AppOnly>

## 示例

### 文件结构

当渲染 `not-found.js` 文件时，它将完全替换该路由段下的所有内容。例如，在 `app/dashboard` 中，如果使用 `notFound()`，那么 `not-found.js` 文件将替代 `layout.js` 和 `page.js`。

然而，任何父段 `layout.js` 文件在 `app` 路径内都会继续渲染。这样就可以在 `not-found.js` 文件中保留其他导航和 UI 元素。

```jsx
export default function TeamNotFound() {
  return <h1>未找到团队</h1>
}
```

```jsx
export default function TeamLayout({ children }) {
  return (
    <div>
      <h1>仪表板布局</h1>
      {children}
    </div>
  )
}
```

```jsx
import { notFound } from 'next/navigation'

export default function TeamPage({ params }) {
  if (params.team === 'team-not-found') {
    notFound()
  }

  return <h1>仪表板页面</h1>
}
```

## 版本历史

| 版本      | 变更               |
| --------- | ------------------ |
| `v13.0.0` | 引入 `not-found`。 |
