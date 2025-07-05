---
title: env
description: 学习如何在构建时在你的 Next.js 应用程序中添加和访问环境变量。
version: legacy
---

<AppOnly>

> 自 [Next.js 9.4](https://nextjs.org/blog/next-4) 发布以来，我们现在有了一种更直观和人性化的[添加环境变量]()的体验。快来试试吧！

</AppOnly>/nextjs-cn/

<PagesOnly>

> 自 [Next.js 9.4](https://nextjs.org/blog/next-4) 发布以来，我们现在有了一种更直观和人性化的[添加环境变量]()的体验。快来试试吧！

</PagesOnly>/nextjs-cn/

<AppOnly>

> **须知**：以这种方式指定的环境变量**始终**会被包含在 JavaScript 包中，只有在[通过环境或 .env 文件]()指定它们时，使用 `NEXT_PUBLIC_` 前缀才会产生效果。

</AppOnly>/nextjs-cn/

<PagesOnly>

> **须知**：以这种方式指定的环境变量**始终**会被包含在 JavaScript 包中，只有在[通过环境或 .env 文件]()指定它们时，使用 `NEXT_PUBLIC_` 前缀才会产生效果。

</PagesOnly>/nextjs-cn/

要将环境变量添加到 JavaScript 包中，打开 `next.config.js` 并添加 `env` 配置：

```js
module.exports = {
  env: {
    customKey: 'my-value',
  },
}
```

现在你可以在代码中访问 `process.env.customKey`。例如：

```jsx
function Page() {
  return <h1>customKey 的值是：{process.env.customKey}</h1>
}

export default Page
```

Next.js 将在构建时将 `process.env.customKey` 替换为 `'my-value'`。由于 webpack [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) 的特性，尝试解构 `process.env` 变量将无法正常工作。

例如，以下代码行：

```jsx
return <h1>customKey 的值是：{process.env.customKey}</h1>
```

最终会变成：

```jsx
return <h1>customKey 的值是：{'my-value'}</h1>
```
