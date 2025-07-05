---
title: 无障碍
description: Next.js 内置的无障碍功能。
---

# NextJS中文文档 - Accessibility

Next.js 团队致力于使 Next.js 对所有开发者（及其最终用户）都可访问。通过默认为 Next.js 添加无障碍功能，我们旨在使网络对每个人都更具包容性。

## 路由通知

当在服务器渲染的页面之间进行转换（例如使用 `<a href>` 标签）时，屏幕阅读器和其他辅助技术会在页面加载时宣布页面标题，以便用户了解页面已经改变。

除了传统的页面导航外，Next.js 还支持客户端过渡以提高性能（使用 `next/link`）。为确保客户端过渡也能被辅助技术宣布，Next.js 默认包含一个路由通知器。

Next.js 路由通知器首先检查 `document.title`，然后是 `<h1>` 元素，最后是 URL 路径名，以查找要宣布的页面名称。为了获得最佳的无障碍用户体验，请确保应用程序中的每个页面都有唯一且描述性的标题。

## 代码检查

Next.js 开箱即用地提供[集成的 ESLint 体验](/nextjs-cn/pages/api-reference/config/eslint)，包括 Next.js 的自定义规则。默认情况下，Next.js 包含 `eslint-plugin-jsx-a11y` 以帮助尽早发现无障碍问题，包括对以下内容发出警告：

- [aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-props.md?rgh-link-date=04T02%3A10%3A36Z)
- [aria-proptypes](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-proptypes.md?rgh-link-date=04T02%3A10%3A36Z)
- [aria-unsupported-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-unsupported-elements.md?rgh-link-date=04T02%3A10%3A36Z)
- [role-has-required-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/role-has-required-aria-props.md?rgh-link-date=04T02%3A10%3A36Z)
- [role-supports-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/role-supports-aria-props.md?rgh-link-date=04T02%3A10%3A36Z)

例如，这个插件有助于确保你为 `img` 标签添加替代文本，使用正确的 `aria-*` 属性，使用正确的 `role` 属性等等。

## 无障碍资源

- [WebAIM WCAG 清单](https://webaim.org/standards/wcag/checklist)
- [WCAG 2.2 指南](https://www.w3.org/TR/WCAG22/)
- [A11y 项目](https://www.a11yproject.com/)
- 检查前景和背景元素之间的[颜色对比度](https://developer.mozilla.org/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast)
- 处理动画时使用 [`prefers-reduced-motion`](https://web.dev/prefers-reduced-motion/)
