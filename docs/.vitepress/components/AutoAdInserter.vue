<!-- AutoAdInserter.vue -->
<script setup lang="ts">
import { onMounted, ref, watch, h } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const adInserted = ref(false)
const insertAd = () => {
  if (typeof window === 'undefined') return
  
  const clientId = 'ca-pub-6198632316720288'
  const slotId = '5374627864'
  // 重置状态
  adInserted.value = false
  
  // 使用 requestAnimationFrame 确保 DOM 已更新
  requestAnimationFrame(() => {
    const h1Elements = document.querySelectorAll('.vp-doc h1')
    if (h1Elements.length > 0) {
      // 获取第一个 h1 元素
      const firstH1 = h1Elements[0]
      
      // 检查是否已经存在广告容器
      const existingAd = firstH1.parentNode?.querySelector('.ad-container')
      if (existingAd) {
        return
      }
      
      // 创建广告容器
      const adContainer = document.createElement('ins')
      adContainer.className = 'ad-container'
      adContainer.style.display = 'block'
      adContainer.style.width = '100%'
      adContainer.style.height = '300px'
      adContainer.classList.add('adsbygoogle')
      adContainer.setAttribute('data-ad-client', clientId)
      adContainer.setAttribute('data-ad-slot', slotId)
      adContainer.setAttribute('data-ad-format', 'auto')
      adContainer.setAttribute('data-full-width-responsive', 'true')

      // 在 h1 后插入广告
      if (firstH1.nextSibling) {
        firstH1.parentNode?.insertBefore(adContainer, firstH1.nextSibling)
      } else {
        firstH1.parentNode?.appendChild(adContainer)
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({})
      
      adInserted.value = true
    }
  })
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    insertAd()
  }
)

onMounted(() => {
  // 初始插入
  insertAd()
  // 使用 MutationObserver 监听 DOM 变化
  const observer = new MutationObserver(() => {
    if (!adInserted.value) {
      insertAd()
    }
  })

  // 开始观察文档变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
})
</script>

<template>
  
</template>

<style scoped>
.ad-container {
  margin: 1.5rem 0;
  padding: 1rem 0;
  width: 100%;
  height: 300px;
  text-align: center;
  background-color: transparent;
}
</style> 