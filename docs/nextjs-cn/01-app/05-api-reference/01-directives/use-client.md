---
title: 'use client'
description: 了解如何使用 'use client' 指令在客户端渲染组件。
---

`'use client'` 指令声明了一个入口点，用于在**客户端**渲染组件，它应该用于创建需要客户端 JavaScript 功能（如状态管理、事件处理和浏览器 API 访问）的交互式用户界面 (UI)。这是一个 React 功能。

> **须知：**
>
> 你不需要在每个包含客户端组件的文件中添加 `'use client'` 指令。你只需要在希望直接在服务器组件内渲染的组件文件中添加它。`'use client'` 指令定义了客户端-服务器[边界](https://nextjs.org/docs/app/building-your-application/rendering#network-boundary)，从这类文件导出的组件作为客户端的入口点。

## 用法

要声明客户端组件的入口点，请在文件**顶部**、所有导入之前添加 `'use client'` 指令：

```tsx filename="app/components/counter.tsx" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

```jsx filename="app/components/counter.js" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

当使用 `'use client'` 指令时，客户端组件的属性必须是[可序列化的](https://react.dev/reference/rsc/use-client#serializable-types)。这意味着属性需要采用 React 可以在从服务器向客户端发送数据时序列化的格式。

```tsx filename="app/components/counter.tsx" highlight={4} switcher
'use client'

export default function Counter({ onClick /* ❌ 函数不可序列化 */ }) {
  return (
    <div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}
```

```jsx filename="app/components/counter.js" highlight={4} switcher
'use client'

export default function Counter({ onClick /* ❌ 函数不可序列化 */ }) {
  return (
    <div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}
```

## 在服务器组件内嵌套客户端组件

组合服务器和客户端组件可以让你构建既高性能又交互性强的应用程序：

1. **服务器组件**：用于静态内容、数据获取和对 SEO 友好的元素。
2. **客户端组件**：用于需要状态、副作用或浏览器 API 的交互式元素。
3. **组件组合**：根据需要在服务器组件内嵌套客户端组件，清晰分离服务器和客户端逻辑。

在以下示例中：

- `Header` 是处理静态内容的服务器组件。
- `Counter` 是在页面中启用交互功能的客户端组件。

```tsx filename="app/page.tsx" highlight={2,8} switcher
import Header from './header'
import Counter from './counter' // 这是一个客户端组件

export default function Page() {
  return (
    <div>
      <Header />
      <Counter />
    </div>
  )
}
```

```jsx filename="app/page.js" highlight={2,8} switcher
import Header from './header'
import Counter from './counter' // 这是一个客户端组件

export default function Page() {
  return (
    <div>
      <Header />
      <Counter />
    </div>
  )
}
```

## 参考

有关 `'use client'` 的更多信息，请参阅 [React 文档](https://react.dev/reference/rsc/use-client)。
