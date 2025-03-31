# html2canvas 中文文档 - 入门

了解如何开始使用 `html2canvas`。

# 安装

你可以通过 npm 或者下载已建立的版本来安装 `html2canvas`。

::: code-group

```bash [npm]
npm install html2canvas
```

```bash [yarn]
yarn add html2canvas
```

```bash [pnpm]
pnpm add html2canvas
```

:::

# 用法

使用带有一些（可选）选项的 `html2canvas` 渲染元素，简单的例子 `html2canvas(element, options)`

```js
import html2canvas from 'html2canvas'

html2canvas(document.body).then(function (canvas) {
  document.body.appnedChild(canvas)
})
```
