---
title: Script
description: 使用内置的 `next/script` 组件优化 Next.js 应用程序中的第三方脚本。
---

本 API 参考将帮助你了解如何使用 Script 组件可用的[属性](#props)。有关功能和用法，请参阅[优化脚本](/nextjs-cn/app/building-your-application/routing/layouts-and-templates)页面。

```tsx switcher/nextjs-cn/
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

## Props

以下是 Script 组件可用属性的摘要：

| 属性                    | 示例                              | 类型     | 是否必需                     |
| ----------------------- | --------------------------------- | -------- | ---------------------------- |
| [`src`](#src)           | `src="http://example.com/script"` | String   | 除非使用内联脚本，否则为必需 |
| [`strategy`](#strategy) | `strategy="lazyOnload"`           | String   | -                            |
| [`onLoad`](#onload)     | `onLoad={onLoadFunc}`             | Function | -                            |
| [`onReady`](#onready)   | `onReady={onReadyFunc}`           | Function | -                            |
| [`onError`](#onerror)   | `onError={onErrorFunc}`           | Function | -                            |

## 必需属性

`<Script />` 组件需要以下属性。

### `src`

指定外部脚本 URL 的路径字符串。这可以是绝对外部 URL 或内部路径。除非使用内联脚本，否则 `src` 属性是必需的。

## 可选属性

`<Script />` 组件接受多个除必需属性外的其他属性。

### `strategy`

脚本的加载策略。有四种不同的策略可供使用：

- `beforeInteractive`：在任何 Next.js 代码之前和页面水合发生之前加载。
- `afterInteractive`：（**默认**）在页面上发生一些水合之后尽早加载。
- `lazyOnload`：在浏览器空闲时间加载。
- `worker`：（实验性）在 web worker 中加载。

### `beforeInteractive`

使用 `beforeInteractive` 策略加载的脚本会从服务器注入到初始 HTML 中，在任何 Next.js 模块之前下载，并按照放置顺序执行。

使用此策略的脚本会在任何第一方代码之前预加载和获取，但它们的执行**不会阻止页面水合的发生**。

<AppOnly>

`beforeInteractive` 脚本必须放在根布局（`app/layout.tsx`）中，用于加载整个站点所需的脚本（即，当应用程序中的任何页面已在服务器端加载时，该脚本将加载）。

</AppOnly>

<PagesOnly>

`beforeInteractive` 脚本必须放在 `Document` 组件（`pages/_document.js`）中，用于加载整个站点所需的脚本（即，当应用程序中的任何页面已在服务器端加载时，该脚本将加载）。

</PagesOnly>

**此策略应仅用于需要尽快获取的关键脚本。**

<AppOnly>

```tsx switcher
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://example.com/script.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://example.com/script.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="https://example.com/script.js" strategy="beforeInteractive" />
      </body>
    </Html>
  )
}
```

</PagesOnly>

> **须知**：无论 `beforeInteractive` 脚本在组件中放置在何处，都将始终注入到 HTML 文档的 `head` 中。

一些应该使用 `beforeInteractive` 尽快获取的脚本示例包括：

- 机器人检测器
- Cookie 同意管理器

### `afterInteractive`

使用 `afterInteractive` 策略的脚本会在客户端注入到 HTML 中，并会在页面上发生一些（或全部）水合后加载。这是 Script 组件的**默认策略**，应用于任何需要尽快加载但不需要在任何第一方 Next.js 代码之前加载的脚本。

`afterInteractive` 脚本可以放置在任何页面或布局中，只有当该页面（或一组页面）在浏览器中打开时才会加载和执行。

```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="afterInteractive" />
    </>
  )
}
```

适合 `afterInteractive` 策略的脚本示例包括：

- 标签管理器
- 分析工具

### `lazyOnload`

使用 `lazyOnload` 策略的脚本会在客户端浏览器空闲时间注入到 HTML 中，并在页面上所有资源获取完毕后加载。此策略应用于任何不需要提前加载的后台或低优先级脚本。

`lazyOnload` 脚本可以放置在任何页面或布局中，只有当该页面（或一组页面）在浏览器中打开时才会加载和执行。

```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="lazyOnload" />
    </>
  )
}
```

不需要立即加载并可使用 `lazyOnload` 获取的脚本示例包括：

- 聊天支持插件
- 社交媒体小部件

### `worker`

> **警告：** `worker` 策略尚不稳定，尚不适用于 App Router。请谨慎使用。

使用 `worker` 策略的脚本会卸载到 web worker，以释放主线程并确保只有关键的第一方资源在主线程上处理。虽然此策略可用于任何脚本，但这是一个高级用例，不保证支持所有第三方脚本。

要使用 `worker` 作为策略，必须在 `next.config.js` 中启用 `nextScriptWorkers` 标志：

```js
module.exports = {
  experimental: {
    nextScriptWorkers: true,
  },
}
```

`worker` 脚本**目前只能在 `pages/` 目录中使用**：

```tsx switcher
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="worker" />
    </>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="worker" />
    </>
  )
}
```

### `onLoad`

> **警告：** `onLoad` 尚不适用于服务器组件，只能在客户端组件中使用。此外，`onLoad` 不能与 `beforeInteractive` 一起使用 - 考虑使用 `onReady` 替代。

某些第三方脚本要求用户在脚本加载完成后运行 JavaScript 代码，以实例化内容或调用函数。如果您使用 `afterInteractive` 或 `lazyOnload` 作为加载策略加载脚本，可以使用 `onLoad` 属性在脚本加载后执行代码。

以下是在库加载后仅执行 lodash 方法的示例。

```tsx switcher
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"
        onLoad={() => {
          console.log(_.sample([1, 2, 3, 4]))
        }}
      />
    </>
  )
}
```

```jsx switcher
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"
        onLoad={() => {
          console.log(_.sample([1, 2, 3, 4]))
        }}
      />
    </>
  )
}
```

### `onReady`

> **警告：** `onReady` 尚不适用于服务器组件，只能在客户端组件中使用。

某些第三方脚本要求用户在脚本加载完成后以及每次组件挂载时（例如，路由导航后）运行 JavaScript 代码。您可以使用 `onReady` 属性在脚本首次加载时的加载事件后以及之后每次组件重新挂载时执行代码。

以下是每次组件挂载时重新实例化 Google Maps JS 嵌入的示例：

<AppOnly>

```tsx switcher
'use client'

import { useRef } from 'react'
import Script from 'next/script'

export default function Page() {
  const mapRef = useRef()

  return (
    <>
      <div ref={mapRef}></div>
      <Script
        id="google-maps"
        src="https://maps.googleapis.com/maps/api/js"
        onReady={() => {
          new google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          })
        }}
      />
    </>
  )
}
```

```jsx switcher
'use client'

import { useRef } from 'react'
import Script from 'next/script'

export default function Page() {
  const mapRef = useRef()

  return (
    <>
      <div ref={mapRef}></div>
      <Script
        id="google-maps"
        src="https://maps.googleapis.com/maps/api/js"
        onReady={() => {
          new google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          })
        }}
      />
    </>
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import { useRef } from 'react'
import Script from 'next/script'

export default function Page() {
  const mapRef = useRef()

  return (
    <>
      <div ref={mapRef}></div>
      <Script
        id="google-maps"
        src="https://maps.googleapis.com/maps/api/js"
        onReady={() => {
          new google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          })
        }}
      />
    </>
  )
}
```

</PagesOnly>

### `onError`

> **警告：** `onError` 尚不适用于服务器组件，只能在客户端组件中使用。`onError` 不能与 `beforeInteractive` 加载策略一起使用。

有时捕获脚本加载失败很有帮助。这些错误可以使用 `onError` 属性处理：

<AppOnly>

```tsx switcher
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onError={(e: Error) => {
          console.error('脚本加载失败', e)
        }}
      />
    </>
  )
}
```

```jsx switcher
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onError={(e) => {
          console.error('脚本加载失败', e)
        }}
      />
    </>
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onError={(e: Error) => {
          console.error('脚本加载失败', e)
        }}
      />
    </>
  )
}
```

</PagesOnly>

## 版本历史

| 版本      | 变更                                                                 |
| --------- | -------------------------------------------------------------------- |
| `v13.0.0` | 修改 `beforeInteractive` 和 `afterInteractive` 以支持 `app`。        |
| `v12.2.4` | 添加 `onReady` 属性。                                                |
| `v12.2.2` | 允许在 `_document` 中放置带有 `beforeInteractive` 的 `next/script`。 |
| `v11.0.0` | 引入 `next/script`。                                                 |
