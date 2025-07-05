---
title: staleTimes
description: 了解如何覆盖客户端路由器缓存的失效时间。
version: experimental
---

`staleTimes` 是一个实验性功能，它允许在[客户端路由器缓存](/nextjs-cn/app/deep-dive/caching#client-side-router-cache)中缓存页面段。

你可以通过设置实验性的 `staleTimes` 标志来启用此功能并提供自定义的重新验证时间：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}

module.exports = nextConfig
```

`static` 和 `dynamic` 属性对应基于不同类型的[链接预取](/nextjs-cn/app/api-reference/components/link#prefetch)的时间周期（以秒为单位）。

- `dynamic` 属性用于既不是静态生成也不是完全预取的页面（例如，使用 `prefetch={true}`）。
  - 默认值：0 秒（不缓存）
- `static` 属性用于静态生成的页面，或者当 `Link` 上的 `prefetch` 属性设置为 `true` 时，或者当调用 [`router.prefetch`](/nextjs-cn/app/deep-dive/caching#routerprefetch) 时。
  - 默认值：5 分钟

> **须知：**
>
> - [加载边界](/nextjs-cn/app/api-reference/file-conventions/loading)被视为在此配置中定义的 `static` 时间内可重用。
> - 这不会影响[部分渲染](/nextjs-cn/app/building-your-application/routing/linking-and-navigating#partial-rendering)，**这意味着共享布局不会在每次导航时自动重新获取，只有更改的页面段会重新获取。**
> - 这不会改变[后退/前进缓存](/nextjs-cn/app/deep-dive/caching#client-side-router-cache)行为，以防止布局偏移并防止丢失浏览器滚动位置。

你可以在[这里](/nextjs-cn/app/deep-dive/caching#client-side-router-cache)了解更多关于客户端路由器缓存的信息。

### 版本历史

| 版本      | 变更                                             |
| --------- | ------------------------------------------------ |
| `v15.0.0` | `dynamic` `staleTimes` 默认值从 30 秒变为 0 秒。 |
| `v14.2.0` | 引入实验性的 `staleTimes`。                      |
