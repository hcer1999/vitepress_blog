---
title: Next.js 中文文档 - 部署
description: 将Next.js应用程序部署到生产环境的多种方式。
---

# Next.js 中文文档 - 部署

Next.js应用程序可以部署到多种平台，从专门的无服务器平台到自托管的传统服务器。本文档将介绍主要的部署方式及其步骤。

## 构建项目

在部署之前，需要先构建应用程序：

```bash
# Next.js 中文文档 - 使用npm
npm run build

# Next.js 中文文档 - 使用yarn
yarn build

# Next.js 中文文档 - 使用pnpm
pnpm build
```

构建完成后，会在`.next`文件夹中生成生产优化版本的应用程序。

## 部署平台

### Vercel (推荐)

[Vercel](https://vercel.com)是Next.js的创建者开发的平台，提供最优化的Next.js部署体验：

1. 从GitHub、GitLab或Bitbucket导入仓库
2. Vercel会自动检测Next.js项目，并使用最优配置
3. 应用会自动部署，并在每次代码推送时更新

优势：

- 零配置部署
- 自动HTTPS和CDN
- 全球边缘网络
- 自动预览部署
- 环境变量和域名管理
- 分析和监控
- 与Next.js无缝集成

### Netlify

Netlify也提供了良好的Next.js支持：

1. 从GitHub、GitLab或Bitbucket导入仓库
2. 构建命令设置为`npm run build`(或相应的yarn/pnpm命令)
3. 发布目录设置为`.next`

```toml
# Next.js 中文文档 - netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### AWS Amplify

AWS Amplify支持部署Next.js应用：

1. 连接到代码仓库
2. 选择Next.js构建预设或手动配置
3. 设置环境变量(如需)
4. 点击部署

### Docker部署

Next.js可以使用Docker容器化进行部署：

```dockerfile
# Next.js 中文文档 - Dockerfile
FROM node:18-alpine AS base

# Next.js 中文文档 - 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Next.js 中文文档 - 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Next.js 中文文档 - 生产环境
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Next.js 中文文档 - 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

在`next.config.js`中启用独立输出：

```js
// next.config.js
module.exports = {
  output: 'standalone',
}
```

构建并运行Docker镜像：

```bash
# Next.js 中文文档 - 构建镜像
docker build -t nextjs-app .

# Next.js 中文文档 - 运行容器
docker run -p 3000:3000 nextjs-app
```

### 传统服务器部署

也可以在传统服务器上部署Next.js应用：

1. 构建应用程序
2. 启动Node.js服务器

```bash
# Next.js 中文文档 - 构建应用
npm run build

# Next.js 中文文档 - 运行生产服务器
npm start
```

如果需要使用PM2进行进程管理：

```bash
# Next.js 中文文档 - 安装PM2
npm install -g pm2

# Next.js 中文文档 - 启动Next.js应用
pm2 start npm --name "next-app" -- start
```

可以使用Nginx作为反向代理：

```nginx
# Next.js 中文文档 - /etc/nginx/sites-available/nextjs
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 静态导出

对于不需要服务器端功能的项目，可以导出为静态HTML：

1. 在`next.config.js`中配置输出为静态HTML：

```js
// next.config.js
module.exports = {
  output: 'export',
}
```

2. 构建项目生成静态文件：

```bash
npm run build
```

这将在`out`目录中生成静态HTML文件，可以部署到任何静态文件托管服务，如GitHub Pages、Netlify、Vercel等。

## 环境变量

部署时需要配置环境变量：

1. **开发环境**：使用`.env.local`文件
2. **生产环境**：在托管平台的控制面板中设置

例如，在Vercel中：

- 进入项目设置
- 选择"Environment Variables"
- 添加所需的环境变量

对于敏感信息，确保使用安全的环境变量管理，不要将它们提交到代码仓库中。

## 部署检查清单

在部署之前，确保：

1. 应用程序在生产环境中能正常工作

   ```bash
   next build && next start
   ```

2. 环境变量正确设置

   - 检查`.env.production`文件
   - 确保平台上配置了所有需要的环境变量

3. 静态文件正确处理

   - 所有静态文件都放在`public`目录中
   - 图片优化和字体配置正确

4. 性能优化

   - 使用Lighthouse或Next.js Analytics检查性能得分
   - 确保所有页面都配置了元数据
   - 考虑预渲染和ISR策略

5. 访问控制和安全性
   - 配置正确的访问控制和安全标头
   - 设置CORS策略（如需）

## 常见问题

### 图片优化在某些托管平台不工作

解决方案：

- 确保托管平台支持Sharp库
- 或自定义图片加载器以使用第三方服务如Cloudinary

```js
// next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './my-image-loader.js',
  },
}
```

### API路由在静态导出中不工作

静态导出不支持API路由和服务器端功能。考虑：

- 使用支持服务器功能的托管方式
- 将API移至独立服务或无服务器函数

### 环境变量在客户端不可用

只有以`NEXT_PUBLIC_`前缀的环境变量在客户端可用：

```js
// 可在客户端和服务器使用
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// 只能在服务器使用
const secretKey = process.env.SECRET_KEY
```

## 部署资源

- [Vercel部署文档](https://vercel.com/docs/getting-started-with-vercel)
- [Docker和Next.js](https://nextjs.org/docs/app/building-your-application/deploying#docker-image)
- [自定义服务器部署](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting)
