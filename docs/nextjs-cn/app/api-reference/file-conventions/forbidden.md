---
title: forbidden.js
description: forbidden.js 特殊文件的 API 参考。
related:
  links:
    - app/api-reference/functions/forbidden
version: experimental
---

**forbidden** 文件用于在认证过程中调用 [`forbidden`](/nextjs-cn/app/api-reference/functions/forbidden) 函数时渲染 UI。除了允许你自定义 UI 外，Next.js 还将返回 `403` 状态码。

```tsx switcher
import Link from 'next/link'

export default function Forbidden() {
  return (
    <div>
      <h2>禁止访问</h2>
      <p>您无权访问此资源。</p>
      <Link href="/">返回首页</Link>
    </div>
  )
}
```

```jsx switcher
import Link from 'next/link'

export default function Forbidden() {
  return (
    <div>
      <h2>禁止访问</h2>
      <p>您无权访问此资源。</p>
      <Link href="/">返回首页</Link>
    </div>
  )
}
```

## 参考

### Props

`forbidden.js` 组件不接受任何 props。

## 版本历史

| 版本      | 变更                  |
| --------- | --------------------- |
| `v15.1.0` | 引入 `forbidden.js`。 |
