---
title: 如何优化第三方库
nav_title: 第三方库
description: 使用 `@next/third-parties` 包优化应用程序中第三方库的性能。
---

# NextJS中文文档 - Third Party Libraries

**`@next/third-parties`** 是一个库，提供了一系列组件和工具，用于改善在 Next.js 应用程序中加载流行第三方库的性能和开发者体验。

`@next/third-parties` 提供的所有第三方集成都已针对性能和易用性进行了优化。

## 入门

首先，安装 `@next/third-parties` 库：

```bash
npm install @next/third-parties@latest next@latest
```

`@next/third-parties` 目前是一个处于积极开发中的**实验性**库。在我们努力添加更多第三方集成的同时，我们建议使用 **latest** 或 **canary** 标志进行安装。

## Google 第三方库

所有支持的 Google 第三方库都可以从 `@next/third-parties/google` 导入。

### Google Tag Manager

`GoogleTagManager` 组件可用于在页面中实例化 [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) 容器。默认情况下，它会在页面水合（hydration）发生后获取原始内联脚本。

<AppOnly>

要为所有路由加载 Google Tag Manager，请直接在根布局中包含该组件，并传入你的 GTM 容器 ID：

```tsx switcher
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body>{children}</body>
    </html>
  )
}
```

```jsx switcher
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body>{children}</body>
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

要为所有路由加载 Google Tag Manager，请直接在自定义 `_app` 中包含该组件，并传入你的 GTM 容器 ID：

```jsx
import { GoogleTagManager } from '@next/third-parties/google'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-XYZ" />
    </>
  )
}
```

</PagesOnly>

要为单个路由加载 Google Tag Manager，请在你的页面文件中包含该组件：

<AppOnly>

```jsx
import { GoogleTagManager } from '@next/third-parties/google'

export default function Page() {
  return <GoogleTagManager gtmId="GTM-XYZ" />
}
```

</AppOnly>

<PagesOnly>

```jsx
import { GoogleTagManager } from '@next/third-parties/google'

export default function Page() {
  return <GoogleTagManager gtmId="GTM-XYZ" />
}
```

</PagesOnly>

#### 发送事件

`sendGTMEvent` 函数可用于通过使用 `dataLayer` 对象发送事件来跟踪页面上的用户交互。要使此函数工作，必须在父布局、页面、组件中包含 `<GoogleTagManager />` 组件，或直接在同一文件中包含。

<AppOnly>

```jsx
'use client'

import { sendGTMEvent } from '@next/third-parties/google'

export function EventButton() {
  return (
    <div>
      <button onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}>
        发送事件
      </button>
    </div>
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import { sendGTMEvent } from '@next/third-parties/google'

export function EventButton() {
  return (
    <div>
      <button onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}>
        发送事件
      </button>
    </div>
  )
}
```

</PagesOnly>

请参阅 Tag Manager [开发者文档](https://developers.google.com/tag-platform/tag-manager/datalayer)，了解可以传递给该函数的不同变量和事件。

#### 服务器端标记

如果你使用服务器端标记管理器并从标记服务器提供 `gtm.js` 脚本，可以使用 `gtmScriptUrl` 选项来指定脚本的 URL。

#### 选项

传递给 Google Tag Manager 的选项。有关选项的完整列表，请阅读 [Google Tag Manager 文档](https://developers.google.com/tag-platform/tag-manager/datalayer)。

| 名称            | 类型 | 描述                                                             |
| --------------- | ---- | ---------------------------------------------------------------- |
| `gtmId`         | 必需 | 你的 GTM 容器 ID。通常以 `GTM-` 开头。                           |
| `gtmScriptUrl`  | 可选 | GTM 脚本 URL。默认为 `https://www.googletagmanager.com/gtm.js`。 |
| `dataLayer`     | 可选 | 用于实例化容器的数据层对象。                                     |
| `dataLayerName` | 可选 | 数据层的名称。默认为 `dataLayer`。                               |
| `auth`          | 可选 | 环境片段的身份验证参数值（`gtm_auth`）。                         |
| `preview`       | 可选 | 环境片段的预览参数值（`gtm_preview`）。                          |

### Google Analytics

`GoogleAnalytics` 组件可用于通过 Google 标签（`gtag.js`）将 [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4) 添加到你的页面。默认情况下，它会在页面水合后获取原始脚本。

> **建议**：如果你的应用程序中已经包含了 Google Tag Manager，你可以直接使用它来配置 Google Analytics，而不是将 Google Analytics 作为单独的组件包含进来。请参阅[文档](https://developers.google.com/analytics/devguides/collection/ga4/tag-options#what-is-gtm)了解有关 Tag Manager 和 `gtag.js` 之间差异的更多信息。

<AppOnly>

要为所有路由加载 Google Analytics，请直接在你的根布局中包含该组件并传入你的测量 ID：

```tsx switcher
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
```

```jsx switcher
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
```

</AppOnly>

<PagesOnly>

要为所有路由加载 Google Analytics，请直接在你的自定义 `_app` 中包含该组件并传入你的测量 ID：

```jsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-XYZ" />
    </>
  )
}
```

</PagesOnly>

要为单个路由加载 Google Analytics，请在你的页面文件中包含该组件：

<AppOnly>

```jsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Page() {
  return <GoogleAnalytics gaId="G-XYZ" />
}
```

</AppOnly>

<PagesOnly>

```jsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Page() {
  return <GoogleAnalytics gaId="G-XYZ" />
}
```

</PagesOnly>

#### 发送事件

`sendGAEvent` 函数可用于通过使用 `dataLayer` 对象发送事件来测量页面上的用户交互。要使此函数工作，必须在父布局、页面、组件中包含 `<GoogleAnalytics />` 组件，或直接在同一文件中包含。

<AppOnly>

```jsx
'use client'

import { sendGAEvent } from '@next/third-parties/google'

export function EventButton() {
  return (
    <div>
      <button onClick={() => sendGAEvent('event', 'buttonClicked', { value: 'xyz' })}>
        发送事件
      </button>
    </div>
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import { sendGAEvent } from '@next/third-parties/google'

export function EventButton() {
  return (
    <div>
      <button onClick={() => sendGAEvent('event', 'buttonClicked', { value: 'xyz' })}>
        发送事件
      </button>
    </div>
  )
}
```

</PagesOnly>

请参阅 Google Analytics [开发者文档](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters)，了解有关事件参数的更多信息。

#### 跟踪页面浏览

Google Analytics 会自动跟踪页面浏览，当浏览器历史状态发生变化时。这意味着客户端在 Next.js 路由之间导航时会发送页面浏览数据，而无需任何配置。

要确保客户端导航正确测量，请验证你的管理面板中的 [_"增强测量"_](https://support.google.com/analytics/answer/9216061#enable_disable) 属性已启用，并且 _"页面基于浏览器历史事件更改"_ 复选框已选择。

> **注意**：如果你决定手动发送页面浏览事件，请确保禁用默认页面浏览测量，以避免重复数据。请参阅 Google Analytics [开发者文档](https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#manual_pageviews)，了解有关更多信息。

#### 选项

传递给 `<GoogleAnalytics>` 组件的选项。

| 名称            | 类型 | 描述                                                                                     |
| --------------- | ---- | ---------------------------------------------------------------------------------------- |
| `gaId`          | 必需 | 你的 [测量 ID](https://support.google.com/analytics/answer/12270356)。通常以 `G-` 开头。 |
| `dataLayerName` | 可选 | 数据层的名称。默认为 `dataLayer`。                                                       |
| `nonce`         | 可选 | 一个 [nonce]()。                                                                         |

### Google Maps Embed/nextjs-cn/

`GoogleMapsEmbed` 组件可用于向页面添加 [Google Maps Embed](https://developers.google.com/maps/documentation/embed/embedding-map)。默认情况下，它使用 `loading` 属性来延迟加载嵌入式地图，直到页面折叠以下。

<AppOnly>

```jsx
import { GoogleMapsEmbed } from '@next/third-parties/google'

export default function Page() {
  return (
    <GoogleMapsEmbed
      apiKey="XYZ"
      height={200}
      width="100%"
      mode="place"
      q="Brooklyn+Bridge,New+York,NY"
    />
  )
}
```

</AppOnly>

<PagesOnly>

```jsx
import { GoogleMapsEmbed } from '@next/third-parties/google'

export default function Page() {
  return (
    <GoogleMapsEmbed
      apiKey="XYZ"
      height={200}
      width="100%"
      mode="place"
      q="Brooklyn+Bridge,New+York,NY"
    />
  )
}
```

</PagesOnly>

#### 选项

传递给 Google Maps Embed 的选项。有关选项的完整列表，请阅读 [Google Map Embed 文档](https://developers.google.com/maps/documentation/embed/embedding-map)。

| 名称              | 类型 | 描述                                                                                                |
| ----------------- | ---- | --------------------------------------------------------------------------------------------------- |
| `apiKey`          | 必需 | 你的 api 密钥。                                                                                     |
| `mode`            | 必需 | [地图模式](https://developers.google.com/maps/documentation/embed/embedding-map#choosing_map_modes) |
| `height`          | 可选 | 嵌入式的高度。默认为 `auto`。                                                                       |
| `width`           | 可选 | 嵌入式的宽度。默认为 `auto`。                                                                       |
| `style`           | 可选 | 将样式传递给 iframe。                                                                               |
| `allowfullscreen` | 可选 | 允许某些地图部分全屏显示的属性。                                                                    |
| `loading`         | 可选 | 默认为懒惰。如果你知道你的嵌入式将位于折叠之上，请考虑更改。                                        |
| `q`               | 可选 | 定义地图标记位置。 _这可能取决于地图模式而需要。_                                                   |
| `center`          | 可选 | 定义地图视图的中心。                                                                                |
| `zoom`            | 可选 | 设置地图的初始缩放级别。                                                                            |
| `maptype`         | 可选 | 定义要加载的地图瓦片类型。                                                                          |
| `language`        | 可选 | 定义用于 UI 元素和地图瓦片上标签显示的语言。                                                        |
| `region`          | 可选 | 定义基于地理政治敏感性的适当边界和标签显示。                                                        |

### YouTube Embed

`YouTubeEmbed` 组件可用于加载和显示 YouTube 嵌入。此组件使用 [`lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed) 在后台加载更快。

<AppOnly>

```jsx
import { YouTubeEmbed } from '@next/third-parties/google'

export default function Page() {
  return <YouTubeEmbed videoid="dQw4w9WgXcQ" height={400} params="controls=0" />
}
```

</AppOnly>

<PagesOnly>

```jsx
import { YouTubeEmbed } from '@next/third-parties/google'

export default function Page() {
  return <YouTubeEmbed videoid="dQw4w9WgXcQ" height={400} params="controls=0" />
}
```

</PagesOnly>

#### 选项

| 名称        | 类型 | 描述                                                                                                                                                                              |
| ----------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `videoid`   | 必需 | YouTube 视频 ID。                                                                                                                                                                 |
| `width`     | 可选 | 视频容器的宽度。默认为 `auto`                                                                                                                                                     |
| `height`    | 可选 | 视频容器的高度。默认为 `auto`                                                                                                                                                     |
| `playlabel` | 可选 | 用于可访问性的视觉隐藏播放按钮标签。                                                                                                                                              |
| `params`    | 可选 | 定义[这里](https://developers.google.com/youtube/player_parameters#Parameters)的视频播放器参数。<br/>参数作为查询参数字符串传递。<br/>例如：`params="controls=0&start=10&end=30"` |
| `style`     | 可选 | 用于将样式应用于视频容器。                                                                                                                                                        |
