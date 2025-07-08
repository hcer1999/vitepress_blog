<!-- SidebarAdsense.vue -->
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

// 加载广告的函数
const loadAd = () => {
  if (typeof window === 'undefined') return

  // 清除现有广告
  const existingAd = document.querySelector('.sidebar-ad-wrapper ins.adsbygoogle')
  if (existingAd) {
    existingAd.remove()
  }

  // 创建新的广告元素
  const adContainer = document.createElement('ins')
  adContainer.className = 'adsbygoogle sidebar-ad'
  adContainer.style.display = 'block'
  adContainer.setAttribute('data-ad-client', 'ca-pub-6198632316720288')
  adContainer.setAttribute('data-ad-slot', '8524153934')
  adContainer.setAttribute('data-ad-format', 'auto')
  adContainer.setAttribute('data-full-width-responsive', 'true')

  // 将广告容器添加到组件中
  const adWrapper = document.querySelector('.sidebar-ad-wrapper')
  if (adWrapper) {
    adWrapper.appendChild(adContainer)
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    loadAd()
  }
)

// 组件挂载时加载广告
onMounted(() => {
  if (window.innerWidth > 767) {
    loadAd()
  }
})
</script>

<template>
  <div class="sidebar-ad-wrapper">
    <!-- 广告将由 JavaScript 动态插入 -->
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
