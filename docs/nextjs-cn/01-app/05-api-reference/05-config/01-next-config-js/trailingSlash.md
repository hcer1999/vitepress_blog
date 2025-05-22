---
title: trailingSlash
description: 配置 Next.js 页面是否使用尾部斜杠进行解析
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<PagesOnly>Content</PagesOnly>` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

默认情况下，Next.js 会将带有尾部斜杠的 URL 重定向到不带尾部斜杠的对应 URL。例如，`/about/` 将重定向到 `/about`。你可以配置此行为以相反的方式运行，即将不带尾部斜杠的 URL 重定向到带有尾部斜杠的对应 URL。

打开 `next.config.js` 并添加 `trailingSlash` 配置：

```js filename="next.config.js"
module.exports = {
  trailingSlash: true,
}
```

设置此选项后，像 `/about` 这样的 URL 将重定向到 `/about/`。

当使用 `trailingSlash: true` 时，某些 URL 是例外的，不会附加尾部斜杠：

- 静态文件 URL，如带有扩展名的文件。
- `.well-known/` 下的任何路径。

例如，以下 URL 将保持不变：`/file.txt`、`images/photos/picture.png` 和 `.well-known/subfolder/config.json`。

当与 [`output: "export"`](/docs/app/guides/static-exports) 配置一起使用时，`/about` 页面将输出 `/about/index.html`（而不是默认的 `/about.html`）。

## 版本历史

| 版本     | 变更                     |
| -------- | ------------------------ |
| `v9.5.0` | 添加了 `trailingSlash`。 |
