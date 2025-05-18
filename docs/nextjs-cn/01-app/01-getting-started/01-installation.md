---
title: 如何设置新的 Next.js 项目
nav_title: 安装
description: 使用 `create-next-app` CLI 创建新的 Next.js 应用程序，并设置 TypeScript、ESLint 和模块路径别名。
---

{/_ 本文档的内容在 App Router 和 Pages Router 之间共享。您可以使用 `<PagesOnly>Content</PagesOnly>` 组件来添加特定于 Pages Router 的内容。任何共享内容都不应该被包装在组件中。 _/}

## 系统要求

在开始之前，请确保您的系统满足以下要求：

- [Node.js 18.18](https://nodejs.org/) 或更高版本。
- macOS、Windows（包括 WSL）或 Linux。

## 自动安装

创建新的 Next.js 应用程序最快的方法是使用 [`create-next-app`](/docs/app/api-reference/cli/create-next-app)，它会自动为您设置好所有内容。要创建项目，请运行：

```bash filename="Terminal"
npx create-next-app@latest
```

在安装过程中，您会看到以下提示：

```txt filename="Terminal"
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

完成提示后，[`create-next-app`](/docs/app/api-reference/cli/create-next-app) 将创建一个包含您项目名称的文件夹，并安装所需的依赖项。

## 手动安装

要手动创建新的 Next.js 应用程序，请安装所需的包：

```bash filename="Terminal"
npm install next@latest react@latest react-dom@latest
```

然后，将以下脚本添加到您的 `package.json` 文件中：

```json filename="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

这些脚本对应于应用程序开发的不同阶段：

- `next dev`：启动开发服务器。
- `next build`：构建生产环境的应用程序。
- `next start`：启动生产服务器。
- `next lint`：运行 ESLint。

<AppOnly>

### 创建 `app` 目录

Next.js 使用文件系统路由，这意味着您的应用程序的路由由文件的结构决定。

创建一个 `app` 文件夹。然后，在 `app` 内创建一个 `layout.tsx` 文件。这个文件是[根布局](/docs/app/api-reference/file-conventions/layout#root-layouts)，它是必需的，并且必须包含 `<html>` 和 `<body>` 标签。

```tsx filename="app/layout.tsx" switcher
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

创建一个带有初始内容的主页 `app/page.tsx`：

```tsx filename="app/page.tsx" switcher
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

```jsx filename="app/page.js" switcher
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

当用户访问您的应用程序的根目录（`/`）时，`layout.tsx` 和 `page.tsx` 都会被渲染。

<Image
  alt="App 文件夹结构"
  srcLight="/docs/light/app-getting-started.png"
  srcDark="/docs/dark/app-getting-started.png"
  width="1600"
  height="363"
/>

> **注意事项**:
>
> - 如果您忘记创建根布局，Next.js 会在运行开发服务器（`next dev`）时自动创建这个文件。
> - 您可以选择在项目根目录中使用 [`src` 文件夹](/docs/app/api-reference/file-conventions/src-folder)，将应用程序代码与配置文件分开。

</AppOnly>

<PagesOnly>

### 创建 `pages` 目录

Next.js 使用文件系统路由，这意味着您的应用程序的路由由文件的结构决定。

在项目根目录创建一个 `pages` 目录。然后，在 `pages` 文件夹中添加一个 `index.tsx` 文件。这将是您的主页（`/`）：

```tsx filename="pages/index.tsx" switcher
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

```jsx filename="pages/index.js" switcher
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

接下来，在 `pages/` 中添加一个 `_app.tsx` 文件来定义全局布局。了解更多关于[自定义 App 文件](/docs/pages/building-your-application/routing/custom-app)的信息。

```tsx filename="pages/_app.tsx" switcher
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

```jsx filename="pages/_app.js" switcher
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

最后，在 `pages/` 中添加一个 `_document.tsx` 文件来控制来自服务器的初始响应。了解更多关于[自定义 Document 文件](/docs/pages/building-your-application/routing/custom-document)的信息。

```tsx filename="pages/_document.tsx" switcher
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

```jsx filename="pages/_document.js" switcher
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

</PagesOnly>

### Create the `public` folder (optional)

Create a [`public` folder](/docs/app/api-reference/file-conventions/public-folder) at the root of your project to store static assets such as images, fonts, etc. Files inside `public` can then be referenced by your code starting from the base URL (`/`).

You can then reference these assets using the root path (`/`). For example, `public/profile.png` can be referenced as `/profile.png`:

```tsx filename="app/page.tsx" highlight={4} switcher
import Image from 'next/image'

export default function Page() {
  return <Image src="/profile.png" alt="Profile" width={100} height={100} />
}
```

```jsx filename="app/page.js" highlight={4} switcher
import Image from 'next/image'

export default function Page() {
  return <Image src="/profile.png" alt="Profile" width={100} height={100} />
}
```

## Run the development server

1. Run `npm run dev` to start the development server.
2. Visit `http://localhost:3000` to view your application.
3. Edit the<AppOnly>`app/page.tsx`</AppOnly> <PagesOnly>`pages/index.tsx`</PagesOnly> file and save it to see the updated result in your browser.

## Set up TypeScript

> Minimum TypeScript version: `v4.5.2`

Next.js comes with built-in TypeScript support. To add TypeScript to your project, rename a file to `.ts` / `.tsx` and run `next dev`. Next.js will automatically install the necessary dependencies and add a `tsconfig.json` file with the recommended config options.

<AppOnly>

### IDE Plugin

Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.

You can enable the plugin in VS Code by:

1. Opening the command palette (`Ctrl/⌘` + `Shift` + `P`)
2. Searching for "TypeScript: Select TypeScript Version"
3. Selecting "Use Workspace Version"

<Image
  alt="TypeScript Command Palette"
  srcLight="/docs/light/typescript-command-palette.png"
  srcDark="/docs/dark/typescript-command-palette.png"
  width="1600"
  height="637"
/>

</AppOnly>

See the [TypeScript reference](/docs/app/api-reference/config/next-config-js/typescript) page for more information.

## Set up ESLint

Next.js comes with built-in ESLint. It automatically installs the necessary packages and configures the proper settings when you create a new project with `create-next-app`.

To manually add ESLint to an existing project, add `next lint` as a script to `package.json`:

```json filename="package.json"
{
  "scripts": {
    "lint": "next lint"
  }
}
```

Then, run `npm run lint` and you will be guided through the installation and configuration process.

```bash filename="Terminal"
npm run lint
```

You'll see a prompt like this:

> ? How would you like to configure ESLint?
>
> ❯ Strict (recommended)  
> Base  
> Cancel

- **Strict**: Includes Next.js' base ESLint configuration along with a stricter Core Web Vitals rule-set. This is the recommended configuration for developers setting up ESLint for the first time.
- **Base**: Includes Next.js' base ESLint configuration.
- **Cancel**: Skip configuration. Select this option if you plan on setting up your own custom ESLint configuration.

If `Strict` or `Base` are selected, Next.js will automatically install `eslint` and `eslint-config-next` as dependencies in your application and create an `.eslintrc.json` file in the root of your project that includes your selected configuration.

You can now run `next lint` every time you want to run ESLint to catch errors. Once ESLint has been set up, it will also automatically run during every build (`next build`). Errors will fail the build, while warnings will not.

See the [ESLint Plugin](/docs/app/api-reference/config/next-config-js/eslint) page for more information.

## Set up Absolute Imports and Module Path Aliases

Next.js has in-built support for the `"paths"` and `"baseUrl"` options of `tsconfig.json` and `jsconfig.json` files.

These options allow you to alias project directories to absolute paths, making it easier and cleaner to import modules. For example:

```jsx
// Before
import { Button } from '../../../components/button'

// After
import { Button } from '@/components/button'
```

To configure absolute imports, add the `baseUrl` configuration option to your `tsconfig.json` or `jsconfig.json` file. For example:

```json filename="tsconfig.json or jsconfig.json"
{
  "compilerOptions": {
    "baseUrl": "src/"
  }
}
```

In addition to configuring the `baseUrl` path, you can use the `"paths"` option to `"alias"` module paths.

For example, the following configuration maps `@/components/*` to `components/*`:

```json filename="tsconfig.json or jsconfig.json"
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

Each of the `"paths"` are relative to the `baseUrl` location.
