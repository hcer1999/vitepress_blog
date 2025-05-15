---
title: Next.js 中文文档 - 客户端组件
description: 学习如何在Next.js中使用客户端组件添加交互功能
---

# Next.js 中文文档 - 客户端组件

客户端组件使您能够向应用程序添加客户端交互功能。在Next.js的App Router中，您可以在需要时使用客户端组件，同时保持大部分应用程序作为服务器组件。

## 客户端组件简介

客户端组件是在客户端（浏览器）中渲染的React组件，它们允许：

- 添加交互性和事件监听器（如`onClick`、`onChange`等）
- 使用React的状态钩子和生命周期效果（如`useState`、`useEffect`等）
- 使用仅在浏览器可用的API
- 使用依赖于浏览器功能的自定义钩子和类组件

在Next.js中，客户端组件首先在服务器上预渲染，然后在客户端上"激活"（水合）。这确保了更快的初始页面加载和更好的SEO。

## 使用"use client"指令

要将组件标记为客户端组件，您需要在文件顶部添加`'use client'`指令，位于任何导入之前：

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  )
}
```

`'use client'`指令告诉Next.js从该指令所在文件开始的"边界"下方的所有代码都应该作为客户端代码处理。

## 客户端组件的特性

### 使用状态和事件处理

客户端组件可以使用React的状态管理功能，如`useState`和`useReducer`：

```tsx
'use client'

import { useState } from 'react'

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 处理表单提交
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="姓名"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="邮箱"
      />
      <button type="submit">提交</button>
    </form>
  )
}
```

### 使用浏览器API

客户端组件可以访问浏览器API，如`window`、`document`、`localStorage`等：

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function WindowSize() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // 初始化尺寸
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // 监听窗口尺寸变化
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // 清理事件监听器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <p>窗口宽度: {dimensions.width}px</p>
      <p>窗口高度: {dimensions.height}px</p>
    </div>
  )
}
```

### 使用客户端钩子

客户端组件可以使用依赖于浏览器环境的自定义钩子：

```tsx
'use client'

import { useState, useEffect } from 'react'

// 自定义钩子需要在客户端组件中使用
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default function PreferencesForm() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <div>
      <h2>用户偏好</h2>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">亮色主题</option>
        <option value="dark">暗色主题</option>
      </select>
    </div>
  )
}
```

## 何时使用客户端组件

您应该在以下情况下使用客户端组件：

1. **需要添加交互性**：表单、按钮、滑块等需要响应用户输入的UI元素
2. **需要使用浏览器API**：需要访问`window`、`document`或其他浏览器对象
3. **需要使用React的状态和生命周期**：使用`useState`、`useReducer`、`useEffect`等
4. **使用依赖客户端功能的第三方库**：如依赖DOM的UI库或需要浏览器API的插件

## 服务器组件和客户端组件的组合模式

### 将客户端组件嵌套在服务器组件中

您可以在服务器组件中导入和使用客户端组件：

```tsx
// app/page.tsx - 服务器组件
import ClientComponent from './client-component'

// 在服务器上获取数据
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()

  return (
    <main>
      <h1>我的应用</h1>
      {/* 将数据作为props传递给客户端组件 */}
      <ClientComponent data={data} />
    </main>
  )
}
```

```tsx
// app/client-component.tsx
'use client'

import { useState } from 'react'

export default function ClientComponent({ data }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? '隐藏' : '显示'}详情</button>

      {isVisible && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  )
}
```

### 不能在客户端组件中导入服务器组件

客户端组件不能直接导入服务器组件，因为服务器组件可能依赖于服务器端资源，不能在客户端运行。

```tsx
'use client'

// ❌ 这将导致错误:
// "无法在客户端组件中导入服务器组件"
import ServerComponent from './server-component'

export default function ClientComponent() {
  return (
    <div>
      <ServerComponent />
    </div>
  )
}
```

### 将服务器组件作为props传递给客户端组件

要在客户端组件中使用服务器组件，您可以通过"组件槽"模式将服务器组件作为props或子组件传递给客户端组件：

```tsx
// app/page.tsx - 服务器组件
import ClientComponent from './client-component'
import ServerComponent from './server-component'

export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

```tsx
// app/client-component.tsx
'use client'

export default function ClientComponent({
  children, // 接收服务器组件作为children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>客户端组件</h1>
      {children}
    </div>
  )
}
```

### 使用客户端组件库

当使用依赖于客户端功能的第三方UI组件库时，可以创建一个客户端包装组件：

```tsx
// app/ui/dialog.tsx
'use client'

import { useState } from 'react'
import { Dialog } from 'ui-library'

export function DialogWrapper({ children, title }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>打开对话框</button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {children}
      </Dialog>
    </>
  )
}
```

然后在服务器组件中使用这个包装器：

```tsx
// app/page.tsx
import { DialogWrapper } from './ui/dialog'
import ServerContent from './server-content'

export default function Page() {
  return (
    <div>
      <h1>我的页面</h1>

      <DialogWrapper title="重要信息">
        {/* ServerContent 会在服务器上渲染，然后传递给客户端组件 */}
        <ServerContent />
      </DialogWrapper>
    </div>
  )
}
```

## 客户端组件的优化

### 将客户端组件移动到叶子节点

为了减少客户端JavaScript包的大小，将客户端组件移至组件树的"叶子"节点，避免将整个组件树标记为客户端组件：

```tsx
// app/page.tsx (服务器组件)
import StaticContent from './static-content'
import InteractiveButton from './interactive-button' // 客户端组件

// ✅ 好的做法：只有需要交互的部分是客户端组件
export default function Page() {
  return (
    <div>
      <h1>我的应用</h1>
      <StaticContent /> {/* 保持为服务器组件 */}
      <InteractiveButton /> {/* 只有这部分发送到客户端 */}
    </div>
  )
}
```

而不是：

```tsx
// app/page.tsx
'use client'

// ❌ 糟糕的做法：整个页面都变成了客户端组件
import StaticContent from './static-content'

export default function Page() {
  return (
    <div>
      <h1>我的应用</h1>
      <StaticContent />
      <button onClick={() => console.log('clicked')}>点击我</button>
    </div>
  )
}
```

### 共享组件的服务器和客户端版本

对于有服务器和客户端需求的复杂组件，可以创建相应的两个版本：

```tsx
// components/button.tsx - 服务器组件版本
export function Button({ children }) {
  return <button className="btn">{children}</button>
}

// components/button-client.tsx - 客户端组件版本
;('use client')

import { useState } from 'react'
import { Button } from './button'

export function ClientButton({ children, onClick }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await onClick()
    setIsLoading(false)
  }

  return <Button onClick={handleClick}>{isLoading ? '加载中...' : children}</Button>
}
```

## 客户端渲染的工作原理

在Next.js中，当使用App Router时，客户端组件会经历以下渲染过程：

1. **在服务器上生成初始HTML** - 所有组件（包括客户端组件）首先在服务器上渲染以生成初始HTML
2. **发送HTML和客户端组件的JavaScript** - 客户端组件的JavaScript代码与HTML一起发送到浏览器
3. **水合（激活）** - 在浏览器中，React会"水合"这些组件，附加事件处理程序并使其可交互
4. **后续渲染** - 后续的更新（如状态变化）将完全在客户端处理

这种方法结合了服务器端渲染（更快的初始加载和更好的SEO）和客户端交互性的优势。

## 最佳实践

1. **按需使用客户端组件** - 默认使用服务器组件，只在需要客户端功能时使用客户端组件
2. **将状态保持在必要的范围内** - 避免在组件树的高层次使用客户端状态
3. **在服务器上获取数据** - 即使您需要在客户端渲染数据，也应该尽可能在服务器上获取数据
4. **将'use client'放在正确的边界处** - 把它放在真正需要客户端功能的组件上，而不是在组件树的根部
5. **创建有针对性的客户端组件** - 设计专注于特定交互的小型客户端组件

## 客户端组件的常见问题

### 数据获取

虽然可以在客户端组件中获取数据，但通常更好的做法是在服务器组件中获取数据，然后将结果作为props传递给客户端组件：

```tsx
// app/page.tsx (服务器组件)
import ClientUI from './client-ui'

// 在服务器上获取数据
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()

  // 将服务器获取的数据传递给客户端组件
  return <ClientUI data={data} />
}
```

在客户端需要刷新或重新获取数据时，考虑使用SWR或React Query等工具：

```tsx
'use client'

import useSWR from 'swr'

export default function ClientDataFetching() {
  const { data, error, isLoading } = useSWR('/api/data', (url) =>
    fetch(url).then((res) => res.json()),
  )

  if (error) return <div>获取数据失败</div>
  if (isLoading) return <div>加载中...</div>

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  )
}
```

### 第三方库集成

如果您正在使用需要客户端功能的第三方库，请将它们包装在客户端组件中：

```tsx
// components/map.tsx
'use client'

import { useEffect, useRef } from 'react'
import { Map as MapLibrary } from 'map-library'

export default function Map({ center, zoom }) {
  const mapRef = useRef(null)

  useEffect(() => {
    const map = new MapLibrary(mapRef.current, {
      center,
      zoom,
    })

    return () => map.destroy()
  }, [center, zoom])

  return <div ref={mapRef} style={{ height: '500px' }} />
}
```

## 下一步

了解如何有效地组合服务器组件和客户端组件：

- [服务器组件](/nextjs/app-router/building-your-application/rendering/server-components) - 学习服务器组件的详细信息
- [组合模式](/nextjs/app-router/building-your-application/rendering/composition-patterns) - 深入了解服务器和客户端组件的组合策略
- ['use client'指令](/nextjs/app-router/api-reference/directives/use-client) - 了解'use client'指令的详细API
