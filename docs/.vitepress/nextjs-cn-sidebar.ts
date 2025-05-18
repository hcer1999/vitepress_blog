import { type DefaultTheme } from 'vitepress'

export const nextjsCnSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Next.js 中文文档',
    link: '/nextjs-cn/',
    items: [
      {
        text: 'App Router',
        collapsed: false,
        link: '/nextjs-cn/01-app/',
        items: [
          {
            text: '入门指南',
            collapsed: true,
            link: '/nextjs-cn/01-app/01-getting-started/',
            items: [
              {
                text: '介绍',
                link: '/nextjs-cn/01-app/01-getting-started/01-installation',
              },
              {
                text: '项目结构',
                link: '/nextjs-cn/01-app/01-getting-started/02-project-structure',
              },
              {
                text: '布局和页面',
                link: '/nextjs-cn/01-app/01-getting-started/03-layouts-and-pages',
              },
              {
                text: '图片',
                link: '/nextjs-cn/01-app/01-getting-started/04-images',
              },
              {
                text: '字体',
                link: '/nextjs-cn/01-app/01-getting-started/05-fonts',
              },
              {
                text: 'CSS',
                link: '/nextjs-cn/01-app/01-getting-started/06-css',
              },
              {
                text: '部分预渲染',
                link: '/nextjs-cn/01-app/01-getting-started/07-partial-prerendering',
              },
              {
                text: '数据获取',
                link: '/nextjs-cn/01-app/01-getting-started/08-fetching-data',
              },
              {
                text: '更新和删除',
                link: '/nextjs-cn/01-app/01-getting-started/09-updating-data',
              },
              {
                text: '错误处理',
                link: '/nextjs-cn/01-app/01-getting-started/10-error-handling',
              },
              {
                text: '部署',
                link: '/nextjs-cn/01-app/01-getting-started/11-deploying',
              },
              {
                text: '元数据和 OG 图像',
                link: '/nextjs-cn/01-app/01-getting-started/12-metadata-and-og-images',
              },
              {
                text: '升级指南',
                link: '/nextjs-cn/01-app/01-getting-started/13-upgrading',
              },
            ],
          },
          {
            text: '指南',
            collapsed: true,
            link: '/nextjs-cn/01-app/02-guides/',
            items: [
              { text: '分析', link: '/nextjs-cn/01-app/02-guides/analytics' },
              { text: '认证', link: '/nextjs-cn/01-app/02-guides/authentication' },
              { text: 'CI 构建缓存', link: '/nextjs-cn/01-app/02-guides/ci-build-caching' },
              { text: '内容安全策略', link: '/nextjs-cn/01-app/02-guides/content-security-policy' },
              { text: 'CSS-in-JS', link: '/nextjs-cn/01-app/02-guides/css-in-js' },
              { text: '自定义服务器', link: '/nextjs-cn/01-app/02-guides/custom-server' },
              { text: '调试', link: '/nextjs-cn/01-app/02-guides/debugging' },
              { text: '草稿模式', link: '/nextjs-cn/01-app/02-guides/draft-mode' },
              { text: '环境变量', link: '/nextjs-cn/01-app/02-guides/environment-variables' },
              { text: '插桩', link: '/nextjs-cn/01-app/02-guides/instrumentation' },
              { text: 'JSON-LD', link: '/nextjs-cn/01-app/02-guides/json-ld' },
              { text: '懒加载', link: '/nextjs-cn/01-app/02-guides/lazy-loading' },
              { text: '本地开发', link: '/nextjs-cn/01-app/02-guides/local-development' },
              { text: 'MDX', link: '/nextjs-cn/01-app/02-guides/mdx' },
              { text: '内存使用', link: '/nextjs-cn/01-app/02-guides/memory-usage' },
              { text: '多租户', link: '/nextjs-cn/01-app/02-guides/multi-tenant' },
              { text: '多区域', link: '/nextjs-cn/01-app/02-guides/multi-zones' },
              { text: 'OpenTelemetry', link: '/nextjs-cn/01-app/02-guides/open-telemetry' },
              { text: '包打包', link: '/nextjs-cn/01-app/02-guides/package-bundling' },
              { text: '生产检查清单', link: '/nextjs-cn/01-app/02-guides/production-checklist' },
              { text: '渐进式Web应用', link: '/nextjs-cn/01-app/02-guides/progressive-web-apps' },
              { text: 'Sass', link: '/nextjs-cn/01-app/02-guides/sass' },
              { text: '脚本', link: '/nextjs-cn/01-app/02-guides/scripts' },
              { text: '自托管', link: '/nextjs-cn/01-app/02-guides/self-hosting' },
              { text: '单页应用', link: '/nextjs-cn/01-app/02-guides/single-page-applications' },
              { text: '静态导出', link: '/nextjs-cn/01-app/02-guides/static-exports' },
              { text: 'Tailwind CSS', link: '/nextjs-cn/01-app/02-guides/tailwind-css' },
              { text: '第三方库', link: '/nextjs-cn/01-app/02-guides/third-party-libraries' },
              { text: '视频', link: '/nextjs-cn/01-app/02-guides/videos' },
              {
                text: '测试',
                collapsed: true,
                link: '/nextjs-cn/01-app/02-guides/testing/',
                items: [
                  { text: 'Cypress', link: '/nextjs-cn/01-app/02-guides/testing/cypress' },
                  { text: 'Jest', link: '/nextjs-cn/01-app/02-guides/testing/jest' },
                  { text: 'Playwright', link: '/nextjs-cn/01-app/02-guides/testing/playwright' },
                  { text: 'Vitest', link: '/nextjs-cn/01-app/02-guides/testing/vitest' },
                ],
              },
              {
                text: '迁移',
                collapsed: true,
                link: '/nextjs-cn/01-app/02-guides/migrating/',
                items: [
                  {
                    text: 'App Router 迁移',
                    link: '/nextjs-cn/01-app/02-guides/migrating/app-router-migration',
                  },
                  {
                    text: '从 Create React App 迁移',
                    link: '/nextjs-cn/01-app/02-guides/migrating/from-create-react-app',
                  },
                  { text: '从 Vite 迁移', link: '/nextjs-cn/01-app/02-guides/migrating/from-vite' },
                ],
              },
              {
                text: '升级',
                collapsed: true,
                link: '/nextjs-cn/01-app/02-guides/upgrading/',
                items: [
                  { text: 'Codemods', link: '/nextjs-cn/01-app/02-guides/upgrading/codemods' },
                  { text: '版本 14', link: '/nextjs-cn/01-app/02-guides/upgrading/version-14' },
                  { text: '版本 15', link: '/nextjs-cn/01-app/02-guides/upgrading/version-15' },
                ],
              },
            ],
          },
          {
            text: '构建应用',
            collapsed: true,
            link: '/nextjs-cn/01-app/03-building-your-application/',
            items: [
              {
                text: '路由',
                collapsed: true,
                link: '/nextjs-cn/01-app/03-building-your-application/01-routing/',
                items: [
                  {
                    text: '布局和模板',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/03-layouts-and-templates',
                  },
                  {
                    text: '链接和导航',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/04-linking-and-navigating',
                  },
                  {
                    text: '错误处理',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/05-error-handling',
                  },
                  {
                    text: '加载UI和流式传输',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/06-loading-ui-and-streaming',
                  },
                  {
                    text: '重定向',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/07-redirecting',
                  },
                  {
                    text: '路由组',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/08-route-groups',
                  },
                  {
                    text: '动态路由',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/10-dynamic-routes',
                  },
                  {
                    text: '并行路由',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/11-parallel-routes',
                  },
                  {
                    text: '拦截路由',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/12-intercepting-routes',
                  },
                  {
                    text: '路由处理器',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/13-route-handlers',
                  },
                  {
                    text: '中间件',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/14-middleware',
                  },
                  {
                    text: '国际化',
                    link: '/nextjs-cn/01-app/03-building-your-application/01-routing/15-internationalization',
                  },
                ],
              },
              {
                text: '数据获取',
                collapsed: true,
                link: '/nextjs-cn/01-app/03-building-your-application/02-data-fetching/',
                items: [
                  {
                    text: '获取',
                    link: '/nextjs-cn/01-app/03-building-your-application/02-data-fetching/01-fetching',
                  },
                  {
                    text: '服务器操作和变更',
                    link: '/nextjs-cn/01-app/03-building-your-application/02-data-fetching/03-server-actions-and-mutations',
                  },
                  {
                    text: '增量静态再生成',
                    link: '/nextjs-cn/01-app/03-building-your-application/02-data-fetching/04-incremental-static-regeneration',
                  },
                ],
              },
              {
                text: '渲染',
                collapsed: true,
                link: '/nextjs-cn/01-app/03-building-your-application/03-rendering/',
                items: [
                  {
                    text: '服务器组件',
                    link: '/nextjs-cn/01-app/03-building-your-application/03-rendering/01-server-components',
                  },
                  {
                    text: '客户端组件',
                    link: '/nextjs-cn/01-app/03-building-your-application/03-rendering/02-client-components',
                  },
                  {
                    text: '组合模式',
                    link: '/nextjs-cn/01-app/03-building-your-application/03-rendering/03-composition-patterns',
                  },
                ],
              },
            ],
          },
          {
            text: '深入探索',
            collapsed: true,
            link: '/nextjs-cn/01-app/04-deep-dive/',
            items: [{ text: '缓存', link: '/nextjs-cn/01-app/04-deep-dive/caching' }],
          },
          {
            text: 'API 参考',
            collapsed: true,
            link: '/nextjs-cn/01-app/05-api-reference/',
            items: [
              {
                text: '指令',
                collapsed: true,
                link: '/nextjs-cn/01-app/05-api-reference/01-directives/',
                items: [
                  {
                    text: 'use cache',
                    link: '/nextjs-cn/01-app/05-api-reference/01-directives/use-cache',
                  },
                  {
                    text: 'use client',
                    link: '/nextjs-cn/01-app/05-api-reference/01-directives/use-client',
                  },
                  {
                    text: 'use server',
                    link: '/nextjs-cn/01-app/05-api-reference/01-directives/use-server',
                  },
                ],
              },
              {
                text: '组件',
                collapsed: true,
                link: '/nextjs-cn/01-app/05-api-reference/02-components/',
                items: [
                  { text: 'Font', link: '/nextjs-cn/01-app/05-api-reference/02-components/font' },
                  { text: 'Form', link: '/nextjs-cn/01-app/05-api-reference/02-components/form' },
                  { text: 'Image', link: '/nextjs-cn/01-app/05-api-reference/02-components/image' },
                  { text: 'Link', link: '/nextjs-cn/01-app/05-api-reference/02-components/link' },
                  {
                    text: 'Script',
                    link: '/nextjs-cn/01-app/05-api-reference/02-components/script',
                  },
                ],
              },
              {
                text: '配置',
                collapsed: true,
                link: '/nextjs-cn/01-app/05-api-reference/05-config/',
                items: [
                  {
                    text: 'next.config.js',
                    link: '/nextjs-cn/01-app/05-api-reference/05-config/01-next-config-js/',
                  },
                  {
                    text: 'TypeScript',
                    link: '/nextjs-cn/01-app/05-api-reference/05-config/02-typescript',
                  },
                  {
                    text: 'ESLint',
                    link: '/nextjs-cn/01-app/05-api-reference/05-config/03-eslint',
                  },
                ],
              },
              {
                text: 'CLI',
                collapsed: true,
                link: '/nextjs-cn/01-app/05-api-reference/06-cli/',
                items: [
                  {
                    text: 'create-next-app',
                    link: '/nextjs-cn/01-app/05-api-reference/06-cli/create-next-app',
                  },
                  { text: 'next', link: '/nextjs-cn/01-app/05-api-reference/06-cli/next' },
                ],
              },
              { text: 'Edge', link: '/nextjs-cn/01-app/05-api-reference/07-edge' },
              { text: 'Turbopack', link: '/nextjs-cn/01-app/05-api-reference/08-turbopack' },
            ],
          },
        ],
      },
      {
        text: 'Pages Router',
        collapsed: false,
        link: '/nextjs-cn/02-pages/',
        items: [
          {
            text: '入门指南',
            collapsed: true,
            link: '/nextjs-cn/02-pages/01-getting-started/',
            items: [
              { text: '安装', link: '/nextjs-cn/02-pages/01-getting-started/01-installation' },
              {
                text: '项目结构',
                link: '/nextjs-cn/02-pages/01-getting-started/02-project-structure',
              },
              { text: '图片', link: '/nextjs-cn/02-pages/01-getting-started/04-images' },
              { text: '字体', link: '/nextjs-cn/02-pages/01-getting-started/05-fonts' },
              { text: 'CSS', link: '/nextjs-cn/02-pages/01-getting-started/06-css' },
              { text: '部署', link: '/nextjs-cn/02-pages/01-getting-started/11-deploying' },
            ],
          },
          {
            text: '指南',
            collapsed: true,
            link: '/nextjs-cn/02-pages/02-guides/',
            items: [
              { text: 'AMP', link: '/nextjs-cn/02-pages/02-guides/amp' },
              { text: '分析', link: '/nextjs-cn/02-pages/02-guides/analytics' },
              { text: '认证', link: '/nextjs-cn/02-pages/02-guides/authentication' },
              { text: 'Babel', link: '/nextjs-cn/02-pages/02-guides/babel' },
              { text: 'CI 构建缓存', link: '/nextjs-cn/02-pages/02-guides/ci-build-caching' },
              {
                text: '内容安全策略',
                link: '/nextjs-cn/02-pages/02-guides/content-security-policy',
              },
              { text: 'CSS-in-JS', link: '/nextjs-cn/02-pages/02-guides/css-in-js' },
              { text: '自定义服务器', link: '/nextjs-cn/02-pages/02-guides/custom-server' },
              { text: '调试', link: '/nextjs-cn/02-pages/02-guides/debugging' },
              { text: '草稿模式', link: '/nextjs-cn/02-pages/02-guides/draft-mode' },
              { text: '环境变量', link: '/nextjs-cn/02-pages/02-guides/environment-variables' },
              { text: '插桩', link: '/nextjs-cn/02-pages/02-guides/instrumentation' },
              { text: '懒加载', link: '/nextjs-cn/02-pages/02-guides/lazy-loading' },
              { text: 'MDX', link: '/nextjs-cn/02-pages/02-guides/mdx' },
              { text: '多区域', link: '/nextjs-cn/02-pages/02-guides/multi-zones' },
              { text: 'OpenTelemetry', link: '/nextjs-cn/02-pages/02-guides/open-telemetry' },
              { text: '包打包', link: '/nextjs-cn/02-pages/02-guides/package-bundling' },
              { text: 'PostCSS', link: '/nextjs-cn/02-pages/02-guides/post-css' },
              { text: '预览模式', link: '/nextjs-cn/02-pages/02-guides/preview-mode' },
              { text: '生产检查清单', link: '/nextjs-cn/02-pages/02-guides/production-checklist' },
              { text: 'Sass', link: '/nextjs-cn/02-pages/02-guides/sass' },
              { text: '脚本', link: '/nextjs-cn/02-pages/02-guides/scripts' },
              { text: '自托管', link: '/nextjs-cn/02-pages/02-guides/self-hosting' },
              { text: '静态导出', link: '/nextjs-cn/02-pages/02-guides/static-exports' },
              { text: 'Tailwind CSS', link: '/nextjs-cn/02-pages/02-guides/tailwind-css' },
              { text: '第三方库', link: '/nextjs-cn/02-pages/02-guides/third-party-libraries' },
              {
                text: '测试',
                collapsed: true,
                link: '/nextjs-cn/02-pages/02-guides/testing/',
                items: [
                  { text: 'Cypress', link: '/nextjs-cn/02-pages/02-guides/testing/cypress' },
                  { text: 'Jest', link: '/nextjs-cn/02-pages/02-guides/testing/jest' },
                  { text: 'Playwright', link: '/nextjs-cn/02-pages/02-guides/testing/playwright' },
                  { text: 'Vitest', link: '/nextjs-cn/02-pages/02-guides/testing/vitest' },
                ],
              },
              {
                text: '迁移',
                collapsed: true,
                link: '/nextjs-cn/02-pages/02-guides/migrating/',
                items: [
                  {
                    text: 'App Router 迁移',
                    link: '/nextjs-cn/02-pages/02-guides/migrating/app-router-migration',
                  },
                  {
                    text: '从 Create React App 迁移',
                    link: '/nextjs-cn/02-pages/02-guides/migrating/from-create-react-app',
                  },
                  {
                    text: '从 Vite 迁移',
                    link: '/nextjs-cn/02-pages/02-guides/migrating/from-vite',
                  },
                ],
              },
              {
                text: '升级',
                collapsed: true,
                link: '/nextjs-cn/02-pages/02-guides/upgrading/',
                items: [
                  { text: 'Codemods', link: '/nextjs-cn/02-pages/02-guides/upgrading/codemods' },
                  { text: '版本 9', link: '/nextjs-cn/02-pages/02-guides/upgrading/version-9' },
                  { text: '版本 10', link: '/nextjs-cn/02-pages/02-guides/upgrading/version-10' },
                  { text: '版本 11', link: '/nextjs-cn/02-pages/02-guides/upgrading/version-11' },
                  { text: '版本 12', link: '/nextjs-cn/02-pages/02-guides/upgrading/version-12' },
                  { text: '版本 13', link: '/nextjs-cn/02-pages/02-guides/upgrading/version-13' },
                  { text: '版本 14', link: '/nextjs-cn/02-pages/02-guides/upgrading/version-14' },
                ],
              },
            ],
          },
          {
            text: '构建应用',
            collapsed: true,
            link: '/nextjs-cn/02-pages/03-building-your-application/',
            items: [
              {
                text: '路由',
                collapsed: true,
                link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/',
                items: [
                  {
                    text: '页面和布局',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/01-pages-and-layouts',
                  },
                  {
                    text: '动态路由',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/02-dynamic-routes',
                  },
                  {
                    text: '链接和导航',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/03-linking-and-navigating',
                  },
                  {
                    text: '重定向',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/04-redirecting',
                  },
                  {
                    text: '自定义 App',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/05-custom-app',
                  },
                  {
                    text: '自定义 Document',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/06-custom-document',
                  },
                  {
                    text: 'API 路由',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/07-api-routes',
                  },
                  {
                    text: '自定义错误',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/08-custom-error',
                  },
                  {
                    text: '国际化',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/10-internationalization',
                  },
                  {
                    text: '中间件',
                    link: '/nextjs-cn/02-pages/03-building-your-application/01-routing/11-middleware',
                  },
                ],
              },
              {
                text: '渲染',
                collapsed: true,
                link: '/nextjs-cn/02-pages/03-building-your-application/02-rendering/',
                items: [
                  {
                    text: '服务端渲染',
                    link: '/nextjs-cn/02-pages/03-building-your-application/02-rendering/01-server-side-rendering',
                  },
                  {
                    text: '静态站点生成',
                    link: '/nextjs-cn/02-pages/03-building-your-application/02-rendering/02-static-site-generation',
                  },
                  {
                    text: '自动静态优化',
                    link: '/nextjs-cn/02-pages/03-building-your-application/02-rendering/04-automatic-static-optimization',
                  },
                  {
                    text: '客户端渲染',
                    link: '/nextjs-cn/02-pages/03-building-your-application/02-rendering/05-client-side-rendering',
                  },
                ],
              },
              {
                text: '数据获取',
                collapsed: true,
                link: '/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/',
                items: [
                  {
                    text: 'getStaticProps',
                    link: '/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/01-get-static-props',
                  },
                  {
                    text: 'getStaticPaths',
                    link: '/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/02-get-static-paths',
                  },
                  {
                    text: 'getServerSideProps',
                    link: '/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/03-get-server-side-props',
                  },
                  {
                    text: '表单和变更',
                    link: '/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/03-forms-and-mutations',
                  },
                  {
                    text: '增量静态再生成',
                    link: '/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/04-incremental-static-regeneration',
                  },
                  {
                    text: '客户端',
                    link: '/nextjs-cn/02-pages/03-building-your-application/03-data-fetching/05-client-side',
                  },
                ],
              },
              {
                text: '配置',
                collapsed: true,
                link: '/nextjs-cn/02-pages/03-building-your-application/06-configuring/',
                items: [
                  {
                    text: '错误处理',
                    link: '/nextjs-cn/02-pages/03-building-your-application/06-configuring/12-error-handling',
                  },
                ],
              },
            ],
          },
          {
            text: 'API 参考',
            collapsed: true,
            link: '/nextjs-cn/02-pages/04-api-reference/',
            items: [
              {
                text: '组件',
                collapsed: true,
                link: '/nextjs-cn/02-pages/04-api-reference/01-components/',
                items: [
                  { text: 'Font', link: '/nextjs-cn/02-pages/04-api-reference/01-components/font' },
                  { text: 'Form', link: '/nextjs-cn/02-pages/04-api-reference/01-components/form' },
                  { text: 'Head', link: '/nextjs-cn/02-pages/04-api-reference/01-components/head' },
                  {
                    text: 'Image',
                    link: '/nextjs-cn/02-pages/04-api-reference/01-components/image',
                  },
                  {
                    text: 'Image (Legacy)',
                    link: '/nextjs-cn/02-pages/04-api-reference/01-components/image-legacy',
                  },
                  { text: 'Link', link: '/nextjs-cn/02-pages/04-api-reference/01-components/link' },
                  {
                    text: 'Script',
                    link: '/nextjs-cn/02-pages/04-api-reference/01-components/script',
                  },
                ],
              },
              {
                text: '函数',
                collapsed: true,
                link: '/nextjs-cn/02-pages/04-api-reference/03-functions/',
                items: [
                  {
                    text: 'getInitialProps',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/get-initial-props',
                  },
                  {
                    text: 'getServerSideProps',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/get-server-side-props',
                  },
                  {
                    text: 'getStaticPaths',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/get-static-paths',
                  },
                  {
                    text: 'getStaticProps',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/get-static-props',
                  },
                  {
                    text: 'NextRequest',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/next-request',
                  },
                  {
                    text: 'NextResponse',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/next-response',
                  },
                  {
                    text: 'useAmp',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/use-amp',
                  },
                  {
                    text: 'useReportWebVitals',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/use-report-web-vitals',
                  },
                  {
                    text: 'useRouter',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/use-router',
                  },
                  {
                    text: 'userAgent',
                    link: '/nextjs-cn/02-pages/04-api-reference/03-functions/userAgent',
                  },
                ],
              },
              { text: 'Edge', link: '/nextjs-cn/02-pages/04-api-reference/06-edge' },
              { text: 'Turbopack', link: '/nextjs-cn/02-pages/04-api-reference/08-turbopack' },
            ],
          },
        ],
      },
      {
        text: '架构',
        collapsed: false,
        link: '/nextjs-cn/03-architecture/',
        items: [
          {
            text: '可访问性',
            link: '/nextjs-cn/03-architecture/accessibility',
          },
          {
            text: '快速刷新',
            link: '/nextjs-cn/03-architecture/fast-refresh',
          },
          {
            text: 'Next.js 编译器',
            link: '/nextjs-cn/03-architecture/nextjs-compiler',
          },
          {
            text: '支持的浏览器',
            link: '/nextjs-cn/03-architecture/supported-browsers',
          },
        ],
      },
      {
        text: '社区',
        collapsed: false,
        link: '/nextjs-cn/04-community/',
        items: [
          {
            text: '贡献指南',
            link: '/nextjs-cn/04-community/01-contribution-guide',
          },
        ],
      },
    ],
  },
]
