---
title: inlineCss
description: 启用内联 CSS 支持。
version: experimental
---

# NextJS中文文档 - InlineCss

## 使用方法

内联 CSS 到 `<head>` 的实验性支持。当启用此标志时，所有通常生成 `<link>` 标签的地方将改为生成 `<style>` 标签。

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    inlineCss: true,
  },
}

module.exports = nextConfig
```

## 权衡考量

### 何时使用内联 CSS

在以下几种情况下，内联 CSS 可能会带来好处：

- **首次访问用户**：由于 CSS 文件是阻塞渲染的资源，内联可以消除首次访问用户体验到的初始下载延迟，提高页面加载性能。

- **性能指标**：通过减少 CSS 文件的额外网络请求，内联可以显著改善关键指标，如首次内容绘制（FCP）和最大内容绘制（LCP）。

- **慢速连接**：对于使用较慢网络的用户，每个请求都会增加相当大的延迟，内联 CSS 可以通过减少网络往返次数提供明显的性能提升。

- **原子化 CSS 包（如 Tailwind）**：使用功能优先框架如 Tailwind CSS 时，页面所需的样式大小通常相对于设计的复杂性是 O(1) 的。这使得内联成为一个有吸引力的选择，因为当前页面的整套样式轻量且不会随页面大小增长。内联 Tailwind 样式确保了最小的负载并消除了额外网络请求的需求，进一步提升性能。

### 何时不使用内联 CSS

虽然内联 CSS 在性能方面提供了显著的好处，但在某些情况下可能不是最佳选择：

- **大型 CSS 包**：如果你的 CSS 包太大，内联可能会显著增加 HTML 的大小，导致首字节时间（TTFB）变慢，对于慢速连接的用户可能会导致更糟糕的性能。
- **动态或页面特定的 CSS**：对于具有高度动态样式或使用不同 CSS 集的页面的应用程序，内联可能导致冗余和臃肿，因为所有页面的完整 CSS 可能需要重复内联。

- **浏览器缓存**：在访问者频繁返回你的网站的情况下，外部 CSS 文件允许浏览器有效地缓存样式，减少后续访问的数据传输。内联 CSS 消除了这一好处。

仔细评估这些权衡，并考虑将内联与其他策略结合使用，如关键 CSS 提取或混合方法，以获得最适合你网站需求的最佳结果。

> **须知**：
>
> 此功能目前是实验性的，有一些已知的限制：
>
> - CSS 内联是全局应用的，不能在每个页面的基础上进行配置
> - 在初始页面加载期间样式会重复 - 一次在 `<style>` 标签中用于 SSR，一次在 RSC 有效载荷中
> - 当导航到静态渲染的页面时，样式将使用 `<link>` 标签而不是内联 CSS 以避免重复
> - 此功能在开发模式下不可用，仅在生产构建中工作
