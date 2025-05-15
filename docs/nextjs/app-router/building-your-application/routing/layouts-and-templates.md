---
title: Next.js 中文文档 - 布局和模板
description: 学习如何使用布局和模板在Next.js应用程序中创建共享UI。
---

# Next.js 中文文档 - 布局和模板

在Next.js应用程序中，您可以使用特殊的`layout.js`和`template.js`文件来创建多个路由之间共享的UI。

## 布局

布局是多个页面之间共享的UI。在导航时，布局保持状态，保持交互性，并且不会重新渲染。布局也可以嵌套。

### 根布局（必需）

最顶层的布局被称为**根布局**，是必需的，必须包含`html`和`body`标签。这个布局会包装您应用程序中的所有页面。

app/layout.tsx

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> **注意**：
>
> - App Router需要根布局。
> - 根布局必须定义`html`和`body`标签，因为Next.js不会自动创建它们。
> - 您可以使用[内置SEO支持](/nextjs/app-router/building-your-application/metadata)来管理`head`元素，如`title`和`meta`。
> - 您可以使用路由组创建[多个根布局](/nextjs/app-router/getting-started/project-structure#创建多个根布局)。
> - 根布局默认是[服务器组件](/nextjs/app-router/building-your-application/rendering/server-components)，但可以设置为[客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)。

### 嵌套布局

在文件夹内定义的布局适用于特定的路由段，并在导航到该段时渲染。默认情况下，布局文件中的UI会嵌套在父`layout.js`的UI内部。

app/dashboard/layout.tsx

```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* 在所有dashboard/ 路由中都包含此UI */}
      <nav></nav>

      {children}
    </section>
  )
}
```

上面的例子组合了根布局和仪表板布局的UI：

![布局UI嵌套示意图](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts.png&w=1920&q=75&dpl=dpl_BtyizNFY5NvmVekx6gUHKQFoubSp)

参考[路由图表](/nextjs/app-router/building-your-application/routing#路由嵌套)和[嵌套路由示例](/nextjs/app-router/getting-started/layouts-and-pages#嵌套布局)了解更多关于嵌套路由的信息。

> **注意**：
>
> - 只有根布局可以包含`html`和`body`标签。
> - 布局默认是[服务器组件](/nextjs/app-router/building-your-application/rendering/server-components)，但可以设置为[客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)。
> - 布局可以获取数据。查看[数据获取](/nextjs/app-router/building-your-application/data-fetching)章节获取更多信息。
> - 父布局与子布局之间不能传递数据。但是，您可以在多个路由中获取相同的数据，React将[自动去重请求](/nextjs/app-router/building-your-application/data-fetching/caching#请求去重)，而不影响性能。
> - 布局无法访问当前路由段。要访问路由段，您可以在客户端组件中使用[useSelectedLayoutSegment](/nextjs/app-router/api-reference/functions/use-selected-layout-segment)或[useSelectedLayoutSegments](/nextjs/app-router/api-reference/functions/use-selected-layout-segments)。
> - 布局默认与[部分渲染](/nextjs/app-router/building-your-application/routing#部分渲染)兼容。
> - `.js`、`.jsx`或`.tsx`文件扩展名可用于布局。

### 何时使用布局

路由段的布局在多次导航中是**持久的**，保留状态，保持交互性，不会重新渲染。

对于UI元素，如共享导航、固定位置的聊天窗口等，布局很有效：这些元素应该在页面变更时保持位置和状态，而不应该重新渲染。

## 模板

模板与布局类似，可包装每个子布局或页面。与在路由间保持状态的布局不同，模板在导航时为每个子项创建新实例，这意味着用户每次导航到不同路由时，模板组件中的状态都不会保留，DOM元素会被重新创建。

app/template.tsx

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

与布局在嵌套上的行为相同，如果存在模板，它将嵌套在布局内部，包装它的子项。

![模板嵌套示意图](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ftemplate-hierarchy.png&w=1920&q=75&dpl=dpl_BtyizNFY5NvmVekx6gUHKQFoubSp)

> **注意**：
>
> - 模板可以在任何路由级别使用，不仅限于根层。
> - 模板默认是[服务器组件](/nextjs/app-router/building-your-application/rendering/server-components)，但可设置为[客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)。
> - 模板可以获取数据。
> - `.js`、`.jsx`或`.tsx`文件扩展名可用于模板。
> - 从根布局开始的渲染过程先渲染根布局，再向下递归渲染相匹配的路由。详细了解[部分渲染](/nextjs/app-router/building-your-application/routing#部分渲染)。

### 何时使用模板而非布局

模板在以下情况下会很有用：

- 依赖`useEffect`（如记录页面浏览）和`useState`（如每个页面的反馈表单）的功能。
- 更改默认框架行为，例如，布局内的Suspense界面会在导航**一次**显示，而模板内的会在**每次导航**时显示。

## 修改`<head>`

在`app`目录中，您可以使用[内置的SEO支持](/nextjs/app-router/building-your-application/metadata)来修改HTML中的`<head>`元素，如`title`和`meta`。

元数据可以通过导出[metadata对象](/nextjs/app-router/api-reference/functions/generate-metadata#引用)或[generateMetadata函数](/nextjs/app-router/api-reference/functions/generate-metadata#生成动态值)来定义。

app/layout.tsx

```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acme',
  description: '创建于Acme公司',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> **注意**: 您不应该手动添加`<head>`标签例如`<title>`和`<meta>`到根布局中，而应该使用[Metadata API](/nextjs/app-router/api-reference/functions/generate-metadata)，它会自动处理高级要求，如流式处理和重复去除。
