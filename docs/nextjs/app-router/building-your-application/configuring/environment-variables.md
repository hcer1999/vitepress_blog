---
title: Next.js 中文文档 - 环境变量
description: 了解如何在Next.js应用中添加和访问环境变量
---

# Next.js 中文文档 - 环境变量

Next.js内置了对环境变量的支持，允许您执行以下操作：

- 使用`.env.local`加载环境变量
- 打包环境变量以用于浏览器环境

## 加载环境变量

Next.js内置支持从环境变量文件加载环境变量，包括：

- `.env`：默认环境变量
- `.env.local`：本地环境变量，覆盖默认设置
- `.env.development`, `.env.production`：特定环境的变量
- `.env.development.local`, `.env.production.local`：特定环境的本地变量

加载顺序如下，后面的会覆盖前面的：

1. `process.env`（系统环境变量）
2. `.env.$(NODE_ENV).local`
3. `.env.local`（当NODE_ENV为test时不加载）
4. `.env.$(NODE_ENV)`
5. `.env`

例如，如果您在开发环境中有以下文件：

```bash
# Next.js 中文文档 - .env
NEXT_PUBLIC_ANALYTICS_ID=123
API_KEY=secret_key

# Next.js 中文文档 - .env.local
API_KEY=different_secret
```

`process.env.API_KEY`的值将是`different_secret`。

> **注意**：`.env`文件应该存放在代码库根目录，除了`.env*.local`文件外，其他环境文件应该被提交到版本控制。`.env*.local`文件旨在不被提交，因为可能包含敏感信息。`.env.local`通常在`.gitignore`中被排除。

## 引用其他变量

Next.js自动支持在`.env*`文件中变量之间的引用，例如：

```bash
# Next.js 中文文档 - .env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_API_URL}/graphql
```

在这个例子中，`NEXT_PUBLIC_GRAPHQL_ENDPOINT`将被解析为`https://api.example.com/graphql`。

> **注意**：只有在同一个文件中定义的变量可以被引用。定义顺序也很重要，被引用的变量必须在前面定义。

## 环境变量的访问

### 在Node.js环境中

默认情况下，环境变量仅在Node.js环境中可用，可以通过`process.env`进行访问：

```js
// 在服务器组件、路由处理程序、路由钩子等中使用
console.log(process.env.API_KEY)
```

例如，在API路由中：

```js
// app/api/data/route.js
import { NextResponse } from 'next/server'

export async function GET() {
  // 使用服务器端环境变量
  const apiKey = process.env.API_KEY

  const res = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  const data = await res.json()

  return NextResponse.json(data)
}
```

### 在浏览器环境中

要在浏览器中访问环境变量，您需要为变量添加`NEXT_PUBLIC_`前缀：

```bash
# Next.js 中文文档 - .env
NEXT_PUBLIC_ANALYTICS_ID=abcdefg
```

这将使得环境变量在构建时被注入到JavaScript包中，可在客户端组件中访问：

```jsx
// app/components/analytics.js
'use client'

export function Analytics() {
  // 使用公共环境变量
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
        `,
      }}
    />
  )
}
```

> **注意**：
>
> 1. 这些公共环境变量在构建时被嵌入，而非运行时
> 2. `.env.local`的修改需要重启开发服务器才能生效

## 默认环境变量

Next.js提供了一些默认环境变量，包括：

- `NODE_ENV`：值为`development`（在`next dev`运行时）或`production`（在`next start`运行时）
- `NEXT_PUBLIC_VERCEL_URL`：部署在Vercel时的URL
- `NEXT_PUBLIC_VERCEL_ENV`：Vercel的环境（`production`、`preview`或`development`）

## 环境变量类型

您可以通过创建类型声明文件为环境变量增加类型支持：

```typescript
// types/environment.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      NEXT_PUBLIC_API_URL: string
      API_KEY: string
      // 其他环境变量...
    }
  }
}

// 如果使用ESModule
export {}
```

## 多种环境配置模式

### 开发与生产环境

您可以为开发和生产环境设置不同的变量：

```bash
# Next.js 中文文档 - .env.development
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Next.js 中文文档 - .env.production
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 本地与CI/CD环境

在本地开发时使用本地变量，在CI/CD环境中使用环境密钥：

```bash
# Next.js 中文文档 - .env.local (本地开发，不提交到版本控制)
API_KEY=test_key
DATABASE_URL=mysql://localhost:3306/mydb

# Next.js 中文文档 - CI/CD环境中设置这些值
# Next.js 中文文档 - 例如在GitHub Actions中:
# Next.js 中文文档 - - name: Deploy to production
# Next.js 中文文档 -   env:
# Next.js 中文文档 -     API_KEY: ${{ secrets.API_KEY }}
# Next.js 中文文档 -     DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### 基于功能特性的环境变量

为不同功能特性配置特定变量：

```bash
# Next.js 中文文档 - 身份验证相关
NEXT_PUBLIC_AUTH_DOMAIN=auth.example.com
AUTH_SECRET=your_auth_secret

# Next.js 中文文档 - 数据库相关
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASS=password

# Next.js 中文文档 - 第三方服务
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 运行时环境变量

如果您在构建后需要访问环境变量，例如在容器化环境中，可以使用运行时环境配置。

创建`next.config.js`文件：

```js
// next.config.js
module.exports = {
  // 使用环境变量设置公共运行时配置
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
  // 使用环境变量设置服务器端运行时配置（不会暴露给浏览器）
  serverRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
}
```

然后您可以使用`next/config`来访问这些值：

```jsx
// 页面或组件
import getConfig from 'next/config'

// 只在客户端解构以防止服务器端引用错误
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() || {}

export function MyComponent() {
  const apiUrl = publicRuntimeConfig.apiUrl
  // 注意：serverRuntimeConfig仅在服务器端可用

  return <div>API URL: {apiUrl}</div>
}
```

> **注意**：对于大多数用例，通过`.env*`文件配置静态环境变量（使用`NEXT_PUBLIC_`前缀用于客户端）是推荐的方法，因为它更简单、性能更好。只有在部署环境要求动态设置环境变量时才使用运行时配置。

## 环境变量最佳实践

### 1. 将敏感信息保密

- 永远不要提交包含真实API密钥、密码或私钥的`.env.local`文件
- 将`.env.local`和`.env*.local`添加到`.gitignore`
- 提供一个`.env.example`文件作为模板，仅显示所需的键
- 在CI/CD平台上使用密钥管理系统

`.env.example`示例：

```bash
# Next.js 中文文档 - API密钥 (请从管理控制台获取真实密钥)
API_KEY=your_api_key_here

# Next.js 中文文档 - 数据库配置
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Next.js 中文文档 - 身份验证设置
AUTH_SECRET=your_auth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 2. 使用强类型化的环境变量

对于TypeScript项目，增加环境变量类型检查：

```typescript
// utils/env.ts
const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue

  if (!value) {
    throw new Error(`环境变量 ${key} 未设置`)
  }

  return value
}

export const env = {
  // 服务器端变量
  databaseUrl: getEnvVariable('DATABASE_URL'),
  apiKey: getEnvVariable('API_KEY'),

  // 公共变量
  apiBaseUrl: getEnvVariable('NEXT_PUBLIC_API_URL'),
  environment: getEnvVariable('NODE_ENV', 'development'),
}
```

然后在代码中使用这个工具：

```typescript
// 使用类型安全的环境变量
import { env } from '@/utils/env'

const fetchData = async () => {
  const response = await fetch(`${env.apiBaseUrl}/data`, {
    headers: {
      Authorization: `Bearer ${env.apiKey}`,
    },
  })
  return response.json()
}
```

### 3. 区分环境值

为不同环境分配不同值：

```bash
# Next.js 中文文档 - .env.development
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_FEATURE_FLAGS={"newDashboard":true,"beta":true}

# Next.js 中文文档 - .env.production
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_FEATURE_FLAGS={"newDashboard":false,"beta":false}
```

### 4. 结构化复杂值

对于复杂数据，您可以使用JSON字符串：

```bash
# Next.js 中文文档 - .env
NEXT_PUBLIC_FEATURE_FLAGS={"darkMode":true,"newNavigation":false,"experimentalFeature":false}
```

然后在代码中解析：

```jsx
// utils/features.js
const featureFlags = JSON.parse(process.env.NEXT_PUBLIC_FEATURE_FLAGS || '{}');

export function isFeatureEnabled(flag) {
  return !!featureFlags[flag];
}

// 在组件中使用
import { isFeatureEnabled } from '@/utils/features';

export function MyComponent() {
  if (isFeatureEnabled('darkMode')) {
    // 启用深色模式
  }

  return (
    // ...
  );
}
```

### 5. 环境变量验证

在应用启动时验证必要的环境变量：

```js
// utils/validate-env.js
function validateEnv() {
  const requiredEnvVars = ['DATABASE_URL', 'API_KEY', 'NEXT_PUBLIC_API_URL']

  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key])

  if (missingEnvVars.length > 0) {
    throw new Error(`缺少必要的环境变量: ${missingEnvVars.join(', ')}`)
  }
}

// 在next.config.js中使用
// next.config.js
const validateEnv = require('./utils/validate-env')

// 在生产环境中验证环境变量
if (process.env.NODE_ENV === 'production') {
  validateEnv()
}

module.exports = {
  // Next.js配置
}
```

## 使用环境变量的常见场景

### API访问配置

```bash
# Next.js 中文文档 - .env.local
API_KEY=secret_api_key
API_BASE_URL=https://api.example.com
NEXT_PUBLIC_API_TIMEOUT=5000
```

使用示例：

```js
// lib/api.js
const apiClient = {
  fetch: async (endpoint, options = {}) => {
    const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      // 使用公共超时设置
      signal: options.signal || AbortSignal.timeout(Number(process.env.NEXT_PUBLIC_API_TIMEOUT)),
    })

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }

    return response.json()
  },
}

export default apiClient
```

### 功能标志（Feature Flags）

```bash
# Next.js 中文文档 - .env.development
NEXT_PUBLIC_FEATURES={"newUI":true,"analytics":false,"experimental":true}

# Next.js 中文文档 - .env.production
NEXT_PUBLIC_FEATURES={"newUI":true,"analytics":true,"experimental":false}
```

使用示例：

```js
// lib/features.js
export const features = JSON.parse(process.env.NEXT_PUBLIC_FEATURES || '{}')

export function hasFeature(name) {
  return Boolean(features[name])
}

// 组件中使用
import { hasFeature } from '@/lib/features'

export default function Dashboard() {
  return (
    <div>
      <h1>仪表板</h1>

      {hasFeature('newUI') ? <NewDashboardLayout /> : <LegacyDashboardLayout />}

      {hasFeature('experimental') && <ExperimentalWidget />}
    </div>
  )
}
```

### 身份验证配置

```bash
# Next.js 中文文档 - .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_auth_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

使用示例：

```js
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
```

### 数据库配置

```bash
# Next.js 中文文档 - .env.local
DATABASE_URL=postgresql://username:password@localhost:5432/myapp
DATABASE_POOL_SIZE=5
```

使用示例：

```js
// lib/db.js
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DATABASE_POOL_SIZE || '5'),
})

export default {
  query: (text, params) => pool.query(text, params),
}
```

## 调试环境变量

如果您在访问环境变量时遇到问题，可以尝试以下方法调试：

### 检查可用环境变量

```js
// pages/debug.js (路由组) 或 app/debug/page.js (App Router)
export default function DebugPage() {
  // 注意：仅显示公共变量
  const publicVariables = Object.keys(process.env)
    .filter((key) => key.startsWith('NEXT_PUBLIC_'))
    .reduce((obj, key) => {
      obj[key] = process.env[key]
      return obj
    }, {})

  return (
    <div>
      <h1>环境变量调试</h1>
      <pre>{JSON.stringify(publicVariables, null, 2)}</pre>
    </div>
  )
}
```

### 在构建时检查环境变量

修改`next.config.js`：

```js
// next.config.js
module.exports = {
  webpack: (config, { dev, isServer }) => {
    // 在构建时输出环境变量
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('NEXT_PUBLIC_* variables:')
    Object.keys(process.env)
      .filter((key) => key.startsWith('NEXT_PUBLIC_'))
      .forEach((key) => {
        console.log(`- ${key}: ${process.env[key]}`)
      })

    return config
  },
}
```

## 环境变量与Docker

使用Docker部署Next.js应用时，有多种方式处理环境变量：

### 使用构建时变量

```dockerfile
# Next.js 中文文档 - Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Next.js 中文文档 - 构建时传递环境变量
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Next.js 中文文档 - 运行时传递环境变量
ENV NODE_ENV production

CMD ["npm", "start"]
```

构建命令：

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  -t my-nextjs-app .
```

### 使用运行时环境变量

创建一个启动脚本来在启动时动态替换环境变量：

```bash
#!/bin/sh
# Next.js 中文文档 - /app/scripts/entrypoint.sh

# Next.js 中文文档 - 将运行时环境变量替换到.env.production文件中
echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > /app/.env.production

# Next.js 中文文档 - 启动应用
exec npm start
```

修改Dockerfile：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Next.js 中文文档 - 添加启动脚本
COPY scripts/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV NODE_ENV production

# Next.js 中文文档 - 使用启动脚本
ENTRYPOINT ["/app/entrypoint.sh"]
```

运行容器：

```bash
docker run -e NEXT_PUBLIC_API_URL=https://api.example.com my-nextjs-app
```

## 下一步

- [Next.js配置](/nextjs/app-router/api-reference/next-config-js) - 了解如何配置Next.js
- [部署](/nextjs/app-router/building-your-application/deploying) - 了解将Next.js应用部署到生产环境的方法
