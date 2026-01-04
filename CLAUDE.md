# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 VitePress 的个人技术博客，包含前端知识、源码阅读、工具推荐等内容。使用 Vue 3 + TypeScript 构建，采用自定义主题设计。

## 常用命令

### 开发与构建

```bash
# 启动开发服务器（端口 8732）
pnpm dev

# 生产构建
pnpm build

# GitHub Pages 构建（带 base path）
pnpm build:github

# 代码格式化
pnpm lint
```

### 内容管理

```bash
# 创建新文章（交互式）
pnpm create:article

# 修复死链
pnpm fix:links
pnpm fix:common-links

# 部署到服务器
pnpm up:dist
```

## 架构设计

### 核心目录结构

- `docs/` - 所有文档内容
  - `.vitepress/` - VitePress 配置和主题
    - `config.ts` - 主配置文件，包含站点地图生成逻辑
    - `configs/` - 导航、侧边栏、Algolia 搜索等配置模块
    - `theme/` - 自定义主题实现
      - `components/` - 自定义 Vue 组件
      - `index.ts` - 主题入口，集成 giscus 评论、medium-zoom 图片放大
  - `content/` - 博客文章内容
    - `docs/` - 文章 Markdown 文件（按数字编号）
    - `data.ts` - 文章元数据（标题、描述、日期、图标等）
  - 其他目录 - 分类内容（fe/、workflow/、analysis/ 等）

### 主题系统

- 基于 VitePress 默认主题扩展
- 自定义首页组件 `BlogHome.vue`：现代化设计，包含 Hero 区域、最新文章轮播、快速导航
- 自定义布局 `CLayout.vue`：包装默认布局，添加自定义插槽
- 集成功能：
  - Giscus 评论系统（GitHub Discussions）
  - Medium-zoom 图片放大
  - 自定义导航和侧边栏组件
  - 浏览器检测和条件样式

### 文章管理系统

- 文章存储在 `docs/content/docs/` 下，按数字编号（1.md, 2.md...）
- 元数据集中管理在 `docs/content/data.ts`
- 使用 `scripts/create-article.mjs` 创建新文章：
  - 自动分配下一个可用 ID
  - 交互式输入标题、描述、作者、日期、图标
  - 自动更新 data.ts 文件
  - 可选择立即打开编辑

### 配置模块化

- `docs/.vitepress/configs/` 下分离各配置：
  - `nav.ts` - 顶部导航栏
  - `sidebar.ts` - 侧边栏（从 data.ts 动态生成部分内容）
  - `algolia.ts` - Algolia DocSearch 配置
  - `head.ts` - HTML head 标签配置

### 站点地图生成

- 在 `config.ts` 中通过 `transformHtml` 和 `buildEnd` 钩子自动生成
- 收集所有页面路径，排除 404 页面
- 输出到 `dist/sitemap.xml`

## 开发注意事项

### 添加新文章

1. 运行 `pnpm create:article` 使用交互式工具
2. 或手动：
   - 在 `docs/content/docs/` 创建新的 `{id}.md` 文件
   - 在 `docs/content/data.ts` 的 items 数组开头添加元数据
   - 确保 link 路径为 `/content/docs/{id}`

### 修改导航或侧边栏

- 编辑 `docs/.vitepress/configs/nav.ts` 修改顶部导航
- 编辑 `docs/.vitepress/configs/sidebar.ts` 修改侧边栏
- 侧边栏支持多级嵌套和折叠

### 自定义主题组件

- 组件位于 `docs/.vitepress/theme/components/`
- 在 `theme/index.ts` 中注册全局组件
- 使用 VitePress 插槽系统扩展布局

### 环境变量

- `NODE_ENV` - 开发/生产环境标识
- `APP_BASE_PATH` - 部署基础路径（GitHub Pages 使用）
- `BASE_URL` - 基础 URL（构建时使用）

### 部署相关

- `upload.serve.mjs` - 服务器部署脚本（需要 `server-config.mjs` 配置）
- 生产构建输出到 `dist/` 目录
- 自动复制 `robots.txt` 到构建目录
