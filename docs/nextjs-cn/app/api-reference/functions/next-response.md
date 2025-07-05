---
title: NextResponse
description: NextResponse 的 API 参考。
---

NextResponse 扩展了 [Web Response API](https://developer.mozilla.org/docs/Web/API/Response)，增加了额外的便捷方法。

## `cookies`

读取或修改响应的 [`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie) 头。

### `set(name, value)`

给定名称，在响应上设置具有给定值的 cookie。

```ts
// 给定传入请求 /home
let response = NextResponse.next()
// 设置一个 cookie 来隐藏横幅
response.cookies.set('show-banner', 'false')
// 响应将有一个 `Set-Cookie:show-banner=false;path=/home` 头
return response
```

### `get(name)`

给定 cookie 名称，返回 cookie 的值。如果找不到 cookie，则返回 `undefined`。如果找到多个 cookie，则返回第一个。

```ts
// 给定传入请求 /home
let response = NextResponse.next()
// { name: 'show-banner', value: 'false', Path: '/home' }
response.cookies.get('show-banner')
```

### `getAll()`

给定 cookie 名称，返回该 cookie 的值。如果未提供名称，则返回响应上的所有 cookie。

```ts
// 给定传入请求 /home
let response = NextResponse.next()
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
response.cookies.getAll('experiments')
// 或者，获取响应的所有 cookie
response.cookies.getAll()
```

### `delete(name)`

给定 cookie 名称，从响应中删除该 cookie。

```ts
// 给定传入请求 /home
let response = NextResponse.next()
// 删除返回 true，什么都没删除返回 false
response.cookies.delete('experiments')
```

## `json()`

生成具有给定 JSON 正文的响应。

```ts switcher
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
```

```js switcher
import { NextResponse } from 'next/server'

export async function GET(request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
```

## `redirect()`

生成重定向到 [URL](https://developer.mozilla.org/docs/Web/API/URL) 的响应。

```ts
import { NextResponse } from 'next/server'

return NextResponse.redirect(new URL('/new', request.url))
```

[URL](https://developer.mozilla.org/docs/Web/API/URL) 可以在使用 `NextResponse.redirect()` 方法之前创建和修改。例如，你可以使用 `request.nextUrl` 属性获取当前 URL，然后修改它以重定向到不同的 URL。

```ts
import { NextResponse } from 'next/server'

// 给定传入请求...
const loginUrl = new URL('/login', request.url)
// 添加 ?from=/incoming-url 到 /login URL
loginUrl.searchParams.set('from', request.nextUrl.pathname)
// 并重定向到新的 URL
return NextResponse.redirect(loginUrl)
```

## `rewrite()`

生成重写（代理）给定 [URL](https://developer.mozilla.org/docs/Web/API/URL) 的响应，同时保留原始 URL。

```ts
import { NextResponse } from 'next/server'

// 传入请求: /about, 浏览器显示 /about
// 重写请求: /proxy, 浏览器显示 /about
return NextResponse.rewrite(new URL('/proxy', request.url))
```

## `next()`

`next()` 方法对中间件特别有用，因为它允许你提前返回并继续路由。

```ts
import { NextResponse } from 'next/server'

return NextResponse.next()
```

你还可以在生成响应时转发 `headers`：

```ts
import { NextResponse } from 'next/server'

// 给定传入请求...
const newHeaders = new Headers(request.headers)
// 添加新的头
newHeaders.set('x-version', '123')
// 并生成带有新头的响应
return NextResponse.next({
  request: {
    // 新的请求头
    headers: newHeaders,
  },
})
```
