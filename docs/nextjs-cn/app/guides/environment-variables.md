---
title: 如何在 Next.js 中使用环境变量
nav_title: 环境变量
description: 学习如何在 Next.js 应用程序中添加和访问环境变量。
---

# NextJS中文文档 - Environment Variables

Next.js 内置了对环境变量的支持，这允许你执行以下操作：

- [使用 `.env` 加载环境变量](#加载环境变量)
- [通过添加 `NEXT_PUBLIC_` 前缀为浏览器打包环境变量](#为浏览器打包环境变量)

> **警告：** 默认的 `create-next-app` 模板确保所有 `.env` 文件都添加到你的 `.gitignore` 中。你几乎永远不会想要将这些文件提交到你的代码库中。

## 加载环境变量

Next.js 内置了从 `.env*` 文件将环境变量加载到 `process.env` 的支持。

```txt
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

<PagesOnly>

这会自动将 `process.env.DB_HOST`、`process.env.DB_USER` 和 `process.env.DB_PASS` 加载到 Node.js 环境中，让你可以在 [Next.js 数据获取方法](/nextjs-cn/pages/building-your-application/data-fetching/index) 和 [API 路由](/nextjs-cn/pages/building-your-application/routing/api-routes) 中使用它们。

例如，使用 [`getStaticProps`](/nextjs-cn/pages/building-your-application/data-fetching/get-static-props)：

```js
export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}
```

</PagesOnly>

<AppOnly>

> **注意**：Next.js 还支持在 `.env*` 文件中使用多行变量：
>
> ```bash
> # .env
>
> # 你可以使用换行符编写
> PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
> ...
> Kh9NV...
> ...
> -----END DSA PRIVATE KEY-----"
>
> # 或者在双引号内使用 `\n`
> PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END DSA PRIVATE KEY-----\n"
> ```

> **注意**：如果你使用的是 `/src` 文件夹，请注意 Next.js 将**仅**从父文件夹加载 .env 文件，而**不**从 `/src` 文件夹加载。
> 这会自动将 `process.env.DB_HOST`、`process.env.DB_USER` 和 `process.env.DB_PASS` 加载到 Node.js 环境中，让你可以在 [路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers) 中使用它们。

例如：/nextjs-cn/

```js
export async function GET() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}
```

</AppOnly>

### 使用 `@next/env` 加载环境变量

如果你需要在 Next.js 运行时之外加载环境变量，例如在 ORM 或测试运行器的根配置文件中，你可以使用 `@next/env` 包。

Next.js 内部使用这个包从 `.env*` 文件加载环境变量。

要使用它，请安装该包并使用 `loadEnvConfig` 函数来加载环境变量：

```bash
npm install @next/env
```

```tsx switcher
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
```

```jsx switcher
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
```

然后，你可以在需要的地方导入配置。例如：

```tsx switcher
import './envConfig.ts'

export default defineConfig({
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
})
```

```jsx switcher
import './envConfig.js'

export default defineConfig({
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
})
```

### 引用其他变量

Next.js 将自动展开在 `.env*` 文件中使用 `$` 引用其他变量的变量，例如 `$VARIABLE`。这允许你引用其他密钥。例如：

```txt
TWITTER_USER=nextjs
TWITTER_URL=https://x.com/$TWITTER_USER
```

在上面的例子中，`process.env.TWITTER_URL` 将被设置为 `https://x.com/nextjs`。

> **需要了解**：如果你需要在实际值中使用带 `$` 的变量，则需要转义，例如 `\$`。

## 为浏览器打包环境变量

非 `NEXT_PUBLIC_` 环境变量仅在 Node.js 环境中可用，这意味着它们不能在浏览器中访问（客户端在不同的*环境*中运行）。

为了使环境变量的值在浏览器中可访问，Next.js 可以在构建时将值"内联"到传递给客户端的 js 包中，用硬编码值替换所有对 `process.env.[variable]` 的引用。要告诉它这样做，你只需要给变量添加 `NEXT_PUBLIC_` 前缀。例如：

```txt
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

这将告诉 Next.js 用你运行 `next build` 环境中的值替换 Node.js 环境中对 `process.env.NEXT_PUBLIC_ANALYTICS_ID` 的所有引用，允许你在代码的任何地方使用它。它将被内联到发送到浏览器的任何 JavaScript 中。

> **注意**：构建完成后，你的应用将不再响应这些环境变量的更改。例如，如果你使用 Heroku 管道将在一个环境中构建的 slug 提升到另一个环境，或者如果你构建并将单个 Docker 镜像部署到多个环境，所有 `NEXT_PUBLIC_` 变量将被冻结为构建时评估的值，因此这些值需要在项目构建时适当设置。如果你需要访问运行时环境值，则必须设置自己的 API 将它们提供给客户端（无论是按需还是在初始化期间）。

```js
import setupAnalyticsService from '../lib/my-analytics-service'

// 这里可以使用 'NEXT_PUBLIC_ANALYTICS_ID'，因为它以 'NEXT_PUBLIC_' 为前缀。
// 它将在构建时转换为 `setupAnalyticsService('abcdefghijk')`。
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

function HomePage() {
  return <h1>Hello World</h1>
}

export default HomePage
```

请注意，动态查找将*不会*被内联，例如：

```js
// 这将不会被内联，因为它使用了变量
const varName = 'NEXT_PUBLIC_ANALYTICS_ID'
setupAnalyticsService(process.env[varName])

// 这将不会被内联，因为它使用了变量
const env = process.env
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID)
```

### 运行时环境变量

Next.js 可以支持构建时和运行时环境变量。

**默认情况下，环境变量仅在服务器上可用**。要将环境变量暴露给浏览器，必须以 `NEXT_PUBLIC_` 为前缀。但是，这些公共环境变量将在 `next build` 期间内联到 JavaScript 包中。

<PagesOnly>

要读取运行时环境变量，我们建议使用 `getServerSideProps` 或[逐步采用 App Router](/nextjs-cn/app/guides/migrating/app-router-migration)。

</PagesOnly>

<AppOnly>

你可以在动态渲染期间安全地在服务器上读取环境变量：

```tsx switcher
import { connection } from 'next/server'

export default async function Component() {
  await connection()
  // cookies, headers 和其他动态 API
  // 也将选择动态渲染，这意味着
  // 此环境变量在运行时评估
  const value = process.env.MY_VALUE
  // ...
}
```

```jsx switcher
import { connection } from 'next/server'

export default async function Component() {
  await connection()
  // cookies, headers 和其他动态 API
  // 也将选择动态渲染，这意味着
  // 此环境变量在运行时评估
  const value = process.env.MY_VALUE
  // ...
}
```

</AppOnly>

这允许你使用单个 Docker 镜像，该镜像可以通过具有不同值的多个环境进行提升。

**需要了解：**

- 你可以使用 [`register` 函数]() 在服务器启动时运行代码。
- 我们不推荐使用 [`runtimeConfig`](/nextjs-cn/pages/api-reference/config/next-config-js/runtime-configuration) 选项，因为这不适用于独立输出模式。相反，如果你需要此功能，我们建议[逐步采用](/nextjs-cn/app/guides/migrating/app-router-migration) App Router。
  /nextjs-cn/

## 测试环境变量

除了 `development` 和 `production` 环境外，还有第三个选项可用：`test`。就像你可以为开发或生产环境设置默认值一样，你也可以使用 `.env.test` 文件为 `testing` 环境做同样的事情（尽管这个不像前两个那样常见）。Next.js 不会在 `testing` 环境中从 `.env.development` 或 `.env.production` 加载环境变量。

当使用像 `jest` 或 `cypress` 这样的工具运行测试时，这个选项很有用，你需要仅为测试目的设置特定的环境变量。如果 `NODE_ENV` 设置为 `test`，将加载测试默认值，尽管你通常不需要手动执行此操作，因为测试工具会为你解决这个问题。

`test` 环境与 `development` 和 `production` 之间有一个小区别，你需要牢记：`.env.local` 不会被加载，因为你希望测试对每个人产生相同的结果。这样，每次测试执行都将使用相同的环境默认值，忽略你的 `.env.local`（它旨在覆盖设置的默认值）。

> **需要了解**：与默认环境变量类似，`.env.test` 文件应该包含在你的代码库中，但 `.env.test.local` 不应该，因为 `.env*.local` 旨在通过 `.gitignore` 忽略。

在运行单元测试时，你可以确保通过利用 `@next/env` 包中的 `loadEnvConfig` 函数以与 Next.js 相同的方式加载环境变量。

```js
// 以下可以在 Jest 全局设置文件或类似的测试设置中使用
import { loadEnvConfig } from '@next/env'

export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
```

## Environment Variable Load Order

Environment variables are looked up in the following places, in order, stopping once the variable is found.

1. `process.env`
1. `.env.$(NODE_ENV).local`
1. `.env.local` (Not checked when `NODE_ENV` is `test`.)
1. `.env.$(NODE_ENV)`
1. `.env`

For example, if `NODE_ENV` is `development` and you define a variable in both `.env.development.local` and `.env`, the value in `.env.development.local` will be used.

> **Good to know**: The allowed values for `NODE_ENV` are `production`, `development` and `test`.

## Good to know

- If you are using a [`/src` directory](/nextjs-cn/app/api-reference/file-conventions/src-folder), `.env.*` files should remain in the root of your project.
- If the environment variable `NODE_ENV` is unassigned, Next.js automatically assigns `development` when running the `next dev` command, or `production` for all other commands.
  /nextjs-cn/

## Version History

| Version  | Changes                                       |
| -------- | --------------------------------------------- |
| `v9.4.0` | Support `.env` and `NEXT_PUBLIC_` introduced. |
