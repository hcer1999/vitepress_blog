---
title: useLinkStatus
description: useLinkStatus 钩子的 API 参考。
related:
  title: 后续步骤
  description: 通过阅读 API 参考来了解本页面中提到的功能。
  links:
    - app/api-reference/components/link
    - app/api-reference/file-conventions/loading
---

`useLinkStatus` 钩子让你能够跟踪 `<Link>` 的**挂起**状态。你可以使用它在导航到新路由完成时向用户显示内联视觉反馈（如加载旋转器或文本闪烁）。

`useLinkStatus` 在以下情况下非常有用：

- [预获取](/docs/nextjs-cn/app/building-your-application/routing/index/linking-and-navigating#prefetching)被禁用或正在进行中，意味着导航被阻止。
- 目标路由是动态的**并且**没有包含 [`loading.js`](/docs/nextjs-cn/app/api-reference/file-conventions/loading) 文件（该文件可以允许即时导航）。

```tsx switcher
'use client'

import { useLinkStatus } from 'next/link'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? <div role="status" aria-label="Loading" className="spinner" /> : null
}
```

```jsx switcher
'use client'

import { useLinkStatus } from 'next/link'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? <div role="status" aria-label="Loading" className="spinner" /> : null
}
```

```tsx switcher
import Link from 'next/link'
import LoadingIndicator from './loading-indicator'

export default function Header() {
  return (
    <header>
      <Link href="/dashboard" prefetch={false}>
        Dashboard <LoadingIndicator />
      </Link>
    </header>
  )
}
```

```jsx switcher
import Link from 'next/link'
import LoadingIndicator from './loading-indicator'

export default function Header() {
  return (
    <header>
      <Link href="/dashboard" prefetch={false}>
        Dashboard <LoadingIndicator />
      </Link>
    </header>
  )
}
```

> **须知**:
>
> - `useLinkStatus` 必须在 `Link` 组件的后代组件中使用
> - 当在 `Link` 组件上设置 `prefetch={false}` 时，该钩子最为有用
> - 如果链接的路由已被预获取，挂起状态将被跳过
> - 当快速连续点击多个链接时，只显示最后一个链接的挂起状态
> - 此钩子在 Pages 路由中不受支持，并且将始终返回 `{ pending: false }`

## 参数

```tsx
const { pending } = useLinkStatus()
```

`useLinkStatus` 不接受任何参数。

## 返回值

`useLinkStatus` 返回一个具有单个属性的对象：

| 属性    | 类型    | 描述                                      |
| ------- | ------- | ----------------------------------------- |
| pending | boolean | 历史记录更新前为 `true`，更新后为 `false` |

## 示例

### 内联加载指示器

在用户在预获取完成前点击链接时，添加视觉反馈表明导航正在进行是很有帮助的。

```tsx switcher
'use client'

import { useLinkStatus } from 'next/link'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? <div role="status" aria-label="Loading" className="spinner" /> : null
}
```

```jsx switcher
'use client'

import { useLinkStatus } from 'next/link'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? <div role="status" aria-label="Loading" className="spinner" /> : null
}
```

```tsx switcher
import Link from 'next/link'
import LoadingIndicator from './components/loading-indicator'

const links = [
  { href: '/shop/electronics', label: 'Electronics' },
  { href: '/shop/clothing', label: 'Clothing' },
  { href: '/shop/books', label: 'Books' },
]

function Menubar() {
  return (
    <div>
      {links.map((link) => (
        <Link key={link.label} href={link.href}>
          {link.label} <LoadingIndicator />
        </Link>
      ))}
    </div>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Menubar />
      {children}
    </div>
  )
}
```

```jsx switcher
import Link from 'next/link'
import LoadingIndicator from './components/loading-indicator'

const links = [
  { href: '/shop/electronics', label: 'Electronics' },
  { href: '/shop/clothing', label: 'Clothing' },
  { href: '/shop/books', label: 'Books' },
]

function Menubar() {
  return (
    <div>
      {links.map((link) => (
        <Link key={link.label} href={link.href}>
          {link.label} <LoadingIndicator />
        </Link>
      ))}
    </div>
  )
}

export default function Layout({ children }) {
  return (
    <div>
      <Menubar />
      {children}
    </div>
  )
}
```

## 优雅处理快速导航

如果导航到新路由很快，用户可能会看到不必要的加载指示器闪烁。改善用户体验的一种方法是添加初始动画延迟（例如 100ms）并从不可见状态开始动画（例如 `opacity: 0`），这样只有当导航需要时间完成时才显示加载指示器。

```css
.spinner {
  /* ... */
  opacity: 0;
  animation:
    fadeIn 500ms 100ms forwards,
    rotate 1s linear infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
```

| 版本      | 变更                   |
| --------- | ---------------------- |
| `v15.3.0` | 引入 `useLinkStatus`。 |
