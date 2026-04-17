<script setup>
const list = [ 
{
  title: "新题库",
  items: [
      {
        icon: '../icons/js.svg',
        title: 'JavaScript 篇',
        desc: '323题',
        link: '/interview/new/javascript/',
        target: '_self'
      },
      {
        icon: '../icons/css.svg',
        title: 'CSS 篇',
        desc: '61题',
        link: '/interview/new/css/',
        target: '_self'
      },
      {
        icon: '../icons/html.svg',
        title: 'HTML 篇',
        desc: '57题',
        link: '/interview/new/html/',
        target: '_self'
      },
      {
        icon: '../icons/js.svg',
        title: 'React 篇',
        desc: '83题',
        link: '/interview/new/react/',
        target: '_self'
      },
      {
        icon: '../icons/vue.svg',
        title: 'Vue 篇',
        desc: '80题',
        link: '/interview/new/vue/',
        target: '_self'
      },
      {
        icon: '../icons/js.svg',
        title: '算法篇',
        desc: '19题',
        link: '/interview/new/algorithm/',
        target: '_self'
      },
      {
        icon: '../icons/http.svg',
        title: '计算机网络篇',
        desc: '71题',
        link: '/interview/new/network/',
        target: '_self'
      },
      {
        icon: '../icons/nodejs.svg',
        title: 'Node.js 篇',
        desc: '27题',
        link: '/interview/new/nodejs/',
        target: '_self'
      },
      {
        icon: '../icons/ts.svg',
        title: 'TypeScript 篇',
        desc: '46题',
        link: '/interview/new/typescript/',
        target: '_self'
      },
      {
        icon: '../icons/chrome.svg',
        title: '性能优化篇',
        desc: '25题',
        link: '/interview/new/performance/',
        target: '_self'
      },
      {
        icon: '../icons/chrome.svg',
        title: '前端安全篇',
        desc: '21题',
        link: '/interview/new/security/',
        target: '_self'
      },
      {
        icon: '../icons/taro.svg',
        title: '小程序篇',
        desc: '9题',
        link: '/interview/new/miniprogram',
        target: '_self'
      },
      {
        icon: '../icons/es6.svg',
        title: 'ES6 篇',
        desc: '32题',
        link: '/interview/new/es6/',
        target: '_self'
      },
      {
        icon: '../icons/js.svg',
        title: '编程题',
        desc: '50题',
        link: '/interview/new/coding/',
        target: '_self'
      },
      {
        icon: '../icons/js.svg',
        title: '设计模式篇',
        desc: '7题',
        link: '/interview/new/design-pattern/',
        target: '_self'
      },
      {
        icon: '../icons/webpack.svg',
        title: '工程化篇',
        desc: '34题',
        link: '/interview/new/engineering/',
        target: '_self'
      },
  ]
}
,
{
  title: "前端面试题",
  items: [
      {
        icon: '../icons/html.svg',
        title: 'HTML 篇',
        link: '/interview/html',
        target: '_self'
      },
      {
        icon: '../icons/css.svg',
        title: 'CSS 篇',
        link: '/interview/css',
        target: '_self'

      },
      {
        icon: '../icons/js.svg',
        title: 'JS 篇',
        link: '/interview/javascript',
        target: '_self'
      },
      {
        icon: '../icons/vue.svg',
        title: 'Vue 篇',
        link: '/interview/vue',
        target: '_self'
      },
      {
        icon: '../icons/chrome.svg',
        title: 'DOM 篇',
        link: '/interview/dom',
        target: '_self'
      },
      {
        icon: '../icons/http.svg',
        title: 'HTTP 篇',
        link: '/interview/http',
        target: '_self'
      },
      {
        icon: '../icons/bytedance.svg',
        title: '大厂面试题',
        link: '/interview/big-business',
        target: '_self'
      },
  ]
}
]
</script>

<style src="../nav/index.scss"></style>

<CNavLinks v-for="{title, items} in list" :title="title" :items="items"/>

::: tip 声明

这些资料均由本人从各大平台收集而来，如有侵权，请联系本人删除

本人技术一般，如果有不对的地方，欢迎指出，谢谢^\_^

:::
