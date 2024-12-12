---
description: 致力于为前端开发工程师提供最简单便捷的网址导航服务
layoutClass: m-nav-layout
outline: [2, 3, 4]
editLink: false
---

<script setup>
import { NAV_DATA } from './nav/data'
</script>
<style src="./nav/index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
