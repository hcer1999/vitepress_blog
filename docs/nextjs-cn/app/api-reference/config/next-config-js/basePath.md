---
title: basePath
description: 使用 `basePath` 在域名的子路径下部署 Next.js 应用程序。
---

# NextJS中文文档 - BasePath

要在域名的子路径下部署 Next.js 应用程序，你可以使用 `basePath` 配置选项。

`basePath` 允许你为应用程序设置路径前缀。例如，要使用 `/docs` 而不是 `''`（空字符串，默认值），打开 `next.config.js` 并添加 `basePath` 配置：

```js
module.exports = {
  basePath: '/docs',
}
```

> **须知**：这个值必须在构建时设置，并且在不重新构建的情况下无法更改，因为该值被内联到了客户端包中。

### 链接

当使用 `next/link` 和 `next/router` 链接到其他页面时，`basePath` 将被自动应用。

例如，当 `basePath` 设置为 `/docs` 时，使用 `/about` 将自动变为 `/docs/about`。

```js
export default function HomePage() {
  return (
    <>
      <Link href="/about">关于页面</Link>
    </>
  )
}
```

输出的 HTML：

```html
<a href="/docs/about">关于页面</a>
```

这确保了在更改 `basePath` 值时，你不必更改应用程序中的所有链接。

### 图片

<AppOnly>

当使用 [`next/image`](/nextjs-cn/app/api-reference/components/image) 组件时，你需要在 `src` 前面添加 `basePath`。

</AppOnly>/nextjs-cn/

<PagesOnly>

当使用 [`next/image`](/nextjs-cn/pages/api-reference/components/image) 组件时，你需要在 `src` 前面添加 `basePath`。

</PagesOnly>/nextjs-cn/

例如，当 `basePath` 设置为 `/docs` 时，使用 `/docs/me.png` 将正确地提供你的图片。

```jsx
import Image from 'next/image'

function Home() {
  return (
    <>
      <h1>我的主页</h1>
      <Image src="/docs/me.png" alt="作者的照片" width={500} height={500} />
      <p>欢迎来到我的主页！</p>
    </>
  )
}

export default Home
```
