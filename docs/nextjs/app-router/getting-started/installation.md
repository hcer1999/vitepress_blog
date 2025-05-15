---
title: Next.js 中文文档 - 安装
description: 使用create-next-app创建新的Next.js应用程序，并学习设置选项。
---

# Next.js 中文文档 - 安装

系统要求：

- [Node.js 18.17.0](https://nodejs.org/)或更高版本。
- 支持macOS、Windows和Linux操作系统。

## 自动安装

我们推荐使用`create-next-app`来创建新的Next.js应用程序，它会自动为您设置所有配置。运行以下命令创建项目：

```bash
npx create-next-app@latest
```

安装过程中会询问以下内容：

```txt
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
```

创建完成后，按照说明启动开发服务器：

```bash
cd my-app
npm run dev
```

## 手动安装

如果需要手动设置项目，请安装必需的包：

```bash
npm install next@latest react@latest react-dom@latest
```

打开`package.json`文件并添加以下`scripts`：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

这些脚本分别用于：

- `dev`: 运行[开发模式](https://nextjs.org/docs/app/api-reference/next-cli#development)的Next.js
- `build`: 构建用于生产环境的应用程序
- `start`: 启动Next.js生产服务器
- `lint`: 设置Next.js内置的ESLint配置

### 创建目录

Next.js使用文件系统路由，基于文件夹结构确定应用程序的路由：

- 创建`app`文件夹，添加`layout.tsx`和`page.tsx`文件：

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

> **注意**：如果这是您的第一个Next.js项目，请查看[学习课程](/nextjs/app-router/getting-started)。

## 设置TypeScript

Next.js内置对[TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)的支持。

创建一个空的`tsconfig.json`文件：

```bash
touch tsconfig.json
```

启动开发服务器时，Next.js会自动配置该文件，并为必要的包添加依赖项。

如果您需要为组件添加TypeScript类型，可以使用：

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> **注意**：通过在`app`目录中使用服务器组件，您可以安全地导入和使用只在服务器上可用的类型。请查看[TypeScript文档](https://nextjs.org/docs/app/building-your-application/configuring/typescript)了解更多信息。

## Next.js项目结构

下面是一个推荐的Next.js项目结构：

```bash
my-app/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── ...
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

- **app**: 包含应用程序的所有路由、组件和逻辑，这是您主要工作的地方。
- **public**: 存储静态资源（如图像）。
- **next.config.js**: 配置Next.js。
- **.gitignore**: 告诉Git哪些文件夹和文件应该被忽略。
- **package.json**: 项目依赖和脚本。
- **tsconfig.json**: TypeScript配置(如果使用)。

## 扩展阅读

推荐阅读以下章节：

- [项目结构](/nextjs/app-router/getting-started/project-structure): 了解Next.js项目结构和文件约定。
- [应用路由](/nextjs/app-router/getting-started/layouts-and-pages): 探索应用路由基础。
