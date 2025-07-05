---
title: 服务器和客户端组合模式
nav_title: 组合模式
description: 使用服务器和客户端组件的推荐模式。
---

在构建 React 应用程序时，你需要考虑应用程序的哪些部分应该在服务器或客户端上渲染。本页介绍使用服务器和客户端组件时的一些推荐组合模式。

## 何时使用服务器和客户端组件？

以下是服务器和客户端组件不同用例的快速总结：

| 你需要做什么？                                                           | 服务器组件          | 客户端组件          |
| ------------------------------------------------------------------------ | ------------------- | ------------------- |
| 获取数据                                                                 | <Check size={18} /> | <Cross size={18} /> |
| 访问后端资源（直接）                                                     | <Check size={18} /> | <Cross size={18} /> |
| 在服务器上保存敏感信息（访问令牌、API 密钥等）                           | <Check size={18} /> | <Cross size={18} /> |
| 在服务器上保留大型依赖项 / 减少客户端 JavaScript                         | <Check size={18} /> | <Cross size={18} /> |
| 添加交互性和事件监听器（`onClick()`、`onChange()` 等）                   | <Cross size={18} /> | <Check size={18} /> |
| 使用状态和生命周期效果（`useState()`、`useReducer()`、`useEffect()` 等） | <Cross size={18} /> | <Check size={18} /> |
| 使用仅浏览器的 API                                                       | <Cross size={18} /> | <Check size={18} /> |
| 使用依赖于状态、效果或仅浏览器 API 的自定义钩子                          | <Cross size={18} /> | <Check size={18} /> |
| 使用 [React 类组件](https://react.dev/reference/react/Component)         | <Cross size={18} /> | <Check size={18} /> |

## 服务器组件模式

在选择客户端渲染之前，你可能希望在服务器上执行一些工作，如获取数据或访问数据库或后端服务。

以下是使用服务器组件时的一些常见模式：

### 在组件之间共享数据

在服务器上获取数据时，可能会有需要在不同组件之间共享数据的情况。例如，你可能有一个布局和一个页面，它们依赖于相同的数据。

与其使用 [React Context](https://react.dev/learn/passing-data-deeply-with-context)（在服务器上不可用）或通过 props 传递数据，你可以使用 `fetch` 或 React 的 `cache` 函数在需要数据的组件中获取相同的数据，而不必担心为相同的数据发出重复请求。这是因为 React 扩展了 `fetch` 以自动记忆化数据请求，而当 `fetch` 不可用时，可以使用 `cache` 函数。

[查看此模式的示例](/nextjs-cn/app/building-your-application/data-fetching/fetching#reusing-data-across-multiple-functions)。

### 让服务器专用代码远离客户端环境

由于 JavaScript 模块可以在服务器和客户端组件模块之间共享，原本只打算在服务器上运行的代码可能会悄悄进入客户端。

例如，看看以下数据获取函数：

```ts switcher
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```

```js switcher
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```

乍一看，`getData` 似乎可以在服务器和客户端上工作。然而，这个函数包含一个 `API_KEY`，编写时的意图是它只会在服务器上执行。

由于环境变量 `API_KEY` 没有以 `NEXT_PUBLIC` 为前缀，它是一个只能在服务器上访问的私有变量。为了防止环境变量泄露到客户端，Next.js 会将私有环境变量替换为空字符串。

因此，即使 `getData()` 可以在客户端上导入和执行，它也不会按预期工作。虽然将变量设为公开可以使函数在客户端上工作，但你可能不想向客户端公开敏感信息。

为了防止这种无意中使用服务器代码的情况，我们可以使用 `server-only` 包，如果其他开发者不小心将这些模块导入到客户端组件中，就会给他们一个构建时错误。

要使用 `server-only`，首先安装该包：

```bash
npm install server-only
```

然后将包导入到任何包含服务器专用代码的模块中：

```js
import 'server-only'

export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```

现在，任何导入 `getData()` 的客户端组件都将收到一个构建时错误，解释说这个模块只能在服务器上使用。

相应的包 `client-only` 可以用来标记包含仅客户端代码的模块 – 例如，访问 `window` 对象的代码。

### 使用第三方包和提供者

由于服务器组件是 React 的新功能，生态系统中的第三方包和提供者刚刚开始为使用仅客户端功能（如 `useState`、`useEffect` 和 `createContext`）的组件添加 `'use client'` 指令。

今天，许多来自 `npm` 包的使用仅客户端功能的组件尚未添加该指令。这些第三方组件在客户端组件中将按预期工作，因为它们具有 `'use client'` 指令，但在服务器组件中不起作用。

例如，假设你已安装了假设的 `acme-carousel` 包，其中有一个 `<Carousel />` 组件。该组件使用 `useState`，但尚未添加 `'use client'` 指令。

如果你在客户端组件中使用 `<Carousel />`，它将按预期工作：

```tsx switcher
'use client'

import { useState } from 'react'
import { Carousel } from 'acme-carousel'

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>查看图片</button>

      {/* 有效，因为 Carousel 在客户端组件中使用 */}
      {isOpen && <Carousel />}
    </div>
  )
}
```

```jsx switcher
'use client'

import { useState } from 'react'
import { Carousel } from 'acme-carousel'

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>查看图片</button>

      {/* 有效，因为 Carousel 在客户端组件中使用 */}
      {isOpen && <Carousel />}
    </div>
  )
}
```

然而，如果你尝试直接在服务器组件中使用它，你会看到一个错误：

```tsx switcher
import { Carousel } from 'acme-carousel'

export default function Page() {
  return (
    <div>
      <p>查看图片</p>

      {/* 错误：`useState` 不能在服务器组件中使用 */}
      <Carousel />
    </div>
  )
}
```

```jsx switcher
import { Carousel } from 'acme-carousel'

export default function Page() {
  return (
    <div>
      <p>查看图片</p>

      {/* 错误：`useState` 不能在服务器组件中使用 */}
      <Carousel />
    </div>
  )
}
```

这是因为 Next.js 不知道 `<Carousel />` 正在使用仅客户端功能。

要解决这个问题，你可以将依赖于仅客户端功能的第三方组件包装在你自己的客户端组件中：

```tsx switcher
'use client'

import { Carousel } from 'acme-carousel'

export default Carousel
```

```jsx switcher
'use client'

import { Carousel } from 'acme-carousel'

export default Carousel
```

现在，你可以直接在服务器组件中使用 `<Carousel />`：

```tsx switcher
import Carousel from './carousel'

export default function Page() {
  return (
    <div>
      <p>查看图片</p>

      {/* 有效，因为 Carousel 是一个客户端组件 */}
      <Carousel />
    </div>
  )
}
```

```jsx switcher
import Carousel from './carousel'

export default function Page() {
  return (
    <div>
      <p>查看图片</p>

      {/* 有效，因为 Carousel 是一个客户端组件 */}
      <Carousel />
    </div>
  )
}
```

我们不认为你需要包装大多数第三方组件，因为你可能会在客户端组件中使用它们。然而，提供者是一个例外，因为它们依赖于 React 状态和上下文，并且通常需要在应用程序的根部。[在下面了解更多关于第三方上下文提供者的信息](#使用上下文提供者)。

#### 使用上下文提供者

上下文提供者通常在应用程序的根部渲染，以共享全局关注点，如当前主题。由于 [React 上下文](https://react.dev/learn/passing-data-deeply-with-context)在服务器组件中不受支持，尝试在应用程序的根部创建上下文将导致错误：

```tsx switcher
import { createContext } from 'react'

// 服务器组件中不支持 createContext
export const ThemeContext = createContext({})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
      </body>
    </html>
  )
}
```

```jsx switcher
import { createContext } from 'react'

// 服务器组件中不支持 createContext
export const ThemeContext = createContext({})

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
      </body>
    </html>
  )
}
```

要解决这个问题，创建你的上下文并将其提供者渲染到客户端组件中：

```tsx switcher
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

```jsx switcher
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

你的服务器组件现在可以直接渲染你的提供者，因为它已被标记为客户端组件：

```tsx switcher
import ThemeProvider from './theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

```jsx switcher
import ThemeProvider from './theme-provider'

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

在提供者渲染在根部后，你应用中的所有其他客户端组件都将能够使用这个上下文。

> **值得了解**：你应该在树中尽可能深地渲染提供者 – 注意 `ThemeProvider` 只包装 `{children}` 而不是整个 `<html>` 文档。这使 Next.js 更容易优化服务器组件的静态部分。

#### 库作者建议

类似地，为其他开发者创建包的库作者可以使用 `'use client'` 指令来标记其包的客户端入口点。这使包的用户可以直接将包组件导入到他们的服务器组件中，而无需创建包装边界。

你可以通过[在树的更深处使用 'use client'](#将客户端组件移至树的更深处)来优化你的包，使导入的模块成为服务器组件模块图的一部分。

值得注意的是，一些打包工具可能会剔除 `'use client'` 指令。你可以在 [React Wrap Balancer](https://github.com/shuding/react-wrap-balancer/blob/main/tsup.config.ts#LL13) 和 [Vercel Analytics](https://github.com/vercel/analytics/blob/main/packages/web/tsup.config.js#LL30) 仓库中找到如何配置 esbuild 以包含 `'use client'` 指令的示例。

## Client Components

### 将客户端组件移至树的更深处

为了减少客户端 JavaScript 包的大小，我们建议将客户端组件移至组件树的更深处。

例如，你可能有一个布局，其中包含静态元素（如标志、链接等）和一个使用状态的交互式搜索栏。

与其将整个布局设为客户端组件，不如将交互式逻辑移至客户端组件（例如 `<SearchBar />`），并保持布局作为服务器组件。这意味着你不必将布局的所有组件 JavaScript 发送到客户端。

```tsx switcher
// SearchBar 是一个客户端组件
import SearchBar from './searchbar'
// Logo 是一个服务器组件
import Logo from './logo'

// 默认情况下，布局是一个服务器组件
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

```jsx switcher
// SearchBar 是一个客户端组件
import SearchBar from './searchbar'
// Logo 是一个服务器组件
import Logo from './logo'

// 默认情况下，布局是一个服务器组件
export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

### 从服务器向客户端组件传递属性（序列化）

如果你在服务器组件中获取数据，你可能想将数据作为属性传递给客户端组件。从服务器传递到客户端组件的属性需要被 React [序列化](https://react.dev/reference/react/use-server#serializable-parameters-and-return-values)。

如果你的客户端组件依赖于*不可*序列化的数据，你可以[在客户端使用第三方库获取数据](/nextjs-cn/app/building-your-application/data-fetching/fetching#fetching-data-on-the-client)，或者在服务器上使用[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)。

## 交错服务器和客户端组件

当交错客户端和服务器组件时，可能有助于将 UI 视为组件树。从[根布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#root-layout-required)开始，它是一个服务器组件，然后你可以通过添加 `'use client'` 指令在客户端上渲染某些子树的组件。

在这些客户端子树中，你仍然可以嵌套服务器组件或调用服务器操作，但是有一些需要注意的事项：

- 在请求-响应生命周期中，你的代码从服务器移至客户端。如果你需要在客户端时访问服务器上的数据或资源，你将向服务器发起一个**新的**请求 - 而不是来回切换。
- 当向服务器发起新请求时，所有服务器组件都会先被渲染，包括那些嵌套在客户端组件中的。服务器组件的渲染结果（[RSC 载荷](/nextjs-cn/app/building-your-application/rendering/server-components#what-is-the-react-server-component-payload-rsc)）将包含对客户端组件位置的引用。然后，在客户端上，React 使用 RSC 载荷来协调服务器和客户端组件成一棵统一的树。

- 由于客户端组件在服务器组件之后渲染，你不能将服务器组件导入到客户端组件模块中（因为这需要向服务器发起新请求）。相反，你可以/nextjs-cn/ 传递给客户端组件。请参阅下面的[不支持的模式](#不支持的模式将服务器组件导入到客户端组件中)和[支持的模式](#支持的模式将服务器组件作为属性传递给客户端组件)部分。

### 不支持的模式：将服务器组件导入到客户端组件中

以下模式不受支持。你不能将服务器组件导入到客户端组件中：

```tsx switcher highlight={3,4,17}
'use client'

// 你不能将服务器组件导入到客户端组件中。
import ServerComponent from './Server-Component'

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>

      <ServerComponent />
    </>
  )
}
```

```jsx switcher highlight={3,13}
'use client'

// 你不能将服务器组件导入到客户端组件中。
import ServerComponent from './Server-Component'

export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>

      <ServerComponent />
    </>
  )
}
```

### 支持的模式：将服务器组件作为属性传递给客户端组件

以下模式是支持的。你可以将服务器组件作为属性传递给客户端组件。

一个常见的模式是使用 React 的 `children` 属性在客户端组件中创建一个*"插槽"*。

在下面的示例中，`<ClientComponent>` 接受一个 `children` 属性：

```tsx switcher highlight={6,15}
'use client'

import { useState } from 'react'

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  )
}
```

```jsx switcher highlight={5,12}
'use client'

import { useState } from 'react'

export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>

      {children}
    </>
  )
}
```

`<ClientComponent>` 不知道 `children` 最终将由服务器组件的结果填充。`<ClientComponent>` 唯一的责任是决定 `children` 最终将被放置的**位置**。

在父服务器组件中，你可以导入 `<ClientComponent>` 和 `<ServerComponent>`，并将 `<ServerComponent>` 作为 `<ClientComponent>` 的子元素传递：

```tsx highlight={11} switcher
// 此模式有效：
// 你可以将服务器组件作为客户端组件的子元素或属性传递。
import ClientComponent from './client-component'
import ServerComponent from './server-component'

// Next.js 中的页面默认是服务器组件
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

```jsx highlight={11} switcher
// 此模式有效：
// 你可以将服务器组件作为客户端组件的子元素或属性传递。
import ClientComponent from './client-component'
import ServerComponent from './server-component'

// Next.js 中的页面默认是服务器组件
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

通过这种方法，`<ClientComponent>` 和 `<ServerComponent>` 被解耦，可以独立渲染。在这种情况下，子元素 `<ServerComponent>` 可以在服务器上渲染，远早于 `<ClientComponent>` 在客户端上渲染。

> **值得了解：**
>
> - "提升内容"的模式已经被用来避免当父组件重新渲染时重新渲染嵌套的子组件。
> - 你不限于 `children` 属性。你可以使用任何属性来传递 JSX。
