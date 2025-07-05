---
title: 如何部署你的 Next.js 应用程序
nav_title: 部署
description: 了解如何部署你的 Next.js 应用程序。
---

Next.js 可以作为 Node.js 服务器、Docker 容器、静态导出或适配运行在不同的平台上进行部署。

| 部署选项                         | 功能支持 |
| -------------------------------- | -------- |
| [Node.js 服务器](#nodejs-server) | 全部     |
| [Docker 容器](#docker)           | 全部     |
| [静态导出](#static-export)       | 有限     |
| [适配器](#adapters)              | 平台特定 |

## Node.js 服务器

Next.js 可以部署到任何支持 Node.js 的提供商。确保你的 `package.json` 有 `"build"` 和 `"start"` 脚本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

然后，运行 `npm run build` 来构建你的应用程序，运行 `npm run start` 来启动 Node.js 服务器。这个服务器支持所有 Next.js 功能。如果需要，你还可以切换到[自定义服务器](/docs/nextjs-cn/app/guides/custom-server)。

Node.js 部署支持所有 Next.js 功能。了解如何为你的基础设施[配置它们](/docs/nextjs-cn/app/guides/deployment/self-hosting)。

### 模板

- [Flightcontrol](https://github.com/nextjs/deploy-flightcontrol)
- [Railway](https://github.com/nextjs/deploy-railway)
- [Replit](https://github.com/nextjs/deploy-replit)

## Docker

Next.js 可以部署到任何支持 [Docker](https://www.docker.com/) 容器的提供商。这包括容器编排工具如 Kubernetes 或运行 Docker 的云提供商。

Docker 部署支持所有 Next.js 功能。了解如何为你的基础设施[配置它们](/docs/nextjs-cn/app/guides/deployment/self-hosting)。

### 模板

- [Docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- [Docker 多环境](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)
- [DigitalOcean](https://github.com/nextjs/deploy-digitalocean)
- [Fly.io](https://github.com/nextjs/deploy-fly)
- [Google Cloud Run](https://github.com/nextjs/deploy-google-cloud-run)
- [Render](https://github.com/nextjs/deploy-render)
- [SST](https://github.com/nextjs/deploy-sst)

## 静态导出

Next.js 支持从静态站点或[单页应用程序（SPA）](/docs/nextjs-cn/app/guides/single-page-applications)开始，然后后续可以选择升级以使用需要服务器的功能。

由于 Next.js 支持[静态导出](/docs/nextjs-cn/app/guides/deployment/static-exports)，它可以部署和托管在任何能够提供 HTML/CSS/JS 静态资源的 Web 服务器上。这包括像 AWS S3、Nginx 或 Apache 等工具。

作为[静态导出](/docs/nextjs-cn/app/guides/deployment/static-exports)运行**不支持**需要服务器的 Next.js 功能。[了解更多](/docs/nextjs-cn/app/guides/deployment/static-exports#unsupported-features)。

### 模板

- [GitHub Pages](https://github.com/nextjs/deploy-github-pages)

## 适配器

Next.js 可以适配运行在不同的平台上，以支持它们的基础设施功能。

请参考每个提供商的文档以了解支持的 Next.js 功能：

- [AWS Amplify Hosting](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components)
- [Cloudflare](https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs)
- [Deno Deploy](https://docs.deno.com/examples/next_tutorial)
- [Netlify](https://docs.netlify.com/frameworks/next-js/overview/#next-js-support-on-netlify)
- [Vercel](https://vercel.com/docs/frameworks/nextjs)

> **注意：** 我们正在开发一个[部署适配器 API](https://github.com/vercel/next.js/discussions/77740)供所有平台采用。完成后，我们将添加关于如何编写自己的适配器的文档。
