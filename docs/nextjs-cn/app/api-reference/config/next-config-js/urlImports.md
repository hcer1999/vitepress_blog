---
title: urlImports
description: 配置 Next.js 允许从外部 URL 导入模块
version: experimental
---

URL 导入是一项实验性功能，允许你直接从外部服务器导入模块（而不是从本地磁盘导入）。

> **警告**：只使用你信任的域名来下载和在你的机器上执行代码。在该功能被标记为稳定之前，请谨慎使用。

要启用该功能，请在 `next.config.js` 中添加允许的 URL 前缀：

```js
module.exports = {
  experimental: {
    urlImports: ['https://example.com/assets/', 'https://cdn.skypack.dev'],
  },
}
```

然后，你可以直接从 URL 导入模块：

```js
import { a, b, c } from 'https://example.com/assets/some/module.js'
```

URL 导入可以在任何可以使用正常包导入的地方使用。

## 安全模型

这个功能在设计时将**安全作为最高优先级**。首先，我们添加了一个实验性标志，强制你明确允许接受 URL 导入的域名。我们正在努力进一步限制 URL 导入，使其使用 [Edge 运行时](/nextjs-cn/app/api-reference/edge) 在浏览器沙箱中执行。

## 锁定文件/nextjs-cn/

使用 URL 导入时，Next.js 将创建一个 `next.lock` 目录，其中包含锁定文件和获取的资源。
这个目录**必须提交到 Git**，不能被 `.gitignore` 忽略。

- 运行 `next dev` 时，Next.js 将下载并将所有新发现的 URL 导入添加到你的锁定文件中。
- 运行 `next build` 时，Next.js 将仅使用锁定文件来构建生产应用程序。

通常，不需要网络请求，任何过时的锁定文件都会导致构建失败。
一个例外是响应为 `Cache-Control: no-cache` 的资源。
这些资源在锁定文件中将有一个 `no-cache` 条目，并且在每次构建时都会从网络获取。

## 示例

### Skypack

```js
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    confetti()
  })
  return <p>Hello</p>
}
```

### 静态图像导入

```js
import Image from 'next/image'
import logo from 'https://example.com/assets/logo.png'

export default () => (
  <div>
    <Image src={logo} placeholder="blur" />
  </div>
)
```

### CSS 中的 URL

```css
.className {
  background: url('https://example.com/assets/hero.jpg');
}
```

### 资源导入

```js
const logo = new URL('https://example.com/assets/file.txt', import.meta.url)

console.log(logo.pathname)

// 打印 "/_next/static/media/file.a9727b5d.txt"
```
