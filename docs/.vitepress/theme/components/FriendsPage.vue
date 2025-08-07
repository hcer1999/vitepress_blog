<template>
  <div class="friends-page">
    <!-- 页面头部 -->
    <header class="friends-header">
      <div class="header-content">
        <h1 class="page-title">友情链接</h1>
        <p class="page-subtitle">与优秀的朋友们一起成长，分享知识，共同进步</p>
        <div class="stats-info">
          <span class="stat-item">
            <i class="icon">🤝</i>
            <span>{{ friendsData.length }} 位朋友</span>
          </span>
          <span class="stat-item">
            <i class="icon">🌟</i>
            <span>互相学习</span>
          </span>
          <span class="stat-item">
            <i class="icon">💡</i>
            <span>共同成长</span>
          </span>
        </div>
      </div>
    </header>

    <!-- 友链申请说明 -->
    <section class="apply-section">
      <div class="apply-card">
        <h2 class="apply-title">
          <i class="title-icon">📝</i>
          申请友链
        </h2>
        <div class="apply-content">
          <div class="apply-requirements">
            <h3>申请要求</h3>
            <ul class="requirements-list">
              <li>✅ 网站内容积极向上，无违法违规内容</li>
              <li>✅ 网站能够正常访问，加载速度合理</li>
              <li>✅ 优先考虑技术类、学习类博客</li>
              <li>✅ 网站有一定的原创内容</li>
            </ul>
          </div>
          <div class="apply-info">
            <h3>本站信息</h3>
            <div class="site-info">
              <div class="info-item">
                <strong>网站名称：</strong>冰可乐的前端笔记
              </div>
              <div class="info-item">
                <strong>网站地址：</strong>https://nbclasssss.asia
              </div>
              <div class="info-item">
                <strong>网站描述：</strong>前端开发学习笔记，记录成长路上的点点滴滴
              </div>
              <div class="info-item">
                <strong>网站头像：</strong>https://nbclasssss.asia/logo.png
              </div>
            </div>
          </div>
        </div>
        <div class="apply-action">
          <p class="apply-text">
            如果您希望与本站交换友链，请通过以下方式联系我：
          </p>
          <div class="contact-buttons">
            <a href="mailto:bingkelele007@163.com" class="contact-btn email">
              <i class="btn-icon">📧</i>
              <span>邮箱联系</span>
            </a>
            <a href="https://github.com/hcer1999/vitepress_blog/issues" class="contact-btn github" target="_blank">
              <i class="btn-icon">🐙</i>
              <span>GitHub Issues</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 友链列表 -->
    <section class="friends-list">
      <h2 class="section-title">
        <i class="title-icon">👥</i>
        我的朋友们
      </h2>
      <div class="friends-grid">
        <div 
          v-for="friend in friendsData" 
          :key="friend.name"
          class="friend-card"
        >
          <a :href="friend.link" target="_blank" class="friend-link">
            <div class="friend-avatar">
              <img :src="friend.avatar" :alt="friend.name" @error="handleImageError" />
            </div>
            <div class="friend-info">
              <h3 class="friend-name">{{ friend.name }}</h3>
              <p class="friend-desc">{{ friend.desc }}</p>
              <div class="friend-tags" v-if="friend.tags">
                <span 
                  v-for="tag in friend.tags" 
                  :key="tag" 
                  class="friend-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="visit-icon">
              <i>🔗</i>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 页面底部 -->
    <footer class="friends-footer">
      <div class="footer-content">
        <p class="footer-text">
          感谢所有朋友们的支持与陪伴，让我们一起在技术的道路上越走越远！
        </p>
        <div class="footer-decoration">
          <span class="decoration-item">🌟</span>
          <span class="decoration-item">💫</span>
          <span class="decoration-item">✨</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 友链数据
const friendsData = ref([
  {
    name: '茂茂物语',
    desc: '知识是进步的阶梯，争取每天都有知识点更新',
    link: 'https://notes.fe-mm.com/',
    avatar: 'https://notes.fe-mm.com/logo.png',
    tags: ['源码阅读笔记', '前端常用知识', '前端框架','前端常用知识']
  },
  {
    name: '二丫讲梵',
    desc: '💻学习📝记录🔗分享',
    link: 'https://wiki.eryajf.net/',
    avatar: 'https://wiki.eryajf.net/img/logo.png',
    tags: ['运维', '生活分享', '编程']
  },
])

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/logo.png' // 使用默认头像
}
</script>

<style scoped lang="scss">
.friends-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

// 页面头部
.friends-header {
  padding: 120px 0 60px 0;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, 
    rgba(var(--vp-c-brand-rgb), 0.08) 0%, 
    rgba(var(--vp-c-brand-rgb), 0.04) 25%,
    transparent 50%,
    rgba(var(--vp-c-brand-rgb), 0.04) 75%,
    rgba(var(--vp-c-brand-rgb), 0.08) 100%
  );
  border-radius: 20px;
  margin-bottom: 48px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(var(--vp-c-brand-rgb), 0.06) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(var(--vp-c-brand-rgb), 0.04) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .header-content {
    position: relative;
    z-index: 1;
  }
  
  .page-title {
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--vp-c-text-1);
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: normal;
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
  
  .page-subtitle {
    font-size: 1.2rem;
    color: var(--vp-c-text-2);
    margin: 0 0 32px 0;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .stats-info {
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    color: var(--vp-c-text-2);
    
    .icon {
      font-size: 1.2rem;
    }
  }
}

// 申请友链区域
.apply-section {
  margin-bottom: 64px;
  
  .apply-card {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
    }
  }
  
  .apply-title {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin: 0 0 24px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    
    .title-icon {
      font-size: 1.4rem;
    }
  }
  
  .apply-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 32px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
  
  .apply-requirements,
  .apply-info {
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--vp-c-text-1);
      margin: 0 0 16px 0;
    }
  }
  
  .requirements-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 8px 0;
      color: var(--vp-c-text-2);
      line-height: 1.5;
    }
  }
  
  .site-info {
    .info-item {
      padding: 8px 0;
      color: var(--vp-c-text-2);
      line-height: 1.5;
      
      strong {
        color: var(--vp-c-text-1);
      }
    }
  }
  
  .apply-action {
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 24px;
    text-align: center;
    
    .apply-text {
      color: var(--vp-c-text-2);
      margin: 0 0 20px 0;
      line-height: 1.6;
    }
    
    .contact-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .contact-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      
      .btn-icon {
        font-size: 1.1rem;
      }
      
      &.email {
        background: var(--vp-c-brand);
        color: white;
        
        &:hover {
          background: var(--vp-c-brand-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.4);
        }
      }
      
      &.github {
        background: #24292e;
        color: white;
        
        &:hover {
          background: #1a1e22;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(36, 41, 46, 0.4);
        }
      }
    }
  }
}

// 友链列表
.friends-list {
  margin-bottom: 64px;
  
  .section-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin: 0 0 32px 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    
    .title-icon {
      font-size: 1.6rem;
    }
  }
  
  .friends-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
  }
  
  .friend-card {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border-color: var(--vp-c-brand-light);
      
      .visit-icon {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
  
  .friend-link {
    display: flex;
    padding: 20px;
    text-decoration: none;
    color: inherit;
    gap: 16px;
    align-items: flex-start;
    position: relative;
  }
  
  .friend-avatar {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    background: var(--vp-c-bg);
    border: 2px solid var(--vp-c-divider);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .friend-info {
    flex: 1;
    min-width: 0;
  }
  
  .friend-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin: 0 0 8px 0;
    line-height: 1.3;
  }
  
  .friend-desc {
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0 0 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .friend-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .friend-tag {
    display: inline-block;
    padding: 2px 8px;
    background: var(--vp-c-default-soft);
    color: var(--vp-c-text-3);
    font-size: 0.75rem;
    border-radius: 12px;
    border: 1px solid var(--vp-c-divider);
  }
  
  .visit-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    opacity: 0;
    transform: translateX(8px);
    transition: all 0.3s ease;
    font-size: 1.2rem;
    color: var(--vp-c-brand);
  }
}

// 页面底部
.friends-footer {
  text-align: center;
  padding: 48px 0;
  border-top: 1px solid var(--vp-c-divider);
  
  .footer-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .footer-text {
    font-size: 1.1rem;
    color: var(--vp-c-text-2);
    line-height: 1.6;
    margin: 0 0 24px 0;
  }
  
  .footer-decoration {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
  
  .decoration-item {
    font-size: 1.5rem;
    animation: twinkle 2s ease-in-out infinite;
    
    &:nth-child(2) {
      animation-delay: 0.5s;
    }
    
    &:nth-child(3) {
      animation-delay: 1s;
    }
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

// 响应式调整
@media (max-width: 768px) {
  .friends-page {
    padding: 0 16px;
  }
  
  .friends-header {
    padding: 100px 20px 40px 20px;
    margin-bottom: 32px;
  }
  
  .apply-section,
  .friends-list {
    margin-bottom: 48px;
  }
  
  .apply-card {
    padding: 24px;
  }
  
  .friends-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-info {
    gap: 20px;
  }
  
  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-btn {
    width: 200px;
    justify-content: center;
  }
}
</style>