---
title: 如何在 Next.js 中实现身份验证
nav_title: 身份验证
description: 学习如何在你的 Next.js 应用程序中实现身份验证。
---

理解身份验证对于保护应用程序的数据至关重要。本页将指导你使用 React 和 Next.js 的功能来实现身份验证。

在开始之前，将这个过程分解为三个概念会有所帮助：

1. **[身份验证](#authentication)**：验证用户的身份。要求用户使用他们拥有的某些信息（如用户名和密码）来证明其身份。
2. **[会话管理](#session-management)**：在请求之间跟踪用户的身份验证状态。
3. **[授权](#authorization)**：决定用户可以访问哪些路由和数据。

下图展示了使用 React 和 Next.js 功能的身份验证流程：

<Image
  alt="展示使用 React 和 Next.js 功能的身份验证流程的图表"
  srcLight="/docs/light/authentication-overview.png"
  srcDark="/docs/dark/authentication-overview.png"
  width="1600"
  height="1383"
/>

本页的示例将介绍基本的用户名和密码身份验证，用于教育目的。虽然你可以实现自定义的身份验证解决方案，但为了提高安全性和简便性，我们建议使用身份验证库。这些库为身份验证、会话管理和授权提供了内置解决方案，并提供额外功能，如社交登录、多因素身份验证和基于角色的访问控制。你可以在 [身份验证库](#auth-libraries) 部分找到相关列表。

## 身份验证

<AppOnly>

### 注册和登录功能

你可以使用 [`<form>`](https://react.dev/reference/react-dom/components/form) 元素配合 React 的 [服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations) 和 `useActionState` 来捕获用户凭证、验证表单字段，并调用你的身份验证提供商的 API 或数据库。

由于服务器操作总是在服务器端执行，它们为处理身份验证逻辑提供了一个安全的环境。

以下是实现注册/登录功能的步骤：

#### 1. 捕获用户凭证

要捕获用户凭证，创建一个在提交时调用服务器操作的表单。例如，一个接受用户名、电子邮件和密码的注册表单：

```tsx switcher
import { signup } from '@/app/actions/auth'

export function SignupForm() {
  return (
    <form action={signup}>
      <div>
        <label htmlFor="name">姓名</label>
        <input id="name" name="name" placeholder="姓名" />
      </div>
      <div>
        <label htmlFor="email">邮箱</label>
        <input id="email" name="email" type="email" placeholder="邮箱" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  )
}
```

```jsx switcher
import { signup } from '@/app/actions/auth'

export function SignupForm() {
  return (
    <form action={signup}>
      <div>
        <label htmlFor="name">姓名</label>
        <input id="name" name="name" placeholder="姓名" />
      </div>
      <div>
        <label htmlFor="email">邮箱</label>
        <input id="email" name="email" type="email" placeholder="邮箱" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  )
}
```

#### 2. 验证表单字段

实现表单验证以确保用户提供有效的输入非常重要。你可以使用诸如 [Zod](https://zod.dev/) 之类的库来有效地验证数据。

```tsx switcher
import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
  // 验证表单字段
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // 如果任何表单字段无效，提前返回
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 调用提供商或数据库来创建用户...
}
```

```jsx switcher
import { SignupFormSchema } from '@/app/lib/definitions'

export async function signup(state, formData) {
  // 验证表单字段
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // 如果任何表单字段无效，提前返回
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 调用提供商或数据库来创建用户...
}
```

回到你的 `<SignupForm />`，你可以使用 React 的 `useActionState` hook 在表单提交时显示验证错误：

```tsx switcher highlight={7,15,21,36}
'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">姓名</label>
        <input id="name" name="name" placeholder="姓名" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div>
        <label htmlFor="email">邮箱</label>
        <input id="email" name="email" placeholder="邮箱" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">密码</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>密码必须：</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        注册
      </button>
    </form>
  )
}
```

```jsx switcher highlight={7,15,21,36}
'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">姓名</label>
        <input id="name" name="name" placeholder="姓名" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div>
        <label htmlFor="email">邮箱</label>
        <input id="email" name="email" placeholder="邮箱" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">密码</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>密码必须：</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        注册
      </button>
    </form>
  )
}
```

> **注意：**
>
> - 在 React 19 中，`useFormStatus` 在返回的对象中包含额外的键，如 data、method 和 action。如果你没有使用 React 19，则只有 `pending` 键可用。
> - 在修改数据之前，你应该始终确保用户也有权执行该操作。请参阅[身份验证和授权](#authorization)。

#### 3. 创建用户或检查用户凭证

验证表单字段后，你可以通过调用你的身份验证提供商的 API 或数据库来创建新的用户账户或检查用户是否存在。

继续前面的示例：

```tsx switcher
import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
  // 1. 验证表单字段
  // ...

  // 2. 准备要插入数据库的数据
  const { name, email, password } = validatedFields.data
  // 例如：在存储之前对用户密码进行哈希处理
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. 将用户插入数据库或调用身份验证库的 API
  const data = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id })

  const user = data[0]

  if (!user) {
    return {
      message: '创建账户时发生错误。',
    }
  }

  // TODO:
  // 4. 创建用户会话
  // 5. 重定向用户
}
```

```js switcher
import { SignupFormSchema } from '@/app/lib/definitions'

export async function signup(state, formData) {
  // 1. 验证表单字段
  // ...

  // 2. 准备要插入数据库的数据
  const { name, email, password } = validatedFields.data
  // 例如：在存储之前对用户密码进行哈希处理
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. 将用户插入数据库或调用身份验证库的 API
  const data = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id })

  const user = data[0]

  if (!user) {
    return {
      message: '创建账户时发生错误。',
    }
  }

  // TODO:
  // 4. 创建用户会话
  // 5. 重定向用户
}
```

成功创建用户账户或验证用户凭证后，你可以创建一个会话来管理用户的身份验证状态。根据你的会话管理策略，会话可以存储在 cookie 或数据库中，或者两者都存储。继续阅读[会话管理](#session-management)部分了解更多信息。

> **提示：**
>
> - 上面的示例比较详细，因为它为了教育目的分解了身份验证步骤。这突显出实现自己的安全解决方案可能很快变得复杂。考虑使用[身份验证库](#auth-libraries)来简化这个过程。
> - 为了改善用户体验，你可能希望在注册流程的早期检查重复的电子邮件或用户名。例如，当用户输入用户名或输入字段失去焦点时。这可以帮助防止不必要的表单提交，并为用户提供即时反馈。你可以使用 [use-debounce](https://www.npmjs.com/package/use-debounce) 等库来管理这些检查的频率。

</AppOnly>

<PagesOnly>

以下是实现注册和/或登录表单的步骤：

1. 用户通过表单提交凭证。
2. 表单发送由 API 路由处理的请求。
3. 验证成功后，流程完成，表明用户成功通过身份验证。
4. 如果验证不成功，则显示错误消息。

考虑一个用户可以输入其凭证的登录表单：

```tsx switcher
import { FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      router.push('/profile')
    } else {
      // 处理错误
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="邮箱" required />
      <input type="password" name="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
  )
}
```

```jsx switcher
import { FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      router.push('/profile')
    } else {
      // 处理错误
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="邮箱" required />
      <input type="password" name="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
  )
}
```

上面的表单有两个输入字段，用于捕获用户的电子邮件和密码。提交时，它会触发一个函数，向 API 路由（`/api/auth/login`）发送 POST 请求。

然后，你可以在 API 路由中调用你的身份验证提供商的 API 来处理身份验证：

```ts switcher
import type { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from '@/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body
    await signIn('credentials', { email, password })

    res.status(200).json({ success: true })
  } catch (error) {
    if (error.type === 'CredentialsSignin') {
      res.status(401).json({ error: '无效的凭证。' })
    } else {
      res.status(500).json({ error: '出现了错误。' })
    }
  }
}
```

```js switcher
import { signIn } from '@/auth'

export default async function handler(req, res) {
  try {
    const { email, password } = req.body
    await signIn('credentials', { email, password })

    res.status(200).json({ success: true })
  } catch (error) {
    if (error.type === 'CredentialsSignin') {
      res.status(401).json({ error: '无效的凭证。' })
    } else {
      res.status(500).json({ error: '出现了错误。' })
    }
  }
}
```

</PagesOnly>

## 会话管理

一旦用户经过身份验证，你需要在请求之间跟踪他们的身份验证状态。这通常通过创建和管理会话来完成。会话使服务器能够记住特定用户的状态并根据此状态自定义其体验。

有两种主要的方法来管理会话：**无状态会话**和**数据库会话**：

1. **[无状态会话](#stateless-sessions)**：会话数据（或令牌）存储在浏览器的 cookie 中。每次请求都会发送 cookie，允许在服务器上验证会话。这种方法更简单，但如果实现不正确，可能不太安全。
2. **[数据库会话](#database-sessions)**：会话数据存储在数据库中，用户的浏览器只接收加密的会话 ID。这种方法更安全，但可能更复杂，并使用更多的服务器资源。

> **提示：** 虽然你可以使用任一方法，或者两者兼用，但我们建议使用会话管理库，例如 [iron-session](https://github.com/vvo/iron-session) 或 [Jose](https://github.com/panva/jose)。

### 无状态会话

无状态会话不在服务器上保存任何会话数据。相反，所有会话数据都存储在客户端，通常是在已加密和签名的 cookie 中，以确保数据不被篡改。

#### 创建和管理无状态会话

下面是使用 [Cookie API]() 创建和管理无状态会话的示例：

```tsx switcher
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getUser } from '@/app/lib/db'

// 环境变量中的密钥，用于签名 JWT
const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function signIn(
  email: string,
  password: string,
  remember: boolean,
): Promise<{ success: boolean; message?: string }> {
  // 检查用户凭证
  const user = await getUser(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { success: false, message: '无效的凭证' }
  }

  // 生成会话 token（使用 JWT）
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(remember ? '30d' : '24h')
    .sign(key)

  // 存储在 cookie 中
  cookies().set({
    name: 'session',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
  })

  return { success: true }
}
```

```jsx switcher
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getUser } from '@/app/lib/db'

// 环境变量中的密钥，用于签名 JWT
const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function signIn(email, password, remember) {
  // 检查用户凭证
  const user = await getUser(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { success: false, message: '无效的凭证' }
  }

  // 生成会话 token（使用 JWT）
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(remember ? '30d' : '24h')
    .sign(key)

  // 存储在 cookie 中
  cookies().set({
    name: 'session',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
  })

  return { success: true }
}
```

#### 验证会话

要验证会话，可以解密会话 cookie 并检查它是否有效：

```tsx switcher
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

// 环境变量中的密钥，用于签名 JWT
const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (error) {
    return null
  }
}
```

```jsx switcher
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

// 环境变量中的密钥，用于签名 JWT
const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (error) {
    return null
  }
}
```

#### 注销用户

要注销用户，只需删除会话 cookie：

```tsx switcher
import { cookies } from 'next/headers'

export async function signOut() {
  // 删除会话 cookie
  cookies().delete('session')
}
```

```jsx switcher
import { cookies } from 'next/headers'

export async function signOut() {
  // 删除会话 cookie
  cookies().delete('session')
}
```

无状态会话的主要优点是它们不需要数据库查询，这使得它们更快速且更易于扩展。然而，它们的缺点是无法轻易地验证或撤销，因为令牌在创建后是完全有效的，直到它们过期。

### 数据库会话

在这种方法中，会话数据存储在服务器端的数据库中，而用户的浏览器只存储一个包含会话 ID 的 cookie。这个 ID 用于在数据库中查找关联的会话数据。

#### 创建和管理数据库会话

下面是如何创建和管理数据库会话的示例：

```tsx switcher
import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { db } from '@/app/lib/db'

export async function signIn(
  email: string,
  password: string,
): Promise<{ success: boolean; message?: string }> {
  // 1. 检查用户凭证
  const user = await db.getUser(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { success: false, message: '无效的凭证' }
  }

  // 2. 生成唯一的会话 ID
  const sessionToken = nanoid(32)
  const sessionExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 天

  // 3. 在数据库中存储会话
  await db.sessions.create({
    data: {
      sessionToken,
      userId: user.id,
      expires: sessionExpiry,
    },
  })

  // 4. 将会话令牌存储在 cookie 中
  cookies().set({
    name: 'session',
    value: sessionToken,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    expires: sessionExpiry,
  })

  return { success: true }
}
```

```jsx switcher
import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { db } from '@/app/lib/db'

export async function signIn(email, password) {
  // 1. 检查用户凭证
  const user = await db.getUser(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { success: false, message: '无效的凭证' }
  }

  // 2. 生成唯一的会话 ID
  const sessionToken = nanoid(32)
  const sessionExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 天

  // 3. 在数据库中存储会话
  await db.sessions.create({
    data: {
      sessionToken,
      userId: user.id,
      expires: sessionExpiry,
    },
  })

  // 4. 将会话令牌存储在 cookie 中
  cookies().set({
    name: 'session',
    value: sessionToken,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    expires: sessionExpiry,
  })

  return { success: true }
}
```

#### 验证会话

要验证会话，从 cookie 中获取会话 ID，然后在数据库中查找相应的会话：

```tsx switcher
import { cookies } from 'next/headers'
import { db } from '@/app/lib/db'

export async function getSession() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (!sessionToken) return null

  // 在数据库中查找会话
  const session = await db.sessions.findUnique({
    where: { sessionToken },
    include: { user: true },
  })

  // 检查会话是否存在且未过期
  if (!session || session.expires < new Date()) {
    return null
  }

  return session.user
}
```

```jsx switcher
import { cookies } from 'next/headers'
import { db } from '@/app/lib/db'

export async function getSession() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (!sessionToken) return null

  // 在数据库中查找会话
  const session = await db.sessions.findUnique({
    where: { sessionToken },
    include: { user: true },
  })

  // 检查会话是否存在且未过期
  if (!session || session.expires < new Date()) {
    return null
  }

  return session.user
}
```

#### 注销用户

要注销用户，从数据库中删除会话并清除 cookie：

```tsx switcher
import { cookies } from 'next/headers'
import { db } from '@/app/lib/db'

export async function signOut() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (sessionToken) {
    // 从数据库中删除会话
    await db.sessions.delete({
      where: { sessionToken },
    })
  }

  // 删除会话 cookie
  cookies().delete('session')
}
```

```jsx switcher
import { cookies } from 'next/headers'
import { db } from '@/app/lib/db'

export async function signOut() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (sessionToken) {
    // 从数据库中删除会话
    await db.sessions.delete({
      where: { sessionToken },
    })
  }

  // 删除会话 cookie
  cookies().delete('session')
}
```

数据库会话的主要优点是可以随时验证和撤销会话，并可以为单个用户跟踪多个会话。缺点是需要数据库查询来验证每个请求，并且需要定期清理过期的会话。

## 授权

授权是关于决定一个经过身份验证的用户可以访问哪些资源或执行哪些操作。它通常发生在身份验证之后。在 Next.js 中，你可以在不同级别实现授权：

### 基于 UI 的授权

你可以基于用户角色等信息在 UI 层面显示或隐藏某些元素：

```tsx switcher
import { getSession } from '@/app/lib/auth'

export default async function DashboardPage() {
  const user = await getSession()

  return (
    <div>
      <h1>仪表盘</h1>

      {/* 基本用户权限 */}
      <div>
        <h2>报告</h2>
        <p>所有用户都可见的内容</p>
      </div>

      {/* 管理员权限 */}
      {user?.role === 'ADMIN' && (
        <div>
          <h2>管理设置</h2>
          <p>只有管理员可以看到的内容</p>
        </div>
      )}
    </div>
  )
}
```

```jsx switcher
import { getSession } from '@/app/lib/auth'

export default async function DashboardPage() {
  const user = await getSession()

  return (
    <div>
      <h1>仪表盘</h1>

      {/* 基本用户权限 */}
      <div>
        <h2>报告</h2>
        <p>所有用户都可见的内容</p>
      </div>

      {/* 管理员权限 */}
      {user?.role === 'ADMIN' && (
        <div>
          <h2>管理设置</h2>
          <p>只有管理员可以看到的内容</p>
        </div>
      )}
    </div>
  )
}
```

### 路由级授权

对于更强大的保护，你可以在路由级别实现授权。你可以使用中间件来限制基于特定条件的某些路由的访问：

```tsx switcher
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// 这个函数可以被标记为 `async`，如果使用 `await` 的话
export async function middleware(request: NextRequest) {
  // 获取会话 cookie
  const sessionCookie = request.cookies.get('session')?.value

  // 如果会话不存在，重定向到登录页面
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // 验证 JWT
    const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const { payload } = await jwtVerify(sessionCookie, key)

    // 检查路由权限
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    if (isAdminRoute && payload.role !== 'ADMIN') {
      // 非管理员尝试访问管理员路由
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // 如果授权成功，继续
    return NextResponse.next()
  } catch (error) {
    // 无效的会话 token
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// 在以下路径上执行此中间件
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
```

```jsx switcher
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// 这个函数可以被标记为 `async`，如果使用 `await` 的话
export async function middleware(request) {
  // 获取会话 cookie
  const sessionCookie = request.cookies.get('session')?.value

  // 如果会话不存在，重定向到登录页面
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // 验证 JWT
    const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const { payload } = await jwtVerify(sessionCookie, key)

    // 检查路由权限
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    if (isAdminRoute && payload.role !== 'ADMIN') {
      // 非管理员尝试访问管理员路由
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // 如果授权成功，继续
    return NextResponse.next()
  } catch (error) {
    // 无效的会话 token
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// 在以下路径上执行此中间件
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
```

### API 路由授权

保护 API 路由也很重要，以防止未经授权的用户通过直接访问 API 绕过 UI 限制。

以下是如何在路由处理程序中验证授权的示例：

```tsx switcher
import { NextResponse } from 'next/server'
import { getSession } from '@/app/lib/auth'

export async function GET() {
  // 验证当前用户
  const user = await getSession()

  // 检查用户是否已认证
  if (!user) {
    return NextResponse.json({ error: '未认证' }, { status: 401 })
  }

  // 检查用户权限
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: '未授权' }, { status: 403 })
  }

  // 继续处理只有管理员才能访问的逻辑
  const adminData = {
    sensitiveInformation: '只有管理员才能看到这个',
    // ...其他数据
  }

  return NextResponse.json(adminData)
}
```

```jsx switcher
import { NextResponse } from 'next/server'
import { getSession } from '@/app/lib/auth'

export async function GET() {
  // 验证当前用户
  const user = await getSession()

  // 检查用户是否已认证
  if (!user) {
    return NextResponse.json({ error: '未认证' }, { status: 401 })
  }

  // 检查用户权限
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: '未授权' }, { status: 403 })
  }

  // 继续处理只有管理员才能访问的逻辑
  const adminData = {
    sensitiveInformation: '只有管理员才能看到这个',
    // ...其他数据
  }

  return NextResponse.json(adminData)
}
```

## 资源

以下是兼容 Next.js 的身份验证和会话管理库列表：

### 身份验证库 {#auth-libraries}

- [Auth.js](https://authjs.dev/)：Auth.js 是一个灵活、开源的身份验证库，支持多种流行的身份验证服务，如谷歌、Facebook、GitHub 等。
- [Clerk](https://clerk.com/)：完整的身份验证和用户管理解决方案，强调安全性和自定义性。
- [Kinde](https://kinde.com/)：面向 React、Next.js 和其他框架的现代身份验证平台。
- [NextAuth.js](https://next-auth.js.org/)：专门为 Next.js 设计的身份验证库（现在是 Auth.js 项目的一部分）。
- [Lucia](https://lucia-auth.com/)：自托管、注重类型的轻量级库。
- [SuperTokens](https://supertokens.com/)：开源身份验证解决方案，专注于拥有和控制用户数据的能力。
- [Permify](https://permify.co/)：由 OPAL 授权引擎支持的授权框架。
- [Magic](https://magic.link/)：无密码/使用"魔法链接"的身份验证解决方案。
- [Userfront](https://userfront.com/)：全方位的身份验证和用户管理平台，包括访问控制。
- [Firebase Authentication](https://firebase.google.com/docs/auth)：作为 Firebase 平台的一部分，提供身份验证功能。

### 安全性和最佳实践 {#security-and-best-practices}

理解身份验证和授权的安全面是至关重要的。以下资源提供了更多信息：

- [OWASP 身份验证备忘单](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP 授权备忘单](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Auth0 文档 - 身份验证和授权流程](https://auth0.com/docs/get-started/authentication-and-authorization-flow)
- [NIST 数字身份指南](https://pages.nist.gov/3/)

## 进一步阅读

要继续学习有关身份验证和安全性的内容，请查看以下资源：

- [如何思考 Next.js 中的安全性]()
- [理解 XSS 攻击](https://vercel.com/guides/understanding-xss-attacks)
- [理解 CSRF 攻击](https://vercel.com/guides/understanding-csrf-attacks)
- [The Copenhagen Book](https://thecopenhagenbook.com/)
