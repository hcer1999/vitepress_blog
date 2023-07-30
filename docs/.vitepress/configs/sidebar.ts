import type { DefaultTheme } from 'vitepress'

// 导入content的data
import data from '../../content/data'

// 将data中的数据转换为sidebar的数据格式
// 遍历data[0]里的items，给他新增一个text属性，值为title

data[0].items.forEach((item) => {
  // 新增一个text属性，值为title
  item.text = item.title
})

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript 基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types' },
        { text: '引用类型的拷贝', link: '/fe/javascript/clone' },
        { text: '类型转换', link: '/fe/javascript/conversions' },
        { text: '原型和原型链', link: '/fe/javascript/prototype' },
        { text: '继承', link: '/fe/javascript/inherit' },
      ],
    },
    {
      text: 'ES6 常用知识点',
      link: '/fe/es6/',
    },
    {
      text: 'TypeScript',
      link: '/fe/typescript/base',
    },
    {
      text: 'HTML / CSS',
      collapsed: false,
      items: [
        { text: 'HTML 理论知识点', link: '/fe/html/' },
        { text: 'CSS 理论知识点', link: '/fe/css/' },
      ],
    },
    {
      text: '浏览器与网络',
      collapsed: false,
      items: [
        { text: '浏览器相关知识点', link: '/fe/browser/' },
        { text: 'TCP', link: '/fe/network/tcp' },
        { text: 'HTTP', link: '/fe/network/http' },
      ],
    },
    {
      text: '概念知识点',
      collapsed: false,
      items: [
        { text: '模块化', link: '/fe/concept/module' },
        { text: '前端页面渲染方式', link: '/fe/concept/page-rendering' },
      ],
    },
    {
      text: '编程题',
      link: '/fe/coding/',
    },
  ],
  '/analysis/': [
    {
      text: '工具库',
      // collapsed: false,
      items: [
        { text: 'only-allow', link: '/analysis/utils/only-allow' },
        { text: 'clsx', link: '/analysis/utils/clsx' },
      ],
    },
  ],
  '/workflow/': [
    {
      text: '常用工具/方法',
      collapsed: false,
      items: [
        { text: '工具库整理', link: '/workflow/utils/library' },
        { text: '常用正则整理', link: '/workflow/utils/regexp' },
        { text: '常用方法整理', link: '/workflow/utils/function' },
      ],
    },
    {
      text: 'CSS 相关',
      collapsed: false,
      items: [
        { text: 'CSS 语法', link: '/workflow/css/spec' },
        { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
        { text: 'Sass 常用技巧', link: '/workflow/sass/' },
      ],
    },
    {
      text: 'Vue 相关',
      link: '/workflow/vue/',
    },
    {
      text: 'Node 相关',
      // collapsed: false,
      items: [{ text: 'npm 常用命令', link: '/workflow/node/npm' }],
    },
    {
      text: '终端相关',
      collapsed: false,
      items: [
        { text: 'Zsh 配置', link: '/workflow/terminal/zsh' },
        { text: '命令行工具', link: '/workflow/terminal/toolkit' },
        { text: 'Shell 命令', link: '/workflow/terminal/shell' },
      ],
    },
    {
      text: 'Git 相关',
      collapsed: false,
      items: [
        { text: 'Git 相关技巧', link: '/workflow/git/' },
        { text: 'Git 命令清单', link: '/workflow/git/command' },
      ],
    },
  ],
  '/efficiency/': [
    {
      text: '软件推荐与配置',
      // collapsed: false,
      items: [
        { text: '多平台软件', link: '/efficiency/software/cross-platform' },
        { text: 'Mac 平台', link: '/efficiency/software/mac' },
        { text: 'Windows 平台', link: '/efficiency/software/windows' },
        { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
        { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
        { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' },
      ],
    },
    { text: '在线工具', link: '/efficiency/online-tools' },
    { text: '书签脚本', link: '/efficiency/bookmark-scripts' },
  ],
  '/pit/': [
    {
      text: '踩坑记录',
      // collapsed: false,
      items: [
        { text: 'npm 踩坑记录', link: '/pit/npm' },
        { text: 'PC 踩坑记录', link: '/pit/pc' },
        { text: 'H5 踩坑记录', link: '/pit/h5' },
      ],
    },
  ],
  '/notes/': [
    {
      text: 'HTML 笔记',
      link: '/notes/html',
    },
    {
      text: 'CSS 笔记',
      link: '/notes/css',
    },
    {
      text: 'JS 笔记',
      link: '/notes/javascript',
    },
    {
      text: 'ES6 笔记',
      link: '/notes/es6',
    },
    {
      text: 'jQuery 笔记',
      link: '/notes/jquery',
    },
    {
      text: '数据库 笔记',
      link: '/notes/sql',
    },
    {
      text: 'Git工具 笔记',
      link: '/notes/git',
    },
    {
      text: 'WebStorm快捷键大全',
      link: '/notes/webstormkeys',
    },
  ],

  '/interview/': [
    {
      text: 'HTML 篇',
      link: '/interview/html',
    },
    {
      text: 'CSS 篇',
      link: '/interview/css',
    },
    {
      text: 'JS 篇',
      link: '/interview/javascript',
    },
    {
      text: 'Vue 篇',
      link: '/interview/vue',
    },
    {
      text: 'DOM 篇',
      link: '/interview/dom',
    },
    {
      text: 'HTTP 篇',
      link: '/interview/http',
    },
  ],
  '/content/': data,
}
