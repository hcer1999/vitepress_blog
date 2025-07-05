---
title: expireTime
description: 为启用 ISR 的页面自定义过期重新验证的过期时间。
---

你可以为启用 ISR 的页面指定一个自定义的 `stale-while-revalidate` 过期时间，供 CDN 在 `Cache-Control` 头部中使用。

打开 `next.config.js` 并添加 `expireTime` 配置：

```js
module.exports = {
  // 一小时（以秒为单位）
  expireTime: 3600,
}
```

现在，在发送 `Cache-Control` 头部时，过期时间将根据特定的重新验证周期进行计算。

例如，如果一个路径的重新验证时间为 15 分钟，而过期时间为一小时，则生成的 `Cache-Control` 头部将是 `s-maxage=900, stale-while-revalidate=2700`，这样它可以在配置的过期时间减去 15 分钟的时间内保持过期状态。
