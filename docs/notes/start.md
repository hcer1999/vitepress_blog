<script setup>
// import { NAV_DATA } from '../nav/data'
const list = [ {
  title: "个人在学习前端中的笔记",
  items: [
      {
        icon: '../public/icons/html.svg',
        title: 'HTML 笔记',
        link: '/notes/html',
        target: '_self'
      },
      {
        icon: '../public/icons/css.svg',
        title: 'CSS 笔记',
        link: '/notes/css',
        target: '_self'
      },
      {
        icon: '../public/icons/js.svg',
        title: 'JS 笔记',
        link: '/notes/javascript',
        target: '_self'
      },
      {
        icon: '../public/icons/js.svg',
        title: 'ES6 笔记',
        link: '/notes/es6',
        target: '_self'
      },
      {
        icon: '../public/icons/jquery.svg',
        title: 'jQuery 笔记',
        link: '/notes/jquery',
        target: '_self'
      },
      {
        icon: '../public/icons/sql.svg',
        title: '数据库 笔记',
        link: '/notes/sql',
        target: '_self'
      },
      {
        icon: '../public/icons/git.svg',
        title: 'Git工具 笔记',
        link: '/notes/git',
        target: '_self'
      },
      {
        icon: '../public/icons/webstorm.svg',
        title: 'WebStorm快捷键大全',
        link: '/notes/webstormkeys',
        target: '_self'
      },
  ]
}
]
</script>
<style src="../nav/index.scss"></style>

<CNavLinks v-for="{title, items} in list" :title="title" :items="items"/>

::: tip 声明

部分资料均由本人从各大平台收集而来，如有侵权，请联系本人删除

本人技术一般，如果有不对的地方，欢迎指出，谢谢^\_^

:::
