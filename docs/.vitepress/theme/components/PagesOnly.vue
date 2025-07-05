<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()

const isPagesRoute = computed(() => {
  return route.path.includes('/nextjs-cn/02-pages/')
})
</script>

<template>
  <div v-if="isPagesRoute">
    <slot />
  </div>
</template> 