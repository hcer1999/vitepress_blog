---
title: Next.js 中文文档
description: 学习Next.js的路由基础知识
---

# Next.js 中文文档 - 路由基础

App Router提供了一个基于文件系统的路由器，支持布局、嵌套路由、加载状态、错误处理等。

在这个部分，您将学习如何在Next.js应用程序中实现常见的路由模式和约定。

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
