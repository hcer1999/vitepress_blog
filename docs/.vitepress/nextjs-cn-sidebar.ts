import { type DefaultTheme } from 'vitepress'

export const nextjsCnSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Next.js 中文文档',
    link: '/nextjs-cn/',
    items: [
      {
        text: 'App Router',
        collapsed: false,
        link: '/nextjs-cn/app/',
        items: [
          {
            text: '入门指南',
            collapsed: true,
            link: '/nextjs-cn/app/getting-started/',
            items: [
              {
                text: '介绍',
                link: '/nextjs-cn/app/getting-started/installation',
              },
              {
                text: '项目结构',
                link: '/nextjs-cn/app/getting-started/project-structure',
              },
              {
                text: '布局和页面',
                link: '/nextjs-cn/app/getting-started/layouts-and-pages',
              },
              {
                text: '图片',
                link: '/nextjs-cn/app/getting-started/images',
              },
              {
                text: '字体',
                link: '/nextjs-cn/app/getting-started/fonts',
              },
              {
                text: 'CSS',
                link: '/nextjs-cn/app/getting-started/css',
              },
              {
                text: '部分预渲染',
                link: '/nextjs-cn/app/getting-started/partial-prerendering',
              },
              {
                text: '数据获取',
                link: '/nextjs-cn/app/getting-started/fetching-data',
              },
              {
                text: '更新和删除',
                link: '/nextjs-cn/app/getting-started/updating-data',
              },
              {
                text: '错误处理',
                link: '/nextjs-cn/app/getting-started/error-handling',
              },
              {
                text: '部署',
                link: '/nextjs-cn/app/getting-started/deploying',
              },
              {
                text: '元数据和 OG 图像',
                link: '/nextjs-cn/app/getting-started/metadata-and-og-images',
              },
              {
                text: '升级指南',
                link: '/nextjs-cn/app/getting-started/upgrading',
              },
            ],
          },
          {
            text: '指南',
            collapsed: true,
            link: '/nextjs-cn/app/guides/',
            items: [
              { text: '分析', link: '/nextjs-cn/app/guides/analytics' },
              { text: '认证', link: '/nextjs-cn/app/guides/authentication' },
              { text: 'CI 构建缓存', link: '/nextjs-cn/app/guides/ci-build-caching' },
              { text: '内容安全策略', link: '/nextjs-cn/app/guides/content-security-policy' },
              { text: 'CSS-in-JS', link: '/nextjs-cn/app/guides/css-in-js' },
              { text: '自定义服务器', link: '/nextjs-cn/app/guides/custom-server' },
              { text: '调试', link: '/nextjs-cn/app/guides/debugging' },
              { text: '草稿模式', link: '/nextjs-cn/app/guides/draft-mode' },
              { text: '环境变量', link: '/nextjs-cn/app/guides/environment-variables' },
              { text: '插桩', link: '/nextjs-cn/app/guides/instrumentation' },
              { text: 'JSON-LD', link: '/nextjs-cn/app/guides/json-ld' },
              { text: '懒加载', link: '/nextjs-cn/app/guides/lazy-loading' },
              { text: '本地开发', link: '/nextjs-cn/app/guides/local-development' },
              { text: 'MDX', link: '/nextjs-cn/app/guides/mdx' },
              { text: '内存使用', link: '/nextjs-cn/app/guides/memory-usage' },
              { text: '多租户', link: '/nextjs-cn/app/guides/multi-tenant' },
              { text: '多区域', link: '/nextjs-cn/app/guides/multi-zones' },
              { text: 'OpenTelemetry', link: '/nextjs-cn/app/guides/open-telemetry' },
              { text: '包打包', link: '/nextjs-cn/app/guides/package-bundling' },
              { text: '生产检查清单', link: '/nextjs-cn/app/guides/production-checklist' },
              { text: '渐进式Web应用', link: '/nextjs-cn/app/guides/progressive-web-apps' },
              { text: 'Sass', link: '/nextjs-cn/app/guides/sass' },
              { text: '脚本', link: '/nextjs-cn/app/guides/scripts' },
              { text: '自托管', link: '/nextjs-cn/app/guides/self-hosting' },
              { text: '单页应用', link: '/nextjs-cn/app/guides/single-page-applications' },
              { text: '静态导出', link: '/nextjs-cn/app/guides/static-exports' },
              { text: 'Tailwind CSS', link: '/nextjs-cn/app/guides/tailwind-css' },
              { text: '第三方库', link: '/nextjs-cn/app/guides/third-party-libraries' },
              { text: '视频', link: '/nextjs-cn/app/guides/videos' },
              {
                text: '测试',
                collapsed: true,
                link: '/nextjs-cn/app/guides/testing/',
                items: [
                  { text: 'Cypress', link: '/nextjs-cn/app/guides/testing/cypress' },
                  { text: 'Jest', link: '/nextjs-cn/app/guides/testing/jest' },
                  { text: 'Playwright', link: '/nextjs-cn/app/guides/testing/playwright' },
                  { text: 'Vitest', link: '/nextjs-cn/app/guides/testing/vitest' },
                ],
              },
              {
                text: '迁移',
                collapsed: true,
                link: '/nextjs-cn/app/guides/migrating/',
                items: [
                  {
                    text: 'App Router 迁移',
                    link: '/nextjs-cn/app/guides/migrating/app-router-migration',
                  },
                  {
                    text: '从 Create React App 迁移',
                    link: '/nextjs-cn/app/guides/migrating/from-create-react-app',
                  },
                  { text: '从 Vite 迁移', link: '/nextjs-cn/app/guides/migrating/from-vite' },
                ],
              },
              {
                text: '升级',
                collapsed: true,
                link: '/nextjs-cn/app/guides/upgrading/',
                items: [
                  { text: 'Codemods', link: '/nextjs-cn/app/guides/upgrading/codemods' },
                  { text: '版本 14', link: '/nextjs-cn/app/guides/upgrading/version-14' },
                  { text: '版本 15', link: '/nextjs-cn/app/guides/upgrading/version-15' },
                ],
              },
            ],
          },
          {
            text: '构建应用',
            collapsed: true,
            link: '/nextjs-cn/app/building-your-application/',
            items: [
              {
                text: '路由',
                collapsed: true,
                link: '/nextjs-cn/app/building-your-application/routing/',
                items: [
                  {
                    text: '布局和模板',
                    link: '/nextjs-cn/app/building-your-application/routing/layouts-and-templates',
                  },
                  {
                    text: '链接和导航',
                    link: '/nextjs-cn/app/building-your-application/routing/linking-and-navigating',
                  },
                  {
                    text: '错误处理',
                    link: '/nextjs-cn/app/building-your-application/routing/error-handling',
                  },
                  {
                    text: '加载UI和流式传输',
                    link: '/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming',
                  },
                  {
                    text: '重定向',
                    link: '/nextjs-cn/app/building-your-application/routing/redirecting',
                  },
                  {
                    text: '路由组',
                    link: '/nextjs-cn/app/building-your-application/routing/route-groups',
                  },
                  {
                    text: '动态路由',
                    link: '/nextjs-cn/app/building-your-application/routing/dynamic-routes',
                  },
                  {
                    text: '并行路由',
                    link: '/nextjs-cn/app/building-your-application/routing/parallel-routes',
                  },
                  {
                    text: '拦截路由',
                    link: '/nextjs-cn/app/building-your-application/routing/intercepting-routes',
                  },
                  {
                    text: '路由处理器',
                    link: '/nextjs-cn/app/building-your-application/routing/route-handlers',
                  },
                  {
                    text: '中间件',
                    link: '/nextjs-cn/app/building-your-application/routing/middleware',
                  },
                  {
                    text: '国际化',
                    link: '/nextjs-cn/app/building-your-application/routing/internationalization',
                  },
                ],
              },
              {
                text: '数据获取',
                collapsed: true,
                link: '/nextjs-cn/app/building-your-application/data-fetching/',
                items: [
                  {
                    text: '获取',
                    link: '/nextjs-cn/app/building-your-application/data-fetching/fetching',
                  },
                  {
                    text: '服务器操作和变更',
                    link: '/nextjs-cn/app/building-your-application/data-fetching/server-actions-and-mutations',
                  },
                  {
                    text: '增量静态再生成',
                    link: '/nextjs-cn/app/building-your-application/data-fetching/incremental-static-regeneration',
                  },
                ],
              },
              {
                text: '渲染',
                collapsed: true,
                link: '/nextjs-cn/app/building-your-application/rendering/',
                items: [
                  {
                    text: '服务器组件',
                    link: '/nextjs-cn/app/building-your-application/rendering/server-components',
                  },
                  {
                    text: '客户端组件',
                    link: '/nextjs-cn/app/building-your-application/rendering/client-components',
                  },
                  {
                    text: '组合模式',
                    link: '/nextjs-cn/app/building-your-application/rendering/composition-patterns',
                  },
                ],
              },
            ],
          },
          {
            text: '深入探索',
            collapsed: true,
            link: '/nextjs-cn/app/deep-dive/',
            items: [{ text: '缓存', link: '/nextjs-cn/app/deep-dive/caching' }],
          },
          {
            text: 'API 参考',
            collapsed: true,
            link: '/nextjs-cn/app/api-reference/',
            items: [
              {
                text: '指令',
                collapsed: true,
                link: '/nextjs-cn/app/api-reference/directives/',
                items: [
                  {
                    text: 'use cache',
                    link: '/nextjs-cn/app/api-reference/directives/use-cache',
                  },
                  {
                    text: 'use client',
                    link: '/nextjs-cn/app/api-reference/directives/use-client',
                  },
                  {
                    text: 'use server',
                    link: '/nextjs-cn/app/api-reference/directives/use-server',
                  },
                ],
              },
              {
                text: '组件',
                collapsed: true,
                link: '/nextjs-cn/app/api-reference/components/',
                items: [
                  { text: 'Font', link: '/nextjs-cn/app/api-reference/components/font' },
                  { text: 'Form', link: '/nextjs-cn/app/api-reference/components/form' },
                  { text: 'Image', link: '/nextjs-cn/app/api-reference/components/image' },
                  { text: 'Link', link: '/nextjs-cn/app/api-reference/components/link' },
                  {
                    text: 'Script',
                    link: '/nextjs-cn/app/api-reference/components/script',
                  },
                ],
              },
              {
                text: '配置',
                collapsed: true,
                link: '/nextjs-cn/app/api-reference/config/',
                items: [
                  {
                    text: 'next.config.js',
                    link: '/nextjs-cn/app/api-reference/config/next-config-js/',
                  },
                  {
                    text: 'TypeScript',
                    link: '/nextjs-cn/app/api-reference/config/typescript',
                  },
                  {
                    text: 'ESLint',
                    link: '/nextjs-cn/app/api-reference/config/eslint',
                  },
                ],
              },
              {
                text: 'CLI',
                collapsed: true,
                link: '/nextjs-cn/app/api-reference/cli/',
                items: [
                  {
                    text: 'create-next-app',
                    link: '/nextjs-cn/app/api-reference/cli/create-next-app',
                  },
                  { text: 'next', link: '/nextjs-cn/app/api-reference/cli/next' },
                ],
              },
              { text: 'Edge', link: '/nextjs-cn/app/api-reference/edge' },
              { text: 'Turbopack', link: '/nextjs-cn/app/api-reference/turbopack' },
            ],
          },
        ],
      },
      {
        text: 'Pages Router',
        collapsed: false,
        link: '/nextjs-cn/pages/',
        items: [
          {
            text: '入门指南',
            collapsed: true,
            link: '/nextjs-cn/pages/getting-started/',
            items: [
              { text: '安装', link: '/nextjs-cn/pages/getting-started/installation' },
              {
                text: '项目结构',
                link: '/nextjs-cn/pages/getting-started/project-structure',
              },
              { text: '图片', link: '/nextjs-cn/pages/getting-started/images' },
              { text: '字体', link: '/nextjs-cn/pages/getting-started/fonts' },
              { text: 'CSS', link: '/nextjs-cn/pages/getting-started/css' },
              { text: '部署', link: '/nextjs-cn/pages/getting-started/deploying' },
            ],
          },
          {
            text: '指南',
            collapsed: true,
            link: '/nextjs-cn/pages/guides/',
            items: [
              { text: 'AMP', link: '/nextjs-cn/pages/guides/amp' },
              { text: '分析', link: '/nextjs-cn/pages/guides/analytics' },
              { text: '认证', link: '/nextjs-cn/pages/guides/authentication' },
              { text: 'Babel', link: '/nextjs-cn/pages/guides/babel' },
              { text: 'CI 构建缓存', link: '/nextjs-cn/pages/guides/ci-build-caching' },
              {
                text: '内容安全策略',
                link: '/nextjs-cn/pages/guides/content-security-policy',
              },
              { text: 'CSS-in-JS', link: '/nextjs-cn/pages/guides/css-in-js' },
              { text: '自定义服务器', link: '/nextjs-cn/pages/guides/custom-server' },
              { text: '调试', link: '/nextjs-cn/pages/guides/debugging' },
              { text: '草稿模式', link: '/nextjs-cn/pages/guides/draft-mode' },
              { text: '环境变量', link: '/nextjs-cn/pages/guides/environment-variables' },
              { text: '插桩', link: '/nextjs-cn/pages/guides/instrumentation' },
              { text: '懒加载', link: '/nextjs-cn/pages/guides/lazy-loading' },
              { text: 'MDX', link: '/nextjs-cn/pages/guides/mdx' },
              { text: '多区域', link: '/nextjs-cn/pages/guides/multi-zones' },
              { text: 'OpenTelemetry', link: '/nextjs-cn/pages/guides/open-telemetry' },
              { text: '包打包', link: '/nextjs-cn/pages/guides/package-bundling' },
              { text: 'PostCSS', link: '/nextjs-cn/pages/guides/post-css' },
              { text: '预览模式', link: '/nextjs-cn/pages/guides/preview-mode' },
              { text: '生产检查清单', link: '/nextjs-cn/pages/guides/production-checklist' },
              { text: 'Sass', link: '/nextjs-cn/pages/guides/sass' },
              { text: '脚本', link: '/nextjs-cn/pages/guides/scripts' },
              { text: '自托管', link: '/nextjs-cn/pages/guides/self-hosting' },
              { text: '静态导出', link: '/nextjs-cn/pages/guides/static-exports' },
              { text: 'Tailwind CSS', link: '/nextjs-cn/pages/guides/tailwind-css' },
              { text: '第三方库', link: '/nextjs-cn/pages/guides/third-party-libraries' },
              {
                text: '测试',
                collapsed: true,
                link: '/nextjs-cn/pages/guides/testing/',
                items: [
                  { text: 'Cypress', link: '/nextjs-cn/pages/guides/testing/cypress' },
                  { text: 'Jest', link: '/nextjs-cn/pages/guides/testing/jest' },
                  { text: 'Playwright', link: '/nextjs-cn/pages/guides/testing/playwright' },
                  { text: 'Vitest', link: '/nextjs-cn/pages/guides/testing/vitest' },
                ],
              },
              {
                text: '迁移',
                collapsed: true,
                link: '/nextjs-cn/pages/guides/migrating/',
                items: [
                  {
                    text: 'App Router 迁移',
                    link: '/nextjs-cn/pages/guides/migrating/app-router-migration',
                  },
                  {
                    text: '从 Create React App 迁移',
                    link: '/nextjs-cn/pages/guides/migrating/from-create-react-app',
                  },
                  {
                    text: '从 Vite 迁移',
                    link: '/nextjs-cn/pages/guides/migrating/from-vite',
                  },
                ],
              },
              {
                text: '升级',
                collapsed: true,
                link: '/nextjs-cn/pages/guides/upgrading/',
                items: [
                  { text: 'Codemods', link: '/nextjs-cn/pages/guides/upgrading/codemods' },
                  { text: '版本 9', link: '/nextjs-cn/pages/guides/upgrading/version-9' },
                  { text: '版本 10', link: '/nextjs-cn/pages/guides/upgrading/version-10' },
                  { text: '版本 11', link: '/nextjs-cn/pages/guides/upgrading/version-11' },
                  { text: '版本 12', link: '/nextjs-cn/pages/guides/upgrading/version-12' },
                  { text: '版本 13', link: '/nextjs-cn/pages/guides/upgrading/version-13' },
                  { text: '版本 14', link: '/nextjs-cn/pages/guides/upgrading/version-14' },
                ],
              },
            ],
          },
          {
            text: '构建应用',
            collapsed: true,
            link: '/nextjs-cn/pages/building-your-application/',
            items: [
              {
                text: '路由',
                collapsed: true,
                link: '/nextjs-cn/pages/building-your-application/routing/',
                items: [
                  {
                    text: '页面和布局',
                    link: '/nextjs-cn/pages/building-your-application/routing/pages-and-layouts',
                  },
                  {
                    text: '动态路由',
                    link: '/nextjs-cn/pages/building-your-application/routing/dynamic-routes',
                  },
                  {
                    text: '链接和导航',
                    link: '/nextjs-cn/pages/building-your-application/routing/linking-and-navigating',
                  },
                  {
                    text: '重定向',
                    link: '/nextjs-cn/pages/building-your-application/routing/redirecting',
                  },
                  {
                    text: '自定义 App',
                    link: '/nextjs-cn/pages/building-your-application/routing/custom-app',
                  },
                  {
                    text: '自定义 Document',
                    link: '/nextjs-cn/pages/building-your-application/routing/custom-document',
                  },
                  {
                    text: 'API 路由',
                    link: '/nextjs-cn/pages/building-your-application/routing/api-routes',
                  },
                  {
                    text: '自定义错误',
                    link: '/nextjs-cn/pages/building-your-application/routing/custom-error',
                  },
                  {
                    text: '国际化',
                    link: '/nextjs-cn/pages/building-your-application/routing/internationalization',
                  },
                  {
                    text: '中间件',
                    link: '/nextjs-cn/pages/building-your-application/routing/middleware',
                  },
                ],
              },
              {
                text: '渲染',
                collapsed: true,
                link: '/nextjs-cn/pages/building-your-application/rendering/',
                items: [
                  {
                    text: '服务端渲染',
                    link: '/nextjs-cn/pages/building-your-application/rendering/server-side-rendering',
                  },
                  {
                    text: '静态站点生成',
                    link: '/nextjs-cn/pages/building-your-application/rendering/static-site-generation',
                  },
                  {
                    text: '自动静态优化',
                    link: '/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization',
                  },
                  {
                    text: '客户端渲染',
                    link: '/nextjs-cn/pages/building-your-application/rendering/client-side-rendering',
                  },
                ],
              },
              {
                text: '数据获取',
                collapsed: true,
                link: '/nextjs-cn/pages/building-your-application/data-fetching/',
                items: [
                  {
                    text: 'getStaticProps',
                    link: '/nextjs-cn/pages/building-your-application/data-fetching/get-static-props',
                  },
                  {
                    text: 'getStaticPaths',
                    link: '/nextjs-cn/pages/building-your-application/data-fetching/get-static-paths',
                  },
                  {
                    text: 'getServerSideProps',
                    link: '/nextjs-cn/pages/building-your-application/data-fetching/get-server-side-props',
                  },
                  {
                    text: '表单和变更',
                    link: '/nextjs-cn/pages/building-your-application/data-fetching/forms-and-mutations',
                  },
                  {
                    text: '增量静态再生成',
                    link: '/nextjs-cn/pages/building-your-application/data-fetching/incremental-static-regeneration',
                  },
                  {
                    text: '客户端',
                    link: '/nextjs-cn/pages/building-your-application/data-fetching/client-side',
                  },
                ],
              },
              {
                text: '配置',
                collapsed: true,
                link: '/nextjs-cn/pages/building-your-application/configuring/',
                items: [
                  {
                    text: '错误处理',
                    link: '/nextjs-cn/pages/building-your-application/configuring/error-handling',
                  },
                ],
              },
            ],
          },
          {
            text: 'API 参考',
            collapsed: true,
            link: '/nextjs-cn/pages/api-reference/',
            items: [
              {
                text: '组件',
                collapsed: true,
                link: '/nextjs-cn/pages/api-reference/components/',
                items: [
                  { text: 'Font', link: '/nextjs-cn/pages/api-reference/components/font' },
                  { text: 'Form', link: '/nextjs-cn/pages/api-reference/components/form' },
                  { text: 'Head', link: '/nextjs-cn/pages/api-reference/components/head' },
                  {
                    text: 'Image',
                    link: '/nextjs-cn/pages/api-reference/components/image',
                  },
                  {
                    text: 'Image (Legacy)',
                    link: '/nextjs-cn/pages/api-reference/components/image-legacy',
                  },
                  { text: 'Link', link: '/nextjs-cn/pages/api-reference/components/link' },
                  {
                    text: 'Script',
                    link: '/nextjs-cn/pages/api-reference/components/script',
                  },
                ],
              },
              {
                text: '函数',
                collapsed: true,
                link: '/nextjs-cn/pages/api-reference/functions/',
                items: [
                  {
                    text: 'getInitialProps',
                    link: '/nextjs-cn/pages/api-reference/functions/get-initial-props',
                  },
                  {
                    text: 'getServerSideProps',
                    link: '/nextjs-cn/pages/api-reference/functions/get-server-side-props',
                  },
                  {
                    text: 'getStaticPaths',
                    link: '/nextjs-cn/pages/api-reference/functions/get-static-paths',
                  },
                  {
                    text: 'getStaticProps',
                    link: '/nextjs-cn/pages/api-reference/functions/get-static-props',
                  },
                  {
                    text: 'NextRequest',
                    link: '/nextjs-cn/pages/api-reference/functions/next-request',
                  },
                  {
                    text: 'NextResponse',
                    link: '/nextjs-cn/pages/api-reference/functions/next-response',
                  },
                  {
                    text: 'useAmp',
                    link: '/nextjs-cn/pages/api-reference/functions/use-amp',
                  },
                  {
                    text: 'useReportWebVitals',
                    link: '/nextjs-cn/pages/api-reference/functions/use-report-web-vitals',
                  },
                  {
                    text: 'useRouter',
                    link: '/nextjs-cn/pages/api-reference/functions/use-router',
                  },
                  {
                    text: 'userAgent',
                    link: '/nextjs-cn/pages/api-reference/functions/userAgent',
                  },
                ],
              },
              { text: 'Edge', link: '/nextjs-cn/pages/api-reference/edge' },
              { text: 'Turbopack', link: '/nextjs-cn/pages/api-reference/turbopack' },
            ],
          },
        ],
      },
      {
        text: '架构',
        collapsed: false,
        link: '/nextjs-cn/architecture/',
        items: [
          {
            text: '可访问性',
            link: '/nextjs-cn/architecture/accessibility',
          },
          {
            text: '快速刷新',
            link: '/nextjs-cn/architecture/fast-refresh',
          },
          {
            text: 'Next.js 编译器',
            link: '/nextjs-cn/architecture/nextjs-compiler',
          },
          {
            text: '支持的浏览器',
            link: '/nextjs-cn/architecture/supported-browsers',
          },
        ],
      },
      {
        text: '社区',
        collapsed: false,
        link: '/nextjs-cn/community/',
        items: [
          {
            text: '贡献指南',
            link: '/nextjs-cn/community/contribution-guide',
          },
        ],
      },
    ],
  },
]
