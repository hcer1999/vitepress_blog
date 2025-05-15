---
title: Next.js 中文文档 - 项目结构
description: 了解Next.js项目结构和文件约定
---

# Next.js 中文文档 - 项目结构和组织

本页提供了Next.js中**所有**文件夹和文件约定的概述，以及项目组织的建议。

## 文件夹和文件约定

### 顶级文件夹

顶级文件夹用于组织应用程序的代码和静态资源。

| [app](/nextjs/app-router/building-your-application/routing)               | App Router             |
| ------------------------------------------------------------------------- | ---------------------- |
| [pages](/nextjs/pages/)                                                   | Pages Router           |
| [public](/nextjs/app-router/api-reference/file-conventions/public-folder) | 静态资源               |
| [src](/nextjs/app-router/api-reference/file-conventions/src-folder)       | 可选的应用程序源文件夹 |

### 顶级文件

顶级文件用于配置应用程序、管理依赖项、运行中间件、集成监控工具和定义环境变量。

| **Next.js**                                                                      |                             |
| -------------------------------------------------------------------------------- | --------------------------- |
| [next.config.js](/nextjs/app-router/api-reference/config/next-config-js)         | Next.js配置文件             |
| [package.json](/nextjs/app-router/getting-started/installation#手动安装)         | 项目依赖和脚本              |
| [instrumentation.ts](/nextjs/app-router/guides/instrumentation)                  | OpenTelemetry和检测文件     |
| [middleware.ts](/nextjs/app-router/building-your-application/routing/middleware) | Next.js请求中间件           |
| [.env](/nextjs/app-router/guides/environment-variables)                          | 环境变量                    |
| [.env.local](/nextjs/app-router/guides/environment-variables)                    | 本地环境变量                |
| [.env.production](/nextjs/app-router/guides/environment-variables)               | 生产环境变量                |
| [.env.development](/nextjs/app-router/guides/environment-variables)              | 开发环境变量                |
| [.eslintrc.json](/nextjs/app-router/api-reference/config/eslint)                 | ESLint配置文件              |
| .gitignore                                                                       | Git忽略文件和文件夹         |
| next-env.d.ts                                                                    | Next.js的TypeScript声明文件 |
| tsconfig.json                                                                    | TypeScript配置文件          |
| jsconfig.json                                                                    | JavaScript配置文件          |

### 路由文件

| [layout](/nextjs/app-router/api-reference/file-conventions/layout)                   | .js .jsx .tsx | 布局             |
| ------------------------------------------------------------------------------------ | ------------- | ---------------- |
| [page](/nextjs/app-router/api-reference/file-conventions/page)                       | .js .jsx .tsx | 页面             |
| [loading](/nextjs/app-router/api-reference/file-conventions/loading)                 | .js .jsx .tsx | 加载UI           |
| [not-found](/nextjs/app-router/api-reference/file-conventions/not-found)             | .js .jsx .tsx | 未找到UI         |
| [error](/nextjs/app-router/api-reference/file-conventions/error)                     | .js .jsx .tsx | 错误UI           |
| [global-error](/nextjs/app-router/api-reference/file-conventions/error#global-error) | .js .jsx .tsx | 全局错误UI       |
| [route](/nextjs/app-router/api-reference/file-conventions/route)                     | .js .ts       | API端点          |
| [template](/nextjs/app-router/api-reference/file-conventions/template)               | .js .jsx .tsx | 重新渲染的布局   |
| [default](/nextjs/app-router/api-reference/file-conventions/default)                 | .js .jsx .tsx | 并行路由回退页面 |

### 嵌套路由

| 文件夹        | 路由段     |
| ------------- | ---------- |
| folder/folder | 嵌套路由段 |

### 动态路由

| [\[folder\]](/nextjs/app-router/building-your-application/routing/dynamic-routes#convention)                         | 动态路由段           |
| -------------------------------------------------------------------------------------------------------------------- | -------------------- |
| [\[...folder\]](/nextjs/app-router/building-your-application/routing/dynamic-routes#catch-all-segments)              | 捕获所有路由段       |
| [\[\[...folder\]\]](/nextjs/app-router/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | 可选的捕获所有路由段 |

### 路由组和私有文件夹

| [(folder)](/nextjs/app-router/building-your-application/routing/route-groups#convention) | 分组路由不影响路由                 |
| ---------------------------------------------------------------------------------------- | ---------------------------------- |
| [\_folder](#私有文件夹)                                                                  | 将文件夹及其所有子段排除在路由之外 |

### 并行和拦截路由

| [@folder](/nextjs/app-router/building-your-application/routing/parallel-routes#slots)                 | 命名插槽       |
| ----------------------------------------------------------------------------------------------------- | -------------- |
| [(.)folder](/nextjs/app-router/building-your-application/routing/intercepting-routes#convention)      | 拦截同级路由   |
| [(..)folder](/nextjs/app-router/building-your-application/routing/intercepting-routes#convention)     | 拦截上一级路由 |
| [(..)(..)folder](/nextjs/app-router/building-your-application/routing/intercepting-routes#convention) | 拦截上两级路由 |
| [(...)folder](/nextjs/app-router/building-your-application/routing/intercepting-routes#convention)    | 从根路径拦截   |

### 元数据文件约定

#### 应用图标

| [favicon](/nextjs/app-router/api-reference/file-conventions/metadata/app-icons#favicon)                                | .ico                      | Favicon文件         |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------- |
| [icon](/nextjs/app-router/api-reference/file-conventions/metadata/app-icons#icon)                                      | .ico .jpg .jpeg .png .svg | 应用图标文件        |
| [icon](/nextjs/app-router/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx)       | .js .ts .tsx              | 生成的应用图标      |
| [apple-icon](/nextjs/app-router/api-reference/file-conventions/metadata/app-icons#apple-icon)                          | .jpg .jpeg, .png          | Apple应用图标文件   |
| [apple-icon](/nextjs/app-router/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | .js .ts .tsx              | 生成的Apple应用图标 |

#### Open Graph和Twitter图像

| [opengraph-image](/nextjs/app-router/api-reference/file-conventions/metadata/opengraph-image#opengraph-image)                      | .jpg .jpeg .png .gif | Open Graph图像文件   |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------- |
| [opengraph-image](/nextjs/app-router/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx) | .js .ts .tsx         | 生成的Open Graph图像 |
| [twitter-image](/nextjs/app-router/api-reference/file-conventions/metadata/opengraph-image#twitter-image)                          | .jpg .jpeg .png .gif | Twitter图像文件      |
| [twitter-image](/nextjs/app-router/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx)   | .js .ts .tsx         | 生成的Twitter图像    |

#### SEO

| [sitemap](/nextjs/app-router/api-reference/file-conventions/metadata/sitemap#sitemap-files-xml)                     | .xml    | 站点地图文件     |
| ------------------------------------------------------------------------------------------------------------------- | ------- | ---------------- |
| [sitemap](/nextjs/app-router/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts) | .js .ts | 生成的站点地图   |
| [robots](/nextjs/app-router/api-reference/file-conventions/metadata/robots#static-robotstxt)                        | .txt    | Robots文件       |
| [robots](/nextjs/app-router/api-reference/file-conventions/metadata/robots#generate-a-robots-file)                  | .js .ts | 生成的Robots文件 |

## 组织项目

Next.js对于如何组织和共置项目文件**并不强制要求**。但它确实提供了几个功能来帮助您组织项目。

### 组件层次结构

特殊文件中定义的组件按特定层次结构渲染：

- `layout.js`
- `template.js`
- `error.js` (React错误边界)
- `loading.js` (React suspense边界)
- `not-found.js` (React错误边界)
- `page.js`或嵌套的`layout.js`

组件在嵌套路由中递归渲染，即路由段的组件将嵌套在其父段组件**内部**。

### 共置

在`app`目录中，嵌套文件夹定义路由结构。每个文件夹表示一个路由段，映射到URL路径中的相应段。

然而，尽管路由结构是通过文件夹定义的，但只有在路由段中添加了`page.js`或`route.js`文件后，路由才能**公开访问**。

即使路由可以公开访问，也只有`page.js`或`route.js`**返回的内容**才会发送到客户端。

这意味着可以在`app`目录中的路由段内**安全地共置**项目文件，而不必担心它们被意外路由。

> **提示**：虽然您**可以**在`app`中共置项目文件，但您**不必**这样做。如果您愿意，可以将它们保存在app目录之外。

### 私有文件夹

可以通过使用下划线为文件夹添加前缀来创建私有文件夹：`_folderName`

这表示该文件夹是一个私有实现细节，不应该被路由系统考虑，从而将该文件夹及其所有子文件夹**排除在路由之外**。

私有文件夹的用途：

- 将UI逻辑与路由逻辑分离。
- 在项目和Next.js生态系统中一致地组织内部文件。
- 在代码编辑器中对文件进行排序和分组。
- 避免与未来Next.js文件约定可能发生的名称冲突。

> **提示**：
>
> - 虽然不是框架约定，但您也可以考虑使用相同的下划线模式将私有文件夹外的文件标记为"私有"。
> - 您可以通过使用`%5F`（下划线的URL编码形式）作为文件夹名称的前缀来创建以下划线开头的URL段：`%5FfolderName`。
> - 如果您不使用私有文件夹，了解Next.js特殊文件约定会很有帮助，以防止意外的命名冲突。

### 路由组

可以通过在文件夹名称周围加上括号来创建路由组：`(folderName)`

这表示该文件夹仅用于组织目的，**不应包含**在路由的URL路径中。

路由组的用途：

- 按站点部分、意图或团队组织路由。例如：营销页面、管理页面等。
- 在同一路由段级别启用嵌套布局：
  - 在同一段中创建多个嵌套布局，包括多个根布局
  - 为公共段中的路由子集添加布局

### src文件夹

Next.js支持将应用程序代码（包括`app`）存储在可选的src文件夹中。这将应用程序代码与主要位于项目根目录的项目配置文件分开。

## 示例

以下部分列出了常见策略的高级概述。最简单的要点是选择一种适合您和您的团队的策略，并在整个项目中保持一致。

> **提示**：在下面的示例中，我们使用`components`和`lib`文件夹作为一般化的占位符，它们的命名没有特殊的框架意义，您的项目可能使用其他文件夹，如`ui`、`utils`、`hooks`、`styles`等。

### 将项目文件存储在app之外

此策略将所有应用程序代码存储在**项目根目录**的共享文件夹中，并保持`app`目录仅用于路由目的。

```
my-app/
├── components/
├── lib/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       └── page.tsx
```

### 将项目文件存储在app内的顶级文件夹中

此策略将所有应用程序代码存储在**`app`目录的根目录**中的共享文件夹中。

```
my-app/
├── app/
│   ├── components/
│   ├── lib/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       └── page.tsx
```

### 按功能或路由拆分项目文件

此策略将全局共享的应用程序代码存储在根`app`目录中，并将更具体的应用程序代码**拆分**到使用它们的路由段中。

```
my-app/
├── app/
│   ├── components/
│   ├── lib/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       ├── components/
│       ├── lib/
│       └── page.tsx
```

### 组织路由而不影响URL路径

要组织路由而不影响URL，请创建一个组来将相关路由保持在一起。括号中的文件夹将从URL中省略（例如`(marketing)`或`(shop)`）。

```
my-app/
├── app/
│   ├── (marketing)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── blog/
│   │       └── page.tsx
│   ├── (shop)/
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   └── layout.tsx
```

即使`(marketing)`和`(shop)`内的路由共享相同的URL层次结构，您也可以通过在它们的文件夹中添加`layout.js`文件为每个组创建不同的布局。

```
my-app/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── blog/
│   │       └── page.tsx
│   ├── (shop)/
│   │   ├── layout.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   └── layout.tsx
```

### 将特定段加入布局

要将特定路由加入布局，请创建一个新的路由组（例如`(shop)`），并将共享相同布局的路由移到组中（例如`account`和`cart`）。组外的路由将不会共享布局（例如`checkout`）。

```
my-app/
├── app/
│   ├── (shop)/
│   │   ├── layout.tsx
│   │   ├── account/
│   │   │   └── page.tsx
│   │   └── cart/
│   │       └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   └── layout.tsx
```

### 为特定路由选择加载骨架屏

要通过`loading.js`文件为特定路由应用加载骨架屏，请创建一个新的路由组（例如`/(overview)`），然后将`loading.tsx`放在该路由组内。

```
my-app/
├── app/
│   ├── dashboard/
│   │   ├── (overview)/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   └── layout.tsx
```

现在，`loading.tsx`文件将只应用于您的仪表板→概述页面，而不是所有仪表板页面，且不会影响URL路径结构。

### 创建多个根布局

要创建多个根布局，请删除顶级`layout.js`文件，并在每个路由组中添加一个`layout.js`文件。这对于将应用程序分成具有完全不同UI或体验的部分很有用。每个根布局都需要添加`<html>`和`<body>`标签。

```
my-app/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (shop)/
│   │   ├── layout.tsx
│   │   └── page.tsx
```

在上面的例子中，`(marketing)`和`(shop)`都有自己的根布局。
