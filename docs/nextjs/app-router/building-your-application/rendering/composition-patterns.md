---
title: Next.js 中文文档 - 组合模式
description: 学习如何在Next.js应用中有效组合服务器组件和客户端组件的推荐模式
---

# Next.js 中文文档 - 组合模式

在Next.js的App Router中，服务器组件和客户端组件可以在同一个组件树中一起工作。了解如何有效地组合这些组件类型是构建高性能React应用程序的关键。

## 理解组合模式

组合模式提供了在同一个应用中混合使用服务器组件和客户端组件的策略。通过有效地组合这些组件类型，您可以：

- 最大化服务器渲染的好处（更快的初始加载和更好的SEO）
- 最小化发送到客户端的JavaScript量
- 在需要交互的地方添加客户端功能

## 将客户端组件嵌套在服务器组件中

服务器组件可以导入和渲染客户端组件。这是最常见的组合模式：

```tsx
// app/page.tsx - 服务器组件
import ClientComponent from './client-component'

export default function Page() {
  return (
    <div>
      <h1>服务器组件页面</h1>
      <ClientComponent />
    </div>
  )
}
```

```tsx
// app/client-component.tsx
'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

在这种模式中：

1. `Page` 是一个服务器组件，它在服务器上渲染
2. `Page` 导入并渲染 `ClientComponent`
3. `ClientComponent` 被标记为客户端组件，并在客户端上水合（激活）

这种方法使您可以在服务器上渲染尽可能多的内容，同时只在需要的地方添加客户端交互性。

### 从服务器到客户端的数据流

服务器组件可以将数据作为props传递给客户端组件：

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
    <div>
      <h1>服务器组件页面</h1>
      {/* 将服务器数据传递给客户端组件 */}
      <ClientComponent data={data} />
    </div>
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

这种模式使您可以利用服务器的数据获取能力，然后在客户端上使用这些数据进行交互渲染。

## 不能将服务器组件导入到客户端组件

客户端组件**不能**直接导入服务器组件：

```tsx
'use client'

// ❌ 这将导致错误
import ServerComponent from './server-component'

export default function ClientComponent() {
  return (
    <div>
      <ServerComponent />
    </div>
  )
}
```

这是因为客户端组件完全在客户端上运行，而服务器组件可能需要访问服务器端资源（如数据库或文件系统）。

### 将服务器组件作为props传递给客户端组件

虽然不能直接导入服务器组件，但可以将服务器组件作为props（特别是`children`）传递给客户端组件：

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
  children, // 包含服务器组件的内容
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* 
        服务器组件被视为已渲染内容，
        而不是由客户端组件渲染
      */}
      {children}
    </div>
  )
}
```

在这种模式中：

1. `ServerComponent` 在服务器上渲染
2. 渲染结果作为 `children` prop 传递给 `ClientComponent`
3. `ClientComponent` 可以布局/包装服务器渲染的内容

这被称为"组件槽"模式，允许客户端组件包含服务器渲染的内容。

## 创建组件边界

### "提升" 状态模式

当您需要在服务器组件中共享客户端状态时，可以使用"状态提升"模式：

```tsx
// app/page.tsx - 服务器组件
import { TabContainer } from './tab-container'
import { Tab } from './tab'

export default function Page() {
  return (
    <TabContainer>
      <Tab label="第一个">
        <ServerComponentOne />
      </Tab>
      <Tab label="第二个">
        <ServerComponentTwo />
      </Tab>
      <Tab label="第三个">
        <ServerComponentThree />
      </Tab>
    </TabContainer>
  )
}
```

```tsx
// app/tab-container.tsx
'use client'

import { useState } from 'react'
import { TabContext } from './tab-context'

export function TabContainer({ children }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  )
}
```

```tsx
// app/tab.tsx
'use client'

import { useContext } from 'react'
import { TabContext } from './tab-context'

export function Tab({ label, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext)
  const isActive = activeTab === index

  return (
    <>
      <button onClick={() => setActiveTab(index)}>{label}</button>
      {isActive && <div className="tab-content">{children}</div>}
    </>
  )
}
```

在这种模式中：

1. 客户端状态在 `TabContainer` 组件中管理
2. 服务器组件被传递为每个 `Tab` 的子组件
3. 选项卡内容在服务器上渲染，但显示/隐藏逻辑在客户端上管理

### 使用客户端上下文提供者包装服务器组件

如果您需要在应用程序的大部分或全部中使用客户端状态和上下文，可以将服务器组件包裹在客户端上下文提供者中：

```tsx
// app/providers.tsx
'use client'

import { ThemeProvider } from './theme-provider'
import { AuthProvider } from './auth-provider'

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
```

```tsx
// app/layout.tsx - 服务器组件
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

这种模式使整个应用程序都可以访问主题和认证上下文，同时仍然允许使用服务器组件渲染内容。

## 共享客户端和服务器组件之间的数据

### 使用React Context

您可以使用React Context在客户端组件之间共享数据：

```tsx
// app/theme-context.tsx
'use client'

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

```tsx
// app/layout.tsx - 服务器组件
import { ThemeProvider } from './theme-context'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// app/header.tsx - 客户端组件
'use client'

import { useTheme } from './theme-context'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`theme-${theme}`}>
      <button onClick={toggleTheme}>切换至{theme === 'light' ? '暗色' : '亮色'}主题</button>
    </header>
  )
}
```

### 使用第三方状态管理库

对于更复杂的状态管理需求，您可以使用Redux、Zustand或Jotai等库：

```tsx
// app/store.ts
import { create } from 'zustand'

export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
```

```tsx
// app/counter.tsx
'use client'

import { useStore } from './store'

export default function Counter() {
  const { count, increment, decrement } = useStore()

  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

## 特殊模式与高级技巧

### 客户端组件库的服务器兼容包装

如果您使用的UI库需要客户端功能，可以创建服务器兼容的包装器：

```tsx
// components/ui/dialog/dialog.tsx
'use client'

import { useState } from 'react'
import { Dialog as UIDialog } from 'ui-library'

export function DialogUI({
  trigger,
  title,
  children,
}: {
  trigger: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      <UIDialog open={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {children}
      </UIDialog>
    </>
  )
}
```

```tsx
// app/page.tsx - 服务器组件
import { DialogUI } from '@/components/ui/dialog/dialog'
import ServerContent from './server-content'

export default function Page() {
  return (
    <div>
      <h1>我的应用</h1>

      <DialogUI trigger={<button>打开对话框</button>} title="服务器内容对话框">
        <ServerContent />
      </DialogUI>
    </div>
  )
}
```

这种模式允许您组合第三方UI库与服务器组件。

### 交互区域的延迟加载

为了进一步优化性能，您可以延迟加载客户端组件直到需要时：

```tsx
// app/page.tsx - 服务器组件
import { Suspense } from 'react'
import { Loading } from './loading'

// 动态导入客户端组件
const HeavyClientComponent = dynamic(() => import('./heavy-client-component'), {
  ssr: false, // 禁用SSR以仅在客户端上加载
  loading: () => <Loading />,
})

export default function Page() {
  return (
    <div>
      <h1>我的应用</h1>
      <Suspense fallback={<Loading />}>
        <HeavyClientComponent />
      </Suspense>
    </div>
  )
}
```

这种方法进一步减少了初始JavaScript包的大小，因为客户端组件仅在需要时加载。

### 服务器操作的客户端触发器

您可以创建模式，允许客户端组件触发服务器操作：

```tsx
// app/actions.ts - 服务器操作
'use server'

export async function submitForm(formData: FormData) {
  // 在服务器上处理表单提交
  const name = formData.get('name')
  const email = formData.get('email')

  // 执行服务器端逻辑
  await saveToDatabase({ name, email })

  return { success: true }
}
```

```tsx
// app/form.tsx - 客户端组件
'use client'

import { useState } from 'react'
import { submitForm } from './actions'

export function ContactForm() {
  const [status, setStatus] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const result = await submitForm(formData)
    setStatus(result.success ? 'success' : 'error')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="姓名" required />
      <input name="email" type="email" placeholder="邮箱" required />
      <button type="submit">提交</button>

      {status === 'success' && <p>提交成功！</p>}
      {status === 'error' && <p>提交失败，请重试。</p>}
    </form>
  )
}
```

这种模式允许您在客户端组件中触发服务器操作，同时保持关键逻辑在服务器上执行。

## 通用设计模式

### 客户端壳层模式

当您需要将服务器组件包装在需要交互性的UI元素中时，可以使用"壳层"模式：

```tsx
// app/client-shell.tsx
'use client'

import { useState } from 'react'

export default function ClientShell({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="shell">
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? '关闭' : '打开'}内容</button>

      {isOpen && <div className="content-area">{children}</div>}
    </div>
  )
}
```

```tsx
// app/page.tsx - 服务器组件
import ClientShell from './client-shell'
import ExpensiveServerContent from './expensive-server-content'

export default function Page() {
  return (
    <div>
      <h1>我的应用</h1>

      <ClientShell>
        <ExpensiveServerContent />
      </ClientShell>
    </div>
  )
}
```

这种模式允许在服务器上渲染复杂内容，同时在客户端上控制其可见性。

### 渐进增强

设计组件时，可以考虑先实现基本功能，然后添加客户端交互性：

```tsx
// app/progressive-image.tsx
'use client'

import { useState, useEffect } from 'react'

export default function ProgressiveImage({ lowResSrc, highResSrc, alt }) {
  const [src, setSrc] = useState(lowResSrc)

  useEffect(() => {
    const img = new Image()
    img.src = highResSrc
    img.onload = () => {
      setSrc(highResSrc)
    }
  }, [highResSrc])

  return <img src={src} alt={alt} className={src === lowResSrc ? 'blur' : ''} />
}
```

```tsx
// app/gallery.tsx - 服务器组件
import ProgressiveImage from './progressive-image'

export default function Gallery() {
  const images = [
    { id: 1, lowRes: '/images/low/1.jpg', highRes: '/images/high/1.jpg', alt: '图片1' },
    { id: 2, lowRes: '/images/low/2.jpg', highRes: '/images/high/2.jpg', alt: '图片2' },
    // ...更多图片
  ]

  return (
    <div className="gallery">
      {images.map((image) => (
        <ProgressiveImage
          key={image.id}
          lowResSrc={image.lowRes}
          highResSrc={image.highRes}
          alt={image.alt}
        />
      ))}
    </div>
  )
}
```

这种模式首先从服务器提供基本体验（低分辨率图片），然后在客户端上加载高质量版本。

## 最佳实践总结

在组合服务器组件和客户端组件时，请考虑这些最佳实践：

1. **默认使用服务器组件**：除非需要客户端特定功能，否则保持组件作为服务器组件。

2. **将交互性移至叶子节点**：尽量使交互式客户端组件位于组件树的叶子节点，而不是包装大型组件树。

3. **通过props传递服务器组件**：当需要在客户端组件中包含服务器组件时，通过props传递它们。

4. **避免不必要的客户端包装器**：不要为了微小的交互性而将大型组件树包装在客户端组件中。

5. **在服务器上获取数据**：尽可能在服务器组件中获取数据，然后将其传递给客户端组件，而不是在客户端获取数据。

6. **提升状态到必要的级别**：只将状态提升到必要的级别，避免整个应用变成客户端组件。

7. **使用服务器操作处理表单**：对于表单提交等操作，使用服务器操作来减少客户端验证和处理的需求。

## 下一步

要深入了解渲染策略和组件模式，请查看：

- [服务器组件](/nextjs/app-router/building-your-application/rendering/server-components) - 了解服务器组件的工作原理
- [客户端组件](/nextjs/app-router/building-your-application/rendering/client-components) - 了解客户端组件的用例
- [使用数据获取](/nextjs/app-router/building-your-application/data-fetching) - 学习如何在Next.js中获取数据
