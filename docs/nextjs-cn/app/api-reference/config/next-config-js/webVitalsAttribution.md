---
title: webVitalsAttribution
description: 了解如何使用 webVitalsAttribution 选项定位 Web Vitals 问题的来源
version: experimental
---

# NextJS中文文档 - WebVitalsAttribution

在调试与 Web Vitals 相关的问题时，能够准确定位问题来源通常会很有帮助。
例如，对于累积布局偏移（CLS），我们可能想知道单次最大布局偏移发生时最先移动的元素是什么。
或者，对于最大内容绘制（LCP），我们可能想要识别页面上对应 LCP 的元素。
如果 LCP 元素是一个图片，知道图片资源的 URL 可以帮助我们找到需要优化的资源。

确定 Web Vitals 分数的最大贡献者，即[归因（attribution）](https://github.com/GoogleChrome/web-vitals/blob/4ca38ae64b8d1e899028c692f94d4c56acfc996c/README.md#attribution)，
允许我们获取更深入的信息，如 [PerformanceEventTiming](https://developer.mozilla.org/docs/Web/API/PerformanceEventTiming)、[PerformanceNavigationTiming](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming) 和 [PerformanceResourceTiming](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming) 的条目。

在 Next.js 中，归因默认是禁用的，但可以通过在 `next.config.js` 中指定以下内容来**按指标**启用。

```js
module.exports = {
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },
}
```

有效的归因值是 [`NextWebVitalsMetric`](https://github.com/vercel/next.js/blob/442378d21dd56d6e769863eb8c2cb521a463a2e0/packages/next/shared/lib/utils.ts#L43) 类型中指定的所有 `web-vitals` 指标。
