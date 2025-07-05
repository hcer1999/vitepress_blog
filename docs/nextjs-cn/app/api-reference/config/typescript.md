---
title: TypeScript
description: Next.js 为构建 React 应用程序提供了 TypeScript 优先的开发体验。
---

# NextJS中文文档 - Typescript

Next.js 内置了 TypeScript 支持，当你使用 `create-next-app` 创建新项目时，会自动安装必要的包并配置适当的设置。

要将 TypeScript 添加到现有项目中，将文件重命名为 `.ts` / `.tsx`。运行 `next dev` 和 `next build` 将自动安装必要的依赖项，并添加包含推荐配置选项的 `tsconfig.json` 文件。

> **提示**：如果你已经有 `jsconfig.json` 文件，请将旧 `jsconfig.json` 中的 `paths` 编译器选项复制到新的 `tsconfig.json` 文件中，然后删除旧的 `jsconfig.json` 文件。

<AppOnly>

## IDE 插件

Next.js 包含一个自定义的 TypeScript 插件和类型检查器，VSCode 和其他代码编辑器可以使用它来进行高级类型检查和自动完成。

你可以在 VS Code 中通过以下方式启用插件：

1. 打开命令面板（`Ctrl/⌘` + `Shift` + `P`）
2. 搜索 "TypeScript: Select TypeScript Version"
3. 选择 "Use Workspace Version"

<Image
  alt="TypeScript 命令面板"
  srcLight="/docs/light/typescript-command-palette.png"
  srcDark="/docs/dark/typescript-command-palette.png"
  width="1600"
  height="637"
/>

现在，在编辑文件时，自定义插件将被启用。当运行 `next build` 时，将使用自定义类型检查器。

TypeScript 插件可以帮助：

- 在传递无效的[段配置选项](/nextjs-cn/app/api-reference/file-conventions/route-segment-config)值时发出警告。
- 显示可用选项和上下文文档。
- 确保正确使用 `'use c/nextjs-cn/
- 确保客户端钩子（如 `useState`）仅在客户端组件中使用。

> **🎥 观看：** 了解内置 TypeScript 插件 → [YouTube（3 分钟）](https://www.youtube.com/watch?v=pqMqn9fKEf8)

## 端到端类型安全

Next.js App Router 具有**增强的类型安全**。这包括：

1. **获取函数和页面之间没有数据序列化**：你可以直接在服务器上的组件、布局和页面中使用 `fetch`。这些数据**不需要**被序列化（转换为字符串）以传递给客户端使用。相反，由于 `app` 默认使用服务器组件，我们可以直接使用 `Date`、`Map`、`Set` 等值，而无需额外步骤。以前，你需要使用 Next.js 特定类型来手动处理服务器和客户端之间的边界。
2. **组件之间的简化数据流**：通过用根布局替代 `_app`，现在更容易可视化组件和页面之间的数据流。以前，在单个 `pages` 和 `_app` 之间流动的数据难以类型化，可能会引入令人困惑的错误。通过 App Router 中的[共存数据获取](/nextjs-cn/app/building-your-application/data-fetching/fetching)，这不再是问题。

[Next.js 中的数据获取](/nextjs-cn/app/building-your-application/data-fetching/fetching)现在提供了尽可能接近端到端类型安全的体验，而不对你的数据库或内容提供商选择做出规定。/nextjs-cn/

我们可以像在普通 TypeScri/nextjs-cn/。例如：

```tsx switcher
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // 返回值*不会*被序列化
  // 你可以返回 Date、Map、Set 等
  return res.json()
}

export default async function Page() {
  const name = await getData()

  return '...'
}
```

对于*完整的*端到端类型安全，这还需要你的数据库或内容提供商支持 TypeScript。这可以通过使用 [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) 或类型安全的查询构建器来实现。

</AppOnly>

## 示例

### 类型检查 `next.config.ts`

你可以使用 TypeScript 并在 Next.js 配置中导入类型，方法是使用 `next.config.ts`。

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* 这里是配置选项 */
}

export default nextConfig
```

> **提示**：目前 `next.config.ts` 中的模块解析仅限于 `CommonJS`。这可能导致在 `next.config.ts` 中加载仅 ESM 的包时出现不兼容问题。

当使用 `next.config.js` 文件时，你可以使用 JSDoc 在你的 IDE 中添加一些类型检查，如下所示：

```js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 这里是配置选项 */
}

module.exports = nextConfig
```

<AppOnly>

### 静态类型链接

Next.js 可以静态类型化链接，以防止在使用 `next/link` 时出现拼写错误和其他错误，从而在页面间导航时提高类型安全性。

要选择使用此功能，需要启用 `experimental.typedRoutes` 并且项目需要使用 TypeScript。

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
```

Next.js 将在 `.next/types` 中生成一个链接定义，其中包含有关应用程序中所有现有路由的信息，然后 TypeScript 可以使用这些信息在编辑器中提供关于无效链接的反馈。

目前，实验性支持包括任何字符串字面量，包括动态段。对于非字面量字符串，你目前需要手动将 `href` 转换为 `as Route`：

```tsx
import type { Route } from 'next';
import Link from 'next/link'

// 如果 href 是有效路由，则没有 TypeScript 错误
<Link href="/about" />
<Link href="/blog/nextjs" />
<Link href={`/blog/${slug}`} />
<Link href={('/blog' + slug) as Route} />

// 如果 href 不是有效路由，则会有 TypeScript 错误
<Link href="/aboot" />
```

要在包装 `next/link` 的自定义组件中接受 `href`，请使用泛型：

```tsx
import type { Route } from 'next'
import Link from 'next/link'

function Card<T extends string>({ href }: { href: Route<T> | URL }) {
  return (
    <Link href={href}>
      <div>My Card</div>
    </Link>
  )
}
```

> **它是如何工作的？**
>
> 当运行 `next dev` 或 `next build` 时，Next.js 会在 `.next` 内生成一个隐藏的 `.d.ts` 文件，其中包含有关应用程序中所有现有路由的信息（所有作为 `Link` 的 `href` 类型的有效路由）。这个 `.d.ts` 文件包含在 `tsconfig.json` 中，TypeScript 编译器将检查该 `.d.ts` 并在编辑器中提供关于无效链接的反馈。

### 与异步服务器组件一起使用

要使用 `async` 服务器组件和 TypeScript，请确保你使用的是 TypeScript `5.1.3` 或更高版本，以及 `@types/react` `18.2.8` 或更高版本。

如果你使用的是旧版本的 TypeScript，你可能会看到 `'Promise<Element>' is not a valid JSX element` 类型错误。更新到最新版本的 TypeScript 和 `@types/react` 应该能解决这个问题。

</AppOnly>

<PagesOnly>

### 静态生成和服务器端渲染

对于 [`getStaticProps`](/nextjs-cn/pages/api-reference/functions/get-static-props)、[`getStaticPaths`](/nextjs-cn/pages/api-reference/functions/get-static-paths) 和 [`getServerSideProps`](/nextjs-cn/pages/api-reference/functions/get-server-side-props)，你可以分别使用 `GetStaticProps`、`GetStaticPaths` 和 `GetServerSideProps` 类型：

```tsx
import type { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps = (async (context) => {
  // ...
}) satisfies GetStaticProps

export const getStaticPaths = (async () => {
  // ...
}) satisfies GetStaticPaths

export const getServerSideProps = (async (context) => {
  // ...
}) satisfies GetServerSideProps
```

> **提示：** `satisfies` 是在 TypeScript [4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-9.html) 中添加的。我们建议升级到最新版本的 TypeScript。

### 与 API 路由一起使用

以下是如何使用 API 路由的内置类型的示例：

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
```

</PagesOnly>

### Incremental type checking

Since `v10.2.1` Next.js supports [incremental type checking](https://www.typescriptlang.org/tsconfig#incremental) when enabled in your `tsconfig.json`, this can help speed up type checking in larger applications.

### Disabling TypeScript errors in production

Next.js fails your **production build** (`next build`) when TypeScript errors are present in your project.

If you'd like Next.js to dangerously produce production code even when your application has errors, you can disable the built-in type checking step.

If disabled, be sure you are running type checks as part of your build or deploy process, otherwise this can be very dangerous.

Open `next.config.ts` and enable the `ignoreBuildErrors` option in the `typescript` config:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

> **Good to know**: You can run `tsc --noEmit` to check for TypeScript errors yourself before building. This is useful for CI/CD pipelines where you'd like to check for TypeScript errors before deploying.

### Custom type declarations

When you need to declare custom types, you might be tempted to modify `next-env.d.ts`. However, this file is automatically generated, so any changes you make will be overwritten. Instead, you should create a new file, let's call it `new-types.d.ts`, and reference it in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
    //...truncated...
  },
  "include": ["new-types.d.ts", "next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Version Changes

| Version   | Changes                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `v15.0.0` | [`next.config.ts`](#type-checking-nextconfigts) support added for TypeScript projects.                                               |
| `v13.2.0` | Statically typed links are available in beta.                                                                                        |
| `v12.0.0` | [SWC](/nextjs-cn/architecture/nextjs-compiler) is now used by default to compile TypeScript and TSX for faster builds.               |
| `v10.2.1` | [Incremental type checking](https://www.typescriptlang.org/tsconfig#incremental) support added when enabled in your `tsconfig.json`. |

/nextjs-cn/
