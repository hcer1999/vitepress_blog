---
title: 项目结构和组织
nav_title: 项目结构
description: Next.js 中文件夹和文件约定的概述，以及如何组织你的项目。
---

本页面提供了 Next.js 中**所有**文件夹和文件约定的概述，以及组织项目的建议。

## 文件夹和文件约定

### 顶级文件夹

顶级文件夹用于组织应用程序的代码和静态资源。

<Image
  alt="路由段到路径段"
  srcLight="/docs/light/top-level-folders.png"
  srcDark="/docs/dark/top-level-folders.png"
  width="1600"
  height="525"
/>

|                                                                         |                            |
| ----------------------------------------------------------------------- | -------------------------- |
| [`app`](/nextjs-cn/app/building-your-application/routing/index)         | App Router（应用路由器）   |
| [`pages`](/nextjs-cn/pages/building-your-application/routing/index)     | Pages Router（页面路由器） |
| [`public`](/nextjs-cn/app/api-reference/file-conventions/public-folder) | 要提供的静态资源           |
| [`src`](/nextjs-cn/app/api-reference/file-conventions/src-folder)       | 可选的应用程序源代码文件夹 |

### 顶级文件

顶级文件用于配置应用程序、管理依赖项、运行中间件、集成监控工具和定义环境变量。

|                                                                                   |                                |
| --------------------------------------------------------------------------------- | ------------------------------ |
| **Next.js**                                                                       |                                |
| [`next.config.js`](/nextjs-cn/app/api-reference/config/next-config-js/index)      | Next.js 配置文件               |
| [`package.json`](/nextjs-cn/app/getting-started/installation#manual-installation) | 项目依赖项和脚本               |
| [`instrumentation.ts`]()                                                          | OpenTelemetry 和检测文件       |
| [`middleware.ts`](/nextjs-cn/app/building-your-application/routing/middleware)    | Next.js 请求中间件             |
| [`.env`]()                                                                        | 环境变量                       |
| [`.env.local`]()                                                                  | 本地环境变量                   |
| [`.env.production`]()                                                             | 生产环境变量                   |
| [`.env.development`]()                                                            | 开发环境变量                   |
| [`.eslintrc.json`](/nextjs-cn/app/api-reference/config/eslint)                    | ESLint 配置文件                |
| `.gitignore`                                                                      | Git 忽略的文件和文件夹         |
| `next-env.d.ts`                                                                   | Next.js 的 TypeScript 声明文件 |
| `tsconfig.json`                                                                   | TypeScript 配置文件            |
| `jsconfig.json`                                                                   | JavaScript 配置文件            |

<AppOnly>

### 路由文件

|                                                                                    |                     |                  |
| ---------------------------------------------------------------------------------- | ------------------- | ---------------- |
| [`layout`](/nextjs-cn/app/api-reference/file-conventions/layout)                   | `.js` `.jsx` `.tsx` | 布局             |
| [`page`](/nextjs-cn/app/api-reference/file-conventions/page)                       | `.js` `.jsx` `.tsx` | 页面             |
| [`loading`](/nextjs-cn/app/api-reference/file-conventions/loading)                 | `.js` `.jsx` `.tsx` | 加载 UI          |
| [`not-found`](/nextjs-cn/app/api-reference/file-conventions/not-found)             | `.js` `.jsx` `.tsx` | 未找到 UI        |
| [`error`](/nextjs-cn/app/api-reference/file-conventions/error)                     | `.js` `.jsx` `.tsx` | 错误 UI          |
| [`global-error`](/nextjs-cn/app/api-reference/file-conventions/error#global-error) | `.js` `.jsx` `.tsx` | 全局错误 UI      |
| [`route`](/nextjs-cn/app/api-reference/file-conventions/route)                     | `.js` `.ts`         | API 端点         |
| [`template`](/nextjs-cn/app/api-reference/file-conventions/template)               | `.js` `.jsx` `.tsx` | 重新渲染的布局   |
| [`default`](/nextjs-cn/app/api-reference/file-conventions/default)                 | `.js` `.jsx` `.tsx` | 并行路由回退页面 |

### 嵌套路由

|                 |            |
| --------------- | ---------- |
| `folder`        | 路由段     |
| `folder/folder` | 嵌套路由段 |

### 动态路由

|                                                                                                                |                      |
| -------------------------------------------------------------------------------------------------------------- | -------------------- |
| [`[folder]`](/nextjs-cn/app/building-your-application/routing/dynamic-routes#convention)                       | 动态路由段           |
| [`[...folder]`](/nextjs-cn/app/building-your-application/routing/dynamic-routes#catch-all-segments)            | 捕获所有路由段       |
| [`[[...folder]]`](/nextjs-cn/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | 可选的捕获所有路由段 |

### 路由组和私有文件夹

|                                                                                        |                                    |
| -------------------------------------------------------------------------------------- | ---------------------------------- |
| [`(folder)`](/nextjs-cn/app/building-your-application/routing/route-groups#convention) | 分组路由而不影响路由               |
| [`_folder`](#private-folders)                                                          | 将文件夹及其所有子段排除在路由之外 |

### 并行和拦截路由

|                                                                                                     |              |
| --------------------------------------------------------------------------------------------------- | ------------ |
| [`@folder`](/nextjs-cn/app/building-your-application/routing/parallel-routes#slots)                 | 命名插槽     |
| [`(.)folder`](/nextjs-cn/app/building-your-application/routing/intercepting-routes#convention)      | 拦截同级     |
| [`(..)folder`](/nextjs-cn/app/building-your-application/routing/intercepting-routes#convention)     | 拦截上一级   |
| [`(..)(..)folder`](/nextjs-cn/app/building-your-application/routing/intercepting-routes#convention) | 拦截上两级   |
| [`(...)folder`](/nextjs-cn/app/building-your-application/routing/intercepting-routes#convention)    | 从根目录拦截 |

### 元数据文件约定

#### 应用图标

|                                                                                                                      |                                     |                       |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------- |
| [`favicon`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons#favicon)                                | `.ico`                              | 网站图标文件          |
| [`icon`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons#icon)                                      | `.ico` `.jpg` `.jpeg` `.png` `.svg` | 应用图标文件          |
| [`icon`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx)       | `.js` `.ts` `.tsx`                  | 生成的应用图标        |
| [`apple-icon`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons#apple-icon)                          | `.jpg` `.jpeg`, `.png`              | Apple 应用图标文件    |
| [`apple-icon`](/nextjs-cn/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | `.js` `.ts` `.tsx`                  | 生成的 Apple 应用图标 |

#### Open Graph 和 Twitter 图片

|                                                                                                                                  |                              |                        |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------- |
| [`opengraph-image`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image#opengraph-image)                      | `.jpg` `.jpeg` `.png` `.gif` | Open Graph 图片文件    |
| [`opengraph-image`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx) | `.js` `.ts` `.tsx`           | 生成的 Open Graph 图片 |
| [`twitter-image`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image#twitter-image)                          | `.jpg` `.jpeg` `.png` `.gif` | Twitter 图片文件       |
| [`twitter-image`](/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx)   | `.js` `.ts` `.tsx`           | 生成的 Twitter 图片    |

#### SEO

|                                                                                                                   |             |                    |
| ----------------------------------------------------------------------------------------------------------------- | ----------- | ------------------ |
| [`sitemap`](/nextjs-cn/app/api-reference/file-conventions/metadata/sitemap#sitemap-files-xml)                     | `.xml`      | 站点地图文件       |
| [`sitemap`](/nextjs-cn/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts) | `.js` `.ts` | 生成的站点地图     |
| [`robots`](/nextjs-cn/app/api-reference/file-conventions/metadata/robots#static-robotstxt)                        | `.txt`      | Robots 文件        |
| [`robots`](/nextjs-cn/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file)                  | `.js` `.ts` | 生成的 Robots 文件 |

</AppOnly>

<PagesOnly>

### 文件约定

|                                                                                                                  |                     |                 |
| ---------------------------------------------------------------------------------------------------------------- | ------------------- | --------------- |
| [`_app`](/nextjs-cn/pages/building-your-application/routing/custom-app)                                          | `.js` `.jsx` `.tsx` | 自定义 App      |
| [`_document`](/nextjs-cn/pages/building-your-application/routing/custom-document)                                | `.js` `.jsx` `.tsx` | 自定义 Document |
| [`_error`](/nextjs-cn/pages/building-your-application/routing/custom-error#more-advanced-error-page-customizing) | `.js` `.jsx` `.tsx` | 自定义错误页面  |
| [`404`](/nextjs-cn/pages/building-your-application/routing/custom-error#page)                                    | `.js` `.jsx` `.tsx` | 404 错误页面    |
| [`500`](/nextjs-cn/pages/building-your-application/routing/custom-error#page)                                    | `.js` `.jsx` `.tsx` | 500 错误页面    |

### 路由

|                                                                                                     |                     |          |
| --------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| **文件夹约定**                                                                                      |                     |          |
| [`index`](/nextjs-cn/pages/building-your-application/routing/pages-and-layouts#index-routes)        | `.js` `.jsx` `.tsx` | 主页     |
| [`folder/index`](/nextjs-cn/pages/building-your-application/routing/pages-and-layouts#index-routes) | `.js` `.jsx` `.tsx` | 嵌套页面 |
| **文件约定**                                                                                        |                     |          |
| [`index`](/nextjs-cn/pages/building-your-application/routing/pages-and-layouts#index-routes)        | `.js` `.jsx` `.tsx` | 主页     |
| [`file`](/nextjs-cn/pages/building-your-application/routing/pages-and-layouts)                      | `.js` `.jsx` `.tsx` | 嵌套页面 |

### 动态路由

|                                                                                                                        |                     |                      |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------- |
| **文件夹约定**                                                                                                         |                     |                      |
| [`[folder]/index`](/nextjs-cn/pages/building-your-application/routing/dynamic-routes)                                  | `.js` `.jsx` `.tsx` | 动态路由段           |
| [`[...folder]/index`](/nextjs-cn/pages/building-your-application/routing/dynamic-routes#catch-all-segments)            | `.js` `.jsx` `.tsx` | 捕获所有路由段       |
| [`[[...folder]]/index`](/nextjs-cn/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | `.js` `.jsx` `.tsx` | 可选的捕获所有路由段 |
| **文件约定**                                                                                                           |                     |                      |
| [`[file]`](/nextjs-cn/pages/building-your-application/routing/dynamic-routes)                                          | `.js` `.jsx` `.tsx` | 动态路由段           |
| [`[...file]`](/nextjs-cn/pages/building-your-application/routing/dynamic-routes#catch-all-segments)                    | `.js` `.jsx` `.tsx` | 捕获所有路由段       |
| [`[[...file]]`](/nextjs-cn/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments)         | `.js` `.jsx` `.tsx` | 可选的捕获所有路由段 |

</PagesOnly>

<AppOnly>

## 组织你的项目

Next.js 对于如何组织和放置项目文件是**不固定**的。但它确实提供了几个功能来帮助你组织项目。

### 组件层次结构

特殊文件中定义的组件按特定层次结构渲染：

- `layout.js`
- `template.js`
- `error.js`（React 错误边界）
- `loading.js`（React suspense 边界）
- `not-found.js`（React 错误边界）
- `page.js` 或嵌套的 `layout.js`

<Image
  alt="文件约定的组件层次结构"
  srcLight="/docs/light/file-conventions-component-hierarchy.png"
  srcDark="/docs/dark/file-conventions-component-hierarchy.png"
  width="1600"
  height="643"
/>

组件在嵌套路由中递归渲染，这意味着路由段的组件将被嵌套在其父段的组件**内部**。

<Image
  alt="嵌套文件约定组件层次结构"
  srcLight="/docs/light/nested-file-conventions-component-hierarchy.png"
  srcDark="/docs/dark/nested-file-conventions-component-hierarchy.png"
  width="1600"
  height="687"
/>

### Colocation

在 `app` 目录中，嵌套路由定义路由结构。每个文件夹表示一个路由段，该段映射到 URL 路径中的相应段。

但是，即使路由结构是通过文件夹定义的，路由**不会公开访问**，直到向路由段添加 `page.js` 或 `route.js` 文件。

<Image
  alt="A diagram showing how a route is not publicly accessible until a page.js or route.js file is added to a route segment."
  srcLight="/docs/light/project-organization-not-routable.png"
  srcDark="/docs/dark/project-organization-not-routable.png"
  width="1600"
  height="444"
/>

并且，即使路由被公开访问，也只有**内容返回**由 `page.js` 或 `route.js` 文件发送给客户端。

<Image
  alt="A diagram showing how page.js and route.js files make routes publicly accessible."
  srcLight="/docs/light/project-organization-routable.png"
  srcDark="/docs/dark/project-organization-routable.png"
  width="1600"
  height="687"
/>

这意味着**项目文件**可以**安全地放置**在 `app` 目录中的路由段中，而不会意外地被路由。

<Image
  alt="A diagram showing colocated project files are not routable even when a segment contains a page.js or route.js file."
  srcLight="/docs/light/project-organization-colocation.png"
  srcDark="/docs/dark/project-organization-colocation.png"
  width="1600"
  height="1011"
/>

> **Good to know**: While you **can** colocate your project files in `app` you don't **have** to. If you prefer, you can [keep them outside the `app` directory](#store-project-files-outside-of-app).

### Private folders

Private folders can be created by prefixing a folder with an underscore: `_folderName`

This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby **opting the folder and all its subfolders** out of routing.

<Image
  alt="An example folder structure using private folders"
  srcLight="/docs/light/project-organization-private-folders.png"
  srcDark="/docs/dark/project-organization-private-folders.png"
  width="1600"
  height="849"
/>

Since files in the `app` directory can be [safely colocated by default](#colocation), private folders are not required for colocation. However, they can be useful for:

- Separating UI logic from routing logic.
- Consistently organizing internal files across a project and the Next.js ecosystem.
- Sorting and grouping files in code editors.
- Avoiding potential naming conflicts with future Next.js file conventions.

> **Good to know**:
>
> - While not a framework convention, you might also consider marking files outside private folders as "private" using the same underscore pattern.
> - You can create URL segments that start with an underscore by prefixing the folder name with `%5F` (the URL-encoded form of an underscore): `%5FfolderName`.
> - If you don't use private folders, it would be helpful to know Next.js [special file conventions](/nextjs-cn/app/getting-started/project-structure#routing-files) to prevent unexpected naming conflicts.

### Route groups

Route groups can be created by wrapping a folder in parenthesis: `(folderName)`

This indicates the folder is for organizational purposes and should **not be included** in the route's URL path.

<Image
  alt="An example folder structure using route groups"
  srcLight="/docs/light/project-organization-route-groups.png"
  srcDark="/docs/dark/project-organization-route-groups.png"
  width="1600"
  height="849"
/>

Route groups are useful for:

- Organizing routes by site section, intent, or team. e.g. marketing pages, admin pages, etc.
- Enabling nested layouts in the same route segment level:
  - [Creating multiple nested layouts in the same segment, including multiple root layouts](#creating-multiple-root-layouts)
  - [Adding a layout to a subset of routes in a common segment](#opting-specific-segments-into-a-layout)

### `src` folder

Next.js supports storing application code (including `app`) inside an optional [`src` folder](/nextjs-cn/app/api-reference/file-conventions/src-folder). This separates application code from project configuration files which mostly live in the root of a project.

<Image
  alt="An example folder structure with the `src` folder"
  srcLight="/docs/light/project-organization-src-directory.png"
  srcDark="/docs/dark/project-organization-src-directory.png"
  width="1600"
  height="687"
/>

## Examples

The following section lists a very high-level overview of common strategies. The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project.

> **Good to know**: In our examples below, we're using `components` and `lib` folders as generalized placeholders, their naming has no special framework significance and your projects might use other folders like `ui`, `utils`, `hooks`, `styles`, etc.

### Store project files outside of `app`

This strategy stores all application code in shared folders in the **root of your project** and keeps the `app` directory purely for routing purposes.

<Image
  alt="An example folder structure with project files outside of app"
  srcLight="/docs/light/project-organization-project-root.png"
  srcDark="/docs/dark/project-organization-project-root.png"
  width="1600"
  height="849"
/>

### Store project files in top-level folders inside of `app`

This strategy stores all application code in shared folders in the **root of the `app` directory**.

<Image
  alt="An example folder structure with project files inside app"
  srcLight="/docs/light/project-organization-app-root.png"
  srcDark="/docs/dark/project-organization-app-root.png"
  width="1600"
  height="849"
/>

### Split project files by feature or route

This strategy stores globally shared application code in the root `app` directory and **splits** more specific application code into the route segments that use them.

<Image
  alt="An example folder structure with project files split by feature or route"
  srcLight="/docs/light/project-organization-app-root-split.png"
  srcDark="/docs/dark/project-organization-app-root-split.png"
  width="1600"
  height="1011"
/>

### Organize routes without affecting the URL path

To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. `(marketing)` or `(shop)`).

<Image
  alt="Organizing Routes with Route Groups"
  srcLight="/docs/light/route-group-organisation.png"
  srcDark="/docs/dark/route-group-organisation.png"
  width="1600"
  height="930"
/>

Even though routes inside `(marketing)` and `(shop)` share the same URL hierarchy, you can create a different layout for each group by adding a `layout.js` file inside their folders.

<Image
  alt="Route Groups with Multiple Layouts"
  srcLight="/docs/light/route-group-multiple-layouts.png"
  srcDark="/docs/dark/route-group-multiple-layouts.png"
  width="1600"
  height="768"
/>

### Opting specific segments into a layout

To opt specific routes into a layout, create a new route group (e.g. `(shop)`) and move the routes that share the same layout into the group (e.g. `account` and `cart`). The routes outside of the group will not share the layout (e.g. `checkout`).

<Image
  alt="Route Groups with Opt-in Layouts"
  srcLight="/docs/light/route-group-opt-in-layouts.png"
  srcDark="/docs/dark/route-group-opt-in-layouts.png"
  width="1600"
  height="930"
/>

### Opting for loading skeletons on a specific route

To apply a [loading skeleton](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming) via a `loading.js` file to a specific route, create a new route group (e.g., `/(overview)`) and then move your `loading.tsx` inside that route group.

<Image
  alt="Folder structure showing a loading.tsx and a page.tsx inside the route group"
  srcLight="/docs/light/route-group-loading.png"
  srcDark="/docs/dark/route-group-loading.png"
  width="1600"
  height="444"
/>

Now, the `loading.tsx` file will only apply to your dashboard → overview page instead of all your dashboard pages without affecting the URL path structure.

### Creating multiple root layouts

To create multiple [root layouts](/nextjs-cn/app/api-reference/file-conventions/layout#root-layouts), remove the top-level `layout.js` file, and add a `layout.js` file inside each route group. This is useful for partitioning an application into sections that have a completely different UI or experience. The `<html>` and `<body>` tags need to be added to each root layout.

<Image
  alt="Route Groups with Multiple Root Layouts"
  srcLight="/docs/light/route-group-multiple-root-layouts.png"
  srcDark="/docs/dark/route-group-multiple-root-layouts.png"
  width="1600"
  height="687"
/>

In the example above, both `(marketing)` and `(shop)` have their own root layout.

</AppOnly>
