---
title: cacheLife
description: 了解如何使用 cacheLife 函数为缓存的函数或组件设置缓存过期时间。
version: canary
related:
  title: 相关内容
  description: 查看相关的 API 参考。
  links:
    - app/api-reference/config/next-config-js/dynamicIO
    - app/api-reference/directives/use-cache
    - app/api-reference/functions/revalidateTag
    - app/api-reference/functions/cacheTag
---

`cacheLife` 函数用于设置函数或组件的缓存生命周期。它应该与 [`use cache`](/docs/nextjs-cn/app/api-reference/directives/use-cache) 指令一起使用，并在函数或组件的作用域内使用。

## 用法

要使用 `cacheLife`，请在 `next.config.js` 文件中启用 [`dynamicIO` 标志](/docs/nextjs-cn/app/api-reference/config/next-config-js/dynamicIO)：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
```

```js switcher
const nextConfig = {
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
```

然后，在函数或组件的作用域内导入并调用 `cacheLife` 函数：

```tsx highlight={5} switcher
'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('hours')
  return <div>Page</div>
}
```

```jsx highlight={5} switcher
'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('hours')
  return <div>Page</div>
}
```

## 参考

### 默认缓存配置文件

Next.js 提供了一组基于各种时间尺度建模的命名缓存配置文件。如果你没有在 `cacheLife` 函数中与 `use cache` 指令一起指定缓存配置文件，Next.js 将自动应用 `default` 缓存配置文件。

但是，我们建议在使用 `use cache` 指令时始终添加缓存配置文件，以显式定义缓存行为。

| **配置文件** | `stale` | `revalidate` | `expire` | **描述**                                 |
| ------------ | ------- | ------------ | -------- | ---------------------------------------- |
| `default`    | 5 分钟  | 15 分钟      | 1 年     | 默认配置文件，适用于不需要频繁更新的内容 |
| `seconds`    | 0       | 1 秒         | 1 秒     | 用于需要近实时更新的快速变化内容         |
| `minutes`    | 5 分钟  | 1 分钟       | 1 小时   | 用于在一小时内频繁更新的内容             |
| `hours`      | 5 分钟  | 1 小时       | 1 天     | 用于每天更新但可以稍微过时的内容         |
| `days`       | 5 分钟  | 1 天         | 1 周     | 用于每周更新但可以过时一天的内容         |
| `weeks`      | 5 分钟  | 1 周         | 30 天    | 用于每月更新但可以过时一周的内容         |
| `max`        | 5 分钟  | 30 天        | 1 年     | 用于很少需要更新的非常稳定的内容         |

用于引用缓存配置文件的字符串值本身没有固有含义；它们只是作为语义标签。这使你能够更好地理解和管理代码库中的缓存内容。

> **须知：** 更新 [`staleTimes`](/docs/nextjs-cn/app/api-reference/config/next-config-js/staleTimes) 和 [`expireTime`](/docs/nextjs-cn/app/api-reference/config/next-config-js/expireTime) 配置选项也会更新 `default` 缓存配置文件的 `stale` 和 `expire` 属性。

### 自定义缓存配置文件

你可以通过在 `next.config.ts` 文件中的 [`cacheLife`](/docs/nextjs-cn/app/api-reference/config/next-config-js/cacheLife) 选项中添加自定义缓存配置文件。

缓存配置文件是包含以下属性的对象：

| **属性**     | **值**   | **描述**                                                                      | **要求**                     |
| ------------ | -------- | ----------------------------------------------------------------------------- | ---------------------------- |
| `stale`      | `number` | 客户端应该缓存一个值而不检查服务器的持续时间。                                | 可选                         |
| `revalidate` | `number` | 缓存应该在服务器上刷新的频率；在重新验证时可能会提供过时的值。                | 可选                         |
| `expire`     | `number` | 一个值可以保持过时的最长持续时间，之后切换到动态获取；必须长于 `revalidate`。 | 可选 - 必须长于 `revalidate` |

"stale" 属性与 [`staleTimes`](/docs/nextjs-cn/app/api-reference/config/next-config-js/staleTimes) 设置不同，它专门控制客户端路由器缓存。虽然 `staleTimes` 是影响动态和静态数据所有实例的全局设置，但 `cacheLife` 配置允许你在每个函数或每个路由的基础上定义 "stale" 时间。

> **须知**："stale" 属性不设置 `Cache-control: max-age` 头。它控制的是客户端路由器缓存。

## 示例

### 定义可重用的缓存配置文件

你可以通过在 `next.config.ts` 文件中定义缓存配置文件来创建可重用的缓存配置文件。选择适合你用例的名称，并为 `stale`、`revalidate` 和 `expire` 属性设置值。你可以创建任意多个自定义缓存配置文件。每个配置文件可以通过其名称作为传递给 `cacheLife` 函数的字符串值引用。

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      biweekly: {
        stale: 60 * 60 * 24 * 14, // 14 天
        revalidate: 60 * 60 * 24, // 1 天
        expire: 60 * 60 * 24 * 14, // 14 天
      },
    },
  },
}

module.exports = nextConfig
```

```js switcher
const nextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      biweekly: {
        stale: 60 * 60 * 24 * 14, // 14 天
        revalidate: 60 * 60 * 24, // 1 天
        expire: 60 * 60 * 24 * 14, // 14 天
      },
    },
  },
}

module.exports = nextConfig
```

上面的示例缓存 14 天，每天检查更新，并在 14 天后使缓存过期。然后，你可以通过其名称在整个应用程序中引用此配置文件：

```tsx highlight={5}
'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('biweekly')
  return <div>Page</div>
}
```

### 覆盖默认缓存配置文件

虽然默认缓存配置文件提供了一种有用的方式来考虑可缓存输出的新鲜度或过时程度，但你可能更喜欢不同的命名配置文件，以更好地与应用程序的缓存策略保持一致。

你可以通过创建与默认名称相同的新配置来覆盖默认命名缓存配置文件。

下面的示例展示了如何覆盖默认的 "days" 缓存配置文件：

```ts
const nextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      days: {
        stale: 3600, // 1 小时
        revalidate: 900, // 15 分钟
        expire: 86400, // 1 天
      },
    },
  },
}

module.exports = nextConfig
```

### 内联定义缓存配置文件

对于特定用例，你可以通过向 `cacheLife` 函数传递一个对象来设置自定义缓存配置文件：

```tsx highlight={9} switcher
'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife({
    stale: 3600, // 1 小时
    revalidate: 900, // 15 分钟
    expire: 86400, // 1 天
  })

  return <div>Page</div>
}
```

```jsx highlight={9} switcher
'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife({
    stale: 3600, // 1 小时
    revalidate: 900, // 15 分钟
    expire: 86400, // 1 天
  })

  return <div>Page</div>
}
```

这个内联缓存配置文件将只应用于创建它的函数或文件。如果你想在整个应用程序中重复使用相同的配置文件，你可以[将配置](#定义可重用的缓存配置文件)添加到 `next.config.ts` 文件的 `cacheLife` 属性中。

### `use cache` 和 `cacheLife` 的嵌套使用

当在同一路由或组件树中定义多个缓存行为时，如果内部缓存指定了自己的 `cacheLife` 配置文件，外部缓存将尊重它们之间最短的缓存持续时间。**这仅适用于外部缓存没有定义自己的显式 `cacheLife` 配置文件的情况。**

例如，如果你在页面中添加了 `use cache` 指令，但没有指定缓存配置文件，将隐式应用默认缓存配置文件（`cacheLife("default")`）。如果导入到页面中的组件也使用了带有自己的缓存配置文件的 `use cache` 指令，则会比较外部和内部缓存配置文件，并应用配置文件中设置的最短持续时间。

```tsx highlight={5,6}
// 父组件
import { unstable_cacheLife as cacheLife } from 'next/cache'
import { ChildComponent } from './child'

export async function ParentComponent() {
  'use cache'
  cacheLife('days')

  return (
    <div>
      <ChildComponent />
    </div>
  )
}
```

在另一个文件中，我们定义了导入的子组件：

```tsx highlight={4,5}
// 子组件
import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function ChildComponent() {
  'use cache'
  cacheLife('hours')
  return <div>Child Content</div>
}
```

## 版本历史

| 版本      | 变更               |
| --------- | ------------------ |
| `v15.0.0` | 引入 `cacheLife`。 |
