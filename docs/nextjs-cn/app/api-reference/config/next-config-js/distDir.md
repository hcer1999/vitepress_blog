---
title: distDir
description: 设置自定义构建目录，而不使用默认的 .next 目录。
---

# NextJS中文文档 - DistDir

你可以指定一个名称作为自定义构建目录，而不使用默认的 `.next`。

打开 `next.config.js` 并添加 `distDir` 配置：

```js
module.exports = {
  distDir: 'build',
}
```

现在如果你运行 `next build`，Next.js 将使用 `build` 而不是默认的 `.next` 文件夹。

> `distDir` **不应该**离开你的项目目录。例如，`../build` 是一个**无效的**目录。
