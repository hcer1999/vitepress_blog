---
title: instrumentation-client.js
description: 了解如何添加客户端检测来跟踪和监控 Next.js 应用程序的前端性能。
---

`instrumentation-client.js|ts` 文件允许你添加在应用程序前端代码开始执行之前运行的监控和分析代码。这对于设置性能跟踪、错误监控或任何其他客户端可观测性工具非常有用。

要使用它，请将文件放在应用程序的**根目录**中或 `src` 文件夹内。

## 用法

与[服务器端检测](/docs/nextjs-cn/app/guides/configuring/instrumentation)不同，你不需要导出任何特定函数。你可以直接在文件中编写监控代码：

```ts switcher
// 设置性能监控
performance.mark('app-init')

// 初始化分析
console.log('Analytics initialized')

// 设置错误跟踪
window.addEventListener('error', (event) => {
  // 发送到错误跟踪服务
  reportError(event.error)
})
```

```js switcher
// 设置性能监控
performance.mark('app-init')

// 初始化分析
console.log('Analytics initialized')

// 设置错误跟踪
window.addEventListener('error', (event) => {
  // 发送到错误跟踪服务
  reportError(event.error)
})
```

## 版本历史

| 版本    | 变更                          |
| ------- | ----------------------------- |
| `v15.3` | 引入 `instrumentation-client` |
