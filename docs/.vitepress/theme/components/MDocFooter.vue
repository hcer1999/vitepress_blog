<script setup lang="ts">
import { inject, Ref, computed } from 'vue'
import { useRoute } from 'vitepress'

const DEV = inject('DEV') as Ref<boolean>
const route = useRoute()

const pageId = computed(() => route.path.replace('/content/', ''))

const contacts = [
  {
    name: 'WeChat',
    qrCode: 'https://cdn.bingkele.cc/Wechatqrcode.png', // 替换为微信二维码图片路径
  },
  {
    name: 'QQ',
    qrCode: 'https://cdn.bingkele.cc/QQqrcode.png', // 替换为 QQ 二维码图片路径
  },
];
</script>

<template>
  <div class="copyright">
    <img
      v-if="!DEV"
      class="visitor"
      :src="`https://visitor-badge.laobi.icu/badge?page_id=hcer1999.notes.${pageId}`"
      title="当前页面累计访问数"
      onerror="this.style.display='none'"
    />
  </div>
  <p class="contact-title">🎉有任何问题，欢迎联系我</p>
  <div class="contact-container">
    <div class="qr-item" v-for="contact in contacts" :key="contact.name">
      <img :src="contact.qrCode" :alt="`${contact.name} QR Code`" class="qr-image" />
      <div class="qr-label">{{ contact.name }}</div>
    </div>
  </div>
</template>

<style scoped>

.contact-title{
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text);
  margin-top: 16px;
}

.contact-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.qr-item:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.qr-image {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  border: 2px solid var(--vp-c-gutter);
  margin-bottom: 8px;
}

.qr-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text);
}

@media (max-width: 600px) {
  .contact-container {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .qr-item {
    width: 140px;
  }

  .qr-image {
    width: 100px;
    height: 100px;
  }
}


.copyright {
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.visitor {
  margin-right: 8px;
}

@media (max-width: 414px) {
  .visitor {
    display: none;
  }
}
</style>
