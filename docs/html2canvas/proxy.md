# html2canvas 中文文档 - 代理

浏览器可用于支持 CORS 内容的不同代理。

`html2canvas` 不会解决浏览器内置的内容政策限制。绘制当前页面源之外的图像时会污染它们所绘制的画布。如果画布受到污染，则无法再读取。如果要加载位于页面源之外的图像，可以使用代理加载图像。

## 可用的代理

- [node.js](https://github.com/niklasvh/html2canvas-proxy-nodejs)
