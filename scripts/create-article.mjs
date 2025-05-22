#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建命令行交互接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 获取当前日期，格式为 YYYY-MM-DD
const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 获取下一篇文章的编号
const getNextArticleId = () => {
  const docsPath = path.join(__dirname, '../docs/content/docs');
  try {
    const files = fs.readdirSync(docsPath);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    const ids = mdFiles.map(file => parseInt(file.split('.')[0], 10)).filter(id => !isNaN(id));
    return Math.max(...ids, 0) + 1;
  } catch (err) {
    console.error('读取文章目录失败:', err);
    return 1;
  }
};

// 更新 data.ts 文件
const updateDataFile = (id, title, desc = '', date = getCurrentDate(), icon = null) => {
  const dataFilePath = path.join(__dirname, '../docs/content/data.ts');
  let dataContent = fs.readFileSync(dataFilePath, 'utf8');
  
  // 找到文章列表数组的位置
  const itemsArrayStart = dataContent.indexOf('items: [');
  if (itemsArrayStart === -1) {
    console.error('无法在 data.ts 中找到文章列表');
    return false;
  }

  // 构建新文章对象
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

  // 在文章列表开头插入新文章
  const insertPosition = dataContent.indexOf('[', itemsArrayStart) + 1;
  dataContent = dataContent.slice(0, insertPosition) + '\n' + newArticle + dataContent.slice(insertPosition);

  // 写入更新后的文件
  fs.writeFileSync(dataFilePath, dataContent, 'utf8');
  return true;
};

// 创建新文章文件
const createArticleFile = (id, title, author = 'bingkele', date = getCurrentDate()) => {
  const articleContent = `---
author: '${author}'
title: '${title}'
date: '${date}'
permalink: /content/docs/${id}
---

# ${title}

在这里开始编写你的文章内容...
`;

  const filePath = path.join(__dirname, `../docs/content/docs/${id}.md`);
  fs.writeFileSync(filePath, articleContent, 'utf8');
  return filePath;
};

// 提问收集信息
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// 主函数
const main = async () => {
  const id = getNextArticleId();

  try {
    const title = await askQuestion('请输入文章标题: ');
    const desc = await askQuestion('请输入文章描述 (可选): ');
    const author = await askQuestion('请输入作者名称 (默认: bingkele): ') || 'bingkele';
    const date = await askQuestion(`请输入文章日期 (默认: ${getCurrentDate()}): `) || getCurrentDate();
    const iconPath = await askQuestion('请输入图标路径 (可选，例如: ../icons/vue.svg): ');
    
    // 创建文章文件
    const filePath = createArticleFile(id, title, author, date);
    
    // 更新 data.ts
    const updated = updateDataFile(id, title, desc, date, iconPath || null);
    
    if (updated) {
      console.log(`\n✅ 文章创建成功!`);
      console.log(`📝 文章ID: ${id}`);
      console.log(`📄 文件路径: ${filePath}`);
      console.log(`🔗 访问链接: /content/docs/${id}`);
      
      // 询问是否打开文件
      const openFile = await askQuestion('是否立即打开文件编辑? (y/n): ');
      if (openFile.toLowerCase() === 'y') {
        try {
          // 尝试用默认编辑器打开文件
          if (process.platform === 'darwin') { // macOS
            execSync(`open "${filePath}"`);
          } else if (process.platform === 'win32') { // Windows
            execSync(`start "" "${filePath}"`);
          } else { // Linux
            execSync(`xdg-open "${filePath}"`);
          }
        } catch (err) {
          console.log(`无法自动打开文件，请手动打开: ${filePath}`);
        }
      }
    } else {
      console.error('更新 data.ts 失败');
    }
  } catch (err) {
    console.error('创建文章过程中出错:', err);
  } finally {
    rl.close();
  }
};

// 执行主函数
main(); 