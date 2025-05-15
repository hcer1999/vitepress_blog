---
title: Next.js 中文文档
description: Next.js App Router文档中文翻译
---

# Next.js 中文文档 - App Router

**App Router**是一个基于文件系统的路由器，它使用React的最新特性，如服务器组件(Server Components)、Suspense和服务器函数(Server Functions)。

App Router是Next.js 13引入的新一代路由解决方案，提供了更强大的功能和更灵活的架构，使开发者能够构建功能丰富的全栈应用。

## 主要功能

App Router提供了一系列强大的功能：

- **[服务器组件](/nextjs/app-router/building-your-application/rendering/server-components)** - 默认使用React Server Components，减少客户端JavaScript大小
- **[客户端组件](/nextjs/app-router/building-your-application/rendering/client-components)** - 无缝集成交互式客户端功能
- **[流式传输](/nextjs/app-router/building-your-application/routing/loading-ui-and-streaming)** - 渐进式渲染UI，改善用户体验
- **[数据获取](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching)** - 简化的数据获取方法和自动缓存
- **嵌套路由** - 通过文件夹结构创建复杂的路由层次
- **[布局](/nextjs/app-router/building-your-application/routing/layouts-and-templates)** - 创建在多个页面间共享的UI
- **服务器操作** - 无需API端点即可修改数据的异步函数

## 文件夹和文件约定

App Router使用文件系统进行路由，使用特殊的文件名创建不同的UI组件：

- `layout.js` - 共享UI，用于多个路由段
- `page.js` - 每个路由的唯一UI
- `loading.js` - 在页面加载时显示的加载状态
- `error.js` - 当路由发生错误时显示的UI
- `not-found.js` - 404错误页面

## 构建与渲染

App Router支持多种渲染策略：

- **[静态渲染](/nextjs/app-router/building-your-application/rendering#静态渲染默认)** - 默认的渲染方式，在构建时生成HTML
- **[动态渲染](/nextjs/app-router/building-your-application/rendering#动态渲染)** - 在请求时为每个用户渲染页面
- **[流式渲染](/nextjs/app-router/building-your-application/rendering#流式传输)** - 逐步将UI从服务器发送到客户端

## 缓存机制

App Router提供了多层[缓存机制](/nextjs/app-router/deep-dive/caching)，优化应用性能：

- **请求记忆** - 缓存单个渲染过程中的重复数据获取
- **数据缓存** - 持久化存储服务器数据，在多个用户和请求间共享
- **完整路由缓存** - 缓存React Server Component有效载荷
- **路由器缓存** - 在客户端缓存之前访问过的路由

## 开始使用

通过遵循以下指南开始使用App Router：

- [安装](/nextjs/app-router/getting-started/installation) - 创建新的Next.js应用程序
- [项目结构](/nextjs/app-router/getting-started/project-structure) - 了解App Router项目结构
- [路由基础](/nextjs/app-router/building-your-application/routing) - 学习如何创建路由
- [数据获取](/nextjs/app-router/getting-started/fetching-data) - 学习如何获取数据

## 深入学习

- [渲染](/nextjs/app-router/building-your-application/rendering) - 深入了解Next.js的渲染机制
- [缓存](/nextjs/app-router/deep-dive/caching) - 掌握Next.js的缓存策略
- [数据获取和缓存](/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching) - 学习高级数据获取模式
