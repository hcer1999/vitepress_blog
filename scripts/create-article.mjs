#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ========== 预设图标 ==========
const ICON_PRESETS = [
  { key: '1', name: 'JavaScript', path: '../icons/js.svg' },
  { key: '2', name: 'TypeScript', path: '../icons/ts.svg' },
  { key: '3', name: 'Vue', path: '../icons/vue.svg' },
  { key: '4', name: 'CSS', path: '../icons/css.svg' },
  { key: '5', name: 'HTML', path: '../icons/html.svg' },
  { key: '6', name: 'HTTP', path: '../icons/http.svg' },
  { key: '7', name: 'Node.js', path: '../icons/node.svg' },
  { key: '8', name: 'Git', path: '../icons/git.svg' },
  { key: '9', name: 'NPM', path: '../icons/npm.svg' },
  { key: '10', name: 'Vite', path: '../icons/vite.svg' },
  { key: '11', name: 'Webpack', path: '../icons/webpack.svg' },
  { key: '12', name: 'Sass', path: '../icons/sass.svg' },
  { key: '13', name: 'Claude', path: '../icons/claude.svg' },
  { key: '14', name: 'Cursor', path: '../icons/cursor.webp' },
];

// ========== 文章模板 ==========
const TEMPLATES = {
  '1': {
    name: '默认模板',
    content: (title) => `# ${title}

在这里开始编写你的文章内容...
`
  },
  '2': {
    name: '教程文章',
    content: (title) => `# ${title}

## 前言

简要介绍本文要解决的问题或要讲解的技术点。

## 核心概念

### 概念 1

解释核心概念...

### 概念 2

解释核心概念...

## 实战示例

\`\`\`js
// 示例代码
\`\`\`

## 常见问题与避坑

- 问题 1：...
- 问题 2：...

## 总结

总结要点...
`
  },
  '3': {
    name: '源码阅读',
    content: (title) => `# ${title}

## 前言

本文将分析 xxx 的源码实现。

## 整体架构

概述模块结构和核心设计思路...

## 源码分析

### 入口文件

\`\`\`js
// 源码片段
\`\`\`

### 核心逻辑

\`\`\`js
// 源码片段
\`\`\`

## 流程图

## 收获与思考

总结从源码中学到的设计模式和思路...
`
  },
  '4': {
    name: '笔记/总结',
    content: (title) => `# ${title}

## 背景

记录这篇笔记的原因...

## 要点

### 要点 1

内容...

### 要点 2

内容...

## 参考资料

- [资料1](链接)
`
  }
};

// ========== 工具函数 ==========

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const isValidDate = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(str));

const askQuestion = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

const getNextArticleId = () => {
  const docsPath = path.join(__dirname, '../docs/content/docs');
  try {
    const files = fs.readdirSync(docsPath);
    const ids = files
      .filter(f => f.endsWith('.md'))
      .map(f => parseInt(f.split('.')[0], 10))
      .filter(id => !isNaN(id));
    return Math.max(...ids, 0) + 1;
  } catch {
    return 1;
  }
};

// ========== 核心功能 ==========

const updateDataFile = (id, title, desc, date, icon) => {
  const dataFilePath = path.join(__dirname, '../docs/content/data.ts');
  let content = fs.readFileSync(dataFilePath, 'utf8');

  const itemsStart = content.indexOf('items: [');
  if (itemsStart === -1) {
    console.error('无法在 data.ts 中找到文章列表');
    return false;
  }

  const newArticle = `      {
        ${icon ? `icon: '${icon}',` : 'noIcon: true,'}
        title: '${title}',
        badge: {
          text: '${date}',
          type: 'info',
        },
        ${desc ? `desc: '${desc}',` : ''}
        link: '/content/docs/${id}',
        target: '_self',
      },`;

  const insertPos = content.indexOf('[', itemsStart) + 1;
  content = content.slice(0, insertPos) + '\n' + newArticle + content.slice(insertPos);

  fs.writeFileSync(dataFilePath, content, 'utf8');
  return true;
};

const createArticleFile = (id, title, author, date, templateContent) => {
  const articleContent = `---
author: '${author}'
title: '${title}'
date: '${date}'
permalink: /content/docs/${id}
---

${templateContent}`;

  const filePath = path.join(__dirname, `../docs/content/docs/${id}.md`);
  fs.writeFileSync(filePath, articleContent, 'utf8');
  return filePath;
};

const openInEditor = (filePath) => {
  try {
    // 优先尝试 VS Code / Cursor
    try {
      execSync(`code "${filePath}"`, { stdio: 'ignore' });
      return;
    } catch {}
    try {
      execSync(`cursor "${filePath}"`, { stdio: 'ignore' });
      return;
    } catch {}
    // 回退到系统默认
    if (process.platform === 'darwin') {
      execSync(`open "${filePath}"`);
    } else if (process.platform === 'win32') {
      execSync(`start "" "${filePath}"`);
    } else {
      execSync(`xdg-open "${filePath}"`);
    }
  } catch {
    console.log(`无法自动打开文件，请手动打开: ${filePath}`);
  }
};

// ========== 交互流程 ==========

const main = async () => {
  const id = getNextArticleId();

  console.log('\n📝 创建新文章');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`文章编号: ${id}\n`);

  try {
    // 1. 标题（必填）
    let title = '';
    while (!title.trim()) {
      title = await askQuestion('📌 文章标题（必填）: ');
      if (!title.trim()) console.log('   标题不能为空，请重新输入');
    }
    title = title.trim();

    // 2. 描述
    const desc = (await askQuestion('📝 文章描述（可选，回车跳过）: ')).trim();

    // 3. 作者
    const author = (await askQuestion('👤 作者（默认 bingkele）: ')).trim() || 'bingkele';

    // 4. 日期
    let date = '';
    const defaultDate = getCurrentDate();
    while (true) {
      date = (await askQuestion(`📅 日期（默认 ${defaultDate}）: `)).trim() || defaultDate;
      if (isValidDate(date)) break;
      console.log('   日期格式不正确，请使用 YYYY-MM-DD 格式');
    }

    // 5. 图标选择
    console.log('\n🎨 选择图标:');
    ICON_PRESETS.forEach(p => console.log(`   [${p.key.padStart(2)}] ${p.name}`));
    console.log(`   [ 0] 无图标`);
    console.log(`   [ c] 自定义路径`);

    const iconChoice = (await askQuestion('\n请选择 (默认 0): ')).trim() || '0';
    let iconPath = null;

    if (iconChoice === 'c') {
      iconPath = (await askQuestion('请输入图标路径（如 ../icons/xxx.svg）: ')).trim() || null;
    } else if (iconChoice !== '0') {
      const preset = ICON_PRESETS.find(p => p.key === iconChoice);
      if (preset) {
        iconPath = preset.path;
        console.log(`   已选择: ${preset.name}`);
      }
    }

    // 6. 模板选择
    console.log('\n📄 选择文章模板:');
    Object.entries(TEMPLATES).forEach(([key, t]) => {
      console.log(`   [${key}] ${t.name}`);
    });

    const templateChoice = (await askQuestion('\n请选择 (默认 1): ')).trim() || '1';
    const template = TEMPLATES[templateChoice] || TEMPLATES['1'];
    const templateContent = template.content(title);

    // ===== 确认信息 =====
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 确认文章信息:');
    console.log(`   编号: ${id}`);
    console.log(`   标题: ${title}`);
    console.log(`   描述: ${desc || '(无)'}`);
    console.log(`   作者: ${author}`);
    console.log(`   日期: ${date}`);
    console.log(`   图标: ${iconPath || '无图标'}`);
    console.log(`   模板: ${template.name}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const confirm = await askQuestion('\n确认创建？(Y/n): ');
    if (confirm.toLowerCase() === 'n') {
      console.log('已取消创建');
      rl.close();
      return;
    }

    // ===== 创建文件 =====
    const filePath = createArticleFile(id, title, author, date, templateContent);
    const updated = updateDataFile(id, title, desc, date, iconPath);

    if (updated) {
      console.log(`\n✅ 文章创建成功!`);
      console.log(`📄 文件: ${filePath}`);
      console.log(`🔗 链接: /content/docs/${id}`);

      const openFile = await askQuestion('\n是否用编辑器打开? (y/N): ');
      if (openFile.toLowerCase() === 'y') {
        openInEditor(filePath);
      }
    } else {
      console.error('❌ 更新 data.ts 失败，但文章文件已创建');
    }
  } catch (err) {
    console.error('创建文章过程中出错:', err);
  } finally {
    rl.close();
  }
};

main();
