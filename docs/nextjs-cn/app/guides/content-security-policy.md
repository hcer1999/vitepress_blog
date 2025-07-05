---
title: 如何为 Next.js 应用程序设置内容安全策略 (CSP)
nav_title: 内容安全策略
description: 学习如何为 Next.js 应用程序设置内容安全策略 (CSP)。
related:
  links:
    - app/building-your-application/routing/middleware
    - app/api-reference/functions/headers
---

[内容安全策略 (CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP) 对于保护你的 Next.js 应用程序免受各种安全威胁（如跨站脚本攻击 (XSS)、点击劫持和其他代码注入攻击）非常重要。

通过使用 CSP，开发者可以指定哪些来源是允许的内容源、脚本、样式表、图像、字体、对象、媒体（音频、视频）、iframe 等。

<details>
  <summary>示例</summary>

- [严格 CSP](https://github.com/vercel/next.js/tree/canary/examples/with-strict-csp)

</details>

## 随机数 (Nonces)

[随机数](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/nonce)是一个唯一的、随机生成的字符串，用于一次性使用。它与 CSP 结合使用，有选择地允许某些内联脚本或样式执行，绕过严格的 CSP 指令。

### 为什么使用随机数？

虽然 CSP 旨在阻止恶意脚本，但在某些情况下，内联脚本是必要的。在这种情况下，随机数提供了一种方式，允许具有正确随机数的脚本执行。

### 使用中间件添加随机数

[中间件](/docs/nextjs-cn/app/building-your-application/routing/index/middleware)使你能够在页面渲染之前添加头部和生成随机数。

每次查看页面时，都应生成一个新的随机数。这意味着你**必须使用动态渲染来添加随机数**。

例如：

```ts switcher
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  // 替换换行符和空格
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}
```

```js switcher
import { NextResponse } from 'next/server'

export function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  // 替换换行符和空格
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}
```

默认情况下，中间件在所有请求上运行。你可以使用 [`matcher`](/docs/nextjs-cn/app/building-your-application/routing/index/middleware#matcher) 过滤中间件，使其仅在特定路径上运行。

我们建议忽略匹配预取请求（来自 `next/link`）和不需要 CSP 头部的静态资源。

```ts switcher
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api（API 路由）
     * - _next/static（静态文件）
     * - _next/image（图像优化文件）
     * - favicon.ico（网站图标文件）
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
```

```js switcher
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api（API 路由）
     * - _next/static（静态文件）
     * - _next/image（图像优化文件）
     * - favicon.ico（网站图标文件）
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
```

### 读取随机数

<PagesOnly>
  你可以使用 [`getServerSideProps`](/docs/nextjs-cn/pages/building-your-application/data-fetching/get-server-side-props) 将随机数提供给你的页面：

```tsx switcher
import Script from 'next/script'

import type { GetServerSideProps } from 'next'

export default function Page({ nonce }) {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const nonce = req.headers['x-nonce']
  return { props: { nonce } }
}
```

```jsx switcher
import Script from 'next/script'
export default function Page({ nonce }) {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}

export async function getServerSideProps({ req }) {
  const nonce = req.headers['x-nonce']
  return { props: { nonce } }
}
```

</PagesOnly>

<AppOnly>

你可以使用 [`headers`](/docs/nextjs-cn/app/api-reference/functions/headers) 从 [服务器组件](/docs/nextjs-cn/app/building-your-application/rendering/server-components) 中读取随机数：

```tsx switcher
import { headers } from 'next/headers'
import Script from 'next/script'

export default async function Page() {
  const nonce = (await headers()).get('x-nonce')

  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}
```

```jsx switcher
import { headers } from 'next/headers'
import Script from 'next/script'

export default async function Page() {
  const nonce = (await headers()).get('x-nonce')

  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}
```

</AppOnly>

## 不使用随机数

对于不需要随机数的应用程序，你可以直接在 [`next.config.js`](/docs/nextjs-cn/app/api-reference/config/next-config-js) 文件中设置 CSP 头部：

```js
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
}
```

## 版本历史

我们建议使用 Next.js 的 `v13.4.20+` 版本来正确处理和应用随机数。
