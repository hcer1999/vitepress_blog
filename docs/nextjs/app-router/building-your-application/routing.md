---
title: Next.js 中文文档 - 路由基础
description: 学习Next.js的路由基础知识
---

# Next.js 中文文档 - 路由基础

App Router提供了一个基于文件系统的路由器，支持布局、嵌套路由、加载状态、错误处理等。

在这个部分，您将学习如何在Next.js应用程序中实现常见的路由模式和约定。

## 术语

首先，我们定义一些将在整个文档中使用的术语：

- **树（Tree）**: 一种层次结构，如文件夹结构或React组件树。
- **子树（Subtree）**: 树的一部分，从新的根节点开始，到叶节点结束。
- **根（Root）**: 树或子树的第一个节点，例如根布局。
- **叶（Leaf）**: 没有子节点的子树节点，例如URL路径的最后一段。

![路由术语示意图](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fterminology-tree.png&w=1920&q=75)

- **URL路径**: 浏览器地址栏中显示的URL的一部分，不包括域名。
- **URL段**: URL路径中由斜杠分隔的部分。
- **路由段**: 从应用程序文件夹到页面文件的文件夹部分的单一部分。
- **路由**: 向应用程序某个部分（页面）的唯一路径。

## `app` 目录

Next.js 13引入了新的 App Router，它基于React的最新特性，如React服务器组件。这是一种更新、更强大的方法来构建Next.js应用程序。

在现有Next.js应用程序中，您可以继续使用Pages Router（`pages`目录），或者将其迁移到App Router（`app`目录）。两个目录可以在同一应用程序中共存，这使得逐步迁移成为可能。

> **建议**: 虽然Pages Router不会被废弃，但我们建议新应用程序使用App Router，因为它包含最新的React功能和改进。

## 基于文件系统的路由器

与Pages Router类似，App Router也使用基于文件系统的路由方法：

- 文件夹用于定义路由。每个文件夹代表一个映射到URL段的路由段。
- 特殊文件用于创建UI，例如在这些段显示的页面、布局和其他元素。

例如，`app/dashboard/settings/page.js`将产生路由`/dashboard/settings`。

## 路由结构

以下是一个基本路由结构的例子：

```
app
├── page.js        # 主页 (/)
├── about
│   └── page.js    # 关于页面 (/about)
└── blog
    ├── page.js    # 博客页面 (/blog)
    └── [slug]
        └── page.js # 博客文章页面 (/blog/article-1)
```

在此结构中：

- `app`目录是入口点
- `page.js`文件用于使路由段可公开访问（类似于Pages Router中的页面文件）
- 嵌套文件夹创建嵌套路由（例如`/blog/[slug]`）
- `[slug]`代表动态段，处理不同的博客文章URLs。

## 核心概念

### 文件约定

App Router提供了一组特殊文件来创建特定行为的UI：

| 文件           | 用途                       |
| -------------- | -------------------------- |
| `page.js`      | 创建路由的唯一公共UI       |
| `layout.js`    | 创建共享在多个页面之间的UI |
| `loading.js`   | 创建加载状态UI             |
| `error.js`     | 创建错误状态UI             |
| `not-found.js` | 创建未找到内容的UI         |

每个文件都有特定的职责和可用的API。例如，`layout.js`文件允许您创建共享UI，而`page.js`文件负责特定路由的唯一内容。

### 组件层次结构

当渲染路由时，特殊文件中定义的组件按照特定层次结构渲染：

1. `layout.js`
2. `template.js`
3. `error.js` (错误边界)
4. `loading.js` (加载边界)
5. `not-found.js` (未找到边界)
6. `page.js` 或嵌套 `layout.js`

![组件渲染层次结构](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=1920&q=75)

### 嵌套路由

嵌套路由是通过文件夹嵌套创建的。例如，添加`app/shop/checkout/page.js`将创建`/shop/checkout`路由。

路由嵌套如下所示：

![路由嵌套示意图](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)

### 共享布局

布局共享于多个路由，嵌套布局通过UI组合。例如，`app/dashboard/layout.js`将共享于所有以`/dashboard/`开头的路由。

![嵌套布局示意图](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&w=1920&q=75)

## 服务器中心路由

App Router主要使用**服务器组件**，这使得在服务器上渲染和流式传输内容变得更加容易。这带来了几个好处：

1. **自动代码分割**：代码按路由段自动分割，减少了初始JavaScript加载量
2. **流式传输**：即使在慢速数据获取的情况下，也能快速显示内容
3. **私有代码**：服务器组件保持敏感代码和数据（如API密钥）安全在服务器上
4. **静态渲染支持**：在构建时预先渲染路由以提高性能
5. **SEO**：搜索引擎可以更好地索引服务器渲染的内容

您仍然可以使用[客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)来添加交互性、使用浏览器API和React钩子。

## 部分渲染

当用户在同一布局下的兄弟路由间导航时，Next.js只会获取和渲染导航中已改变的部分，而不会重新获取或重新渲染整个页面。

这种部分渲染方法提高了性能，因为它：

1. 减少了传输的数据量和执行时间
2. 保留了共享组件的React状态
3. 避免了不必要的布局重新渲染

![部分渲染示意图](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fpartial-rendering.png&w=1920&q=75)

## 高级路由模式

App Router还支持多种高级路由模式：

- **并行路由**：同时显示多个页面，可独立导航
- **拦截路由**：在当前上下文中显示路由，同时保持用户在当前页面
- **条件路由**：根据条件控制路由访问或跳转
- **路由组**：不影响URL路径的组织路由
- **动态路由**：从动态数据源创建路由

这些模式支持复杂的应用场景，如仪表板、社交媒体应用和多步骤表单等。

## 主要路由特性

以下列出了App Router的主要路由功能和文档链接：

### [布局和模板](/nextjs/app-router/building-your-application/routing/layouts-and-templates)

创建在多个页面之间共享的UI。布局保留状态、保持交互性，且不会在导航期间重新渲染。

### [链接和导航](/nextjs/app-router/building-your-application/routing/linking-and-navigating)

了解如何在Next.js中实现导航，以及如何使用Link组件和useRouter钩子。

### [错误处理](/nextjs/app-router/building-your-application/routing/error-handling)

学习如何显示预期错误和处理未捕获的异常。

### [加载UI和流式传输](/nextjs/app-router/building-your-application/routing/loading-ui-and-streaming)

基于Suspense构建，Loading UI允许您为特定路由段创建回退界面，并自动流式传输内容，使其在准备好时立即显示。

### [重定向](/nextjs/app-router/building-your-application/routing/redirecting)

了解在Next.js中处理重定向的不同方法。

### [路由组](/nextjs/app-router/building-your-application/routing/route-groups)

路由组可用于将Next.js应用程序划分为不同部分。

### [动态路由](/nextjs/app-router/building-your-application/routing/dynamic-routes)

动态路由可用于从动态数据以编程方式生成路由段。

### [并行路由](/nextjs/app-router/building-your-application/routing/parallel-routes)

同时渲染可以独立导航的一个或多个页面在同一视图中。适用于高度动态的应用程序。

### [拦截路由](/nextjs/app-router/building-your-application/routing/intercepting-routes)

使用拦截路由在当前布局内加载新路由，同时掩盖浏览器URL，适用于模态等高级路由模式。

### [路由处理器](/nextjs/app-router/building-your-application/routing/route-handlers)

使用Web的Request和Response API为给定路由创建自定义请求处理程序。

### [中间件](/nextjs/app-router/building-your-application/routing/middleware)

了解如何使用中间件在请求完成前运行代码。

### [国际化](/nextjs/app-router/building-your-application/routing/internationalization)

使用国际化路由和本地化内容添加对多种语言的支持。
