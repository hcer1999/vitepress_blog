---
title: Next.js 中文文档 - Script
description: 使用Next.js Script组件优化外部脚本加载。
---

# Next.js 中文文档 - Script 组件

Next.js的`Script`组件是对HTML`<script>`元素的扩展，提供了额外的优化选项，以便更好地控制第三方脚本的加载。通过优先级设置和加载策略，你可以确保重要脚本优先加载，同时不会阻塞页面渲染。

## 导入

```jsx
import Script from 'next/script'
```

## 属性

### `src`

脚本的源URL，可以是外部URL或本地路径。

```jsx
<Script src="https://example.com/analytics.js" />
```

### `strategy`

定义脚本的加载策略，可选值：

- `beforeInteractive`：在页面可交互之前加载（仅在根布局中有效）
- `afterInteractive`：（默认）在页面可交互后立即加载
- `lazyOnload`：在浏览器空闲时加载
- `worker`：（实验性）在Web Worker中加载

```jsx
<Script src="https://example.com/analytics.js" strategy="afterInteractive" />
```

### `onLoad`

脚本加载完成后执行的函数。仅在客户端组件中生效。

```jsx
'use client'

export default function Page() {
  return (
    <Script
      src="https://example.com/analytics.js"
      onLoad={() => {
        console.log('脚本加载完成')
        // 初始化分析
        window.analytics.init()
      }}
    />
  )
}
```

### `onReady`

脚本每次加载并执行后调用的函数。仅在客户端组件中生效。

```jsx
'use client'

export default function Page() {
  return (
    <Script
      src="https://example.com/analytics.js"
      onReady={() => {
        console.log('脚本准备就绪')
        // 当组件挂载和重新挂载时执行
      }}
    />
  )
}
```

### `onError`

脚本加载失败时执行的函数。仅在客户端组件中生效。

```jsx
'use client'

export default function Page() {
  return (
    <Script
      src="https://example.com/analytics.js"
      onError={(error) => {
        console.error('脚本加载失败', error)
        // 上报错误或使用备选方案
      }}
    />
  )
}
```

### 其他属性

`Script`组件支持所有标准的HTML`<script>`标签属性，例如：

- `id`：脚本的唯一标识符
- `async`：异步加载脚本
- `defer`：延迟执行脚本
- `crossOrigin`：跨域加载设置
- `integrity`：内容完整性校验
- `noModule`：仅在不支持ES模块的浏览器上加载
- `nonce`：内容安全政策nonce值
- `type`：脚本类型

## 基本用法

### 添加第三方脚本

```jsx
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <html lang="zh">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  )
}
```

### 内联脚本

可以通过直接在`Script`组件内编写代码或使用`dangerouslySetInnerHTML`添加内联脚本：

```jsx
<Script id="show-banner" strategy="afterInteractive">
  {`document.getElementById('banner').classList.remove('hidden')`}
</Script>

// 或者

<Script
  id="show-banner"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `document.getElementById('banner').classList.remove('hidden')`,
  }}
/>
```

## 加载策略

### beforeInteractive

用于需要在页面交互前加载的关键脚本。这些脚本将在React开始渲染前加载，并在Next.js的hydration过程中立即执行。**仅在根布局(`app/layout.js`)中有效**。

```jsx
// app/layout.js
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        {children}
        <Script src="https://example.com/polyfill.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
```

适用场景：

- Polyfill脚本
- Bot检测库
- 隐私管理工具
- 用户权限管理脚本

### afterInteractive （默认）

页面变为可交互后立即加载。比大多数第三方脚本优先级高，但不会阻塞页面渲染。

```jsx
<Script src="https://example.com/analytics.js" strategy="afterInteractive" />
```

适用场景：

- 分析工具
- 客户支持插件
- 非关键功能脚本

### lazyOnload

在浏览器空闲时加载，优先级最低。

```jsx
<Script src="https://example.com/chat-widget.js" strategy="lazyOnload" />
```

适用场景：

- 聊天插件
- 社交媒体小部件
- 调查问卷工具
- 低优先级的背景功能

### worker (实验性)

在Web Worker中加载脚本，不影响主线程。需要启用 `nextScriptWorkers` 标志。

```jsx
// next.config.js
module.exports = {
  experimental: {
    nextScriptWorkers: true,
  },
}
```

```jsx
<Script src="https://example.com/heavy-computation.js" strategy="worker" />
```

适用场景：

- 计算密集型任务
- 不需要直接访问DOM的脚本
- 后台处理脚本

## 在App Router中的位置及作用域

1. **根布局（app/layout.js）**

   - 全局应用的脚本
   - 唯一可以使用`beforeInteractive`策略的位置
   - 作用于所有页面

2. **特定布局（app/[section]/layout.js）**

   - 特定部分应用的脚本
   - 仅作用于该布局覆盖的路由

3. **页面组件（app/page.js）**
   - 特定页面的脚本
   - 仅在该页面加载

## 按需加载

使用回调函数实现按需加载：

```jsx
'use client'

import { useState } from 'react'
import Script from 'next/script'

export default function Map() {
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <>
      {/* 只在用户点击按钮时加载地图脚本 */}
      {mapLoaded && (
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"
          onLoad={() => {
            // 初始化地图
            new window.google.maps.Map(document.getElementById('map'), {
              center: { lat: -34.397, lng: 150.644 },
              zoom: 8,
            })
          }}
        />
      )}

      <div id="map" style={{ height: '500px', width: '100%' }} />
      <button onClick={() => setMapLoaded(true)}>加载地图</button>
    </>
  )
}
```

## 应用程序生命周期中的脚本加载

### 加载顺序

各种策略的脚本加载顺序如下：

1. `beforeInteractive` 脚本（在根布局中）
2. Next.js代码和页面框架
3. `afterInteractive` 脚本（默认加载方式）
4. `lazyOnload` 脚本（浏览器空闲时）

### 页面转换期间的行为

当用户在应用程序内导航时：

- 已加载的脚本不会重新加载
- 带有`onLoad`回调的脚本只会在首次加载时执行回调
- 带有`onReady`回调的脚本每次都会执行回调
- 通过客户端条件加载的脚本将根据条件在新页面上重新评估

## 常见第三方脚本示例

### Google Analytics (GA4)

```jsx
// app/layout.js
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}
```

### Google Tag Manager

```jsx
// app/layout.js
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
```

### Facebook Pixel

```jsx
// app/layout.js
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        {children}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  )
}
```

## 最佳实践

### 性能优化

1. **使用正确的策略**：为每个脚本选择合适的加载策略
2. **避免过早加载**：不必要的脚本使用`lazyOnload`
3. **最小化`beforeInteractive`脚本**：限制在根布局中使用的`beforeInteractive`脚本数量
4. **按需加载**：条件性地加载仅在特定交互后需要的脚本

### 安全性

1. **使用`integrity`属性**：添加子资源完整性(SRI)哈希来防止脚本被篡改

```jsx
<Script
  src="https://example.com/library.js"
  integrity="sha384-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  crossOrigin="anonymous"
/>
```

2. **使用`nonce`属性**：配合内容安全策略(CSP)使用

```jsx
<Script src="https://example.com/library.js" nonce="random-nonce-value" />
```

### 维护性

1. **集中管理**：将所有第三方脚本集中在公共组件或配置中
2. **添加文档**：通过注释解释每个脚本的用途和重要性
3. **使用环境变量**：将API密钥和ID存储在环境变量中，而不是硬编码

```jsx
<Script
  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
  strategy="lazyOnload"
/>
```

## 错误处理和调试

### 监听加载错误

```jsx
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <Script
      src="https://example.com/analytics.js"
      onError={(e) => {
        console.error('脚本加载失败:', e)
        // 发送错误报告到监控系统
        sendErrorReport({
          type: 'SCRIPT_ERROR',
          script: 'analytics.js',
          error: e.message,
        })
      }}
    />
  )
}
```

### 检测脚本是否真正执行

```jsx
'use client'

import { useState } from 'react'
import Script from 'next/script'

export default function Page() {
  const [scriptExecuted, setScriptExecuted] = useState(false)

  return (
    <>
      <Script
        src="https://example.com/widget.js"
        onLoad={() => {
          // 检查脚本是否实际初始化了预期对象
          if (window.ExampleWidget) {
            setScriptExecuted(true)
            console.log('脚本成功加载并执行')
          } else {
            console.error('脚本加载但未正确执行')
          }
        }}
      />
      {scriptExecuted ? <p>小部件已准备就绪!</p> : <p>小部件加载中...</p>}
    </>
  )
}
```

## 与传统方法的比较

| 功能           | Script 组件               | 传统 script 标签           |
| -------------- | ------------------------- | -------------------------- |
| 页面加载策略   | ✅ 多种加载策略           | ❌ 仅基本属性(async/defer) |
| 自动性能优化   | ✅ 基于策略               | ❌ 需手动优化              |
| 生命周期回调   | ✅ onLoad/onReady/onError | ❌ 仅原生事件              |
| 重复加载预防   | ✅ 自动处理               | ❌ 需手动处理              |
| Web Worker支持 | ✅ 实验性支持             | ❌ 需手动实现              |

## 相关资源

- [Next.js Script文档](https://nextjs.org/docs/app/api-reference/components/script)
- [Web性能优化](https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript)
- [子资源完整性(SRI)](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity)
