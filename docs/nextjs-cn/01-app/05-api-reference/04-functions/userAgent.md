---
title: userAgent
description: userAgent 辅助函数扩展了 Web 请求 API，提供了额外的属性和方法来与请求中的用户代理对象进行交互。
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<PagesOnly>Content</PagesOnly>` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

`userAgent` 辅助函数扩展了 [Web 请求 API](https://developer.mozilla.org/docs/Web/API/Request)，提供了额外的属性和方法来与请求中的用户代理对象进行交互。

```ts filename="middleware.ts" switcher
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { device } = userAgent(request)

  // device.type 可以是：'mobile'、'tablet'、'console'、'smarttv'、
  // 'wearable'、'embedded' 或 undefined（适用于桌面浏览器）
  const viewport = device.type || 'desktop'

  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

```js filename="middleware.js" switcher
import { NextResponse, userAgent } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl
  const { device } = userAgent(request)

  // device.type 可以是：'mobile'、'tablet'、'console'、'smarttv'、
  // 'wearable'、'embedded' 或 undefined（适用于桌面浏览器）
  const viewport = device.type || 'desktop'

  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

## `isBot`

一个布尔值，表示请求是否来自已知的机器人。

## `browser`

一个包含有关请求中使用的浏览器信息的对象。

- `name`：表示浏览器名称的字符串，如果无法识别则为 `undefined`。
- `version`：表示浏览器版本的字符串，或 `undefined`。

## `device`

一个包含有关请求中使用的设备信息的对象。

- `model`：表示设备型号的字符串，或 `undefined`。
- `type`：表示设备类型的字符串，如 `console`、`mobile`、`tablet`、`smarttv`、`wearable`、`embedded` 或 `undefined`。
- `vendor`：表示设备厂商的字符串，或 `undefined`。

## `engine`

一个包含有关浏览器引擎信息的对象。

- `name`：表示引擎名称的字符串。可能的值包括：`Amaya`、`Blink`、`EdgeHTML`、`Flow`、`Gecko`、`Goanna`、`iCab`、`KHTML`、`Links`、`Lynx`、`NetFront`、`NetSurf`、`Presto`、`Tasman`、`Trident`、`w3m`、`WebKit` 或 `undefined`。
- `version`：表示引擎版本的字符串，或 `undefined`。

## `os`

一个包含有关操作系统信息的对象。

- `name`：表示操作系统名称的字符串，或 `undefined`。
- `version`：表示操作系统版本的字符串，或 `undefined`。

## `cpu`

一个包含有关 CPU 架构信息的对象。

- `architecture`：表示 CPU 架构的字符串。可能的值包括：`68k`、`amd64`、`arm`、`arm64`、`armhf`、`avr`、`ia32`、`ia64`、`irix`、`irix64`、`mips`、`mips64`、`pa-risc`、`ppc`、`sparc`、`sparc64` 或 `undefined`
