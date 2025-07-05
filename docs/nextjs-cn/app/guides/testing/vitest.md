---
title: 如何在 Next.js 中设置 Vitest
nav_title: Vitest
description: 学习如何在 Next.js 中设置 Vitest 进行单元测试。
---

Vite 和 React Testing Library 经常一起用于**单元测试**。本指南将向你展示如何在 Next.js 中设置 Vitest 并编写你的第一个测试。

> **提示：** 由于 `async` 服务器组件是 React 生态系统的新成员，Vitest 目前不支持它们。虽然你仍然可以为同步的服务器和客户端组件运行**单元测试**，但我们建议对 `async` 组件使用**端到端测试**。

## 快速开始

你可以使用 `create-next-app` 和 Next.js 的 [with-vitest](https://github.com/vercel/next.js/tree/canary/examples/with-vitest) 示例快速开始：

```bash
npx create-next-app@latest --example with-vitest with-vitest-app
```

## 手动设置

要手动设置 Vitest，请安装 `vitest` 和以下包作为开发依赖：

```bash
# 使用 TypeScript
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
# 使用 JavaScript
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom
```

在项目根目录中创建一个 `vitest.config.mts|js` 文件，并添加以下选项：

```ts switcher
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
  },
})
```

```js switcher
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

有关配置 Vitest 的更多信息，请参考 [Vitest 配置](https://vitest.dev/config/#configuration) 文档。

然后，在你的 `package.json` 中添加一个 `test` 脚本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest"
  }
}
```

当你运行 `npm run test` 时，Vitest 将默认**监视**你项目中的变化。

## 创建你的第一个 Vitest 单元测试

通过创建一个测试来检查 `<Page />` 组件是否成功渲染标题，以确保一切正常工作：

<AppOnly>

```tsx switcher
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

```jsx switcher
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

```tsx switcher
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
```

```jsx switcher
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
```

> **提示**：上面的示例使用了常见的 `__tests__` 约定，但测试文件也可以放在 `app` 路由器内部。

</AppOnly>

<PagesOnly>

```tsx switcher
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

```jsx switcher
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

```tsx switcher
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../pages/index'

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
```

```jsx switcher
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../pages/index'

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
```

</PagesOnly>

## 运行你的测试

然后，运行以下命令来执行你的测试：

```bash
npm run test
# 或
yarn test
# 或
pnpm test
# 或
bun test
```

## 额外资源

以下资源可能对你有帮助：

- [Next.js 与 Vitest 示例](https://github.com/vercel/next.js/tree/canary/examples/with-vitest)
- [Vitest 文档](https://vitest.dev/guide/)
- [React Testing Library 文档](https://testing-library.com/docs/react-testing-library/intro/)
