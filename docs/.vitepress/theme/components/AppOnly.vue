<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()

const isAppRoute = computed(() => {
  return route.path.includes('/nextjs-cn/01-app/')
})
</script>

<template>
  <div v-if="isAppRoute">
    <slot />
  </div>
</template> 