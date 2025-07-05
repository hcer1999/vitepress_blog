---
title: ESLint 插件
nav_title: ESLint
description: 了解如何使用和配置 ESLint 插件来捕获 Next.js 应用程序中的常见问题和错误。
---

Next.js 提供了一个 ESLint 插件，[`eslint-plugin-next`](https://www.npmjs.com/package/@next/eslint-plugin-next)，它已经捆绑在基础配置中，可以捕获 Next.js 应用程序中的常见问题和错误。

## 参考

以下 ESLint 插件的推荐规则集都在 `eslint-config-next` 中使用：

- [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react)
- [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [`eslint-plugin-next`](https://www.npmjs.com/package/@next/eslint-plugin-next)

这将优先于 `next.config.js` 中的配置。

### 规则

完整的规则集如下：

|  在推荐配置中启用   | 规则                                                                                                                     | 描述                                                                                                           |
| :-----------------: | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| <Check size={18} /> | [@next/next/google-font-display](/docs/messages/google-font-display)                                                     | 强制使用 Google Fonts 时的字体显示行为。                                                                       |
| <Check size={18} /> | [@next/next/google-font-preconnect](/docs/messages/google-font-preconnect)                                               | 确保使用 Google Fonts 时使用 `preconnect`。                                                                    |
| <Check size={18} /> | [@next/next/inline-script-id](/docs/messages/inline-script-id)                                                           | 在具有内联内容的 `next/script` 组件上强制使用 `id` 属性。                                                      |
| <Check size={18} /> | [@next/next/next-script-for-ga](/docs/messages/next-script-for-ga)                                                       | 使用 Google Analytics 的内联脚本时，推荐使用 `next/script` 组件。                                              |
| <Check size={18} /> | [@next/next/no-assign-module-variable](/docs/messages/no-assign-module-variable)                                         | 防止对 `module` 变量进行赋值。                                                                                 |
| <Check size={18} /> | [@next/next/no-async-client-component](/docs/messages/no-async-client-component)                                         | 防止客户端组件成为异步函数。                                                                                   |
| <Check size={18} /> | [@next/next/no-before-interactive-script-outside-document](/docs/messages/no-before-interactive-script-outside-document) | 防止在 `pages/_document.js` 外使用 `next/script` 的 `beforeInteractive` 策略。                                 |
| <Check size={18} /> | [@next/next/no-css-tags](/docs/messages/no-css-tags)                                                                     | 防止手动添加样式表标签。                                                                                       |
| <Check size={18} /> | [@next/next/no-document-import-in-page](/docs/messages/no-document-import-in-page)                                       | 防止在 `pages/_document.js` 外导入 `next/document`。                                                           |
| <Check size={18} /> | [@next/next/no-duplicate-head](/docs/messages/no-duplicate-head)                                                         | 防止在 `pages/_document.js` 中重复使用 `<Head>`。                                                              |
| <Check size={18} /> | [@next/next/no-head-element](/docs/messages/no-head-element)                                                             | 防止使用 `<head>` 元素。                                                                                       |
| <Check size={18} /> | [@next/next/no-head-import-in-document](/docs/messages/no-head-import-in-document)                                       | 防止在 `pages/_document.js` 中使用 `next/head`。                                                               |
| <Check size={18} /> | [@next/next/no-html-link-for-pages](/docs/messages/no-html-link-for-pages)                                               | 防止使用 `<a>` 元素导航到内部 Next.js 页面。                                                                   |
| <Check size={18} /> | [@next/next/no-img-element](/docs/messages/no-img-element)                                                               | 由于较慢的 LCP 和更高的带宽，防止使用 `<img>` 元素。                                                           |
| <Check size={18} /> | [@next/next/no-page-custom-font](/docs/messages/no-page-custom-font)                                                     | 防止仅页面使用的自定义字体。                                                                                   |
| <Check size={18} /> | [@next/next/no-script-component-in-head](/docs/messages/no-script-component-in-head)                                     | 防止在 `next/head` 组件中使用 `next/script`。                                                                  |
| <Check size={18} /> | [@next/next/no-styled-jsx-in-document](/docs/messages/no-styled-jsx-in-document)                                         | 防止在 `pages/_document.js` 中使用 `styled-jsx`。                                                              |
| <Check size={18} /> | [@next/next/no-sync-scripts](/docs/messages/no-sync-scripts)                                                             | 防止同步脚本。                                                                                                 |
| <Check size={18} /> | [@next/next/no-title-in-document-head](/docs/messages/no-title-in-document-head)                                         | 防止使用来自 `next/document` 的 `Head` 组件中的 `<title>`。                                                    |
| <Check size={18} /> | @next/next/no-typos                                                                                                      | 防止在 [Next.js 的数据获取函数](/docs/nextjs-cn/pages/building-your-application/data-fetching)中的常见拼写错误 |
| <Check size={18} /> | [@next/next/no-unwanted-polyfillio](/docs/messages/no-unwanted-polyfillio)                                               | 防止来自 Polyfill.io 的重复 polyfill。                                                                         |

我们建议使用适当的[集成](https://eslint.org/docs/user-guide/integrations#editors)，以便在开发过程中直接在代码编辑器中查看警告和错误。

## 示例

### 检查自定义目录和文件

默认情况下，Next.js 会对 `pages/`、`app/`、`components/`、`lib/` 和 `src/` 目录中的所有文件运行 ESLint。但是，你可以使用 `next.config.js` 中的 `eslint` 配置中的 `dirs` 选项为生产构建指定目录：

```js
module.exports = {
  eslint: {
    dirs: ['pages', 'utils'], // 在生产构建（next build）期间仅对 'pages' 和 'utils' 目录运行 ESLint
  },
}
```

类似地，`next lint` 可以使用 `--dir` 和 `--file` 标志来检查特定的目录和文件：

```bash
next lint --dir pages --dir utils --file bar.js
```

### 在 monorepo 中指定根目录

如果你在 Next.js 未安装在根目录中的项目（例如 monorepo）中使用 `eslint-plugin-next`，你可以使用 `.eslintrc` 中的 `settings` 属性告诉 `eslint-plugin-next` 在哪里找到你的 Next.js 应用程序：

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname 在 Node.js v20.11.0 之后可用
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    settings: {
      next: {
        rootDir: 'packages/my-app/',
      },
    },
  }),
]

export default eslintConfig
```

`rootDir` 可以是路径（相对或绝对）、通配符（例如 `"packages/*/"`）或路径和/或通配符的数组。

### 禁用缓存

为了提高性能，ESLint 处理的文件信息默认会被缓存。这存储在 `.next/cache` 或你定义的[构建目录](/docs/nextjs-cn/app/api-reference/config/next-config-js/distDir)中。如果你包含任何依赖于单个源文件内容以外的 ESLint 规则并需要禁用缓存，请使用 `next lint` 的 `--no-cache` 标志。

```bash
next lint --no-cache
```

### 禁用规则

如果你想修改或禁用支持的插件（`react`、`react-hooks`、`next`）提供的任何规则，你可以直接使用 `.eslintrc` 中的 `rules` 属性更改它们：

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname 在 Node.js v20.11.0 之后可用
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  }),
]

export default eslintConfig
```

### 与核心网络指标

当首次运行 `next lint` 并选择**严格**选项时，会启用 `next/core-web-vitals` 规则集。

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname 在 Node.js v20.11.0 之后可用
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
]

export default eslintConfig
```

`next/core-web-vitals` 更新 `eslint-plugin-next`，如果某些规则影响[核心网络指标](https://web.dev/vitals/)，则将默认为警告的规则改为错误。

> 使用 [Create Next App](/docs/nextjs-cn/app/api-reference/cli/create-next-app) 构建的新应用程序会自动包含 `next/core-web-vitals` 入口点。

### 与 TypeScript

除了 Next.js ESLint 规则外，`create-next-app --typescript` 还会使用 `next/typescript` 将特定于 TypeScript 的 lint 规则添加到你的配置中：

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname 在 Node.js v20.11.0 之后可用
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
]

export default eslintConfig
```

这些规则基于 [`plugin:@typescript-eslint/recommended`](https://typescript-eslint.io/linting/configs#recommended)。
有关更多详情，请参阅 [typescript-eslint > Configs](https://typescript-eslint.io/linting/configs)。

### 与 Prettier

ESLint 还包含代码格式化规则，这些规则可能与你现有的 [Prettier](https://prettier.io/) 设置冲突。我们建议在你的 ESLint 配置中包含 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)，以使 ESLint 和 Prettier 协同工作。

首先，安装依赖项：

```bash
npm install --save-dev eslint-config-prettier

yarn add --dev eslint-config-prettier

pnpm add --save-dev eslint-config-prettier

bun add --dev eslint-config-prettier
```

然后，将 `prettier` 添加到你现有的 ESLint 配置中：

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname 在 Node.js v20.11.0 之后可用
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier'],
  }),
]

export default eslintConfig
```

### Running lint on staged files

If you would like to use `next lint` with [lint-staged](https://github.com/okonet/lint-staged) to run the linter on staged git files, you'll have to add the following to the `.lintstagedrc.js` file in the root of your project in order to specify usage of the `--file` flag.

```js
const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
```

## Disabling linting during production builds

If you do not want ESLint to run during `next build`, you can set the `eslint.ignoreDuringBuilds` option in `next.config.js` to `true`:

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
```

```js switcher
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
```

### Migrating existing config

If you already have ESLint configured in your application, we recommend extending from this plugin directly instead of including `eslint-config-next` unless a few conditions are met.

#### Recommended plugin ruleset

If the following conditions are true:

- You have one or more of the following plugins already installed (either separately or through a different config such as `airbnb` or `react-app`):
  - `react`
  - `react-hooks`
  - `jsx-a11y`
  - `import`
- You've defined specific `parserOptions` that are different from how Babel is configured within Next.js (this is not recommended unless you have [customized your Babel configuration](/docs/nextjs-cn/pages/guides/configuring/babel))
- You have `eslint-plugin-import` installed with Node.js and/or TypeScript [resolvers](https://github.com/benmosher/eslint-plugin-import#resolvers) defined to handle imports

Then we recommend either removing these settings if you prefer how these properties have been configured within [`eslint-config-next`](https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js) or extending directly from the Next.js ESLint plugin instead:

```js
module.exports = {
  extends: [
    //...
    'plugin:@next/next/recommended',
  ],
}
```

The plugin can be installed normally in your project without needing to run `next lint`:

```bash
npm install --save-dev @next/eslint-plugin-next

yarn add --dev @next/eslint-plugin-next

pnpm add --save-dev @next/eslint-plugin-next

bun add --dev @next/eslint-plugin-next
```

This eliminates the risk of collisions or errors that can occur due to importing the same plugin or parser across multiple configurations.

#### Additional configurations

If you already use a separate ESLint configuration and want to include `eslint-config-next`, ensure that it is extended last after other configurations. For example:

```js
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.config({
    extends: ['eslint:recommended', 'next'],
  }),
]

export default eslintConfig
```

The `next` configuration already handles setting default values for the `parser`, `plugins` and `settings` properties. There is no need to manually re-declare any of these properties unless you need a different configuration for your use case.

If you include any other shareable configurations, **you will need to make sure that these properties are not overwritten or modified**. Otherwise, we recommend removing any configurations that share behavior with the `next` configuration or extending directly from the Next.js ESLint plugin as mentioned above.
