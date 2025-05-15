---
title: Next.js 中文文档 - 路由组
description: 使用路由组组织路由而不影响URL路径结构
---

# Next.js 中文文档 - 路由组

在App Router中，你可以使用路由组将路由和项目文件进行逻辑分组，而不影响URL路径结构。路由组对于：

- 按照站点区域、意图或团队组织路由
- 启用同一路由段级别的嵌套布局：
  - 为同一段创建多个嵌套布局，包括多个根布局
  - 向同一段的子集添加布局

## 约定

可以通过在文件夹名称周围添加括号来创建路由组：`(folderName)`

## 示例

### 组织路由

路由组对于按照站点区域、意图或团队来组织路由非常有用，例如将路由分为`marketing`和`shop`组，或按功能分组。

```
app/
├── (marketing)/ # 营销路由组
│   ├── about/
│   │   └── page.tsx # /about
│   └── blog/
│       └── page.tsx # /blog
├── (shop)/ # 商城路由组
│   ├── cart/
│   │   └── page.tsx # /cart
│   └── checkout/
│       └── page.tsx # /checkout
└── layout.tsx # 应用根布局
```

在上面的例子中：

- `(marketing)`和`(shop)`分组不影响URL路径，所以`/about`而不是`/(marketing)/about`
- 分组内的路由共享同一个文件夹，但它们不共享特定的URL层次结构（如`/marketing/about`）
- 这种结构允许你在不影响URL结构的情况下组织文件

> **注意**：括号内的名称只是为了组织目的，不影响路由或URL路径。

### 创建多个根布局

你可以使用路由组在同一级别创建不同的根布局。例如，你希望网站的不同部分有完全不同的UI或体验。

```
app/
├── (marketing)/ # 营销路由组
│   ├── layout.tsx # 营销根布局
│   └── page.tsx # 首页 (www.example.com/)
└── (shop)/ # 商城路由组
    ├── layout.tsx # 商城根布局
    └── account/
        └── page.tsx # 账户页面 (www.example.com/account)
```

在上面的例子中：

- `(marketing)`和`(shop)`路由组各自有自己的根布局，完全不同的UI设计
- `account`路由没有单独的URL段，因为它位于`(shop)`组内
- 这种方式可以完全隔离应用程序的不同部分

> **注意**：当使用多个根布局时，不应有顶级`app/layout.js`文件。另外，每个路由必须属于某个路由组。

### 选择性应用布局到路由

路由组也可用于将布局应用到特定路由集合。例如，如果你想向部分`/dashboard`下的路由添加特定布局，但不应用于所有页面。

```
app/
├── dashboard/
│   ├── (overview)/ # 仪表盘概览路由组
│   │   ├── page.tsx # /dashboard
│   │   └── customers/
│   │       └── page.tsx # /dashboard/customers
│   ├── (analytics)/ # 分析路由组
│   │   ├── layout.tsx # 分析布局
│   │   ├── revenue/
│   │   │   └── page.tsx # /dashboard/revenue
│   │   └── visitors/
│   │       └── page.tsx # /dashboard/visitors
│   └── layout.tsx # 仪表盘共享布局
└── layout.tsx # 应用根布局
```

在上面的例子中：

- `/dashboard`, `/dashboard/customers`共享`dashboard/layout.js`中定义的UI
- `/dashboard/revenue`和`/dashboard/visitors`有额外的布局`analytics/layout.js`，该布局只应用于这两个路由

## URL 路径与路由组

对于不影响路由的URL路径，括号中的文件夹会在URL计算过程中被忽略。例如：

| 路由组                                | URL            |
| ------------------------------------- | -------------- |
| `app/(marketing)/about/page.js`       | `/about`       |
| `app/(marketing)/blog/[slug]/page.js` | `/blog/post-1` |
| `app/(shop)/cart/page.js`             | `/cart`        |
| `app/(shop)/checkout/page.js`         | `/checkout`    |

这允许你在保持URL结构干净的同时，自由组织项目文件和文件夹。

## 嵌套路由组

你可以将路由组嵌套在另一个路由组内，尽管这种做法通常不是必需的，因为括号对最终的URL路径没有影响：

```
app/
├── (marketing)/
│   ├── (campaigns)/
│   │   └── latest/
│   │       └── page.tsx # /latest
│   └── about/
│       └── page.tsx # /about
└── (shop)/
    └── page.tsx # /
```

## 路由组 vs 布局

- **路由组**：用于组织路由和项目文件，*不影响*URL结构。
- **布局**：可共享的UI片段，路由*之间*相互嵌套。

由于布局嵌套在其子路由之间，像`app/dashboard/layout.js`这样的布局会应用于`app/dashboard/settings/page.js`这样的路由，并导致`/dashboard/settings`的URL路径。

如果你在`app/(dashboard)/settings/page.js`中使用路由组，那么URL将是`/settings`，因为`(dashboard)`对URL路径无影响。

## 路由组最佳实践

1. **语义化组织**：使用路由组按功能、团队或业务领域组织代码
2. **避免路径冲突**：确保多个路由组中的路径不会解析为同一个URL
3. **保持简单**：不要过度嵌套路由组，保持扁平结构以便更好地理解项目
4. **命名清晰**：使用描述性的名称，例如`(marketing)`, `(shop)`, `(dashboard)`

5. **合理分离关注点**：使用路由组将不同UI模式、团队职责或网站区域逻辑分开

6. **区分布局使用**：只在需要针对特定路由子集应用不同布局时才使用路由组创建多个布局

## 相关资源

- [页面和布局](/nextjs/app-router/building-your-application/routing/pages-and-layouts)
- [路由基础](/nextjs/app-router/building-your-application/routing)
- [嵌套布局](/nextjs/app-router/building-your-application/routing/layouts-and-templates)
