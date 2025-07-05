---
title: useSearchParams
description: useSearchParams 钩子的 API 参考。
---

# NextJS中文文档 - Use Search Params

`useSearchParams` 是一个**客户端组件**钩子，允许你读取当前 URL 的**查询字符串**。

`useSearchParams` 返回 [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) 接口的**只读**版本。

```tsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>搜索: {search}</>
}
```

```jsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>搜索: {search}</>
}
```

## 参数

```tsx
const searchParams = useSearchParams()
```

`useSearchParams` 不接受任何参数。

## 返回值

`useSearchParams` 返回 [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) 接口的**只读**版本，其中包括用于读取 URL 查询字符串的实用方法：

- [`URLSearchParams.get()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get)：返回与搜索参数关联的第一个值。例如：

  | URL                  | `searchParams.get("a")`                                                                                   |
  | -------------------- | --------------------------------------------------------------------------------------------------------- |
  | `/dashboard?a=1`     | `'1'`                                                                                                     |
  | `/dashboard?a=`      | `''`                                                                                                      |
  | `/dashboard?b=3`     | `null`                                                                                                    |
  | `/dashboard?a=1&a=2` | `'1'` _- 使用 [`getAll()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll) 获取所有值_ |

- [`URLSearchParams.has()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/has)：返回一个布尔值，表示给定参数是否存在。例如：

  | URL              | `searchParams.has("a")` |
  | ---------------- | ----------------------- |
  | `/dashboard?a=1` | `true`                  |
  | `/dashboard?b=3` | `false`                 |

- 了解更多关于 [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) 的其他**只读**方法，包括 [`getAll()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll)、[`keys()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/keys)、[`values()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/values)、[`entries()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/entries)、[`forEach()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/forEach) 和 [`toString()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/toString)。

> **须知**：
>
> - `useSearchParams` 是一个[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)钩子，在[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)中**不支持**，以防止在[部分渲染](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#partial-rendering)期间出现过时的值。
> - 如果应用程序包含 `/pages` 目录，`useSearchParams` 将返回 `ReadonlyURLSearchParams | null`。对于不使用 `getServerSideProps` 的页面，在预渲染期间无法知道搜索参数，因此 `null` 值用于在迁移期间兼容。

## 行为

### 静态渲染

如果路由是[静态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)的，调用 `useSearchParams` 将导致客户端组件树直到最近的 [`Suspense` 边界](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming#example)进行客户端渲染。

这允许路由的一部分静态渲染，而使用 `useSearchParams` 的动态部分在客户端渲染。

我们建议将使用 `useSearchParams` 的客户端组件包装在 `<Suspense/>` 边界中。这将允许其上方的任何客户端组件静态渲染并作为初始 HTML 的一部分发送。[示例](/nextjs-cn/app/api-reference/functions/use-search-params#static-rendering)。

例如：

```tsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // 使用静态渲染时，这不会在服务器上记录
  console.log(search)

  return <>搜索: {search}</>
}
```

```jsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // 使用静态渲染时，这不会在服务器上记录
  console.log(search)

  return <>搜索: {search}</>
}
```

```tsx switcher
import { Suspense } from 'react'
import SearchBar from './search-bar'

// 这个作为 Suspense 边界的 fallback 传递的组件
// 将在初始 HTML 中替代搜索栏进行渲染。
// 当在 React 水合作用期间值可用时，fallback
// 将被 `<SearchBar>` 组件替换。
function SearchBarFallback() {
  return <>占位符</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>仪表盘</h1>
    </>
  )
}
```

```jsx switcher
import { Suspense } from 'react'
import SearchBar from './search-bar'

// 这个作为 Suspense 边界的 fallback 传递的组件
// 将在初始 HTML 中替代搜索栏进行渲染。
// 当在 React 水合作用期间值可用时，fallback
// 将被 `<SearchBar>` 组件替换。
function SearchBarFallback() {
  return <>占位符</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>仪表盘</h1>
    </>
  )
}
```

### 动态渲染

如果路由是[动态渲染](/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)的，在客户端组件的初始服务器渲染期间，`useSearchParams` 将在服务器上可用。

例如：

```tsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // 这将在初始渲染期间在服务器上记录
  // 并在后续导航时在客户端上记录。
  console.log(search)

  return <>搜索: {search}</>
}
```

```jsx switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // 这将在初始渲染期间在服务器上记录
  // 并在后续导航时在客户端上记录。
  console.log(search)

  return <>搜索: {search}</>
}
```

```tsx switcher
import SearchBar from './search-bar'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>仪表盘</h1>
    </>
  )
}
```

```jsx switcher
import SearchBar from './search-bar'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>仪表盘</h1>
    </>
  )
}
```

> **须知**：设置 [`dynamic` 路由段配置选项](/nextjs-cn/app/api-reference/file-conventions/route-segment-config#dynamic) 为 `force-dynamic` 可用于强制动态渲染。

### 服务器组件

#### 页面

要在[页面](/nextjs-cn/app/api-reference/file-conventions/page)（服务器组件）中访问搜索参数，请使用 [`searchParams`](/nextjs-cn/app/api-reference/file-conventions/page#searchparams-optional) 属性。

#### 布局

与页面不同，[布局](/nextjs-cn/app/api-reference/file-conventions/layout)（服务器组件）**不**接收 `searchParams` 属性。这是因为共享布局在[导航期间不会重新渲染](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#partial-rendering)，这可能导致导航之间的 `searchParams` 过时。查看[详细解释](/nextjs-cn/app/api-reference/file-conventions/layout#layouts-do-not-receive-searchparams)。

相反，使用页面 [`searchParams`](/nextjs-cn/app/api-reference/file-conventions/page) 属性或客户端组件中的 [`useSearchParams`](/nextjs-cn/app/api-reference/functions/use-search-params) 钩子，它会在客户端上使用最新的 `searchParams` 重新渲染。

## 示例

### 更新 `searchParams`

你可以使用 [`useRouter`](/nextjs-cn/app/api-reference/functions/use-router) 或 [`Link`](/nextjs-cn/app/api-reference/components/link) 来设置新的 `searchParams`。执行导航后，当前的 [`page.js`](/nextjs-cn/app/api-reference/file-conventions/page) 将接收更新后的 [`searchParams` 属性](/nextjs-cn/app/api-reference/file-conventions/page#searchparams-optional)。

```tsx switcher
'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 通过合并当前 searchParams 与提供的键/值对
  // 获取新的 searchParams 字符串
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <>
      <p>排序方式</p>

      {/* 使用 useRouter */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        升序
      </button>

      {/* 使用 <Link> */}
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        降序
      </Link>
    </>
  )
}
```

```jsx switcher
'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 通过合并当前 searchParams 与提供的键/值对
  // 获取新的 searchParams 字符串
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <>
      <p>排序方式</p>

      {/* 使用 useRouter */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        升序
      </button>

      {/* 使用 <Link> */}
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        降序
      </Link>
    </>
  )
}
```

## 版本历史

| 版本      | 变更                     |
| --------- | ------------------------ |
| `v13.0.0` | 引入 `useSearchParams`。 |
