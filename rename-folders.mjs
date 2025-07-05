#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, 'docs', 'nextjs-cn');

// 递归重命名函数
async function renameItems(dirPath) {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    const itemsToRename = [];
    
    // 首先收集所有需要重命名的项目
    for (const item of items) {
      const oldPath = path.join(dirPath, item.name);
      const newName = item.name.replace(/^\d+[-.]/, '');
      const newPath = path.join(dirPath, newName);
      
      if (oldPath !== newPath) {
        itemsToRename.push({
          oldPath,
          newPath,
          isDirectory: item.isDirectory(),
          oldName: item.name,
          newName
        });
      }
    }
    
    // 按照深度优先的顺序进行重命名（先处理文件，再处理目录）
    // 先处理文件
    for (const item of itemsToRename.filter(i => !i.isDirectory)) {
      try {
        await fs.rename(item.oldPath, item.newPath);
        console.log(`已重命名文件: ${item.oldName} -> ${item.newName}`);
      } catch (error) {
        console.error(`重命名文件失败 ${item.oldName}:`, error);
      }
    }
    
    // 递归处理子目录
    for (const item of items) {
      if (item.isDirectory()) {
        const currentPath = path.join(dirPath, item.name);
        await renameItems(currentPath);
      }
    }
    
    // 最后处理目录
    for (const item of itemsToRename.filter(i => i.isDirectory)) {
      try {
        await fs.rename(item.oldPath, item.newPath);
        console.log(`已重命名目录: ${item.oldName} -> ${item.newName}`);
      } catch (error) {
        console.error(`重命名目录失败 ${item.oldName}:`, error);
      }
    }
  } catch (error) {
    console.error('处理目录时出错:', error);
  }
}

// 更新文件内容中的链接
async function updateFileLinks(dirPath) {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isFile() && item.name.endsWith('.md')) {
        let content = await fs.readFile(fullPath, 'utf-8');
        let originalContent = content;
        
        // 更新文件内容中的链接
        content = content.replace(/\/docs\/nextjs-cn\/\d+[-.]([^\/]+)/g, '/docs/nextjs-cn/$1');
        content = content.replace(/\/nextjs-cn\/\d+[-.]([^\/]+)/g, '/nextjs-cn/$1');
        content = content.replace(/\(\.\.?\/\d+[-.]([^\/\)]+)/g, '(../$1');
        
        // 只有当内容发生变化时才写入文件
        if (content !== originalContent) {
          await fs.writeFile(fullPath, content, 'utf-8');
          console.log(`已更新文件中的链接: ${fullPath}`);
        }
      }
      
      if (item.isDirectory()) {
        await updateFileLinks(fullPath);
      }
    }
  } catch (error) {
    console.error('更新文件链接时出错:', error);
  }
}

// 主函数
async function main() {
  try {
    console.log('开始重命名文件和目录...');
    await renameItems(docsDir);
    
    console.log('\n开始更新文件中的链接...');
    await updateFileLinks(docsDir);
    
    console.log('\n处理完成！');
  } catch (error) {
    console.error('执行过程中出错:', error);
    process.exit(1);
  }
}

// 执行主函数
main(); 