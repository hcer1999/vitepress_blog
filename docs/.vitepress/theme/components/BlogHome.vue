<template>
  <div class="blog-home">
    <!-- 博客头部 -->
    <header class="blog-header">
      <div class="header-content">
        <div class="avatar-section">
          <img src="/logo.png" alt="冰可乐" class="avatar" />
        </div>
        <div class="intro-section">
          <h1 class="blog-title">冰可乐的前端笔记</h1>
          <p class="blog-tagline">一起变强大！记录前端学习路上的点点滴滴</p>
          <div class="blog-stats">
            <span class="stat-item">
              <i class="icon">📝</i>
              <span>{{ articleCount }} 篇文章</span>
            </span>
            <span class="stat-item">
              <i class="icon">🏷️</i>
              <span>前端开发</span>
            </span>
            <span class="stat-item">
              <i class="icon">⏰</i>
              <span>持续更新中</span>
            </span>
          </div>
          <div class="hero-actions">
            <a href="/content" class="action-button primary">
              <span class="button-icon">📖</span>
              <span>文章分享</span>
            </a>
            <a href="/interview/start" class="action-button secondary">
              <span class="button-icon">💯</span>
              <span>刷面试题</span>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- 快速导航 -->
    <section class="quick-nav">
      <div class="nav-container">
        <h2 class="section-title">快速导航</h2>
        <div class="nav-grid">
          <a href="/fe/javascript/types" class="nav-card">
            <div class="nav-icon">📖</div>
            <h3>前端物语</h3>
            <p>前端常用知识点整理</p>
          </a>
          <a href="/analysis/utils/only-allow" class="nav-card">
            <div class="nav-icon">📘</div>
            <h3>源码阅读</h3>
            <p>了解各种库的实现原理</p>
          </a>
          <a href="/workflow/utils/library" class="nav-card">
            <div class="nav-icon">💡</div>
            <h3>开发工具</h3>
            <p>提升开发效率的工具集合</p>
          </a>
          <a href="/efficiency/online-tools" class="nav-card">
            <div class="nav-icon">🧰</div>
            <h3>提效工具</h3>
            <p>开发和日常使用的软件推荐</p>
          </a>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="latest-articles">
      <div class="articles-container">
        <div class="section-header">
          <h2 class="section-title">最新文章</h2>
          <a href="/content" class="view-all">查看全部 →</a>
        </div>
        <div class="articles-grid">
          <article v-for="article in latestArticles" :key="article.link" class="article-card">
            <a :href="article.link" class="article-link">
              <div class="article-icon" v-if="article.icon">
                <img :src="article.icon" :alt="article.title" />
              </div>
              <div class="article-content">
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-desc" v-if="article.desc">{{ article.desc }}</p>
                <div class="article-meta">
                  <span class="article-date">{{ article.badge?.text }}</span>
                </div>
              </div>
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- 分类标签 -->
    <section class="categories">
      <div class="categories-container">
        <h2 class="section-title">内容分类</h2>
        <div class="categories-grid">
          <div class="category-item">
            <h3>🎯 基础知识</h3>
            <div class="category-links">
              <a href="/fe/javascript/types">JavaScript</a>
              <a href="/fe/css/">CSS</a>
              <a href="/fe/html/">HTML</a>
              <a href="/fe/typescript/base">TypeScript</a>
            </div>
          </div>
          <div class="category-item">
            <h3>🛠️ 开发工具</h3>
            <div class="category-links">
              <a href="/workflow/git/">Git</a>
              <a href="/workflow/node/npm">npm</a>
              <a href="/workflow/terminal/zsh">终端工具</a>
              <a href="/workflow/css/tricks">CSS技巧</a>
            </div>
          </div>
          <div class="category-item">
            <h3>📚 文档翻译</h3>
            <div class="category-links">
              <a href="/nextjs-cn/">Next.js</a>
              <a href="/gsap/start">GSAP</a>
              <a href="/html2canvas/start">html2canvas</a>
              <a href="/hammerjs/start">Hammer.js</a>
            </div>
          </div>
          <div class="category-item">
            <h3>🐛 踩坑记录</h3>
            <div class="category-links">
              <a href="/pit/npm">npm踩坑</a>
              <a href="/pit/pc">PC端问题</a>
              <a href="/pit/h5">H5问题</a>
              <a href="/pit/wx">小程序问题</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import data from '../../../content/data'

// 获取文章数据
const articlesData = data[0]?.items || []

// 计算文章总数
const articleCount = computed(() => articlesData.length)

// 获取最新的6篇文章
const latestArticles = computed(() => {
  return articlesData.slice(0, 6)
})
</script>

<style scoped lang="scss">
.blog-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

// 博客头部
.blog-header {
  padding: 160px 0 60px 0;
  text-align: center;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(var(--vp-c-brand-rgb), 0.1) 0%,
    rgba(var(--vp-c-brand-rgb), 0.05) 25%,
    transparent 50%,
    rgba(var(--vp-c-brand-rgb), 0.05) 75%,
    rgba(var(--vp-c-brand-rgb), 0.1) 100%
  );
  border-radius: 20px;
  margin-bottom: 48px;
  overflow: hidden;

  // 添加装饰性背景图案
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
        circle at 20% 20%,
        rgba(var(--vp-c-brand-rgb), 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(circle at 80% 80%, rgba(var(--vp-c-brand-rgb), 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 70%, rgba(var(--vp-c-brand-rgb), 0.06) 0%, transparent 50%);
    pointer-events: none;
  }

  // 添加顶部装饰线条
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, transparent 0%, var(--vp-c-brand) 50%, transparent 100%);
    border-radius: 2px;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    @media (min-width: 768px) {
      flex-direction: row;
      text-align: left;
      justify-content: center;
      gap: 48px;
    }
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid var(--vp-c-brand);
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(360deg);
    }
  }

  .blog-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--vp-c-text-1);
    margin: 0 0 12px 0;
    line-height: normal;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .blog-tagline {
    font-size: 1.1rem;
    color: var(--vp-c-text-2);
    margin: 0 0 24px 0;
    line-height: 1.6;
  }

  .blog-stats {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--vp-c-text-2);

    .icon {
      font-size: 1.1rem;
    }
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }

  .action-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    .button-icon {
      font-size: 1.2rem;
    }

    &.primary {
      background: var(--vp-c-brand);
      color: white;

      &:hover {
        background: var(--vp-c-brand-dark);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.4);
      }
    }

    &.secondary {
      background: transparent;
      color: var(--vp-c-brand);
      border-color: var(--vp-c-brand);

      &:hover {
        background: var(--vp-c-brand);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
      }
    }
  }
}

// 通用样式
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 32px 0;
  text-align: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  .section-title {
    margin: 0;
    text-align: left;
  }

  .view-all {
    color: var(--vp-c-brand);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--vp-c-brand-dark);
    }
  }
}

// 快速导航
.quick-nav {
  margin-bottom: 64px;

  .nav-container {
    max-width: 100%;
  }

  .nav-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }

  .nav-card {
    display: block;
    padding: 32px 24px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border-color: var(--vp-c-brand);
    }

    .nav-icon {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--vp-c-text-1);
      margin: 0 0 8px 0;
    }

    p {
      color: var(--vp-c-text-2);
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

// 最新文章
.latest-articles {
  margin-bottom: 64px;

  .articles-container {
    max-width: 100%;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }

  .article-card {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-color: var(--vp-c-brand-light);
    }
  }

  .article-link {
    display: flex;
    padding: 20px;
    text-decoration: none;
    color: inherit;
    gap: 16px;
  }

  .article-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
  }

  .article-content {
    flex: 1;
    min-width: 0;
  }

  .article-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin: 0 0 8px 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-desc {
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0 0 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .article-date {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
    background: var(--vp-c-default-soft);
    padding: 2px 8px;
    border-radius: 4px;
  }
}

// 分类标签
.categories {
  margin-bottom: 64px;

  .categories-container {
    max-width: 100%;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
  }

  .category-item {
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--vp-c-text-1);
      margin: 0 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--vp-c-brand);
    }

    .category-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      a {
        display: inline-block;
        padding: 6px 12px;
        background: var(--vp-c-bg-soft);
        color: var(--vp-c-text-2);
        text-decoration: none;
        border-radius: 16px;
        font-size: 0.9rem;
        border: 1px solid var(--vp-c-divider);
        transition: all 0.3s ease;

        &:hover {
          background: var(--vp-c-brand);
          color: white;
          border-color: var(--vp-c-brand);
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .blog-home {
    padding: 0 16px;
  }

  .blog-header {
    padding: 140px 20px 40px 20px;
    margin-bottom: 32px;
  }

  .quick-nav,
  .latest-articles,
  .categories {
    margin-bottom: 48px;
  }

  .nav-grid,
  .articles-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
