---
title: serverExternalPackages
description: 将特定依赖项从服务器组件打包中排除，并使用原生 Node.js `require`。
---

在[服务器组件](/nextjs-cn/app/building-your-application/rendering/server-components)和[路由处理程序](/nextjs-cn/app/building-your-application/routing/route-handlers)中使用的依赖项将自动由 Next.js 打包。

如果某个依赖项使用了 Node.js 特定功能，你可以选择将特定依赖项从服务器组件打包中排除，并使用原生 Node.js 的 `require`。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@acme/ui'],
}

module.exports = nextConfig
```

Next.js 包含一个[流行包的简短列表](https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/server-external-packages.json)，这些包目前正在进行兼容性工作，并自动被排除在外：

- `@appsignal/nodejs`
- `@aws-sdk/client-s3`
- `@aws-sdk/spresigned-post`
- `@blockfrost/blockfrost-js`
- `@highlight-run/node`
- `@huggingface/transformers`
- `@jpg-store/lucid-cardano`
- `@libsql/client`
- `@mikro-orm/core`
- `@mikro-orm/knex`
- `@node-rs/argon2`
- `@node-rs/bcrypt`
- `@prisma/client`
- `@react-pdf/renderer`
- `@sentry/profiling-node`
- `@sparticuz/chromium`
- `@swc/core`
- `@xenova/transformers`
- `argon2`
- `autoprefixer`
- `aws-crt`
- `bcrypt`
- `better-sqlite3`
- `canvas`
- `chromadb-default-embed`
- `config`
- `cpu-features`
- `cypress`
- `dd-trace`
- `eslint`
- `express`
- `firebase-admin`
- `import-in-the-middle`
- `isolated-vm`
- `jest`
- `jsdom`
- `keyv`
- `libsql`
- `mdx-bundler`
- `mongodb`
- `mongoose`
- `newrelic`
- `next-mdx-remote`
- `next-seo`
- `node-cron`
- `node-pty`
- `node-web-audio-api`
- `onnxruntime-node`
- `oslo`
- `pg`
- `playwright`
- `playwright-core`
- `postcss`
- `prettier`
- `prisma`
- `puppeteer-core`
- `puppeteer`
- `ravendb`
- `require-in-the-middle`
- `rimraf`
- `sharp`
- `shiki`
- `sqlite3`
- `ts-node`
- `ts-morph`
- `typescript`
- `vscode-oniguruma`
- `webpack`
- `websocket`
- `zeromq`

| 版本      | 变更                                                                                        |
| --------- | ------------------------------------------------------------------------------------------- |
| `v15.0.0` | 从实验性转为稳定版。从 `serverComponentsExternalPackages` 重命名为 `serverExternalPackages` |
