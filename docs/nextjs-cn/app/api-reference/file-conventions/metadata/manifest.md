---
title: manifest.json
description: manifest.json 文件的 API 参考。
---

在 `app` 目录的**根目录**中添加或生成符合 [Web 清单规范](https://developer.mozilla.org/docs/Web/Manifest) 的 `manifest.(json|webmanifest)` 文件，为浏览器提供有关你的 Web 应用程序的信息。

## 静态清单文件

```json
{
  "name": "My Next.js Application",
  "short_name": "Next.js App",
  "description": "An application built with Next.js",
  "start_url": "/"
  // ...
}
```

## 生成清单文件

添加一个返回 [`Manifest` 对象](#manifest-对象)的 `manifest.js` 或 `manifest.ts` 文件。

> 须知: `manifest.js` 是一个默认被缓存的特殊路由处理程序，除非它使用了[动态 API](/nextjs-cn/app/deep-dive/caching#dynamic-apis) 或[动态配置](/nextjs-cn/app/deep-dive/caching#segment-config-options)选项。

```ts switcher
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
```

```js switcher
export default function manifest() {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
```

### Manifest 对象

清单对象包含广泛的选项列表，可能会因新的 Web 标准而更新。有关所有当前选项的信息，如果使用 [TypeScript](/nextjs-cn/app/api-reference/config/typescript#ide-plugin)，请参考代码编辑器中的 `MetadataRoute.Manifest` 类型，或查看 [MDN](https://developer.mozilla.org/docs/Web/Manifest) 文档。
