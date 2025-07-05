---
title: reactMaxHeadersLength
description: React 发出并添加到响应中的头部的最大长度。
---

# NextJS中文文档 - ReactMaxHeadersLength

在静态渲染期间，React 可以发出可添加到响应中的头部。这些头部可用于通过允许浏览器预加载资源（如字体、脚本和样式表）来提高性能。默认值为 `6000`，但你可以通过在 `next.config.js` 中配置 `reactMaxHeadersLength` 选项来覆盖此值：

```js
module.exports = {
  reactMaxHeadersLength: 1000,
}
```

> **须知**：此选项仅在 App Router 中可用。

根据浏览器和服务器之间的代理类型，头部可能会被截断。例如，如果你使用的是不支持长头部的反向代理，则应设置较低的值以确保头部不会被截断。
