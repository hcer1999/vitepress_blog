---
title: crossOrigin
description: 使用 `crossOrigin` 选项在 `next/script` 生成的 `script` 标签上添加 crossOrigin 属性。
---

使用 `crossOrigin` 选项在由 <AppOnly>[`next/script`](/nextjs-cn/app/building-your-application/routing/layouts-and-templates) 组件</AppOnly> <PagesOnly>[`next/script`]() 和 [`next/head`]() 组件</PagesOnly>生成的所有 `<script>` 标签中添加 [`crossOrigin` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)，并定义如何处理跨域请求。

```js
module.exports = {
  crossOrigin: 'anonymous',
}
```

## 选项

- `'anonymous'`：添加 [`crossOrigin="anonymous"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin#anonymous) 属性。
- `'use-credentials'`：添加 [`crossOrigin="use-credentials"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin#use-credentials) 属性。
