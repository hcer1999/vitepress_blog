---
title: 指南
description: 学习如何使用 Next.js 实现常见的 UI 模式和用例
---

### 数据获取

- [使用 `fetch` API](/docs/nextjs-cn/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api)
- [使用 ORM 或数据库客户端](/docs/nextjs-cn/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-an-orm-or-database)
- [在服务器端读取搜索参数](/docs/nextjs-cn/app/api-reference/file-conventions/page)
- [在客户端读取搜索参数](/docs/nextjs-cn/app/api-reference/functions/use-search-params)

### 数据重新验证

- [使用 ISR 在特定时间后重新验证数据](/docs/nextjs-cn/app/building-your-application/data-fetching/incremental-static-regeneration#time-based-revalidation)
- [使用 ISR 按需重新验证数据](/docs/nextjs-cn/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation-with-revalidatepath)

### 表单

- [提交表单时显示等待状态](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#pending-states)
- [服务器端表单验证](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-form-validation)
- [处理预期错误](/docs/nextjs-cn/app/building-your-application/routing/index/error-handling#handling-expected-errors-from-server-actions)
- [处理意外异常](/docs/nextjs-cn/app/building-your-application/routing/index/error-handling#uncaught-exceptions)
- [显示乐观 UI 更新](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#optimistic-updates)
- [程序化表单提交](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#programmatic-form-submission)

### 服务器操作

- [传递额外的值](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments)
- [重新验证数据](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#revalidating-data)
- [重定向](/docs/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations#redirecting)
- [设置 cookies](/docs/nextjs-cn/app/api-reference/functions/cookies#setting-a-cookie)
- [删除 cookies](/docs/nextjs-cn/app/api-reference/functions/cookies#deleting-cookies)

### 元数据

- [创建 RSS 订阅源](/docs/nextjs-cn/app/building-your-application/routing/index/route-handlers#non-ui-responses)
- [创建 Open Graph 图片](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/opengraph-image)
- [创建站点地图](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/sitemap)
- [创建 robots.txt 文件](/docs/nextjs-cn/app/api-reference/file-conventions/metadata/robots)
- [创建自定义 404 页面](/docs/nextjs-cn/app/api-reference/file-conventions/not-found)
- [创建自定义 500 页面](/docs/nextjs-cn/app/api-reference/file-conventions/error)

### 身份验证

- [创建注册表单](/docs/nextjs-cn/app/guides/authentication#sign-up-and-login-functionality)
- [无状态的、基于 cookie 的会话管理](/docs/nextjs-cn/app/guides/authentication#stateless-sessions)
- [有状态的、基于数据库的会话管理](/docs/nextjs-cn/app/guides/authentication#database-sessions)
- [管理授权](/docs/nextjs-cn/app/guides/authentication#authorization)

### 测试

- [Vitest](/docs/nextjs-cn/app/guides/testing/vitest)
- [Jest](/docs/nextjs-cn/app/guides/testing/jest)
- [Playwright](/docs/nextjs-cn/app/guides/testing/playwright)
- [Cypress](/docs/nextjs-cn/app/guides/testing/cypress)

### 部署

- [创建 Dockerfile](/docs/nextjs-cn/app/getting-started/deploying#docker)
- [创建静态导出（SPA）](/docs/nextjs-cn/app/guides/deployment/static-exports)
- [配置自托管时的缓存](/docs/nextjs-cn/app/guides/deployment/self-hosting#configuring-caching)
- [配置自托管时的图片优化](/docs/nextjs-cn/app/guides/deployment/self-hosting#image-optimization)
