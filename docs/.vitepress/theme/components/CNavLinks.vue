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
  <div class="cnav-container">
    <h1 v-if="title" :id="formatTitle" tabindex="-1" class="cnav-title">
      {{ title }}
      <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h1>
    <div class="cnav-links">
      <CNavLink 
        v-for="(item, index) in items" 
        :key="index"
        :noIcon="noIcon" 
        v-bind="item"
        :style="{ animationDelay: `${index * 0.05}s` }"
        class="cnav-link-item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cnav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
}

.cnav-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
  position: relative;
  padding-bottom: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
    border-radius: 2px;
  }
}

.cnav-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
}

/* 兼容旧的类名 */
:global(.m-nav-links) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
}

.cnav-link-item {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  width: 100%;
  height: 100%;
  min-height: 170px;
  overflow: hidden;
}

// 响应式调整
@media (max-width: 996px) {
  .cnav-links,
  :global(.m-nav-links) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .cnav-container {
    padding: 1rem 0.75rem;
  }
  
  .cnav-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
  }
  
  .cnav-links,
  :global(.m-nav-links) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .cnav-link-item {
    min-height: 150px;
  }
}

@media (max-width: 640px) {
  .cnav-links,
  :global(.m-nav-links) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .cnav-container {
    padding: 0.75rem 0.5rem;
  }

  .cnav-title {
    font-size: 1.6rem;
    margin-bottom: 1.25rem;
  }
  
  .cnav-links,
  :global(.m-nav-links) {
    grid-template-columns: 1fr;
  }
  
  .cnav-link-item {
    min-height: 130px;
  }
}
</style>
