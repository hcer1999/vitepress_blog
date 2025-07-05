---
title: 如何在 Next.js 中设置 Playwright
nav_title: Playwright
description: 学习如何在 Next.js 中设置 Playwright 进行端到端 (E2E) 测试。
---

Playwright 是一个测试框架，允许你使用单一 API 来自动化 Chromium、Firefox 和 WebKit。你可以用它来编写**端到端 (E2E) 测试**。本指南将向你展示如何在 Next.js 中设置 Playwright 并编写你的第一个测试。

## 快速开始

最快的入门方式是使用 `create-next-app` 并选择 [with-playwright 示例](https://github.com/vercel/next.js/tree/canary/examples/with-playwright)。这将创建一个配置好 Playwright 的 Next.js 项目。

```bash
npx create-next-app@latest --example with-playwright with-playwright-app
```

## 手动设置

要安装 Playwright，请运行以下命令：

```bash
npm init playwright
# 或
yarn create playwright
# 或
pnpm create playwright
```

这将引导你完成一系列提示来为你的项目设置和配置 Playwright，包括添加 `playwright.config.ts` 文件。请参考 [Playwright 安装指南](https://playwright.dev/docs/intro#installation) 了解详细的步骤说明。

## 创建你的第一个 Playwright E2E 测试

创建两个新的 Next.js 页面：

<AppOnly>

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}
```

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
```

</AppOnly>

<PagesOnly>

```tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}
```

```tsx
import Link from 'next/link'

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
```

</PagesOnly>

然后，添加一个测试来验证你的导航是否正常工作：

```ts
import { test, expect } from '@playwright/test'

test('should navigate to the about page', async ({ page }) => {
  // 从索引页面开始（baseURL 通过 playwright.config.ts 中的 webServer 设置）
  await page.goto('http://localhost:3000/')
  // 查找包含文本 'About' 的元素并点击它
  await page.click('text=About')
  // 新 URL 应该是 "/about"（这里使用 baseURL）
  await expect(page).toHaveURL('http://localhost:3000/about')
  // 新页面应该包含文本为 "About" 的 h1
  await expect(page.locator('h1')).toContainText('About')
})
```

> **提示**：如果你在 `playwright.config.ts` [配置文件](https://playwright.dev/docs/test-configuration) 中添加了 [`"baseURL": "http://localhost:3000"`](https://playwright.dev/docs/api/class-testoptions#test-options-base-url)，则可以使用 `page.goto("/")` 代替 `page.goto("http://localhost:3000/")`。

### 运行你的 Playwright 测试

Playwright 将使用三种浏览器（Chromium、Firefox 和 Webkit）模拟用户浏览你的应用程序，这需要你的 Next.js 服务器正在运行。我们建议对你的生产代码运行测试，以更接近地模拟你的应用程序的行为。

运行 `npm run build` 和 `npm run start`，然后在另一个终端窗口中运行 `npx playwright test` 来执行 Playwright 测试。

> **提示**：或者，你可以使用 [`webServer`](https://playwright.dev/docs/test-webserver/) 功能让 Playwright 启动开发服务器并等待它完全可用。

### 在持续集成 (CI) 上运行 Playwright

Playwright 默认会在[无头模式](https://playwright.dev/docs/ci#running-headed)下运行你的测试。要安装所有 Playwright 依赖项，请运行 `npx playwright install-deps`。

你可以从以下资源了解更多关于 Playwright 和持续集成的信息：

- [Next.js 与 Playwright 示例](https://github.com/vercel/next.js/tree/canary/examples/with-playwright)
- [在你的 CI 提供商上使用 Playwright](https://playwright.dev/docs/ci)
- [Playwright Discord](https://discord.com/invite/playwright-807756831384403968)
