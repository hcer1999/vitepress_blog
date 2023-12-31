import type { HeadConfig } from 'vitepress'

const isDevelopment = process.env.NODE_ENV === 'development'

export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
  ['meta', { 'Net-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }],
  [
    'meta',
    { name: 'Keywords', content: '前端,前端开发,程序员,FE,web,html,html5,css3,js,javascript,vue' },
  ],
  ['meta', { name: 'Description', content: '冰可乐的个人学习笔记站点' }],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
  ],
  ['meta', { name: 'applicable-device', content: 'pc,mobile' }],
  ['meta', { name: 'Author', content: 'BingKeLe' }],
  ['meta', { name: 'renderer', content: 'webkit' }],
  ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }],
  // ['meta', { name: 'baidu-site-verification', content: 'codeva-Whjnr38WFE' }],
  // ['meta', { name: 'google-site-verification', content: 'codeva-Whjnr38WFE' }],
  ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#3eaf7c' }],
  ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],

  // [
  //   'script',
  //   { src: isDevelopment ? '' : 'https://hm.baidu.com/hm.js?8092fab2f2adfc7938ba5b8885aef5b4' },
  // ],
  // ['script', { src: '../../assets/SplitText3.min.js' }],
  // ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/gsap/3.11.5/gsap.min.js' }],
]
