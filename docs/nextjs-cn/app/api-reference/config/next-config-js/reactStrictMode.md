---
title: reactStrictMode
description: 完整的 Next.js 运行时现在符合严格模式要求，了解如何选择使用
---

# NextJS中文文档 - ReactStrictMode

> **须知**：自 Next.js 13.5.1 起，严格模式在 `app` 路由中默认为 `true`，所以上述配置仅对 `pages` 路由必要。你仍然可以通过设置 `reactStrictMode: false` 来禁用严格模式。

> **建议**：我们强烈建议你在 Next.js 应用程序中启用严格模式，以便更好地为 React 的未来做准备。

React 的[严格模式](https://react.dev/reference/react/StrictMode)是一个仅用于开发模式的功能，用于突出显示应用程序中的潜在问题。它有助于识别不安全的生命周期、过时的 API 使用以及许多其他功能。

Next.js 运行时符合严格模式要求。要选择使用严格模式，请在 `next.config.js` 中配置以下选项：

```js
module.exports = {
  reactStrictMode: true,
}
```

如果你或你的团队还没有准备好在整个应用程序中使用严格模式，没关系！你可以使用 `<React.StrictMode>` 逐页增量迁移。
