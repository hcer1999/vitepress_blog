<!-- GoogleAdsense.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

// 添加 adsbygoogle 的类型声明
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

const props = defineProps({
  adClient: {
    type: String,
    required: true,
    default: 'ca-pub-6198632316720288', // 替换为你的发布商 ID
  },
  adSlot: {
    type: String,
    required: true,
    default: '5374627864', // 替换为你的广告位 ID
  },
  adFormat: {
    type: String,
    default: 'auto',
  },
  adStyle: {
    type: String,
    default: 'display:block',
  },
})

let isScriptLoaded = false

onMounted(() => {
  // 如果 AdSense 脚本还没有加载，加载它
  if (typeof window !== 'undefined' && !isScriptLoaded) {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    script.setAttribute('data-ad-client', props.adClient)
    document.head.appendChild(script)
    isScriptLoaded = true
    console.log('isScriptLoaded', isScriptLoaded)
    // 插入广告
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }
})

onBeforeUnmount(() => {
  // 清理工作（如果需要）
})
</script>

<template>
  <ins
    class="adsbygoogle"
    :style="adStyle"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    data-full-width-responsive="true"
  ></ins>
</template>

<style scoped>
.ad-container {
  margin: 1rem 0;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
</style>
