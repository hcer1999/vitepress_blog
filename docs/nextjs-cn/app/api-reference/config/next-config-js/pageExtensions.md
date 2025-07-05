---
title: pageExtensions
description: 扩展 Next.js 在页面路由器中解析页面时使用的默认页面扩展名
---

<AppOnly>

默认情况下，Next.js 接受具有以下扩展名的文件：`.tsx`、`.ts`、`.jsx`、`.js`。这可以修改为允许其他扩展名，如 markdown（`.md`、`.mdx`）。

```js
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)
```

</AppOnly>

<PagesOnly>

你可以扩展 Next.js 使用的默认页面扩展名（`.tsx`、`.ts`、`.jsx`、`.js`）。在 `next.config.js` 中，添加 `pageExtensions` 配置：

```js
module.exports = {
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
}
```

更改这些值会影响 _所有_ Next.js 页面，包括以下内容：

- [`middleware.js`](/docs/nextjs-cn/pages/building-your-application/routing/middleware)
- [`instrumentation.js`](/docs/nextjs-cn/pages/guides/configuring/instrumentation)
- `pages/_document.js`
- `pages/_app.js`
- `pages/api/`

例如，如果你将 `.ts` 页面扩展名重新配置为 `.page.ts`，你需要重命名页面，如 `middleware.page.ts`、`instrumentation.page.ts`、`_app.page.ts`。

## 在 `pages` 目录中包含非页面文件

你可以在 `pages` 目录中共同放置测试文件或组件使用的其他文件。在 `next.config.js` 中，添加 `pageExtensions` 配置：

```js
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
}
```

然后，将你的页面重命名为包含 `.page` 的文件扩展名（例如，将 `MyPage.tsx` 重命名为 `MyPage.page.tsx`）。确保你重命名 _所有_ Next.js 页面，包括上面提到的文件。

</PagesOnly>
