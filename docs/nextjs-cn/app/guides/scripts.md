---
title: 如何加载和优化脚本
nav_title: 脚本
description: 使用内置的 Script 组件优化第三方脚本。
related:
  title: API 参考
  description: 了解更多关于 next/script API 的信息。
  links:
    - app/api-reference/components/script
---

# NextJS中文文档 - Scripts

<AppOnly>

### 布局脚本

要为多个路由加载第三方脚本，导入 `next/script` 并直接在你的布局组件中包含脚本：

```tsx switcher
import Script from 'next/script'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function DashboardLayout({ children }) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

当用户访问文件夹路由（例如 `dashboard/page.js`）或任何嵌套路由（例如 `dashboard/settings/page.js`）时，会获取第三方脚本。Next.js 将确保脚本**仅加载一次**，即使用户在同一布局中的多个路由之间导航。

</AppOnly>

### 应用程序脚本

<AppOnly>

要为所有路由加载第三方脚本，导入 `next/script` 并直接在你的根布局中包含脚本：

```tsx switcher
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://example.com/script.js" />
    </html>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://example.com/script.js" />
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

要为所有路由加载第三方脚本，导入 `next/script` 并直接在你的自定义 `_app` 中包含脚本：

```jsx
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

</PagesOnly>

当访问应用程序中的*任何*路由时，此脚本将加载并执行。Next.js 将确保脚本**仅加载一次**，即使用户在多个页面之间导航。

> **建议**：我们建议仅在特定页面或布局中包含第三方脚本，以最小化对性能的不必要影响。

### 策略

虽然 `next/script` 的默认行为允许你在任何页面或布局中加载第三方脚本，但你可以通过使用 `strategy` 属性来微调其加载行为：

- `beforeInteractive`：在任何 Next.js 代码之前和在任何页面水合发生之前加载脚本。
- `afterInteractive`：（**默认**）在页面上发生一些水合后提前加载脚本。
- `lazyOnload`：在浏览器空闲时间晚些时候加载脚本。
- `worker`：（实验性）在 Web Worker 中加载脚本。

参考 [`next/script`](/nextjs-cn/app/api-reference/components/script#strategy) API 参考文档了解更多关于每种策略及其用例的信息。

### 将脚本卸载到 Web Work/nextjs-cn/

> **警告：** `worker` 策略尚不稳定，尚不适用于 App Router。请谨慎使用。

使用 `worker` 策略的脚本被卸载并在 [Partytown](https://partytown.builder.io/) 的 Web Worker 中执行。这可以通过将主线程专用于应用程序代码的其余部分来提高站点的性能。

此策略仍处于实验阶段，仅当在 `next.config.js` 中启用 `nextScriptWorkers` 标志时才能使用：

```js
module.exports = {
  experimental: {
    nextScriptWorkers: true,
  },
}
```

然后，运行 `next`（通常是 `npm run dev` 或 `yarn dev`），Next.js 将引导你安装完成设置所需的包：

```bash
npm run dev
```

你将看到如下指示：请通过运行 `npm install @builder.io/partytown` 来安装 Partytown

完成设置后，定义 `strategy="worker"` 将自动在你的应用程序中实例化 Partytown 并将脚本卸载到 Web Worker。

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

在 Web Worker 中加载第三方脚本时需要考虑一些权衡。请参阅 Partytown 的[权衡](https://partytown.builder.io/trade-offs)文档了解更多信息。

<PagesOnly>

#### 使用自定义 Partytown 配置

虽然 `worker` 策略不需要任何额外的配置即可工作，但 Partytown 支持使用配置对象来修改其某些设置，包括启用 `debug` 模式和转发事件和触发器。

如果你想添加额外的配置选项，可以在[自定义 `_document.js`](/nextjs-cn/pages/building-your-application/routing/custom-document) 中使用的 `<Head />` 组件内包含它：

```jsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                debug: true
              };
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

要修改 Partytown 的配置，必须满足以下条件：

1. 必须使用 `data-partytown-config` 属性以覆盖 Next.js 使用的默认配置
2. 除非你决定将 Partytown 的库文件保存在单独的目录中，否则必须在配置对象中包含 `lib: "/_next/static/~partytown/"` 属性和值，以便让 Partytown 知道 Next.js 存储必要静态文件的位置。

> **注意**：如果你使用[资源前缀](/nextjs-cn/pages/api-reference/config/next-config-js/assetPrefix)并想修改 Partytown 的默认配置，你必须将其作为 `lib` 路径的一部分包含在内。

查看 Partytown 的[配置选项](https://partytown.builder.io/configuration)以了解可以添加的其他属性的完整列表。

</PagesOnly>

### 内联脚本

Script 组件也支持内联脚本，或不从外部文件加载的脚本。它们可以通过将 JavaScript 放在大括号内来编写：

```jsx
<Script id="show-banner">{`document.getElementById('banner').classList.remove('hidden')`}</Script>
```

或者通过使用 `dangerouslySetInnerHTML` 属性：

```jsx
<Script
  id="show-banner"
  dangerouslySetInnerHTML={{
    __html: `document.getElementById('banner').classList.remove('hidden')`,
  }}
/>
```

> **警告**：内联脚本必须分配一个 `id` 属性，以便 Next.js 能够跟踪和优化脚本。

### 执行额外代码

事件处理程序可以与 Script 组件一起使用，以在某个事件发生后执行额外的代码：

- `onLoad`：在脚本加载完成后执行代码。
- `onReady`：在脚本加载完成后和每次组件挂载时执行代码。
- `onError`：在脚本加载失败时执行代码。

<AppOnly>

这些处理程序仅在 `next/script` 被导入并在[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)中使用时才能工作，其中 `'use client'` 被定义为代码的第一行：

```tsx switcher/nextjs-cn/
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onLoad={() => {
          console.log('Script has loaded')
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
        onLoad={() => {
          console.log('Script has loaded')
        }}
      />
    </>
  )
}
```

参考 [`next/script`](/nextjs-cn/app/api-reference/components/script#onload) API 参考文档了解更多关于每个事件处理程序的信息并查看示例。

</AppOnly>/nextjs-cn/

<PagesOnly>

这些处理程序仅在 `next/script` 被导入并在[客户端组件](/nextjs-cn/app/building-your-application/rendering/client-components)中使用时才能工作，其中 `'use client'` 被定义为代码的第一行：

```tsx switcher/nextjs-cn/
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onLoad={() => {
          console.log('Script has loaded')
        }}
      />
    </>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onLoad={() => {
          console.log('Script has loaded')
        }}
      />
    </>
  )
}
```

参考 [`next/script`](/nextjs-cn/pages/api-reference/components/script#onload) API 参考文档了解更多关于每个事件处理程序的信息并查看示例。

</PagesOnly>/nextjs-cn/

### 附加属性

有许多 DOM 属性可以分配给 `<script>` 元素，而不是由 Script 组件使用，如 [`nonce`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/nonce) 或[自定义数据属性](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/data-*)。包含任何附加属性将自动将其转发到 HTML 中包含的最终优化的 `<script>` 元素。

<AppOnly>

```tsx switcher
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />
    </>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />
    </>
  )
}
```

</AppOnly>

<PagesOnly>

```tsx switcher
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />
    </>
  )
}
```

```jsx switcher
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />
    </>
  )
}
```

</PagesOnly>
