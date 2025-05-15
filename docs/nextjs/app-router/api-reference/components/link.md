---
title: Next.js 中文文档 - Link
description: Next.js的Link组件用于在应用程序中进行客户端导航。
---

# Next.js 中文文档 - Link 组件

`Link` 组件是 Next.js 提供的一个内置组件，用于在应用程序中的页面之间进行客户端导航。它是 HTML `<a>` 标签的扩展，提供了预取功能和客户端导航，无需完整的页面刷新。

## 导入

```jsx
import Link from 'next/link'
```

## 属性

### `href` (必需)

导航目标的路径或URL。可以是以下格式：

- **字符串**：一个简单的路径，如 `'/about'`
- **对象**：一个包含更多路由信息的对象，具有以下属性：
  - `pathname`: 要导航的路径
  - `query`: 包含查询参数的对象
  - `hash`: URL的哈希部分（以 `#` 开头）
  - `search`: URL的查询部分（以 `?` 开头）

### `replace`

当设置为 `true` 时，`Link` 将替换当前历史状态，而不是添加新的URL到浏览历史栈中。默认为 `false`。

### `scroll`

控制导航后是否滚动到页面顶部。默认为 `true`。

### `prefetch`

控制是否在后台预加载页面。默认为 `true`。当用户的设备启用了`Save-Data`或`减少数据使用`模式时，预加载会自动禁用。

### `legacyBehavior`

启用旧版行为，其中 `<a>` 标签必须是 `Link` 的子元素。默认为 `false`。

## 基本用法

```jsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">首页</Link>
        </li>
        <li>
          <Link href="/about">关于我们</Link>
        </li>
        <li>
          <Link href="/blog">博客</Link>
        </li>
        <li>
          <Link href="/contact">联系我们</Link>
        </li>
      </ul>
    </nav>
  )
}
```

## 动态路由导航

```jsx
import Link from 'next/link'

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

## 使用URL对象

```jsx
import Link from 'next/link'

export default function ProductLink({ product }) {
  return (
    <Link
      href={{
        pathname: '/products/[category]/[id]',
        query: {
          category: product.category,
          id: product.id,
          ref: 'marketing-campaign',
        },
      }}
    >
      {product.name}
    </Link>
  )
}
```

## 使用哈希和查询字符串

```jsx
import Link from 'next/link'

export default function ScrollToSection() {
  return <Link href="/about#team">查看我们的团队</Link>
}

export function FilteredProducts() {
  return (
    <Link
      href={{
        pathname: '/products',
        query: { category: 'electronics', sort: 'price-asc' },
      }}
    >
      查看电子产品
    </Link>
  )
}
```

## 与 `<button>` 一起使用

虽然 `Link` 组件内部默认渲染 `<a>` 标签，但有时你可能需要包装一个按钮或其他元素：

```jsx
import Link from 'next/link'

export default function ButtonLink() {
  return (
    <Link href="/dashboard" legacyBehavior>
      <button className="dashboard-button">访问控制面板</button>
    </Link>
  )
}
```

> **注意**：当使用除 `<a>` 之外的元素包装 `Link` 时，你需要添加 `legacyBehavior` 属性，或者你可以使用 `useRouter` 钩子来实现导航功能。

## 替换而不是添加到历史记录

当你希望替换当前历史记录条目而不是添加新条目时：

```jsx
import Link from 'next/link'

export default function ReplacingLink() {
  return (
    <Link href="/step2" replace>
      继续但不保留历史记录
    </Link>
  )
}
```

## 禁用滚动到顶部

```jsx
import Link from 'next/link'

export default function NoScrollLink() {
  return (
    <Link href="/blog/long-article" scroll={false}>
      查看文章（保持滚动位置）
    </Link>
  )
}
```

## 外部链接

对于指向外部网站的链接，您应该使用普通的 `<a>` 标签，而不是 `Link` 组件：

```jsx
export default function ExternalLinks() {
  return (
    <div>
      <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
        访问 Next.js 官网
      </a>
    </div>
  )
}
```

## 路由钩子与Link

Link组件与 `useRouter` 钩子配合良好，可以实现更复杂的导航行为：

```jsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginButtons() {
  const router = useRouter()

  return (
    <div>
      {/* 简单链接导航 */}
      <Link href="/login">登录</Link>

      {/* 带回调的编程式导航 */}
      <button
        onClick={() => {
          saveDraft().then(() => {
            router.push('/dashboard')
          })
        }}
      >
        保存并返回
      </button>
    </div>
  )
}
```

## 样式链接

### 基本样式

```jsx
import Link from 'next/link'
import styles from './Nav.module.css'

export default function StyledLink() {
  return (
    <Link href="/about" className={styles.link}>
      关于我们
    </Link>
  )
}
```

### 动态样式（活动链接）

```jsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: '首页' },
    { href: '/about', label: '关于' },
    { href: '/contact', label: '联系' },
  ]

  return (
    <nav>
      <ul className={styles.navList}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`
                ${styles.link} 
                ${pathname === href ? styles.active : ''}
              `}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

```css
/* Nav.module.css */
.navList {
  display: flex;
  list-style: none;
  padding: 0;
}

.link {
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link:hover {
  color: #0070f3;
}

.active {
  color: #0070f3;
  font-weight: bold;
  border-bottom: 2px solid #0070f3;
}
```

## 客户端导航原理

`Link` 组件使用客户端导航，仅更新变化的内容而不是整个页面。这意味着：

1. 页面不会完全重新加载
2. 导航速度更快，用户体验更流畅
3. 保持React组件状态
4. 只获取必要的数据

当用户停留在视口中的链接上时，Next.js会自动在后台预加载目标页面，这样当用户点击时会几乎立即显示。

## 预取行为

1. **自动预取**：默认情况下，所有在视口中的链接都会被预取
2. **禁用预取**：可以通过设置 `prefetch={false}` 禁用特定链接的预取
3. **静态生成的页面**：将预取整个页面内容
4. **服务器渲染的页面**：只预取轻量级数据，不预获实际内容

## 高级用法

### 使用回调函数

```jsx
'use client'

import Link from 'next/link'

export default function CallbackLink() {
  return (
    <Link
      href="/dashboard"
      onClick={(e) => {
        // 阻止默认行为，自定义导航逻辑
        if (!isLoggedIn) {
          e.preventDefault()
          // 显示登录模态窗口
          showLoginModal()
        }
      }}
    >
      访问控制面板
    </Link>
  )
}
```

### 动态生成链接

```jsx
import Link from 'next/link'

export default function DynamicLinks({ categories }) {
  return (
    <div className="categories-nav">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={{
            pathname: '/category/[slug]',
            query: { slug: category.slug },
          }}
          as={`/category/${category.slug}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
```

### 支持多语言

```jsx
import Link from 'next/link'

export default function MultiLangLink({ locale, href, children }) {
  return (
    <Link
      href={href}
      locale={locale}
    >
      {children}
    </Link>
  )
}

// 用法
<MultiLangLink locale="en" href="/about">About Us</MultiLangLink>
<MultiLangLink locale="zh" href="/about">关于我们</MultiLangLink>
```

## 与传统导航的比较

| 功能               | Link组件 | 传统a标签 |
| ------------------ | -------- | --------- |
| 客户端导航         | ✓        | ✗         |
| 代码自动分割       | ✓        | ✗         |
| 预加载             | ✓        | ✗         |
| 保持React状态      | ✓        | ✗         |
| 避免完整页面刷新   | ✓        | ✗         |
| 页面间共享组件状态 | ✗        | ✗         |

## 性能注意事项

1. **页面链接**：使用 `Link` 组件进行内部导航
2. **外部链接**：对外部网站使用 `<a>` 标签
3. **预加载控制**：对于大型应用，考虑选择性地禁用某些链接的预加载
4. **浅层路由**：考虑使用 `shallow` 参数来避免不必要的数据重新获取

## 常见问题及解决方案

### 链接正确但路由不触发

确保：

- 导入的是 `next/link`，而不是其他库
- 没有阻止默认的点击事件
- 如果使用非 `<a>` 标签，确保添加了 `legacyBehavior` 属性

### 自定义URL结构

使用 `as` 参数（旧版API）或直接在 `href` 对象中设置路径参数。

### 外部链接处理

对于外部链接，应使用传统的 `<a>` 标签而非 `Link` 组件，并添加适当的安全属性：

```jsx
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  外部链接
</a>
```

## 相关资源

- [Next.js路由文档](https://nextjs.org/docs/app/api-reference/components/link)
- [Navigation与路由](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- [useRouter钩子](https://nextjs.org/docs/app/api-reference/functions/use-router)

```

```
