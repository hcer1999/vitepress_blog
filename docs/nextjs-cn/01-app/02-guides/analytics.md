---
title: 如何为你的 Next.js 应用程序添加分析功能
nav_title: 分析
description: 使用 Next.js Speed Insights 测量和跟踪页面性能
---

{/_ 本文档的内容在 app 和 pages 路由之间共享。你可以使用 `<PagesOnly>Content</PagesOnly>` 组件来添加仅适用于 Pages 路由的内容。任何共享内容都不应该被包装在组件中。 _/}

Next.js 内置了对测量和报告性能指标的支持。你可以使用 [`useReportWebVitals`](/docs/app/api-reference/functions/use-report-web-vitals) hook 来自行管理报告，或者使用 Vercel 提供的[托管服务](https://vercel.com/analytics?utm_source=next-site&utm_medium=docs&utm_campaign=next-website)来自动收集和可视化指标。

## 客户端检测

对于更高级的分析和监控需求，Next.js 提供了一个 `instrumentation-client.js|ts` 文件，该文件会在你的应用程序的前端代码开始执行之前运行。这非常适合设置全局分析、错误跟踪或性能监控工具。

要使用它，在你的应用程序的根目录创建一个 `instrumentation-client.js` 或 `instrumentation-client.ts` 文件：

```js filename="instrumentation-client.js"
// 在应用程序启动前初始化分析
console.log('Analytics initialized')

// 设置全局错误跟踪
window.addEventListener('error', (event) => {
  // 发送到你的错误跟踪服务
  reportError(event.error)
})
```

## 构建你自己的分析

<PagesOnly>

```jsx filename="pages/_app.js"
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })

  return <Component {...pageProps} />
}
```

查看 [API 参考](/docs/pages/api-reference/functions/use-report-web-vitals)了解更多信息。

</PagesOnly>

<AppOnly>

```jsx filename="app/_components/web-vitals.js"
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
}
```

```jsx filename="app/layout.js"
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

> 由于 `useReportWebVitals` hook 需要 `'use client'` 指令，最高性能的方法是创建一个单独的组件，由根布局导入。这样可以将客户端边界仅限制在 `WebVitals` 组件中。

查看 [API 参考](/docs/app/api-reference/functions/use-report-web-vitals)了解更多信息。

</AppOnly>

## Web Vitals

[Web Vitals](https://web.dev/vitals/) 是一组有用的指标，旨在捕捉网页的用户体验。包括以下所有 web vitals：

- [首字节时间](https://developer.mozilla.org/docs/Glossary/Time_to_first_byte) (TTFB)
- [首次内容绘制](https://developer.mozilla.org/docs/Glossary/First_contentful_paint) (FCP)
- [最大内容绘制](https://web.dev/lcp/) (LCP)
- [首次输入延迟](https://web.dev/fid/) (FID)
- [累积布局偏移](https://web.dev/cls/) (CLS)
- [交互到下一次绘制](https://web.dev/inp/) (INP)

你可以使用 `name` 属性来处理这些指标的所有结果。

<PagesOnly>

```jsx filename="pages/_app.js"
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

```tsx filename="app/_components/web-vitals.tsx" switcher
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

```jsx filename="app/_components/web-vitals.js" switcher
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

- `Next.js-hydration`：页面开始和完成水合所需的时间（以毫秒为单位）
- `Next.js-route-change-to-render`：路由更改后页面开始渲染所需的时间（以毫秒为单位）
- `Next.js-render`：路由更改后页面完成渲染所需的时间（以毫秒为单位）

你可以分别处理这些指标的所有结果：

```js
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'Next.js-hydration':
      // 处理水合结果
      break
    case 'Next.js-route-change-to-render':
      // 处理路由更改到渲染结果
      break
    case 'Next.js-render':
      // 处理渲染结果
      break
    default:
      break
  }
}
```

这些指标在所有支持 [User Timing API](https://caniuse.com/#feat=user-timing) 的浏览器中都可以工作。

</PagesOnly>

## 将结果发送到外部系统

你可以将结果发送到任何端点，以测量和跟踪你的网站上的真实用户性能。例如：

```js
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

> **注意事项**：如果你使用 [Google Analytics](https://analytics.google.com/analytics/web/)，使用 `id` 值可以让你手动构建指标分布（以计算百分位数等）。

> ```js
> useReportWebVitals((metric) => {
>   // 如果你按照这个示例初始化了 Google Analytics，就使用 `window.gtag`：
>   // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
>   window.gtag('event', metric.name, {
>     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // 值必须是整数
>     event_label: metric.id, // id 对当前页面加载是唯一的
>     non_interaction: true, // 避免影响跳出率
>   })
> })
> ```
>
> 阅读更多关于[将结果发送到 Google Analytics](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-analytics) 的信息。
