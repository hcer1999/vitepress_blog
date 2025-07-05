---
title: Link
description: 使用内置的 `next/link` 组件实现快速的客户端导航。
---

`<Link>` 是一个 React 组件，它扩展了 HTML 的 `<a>` 元素，提供了路由之间的[预加载](/docs/nextjs-cn/app/building-your-application/routing/index/linking-and-navigating#prefetching)和客户端导航功能。这是在 Next.js 中路由间导航的主要方式。

基本用法：

<AppOnly>

```tsx switcher
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

```jsx switcher
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

</AppOnly>

<PagesOnly>

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

```jsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

</PagesOnly>

## Props

下面是 `<Link>` 组件可用的属性概述：

| Prop                    | 示例                | 类型             | 是否必需 |
| ----------------------- | ------------------- | ---------------- | -------- |
| [`href`](#href)         | `href="/dashboard"` | String or Object | 是       |
| [`replace`](#replace)   | `replace={true}`    | Boolean          | 否       |
| [`scroll`](#scroll)     | `scroll={false}`    | Boolean          | 否       |
| [`prefetch`](#prefetch) | `prefetch={false}`  | Boolean          | 否       |

> **须知**：`<Link>` 组件接受其他属性，如 `onClick`、`onMouseEnter` 和其他。有关更多信息，请参考[如果 Link 组件工作](#how-link-works)。

### `href`

要导航到的路径或 URL。

```jsx
<Link href="/dashboard">Dashboard</Link>
```

`href` 也可以接受一个对象，例如：

```jsx
// 导航到 /about?name=test
<Link
  href={{
    pathname: '/about',
    query: { name: 'test' },
  }}
>
  About
</Link>
```

当使用对象形式时，Link 组件会序列化对象，类似于 URL 模块的方式：

```jsx
// 导航到 /blog/next.js-release
<Link
  href={{
    pathname: '/blog/[slug]',
    query: { slug: 'next.js-release' },
  }}
>
  Blog Post
</Link>
```

### `replace`

默认情况下，导航在浏览器历史记录中会添加新的 URL。将 `replace={true}` 设置为替换当前的历史记录条目，而不是添加新的条目。

```jsx
<Link href="/dashboard" replace>
  Dashboard
</Link>
```

### `scroll`

默认情况下，Next.js 会滚动到新路由的顶部，或者维持滚动位置。将 `scroll={false}` 设置为禁用滚动到页面顶部的默认行为。

```jsx
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>
```

### `prefetch`

预加载是 Next.js 的一项功能，当链接进入视口时，它会在后台预加载页面。

默认情况下，当链接进入视口时，Next.js 会自动预加载链接页面。这提高了客户端导航性能，使导航几乎瞬间完成。

你可以通过向 `<Link>` 组件传递 `prefetch={false}` 来禁用此功能：

```jsx
<Link href="/dashboard" prefetch={false}>
  Dashboard
</Link>
```

<AppOnly>

> **须知**：
>
> - 预加载在生产环境中启用。在开发环境中，页面是按需加载的。
> - 当使用静态生成的页面（不考虑是动态路由还是非动态路由）时，Next.js 预加载整个页面的 JSON，使得客户端导航更快。
> - 当使用服务器渲染的路由时，Next.js 预加载路由的 [Flight 数据](/docs/nextjs-cn/app/building-your-application/rendering/server-components#server-rendering-strategies)，包括布局和页面数据。
> - 你可以通过 Chrome DevTools 网络选项卡查看预加载工作。
> - 如果你的页面使用了 [`useSearchParams()`](/docs/nextjs-cn/app/api-reference/functions/use-search-params) hook，那么带有 `prefetch={true}` 的页面将被预渲染，但没有搜索参数。还有一个已知限制是，如果你的应用使用 i18n 路由，则当前不支持该路由的预加载。

</AppOnly>

<PagesOnly>

> **须知**：
>
> - 预加载在生产环境中启用。在开发环境中，页面是按需加载的。
> - 当使用静态生成的页面（不考虑是动态路由还是非动态路由）时，Next.js 预加载整个页面内容，使得客户端导航几乎瞬间完成。
> - 当使用服务器渲染的路由或用 [`getServerSideProps`](/docs/nextjs-cn/pages/api-reference/functions/get-server-side-props) 的页面时，Next.js 预加载路由的数据，所以它至少会预加载 JSON 文件，在导航时 React 组件依然需要运行。
> - 你可以通过 Chrome DevTools 网络选项卡查看预加载工作。使用 `(CMD/CTRL+SHIFT+p)` 搜索 "Show Coverage"，点击页面上的任何链接，你会看到已预加载的 JavaScript。

</PagesOnly>

## 示例

### 链接到动态路由

对于链接到动态路由，如 `/blog/[slug]`，你需要使用 URL 对象，其中 `pathname` 是路由的模式，`query` 是要填充到路由中的参数。

例如，考虑以下基于文件系统的动态路由：

<AppOnly>

- `app/blog/[slug]/page.js`

</AppOnly>

<PagesOnly>

- `pages/blog/[slug].js`

</PagesOnly>

以下链接会导航到 `/blog/hello-world` 路由，其中 `slug` 参数设置为 `hello-world`：

```jsx
<Link href={{ pathname: '/blog/[slug]', query: { slug: 'hello-world' } }}>Hello World</Link>
```

也可以这样写：

```jsx
<Link href="/blog/hello-world">Hello World</Link>
```

### 带子元素的链接

`<Link>` 接受任何嵌套元素，前提是它最终 prop 可传递给底层的 `<a>` 标签。

```jsx
<Link href="/dashboard">
  <div>Dashboard</div>
</Link>
```

### 如果 Link 不包含 `<a>` 标签

如果 `<Link>` 子元素未使用 `<a>` 标签，Next.js 会自动为你插入一个。

例如，以下 `<Link>` 组件：

```jsx
<Link href="/about">关于我们</Link>
```

会被 Next.js 转换为：

```jsx
<a href="/about">关于我们</a>
```

然而，如果你使用自定义组件包装了 `<a>` 标签，你需要使用 `legacyBehavior` 属性或者直接添加一个 `<a>` 标签。

```jsx
<Link href="/about" legacyBehavior>
  <a>关于我们</a>
</Link>
```

### 滚动到哈希 ID

默认行为是滚动到哈希 ID。

```jsx
<Link href="/dashboard#settings">设置</Link>
```

### 中间件

可以在 Next.js 链接上使用中间件，来处理例如身份验证：

```jsx
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return <Link href={isAuthenticated ? '/protected-route' : '/login'}>链接内容</Link>
}
```

### 使用 URL 对象

当使用 URL 对象而不是字符串 URL 时，会自动处理 URL 的格式化：

```jsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link
      href={{
        pathname: '/about',
        query: { firstName: 'John', lastName: 'Doe' },
        hash: 'bio',
      }}
    >
      关于 John
    </Link>
  )
}
```

生成的 URL 将是 `/about?firstName=John&lastName=Doe#bio`。

### 替换 URL 而不是新增到历史记录

当你想替换当前历史记录状态而不是添加新的 URL 时，`replace` 属性很有用。默认行为是添加新的 URL（如推送操作）。

```jsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/about" replace>
      关于我们
    </Link>
  )
}
```

### 禁用滚动恢复行为

默认情况下，Next.js 会重置滚动位置到新页面的顶部，或者保持滚动位置。有时你可能想禁用这种行为，例如，当你构建包含可持续滚动的分页时。

```jsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/about" scroll={false}>
      关于我们
    </Link>
  )
}
```

## 如何 Link 工作

`<Link>` 组件使用 JavaScript 进行客户端导航，为你提供了更快的用户体验。传统上，网站依赖于浏览器来处理导航，这意味着：

1. 用户点击链接 (`<a href="/about">`)
2. 浏览器向服务器发送请求
3. 即使新页面与当前页面相似，服务器也会发送整个新的 HTML 页面
4. 浏览器解析并重新加载完整的页面

这种方法要求用户等待新页面加载，这是用户交互的阻塞体验。

相反，Next.js 的 `<Link>` 组件能够：

1. 预加载目标页面，确保当用户点击链接时，目标页面的代码已经在后台加载。
2. 执行客户端导航，无需完整页面刷新。
3. 更新浏览器的历史记录（所以浏览器的后退和前进按钮仍然有效）。
4. 使用 Next.js 的路由缓存进一步提高性能。

这一切都在幕后为你处理，确保你的应用感觉快速、响应迅速。

### DOM 属性传递

`<Link>` 作为一个标签，你可以传递相应的 DOM 属性，比如 `className`、`target`、`onClick` 等：

```jsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link
      href="/dashboard"
      className="link"
      target="_blank"
      onClick={() => console.log('链接被点击')}
    >
      仪表盘
    </Link>
  )
}
```

其他可传递的属性包括：`id`、`lang`、`title`、`rel` 以及 [ARIA 属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA) 等。

### 禁用预加载

默认情况下，Next.js 会自动预加载视口中可见的链接（懒加载）。这种预加载发生在页面首次加载时以及使用滚动展示链接时。

你可以禁用特定链接的预加载：

```jsx
<Link href="/dashboard" prefetch={false}>
  仪表盘
</Link>
```

### 优点

`<Link>` 组件带来了很多好处：

- **提高性能**：预加载减少了用户点击和页面加载之间的延迟，创造更流畅的体验。
- **减少带宽使用**：由于只获取必要的内容，而不是整个页面，节省了数据传输。
- **保持状态**：通过避免完整的页面刷新，React 状态和客户端状态（如滚动位置）在导航间保持不变。
- **无障碍性**：自动管理焦点，确保用户在导航时不会迷失位置。

## 版本变更

| 版本      | 变化                                                 |
| --------- | ---------------------------------------------------- |
| `v13.0.0` | Next.js 会自动将 `<a>` 标签传递给没有 `<a>` 的子元素 |
| `v12.0.0` | `legacyBehavior` 属性加入                            |
| `v10.0.0` | React 18 兼容性添加                                  |
