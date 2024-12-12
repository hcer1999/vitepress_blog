<script setup lang="ts">
// import { VPDocAsideSponsors } from 'vitepress/theme'

const data = [
  {
    items: [{ img: '../../../assets/up.png' }],
  },
]

const onClick = (index: number) => {
  if (index === 0) {
    // 页面滚动到最顶部
    document.body.scrollIntoView({ block: 'start', behavior: 'smooth' })
  } else {
    // 页面滚动到最底部
    document.body.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
}

// 当页面滚动距离小于30px 不显示
window.addEventListener('scroll', () => {
  if (window.scrollY < 30) {
    document.querySelector('.VPDocAsideSponsors')?.classList.add('hidden')
  } else {
    document.querySelector('.VPDocAsideSponsors')?.classList.remove('hidden')
  }
})
</script>

<template>
  <div class="VPDocAsideSponsors hidden">
    <div class="VPSponsors vp-sponsor aside">
      <section
        class="vp-sponsor-section"
        v-for="(item, index) in data"
        :key="index"
        @click="onClick(index)"
      >
        <div class="VPSponsorsGrid vp-sponsor-grid medium" data-vp-grid="1">
          <div class="vp-sponsor-grid-item">
            <a class="vp-sponsor-grid-link" target="_blank" rel="sponsored noopener">
              <article class="vp-sponsor-grid-box">
                <h4 class="visually-hidden"></h4>
                <img class="vp-sponsor-grid-image" :src="item.items[0].img" />
              </article>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- <VPDocAsideSponsors :data="data" @click="onClick" /> -->
</template>

<style lang="scss" scoped>
.vp-sponsor-grid.medium .vp-sponsor-grid-image {
  max-height: 90px;
}
.vp-sponsor-grid-link {
  cursor: pointer;
}
.vp-sponsor-grid-link:hover {
  transition: all 0.6s ease-in-out;
  transform: scale(1.2);
}

.VPDocAsideSponsors {
  opacity: 1;
  transition: all 0.6s ease-in-out;
}
.VPDocAsideSponsors.hidden {
  // display: none;
  opacity: 0;
}



</style>
