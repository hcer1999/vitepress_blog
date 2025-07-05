---
title: 如何使用 CSS-in-JS 库
nav_title: CSS-in-JS
description: 在 Next.js 中使用 CSS-in-JS 库
---

# NextJS中文文档 - Css In Js

<AppOnly>

> **警告：** 在较新的 React 功能（如服务器组件和流式传输）中使用 CSS-in-JS 需要库作者支持最新版本的 React，包括[并发渲染](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)。

以下库在 `app` 目录中的客户端组件中受支持（按字母顺序排列）：

- [`ant-design`](https://ant.design/docs/react/use-with-next#using-app-router)
- [`chakra-ui`](https://chakra-ui.com/getting-started/nextjs-app-guide)
- [`@fluentui/react-components`](https://react.fluentui.dev/?path=/docs/concepts-developer-server-side-rendering-next-js-appdir-setup--page)
- [`kuma-ui`](https://kuma-ui.com)
- [`@mui/material`](https://mui.com/material-ui/guides/next-js-app-router/)
- [`@mui/joy`](https://mui.com/joy-ui/integrations/next-js-app-router/)
- [`pandacss`](https://panda-css.com)
- [`styled-jsx`](#styled-jsx)
- [`styled-components`](#styled-components)
- [`stylex`](https://stylexjs.com)
- [`tamagui`](https://tamagui.dev/docs/guides/next-js#server-components)
- [`tss-react`](https://tss-react.dev/)
- [`vanilla-extract`](https://vanilla-extract.style)

以下库目前正在开发支持：

- [`emotion`](https://github.com/emotion-js/emotion/issues/2928)

> **提示**：我们正在测试不同的 CSS-in-JS 库，我们将为支持 React 18 功能和/或 `app` 目录的库添加更多示例。

## 在 `app` 中配置 CSS-in-JS

配置 CSS-in-JS 是一个三步选择过程，包括：

1. 一个**样式注册表**来收集渲染过程中的所有 CSS 规则。
2. 新的 `useServerInsertedHTML` 钩子，用于在任何可能使用这些规则的内容之前注入规则。
3. 一个客户端组件，在初始服务器端渲染期间用样式注册表包装你的应用。

### `styled-jsx`

在客户端组件中使用 `styled-jsx` 需要使用 `v5.1.0` 或更高版本。首先，创建一个新的注册表：

```tsx switcher
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

export default function StyledJsxRegistry({ children }: { children: React.ReactNode }) {
  // 仅使用惰性初始状态创建一次样式表
  // 参考：https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [jsxStyleRegistry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles()
    jsxStyleRegistry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}
```

```jsx switcher
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

export default function StyledJsxRegistry({ children }) {
  // 仅使用惰性初始状态创建一次样式表
  // 参考：https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [jsxStyleRegistry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles()
    jsxStyleRegistry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}
```

然后，用注册表包装你的[根布局](/nextjs-cn/app/building-your-application/routing/layouts-and-templates#root-layout-required)：

```tsx switcher/nextjs-cn/
import StyledJsxRegistry from './registry'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  )
}
```

```jsx switcher
import StyledJsxRegistry from './registry'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  )
}
```

[在此处查看示例](https://github.com/vercel/app-playground/tree/main/app/styling/styled-jsx)。

### Styled Components

以下是如何配置 `styled-components@6` 或更新版本的示例：

首先，在 `next.config.js` 中启用 styled-components。

```js
module.exports = {
  compiler: {
    styledComponents: true,
  },
}
```

然后，使用 `styled-components` API 创建一个全局注册表组件，用于收集渲染过程中生成的所有 CSS 样式规则，以及一个返回这些规则的函数。然后使用 `useServerInsertedHTML` 钩子将在注册表中收集的样式注入到根布局的 `<head>` HTML 标签中。

```tsx switcher
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // 仅使用惰性初始状态创建一次样式表
  // 参考：https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  )
}
```

```jsx switcher
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({ children }) {
  // 仅使用惰性初始状态创建一次样式表
  // 参考：https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  )
}
```

用样式注册表组件包装根布局的 `children`：

```tsx switcher
import StyledComponentsRegistry from './lib/registry'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
```

```jsx switcher
import StyledComponentsRegistry from './lib/registry'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
```

[在此处查看示例](https://github.com/vercel/app-playground/tree/main/app/styling/styled-components)。

> **提示**：
>
> - 在服务器渲染期间，样式将被提取到全局注册表中，并刷新到 HTML 的 `<head>` 中。这确保了样式规则位于可能使用它们的任何内容之前。在未来，我们可能会使用即将推出的 React 功能来确定在哪里注入样式。
> - 在流式传输期间，来自每个块的样式将被收集并附加到现有样式中。客户端水合完成后，`styled-components` 将照常接管并注入任何进一步的动态样式。
> - 我们专门在树的顶层使用客户端组件作为样式注册表，因为这样提取 CSS 规则更有效。它避免在后续服务器渲染中重新生成样式，并防止它们被发送到服务器组件有效载荷中。
> - 对于需要配置 styled-components 编译的各个属性的高级用例，你可以阅读我们的 [Next.js styled-components API 参考](/nextjs-cn/architecture/nextjs-compiler#styled-components)了解更多信息。

</AppOnly>/nextjs-cn/

<PagesOnly>

<details>
  <summary>Examples</summary>

- [Styled JSX](https://github.com/vercel/next.js/tree/canary/examples/with-styled-jsx)
- [Styled Components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)
- [Emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion)
- [Linaria](https://github.com/vercel/next.js/tree/canary/examples/with-linaria)
- [Styletron](https://github.com/vercel/next.js/tree/canary/examples/with-styletron)
- [Cxs](https://github.com/vercel/next.js/tree/canary/examples/with-cxs)
- [Fela](https://github.com/vercel/next.js/tree/canary/examples/with-fela)
- [Stitches](https://github.com/vercel/next.js/tree/canary/examples/with-stitches)

</details>

It's possible to use any existing CSS-in-JS solution. The simplest one is inline styles:

```jsx
function HiThere() {
  return <p style={{ color: 'red' }}>hi there</p>
}

export default HiThere
```

We bundle [styled-jsx](https://github.com/vercel/styled-jsx) to provide support for isolated scoped CSS.
The aim is to support "shadow CSS" similar to Web Components, which unfortunately [do not support server-rendering and are JS-only](https://github.com/w3c/webcomponents/issues/71).

See the above examples for other popular CSS-in-JS solutions (like Styled Components).

A component using `styled-jsx` looks like this:

```jsx
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld
```

Please see the [styled-jsx documentation](https://github.com/vercel/styled-jsx) for more examples.

### Disabling JavaScript

Yes, if you disable JavaScript the CSS will still be loaded in the production build (`next start`). During development, we require JavaScript to be enabled to provide the best developer experience with [Fast Refresh](https://nextjs.org/blog/next-4#fast-refresh).

</PagesOnly>
