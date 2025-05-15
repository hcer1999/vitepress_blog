---
title: Next.js 中文文档 - CSS样式
description: 在Next.js中为应用添加样式的多种方式
---

# Next.js 中文文档 - CSS样式

Next.js允许你使用多种方式为应用程序添加样式，从CSS模块到CSS-in-JS解决方案。本文档涵盖了各种方法，帮助你根据项目需求选择最合适的方式。

## 全局样式

要为整个应用添加全局样式，可以在App Router中的根目录下创建一个全局样式表，然后在根布局中导入它：

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
```

## CSS模块

Next.js内置支持CSS模块，这是一种局部作用域的CSS文件，通过自动创建唯一的类名来避免样式冲突。

创建一个以`.module.css`为后缀的文件，例如：

```css
/* app/components/Button.module.css */
.button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background: #2980b9;
}
```

然后在组件中导入并使用：

```tsx
// app/components/Button.tsx
import styles from './Button.module.css'

export default function Button({ children }: { children: React.ReactNode }) {
  return <button className={styles.button}>{children}</button>
}
```

## Sass支持

Next.js支持Sass `.scss`和`.sass`文件，只需安装Sass：

```bash
npm install --save-dev sass
```

然后你可以导入`.module.scss`或`.module.sass`文件：

```scss
// Button.module.scss
$primary-color: #3498db;
$hover-color: #2980b9;

.button {
  padding: 0.5rem 1rem;
  background: $primary-color;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: $hover-color;
  }
}
```

## CSS-in-JS

Next.js支持多种CSS-in-JS解决方案。在App Router中，官方推荐使用以下客户端CSS-in-JS库：

### styled-components

```tsx
'use client'

import styled from 'styled-components'

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`

export default function Home() {
  return (
    <div>
      <Button>点击我</Button>
    </div>
  )
}
```

### emotion

```tsx
'use client'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

const buttonStyles = css`
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`

const Button = styled.button`
  ${buttonStyles}
`

export default function Home() {
  return (
    <div>
      <Button>点击我</Button>
    </div>
  )
}
```

## Tailwind CSS

Next.js集成了Tailwind CSS，一个流行的功能类优先的CSS框架：

1. 安装Tailwind CSS：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. 配置`tailwind.config.js`：

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. 在全局CSS文件中导入Tailwind指令：

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. 在组件中使用Tailwind类：

```tsx
export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {children}
    </button>
  )
}
```

## CSS变量

通过使用CSS变量可以更灵活地管理样式：

```css
/* app/globals.css */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #333;
  --background-color: #f5f5f5;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.button {
  background-color: var(--primary-color);
}
```

## 添加外部样式表

有时候你可能需要引入第三方CSS库，可以通过以下方式：

1. 在全局CSS文件中导入：

```css
/* app/globals.css */
@import 'bootstrap/dist/css/bootstrap.min.css';
```

2. 在根布局组件中导入：

```tsx
// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
```

## 响应式设计

通过CSS媒体查询可以轻松创建响应式设计：

```css
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}
```

## 主题切换

实现暗色/亮色主题切换：

```css
/* globals.css */
:root {
  --background: white;
  --text-color: black;
}

[data-theme='dark'] {
  --background: #111;
  --text-color: white;
}

body {
  background-color: var(--background);
  color: var(--text-color);
  transition:
    background-color 0.3s,
    color 0.3s;
}
```

```tsx
// ThemeToggle.tsx
'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      切换到{theme === 'light' ? '暗色' : '亮色'}主题
    </button>
  )
}
```

## 相关资源

- [Tailwind CSS](https://tailwindcss.com/) - 功能类优先的CSS框架
- [styled-components](https://styled-components.com/) - 使用标记模板字面量设置组件样式的库
- [Emotion](https://emotion.sh/) - 另一个用于编写CSS样式的JavaScript库
- [Next.js文档：全局样式](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [Next.js文档：CSS模块](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
