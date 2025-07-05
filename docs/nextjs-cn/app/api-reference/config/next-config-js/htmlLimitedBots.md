---
title: htmlLimitedBots
description: 指定应接收阻塞元数据的用户代理列表。
---

`htmlLimitedBots` 配置允许您指定一个用户代理列表，这些用户代理应接收阻塞元数据，而不是[流式元数据](/docs/nextjs-cn/app/api-reference/functions/generate-metadata#streaming-metadata)。

```ts switcher
import type { NextConfig } from 'next'

const config: NextConfig = {
  htmlLimitedBots: 'MySpecialBot|MyAnotherSpecialBot|SimpleCrawler',
}

export default config
```

```js switcher
module.exports = {
  htmlLimitedBots: 'MySpecialBot|MyAnotherSpecialBot|SimpleCrawler',
}
```

## 默认列表

Next.js 包含[一个 HTML 受限机器人的默认列表](https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/router/utils/html-bots.ts)。

指定 `htmlLimitedBots` 配置将覆盖 Next.js 的默认列表，使您能够完全控制哪些用户代理应该选择使用此行为。但这是高级行为，对于大多数情况，默认设置应该足够。

## 版本历史

| 版本   | 变更                          |
| ------ | ----------------------------- |
| 15.2.0 | 引入 `htmlLimitedBots` 选项。 |
