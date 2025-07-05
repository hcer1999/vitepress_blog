---
title: 自定义 Next.js 缓存处理器
nav_title: cacheHandler
description: 配置 Next.js 缓存，用于存储和重新验证数据，以使用任何外部服务，如 Redis、Memcached 或其他服务。
---

如果你想将缓存的页面和数据持久化到持久存储中，或者在 Next.js 应用程序的多个容器或实例之间共享缓存，你可以配置 Next.js 缓存位置。

```js
module.exports = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0, // 禁用默认的内存缓存
}
```

查看[自定义缓存处理器]()的示例，并了解更多关于实现的信息。

## API 参考

缓存处理器可以实现以下方法：`get`、`set`、`revalidateTag` 和 `resetRequestCache`。

### `get()`

| 参数  | 类型     | 描述         |
| ----- | -------- | ------------ |
| `key` | `string` | 缓存值的键。 |

返回缓存的值，如果未找到则返回 `null`。

### `set()`

| 参数   | 类型           | 描述             |
| ------ | -------------- | ---------------- |
| `key`  | `string`       | 存储数据的键。   |
| `data` | 数据或 `null`  | 要缓存的数据。   |
| `ctx`  | `{ tags: [] }` | 提供的缓存标签。 |

返回 `Promise<void>`。

### `revalidateTag()`

| 参数  | 类型                   | 描述                   |
| ----- | ---------------------- | ---------------------- |
| `tag` | `string` 或 `string[]` | 要重新验证的缓存标签。 |

返回 `Promise<void>`。了解更多关于[重新验证数据](/nextjs-cn/app/building-your-application/data-fetching/incremental-static-regeneration)或 [`revalidateTag()`](/nextjs-cn/app/api-reference/functions/revalidateTag) 函数的信息。

### `resetRequestCache()`

此方法在下一个请求之前重置单个请求的临时内存缓存。

返回 `void`。

**须知：**

- `revalidatePath` 是缓存标签之上的便捷层。调用 `revalidatePath` 将调用你的 `revalidateTag` 函数，然后你可以选择是否要基于路径标记缓存键。

## 平台支持

| 部署选项                                                                 | 支持状态 |
| ------------------------------------------------------------------------ | -------- |
| [Node.js 服务器](/nextjs-cn/app/getting-started/deploying#nodejs-server) | 是       |
| [Docker 容器](/nextjs-cn/app/getting-started/deploying#docker)           | 是       |
| [静态导出](/nextjs-cn/app/getting-started/deploying#static-export)       | 否       |
| [适配器](/nextjs-cn/app/getting-started/deploying#adapters)              | 平台特定 |

了解如何在自托管 Next.js 时[配置 ISR]()。

## 版本历史

| 版本      | 变更                                                 |
| --------- | ---------------------------------------------------- |
| `v14.1.0` | 重命名为 `cacheHandler` 并成为稳定版。               |
| `v13.4.0` | `incrementalCacheHandlerPath` 支持 `revalidateTag`。 |
| `v13.4.0` | `incrementalCacheHandlerPath` 支持独立输出。         |
| `v12.2.0` | 添加实验性的 `incrementalCacheHandlerPath`。         |
