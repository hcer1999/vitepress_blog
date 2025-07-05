#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');

// 定义替换规则
const replacementRules = [
  // App Router 路由链接修复
  {
    pattern: /\/docs\/nextjs-cn\/01-app\/03-building-your-application\/routing\//g,
    replacement: '/docs/nextjs-cn/01-app/03-building-your-application/01-routing/index/'
  },
  // App Router 渲染链接修复
  {
    pattern: /\/docs\/nextjs-cn\/01-app\/03-building-your-application\/rendering\//g,
    replacement: '/docs/nextjs-cn/01-app/03-building-your-application/03-rendering/'
  },
  // App Router 数据获取链接修复
  {
    pattern: /\/docs\/nextjs-cn\/01-app\/03-building-your-application\/data-fetching\//g,
    replacement: '/docs/nextjs-cn/01-app/03-building-your-application/02-data-fetching/'
  },
  // Pages Router 路由链接修复
  {
    pattern: /\/docs\/nextjs-cn\/02-pages\/03-building-your-application\/routing\//g,
    replacement: '/docs/nextjs-cn/02-pages/03-building-your-application/01-routing/'
  },
  // Pages Router 渲染链接修复
  {
    pattern: /\/docs\/nextjs-cn\/02-pages\/03-building-your-application\/rendering\//g,
    replacement: '/docs/nextjs-cn/02-pages/03-building-your-application/02-rendering/'
  },
  // Pages Router 数据获取链接修复
  {
    pattern: /\/docs\/nextjs-cn\/02-pages\/03-building-your-application\/data-fetching\//g,
    replacement: '/docs/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/'
  }
];

// 递归处理目录
async function processDirectory(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // 跳过 node_modules 和 .git 目录
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        await processDirectory(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      await processFile(fullPath);
    }
  }
}

// 处理单个文件
async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content;
    let hasChanges = false;
    
    // 应用所有替换规则
    for (const rule of replacementRules) {
      if (rule.pattern.test(content)) {
        content = content.replace(rule.pattern, rule.replacement);
        hasChanges = true;
      }
    }
    
    // 如果有变更，写回文件
    if (hasChanges) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`已更新: ${filePath}`);
    }
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error);
  }
}

// 主函数
async function main() {
  console.log('开始修复路由链接...');
  await processDirectory(docsDir);
  console.log('路由链接修复完成！');
}

main().catch(error => {
  console.error('发生错误:', error);
  process.exit(1);
}); 