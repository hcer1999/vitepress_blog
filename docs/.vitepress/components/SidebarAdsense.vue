<!-- SidebarAdsense.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'

// 在组件挂载时插入广告
onMounted(() => {
  if (typeof window === 'undefined') return

  // 将广告容器添加到组件中
  const adWrapper = document.querySelector('.sidebar-ad-wrapper')
  if (adWrapper) {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }
})
</script>

<template>
  <div class="sidebar-ad-wrapper">
    <!-- 广告将在这里动态插入 -->
    <ins
      class="adsbygoogle sidebar-ad"
      style="display: block;"
      data-ad-client="ca-pub-6198632316720288"
      data-ad-slot="8524153934"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<style scoped>
.sidebar-ad-wrapper {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.sidebar-ad {
  width: 100%;
  min-height: 280px;
}

@media (max-width: 767px) {
  .sidebar-ad-wrapper {
    display: none; /* 在移动设备上隐藏侧边栏广告 */
  }
}
</style>
