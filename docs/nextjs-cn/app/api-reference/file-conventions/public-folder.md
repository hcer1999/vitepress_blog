---
title: public 文件夹
nav_title: public
description: Next.js 允许你在 public 目录中提供静态文件，如图像。在这里你可以了解它是如何工作的。
---

Next.js 可以通过根目录下名为 `public` 的文件夹提供静态文件，如图像。`public` 内的文件可以从根 URL (`/`) 开始被你的代码引用。

例如，文件 `public/avatars/me.png` 可以通过访问 `/avatars/me.png` 路径查看。显示该图像的代码可能如下所示：

```jsx
import Image from 'next/image'

export function Avatar({ id, alt }) {
  return <Image src={`/avatars/${id}.png`} alt={alt} width="64" height="64" />
}

export function AvatarOfMe() {
  return <Avatar id="me" alt="我的肖像" />
}
```

## 缓存

Next.js 不能安全地缓存 `public` 文件夹中的资源，因为它们可能会变化。应用的默认缓存头是：

```jsx
Cache-Control: public, max-age=0
```

## Robots、网站图标和其他文件

<PagesOnly>

该文件夹对于 `robots.txt`、`favicon.ico`、Google 站点验证和任何其他静态文件（包括 `.html`）也很有用。但请确保没有与 `pages/` 目录中的文件同名的静态文件，因为这将导致错误。[了解更多](/docs/messages/conflicting-public-file-page)。

</PagesOnly>

<AppOnly>

对于静态元数据文件，如 `robots.txt`、`favicon.ico` 等，你应该使用 `app` 文件夹中的[特殊元数据文件](/docs/nextjs-cn/app/api-reference/file-conventions/metadata)。

</AppOnly>

## 版本历史

| 版本     | 变更                   |
| -------- | ---------------------- |
| `v9.0.0` | 引入 `public` 文件夹。 |
