---
title: useReportWebVitals
description: useReportWebVitals 函数的 API 参考。
---

`useReportWebVitals` 钩子允许你报告 [Core Web Vitals](https://web.dev/vitals/)，并可以与你的分析服务结合使用。

<PagesOnly>

```jsx
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })

  return <Component {...pageProps} />
}
```

</PagesOnly>

<AppOnly>

```jsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })

  return null
}
```

```jsx
import { WebVitals } from './_components/web-vitals'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  )
}
```

> 由于 `useReportWebVitals` 钩子需要 `'use client'` 指令，最高性能的方法是创建一个单独的组件，由根布局导入。这将客户端边界专门限制在 `WebVitals` 组件中。

</AppOnly>

## useReportWebVitals

作为钩子参数传递的 `metric` 对象包含多个属性：

- `id`：当前页面加载上下文中指标的唯一标识符
- `name`：性能指标的名称。可能的值包括特定于 Web 应用程序的 [Web Vitals](#web-vitals) 指标名称（TTFB、FCP、LCP、FID、CLS）。
- `delta`：指标当前值与先前值之间的差异。该值通常以毫秒为单位，表示指标值随时间的变化。
- `entries`：与指标相关的 [Performance Entries](https://developer.mozilla.org/docs/Web/API/PerformanceEntry) 数组。这些条目提供了与指标相关的性能事件的详细信息。
- `navigationType`：指示触发指标收集的[导航类型](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming/type)。可能的值包括 `"navigate"`、`"reload"`、`"back_forward"` 和 `"prerender"`。
- `rating`：指标值的定性评级，提供性能评估。可能的值是 `"good"`、`"needs-improvement"` 和 `"poor"`。评级通常通过将指标值与预定义的阈值进行比较来确定，这些阈值表示可接受或次优的性能。
- `value`：性能条目的实际值或持续时间，通常以毫秒为单位。该值提供了指标所跟踪的性能方面的定量度量。值的来源取决于所测量的特定指标，可以来自各种 [Performance API](https://developer.mozilla.org/docs/Web/API/Performance_API)。

## Web Vitals

[Web Vitals](https://web.dev/vitals/) 是一组有用的指标，旨在捕捉网页的用户体验。包含以下所有 web vitals：

- [首字节时间](https://developer.mozilla.org/docs/Glossary/Time_to_first_byte) (TTFB)
- [首次内容绘制](https://developer.mozilla.org/docs/Glossary/First_contentful_paint) (FCP)
- [最大内容绘制](https://web.dev/lcp/) (LCP)
- [首次输入延迟](https://web.dev/fid/) (FID)
- [累积布局偏移](https://web.dev/cls/) (CLS)
- [交互到下一次绘制](https://web.dev/inp/) (INP)

你可以使用 `name` 属性处理这些指标的所有结果。

<PagesOnly>

```jsx
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP': {
        // 处理 FCP 结果
      }
      case 'LCP': {
        // 处理 LCP 结果
      }
      // ...
    }
  })

  return <Component {...pageProps} />
}
```

</PagesOnly>

<AppOnly>

```tsx switcher
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP': {
        // 处理 FCP 结果
      }
      case 'LCP': {
        // 处理 LCP 结果
      }
      // ...
    }
  })
}
```

```jsx switcher
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP': {
        // 处理 FCP 结果
      }
      case 'LCP': {
        // 处理 LCP 结果
      }
      // ...
    }
  })
}
```

</AppOnly>

<PagesOnly>

## 自定义指标

除了上面列出的核心指标外，还有一些额外的自定义指标，用于测量页面水合和渲染所需的时间：

- `Next.js-hydration`：页面开始并完成水合所需的时间长度（以毫秒为单位）
- `Next.js-route-change-to-render`：路由变更后页面开始渲染所需的时间长度（以毫秒为单位）
- `Next.js-render`：路由变更后页面完成渲染所需的时间长度（以毫秒为单位）

你可以单独处理这些指标的所有结果：

```jsx
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'Next.js-hydration':
        // 处理水合结果
        break
      case 'Next.js-route-change-to-render':
        // 处理路由变更到渲染结果
        break
      case 'Next.js-render':
        // 处理渲染结果
        break
      default:
        break
    }
  })

  return <Component {...pageProps} />
}
```

这些指标在支持 [User Timing API](https://caniuse.com/#feat=user-timing) 的所有浏览器中都有效。

</PagesOnly>

## 将结果发送到外部系统

你可以将结果发送到任何端点，以测量和跟踪站点上的真实用户性能。例如：

```jsx
useReportWebVitals((metric) => {
  const body = JSON.stringify(metric)
  const url = 'https://example.com/analytics'

  // 如果可用，使用 `navigator.sendBeacon()`，否则回退到 `fetch()`。
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
})
```

> **须知**：如果你使用 [Google Analytics](https://analytics.google.com/analytics/web/)，使用 `id` 值可以让你手动构建指标分布（用于计算百分位数等）。

> ```js
> useReportWebVitals(metric => {
>   // 如果你按照这个示例初始化了 Google Analytics，请使用 `window.gtag`：
>   // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
>   window.gtag('event', metric.name, {
>     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // 值必须是整数
>     event_label: metric.id, // id 对当前页面加载是唯一的
>     non_interaction: true, // 避免影响跳出率
>   });
> }
> ```
>
> 阅读更多关于[将结果发送到 Google Analytics](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-analytics) 的信息。
