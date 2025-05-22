---
title: poweredByHeader
description: Next.js 默认会添加 `x-powered-by` 头部。在这里了解如何选择不使用它。
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<PagesOnly>Content</PagesOnly>` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

默认情况下，Next.js 会添加 `x-powered-by` 头部。要选择不使用它，打开 `next.config.js` 并禁用 `poweredByHeader` 配置：

```js filename="next.config.js"
module.exports = {
  poweredByHeader: false,
}
```
