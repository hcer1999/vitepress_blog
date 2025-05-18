---
title: 如何在 Next.js 中设置 Jest
nav_title: Jest
description: 学习如何在 Next.js 中设置 Jest 进行单元测试和快照测试。
---

{/_ 此文档的内容在app路由器和pages路由器之间共享。你可以使用 `<PagesOnly>Content</PagesOnly>` 组件添加特定于Pages路由器的内容。任何共享内容都不应该被组件包裹。 _/}

Jest 和 React Testing Library 经常一起用于**单元测试**和**快照测试**。本指南将向你展示如何在 Next.js 中设置 Jest 并编写你的第一个测试。

> **提示：** 由于 `async` 服务器组件是 React 生态系统的新成员，Jest 目前不支持它们。虽然你仍然可以为同步的服务器和客户端组件运行**单元测试**，但我们建议对 `async` 组件使用**端到端测试**。

## 快速开始

你可以使用 `create-next-app` 和 Next.js 的 [with-jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest) 示例快速开始：

```bash filename="Terminal"
npx create-next-app@latest --example with-jest with-jest-app
```

## 手动设置

自 [Next.js 12](https://nextjs.org/blog/next-12) 发布以来，Next.js 现在有了内置的 Jest 配置。

要设置 Jest，请安装 `jest` 和以下包作为开发依赖：

```bash filename="Terminal"
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
# 或
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
# 或
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

通过运行以下命令生成基本的 Jest 配置文件：

```bash filename="Terminal"
npm init jest@latest
# 或
yarn create jest@latest
# 或
pnpm create jest@latest
```

这将引导你完成一系列提示，为你的项目设置 Jest，包括自动创建 `jest.config.ts|js` 文件。

更新你的配置文件以使用 `next/jest`。这个转换器包含了 Jest 与 Next.js 配合工作所需的所有必要配置选项：

```ts filename="jest.config.ts" switcher
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // 提供你的 Next.js 应用的路径，以便在测试环境中加载 next.config.js 和 .env 文件
  dir: './',
})

// 添加任何要传递给 Jest 的自定义配置
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // 在每个测试运行之前添加更多设置选项
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig 以这种方式导出，以确保 next/jest 可以加载 Next.js 的异步配置
export default createJestConfig(config)
```

```js filename="jest.config.js" switcher
const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // 提供你的 Next.js 应用的路径，以便在测试环境中加载 next.config.js 和 .env 文件
  dir: './',
})

// 添加任何要传递给 Jest 的自定义配置
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // 在每个测试运行之前添加更多设置选项
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig 以这种方式导出，以确保 next/jest 可以加载 Next.js 的异步配置
module.exports = createJestConfig(config)
```

在底层，`next/jest` 会自动为你配置 Jest，包括：

- 使用 [Next.js 编译器](/docs/architecture/nextjs-compiler) 设置 `transform`。
- 自动模拟样式表（`.css`、`.module.css` 及其 scss 变体）、图像导入和 [`next/font`](/docs/app/api-reference/components/font)。
- 将 `.env`（及所有变体）加载到 `process.env` 中。
- 从测试解析和转换中忽略 `node_modules`。
- 从测试解析中忽略 `.next`。
- 加载 `next.config.js` 以获取启用 SWC 转换的标志。

> **提示**：要直接测试环境变量，请在单独的设置脚本或 `jest.config.ts` 文件中手动加载它们。有关更多信息，请参阅[测试环境变量](/docs/app/guides/environment-variables#test-environment-variables)。

<PagesOnly>

## 设置 Jest（使用 Babel）

如果你选择退出 [Next.js 编译器](/docs/architecture/nextjs-compiler) 而使用 Babel，你将需要手动配置 Jest，并在上述包之外安装 `babel-jest` 和 `identity-obj-proxy`。

以下是为 Next.js 配置 Jest 的推荐选项：

```js filename="jest.config.js"
module.exports = {
  collectCoverage: true,
  // 在 node 14.x 上，覆盖率提供者 v8 提供了良好的速度和相对良好的报告
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    // 处理 CSS 导入（使用 CSS 模块）
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // 处理 CSS 导入（不使用 CSS 模块）
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // 处理图像导入
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    // 处理模块别名
    '^@/components/(.*)$': '<rootDir>/components/$1',

    // 处理 @next/font
    '@next/font/(.*)': `<rootDir>/__mocks__/nextFontMock.js`,
    // 处理 next/font
    'next/font/(.*)': `<rootDir>/__mocks__/nextFontMock.js`,
    // 禁用 server-only
    'server-only': `<rootDir>/__mocks__/empty.js`,
  },
  // 在每个测试运行之前添加更多设置选项
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    // 使用 babel-jest 转译测试，使用 next/babel 预设
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
}
```

你可以在 [Jest 文档](https://jestjs.io/docs/configuration) 中了解每个配置选项的更多信息。我们还建议查看 [`next/jest` 配置](https://github.com/vercel/next.js/blob/e02fe314dcd0ae614c65b505c6daafbdeebb920e/packages/next/src/build/jest/jest.ts) 以了解 Next.js 如何配置 Jest。

### 处理样式表和图像导入

测试中不使用样式表和图像，但导入它们可能会导致错误，因此需要模拟它们。

在 `__mocks__` 目录中创建上述配置中引用的模拟文件 - `fileMock.js` 和 `styleMock.js`：

```js filename="__mocks__/fileMock.js"
module.exports = 'test-file-stub'
```

```js filename="__mocks__/styleMock.js"
module.exports = {}
```

有关处理静态资源的更多信息，请参阅 [Jest 文档](https://jestjs.io/docs/webpack#handling-static-assets)。

## 处理字体

要处理字体，在 `__mocks__` 目录中创建 `nextFontMock.js` 文件，并添加以下配置：

```js filename="__mocks__/nextFontMock.js"
module.exports = new Proxy(
  {},
  {
    get: function getter() {
      return () => ({
        className: 'className',
        variable: 'variable',
        style: { fontFamily: 'fontFamily' },
      })
    },
  },
)
```

</PagesOnly>

## 可选：处理绝对导入和模块路径别名

如果你的项目使用了[模块路径别名](/docs/app/getting-started/installation#set-up-absolute-imports-and-module-path-aliases)，你需要配置 Jest 来解析导入，方法是将 `jsconfig.json` 文件中的 paths 选项与 `jest.config.js` 文件中的 `moduleNameMapper` 选项匹配。例如：

```json filename="tsconfig.json or jsconfig.json"
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "baseUrl": "./",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

```js filename="jest.config.js"
moduleNameMapper: {
  // ...
  '^@/components/(.*)$': '<rootDir>/components/$1',
}
```

## 可选：使用自定义匹配器扩展 Jest

`@testing-library/jest-dom` 包含一组方便的[自定义匹配器](https://github.com/testing-library/jest-dom#custom-matchers)，如 `.toBeInTheDocument()`，使编写测试变得更容易。你可以通过在 Jest 配置文件中添加以下选项，为每个测试导入自定义匹配器：

```ts filename="jest.config.ts" switcher
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
```

```js filename="jest.config.js" switcher
setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
```

然后，在 `jest.setup` 中添加以下导入：

```ts filename="jest.setup.ts" switcher
import '@testing-library/jest-dom'
```

```js filename="jest.setup.js" switcher
import '@testing-library/jest-dom'
```

> **提示：** [`extend-expect` 在 `v6.0` 中被移除](https://github.com/testing-library/jest-dom/releases/tag/v6.0.0)，因此如果你使用的是 `@testing-library/jest-dom` 6.0 之前的版本，则需要导入 `@testing-library/jest-dom/extend-expect`。

如果你需要在每个测试之前添加更多设置选项，可以将它们添加到上面的 `jest.setup` 文件中。
</rewritten_file>
