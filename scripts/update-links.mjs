#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');

// 定义替换规则
const replacementRules = [
  // App Router 链接替换
  {
    pattern: /\/docs\/app\/building-your-application/g,
    replacement: '/docs/nextjs-cn/01-app/03-building-your-application'
  },
  {
    pattern: /\/docs\/app\/api-reference/g,
    replacement: '/docs/nextjs-cn/01-app/05-api-reference'
  },
  {
    pattern: /\/docs\/app\/getting-started/g,
    replacement: '/docs/nextjs-cn/01-app/01-getting-started'
  },
  {
    pattern: /\/docs\/app\/guides/g,
    replacement: '/docs/nextjs-cn/01-app/02-guides'
  },
  {
    pattern: /\/docs\/app\/deep-dive/g,
    replacement: '/docs/nextjs-cn/01-app/04-deep-dive'
  },
  
  // Pages Router 链接替换
  {
    pattern: /\/docs\/pages\/building-your-application/g,
    replacement: '/docs/nextjs-cn/02-pages/03-building-your-application'
  },
  {
    pattern: /\/docs\/pages\/api-reference/g,
    replacement: '/docs/nextjs-cn/02-pages/04-api-reference'
  },
  {
    pattern: /\/docs\/pages\/getting-started/g,
    replacement: '/docs/nextjs-cn/02-pages/01-getting-started'
  },
  {
    pattern: /\/docs\/pages\/guides/g,
    replacement: '/docs/nextjs-cn/02-pages/02-guides'
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
  console.log('开始更新文档链接...');
  await processDirectory(docsDir);
  console.log('链接更新完成！');
}

main().catch(error => {
  console.error('发生错误:', error);
  process.exit(1);
}); 