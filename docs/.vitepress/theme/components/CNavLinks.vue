<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'

import CNavLink from './CNavLink.vue'
import type { NavLink } from '../types'

const props = defineProps<{
  title: string
  noIcon?: boolean
  items: NavLink[]
}>()

const formatTitle = computed(() => {
  return slugify(props.title)
})
</script>

<template>
  <h1 v-if="title" :id="formatTitle" tabindex="-1">
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
  </h1>
  <div class="m-nav-links">
    <CNavLink v-for="item in items" :noIcon="noIcon" v-bind="item" />
  </div>
</template>

<style lang="scss" scoped>
.m-nav-links {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(1, minmax(130px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);

}

// @each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
//   @media (min-width: $media) {
//     .m-nav-links {
//       grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
//     }
//   }
// }

.m-nav-link {
  min-height: 100px;
}

@media (min-width: 500px) {
  .m-nav-links {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
    --m-nav-gap: 20px;
  }
}
@media (min-width: 768px) {
  .m-nav-links {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    --m-nav-gap: 20px;
  }
}
@media (min-width: 960px) {
  .m-nav-links {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    --m-nav-gap: 20px;
  }
}
</style>
