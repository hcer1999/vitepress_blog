---
title: 平行路由
description: 在同一视图中同时渲染一个或多个可独立导航的页面。这是一种用于高度动态应用程序的模式。
related:
  links:
    - app/api-reference/file-conventions/default
---

平行路由允许您在同一布局中同时或有条件地渲染一个或多个页面。它们对于应用程序的高度动态部分（如仪表板和社交网站上的信息流）非常有用。

例如，考虑一个仪表板，您可以使用平行路由同时渲染 `team` 和 `analytics` 页面：

<Image
  alt="平行路由图示"
  srcLight="/docs/light/parallel-routes.png"
  srcDark="/docs/dark/parallel-routes.png"
  width="1600"
  height="942"
/>

## 插槽

平行路由是使用命名的**插槽**创建的。插槽使用 `@folder` 约定定义。例如，以下文件结构定义了两个插槽：`@analytics` 和 `@team`：

<Image
  alt="平行路由文件系统结构"
  srcLight="/docs/light/parallel-routes-file-system.png"
  srcDark="/docs/dark/parallel-routes-file-system.png"
  width="1600"
  height="687"
/>

插槽作为 props 传递给共享的父布局。对于上面的例子，`app/layout.js` 中的组件现在接受 `@analytics` 和 `@team` 插槽 props，并可以与 `children` prop 一起并行渲染它们：

```tsx switcher
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```

```jsx switcher
export default function Layout({ children, team, analytics }) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```

但是，插槽**不是**路由段，不会影响 URL 结构。例如，对于 `/@analytics/views`，URL 将是 `/views`，因为 `@analytics` 是一个插槽。插槽与常规的[页面](/docs/nextjs-cn/app/api-reference/file-conventions/page)组件结合，形成与路由段相关联的最终页面。因此，您不能在同一路由段级别有单独的[静态](/docs/nextjs-cn/app/building-your-application/rendering/server-components#static-rendering-default)和[动态](/docs/nextjs-cn/app/building-your-application/rendering/server-components#dynamic-rendering)插槽。如果一个插槽是动态的，那么该级别的所有插槽都必须是动态的。

> **需要了解的是**：
>
> - `children` prop 是一个不需要映射到文件夹的隐式插槽。这意味着 `app/page.js` 等同于 `app/@children/page.js`。

## 活动状态和导航

默认情况下，Next.js 会跟踪每个插槽的活动*状态*（或子页面）。但是，插槽内渲染的内容将取决于导航类型：

- [**软导航**](/docs/nextjs-cn/app/building-your-application/routing/index/linking-and-navigating#soft-navigation)：在客户端导航期间，Next.js 将执行[部分渲染](/docs/nextjs-cn/app/building-your-application/routing/index/linking-and-navigating#partial-rendering)，更改插槽内的子页面，同时保持其他插槽的活动子页面，即使它们与当前 URL 不匹配。
- **硬导航**：在完整页面加载（浏览器刷新）后，Next.js 无法确定与当前 URL 不匹配的插槽的活动状态。相反，它将为不匹配的插槽渲染 [`default.js`](#defaultjs) 文件，如果 `default.js` 不存在，则渲染 `404`。

> **需要了解的是**：
>
> - 对于不匹配路由的 `404` 有助于确保您不会意外地在未打算使用的页面上渲染平行路由。

### `default.js`

您可以定义一个 `default.js` 文件，作为初始加载或完整页面重新加载期间不匹配插槽的回退渲染。

考虑以下文件夹结构。`@team` 插槽有一个 `/settings` 页面，但 `@analytics` 没有。

<Image
  alt="平行路由不匹配路由"
  srcLight="/docs/light/parallel-routes-unmatched-routes.png"
  srcDark="/docs/dark/parallel-routes-unmatched-routes.png"
  width="1600"
  height="930"
/>

当导航到 `/settings` 时，`@team` 插槽将渲染 `/settings` 页面，同时保持 `@analytics` 插槽的当前活动页面。

在刷新时，Next.js 将为 `@analytics` 渲染一个 `default.js`。如果 `default.js` 不存在，则渲染 `404`。

此外，由于 `children` 是一个隐式插槽，当 Next.js 无法恢复父页面的活动状态时，您还需要创建一个 `default.js` 文件来为 `children` 渲染回退。

### `useSelectedLayoutSegment(s)`

[`useSelectedLayoutSegment`](/docs/nextjs-cn/app/api-reference/functions/use-selected-layout-segment) 和 [`useSelectedLayoutSegments`](/docs/nextjs-cn/app/api-reference/functions/use-selected-layout-segments) 都接受一个 `parallelRoutesKey` 参数，允许您读取插槽内的活动路由段。

```tsx switcher
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function Layout({ auth }: { auth: React.ReactNode }) {
  const loginSegment = useSelectedLayoutSegment('auth')
  // ...
}
```

```jsx switcher
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function Layout({ auth }) {
  const loginSegment = useSelectedLayoutSegment('auth')
  // ...
}
```

当用户导航到 `app/@auth/login`（或 URL 栏中的 `/login`）时，`loginSegment` 将等于字符串 `"login"`。

## 示例

### 条件路由

您可以使用平行路由根据某些条件（如用户角色）有条件地渲染路由。例如，为 `/admin` 或 `/user` 角色渲染不同的仪表板页面：

<Image
  alt="条件路由图示"
  srcLight="/docs/light/conditional-routes-ui.png"
  srcDark="/docs/dark/conditional-routes-ui.png"
  width="1600"
  height="898"
/>

```tsx switcher
import { checkUserRole } from '@/lib/auth'

export default function Layout({ user, admin }: { user: React.ReactNode; admin: React.ReactNode }) {
  const role = checkUserRole()
  return role === 'admin' ? admin : user
}
```

```jsx switcher
import { checkUserRole } from '@/lib/auth'

export default function Layout({ user, admin }) {
  const role = checkUserRole()
  return role === 'admin' ? admin : user
}
```

### 标签组

您可以在插槽内添加 `layout`，允许用户独立导航插槽。这对于创建标签非常有用。

例如，`@analytics` 插槽有两个子页面：`/page-views` 和 `/visitors`。

<Image
  alt="带有两个子页面和布局的 Analytics 插槽"
  srcLight="/docs/light/parallel-routes-tab-groups.png"
  srcDark="/docs/dark/parallel-routes-tab-groups.png"
  width="1600"
  height="768"
/>

在 `@analytics` 内，创建一个 [`layout`](/docs/nextjs-cn/app/building-your-application/routing/index/layouts-and-templates) 文件，在两个页面之间共享标签：

```tsx switcher
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/page-views">页面浏览量</Link>
        <Link href="/visitors">访问者</Link>
      </nav>
      <div>{children}</div>
    </>
  )
}
```

```jsx switcher
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link href="/page-views">页面浏览量</Link>
        <Link href="/visitors">访问者</Link>
      </nav>
      <div>{children}</div>
    </>
  )
}
```

### Modals

平行路由可以与[拦截路由](/docs/nextjs-cn/app/building-your-application/routing/index/intercepting-routes)结合使用，创建支持深度链接的模态。这允许您解决构建模态时遇到的常见问题，例如：

- 使模态内容**通过 URL 共享**。
- **保留上下文**，而不是在刷新时关闭模态。
- **在向后导航时关闭模态**，而不是转到上一个路由。
- **在向前导航时重新打开模态**。

考虑以下 UI 模式，其中用户可以通过客户端导航从布局打开登录模态，或访问单独的 `/login` 页面：

<Image
  alt="平行路由图示"
  srcLight="/docs/light/parallel-routes-auth-modal.png"
  srcDark="/docs/dark/parallel-routes-auth-modal.png"
  width="1600"
  height="687"
/>

要实现此模式，首先创建一个 `/login` 路由，渲染您的**主**登录页面。

<Image
  alt="平行路由图示"
  srcLight="/docs/light/parallel-routes-modal-login-page.png"
  srcDark="/docs/dark/parallel-routes-modal-login-page.png"
  width="1600"
  height="768"
/>

```tsx switcher
import { Login } from '@/app/ui/login'

export default function Page() {
  return <Login />
}
```

```jsx switcher
import { Login } from '@/app/ui/login'

export default function Page() {
  return <Login />
}
```

然后，在 `@auth` 插槽中，添加 [`default.js`](/docs/nextjs-cn/app/api-reference/file-conventions/default) 文件，返回 `null`。这确保了当它不活动时，模态不会被渲染。

```tsx switcher
export default function Default() {
  return null
}
```

```jsx switcher
export default function Default() {
  return null
}
```

在您的 `@auth` 插槽中，拦截 `/login` 路由，通过更新 `/(.)login` 文件夹来更新 `/(.)login/page.tsx` 文件：

```tsx switcher
import { Modal } from '@/app/ui/modal'
import { Login } from '@/app/ui/login'

export default function Page() {
  return (
    <Modal>
      <Login />
    </Modal>
  )
}
```

```jsx switcher
import { Modal } from '@/app/ui/modal'
import { Login } from '@/app/ui/login'

export default function Page() {
  return (
    <Modal>
      <Login />
    </Modal>
  )
}
```

> **需要了解的是**：
>
> - 用于拦截路由的约定，例如 `(.)`，取决于您的文件系统结构。请参阅 [拦截路由约定](/docs/nextjs-cn/app/building-your-application/routing/index/intercepting-routes#convention)。
> - 通过将 `<Modal>` 功能与模态内容 (`<Login>`) 分离，您可以确保任何内容（例如 [表单](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#forms)），都是服务器组件。请参阅 [交错客户端和服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props) 了解更多信息。

#### 打开模态

现在，您可以使用 Next.js 路由器打开和关闭模态。这确保了当模态打开时，URL 是正确更新的，并且当向后和向前导航时，URL 是正确的。

要打开模态，请将 `@auth` 插槽作为 props 传递给父布局，并将其与 `children` prop 一起渲染。

```tsx switcher
import Link from 'next/link'

export default function Layout({
  auth,
  children,
}: {
  auth: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <nav>
        <Link href="/login">打开模态</Link>
      </nav>
      <div>{auth}</div>
      <div>{children}</div>
    </>
  )
}
```

```jsx switcher
import Link from 'next/link'

export default function Layout({ auth, children }) {
  return (
    <>
      <nav>
        <Link href="/login">打开模态</Link>
      </nav>
      <div>{auth}</div>
      <div>{children}</div>
    </>
  )
}
```

当用户点击 `<Link>` 时，模态将打开，而不是导航到 `/login` 页面。但是，在刷新或初始加载时，导航到 `/login` 将带用户到主登录页面。

#### 关闭模态

您可以通过调用 `router.back()` 或使用 `Link` 组件来关闭模态。

```tsx switcher
'use client'

import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => {
          router.back()
        }}
      >
        关闭模态
      </button>
      <div>{children}</div>
    </>
  )
}
```

```jsx switcher
'use client'

import { useRouter } from 'next/navigation'

export function Modal({ children }) {
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => {
          router.back()
        }}
      >
        关闭模态
      </button>
      <div>{children}</div>
    </>
  )
}
```

当使用 `Link` 组件导航到不应再渲染 `@auth` 插槽的页面时，我们需要确保并行路由匹配到返回 `null` 的组件。例如，当导航回到根页面时，我们创建一个 `@auth/page.tsx` 组件：

```tsx switcher
import Link from 'next/link'

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/">关闭模态</Link>
      <div>{children}</div>
    </>
  )
}
```

```jsx switcher
import Link from 'next/link'

export function Modal({ children }) {
  return (
    <>
      <Link href="/">关闭模态</Link>
      <div>{children}</div>
    </>
  )
}
```

```tsx switcher
export default function Page() {
  return null
}
```

```jsx switcher
export default function Page() {
  return null
}
```

或者如果导航到任何其他页面（例如 `/foo`、`/foo/bar` 等），您可以使用 catch-all 插槽：

```tsx switcher
export default function CatchAll() {
  return null
}
```

```jsx switcher
export default function CatchAll() {
  return null
}
```

> **需要了解的是**：
>
> - 我们使用 catch-all 路由在 `@auth` 插槽中关闭模态，因为描述的客户端导航行为。由于客户端导航到不再匹配插槽的页面将保持可见，我们需要匹配插槽到返回 `null` 的插槽，以关闭模态。
> - 其他示例包括在画廊中打开照片模态，同时在单独的 `/photo/[id]` 页面中打开购物车侧模态。
> - [查看一个示例](https://github.com/vercel-labs/nextgram)，其中模态与拦截和并行路由结合使用。

### Loading and Error UI

平行路由可以独立流式，允许您为每个路由定义独立错误和加载状态：

<Image
  alt="平行路由启用自定义错误和加载状态"
  srcLight="/docs/light/parallel-routes-cinematic-universe.png"
  srcDark="/docs/dark/parallel-routes-cinematic-universe.png"
  width="1600"
  height="1218"
/>

请参阅 [加载 UI](/docs/nextjs-cn/app/building-your-application/routing/index/loading-ui-and-streaming) 和 [错误处理](/docs/nextjs-cn/app/building-your-application/routing/index/error-handling) 文档了解更多信息。
