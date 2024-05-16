<script setup>
const list = [ {
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
