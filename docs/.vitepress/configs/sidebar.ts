import type { DefaultTheme } from 'vitepress'

// 导入content的data
import data from '../../content/data'
// 导入 Next.js 中文文档侧边栏
import { nextjsCnSidebar } from '../nextjs-cn-sidebar'

// 将data中的数据转换为sidebar的数据格式
// 遍历data[0]里的items，给他新增一个text属性，值为title

data[0].items.forEach((item) => {
  // 新增一个text属性，值为title
  item.text = item.title
})

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/nextjs-cn/': nextjsCnSidebar,
  '/nextjs/': [
    {
      text: 'Next.js',
      link: '/nextjs/',
    },
    {
      text: 'App Router',
      collapsed: false,
      items: [
        { text: '入门', link: '/nextjs/app-router/' },
        {
          text: '开始使用',
          collapsed: false,
          items: [
            { text: '安装', link: '/nextjs/app-router/getting-started/installation' },
            { text: '项目结构', link: '/nextjs/app-router/getting-started/project-structure' },
            { text: '布局和页面', link: '/nextjs/app-router/getting-started/layouts-and-pages' },
            { text: '图片优化', link: '/nextjs/app-router/getting-started/images' },
            { text: '字体优化', link: '/nextjs/app-router/getting-started/fonts' },
            { text: 'CSS 样式', link: '/nextjs/app-router/getting-started/css' },
            { text: '数据获取', link: '/nextjs/app-router/getting-started/fetching-data' },
            { text: '数据更新', link: '/nextjs/app-router/getting-started/updating-data' },
            { text: '错误处理', link: '/nextjs/app-router/getting-started/error-handling' },
            { text: '元数据和Open Graph图片', link: '/nextjs/app-router/getting-started/metadata' },
            { text: '部署', link: '/nextjs/app-router/getting-started/deploying' },
            { text: '升级', link: '/nextjs/app-router/getting-started/upgrading' },
          ],
        },
        {
          text: '构建应用程序',
          collapsed: false,
          items: [
            {
              text: '路由',
              collapsed: true,
              items: [
                { text: '路由基础', link: '/nextjs/app-router/building-your-application/routing' },
                {
                  text: '布局和模板',
                  link: '/nextjs/app-router/building-your-application/routing/layouts-and-templates',
                },
                {
                  text: '链接和导航',
                  link: '/nextjs/app-router/building-your-application/routing/linking-and-navigating',
                },
                {
                  text: '错误处理',
                  link: '/nextjs/app-router/building-your-application/routing/error-handling',
                },
                {
                  text: '加载UI和流式传输',
                  link: '/nextjs/app-router/building-your-application/routing/loading-ui-and-streaming',
                },
                {
                  text: '重定向',
                  link: '/nextjs/app-router/building-your-application/routing/redirecting',
                },
                {
                  text: '路由组',
                  link: '/nextjs/app-router/building-your-application/routing/route-groups',
                },
                {
                  text: '动态路由',
                  link: '/nextjs/app-router/building-your-application/routing/dynamic-routes',
                },
                {
                  text: '并行路由',
                  link: '/nextjs/app-router/building-your-application/routing/parallel-routes',
                },
                {
                  text: '拦截路由',
                  link: '/nextjs/app-router/building-your-application/routing/intercepting-routes',
                },
                {
                  text: '国际化',
                  link: '/nextjs/app-router/building-your-application/routing/internationalization',
                },
                {
                  text: '路由处理器',
                  link: '/nextjs/app-router/building-your-application/routing/route-handlers',
                },
                {
                  text: '中间件',
                  link: '/nextjs/app-router/building-your-application/routing/middleware',
                },
              ],
            },
            {
              text: '数据获取',
              collapsed: true,
              items: [
                {
                  text: '数据获取和缓存',
                  link: '/nextjs/app-router/building-your-application/data-fetching/data-fetching-and-caching',
                },
                {
                  text: '服务器操作和修改',
                  link: '/nextjs/app-router/building-your-application/data-fetching/server-actions-and-mutations',
                },
                {
                  text: '增量静态再生成(ISR)',
                  link: '/nextjs/app-router/building-your-application/data-fetching/incremental-static-regeneration',
                },
              ],
            },
            {
              text: '渲染',
              collapsed: true,
              items: [
                {
                  text: '服务器组件',
                  link: '/nextjs/app-router/building-your-application/rendering/server-components',
                },
                {
                  text: '客户端组件',
                  link: '/nextjs/app-router/building-your-application/rendering/client-components',
                },
                {
                  text: '组合模式',
                  link: '/nextjs/app-router/building-your-application/rendering/composition-patterns',
                },
                {
                  text: '静态和动态渲染',
                  link: '/nextjs/app-router/building-your-application/rendering/static-and-dynamic-rendering',
                },
                {
                  text: '流式渲染和Suspense',
                  link: '/nextjs/app-router/building-your-application/rendering/streaming-and-suspense',
                },
                {
                  text: 'Edge和Node.js运行时',
                  link: '/nextjs/app-router/building-your-application/rendering/edge-and-nodejs-runtimes',
                },
                {
                  text: '部分预渲染',
                  link: '/nextjs/app-router/building-your-application/rendering/partial-prerendering',
                },
              ],
            },
            {
              text: '样式',
              collapsed: true,
              items: [
                { text: 'CSS', link: '/nextjs/app-router/building-your-application/styling/css' },
              ],
            },
          ],
        },
        {
          text: '深入探讨',
          collapsed: true,
          items: [{ text: '缓存', link: '/nextjs/app-router/deep-dive/caching' }],
        },
        {
          text: 'API参考',
          collapsed: true,
          items: [
            {
              text: '指令',
              collapsed: true,
              items: [
                {
                  text: 'use cache',
                  link: '/nextjs/app-router/api-reference/directives/use-cache',
                },
                {
                  text: 'use client',
                  link: '/nextjs/app-router/api-reference/directives/use-client',
                },
                {
                  text: 'use server',
                  link: '/nextjs/app-router/api-reference/directives/use-server',
                },
              ],
            },
            {
              text: '组件',
              collapsed: true,
              items: [
                { text: 'Font', link: '/nextjs/app-router/api-reference/components/font' },
                { text: 'Form', link: '/nextjs/app-router/api-reference/components/form' },
                { text: 'Image', link: '/nextjs/app-router/api-reference/components/image' },
                { text: 'Link', link: '/nextjs/app-router/api-reference/components/link' },
                { text: 'Script', link: '/nextjs/app-router/api-reference/components/script' },
                { text: 'Suspense', link: '/nextjs/app-router/api-reference/components/suspense' },
              ],
            },
            {
              text: '函数',
              collapsed: true,
              items: [
                {
                  text: 'useSelectedLayoutSegment',
                  link: '/nextjs/app-router/api-reference/functions/use-selected-layout-segment',
                },
                {
                  text: 'useSelectedLayoutSegments',
                  link: '/nextjs/app-router/api-reference/functions/use-selected-layout-segments',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
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
        { text: '微信小程序踩坑记录', link: '/pit/wx' },
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
      text: 'JS 基础笔记',
      link: '/notes/javascript',
    },
    {
      text: 'JS 进阶笔记',
      link: '/notes/javascript_premium',
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
    {
      text: '大厂面试题',
      link: '/interview/big-business',
    },
  ],
  '/content': data,
  '/gsap/': [
    {
      text: '快速开始',
      items: [
        {
          text: '安装',
          link: '/gsap/start',
        },
      ],
    },
    {
      text: '基本',
      items: [
        {
          text: 'GSAP对象',
          collapsed: true,
          link: '/gsap/gsap/start',
          items: [
            {
              text: '属性',
              collapsed: true,
              items: [
                {
                  text: 'effects()',
                  link: '/gsap/gsap/properties/effects',
                },
                {
                  text: 'globalTimeline()',
                  link: '/gsap/gsap/properties/global-timeline',
                },
                {
                  text: 'ticker()',
                  link: '/gsap/gsap/properties/ticker',
                },
                {
                  text: 'utils()',
                  link: '/gsap/gsap/properties/utils',
                },
                {
                  text: 'version()',
                  link: '/gsap/gsap/properties/version',
                },
              ],
            },
            {
              text: '方法',
              collapsed: true,
              items: [
                {
                  text: 'config()',
                  link: '/gsap/gsap/methods/config',
                },
                {
                  text: 'context()',
                  link: '/gsap/gsap/methods/context',
                },
                {
                  text: 'defaults()',
                  link: '/gsap/gsap/methods/defaults',
                },
                {
                  text: 'delayedCall()',
                  link: '/gsap/gsap/methods/delayed-call',
                },
                {
                  text: 'exportRoot()',
                  link: '/gsap/gsap/methods/export-root',
                },
                {
                  text: 'from()',
                  link: '/gsap/gsap/methods/from',
                },
                {
                  text: 'fromTo()',
                  link: '/gsap/gsap/methods/from-to',
                },
                {
                  text: 'getById()',
                  link: '/gsap/gsap/methods/get-by-id',
                },
                {
                  text: 'getProperty()',
                  link: '/gsap/gsap/methods/get-property',
                },
                {
                  text: 'getTweensOf()',
                  link: '/gsap/gsap/methods/get-tweens-of',
                },
                {
                  text: 'isTweening()',
                  link: '/gsap/gsap/methods/is-tweening',
                },
                {
                  text: 'killTweensOf()',
                  link: '/gsap/gsap/methods/kill-tweens-of',
                },
                {
                  text: 'matchMedia()',
                  link: '/gsap/gsap/methods/match-media',
                },
                {
                  text: 'matchMediaRefresh()',
                  link: '/gsap/gsap/methods/match-media-refresh',
                },
                {
                  text: 'parseEase()',
                  link: '/gsap/gsap/methods/parse-ease',
                },
                {
                  text: 'quickSetter()',
                  link: '/gsap/gsap/methods/quick-setter',
                },
                {
                  text: 'quickTo()',
                  link: '/gsap/gsap/methods/quick-to',
                },
                {
                  text: 'registerEase()',
                  link: '/gsap/gsap/methods/register-ease',
                },
                {
                  text: 'registerEffect()',
                  link: '/gsap/gsap/methods/register-effect',
                },
                {
                  text: 'registerPlugin()',
                  link: '/gsap/gsap/methods/register-plugin',
                },
                {
                  text: 'set()',
                  link: '/gsap/gsap/methods/set',
                },
                {
                  text: 'timeline()',
                  link: '/gsap/gsap/methods/timeline',
                },
                {
                  text: 'to()',
                  link: '/gsap/gsap/methods/to',
                },
                {
                  text: 'updateRoot()',
                  link: '/gsap/gsap/methods/update-root',
                },
              ],
            },
            {
              text: '内部插件',
              collapsed: true,
              items: [
                {
                  text: 'Attributes',
                  link: '/gsap/gsap/internal-plugins/attributes',
                },
                {
                  text: 'End Array',
                  link: '/gsap/gsap/internal-plugins/end-array',
                },
                {
                  text: 'Modifiers',
                  link: '/gsap/gsap/internal-plugins/modifiers',
                },
                {
                  text: 'Snap',
                  link: '/gsap/gsap/internal-plugins/snap',
                },
              ],
            },
          ],
        },
        {
          text: 'Tween(补间动画)',
          collapsed: true,
          link: '/gsap/tween/start',
          items: [
            {
              text: '方法',
              collapsed: true,
              items: [
                {
                  text: 'delay()',
                  link: '/gsap/tween/methods/delay',
                },
                {
                  text: 'duration()',
                  link: '/gsap/tween/methods/duration',
                },
                {
                  text: 'endTime()',
                  link: '/gsap/tween/methods/end-time',
                },
                {
                  text: 'eventCallback()',
                  link: '/gsap/tween/methods/event-callback',
                },
                {
                  text: 'globalTime()',
                  link: '/gsap/tween/methods/global-time',
                },
                {
                  text: 'invalidate()',
                  link: '/gsap/tween/methods/invalidate',
                },
                {
                  text: 'isActive()',
                  link: '/gsap/tween/methods/is-active',
                },
                {
                  text: 'iteration()',
                  link: '/gsap/tween/methods/iteration',
                },
                {
                  text: 'kill()',
                  link: '/gsap/tween/methods/kill',
                },
                {
                  text: 'pause()',
                  link: '/gsap/tween/methods/pause',
                },
                {
                  text: 'paused()',
                  link: '/gsap/tween/methods/paused',
                },
                {
                  text: 'play()',
                  link: '/gsap/tween/methods/play',
                },
                {
                  text: 'progress()',
                  link: '/gsap/tween/methods/progress',
                },
                {
                  text: 'repeat()',
                  link: '/gsap/tween/methods/repeat',
                },
                {
                  text: 'repeatDelay()',
                  link: '/gsap/tween/methods/repeat-delay',
                },
                {
                  text: 'restart()',
                  link: '/gsap/tween/methods/restart',
                },
                {
                  text: 'resume()',
                  link: '/gsap/tween/methods/resume',
                },
                {
                  text: 'reverse()',
                  link: '/gsap/tween/methods/reverse',
                },
                {
                  text: 'reversed()',
                  link: '/gsap/tween/methods/reversed',
                },
                {
                  text: 'revert()',
                  link: '/gsap/tween/methods/revert',
                },
                {
                  text: 'seek()',
                  link: '/gsap/tween/methods/seek',
                },
                {
                  text: 'startTime()',
                  link: '/gsap/tween/methods/start-time',
                },
                {
                  text: 'targets()',
                  link: '/gsap/tween/methods/targets',
                },
                {
                  text: 'then()',
                  link: '/gsap/tween/methods/then',
                },
                {
                  text: 'time()',
                  link: '/gsap/tween/methods/time',
                },
                {
                  text: 'timeScale()',
                  link: '/gsap/tween/methods/time-scale',
                },
                {
                  text: 'totalDuration()',
                  link: '/gsap/tween/methods/total-duration',
                },
                {
                  text: 'totalProgress()',
                  link: '/gsap/tween/methods/total-progress',
                },
                {
                  text: 'totalTime()',
                  link: '/gsap/tween/methods/total-time',
                },
                {
                  text: 'yoyo()',
                  link: '/gsap/tween/methods/yoyo',
                },
              ],
            },
            {
              text: '属性',
              collapsed: true,
              items: [
                {
                  text: 'data',
                  link: '/gsap/tween/properties/data',
                },
                {
                  text: 'ratio',
                  link: '/gsap/tween/properties/ratio',
                },
                {
                  text: 'scrollTrigger',
                  link: '/gsap/tween/properties/scroll-trigger',
                },
                {
                  text: 'vars',
                  link: '/gsap/tween/properties/vars',
                },
              ],
            },
          ],
        },
        {
          text: 'Timeline(时间线)',
          collapsed: true,
          link: '/gsap/timeline/start',
          items: [
            {
              text: '方法',
              collapsed: true,
              items: [
                {
                  text: 'add()',
                  link: '/gsap/timeline/methods/add',
                },
                {
                  text: 'addLabel()',
                  link: '/gsap/timeline/methods/add-label',
                },
                {
                  text: 'addPause()',
                  link: '/gsap/timeline/methods/add-pause',
                },
                {
                  text: 'call()',
                  link: '/gsap/timeline/methods/call',
                },
                {
                  text: 'clear()',
                  link: '/gsap/timeline/methods/clear',
                },
                {
                  text: 'currentLabel()',
                  link: '/gsap/timeline/methods/current-label',
                },
                {
                  text: 'delay()',
                  link: '/gsap/timeline/methods/delay',
                },
                {
                  text: 'duration()',
                  link: '/gsap/timeline/methods/duration',
                },
                {
                  text: 'endTime()',
                  link: '/gsap/timeline/methods/end-time',
                },
                {
                  text: 'eventCallback()',
                  link: '/gsap/timeline/methods/event-callback',
                },

                {
                  text: 'from()',
                  link: '/gsap/timeline/methods/from',
                },
                {
                  text: 'fromTo()',
                  link: '/gsap/timeline/methods/from-to',
                },
                {
                  text: 'getById()',
                  link: '/gsap/timeline/methods/get-by-id',
                },
                {
                  text: 'getChildren()',
                  link: '/gsap/timeline/methods/get-children',
                },
                {
                  text: 'getTweensOf()',
                  link: '/gsap/timeline/methods/get-tweens-of',
                },
                {
                  text: 'globalTime()',
                  link: '/gsap/timeline/methods/global-time',
                },
                {
                  text: 'invalidate()',
                  link: '/gsap/timeline/methods/invalidate',
                },
                {
                  text: 'isActive()',
                  link: '/gsap/timeline/methods/is-active',
                },
                {
                  text: 'iteration()',
                  link: '/gsap/timeline/methods/iteration',
                },
                {
                  text: 'killTweensOf()',
                  link: '/gsap/timeline/methods/kill-tweens-of',
                },
                {
                  text: 'kill()',
                  link: '/gsap/timeline/methods/kill',
                },
                {
                  text: 'nextLabel()',
                  link: '/gsap/timeline/methods/next-label',
                },
                {
                  text: 'pause()',
                  link: '/gsap/timeline/methods/pause',
                },
                {
                  text: 'paused()',
                  link: '/gsap/timeline/methods/paused',
                },
                {
                  text: 'play()',
                  link: '/gsap/timeline/methods/play',
                },
                {
                  text: 'previousLabel()',
                  link: '/gsap/timeline/methods/previous-label',
                },
                {
                  text: 'progress()',
                  link: '/gsap/timeline/methods/progress',
                },
                {
                  text: 'recent()',
                  link: '/gsap/timeline/methods/recent',
                },
                {
                  text: 'remove()',
                  link: '/gsap/timeline/methods/remove',
                },
                {
                  text: 'removeLabel()',
                  link: '/gsap/timeline/methods/remove-label',
                },
                {
                  text: 'removePause()',
                  link: '/gsap/timeline/methods/remove-pause',
                },
                {
                  text: 'repeat()',
                  link: '/gsap/timeline/methods/repeat',
                },
                {
                  text: 'repeatDelay()',
                  link: '/gsap/timeline/methods/repeat-delay',
                },
                {
                  text: 'restart()',
                  link: '/gsap/timeline/methods/restart',
                },
                {
                  text: 'resume()',
                  link: '/gsap/timeline/methods/resume',
                },
                {
                  text: 'reverse()',
                  link: '/gsap/timeline/methods/reverse',
                },
                {
                  text: 'reversed()',
                  link: '/gsap/timeline/methods/reversed',
                },
                {
                  text: 'revert()',
                  link: '/gsap/timeline/methods/revert',
                },
                {
                  text: 'seek()',
                  link: '/gsap/timeline/methods/seek',
                },
                {
                  text: 'set()',
                  link: '/gsap/timeline/methods/set',
                },
                {
                  text: 'shiftChildren()',
                  link: '/gsap/timeline/methods/shift-children',
                },
                {
                  text: 'startTime()',
                  link: '/gsap/timeline/methods/start-time',
                },
                {
                  text: 'then()',
                  link: '/gsap/timeline/methods/then',
                },
                {
                  text: 'time()',
                  link: '/gsap/timeline/methods/time',
                },
                {
                  text: 'timeScale()',
                  link: '/gsap/timeline/methods/time-scale',
                },
                {
                  text: 'to()',
                  link: '/gsap/timeline/methods/to',
                },
                {
                  text: 'totalDuration()',
                  link: '/gsap/timeline/methods/total-duration',
                },
                {
                  text: 'totalProgress()',
                  link: '/gsap/timeline/methods/total-progress',
                },
                {
                  text: 'totalTime()',
                  link: '/gsap/timeline/methods/total-time',
                },
                {
                  text: 'tweenFromTo()',
                  link: '/gsap/timeline/methods/tween-from-to',
                },
                {
                  text: 'tweenTo()',
                  link: '/gsap/timeline/methods/tween-to',
                },
                {
                  text: 'yoyo()',
                  link: '/gsap/timeline/methods/yoyo',
                },
              ],
            },
            {
              text: '属性',
              collapsed: true,
              items: [
                {
                  text: 'autoRemoveChildren',
                  link: '/gsap/timeline/properties/auto-remove-children',
                },
                {
                  text: 'data',
                  link: '/gsap/timeline/properties/data',
                },
                {
                  text: 'labels',
                  link: '/gsap/timeline/properties/labels',
                },
                {
                  text: 'parent',
                  link: '/gsap/timeline/properties/parent',
                },
                {
                  text: 'scrollTrigger',
                  link: '/gsap/timeline/properties/scroll-trigger',
                },
                {
                  text: 'smoothChildTiming',
                  link: '/gsap/timeline/properties/smooth-child-timing',
                },
                {
                  text: 'vars',
                  link: '/gsap/timeline/properties/vars',
                },
              ],
            },
          ],
        },
        {
          text: 'CSS',
          collapsed: false,
          link: '/gsap/css/start',
        },
        {
          text: 'Easing',
          collapsed: true,
          link: '/gsap/easing/start',
          items: [
            {
              text: 'CustomBounce',
              link: '/gsap/easing/custom-bounce',
            },
            {
              text: 'CustomEase',
              link: '/gsap/easing/custom-ease',
            },
            {
              text: 'CustomWiggle',
              link: '/gsap/easing/custom-wiggle',
            },
            {
              text: 'ExpoScaleEase',
              link: '/gsap/easing/expo-scale-ease',
            },
            {
              text: 'RoughEase',
              link: '/gsap/easing/rough-ease',
            },
            {
              text: 'SlowMo',
              link: '/gsap/easing/slow-mo',
            },
            {
              text: 'SteppedEase',
              link: '/gsap/easing/stepped-ease',
            },
          ],
        },
      ],
    },
    {
      text: '插件(敬请期待)',
      collapsed: true,
      items: [
        {
          text: 'ScrollTrigger',
        },
        {
          text: 'ScrollSmoother',
        },
        {
          text: 'Flip',
        },
        {
          text: 'CSSRule',
        },
        {
          text: 'Draggable',
        },
        {
          text: 'DrawSVG',
        },
        {
          text: 'Easel',
        },
        {
          text: 'GSDevTools',
        },
        {
          text: 'Inertia',
        },
        {
          text: 'MorphSVG',
        },
        {
          text: 'MotionPath',
        },
        {
          text: 'MotionPathHelper',
        },
        {
          text: 'Observer',
        },
        {
          text: 'Physics2D',
        },
        {
          text: 'PhysicsProps',
        },
        {
          text: 'Pixi',
        },
        {
          text: 'Plugin',
        },
        {
          text: 'ScrambleText',
        },
        {
          text: 'ScrollTo',
        },
        {
          text: 'SplitText',
        },
        {
          text: 'Text',
        },
      ],
    },
    {
      text: '有用的功能和工具(敬请期待)',
      collapsed: true,
      items: [
        {
          text: 'Utility Methods(常用方法)',
        },
        {
          text: 'Staggers(延迟执行)',
        },
        {
          text: 'HelperFunctions(工具方法)',
        },
        {
          text: 'React-useGSAP()',
        },
      ],
    },
  ],
  '/html2canvas/': [
    {
      text: '关于',
      link: '/html2canvas/about',
    },
    {
      text: '入门',
      link: '/html2canvas/start',
    },
    {
      text: '配置',
      link: '/html2canvas/config',
    },
    {
      text: '功能',
      link: '/html2canvas/function',
    },
    {
      text: '代理',
      link: '/html2canvas/proxy',
    },
    {
      text: '答疑',
      link: '/html2canvas/question',
    },
  ],
  '/hammerjs/': [
    {
      text: '基础',
      items: [
        {
          text: '入门',
          link: '/hammerjs/start',
        },
        {
          text: '技巧和提示',
          link: '/hammerjs/tips',
        },
        {
          text: '浏览器/设备支持情况',
          link: '/hammerjs/browser-support',
        },
        {
          text: '示例',
          link: '/hammerjs/examples',
        },
        {
          text: '更新日志',
          link: '/hammerjs/changelog',
        },
      ],
    },
    {
      text: 'Hammer',
      items: [
        {
          text: 'API',
          link: '/hammerjs/api',
        },
        {
          text: 'Touch-action',
          link: '/hammerjs/touch-action',
        },
        {
          text: '同时识别两种手势',
          link: '/hammerjs/recognize-with',
        },
        {
          text: '要求其他识别器失败',
          link: '/hammerjs/require-failure',
        },
        {
          text: '在运行时切换识别器',
          link: '/hammerjs/toggle-recognizer',
        },
      ],
    },
    {
      text: '手势',
      items: [
        {
          text: '拖动',
          link: '/hammerjs/recognizer-pan',
        },
        {
          text: '轻触',
          link: '/hammerjs/recognizer-tap',
        },
        {
          text: '旋转',
          link: '/hammerjs/recognizer-rotate',
        },
        {
          text: '滑动',
          link: '/hammerjs/recognizer-swipe',
        },
        {
          text: '捏合',
          link: '/hammerjs/recognizer-pinch',
        },
        {
          text: '长按',
          link: '/hammerjs/recognizer-press',
        },
      ],
    },
    {
      text: '扩展',
      items: [
        {
          text: 'jQuery 插件',
          link: '/hammerjs/jquery-plugin',
        },
        {
          text: 'Angular.js 指令',
          link: '/hammerjs/angularjs-directive',
        },
        {
          text: '触摸模拟器',
          link: '/hammerjs/touch-emulator',
        },
      ],
    },
  ],
  '/sweetalert/': [
    {
      text: '配置',
      link: '/sweetalert/config',
    },
    {
      text: '方法',
      link: '/sweetalert/methods',
    },
    {
      text: '主题',
      link: '/sweetalert/theming',
    },
  ],
}
