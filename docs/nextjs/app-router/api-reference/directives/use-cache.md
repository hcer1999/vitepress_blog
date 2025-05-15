---
title: Next.js 中文文档 - 'use cache'
description: 'use cache是Next.js中的一个指令，允许你控制数据获取函数的缓存行为。'
---

# Next.js 中文文档 - use cache

`use cache`是一个即将推出的React指令，它将用于显式声明函数的缓存行为，特别是在数据获取场景中。虽然该功能仍在开发中，但我们可以了解其预期功能和用法。

## 基本概念

`use cache`允许开发者明确指定函数执行结果应当被缓存。这对于优化数据获取特别有用，因为它可以防止在相同渲染周期内重复调用函数，从而降低网络请求和计算开销。

## 预期语法

```jsx
async function getData() {
  'use cache'
  // 数据获取逻辑
  const res = await fetch('https://api.example.com/data')
  return res.json()
}
```

## 与fetch缓存的关系

在Next.js中，`fetch`函数已经内置了缓存机制。在使用App Router时，所有`fetch`请求默认缓存，除非另有配置。

```jsx
// 默认：结果被缓存（与use cache行为相似）
fetch('https://api.example.com/data')

// 不缓存，每次调用都会获取新数据
fetch('https://api.example.com/data', { cache: 'no-store' })

// 指定重新验证间隔
fetch('https://api.example.com/data', { next: { revalidate: 60 } })
```

`use cache`指令与`fetch`缓存机制类似，但它可以应用到任何异步函数，而不仅仅是`fetch`调用。

## 用例

当`use cache`正式实现后，这些可能是典型的使用场景：

### 自定义数据获取包装函数

```jsx
async function fetchWithAuth(url) {
  'use cache'

  const token = await getAuthToken() // 获取认证令牌
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('API请求失败')
  }

  return res.json()
}
```

### 计算密集型操作

```jsx
function processLargeDataset(data) {
  'use cache'

  // 复杂的数据处理逻辑
  return data.map(/* ... */).filter(/* ... */).reduce(/* ... */)
}
```

### 多源数据聚合

```jsx
async function getAggregatedUserData(userId) {
  'use cache'

  const [profile, orders, favorites] = await Promise.all([
    fetch(`/api/user/${userId}/profile`).then((r) => r.json()),
    fetch(`/api/user/${userId}/orders`).then((r) => r.json()),
    fetch(`/api/user/${userId}/favorites`).then((r) => r.json()),
  ])

  return {
    profile,
    recentOrders: orders.slice(0, 5),
    topFavorites: favorites.slice(0, 3),
  }
}
```

## 与其他缓存策略的比较

### 与 React.memo 的区别

- `React.memo`: 缓存组件渲染结果，基于props比较
- `use cache`: 缓存函数执行结果，无关props

### 与 useMemo 的区别

- `useMemo`: 仅在依赖项变化时重新计算值，作用范围限于单个组件实例
- `use cache`: 可以缓存整个函数的结果，作用范围可以跨组件

## 与Next.js中的其他缓存指令的关系

Next.js提供了多种缓存机制，主要包括：

1. **请求缓存**: 使用`fetch`时的自动缓存机制
2. **路由缓存**: 缓存路由段的渲染结果
3. **全页缓存**: 在静态和动态渲染之间的区别
4. **数据缓存**: 使用React的`cache`函数包装数据获取

`use cache`将提供更灵活的方式来缓存任何函数的结果，而不仅仅是标准的数据获取方法。

## 清除缓存

在实际应用中，在某些情况下可能需要清除缓存：

```jsx
// 假设的future API
import { revalidateCache } from 'next/cache'

async function updateUserData(userId, data) {
  await fetch(`/api/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

  // 清除与该用户相关的缓存数据
  revalidateCache(`getUserData_${userId}`)
}
```

## 最佳实践（预期）

当`use cache`正式发布时，可能的最佳实践包括：

1. **为重复使用的数据获取添加缓存**: 在多个组件中使用的同一数据获取函数应使用`use cache`

2. **缓存昂贵计算**: 对于计算复杂度高的函数，应考虑使用`use cache`

3. **命名一致性**: 为使用`use cache`的函数使用明确的命名约定，如`getCachedData`

4. **考虑缓存失效**: 设计系统时考虑何时及如何使缓存失效

## 现有替代方案

在`use cache`正式发布前，可以使用以下方法：

### 使用React的cache函数

```jsx
import { cache } from 'react'

export const getUser = cache(async (id) => {
  const res = await fetch(`https://api.example.com/users/${id}`)
  return res.json()
})
```

### 优化fetch缓存选项

```jsx
async function getData() {
  // 通过配置缓存选项优化fetch
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // 缓存1小时
  })

  return res.json()
}
```

## 注意事项

- `use cache`仍在开发中，API可能会发生变化
- 在正式发布前，建议使用Next.js和React提供的现有缓存机制
- 过度缓存可能导致数据不新鲜，需要权衡缓存与数据新鲜度

## 相关资源

- [Next.js文档：数据获取](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [React RFC: 缓存函数](https://github.com/reactjs/rfcs/pull/229)
- [React文档：使用缓存](https://react.dev/reference/react/cache)
