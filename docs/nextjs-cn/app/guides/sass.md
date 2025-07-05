---
title: 如何使用 Sass
nav_title: Sass
description: 使用 Sass 为 Next.js 应用程序添加样式。
---

# NextJS中文文档 - Sass

Next.js 在安装了相应的包后，内置支持通过 `.scss` 和 `.sass` 扩展名集成 Sass。你可以通过 CSS Modules 和 `.module.scss` 或 `.module.sass` 扩展名使用组件级 Sass。

首先，安装 [`sass`](https://github.com/sass/sass)：

```bash
npm install --save-dev sass
```

> **提示**：
>
> Sass 支持[两种不同的语法](https://sass-lang.com/documentation/syntax)，每种都有自己的扩展名。
> `.scss` 扩展名要求你使用 [SCSS 语法](https://sass-lang.com/documentation/syntax#scss)，
> 而 `.sass` 扩展名要求你使用[缩进语法（"Sass"）](https://sass-lang.com/documentation/syntax#the-indented-syntax)。
>
> 如果你不确定选择哪一个，可以从 `.scss` 扩展名开始，它是 CSS 的超集，不需要你学习缩进语法（"Sass"）。

### 自定义 Sass 选项

如果你想配置 Sass 选项，请在 `next.config` 中使用 `sassOptions`。

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
}

module.exports = nextConfig
```

#### 实现

你可以使用 `implementation` 属性指定要使用的 Sass 实现。默认情况下，Next.js 使用 [`sass`](https://www.npmjs.com/package/sass) 包。

```ts switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
}

export default nextConfig
```

```js switcher
/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
}

module.exports = nextConfig
```

### Sass 变量

Next.js 支持从 CSS Module 文件导出 Sass 变量。

例如，使用导出的 `primaryColor` Sass 变量：

```scss
$primary-color: #64ff00;

:export {
  primaryColor: $primary-color;
}
```

<AppOnly>

```jsx
// 映射到根 `/` URL

import variables from './variables.module.scss'

export default function Page() {
  return <h1 style={{ color: variables.primaryColor }}>Hello, Next.js!</h1>
}
```

</AppOnly>

<PagesOnly>

```jsx
import variables from '../styles/variables.module.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout color={variables.primaryColor}>
      <Component {...pageProps} />
    </Layout>
  )
}
```

</PagesOnly>
