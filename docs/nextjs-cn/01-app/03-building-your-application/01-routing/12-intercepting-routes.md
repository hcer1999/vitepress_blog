---
title: 拦截路由
description: 使用拦截路由在当前布局内加载新路由，同时掩盖浏览器 URL，适用于模态等高级路由模式。
related:
  title: 后续步骤
  description: 了解如何将模态与拦截路由和平行路由结合使用。
  links:
    - app/building-your-application/routing/parallel-routes
---

拦截路由允许您在当前布局内加载应用程序其他部分的路由。当您希望显示路由内容而不让用户切换到不同上下文时，这种路由模式非常有用。

例如，当点击信息流中的照片时，您可以在模态中显示照片，覆盖在信息流上方。在这种情况下，Next.js 拦截 `/photo/123` 路由，掩盖 URL，并将其覆盖在 `/feed` 上。

<Image
  alt="拦截路由软导航"
  srcLight="/docs/light/intercepting-routes-soft-navigate.png"
  srcDark="/docs/dark/intercepting-routes-soft-navigate.png"
  width="1600"
  height="617"
/>

然而，当通过点击可共享 URL 或刷新页面导航到照片时，应该渲染完整的照片页面，而不是模态。此时不应发生路由拦截。

<Image
  alt="拦截路由硬导航"
  srcLight="/docs/light/intercepting-routes-hard-navigate.png"
  srcDark="/docs/dark/intercepting-routes-hard-navigate.png"
  width="1600"
  height="604"
/>

## 约定

拦截路由可以使用 `(..)` 约定定义，这类似于相对路径约定 `../`，但用于路由段。

您可以使用：

- `(.)` 匹配**同级**的路由段
- `(..)` 匹配**上一级**的路由段
- `(..)(..)` 匹配**上两级**的路由段
- `(...)` 匹配从 **root** `app` 目录的路由段

例如，您可以通过创建 `(..)photo` 目录，从 `feed` 段内拦截 `photo` 段。

<Image
  alt="拦截路由文件夹结构"
  srcLight="/docs/light/intercepted-routes-files.png"
  srcDark="/docs/dark/intercepted-routes-files.png"
  width="1600"
  height="604"
/>

> 注意，`(..)` 约定基于**路由段**，而不是文件系统。

## 示例

### 模态

拦截路由可以与[平行路由](/docs/app/building-your-application/routing/parallel-routes)结合使用来创建模态。这允许您解决构建模态时的常见挑战，例如：

- 使模态内容**通过 URL 可共享**。
- 在页面刷新时**保留上下文**，而不是关闭模态。
- 在**后退导航时关闭模态**，而不是返回到上一个路由。
- 在**前进导航时重新打开模态**。

考虑以下 UI 模式，用户可以使用客户端导航从图库中打开照片模态，或直接从可共享的 URL 导航到照片页面：

<Image
  alt="拦截路由模态示例"
  srcLight="/docs/light/intercepted-routes-modal-example.png"
  srcDark="/docs/dark/intercepted-routes-modal-example.png"
  width="1600"
  height="976"
/>

在上面的例子中，`photo` 段的路径可以使用 `(..)` 匹配器，因为 `@modal` 是一个插槽而**不是**段。这意味着 `photo` 路由只有一个段级别更高，尽管在文件系统中高出两个级别。

有关分步示例，请参阅[平行路由](/docs/app/building-your-application/routing/parallel-routes#modals)文档，或查看我们的[图片库示例](https://github.com/vercel-labs/nextgram)。

> **需要了解的是：**
>
> - 其他示例可能包括在顶部导航栏中打开登录模态，同时也有一个专用的 `/login` 页面，或在侧边模态中打开购物车。
