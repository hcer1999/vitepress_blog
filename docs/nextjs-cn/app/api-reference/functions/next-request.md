---
title: NextRequest
description: NextRequest 的 API 参考。
---

# NextJS中文文档 - Next Request

NextRequest 扩展了 [Web Request API](https://developer.mozilla.org/docs/Web/API/Request)，增加了额外的便捷方法。

## `cookies`

读取或修改请求的 [`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie) 头。

### `set(name, value)`

给定名称，在请求上设置具有给定值的 cookie。

```ts
// 给定传入请求 /home
// 设置一个 cookie 来隐藏横幅
// 请求将有一个 `Set-Cookie:show-banner=false;path=/home` 头
request.cookies.set('show-banner', 'false')
```

### `get(name)`

给定 cookie 名称，返回 cookie 的值。如果找不到 cookie，则返回 `undefined`。如果找到多个 cookie，则返回第一个。

```ts
// 给定传入请求 /home
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get('show-banner')
```

### `getAll()`

给定 cookie 名称，返回该 cookie 的值。如果未提供名称，则返回请求上的所有 cookie。

```ts
// 给定传入请求 /home
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
request.cookies.getAll('experiments')
// 或者，获取请求的所有 cookie
request.cookies.getAll()
```

### `delete(name)`

给定 cookie 名称，从请求中删除该 cookie。

```ts
// 删除返回 true，什么都没删除返回 false
request.cookies.delete('experiments')
```

### `has(name)`

给定 cookie 名称，如果请求上存在该 cookie，则返回 `true`。

```ts
// 如果 cookie 存在则返回 true，不存在则返回 false
request.cookies.has('experiments')
```

### `clear()`

从请求中移除 `Set-Cookie` 头。

```ts
request.cookies.clear()
```

## `nextUrl`

扩展了原生 [`URL`](https://developer.mozilla.org/docs/Web/API/URL) API，增加了额外的便捷方法，包括 Next.js 特有的属性。

```ts
// 给定请求 /home，pathname 是 /home
request.nextUrl.pathname
// 给定请求 /home?name=lee，searchParams 是 { 'name': 'lee' }
request.nextUrl.searchParams
```

以下选项可用：

<PagesOnly>

| 属性              | 类型                      | 描述                                                                                                               |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `basePath`        | `string`                  | URL 的[基础路径](/nextjs-cn/pages/api-reference/config/next-config-js/basePath)。                                  |
| `buildId`         | `string` \| `undefined`   | Next.js 应用程序的构建标识符。可以[自定义](/nextjs-cn/pages/api-reference/config/next-config-js/generateBuildId)。 |
| `defaultLocale`   | `string` \| `undefined`   | [国际化](/nextjs-cn/app/building-your-application/routing/internationalization)的默认语言环境。                    |
| `domainLocale`    |                           | /nextjs-cn/                                                                                                        |
| - `defaultLocale` | `string`                  | 域内的默认语/nextjs-cn/                                                                                            |
| - `domain`        | `string`                  | 与特定语言环境关联的域。                                                                                           |
| - `http`          | `boolean` \| `undefined`  | 指示域是否使用 HTTP。                                                                                              |
| `locales`         | `string[]` \| `undefined` | 可用语言环境的数组。                                                                                               |
| `locale`          | `string` \| `undefined`   | 当前活动的语言环境。                                                                                               |
| `url`             | `URL`                     | URL 对象。                                                                                                         |

</PagesOnly>

<AppOnly>

| 属性           | 类型                    | 描述                                                                                                             |
| -------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `basePath`     | `string`                | URL 的[基础路径](/nextjs-cn/app/api-reference/config/next-config-js/basePath)。                                  |
| `buildId`      | `string` \| `undefined` | Next.js 应用程序的构建标识符。可以[自定义](/nextjs-cn/app/api-reference/config/next-config-js/generateBuildId)。 |
| `pathname`     | `string`                | URL 的路径名。 /nextjs-cn/                                                                                       |
| `searchParams` | `Object`                | URL 的搜索参数。 /nextjs-cn/                                                                                     |

> **注意：** Pages Router 的国际化属性在 App Router 中不可用。了解更多关于[使用 App Router 进行国际化](/nextjs-cn/app/building-your-application/routing/internationalization)的信息。

</AppOnly>

## 版本历史

| 版本      | 变更                   |
| --------- | ---------------------- |
| `v15.0.0` | 移除了 `ip` 和 `geo`。 |
