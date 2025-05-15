---
title: Next.js 中文文档 - Edge和Node.js运行时
description: 学习Next.js支持的两种服务器运行时环境以及如何配置它们
---

# Next.js 中文文档 - Edge和Node.js运行时

Next.js允许您为每个路由选择运行时环境。在App Router中，有两种服务器运行时选择：

- **Node.js运行时**（默认）：访问完整的Node.js API和生态系统兼容的npm包
- **Edge运行时**：提供低延迟，但有更严格的资源和API限制

本页解释了各种运行时之间的差异，并展示如何设置它们。

## Node.js运行时

Node.js运行时提供对所有Node.js API和与Node.js兼容的包的访问。在Next.js中使用Node.js运行时时，路由处理程序、服务器组件、服务器操作和中间件都在V8引擎的单个JavaScript上下文中执行，提供完整的内存管理和代码执行能力。

### 特点

- **完整的Node.js API**：访问Node.js环境中的所有功能
- **npm兼容性**：使用几乎所有npm包
- **无冷启动**：在支持Node.js运行时的环境中（如Vercel）
- **流媒体**：支持流式响应，如React的流式SSR
- **资源高效性**：针对计算密集型任务优化，如大型数据库查询或复杂的业务逻辑

### 何时使用Node.js运行时

- 当您需要访问Node.js原生APIs（如文件系统）
- 当您使用依赖Node.js环境的npm包
- 当您需要使用内存密集型或计算密集型操作
- 当您需要访问仅在Node.js环境中可用的第三方服务

### 示例配置

默认情况下，Next.js使用Node.js运行时。您可以明确定义它：

```tsx
// app/node-api/route.ts
import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'

// 明确定义Node.js运行时
export const runtime = 'nodejs'

export async function GET() {
  // 使用Node.js特定的API
  const data = await readFile('./data.json', 'utf8')
  return NextResponse.json(JSON.parse(data))
}
```

### 在组件中使用Node.js API

```tsx
// app/node-example/page.tsx
import { readFile } from 'fs/promises'

// 明确定义Node.js运行时
export const runtime = 'nodejs'

export default async function Page() {
  // 使用Node.js文件系统API
  const data = await readFile('./app/node-example/data.txt', 'utf8')

  return (
    <div>
      <h1>Node.js示例</h1>
      <pre>{data}</pre>
    </div>
  )
}
```

## Edge运行时

Edge运行时提供了低延迟，更快的启动时间，但有限的资源和API可用性。它基于标准Web API，在每个地区都有全球分布的高可用性实例。

### 特点

- **低延迟**：快速冷启动和响应时间
- **小巧的打包尺寸**：受限于代码大小（通常1-4MB，视部署平台而定）
- **标准Web API**：支持类似浏览器的API，如`fetch`
- **无状态**：每个请求都是隔离的环境
- **全球分布**：部署到全球CDN网络边缘（取决于您的托管提供商）

### Edge运行时限制

- **API限制**：没有完整的Node.js API访问（如`fs`）
- **包兼容性**：许多npm包不兼容（尤其是使用Node.js原生模块的包）
- **计算限制**：CPU和内存资源受限
- **执行时间**：可能存在每个请求的最大持续时间限制
- **包大小**：部署包通常限制在1-4MB之间

### 何时使用Edge运行时

- 当您优先考虑低延迟，需要全球分布的响应
- 对于简单的API路由和中间件
- 当您不需要访问完整的Node.js API集
- 当您的代码很小，不依赖大型npm包

### 示例配置

```tsx
// app/edge-api/route.ts
import { NextResponse } from 'next/server'

// 定义Edge运行时
export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({
    name: '边缘函数',
    time: new Date().toISOString(),
  })
}
```

### 在页面中使用Edge运行时

```tsx
// app/edge-example/page.tsx
export const runtime = 'edge'

export default async function Page() {
  // 在边缘运行的简单数据获取
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()

  return (
    <div>
      <h1>Edge运行时示例</h1>
      <p>当前时间: {new Date().toISOString()}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

## 运行时差异

Node.js和Edge运行时的主要差异在于可用的API和资源。以下是两者的详细比较：

### API可用性

| API/特性                | Node.js 运行时 | Edge 运行时 |
| ----------------------- | -------------- | ----------- |
| `fetch`                 | ✅             | ✅          |
| `Request`/`Response`    | ✅             | ✅          |
| `URL`/`URLSearchParams` | ✅             | ✅          |
| `Headers`               | ✅             | ✅          |
| Web加密API              | ✅             | ✅          |
| Web Streams             | ✅             | ✅          |
| `cookies()`             | ✅             | ✅          |
| `headers()`             | ✅             | ✅          |
| `fs`（文件系统）        | ✅             | ❌          |
| Node.js原生模块         | ✅             | ❌          |
| `require()`动态导入     | ✅             | ❌          |
| 无限执行时间            | ✅             | ❌          |
| 大内存分配              | ✅             | ❌          |
| 完整npm生态系统         | ✅             | 部分        |

### 资源使用

| 资源方面   | Node.js 运行时           | Edge 运行时          |
| ---------- | ------------------------ | -------------------- |
| 内存限制   | 更高（取决于部署环境）   | 通常较低（~128MB）   |
| CPU限制    | 更高                     | 更受限制             |
| 冷启动延迟 | 可能更长                 | 通常更短             |
| 部署包大小 | 无严格限制               | 通常1-4MB            |
| 执行超时   | 较长（取决于托管提供商） | 较短（通常30秒以内） |

## 配置运行时

您可以在各种Next.js应用程序文件中设置运行时：

### 服务器组件

```tsx
// app/page.tsx
export const runtime = 'edge' // 'nodejs'（默认）或'edge'

export default function Page() {
  return <h1>此服务器组件运行在Edge运行时中</h1>
}
```

### 路由处理程序

```tsx
// app/api/route.ts
export const runtime = 'edge'

export async function GET() {
  return new Response('此路由处理程序在Edge运行时中执行')
}
```

### 中间件

中间件始终在Edge运行时中运行，无法更改。

```tsx
// middleware.ts
export function middleware(request) {
  // 中间件总是在Edge运行时中
  return new Response('Hello from Middleware')
}
```

## 分段级配置

您可以为整个路由段配置运行时：

```tsx
// app/edge/layout.tsx
export const runtime = 'edge'

export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

在这种情况下，`app/edge/*`下的所有路由都将在Edge运行时中执行，除非在子级路由中明确覆盖。

## 选择正确的运行时

### 适合Node.js运行时的案例

- 在应用中大量使用第三方npm包
- 需要访问Node.js API（如`fs`、`path`、`process`等）
- 执行计算密集型操作，如图像处理或复杂计算
- 需要访问私有资源（如私有网络中的数据库）
- 需要长执行时间的任务

```tsx
// app/heavy-processing/route.ts
import { createCanvas } from 'canvas' // Node.js原生模块
import { readFile, writeFile } from 'fs/promises'

export const runtime = 'nodejs'

export async function POST(request) {
  const imageData = await request.formData()
  const image = imageData.get('image')

  // 使用Node.js原生模块进行图像处理
  const canvas = createCanvas(800, 600)
  const ctx = canvas.getContext('2d')

  // 复杂的图像操作
  // ...

  // 保存到文件系统
  await writeFile('./processed.png', canvas.toBuffer())

  return new Response('图像处理完成')
}
```

### 适合Edge运行时的案例

- 构建需要全球低延迟的功能
- 简单的API端点，不需要复杂的处理
- 身份验证和授权中间件
- 基于地理位置的重定向或A/B测试
- 简单的数据获取和转换
- 透明的API代理

```tsx
// app/geo-redirect/middleware.ts
import { NextResponse } from 'next/server'

// 中间件始终在Edge运行时中
export function middleware(request) {
  const country = request.geo?.country || 'US'

  // 基于用户地理位置的快速重定向
  if (country === 'CN') {
    return NextResponse.redirect(new URL('/zh-cn', request.url))
  }

  if (country === 'FR') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }

  return NextResponse.next()
}
```

## 混合使用两种运行时

在一个应用中，您可以在不同的路由中使用不同的运行时。

例如，让主页和公共内容在Edge运行时中提供服务，同时将管理仪表板和需要访问Node.js API的功能放置在Node.js运行时中：

```
app/
├── page.tsx               # Edge运行时（低延迟全球访问）
├── products/
│   └── page.tsx           # Edge运行时
├── admin/
│   ├── layout.tsx         # 设置Node.js运行时
│   └── dashboard/
│       └── page.tsx       # 继承Node.js运行时
└── api/
    ├── basic/
    │   └── route.ts       # Edge运行时
    └── process-data/
        └── route.ts       # Node.js运行时（计算密集型）
```

## 监控和调试运行时

要有效地监控和调试不同运行时的应用程序：

### 本地开发

在本地开发时，您可以通过检查控制台日志来区分运行时环境：

```tsx
// 在任何服务器组件或API中添加此代码
console.log('当前运行时:', process.env.NEXT_RUNTIME)
```

### 生产监控

- **Node.js**: 使用传统的服务器监控工具（如New Relic、DataDog）
- **Edge**: 使用托管提供商提供的Edge函数特定工具（如Vercel Edge函数监控）

### 常见运行时错误

#### Edge运行时错误

```
Error: The Edge Runtime does not support Node.js 'fs' module.
Learn more: https://nextjs.org/docs/messages/node-module-in-edge-runtime
```

解决方案：

- 移除对Node.js特定API的使用，或
- 将运行时更改为`nodejs`

#### 包大小限制错误

```
Error: Edge Function exceeded maximum size limit of 1MB
```

解决方案：

- 减少依赖数量
- 找到更小的替代包
- 考虑切换到Node.js运行时

## 高级运行时优化

### 有条件使用Node.js模块

创建可以在两种运行时中工作的代码，通过条件导入:

```tsx
// lib/storage.js - 通用存储接口
let storage

if (process.env.NEXT_RUNTIME === 'edge') {
  // Edge版本 - 使用KV或缓存API
  storage = {
    get: async (key) => {
      // 使用Edge兼容的存储解决方案
      return fetch(`https://api.storage.com/get?key=${key}`)
    },
    set: async (key, value) => {
      // Edge存储实现
    },
  }
} else {
  // Node.js版本 - 使用文件系统
  const fs = require('fs/promises')

  storage = {
    get: async (key) => {
      // 使用文件系统或Node.js特定数据库
      return fs.readFile(`./data/${key}.json`, 'utf8')
    },
    set: async (key, value) => {
      // Node.js存储实现
    },
  }
}

export default storage
```

### 分离Edge和Node.js代码路径

```tsx
// app/api/data/route.ts
import { NextResponse } from 'next/server'
import { getData } from './data-service'

// 根据环境变量或配置动态设置运行时
export const runtime = process.env.USE_EDGE ? 'edge' : 'nodejs'

export async function GET() {
  // getData会根据当前运行时使用不同的实现
  const data = await getData()
  return NextResponse.json(data)
}
```

## Next.js 运行时总结

| 特点         | Node.js 运行时                  | Edge 运行时          |
| ------------ | ------------------------------- | -------------------- |
| **适用场景** | 复杂应用、需访问完整Node.js API | 全球分布、低延迟应用 |
| **延迟**     | 通常较高                        | 通常较低             |
| **资源**     | 更多CPU/内存                    | 受限CPU/内存         |
| **API支持**  | 完整Node.js + Web API           | 仅Web API            |
| **包兼容性** | 高                              | 受限                 |
| **冷启动**   | 可能较慢                        | 通常更快             |
| **计算能力** | 强                              | 有限                 |
| **执行时间** | 较长                            | 较短                 |
| **部署尺寸** | 无严格限制                      | 通常1-4MB            |

## 常见问题解答

### 如何知道我的第三方库是否在Edge运行时中兼容？

检查库是否：

1. 使用了Node.js特定API（fs、path、crypto等）
2. 依赖于Node.js原生模块
3. 大小超过Edge运行时限制

如果符合以上任何条件，该库可能不兼容Edge运行时。

### 我可以在同一路由内切换运行时吗？

不行，运行时是在构建时确定的。您需要为每个路由段（或API路由）选择一个运行时。

### Edge运行时对数据库访问有什么影响？

- **SQL数据库**: 在Edge中，您可以使用支持Edge的客户端（例如Prisma的Edge客户端），但功能可能有限
- **无服务器数据库**: 许多现代无服务器数据库提供REST/GraphQL API，可以通过fetch在Edge中使用

### 我的静态资产在Edge运行时中如何处理？

静态资产（图像、CSS、JavaScript等）通过Next.js的资产系统处理，不受您选择的服务器运行时影响。它们仍然可以通过CDN提供服务。

## 最佳实践

1. **默认使用Node.js运行时**: 除非明确需要Edge运行时的低延迟，否则从Node.js运行时开始会更容易开发
2. **监控性能**: 比较不同运行时的性能，并根据实际需求做出调整
3. **组织代码**: 按运行时组织路由目录，例如将所有Edge路由放在`app/edge/`下
4. **最小依赖**: 尤其是在使用Edge运行时时，保持依赖最小化
5. **降级策略**: 为关键功能设计降级策略，以防运行时限制导致问题

## 下一步

要深入了解Next.js的服务器组件和运行时，请参考以下资源：

- [路由处理程序](/nextjs/app-router/building-your-application/routing/route-handlers) - 了解如何创建API端点
- [中间件](/nextjs/app-router/building-your-application/routing/middleware) - 了解中间件功能
- [服务器组件](/nextjs/app-router/building-your-application/rendering/server-components) - 探索服务器组件渲染方式
