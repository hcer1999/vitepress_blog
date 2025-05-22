---
title: cssChunking
description: 使用 `cssChunking` 选项控制 Next.js 应用程序中 CSS 文件的分块方式。
version: experimental
---

CSS 分块是一种通过将 CSS 文件分割并重新排序为块来提高 Web 应用程序性能的策略。这使你能够只加载特定路由所需的 CSS，而不是一次加载应用程序的所有 CSS。

你可以使用 `next.config.js` 文件中的 `experimental.cssChunking` 选项来控制 CSS 文件的分块方式：

```tsx filename="next.config.ts" switcher
import type { NextConfig } from 'next'

const nextConfig = {
  experimental: {
    cssChunking: true, // 默认值
  },
} satisfies NextConfig

export default nextConfig
```

```js filename="next.config.js" switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cssChunking: true, // 默认值
  },
}

module.exports = nextConfig
```

## 选项

- **`true`（默认）**：Next.js 将尝试尽可能合并 CSS 文件，根据导入顺序确定文件之间的显式和隐式依赖关系，以减少块数量，从而减少请求数量。
- **`false`**：Next.js 不会尝试合并或重新排序你的 CSS 文件。
- **`'strict'`**：Next.js 将按照 CSS 文件导入到你的文件中的正确顺序加载它们，这可能会导致更多的块和请求。

如果你遇到意外的 CSS 行为，可以考虑使用 `'strict'`。例如，如果你在不同文件中以不同的 `import` 顺序（`a` 在 `b` 之前，或 `b` 在 `a` 之前）导入 `a.css` 和 `b.css`，则 `true` 将以任意顺序合并文件，并假设它们之间没有依赖关系。但是，如果 `b.css` 依赖于 `a.css`，你可能希望使用 `'strict'` 来防止文件被合并，而是按照导入顺序加载它们 - 这可能会导致更多的块和请求。

对于大多数应用程序，我们建议使用 `true`，因为它会减少请求数量并提高性能。
