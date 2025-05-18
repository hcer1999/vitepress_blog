---
title: 如何升级你的 Next.js 应用程序
nav_title: 升级
description: 了解如何将你的 Next.js 应用程序升级到最新版本。
related:
  title: 版本指南
  description: 查看版本指南以获取详细的升级说明。
  links:
    - app/guides/upgrading/version-15
    - app/guides/upgrading/version-14
---

## 最新版本

要更新到最新版本的 Next.js，你可以使用 `upgrade` codemod：

```bash filename="Terminal"
npx @next/codemod@canary upgrade latest
```

如果你更喜欢手动升级，可以安装最新的 Next.js 和 React 版本：

```bash filename="Terminal"
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

## Canary 版本

要更新到最新的 canary 版本，请确保你已经使用最新版本的 Next.js，并且一切正常运行。然后，运行以下命令：

```bash filename="Terminal"
npm i next@canary
```

### Canary 版本中可用的功能

以下功能目前在 canary 版本中可用：

**缓存**：

- [`"use cache"`](/docs/app/api-reference/directives/use-cache)
- [`cacheLife`](/docs/app/api-reference/functions/cacheLife)
- [`cacheTag`](/docs/app/api-reference/functions/cacheTag)
- [`dynamicIO`](/docs/app/api-reference/config/next-config-js/dynamicIO)

**身份验证**：

- [`forbidden`](/docs/app/api-reference/functions/forbidden)
- [`unauthorized`](/docs/app/api-reference/functions/unauthorized)
- [`forbidden.js`](/docs/app/api-reference/file-conventions/forbidden)
- [`unauthorized.js`](/docs/app/api-reference/file-conventions/unauthorized)
- [`authInterrupts`](/docs/app/api-reference/config/next-config-js/authInterrupts)
