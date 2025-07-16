import { h, watch, onMounted, nextTick } from 'vue'
import { useData, useRoute, EnhanceAppContext } from 'vitepress'
import mediumZoom from 'medium-zoom'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import DefaultTheme from 'vitepress/theme'

import MNavVisitor from './components/MNavVisitor.vue'
import MDocFooter from './components/MDocFooter.vue'
import MAsideSponsors from './components/MAsideSponsors.vue'
import MNavLinks from './components/MNavLinks.vue'
import CNavLinks from './components/CNavLinks.vue'
import CPagination from './components/CPagination.vue'
import CArticleFilter from './components/CArticleFilter.vue'
import CLayout from './components/CLayout.vue'
import AppOnly from './components/AppOnly.vue'
import PagesOnly from './components/PagesOnly.vue'
import BlogHome from './components/BlogHome.vue'
import './styles/index.scss'
import './styles/vars.scss'
import AutoAdInserter from '../components/AutoAdInserter.vue'
import SidebarAdsense from '../components/SidebarAdsense.vue'

if (typeof window !== 'undefined') {
  /* 注销 PWA 服务 */
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
  }

  /* 删除浏览器中的缓存 */
  if ('caches' in window) {
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          return caches.delete(key)
        }),
      )
    })
  }
}

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData()
    const route = useRoute()

    // giscus配置
    giscusTalk(
      {
        repo: 'hcer1999/vitepress_blog', //仓库
        repoId: 'R_kgDOKApalg', //仓库ID
        category: 'Announcements', // 讨论分类
        categoryId: 'DIC_kwDOKApals4CfWNu', //讨论分类ID
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN',
      },
      {
        frontmatter,
        route,
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用"comment:true"序言在页面上单独启用它
      true,
    )

    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
  },
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(CLayout, props, {
      /**
       * 相关插槽
       * https://vitepress.dev/guide/extending-default-theme#layout-slots
       * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
       */
      'nav-bar-title-after': () => h(MNavVisitor),
      'doc-after': () => h(MDocFooter),
      'aside-bottom': () => [h(MAsideSponsors), h(SidebarAdsense)],
      'layout-bottom': () => h(AutoAdInserter),
    })
  },
  async enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('MNavLinks', MNavLinks)
    app.component('CNavLinks', CNavLinks)
    app.component('CPagination', CPagination)
    app.component('CArticleFilter', CArticleFilter)
    app.component('AppOnly', AppOnly)
    app.component('PagesOnly', PagesOnly)
    app.component('BlogHome', BlogHome)

    app.provide('DEV', process.env.NODE_ENV === 'development')

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }

    // 注册组件
    app.component('GoogleAdsense', () => import('../components/GoogleAdsense.vue'))
    app.component('AutoAdInserter', AutoAdInserter)
    app.component('SidebarAdsense', SidebarAdsense)

    // if (!import.meta.env.SSR) {
    //   const { loadOml2d } = await import('oh-my-live2d')
    //   loadOml2d({
    //     models: [
    //       {
    //         path: 'https://note.bingkele.cc/models/Kar98k-normal/model.json',
    //         position: [0, 60],
    //         scale: 0.08,
    //         stageStyle: {
    //           height: 450,
    //         },
    //       },
    //       {
    //         path: 'https://note.bingkele.cc/models/HK416-1-normal/model.json',
    //         position: [0, 60],
    //         scale: 0.08,
    //         stageStyle: {
    //           height: 450,
    //         },
    //       },
    //       {
    //         path: 'https://note.bingkele.cc/models/HK416-2-destroy/model.json',
    //         position: [0, 60],
    //         scale: 0.08,
    //         stageStyle: {
    //           height: 450,
    //         },
    //       },
    //       {
    //         path: 'https://note.bingkele.cc/models/HK416-2-normal/model.json',
    //         position: [0, 60],
    //         scale: 0.08,
    //         stageStyle: {
    //           height: 450,
    //         },
    //       },
    //     ],
    //   })
    // }
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome')
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox')
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari')
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
