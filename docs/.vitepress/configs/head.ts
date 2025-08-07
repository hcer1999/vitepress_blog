import type { HeadConfig } from 'vitepress'

const isDevelopment = process.env.NODE_ENV === 'development'
const baseOptions = [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
  ['meta', { 'Net-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }],
  [
    'meta',
    { name: 'keywords', content: '前端,前端开发,程序员,FE,web,html,html5,css3,js,javascript,vue' },
  ],
  [
    'meta',
    {
      name: 'description',
      content: 'BingKeLe 的个人博客，记录前端开发过程中的点点滴滴。',
    },
  ],
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
  ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#3eaf7c' }],
  ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
]

const statisticsOptions = [
  ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-GG8W5BRQHZ' }],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GG8W5BRQHZ');`,
  ],
  [
    'script',
    {
      async: '',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6198632316720288',
      crossorigin: 'anonymous',
    },
  ],
]
const options = baseOptions
// 只有在生产环境才把统计代码加入到head中
if (!isDevelopment) {
  // @ts-ignore
  options.push(...statisticsOptions)
}
// @ts-ignore
export const head: HeadConfig[] = options
