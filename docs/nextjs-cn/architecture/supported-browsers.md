---
title: 支持的浏览器
description: Next.js 支持的浏览器以及支持的 JavaScript 功能。
---

Next.js 支持**现代浏览器**，无需任何配置。

- Chrome 64+
- Edge 79+
- Firefox 67+
- Opera 51+
- Safari 12+

## 浏览器列表

如果你想针对特定的浏览器或功能，Next.js 支持在 `package.json` 文件中配置 [Browserslist](https://browsersl.ist)。Next.js 默认使用以下 Browserslist 配置：

```json
{
  "browserslist": ["chrome 64", "edge 79", "firefox 67", "opera 51", "safari 12"]
}
```

## Polyfills

我们注入了[广泛使用的 polyfills](https://github.com/vercel/next.js/blob/canary/packages/next-polyfill-nomodule/src/index.js)，包括：

- [**fetch()**](https://developer.mozilla.org/docs/Web/API/Fetch_API) — 替代：`whatwg-fetch` 和 `unfetch`。
- [**URL**](https://developer.mozilla.org/docs/Web/API/URL) — 替代：[`url` 包 (Node.js API)](https://nodejs.org/api/url.html)。
- [**Object.assign()**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) — 替代：`object-assign`、`object.assign` 和 `core-js/object/assign`。

如果你的任何依赖项包含这些 polyfills，它们将自动从生产构建中删除，以避免重复。

此外，为了减少包大小，Next.js 将只为需要这些 polyfills 的浏览器加载它们。全球大多数网络流量不会下载这些 polyfills。

### 自定义 Polyfills

如果你自己的代码或任何外部 npm 依赖项需要目标浏览器（如 IE 11）不支持的功能，你需要自己添加 polyfills。

在这种情况下，你应该在[自定义 `<App>`](/docs/nextjs-cn/pages/building-your-application/routing/custom-app) 或单个组件中添加对**特定 polyfill** 的顶级导入。

## JavaScript 语言功能

Next.js 允许你开箱即用地使用最新的 JavaScript 功能。除了 [ES6 功能](https://github.com/lukehoban/es6features)外，Next.js 还支持：

- [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017)
- [对象剩余/展开属性](https://github.com/tc39/proposal-object-rest-spread) (ES2018)
- [动态 `import()`](https://github.com/tc39/proposal-dynamic-import) (ES2020)
- [可选链](https://github.com/tc39/proposal-optional-chaining) (ES2020)
- [空值合并](https://github.com/tc39/proposal-nullish-coalescing) (ES2020)
- [类字段](https://github.com/tc39/proposal-class-fields) 和 [静态属性](https://github.com/tc39/proposal-static-class-features) (ES2022)
- 以及更多！

### TypeScript 功能

Next.js 内置了 TypeScript 支持。[在此了解更多](/docs/nextjs-cn/pages/api-reference/config/typescript)。

### 自定义 Babel 配置（高级）

你可以自定义 babel 配置。[在此了解更多](/docs/nextjs-cn/pages/guides/configuring/babel)。
