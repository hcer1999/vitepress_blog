---
title: optimizePackageImports
description: optimizePackageImports Next.js 配置选项的 API 参考
---

# NextJS中文文档 - OptimizePackageImports

某些包可能导出数百或数千个模块，这可能在开发和生产环境中造成性能问题。

将包添加到 `experimental.optimizePackageImports` 中将只加载你实际使用的模块，同时仍然给你带来使用具有许多命名导出的导入语句的便利。

```js
module.exports = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
}
```

以下库默认已被优化：

- `lucide-react`
- `date-fns`
- `lodash-es`
- `ramda`
- `antd`
- `react-bootstrap`
- `ahooks`
- `@ant-design/icons`
- `@headlessui/react`
- `@headlessui-float/react`
- `@heroicons/react/20/solid`
- `@heroicons/react/24/solid`
- `@heroicons/react/24/outline`
- `@visx/visx`
- `@tremor/react`
- `rxjs`
- `@mui/material`
- `@mui/icons-material`
- `recharts`
- `react-use`
- `@material-ui/core`
- `@material-ui/icons`
- `@tabler/icons-react`
- `mui-core`
- `react-icons/*`
