<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
const { Layout } = DefaultTheme
const { isDark, theme, frontmatter } = useData()

import MNavVisitor from './MNavVisitor.vue'
import MDocFooter from './MDocFooter.vue'
import MAsideSponsors from './MAsideSponsors.vue'
import AutoAdInserter from '../../components/AutoAdInserter.vue'

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches
provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]
  // @ts-ignore
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <Layout v-bind="$attrs">
    <!--
      相关插槽
      https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
      https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
    -->
    <template #nav-bar-title-after>
      <MNavVisitor />
    </template>
    <template #aside-top>
      <SidebarAdsense />
    </template>

    <template #doc-after>
      <MDocFooter />
    </template>
    <template #aside-bottom>
      <MAsideSponsors />
    </template>
    <template #layout-bottom>
      <AutoAdInserter />
    </template>
  </Layout>
</template>
