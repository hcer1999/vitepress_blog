<script setup lang="ts">
import { VPDocAsideSponsors } from 'vitepress/theme'

const data = [
  {
    items: [{ img: 'http://cdn.bingkele.cc/Wechatqrcode.png' }],
  },
  {
    items: [{ img: 'http://cdn.bingkele.cc/QQqrcode.png' }],
  },
]
</script>

<template>
  <VPDocAsideSponsors :data="data" />
</template>

<style>
.vp-sponsor-grid.medium .vp-sponsor-grid-image {
  max-height: 90px;
}

.vp-sponsor-grid-link:hover {
  transition: all 0.6s ease-in-out;
  transform: scale(1.2);
}
</style>
