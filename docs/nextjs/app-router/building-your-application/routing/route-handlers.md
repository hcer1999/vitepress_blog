---
title: Next.js 中文文档 - 路由处理程序
description: 了解如何使用路由处理程序在Next.js中创建自定义API端点
---

# Next.js 中文文档 - 路由处理程序

路由处理程序允许您为特定路由创建自定义请求处理程序，类似于API端点。通过使用Web Request和Response API，它们提供了一种强大的方式来处理各种HTTP请求。

## 创建路由处理程序

路由处理程序存放在`app`目录中的`route.js|ts`文件里：

```ts
// app/api/route.ts
export async function GET(request: Request) {
  return Response.json({ message: '你好，世界！' })
}
```

路由处理程序可以嵌套在`app`目录中，与页面类似，但不能在相同的路由级别共存：

```
// ✅ 有效: 页面和路由处理程序在不同的路由
app/page.js
app/api/route.js

// ❌ 无效: 页面和路由处理程序在相同的路由级别
app/api/page.js
app/api/route.js
```

## 支持的HTTP方法

路由处理程序支持以下HTTP方法：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD`和`OPTIONS`。

如果调用了不支持的方法，Next.js将返回`405 Method Not Allowed`响应。

例如，实现CRUD操作的路由处理程序：

```ts
// app/api/todos/route.ts

// 获取所有待办事项
export async function GET() {
  const todos = await prisma.todo.findMany()
  return Response.json(todos)
}

// 创建新待办事项
export async function POST(request: Request) {
  const { title } = await request.json()

  const newTodo = await prisma.todo.create({
    data: {
      title,
      completed: false,
    },
  })

  return Response.json(newTodo, { status: 201 })
}

// 不支持的方法将自动返回405状态码
```

特定ID的待办事项操作：

```ts
// app/api/todos/[id]/route.ts

// 获取单个待办事项
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo) {
    return Response.json({ error: '待办事项未找到' }, { status: 404 })
  }

  return Response.json(todo)
}

// 更新待办事项
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const { title, completed } = await request.json()

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        completed,
      },
    })

    return Response.json(updatedTodo)
  } catch (error) {
    return Response.json({ error: '待办事项未找到' }, { status: 404 })
  }
}

// 删除待办事项
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    await prisma.todo.delete({
      where: { id },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    return Response.json({ error: '待办事项未找到' }, { status: 404 })
  }
}
```

## 路由处理程序的扩展功能

### 静态路由处理程序

与页面组件类似，路由处理程序默认是动态渲染的。您可以使用`dynamic`参数设置为`'force-static'`来改变这一行为：

```ts
// app/api/static/route.ts
export const dynamic = 'force-static'

export async function GET() {
  return Response.json({ time: new Date().toISOString() })
}
```

这将在构建时生成响应，适用于不需要实时生成的API。

### 动态路由处理程序

要确保路由处理程序是动态的，请使用：

```ts
// app/api/dynamic/route.ts
export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({ time: new Date().toISOString() })
}
```

这确保每次请求时都会重新生成响应。

### 路由段配置

路由处理程序支持与页面相同的[路由段配置选项](/nextjs/app-router/api-reference/file-conventions/route-segment-config)，可用于控制路由行为：

```ts
// app/api/config/route.ts
export const dynamic = 'force-dynamic'
export const revalidate = 60 // 每60秒重新验证数据
export const fetchCache = 'force-cache'
export const runtime = 'edge' // 或 'nodejs'
export const preferredRegion = 'all' // 或 ['us-east-1', 'eu-west-1']
export const maxDuration = 5 // 函数最大执行时间（秒）

export async function GET() {
  return Response.json({ config: 'applied' })
}
```

## 请求体处理

### 读取请求体

您可以使用标准Web API读取请求体：

```ts
// app/api/form/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  return Response.json({ data })
}
```

对于表单数据：

```ts
// app/api/form/route.ts
export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')

  return Response.json({ name, email })
}
```

### URL查询参数

您可以通过URL对象读取查询参数：

```ts
// app/api/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const page = searchParams.get('page') || '1'

  return Response.json({
    query,
    page,
    results: `搜索结果为"${query}"，第${page}页`,
  })
}
```

### 处理请求头

可以读取和设置HTTP头：

```ts
// app/api/headers/route.ts
export async function GET(request: Request) {
  const userAgent = request.headers.get('user-agent')

  return new Response('响应数据', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'X-Custom-Header': '自定义值',
      'Set-Cookie': 'auth=token; Path=/; HttpOnly',
    },
  })
}
```

## 重定向

可以使用Next.js的`redirect`函数执行重定向：

```ts
// app/api/redirect/route.ts
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  redirect('/destination')
}
```

## 请求超时与中止

可以使用`AbortController`实现请求超时：

```ts
// app/api/timeout/route.ts
export async function GET() {
  const controller = new AbortController()
  const { signal } = controller

  // 5秒后中止请求
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    // 可能长时间运行的操作
    const result = await fetch('https://slow-api.example.com', { signal })
    clearTimeout(timeoutId)

    return Response.json(await result.json())
  } catch (error) {
    if (error.name === 'AbortError') {
      return Response.json({ error: '请求超时' }, { status: 408 })
    }
    return Response.json({ error: '请求失败' }, { status: 500 })
  }
}
```

## 流式响应

路由处理程序支持流式响应，适用于大型响应或需要实时更新的场景：

```ts
// app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const message = `数据块 ${i}\n`
        controller.enqueue(encoder.encode(message))
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
}
```

## CORS处理

添加跨域资源共享(CORS)头：

```ts
// app/api/cors/route.ts
export async function GET(request: Request) {
  return new Response('跨域响应数据', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}
```

## 基于Cookie的身份验证

读取和设置认证Cookie：

```ts
// app/api/auth/login/route.ts
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  // 验证凭据（示例）
  if (username === 'admin' && password === 'password') {
    // 创建JWT令牌
    const token = sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' })

    // 设置Cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1小时
      path: '/',
    })

    return Response.json({ success: true })
  }

  return Response.json({ success: false, error: '无效的凭据' }, { status: 401 })
}

// app/api/auth/me/route.ts
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

export async function GET() {
  const token = cookies().get('auth-token')?.value

  if (!token) {
    return Response.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    return Response.json({ user: decoded })
  } catch (error) {
    return Response.json({ error: '无效令牌' }, { status: 401 })
  }
}
```

## 中间件与路由处理程序

Next.js中间件可以与路由处理程序一起使用，以在请求到达路由处理程序之前执行代码：

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 仅应用于API路由
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // 添加请求头
    const headers = new Headers(request.headers)
    headers.set('x-middleware-timestamp', Date.now().toString())

    return NextResponse.next({
      request: {
        headers,
      },
    })
  }
}

export const config = {
  matcher: '/api/:path*',
}
```

## 错误处理

实现全面的错误处理：

```ts
// app/api/error-handling/route.ts
import { z } from 'zod'

// 验证架构
const UserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
})

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // 验证输入
    const validatedData = UserSchema.parse(data)

    // 处理业务逻辑，可能抛出不同类型的错误
    // ...

    return Response.json({ success: true, data: validatedData })
  } catch (error) {
    if (error instanceof z.ZodError) {
      // 验证错误
      return Response.json(
        {
          success: false,
          error: '验证失败',
          details: error.errors,
        },
        { status: 400 },
      )
    } else if (error.code === 'P2002') {
      // Prisma唯一约束错误
      return Response.json(
        {
          success: false,
          error: '资源已存在',
        },
        { status: 409 },
      )
    } else if (error.code === 'UNAUTHORIZED') {
      // 自定义授权错误
      return Response.json(
        {
          success: false,
          error: '未授权',
        },
        { status: 401 },
      )
    }

    // 记录未处理的错误
    console.error('API错误:', error)

    // 返回通用错误
    return Response.json(
      {
        success: false,
        error: '内部服务器错误',
      },
      { status: 500 },
    )
  }
}
```

## 高级使用模式

### API速率限制

基本实现：

```ts
// app/api/rate-limited/route.ts
import { Redis } from '@upstash/redis'

// 速率限制逻辑
async function rateLimit(ip: string, limit = 10, timeWindowSeconds = 60) {
  const redis = Redis.fromEnv()
  const key = `ratelimit:${ip}`

  // 获取当前计数
  const current = (await redis.get(key)) || 0

  // 检查是否超出限制
  if (current >= limit) {
    return false
  }

  // 增加计数并设置过期时间
  await redis.incr(key)
  await redis.expire(key, timeWindowSeconds)

  return true
}

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'

  // 每分钟限制10个请求
  const allowed = await rateLimit(ip, 10, 60)

  if (!allowed) {
    return Response.json(
      { error: '请求过多，请稍后再试' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
        },
      },
    )
  }

  return Response.json({ message: '请求成功' })
}
```

### 缓存与重新验证

```ts
// app/api/cached/route.ts
import { revalidatePath } from 'next/cache'

// GET请求 - 使用缓存
export async function GET() {
  const timestamp = new Date().toISOString()

  return Response.json(
    { timestamp, message: '这个响应可能被缓存' },
    {
      headers: {
        'Cache-Control': 'max-age=60, s-maxage=60, stale-while-revalidate=300',
      },
    },
  )
}

// POST请求 - 重新验证缓存
export async function POST() {
  // 重新验证相关路径
  revalidatePath('/api/cached')

  return Response.json({ revalidated: true, now: Date.now() })
}
```

### WebSockets支持

Next.js不直接支持WebSockets，但可以在路由处理程序中升级请求：

```ts
// app/api/ws/route.ts
import { NextRequest } from 'next/server'
import { WebSocketServer } from 'ws'

// 创建WebSocket服务器（在生产环境中应考虑更复杂的设置）
let wss: WebSocketServer

export async function GET(request: NextRequest) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true })

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        // 广播消息
        wss.clients.forEach((client) => {
          client.send(`收到: ${message}`)
        })
      })

      ws.send('已连接到WebSocket服务器')
    })
  }

  // 检查是否为WebSocket升级请求
  const upgrade = request.headers.get('upgrade')
  if (upgrade?.toLowerCase() !== 'websocket') {
    return new Response('需要WebSocket连接', { status: 426 })
  }

  // 注意：这需要底层服务器支持WebSocket
  // 这个例子在大多数部署环境中不会直接工作
  // 生产环境应考虑使用Socket.io或类似工具

  return new Response(null, {
    status: 101, // Switching Protocols
    headers: {
      Upgrade: 'websocket',
      Connection: 'Upgrade',
    },
  })
}
```

在生产环境中，考虑使用专门的WebSocket服务，如：

- Pusher
- Socket.io
- Ably
- Vercel边缘函数中的WebSockets

## 最佳实践

### 1. 返回一致的响应格式

保持API响应的一致结构：

```ts
// 成功响应模板
function successResponse(data, status = 200) {
  return Response.json(
    {
      success: true,
      data,
    },
    { status },
  )
}

// 错误响应模板
function errorResponse(message, status = 400, details = null) {
  return Response.json(
    {
      success: false,
      error: message,
      ...(details && { details }),
    },
    { status },
  )
}

export async function GET() {
  try {
    const data = await fetchData()
    return successResponse(data)
  } catch (error) {
    return errorResponse('获取数据失败', 500)
  }
}
```

### 2. 安全最佳实践

- 始终验证和清理用户输入
- 实现速率限制防止滥用
- 使用HTTPS并设置适当的安全头
- 遵循最小权限原则
- 不在客户端暴露敏感错误信息

### 3. 性能考虑

- 使用缓存减少重复计算
- 流式传输大型响应
- 实现分页处理大量数据
- 针对特定功能选择合适的运行时（Edge或Node.js）

### 4. 测试与文档

- 为每个路由处理程序编写单元测试
- 创建端到端API测试
- 使用工具（如Swagger或OpenAPI）记录API

## 下一步

要深入了解更多关于Next.js中的路由和API功能，请查看：

- [中间件](/nextjs/app-router/building-your-application/routing/middleware) - 了解如何处理请求的通用逻辑
- [服务器操作](/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations) - 了解如何修改数据
- [缓存](/nextjs/app-router/building-your-application/caching) - 探索Next.js的缓存机制
- [边缘运行时](/nextjs/app-router/building-your-application/rendering/edge-and-nodejs-runtimes) - 了解不同的服务器运行时环境
