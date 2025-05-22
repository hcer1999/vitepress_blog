---
title: Form
description: 了解如何使用 `<Form>` 组件处理表单提交和使用客户端导航更新搜索参数。
---

`<Form>` 组件扩展了 HTML `<form>` 元素，提供了<AppOnly>[**预获取**](/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching) [加载 UI](/docs/app/building-your-application/routing/loading-ui-and-streaming)、</AppOnly>**客户端导航**提交和**渐进式增强**功能。

它对于更新 URL 搜索参数的表单非常有用，因为它减少了实现上述功能所需的模板代码。

基本用法：

<AppOnly>

```tsx filename="/app/ui/search.tsx" switcher
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      {/* 提交时，输入值将附加到 URL 中，例如 /search?query=abc */}
      <input name="query" />
      <button type="submit">提交</button>
    </Form>
  )
}
```

```jsx filename="/app/ui/search.js" switcher
import Form from 'next/form'

export default function Search() {
  return (
    <Form action="/search">
      {/* 提交时，输入值将附加到 URL 中，例如 /search?query=abc */}
      <input name="query" />
      <button type="submit">提交</button>
    </Form>
  )
}
```

</AppOnly>

<PagesOnly>

```tsx filename="/ui/search.js" switcher
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      {/* 提交时，输入值将附加到 URL 中，例如 /search?query=abc */}
      <input name="query" />
      <button type="submit">提交</button>
    </Form>
  )
}
```

```jsx filename="/ui/search.js" switcher
import Form from 'next/form'

export default function Search() {
  return (
    <Form action="/search">
      {/* 提交时，输入值将附加到 URL 中，例如 /search?query=abc */}
      <input name="query" />
      <button type="submit">提交</button>
    </Form>
  )
}
```

</PagesOnly>

## 参考

`<Form>` 组件的行为取决于 `action` 属性是传递了 `string` 还是 `function`。

<AppOnly>

- 当 `action` 是**字符串**时，`<Form>` 的行为类似于使用 **`GET`** 方法的原生 HTML 表单。表单数据被编码为 URL 中的搜索参数，当表单提交时，它会导航到指定的 URL。此外，Next.js 还会：
  - 当表单变为可见时[预获取](/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)路径，这会预加载共享 UI（例如 `layout.js` 和 `loading.js`），从而实现更快的导航。
  - 当表单提交时执行[客户端导航](/docs/app/building-your-application/routing/linking-and-navigating#5-soft-navigation)，而不是完全页面重新加载。这保留了共享 UI 和客户端状态。
- 当 `action` 是**函数**（服务器操作）时，`<Form>` 的行为类似于 [React 表单](https://react.dev/reference/react-dom/components/form)，在表单提交时执行操作。

</AppOnly>

<PagesOnly>

- 当 `action` 是**字符串**时，`<Form>` 的行为类似于使用 **`GET`** 方法的原生 HTML 表单。表单数据被编码为 URL 中的搜索参数，当表单提交时，它会导航到指定的 URL。此外，Next.js 还会：
  - 当表单提交时执行[客户端导航](/docs/app/building-your-application/routing/linking-and-navigating#5-soft-navigation)，而不是完全页面重新加载。这保留了共享 UI 和客户端状态。

</PagesOnly>

### `action`（字符串）属性

<PagesOnly>

当 `action` 是字符串时，`<Form>` 组件支持以下属性：

| 属性      | 示例               | 类型                       | 是否必需 |
| --------- | ------------------ | -------------------------- | -------- |
| `action`  | `action="/search"` | `string`（URL 或相对路径） | 是       |
| `replace` | `replace={false}`  | `boolean`                  | -        |
| `scroll`  | `scroll={true}`    | `boolean`                  | -        |

- **`action`**：表单提交时导航到的 URL 或路径。
  - 空字符串 `""` 将导航到带有更新后搜索参数的相同路由。
- **`replace`**：替换当前历史状态，而不是将新状态推送到[浏览器的历史](https://developer.mozilla.org/en-US/docs/Web/API/History_API)堆栈。默认为 `false`。
- **`scroll`**：控制导航过程中的滚动行为。默认为 `true`，这意味着它将滚动到新路由的顶部，并在向后和向前导航时保持滚动位置。

</PagesOnly>

<AppOnly>

当 `action` 是字符串时，`<Form>` 组件支持以下属性：

| 属性       | 示例               | 类型                       | 是否必需 |
| ---------- | ------------------ | -------------------------- | -------- |
| `action`   | `action="/search"` | `string`（URL 或相对路径） | 是       |
| `replace`  | `replace={false}`  | `boolean`                  | -        |
| `scroll`   | `scroll={true}`    | `boolean`                  | -        |
| `prefetch` | `prefetch={true}`  | `boolean`                  | -        |

- **`action`**：表单提交时导航到的 URL 或路径。
  - 空字符串 `""` 将导航到带有更新后搜索参数的相同路由。
- **`replace`**：替换当前历史状态，而不是将新状态推送到[浏览器的历史](https://developer.mozilla.org/en-US/docs/Web/API/History_API)堆栈。默认为 `false`。
- **`scroll`**：控制导航过程中的滚动行为。默认为 `true`，这意味着它将滚动到新路由的顶部，并在向后和向前导航时保持滚动位置。
- **`prefetch`**：控制表单在用户视口中可见时是否应该预获取路径。默认为 `true`。

### `action`（函数）属性

当 `action` 是函数时，`<Form>` 组件支持以下属性：

| 属性     | 示例                | 类型                     | 是否必需 |
| -------- | ------------------- | ------------------------ | -------- |
| `action` | `action={myAction}` | `function`（服务器操作） | 是       |

- **`action`**：表单提交时调用的服务器操作。更多信息请参阅 [React 文档](https://react.dev/reference/react-dom/components/form#props)。

> **须知**：当 `action` 是函数时，`replace` 和 `scroll` 属性将被忽略。

</AppOnly>

### 注意事项

<AppOnly>

- **`formAction`**：可以在 `<button>` 或 `<input type="submit">` 字段中使用，以覆盖 `action` 属性。Next.js 将执行客户端导航，但是，这种方法不支持预获取。
  - 当使用 [`basePath`](/docs/app/api-reference/config/next-config-js/basePath) 时，你还必须在 `formAction` 路径中包含它。例如 `formAction="/base-path/search"`。
- **`key`**：不支持为字符串 `action` 传递 `key` 属性。如果你想触发重新渲染或执行变更，请考虑使用函数 `action` 代替。

</AppOnly>

- **`onSubmit`**：可用于处理表单提交逻辑。但是，调用 `event.preventDefault()` 将覆盖 `<Form>` 行为，例如导航到指定的 URL。
- **[`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method)、[`encType`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#enctype)、[`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#target)**：不受支持，因为它们会覆盖 `<Form>` 的行为。
  - 同样，`formMethod`、`formEncType` 和 `formTarget` 可用于覆盖 `method`、`encType` 和 `target` 属性，使用它们将回退到原生浏览器行为。
  - 如果你需要使用这些属性，请使用 HTML `<form>` 元素代替。
- **`<input type="file">`**：当 `action` 是字符串时使用此输入类型，将匹配浏览器行为，提交文件名而不是文件对象。

<AppOnly>

## 示例

### 导向搜索结果页面的搜索表单

你可以通过将路径作为 `action` 传递，创建一个导航到搜索结果页面的搜索表单：

```tsx filename="/app/page.tsx" switcher
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">提交</button>
    </Form>
  )
}
```

```jsx filename="/app/page.js" switcher
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">提交</button>
    </Form>
  )
}
```

当用户更新查询输入字段并提交表单时，表单数据将被编码为 URL 中的搜索参数，例如 `/search?query=abc`。

> **须知**：如果你将空字符串 `""` 传递给 `action`，表单将导航到带有更新后搜索参数的相同路由。

在结果页面上，你可以使用 [`searchParams`](/docs/app/api-reference/file-conventions/page#searchparams-optional) `page.js` 属性访问查询，并使用它从外部源获取数据。

```tsx filename="/app/search/page.tsx" switcher
import { getSearchResults } from '@/lib/search'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const results = await getSearchResults((await searchParams).query)

  return <div>...</div>
}
```

```jsx filename="/app/search/page.js" switcher
import { getSearchResults } from '@/lib/search'

export default async function SearchPage({ searchParams }) {
  const results = await getSearchResults((await searchParams).query)

  return <div>...</div>
}
```

当 `<Form>` 在用户视口中可见时，`/search` 页面上的共享 UI（如 `layout.js` 和 `loading.js`）将被预获取。提交时，表单将立即导航到新路由，并在获取结果时显示加载 UI。你可以使用 [`loading.js`](/docs/app/api-reference/file-conventions/loading) 设计备用 UI：

```tsx filename="/app/search/loading.tsx" switcher
export default function Loading() {
  return <div>加载中...</div>
}
```

```jsx filename="/app/search/loading.js" switcher
export default function Loading() {
  return <div>加载中...</div>
}
```

为了覆盖共享 UI 尚未加载的情况，你可以使用 [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) 向用户显示即时反馈。

首先，创建一个在表单处于等待状态时显示加载状态的组件：

```tsx filename="/app/ui/search-button.tsx" switcher
'use client'
import { useFormStatus } from 'react-dom'

export default function SearchButton() {
  const status = useFormStatus()
  return <button type="submit">{status.pending ? '搜索中...' : '搜索'}</button>
}
```

```jsx filename="/app/ui/search-button.js" switcher
'use client'
import { useFormStatus } from 'react-dom'

export default function SearchButton() {
  const status = useFormStatus()
  return <button type="submit">{status.pending ? '搜索中...' : '搜索'}</button>
}
```

然后，更新搜索表单页面以使用 `SearchButton` 组件：

```tsx filename="/app/page.tsx" switcher
import Form from 'next/form'
import { SearchButton } from '@/ui/search-button'

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <SearchButton />
    </Form>
  )
}
```

```jsx filename="/app/ui/search-button.js" switcher
import Form from 'next/form'
import { SearchButton } from '@/ui/search-button'

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <SearchButton />
    </Form>
  )
}
```

### 使用服务器操作进行数据变更

你可以通过将函数传递给 `action` 属性来执行数据变更。

```tsx filename="/app/posts/create/page.tsx" switcher
import Form from 'next/form'
import { createPost } from '@/posts/actions'

export default function Page() {
  return (
    <Form action={createPost}>
      <input name="title" />
      {/* ... */}
      <button type="submit">创建文章</button>
    </Form>
  )
}
```

```jsx filename="/app/posts/create/page.js" switcher
import Form from 'next/form'
import { createPost } from '@/posts/actions'

export default function Page() {
  return (
    <Form action={createPost}>
      <input name="title" />
      {/* ... */}
      <button type="submit">创建文章</button>
    </Form>
  )
}
```

在数据变更后，通常需要重定向到新资源。你可以使用 `next/navigation` 中的 [`redirect`](/docs/app/building-your-application/routing/redirecting) 函数导航到新的文章页面。

> **须知**：由于表单提交的"目的地"在操作执行前不知道，因此 `<Form>` 无法自动预获取共享 UI。

```tsx filename="/app/posts/actions.ts" switcher
'use server'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  // 创建新文章
  // ...

  // 重定向到新文章
  redirect(`/posts/${data.id}`)
}
```

```jsx filename="/app/posts/actions.js" switcher
'use server'
import { redirect } from 'next/navigation'

export async function createPost(formData) {
  // 创建新文章
  // ...

  // 重定向到新文章
  redirect(`/posts/${data.id}`)
}
```

然后，在新页面中，你可以使用 `params` 属性获取数据：

```tsx filename="/app/posts/[id]/page.tsx" switcher
import { getPost } from '@/posts/data'

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getPost(id)

  return (
    <div>
      <h1>{data.title}</h1>
      {/* ... */}
    </div>
  )
}
```

```jsx filename="/app/posts/[id]/page.js" switcher
import { getPost } from '@/posts/data'

export default async function PostPage({ params }) {
  const { id } = await params
  const data = await getPost(id)

  return (
    <div>
      <h1>{data.title}</h1>
      {/* ... */}
    </div>
  )
}
```

有关更多示例，请参阅[服务器操作](/docs/app/building-your-application/data-fetching/server-actions-and-mutations)文档。

</AppOnly>
