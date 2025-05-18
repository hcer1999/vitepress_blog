---
title: 如何懒加载客户端组件和库
nav_title: 懒加载
description: 懒加载导入的库和 React 组件以提高应用程序的加载性能。
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<PagesOnly>Content</PagesOnly>` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

Next.js 中的[懒加载](https://developer.mozilla.org/docs/Web/Performance/Lazy_loading)通过减少渲染路由所需的 JavaScript 数量来帮助提高应用程序的初始加载性能。

它允许你延迟加载**客户端组件**和导入的库，只在需要时将它们包含在客户端包中。例如，你可能想要延迟加载一个模态框，直到用户点击打开它。

在 Next.js 中有两种实现懒加载的方法：

1. 使用 `next/dynamic` 的[动态导入](#nextdynamic)
2. 使用 [`React.lazy()`](https://react.dev/reference/react/lazy) 和 [Suspense](https://react.dev/reference/react/Suspense)

默认情况下，服务器组件会自动进行[代码分割](https://developer.mozilla.org/docs/Glossary/Code_splitting)，你可以使用[流式传输](/docs/app/building-your-application/routing/loading-ui-and-streaming)从服务器到客户端逐步发送 UI 片段。懒加载适用于客户端组件。

## `next/dynamic`

`next/dynamic` 是 [`React.lazy()`](https://react.dev/reference/react/lazy) 和 [Suspense](https://react.dev/reference/react/Suspense) 的组合。它在 `app` 和 `pages` 目录中的行为相同，以允许增量迁移。

## 示例

<AppOnly>
### 导入客户端组件

```jsx filename="app/page.js"
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// 客户端组件:
const ComponentA = dynamic(() => import('../components/A'))
const ComponentB = dynamic(() => import('../components/B'))
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })

export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div>
      {/* 立即加载，但在单独的客户端包中 */}
      <ComponentA />

      {/* 按需加载，仅在条件满足时加载 */}
      {showMore && <ComponentB />}
      <button onClick={() => setShowMore(!showMore)}>切换</button>

      {/* 仅在客户端加载 */}
      <ComponentC />
    </div>
  )
}
```

> **注意：** 当服务器组件动态导入客户端组件时，目前**不**支持自动[代码分割](https://developer.mozilla.org/docs/Glossary/Code_splitting)。

### 跳过 SSR

当使用 `React.lazy()` 和 Suspense 时，客户端组件默认会被[预渲染](https://github.com/reactwg/server-components/discussions/4)（SSR）。

> **注意：** `ssr: false` 选项仅适用于客户端组件，将其移到客户端组件中以确保客户端代码分割正常工作。

如果你想为客户端组件禁用预渲染，可以使用 `ssr` 选项设置为 `false`：

```jsx
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })
```

### 导入服务器组件

如果你动态导入服务器组件，只有作为服务器组件子组件的客户端组件会被懒加载 - 而不是服务器组件本身。
当你在服务器组件中使用它时，它还将帮助预加载静态资源，如 CSS。

```jsx filename="app/page.js"
import dynamic from 'next/dynamic'

// 服务器组件:
const ServerComponent = dynamic(() => import('../components/ServerComponent'))

export default function ServerComponentExample() {
  return (
    <div>
      <ServerComponent />
    </div>
  )
}
```

> **注意：** 服务器组件不支持 `ssr: false` 选项。如果你尝试在服务器组件中使用它，将会看到错误。
> 不允许在服务器组件中使用带有 `next/dynamic` 的 `ssr: false`。请将其移到客户端组件中。

### 加载外部库

外部库可以使用 [`import()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/import) 函数按需加载。此示例使用外部库 `fuse.js` 进行模糊搜索。该模块仅在用户在搜索输入框中输入后在客户端加载。

```jsx filename="app/page.js"
'use client'

import { useState } from 'react'

const names = ['Tim', 'Joe', 'Bel', 'Lee']

export default function Page() {
  const [results, setResults] = useState()

  return (
    <div>
      <input
        type="text"
        placeholder="搜索"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // 动态加载 fuse.js
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)

          setResults(fuse.search(value))
        }}
      />
      <pre>结果: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
```

### 添加自定义加载组件

```jsx filename="app/page.js"
'use client'

import dynamic from 'next/dynamic'

const WithCustomLoading = dynamic(() => import('../components/WithCustomLoading'), {
  loading: () => <p>加载中...</p>,
})

export default function Page() {
  return (
    <div>
      {/* 当 <WithCustomLoading/> 加载时将渲染加载组件 */}
      <WithCustomLoading />
    </div>
  )
}
```

### 导入命名导出

要动态导入命名导出，你可以从 [`import()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/import) 函数返回的 Promise 中返回它：

```jsx filename="components/hello.js"
'use client'

export function Hello() {
  return <p>你好！</p>
}
```

```jsx filename="app/page.js"
import dynamic from 'next/dynamic'

const ClientComponent = dynamic(() => import('../components/hello').then((mod) => mod.Hello))
```

</AppOnly>

<PagesOnly>

通过使用 `next/dynamic`，header 组件将不会包含在页面的初始 JavaScript 包中。页面将首先渲染 Suspense `fallback`，然后在解析 `Suspense` 边界后渲染 `Header` 组件。

```jsx
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../components/header'), {
  loading: () => <p>加载中...</p>,
})

export default function Home() {
  return <DynamicHeader />
}
```

> **值得注意的是**：在 `import('path/to/component')` 中，路径必须明确写出。它不能是模板字符串或变量。此外，`import()` 必须在 `dynamic()` 调用内部，以便 Next.js 能够将 webpack 包/模块 ID 与特定的 `dynamic()` 调用匹配，并在渲染前预加载它们。`dynamic()` 不能在 React 渲染内部使用，因为它需要在模块的顶层被标记，以便预加载正常工作，类似于 `React.lazy`。

## 与命名导出一起使用

要动态导入命名导出，你可以从 [`import()`](https://github.com/tc39/proposal-dynamic-import#example) 返回的 [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) 中返回它：

```jsx filename="components/hello.js"
export function Hello() {
  return <p>你好！</p>
}

// pages/index.js
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/hello').then((mod) => mod.Hello))
```

## 不使用 SSR

要在客户端动态加载组件，你可以使用 `ssr` 选项来禁用服务器渲染。如果外部依赖或组件依赖于浏览器 API（如 `window`），这将非常有用。

```jsx
'use client'

import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../components/header'), {
  ssr: false,
})
```

## 与外部库一起使用

此示例使用外部库 `fuse.js` 进行模糊搜索。该模块仅在用户在搜索输入框中输入后在浏览器中加载。

```jsx
import { useState } from 'react'

const names = ['Tim', 'Joe', 'Bel', 'Lee']

export default function Page() {
  const [results, setResults] = useState()

  return (
    <div>
      <input
        type="text"
        placeholder="搜索"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // 动态加载 fuse.js
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)

          setResults(fuse.search(value))
        }}
      />
      <pre>结果: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
```

</PagesOnly>
