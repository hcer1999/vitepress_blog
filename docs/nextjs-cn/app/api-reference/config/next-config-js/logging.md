---
title: logging
description: 配置在开发模式下运行 Next.js 时如何将数据获取记录到控制台。
---

## 选项

### 数据获取

你可以配置在开发模式下运行 Next.js 时的日志级别以及是否将完整 URL 记录到控制台。

目前，`logging` 仅适用于使用 `fetch` API 进行的数据获取。它尚未应用于 Next.js 内的其他日志。

```js
module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}
```

从 [服务器组件 HMR 缓存](/docs/nextjs-cn/app/api-reference/config/next-config-js/serverComponentsHmrCache) 恢复的任何 `fetch` 请求默认不会被记录。但是，可以通过将 `logging.fetches.hmrRefreshes` 设置为 `true` 来启用此功能。

```js
module.exports = {
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
}
```

### 传入请求

默认情况下，所有传入请求都将在开发过程中记录到控制台。你可以使用 `incomingRequests` 选项来决定忽略哪些请求。
由于这只在开发环境中记录，此选项不会影响生产构建。

```js
module.exports = {
  logging: {
    incomingRequests: {
      ignore: [/\api\/v1\/health/],
    },
  },
}
```

或者你可以通过将 `incomingRequests` 设置为 `false` 来禁用传入请求日志记录。

```js
module.exports = {
  logging: {
    incomingRequests: false,
  },
}
```

### 禁用日志记录

此外，你可以通过将 `logging` 设置为 `false` 来禁用开发日志记录。

```js
module.exports = {
  logging: false,
}
```
