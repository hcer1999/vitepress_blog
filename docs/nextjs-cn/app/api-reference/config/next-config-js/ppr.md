---
title: ppr
description: 学习如何在 Next.js 中启用部分预渲染。
version: experimental
related:
  title: 了解更多关于部分预渲染的信息
  links:
    - app/getting-started/partial-prerendering
---

# NextJS中文文档 - Ppr

部分预渲染（PPR）使你能够在同一路由中结合静态和动态组件。了解更多关于 [PPR](/nextjs-cn/app/getting-started/partial-prerendering) 的信息。

## 使用部分预渲染

### 增量采用（版本 15）

在 Next.js 15 中，你可以在 [layouts](/nextjs-cn/app/building-your-application/routing/layouts-and-templates) 和 [pages](/nextjs-cn/app/api-reference/file-conventions/page) 中通过在 `next.config.js` 中设置 [`ppr`](/nextjs-cn/app/api-reference/config/next-config-js/ppr) 选项为 `incremental`，并在文件顶部导出 `experimental_ppr` [路由配置选项](/nextjs-cn/app/api-reference/file-conventions/route-segment-config)，来增量采用部分预渲染：

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}

module.exports = nextConfig
```

```tsx switcher
import { Suspense } from "react"
import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui"

export const experimental_ppr = true

export default function Page() {
  return {
     <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
     </>
  };
}
```

```jsx switcher
import { Suspense } from "react"
import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui"

export const experimental_ppr = true

export default function Page() {
  return {
     <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
     </>
  };
}
```

> **须知**：
>
> - 没有 `experimental_ppr` 的路由将默认为 `false`，不会使用 PPR 进行预渲染。你需要为每个路由显式选择加入 PPR。
> - `experimental_ppr` 将应用于路由段的所有子项，包括嵌套的布局和页面。你不需要将它添加到每个文件中，只需添加到路由的顶层段。
> - 要为子段禁用 PPR，你可以在子段中将 `experimental_ppr` 设置为 `false`。

| 版本      | 变更                          |
| --------- | ----------------------------- |
| `v15.0.0` | 引入实验性的 `incremental` 值 |
| `v14.0.0` | 引入实验性的 `ppr`            |
