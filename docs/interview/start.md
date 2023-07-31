<script setup>
import { NAV_DATA } from '../nav/data'
const list = [ {
  title: "前端面试题",
  items: [
      {
        icon: '../icons/html.svg',
        title: 'HTML 篇',
        link: './html',
        target: '_self'
      },
      {
        icon: '../icons/css.svg',
        title: 'CSS 篇',
        link: './css',
        target: '_self'

      },
      {
        icon: '../icons/js.svg',
        title: 'JS 篇',
        link: './javascript',
        target: '_self'
      },
      {
        icon: '../icons/vue.svg',
        title: 'Vue 篇',
        link: './vue',
        target: '_self'
      },
      {
        icon: '../icons/chrome.svg',
        title: 'DOM 篇',
        link: './dom',
        target: '_self'
      },
      {
        icon: '../icons/http.svg',
        title: 'HTTP 篇',
        link: './http',
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
