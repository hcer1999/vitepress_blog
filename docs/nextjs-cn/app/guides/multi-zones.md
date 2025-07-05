---
title: 如何使用多区域和 Next.js 构建微前端
nav_title: 多区域
description: 学习如何使用 Next.js 多区域来构建微前端，将多个 Next.js 应用部署在单个域名下。
---

# NextJS中文文档 - Multi Zones

<details open>
  <summary>示例</summary>

- [With Zones](https://github.com/vercel/next.js/tree/canary/examples/with-zones)

</details>

多区域（Multi-Zones）是一种微前端方法，将域名上的大型应用程序分割成多个较小的 Next.js 应用程序，每个应用程序服务一组路径。当应用程序中存在与其他页面无关的页面集合时，这种方法非常有用。通过将这些页面移动到单独的区域（即单独的应用程序），你可以减小每个应用程序的大小，从而改善构建时间，并删除只对其中一个区域必要的代码。由于应用程序是解耦的，多区域还允许域名上的其他应用程序使用它们自己选择的框架。

例如，假设你有以下一组想要拆分的页面：

- `/blog/*` 用于所有博客文章
- `/dashboard/*` 用于用户登录到仪表板时的所有页面
- `/*` 用于其他区域未覆盖的网站其余部分

通过多区域支持，你可以创建三个应用程序，它们都在同一个域名上提供服务，对用户来说看起来相同，但你可以独立开发和部署每个应用程序。

<Image
  alt="三个区域：A、B、C。展示了不同区域路由之间的硬导航，以及同一区域内路由之间的软导航。"
  srcLight="/docs/light/multi-zones.png"
  srcDark="/docs/dark/multi-zones.png"
  width="1600"
  height="750"
/>

在同一区域内的页面之间导航将执行软导航，即不需要重新加载页面的导航。例如，在此图中，从 `/` 导航到 `/products` 将是一个软导航。

从一个区域的页面导航到另一个区域的页面，例如从 `/` 到 `/dashboard`，将执行硬导航，卸载当前页面的资源并加载新页面的资源。经常一起访问的页面应该位于同一区域，以避免硬导航。

## 如何定义区域

区域是一个普通的 Next.js 应用程序，你还需要配置 [assetPrefix](/nextjs-cn/app/api-reference/config/next-config-js/assetPrefix) 以避免与其他区域中的页面和静态文件冲突。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/blog-static',
}
```

Next.js 资产，如 JavaScript 和 CSS，将以 `assetPrefix` 为前缀，以确保它们不会与其他区域的资产冲突。这些资产将在每个区域的 `/assetPrefix/_next/...` 下提供服务。

处理所有未路由到另一个更具体区域的路径的默认应用程序不需要 `assetPrefix`。

在早于 Next.js 15 的版本中，你可能还需要额外的重写来处理静态资产。在 Next.js 15 中，这不再是必要的。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/blog-static',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/blog-static/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    }
  },
}
```

## 如何将请求路由到正确的区域

使用多区域设置后，你需要将路径路由到正确的区域，因为它们由不同的应用程序提供服务。你可以使用任何 HTTP 代理来实现这一点，但其中一个 Next.js 应用程序也可以用于路由整个域名的请求。

要使用 Next.js 应用程序路由到正确的区域，你可以使用 [`rewrites`](/nextjs-cn/app/api-reference/config/next-config-js/rewrites)。对于由不同区域提供服务的每个路径，你需要添加一个重写规则，将该路径发送到其他区域的域名，并且还需要重写静态资产的请求。例如：

```js
async rewrites() {
    return [
        {
            source: '/blog',
            destination: `${process.env.BLOG_DOMAIN}/blog`,
        },
        {
            source: '/blog/:path+',
            destination: `${process.env.BLOG_DOMAIN}/blog/:path+`,
        },
        {
            source: '/blog-static/:path+',
            destination: `${process.env.BLOG_DOMAIN}/blog-static/:path+`,
        }
    ];
}
```

`destination` 应该是由该区域提供服务的 URL，包括协议和域名。这应该指向区域的生产域名，但也可以用于在本地开发中将请求路由到 `localhost`。

> **须知**：URL 路径应该对于区域是唯一的。例如，两个区域尝试提供 `/blog` 会创建路由冲突。

### 使用中间件路由请求

通过 [`rewrites`](/nextjs-cn/app/api-reference/config/next-config-js/rewrites) 路由请求是推荐的方法，可以最小化请求的延迟开销，但当路由时需要动态决策时，也可以使用中间件。例如，如果你正在使用功能标志来决定路径应该被路由到哪里，比如在迁移期间，你可以使用中间件。

```js
export async function middleware(request) {
  const { pathname, search } = req.nextUrl;
  if (pathname === '/your-path' && myFeatureFlag.isEnabled()) {
    return NextResponse.rewrite(`${rewriteDomain}${pathname}${search});
  }
}
```

## 区域之间的链接

链接到不同区域的路径应该使用 `a` 标签，而不是 Next.js 的 [`<Link>`](/nextjs-cn/pages/api-reference/components/link) 组件。这是因为 Next.js 会尝试预取并软导航到 `<Link>` 组件中的任何相对路径，这在跨区域时不会起作用。

## 共享代码/nextjs-cn/

组成不同区域的 Next.js 应用程序可以位于任何仓库中。然而，将这些区域放在 [monorepo](https://en.wikipedia.org/wiki/Monorepo) 中通常很方便，以更容易地共享代码。对于位于不同仓库中的区域，也可以使用公共或私有 NPM 包共享代码。

由于不同区域的页面可能在不同时间发布，特性标志对于在不同区域之间统一启用或禁用功能非常有用。

<AppOnly>

## 服务器操作

当在多区域中使用 [服务器操作](/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations) 时，你必须明确允许面向用户的来源，因为你面向用户的域名可能服务于多个应用程序。在你的 `next.config.js` 文件中，添加以下行：

```js
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['your-production-domain.com'],
    },
  },
}
```

查看 [`serverActions.allowedOrigins`](/nextjs-cn/app/api-reference/config/next-config-js/serverActions#allowedorigins) 获取更多信息。

</AppOnly>
