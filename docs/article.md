---
title: 文章列表
editLink: false
layout: home
outline: [0]
---

<script setup>
import { ref, computed, watch } from 'vue'
import data from './content/data'
import CPagination from './.vitepress/theme/components/CPagination.vue'
import CArticleFilter from './.vitepress/theme/components/CArticleFilter.vue'

// 分页相关配置
const currentPage = ref(1)
const pageSize = 9 // 每页显示9篇文章

// 获取所有文章
const allArticles = data[0].items

// 筛选后的文章
const filteredArticles = ref([])

// 筛选结果处理
const handleFilterChanged = (articles) => {
  filteredArticles.value = articles
  // 当筛选条件变更时重置为第一页
  currentPage.value = 1
}

const totalItems = computed(() => filteredArticles.value.length)

// 计算当前页的文章
const currentPageArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredArticles.value.length)
  return filteredArticles.value.slice(startIndex, endIndex)
})

// 构建当前页面的数据
const currentPageData = computed(() => {
  return [{
    title: `${data[0].title}`,
    items: currentPageArticles.value
  }]
})

// 页码变更时的处理函数
const handlePageChange = (newPage) => {
  currentPage.value = newPage
  // 滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 重置筛选条件
const resetFilters = () => {
  if (articleFilter.value) {
    articleFilter.value.clearFilters()
  }
}

// 访问筛选组件的引用
const articleFilter = ref(null)
</script>

<style src="./nav/index.scss"></style>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }   
  to {
    opacity: 1;
  }
}
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-page {
  padding: 2rem 0;
  max-width: 100vw;
  overflow-x: hidden;
  animation: fadeIn 0.8s ease-out forwards;
  box-sizing: border-box;
  background-color: var(--vp-c-bg);
}

.article-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
  animation: slideInUp 0.8s ease-out forwards;
}

.article-title {
  font-size: 2.5rem;
  background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.article-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(to right, var(--vp-c-brand-light), var(--vp-c-brand));
  border-radius: 2px;
}

.article-subtitle {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 2rem auto 0;
  line-height: 1.6;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--vp-c-text-2);
  animation: fadeIn 0.5s ease-out forwards;
  margin: 2rem auto;
  max-width: 1200px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.empty-state-icon {
  font-size: 48px;
  margin-bottom: 1.5rem;
  display: inline-flex;
  width: 80px;
  height: 80px;
  background-color: var(--vp-c-bg);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.empty-state-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.empty-state-desc {
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.reset-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  margin-top: 1rem;
  box-shadow: 0 4px 10px rgba(var(--vp-c-brand-rgb), 0.3);
}

.reset-button:hover {
  background-color: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(var(--vp-c-brand-rgb), 0.4);
}

.reset-button:active {
  transform: translateY(0);
}

.article-list-container {
  padding: 0 1rem;
}

.pagination-wrapper {
  margin-top: 2rem;
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  .article-header {
    margin-bottom: 2rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-subtitle {
    font-size: 1rem;
    margin-top: 1.5rem;
  }
  
  .article-title::after {
    width: 80px;
  }
  
  .empty-state {
    padding: 3rem 1rem;
    margin: 1.5rem 0.75rem;
  }
  
  .empty-state-icon {
    font-size: 40px;
    width: 70px;
    height: 70px;
  }
  
  .empty-state-title {
    font-size: 1.3rem;
  }
  
  .empty-state-desc {
    font-size: 0.9rem;
  }
  
  .reset-button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  
  .pagination-wrapper {
    margin-top: 1.5rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 480px) {
  .article-title {
    font-size: 1.8rem;
  }
  
  .article-subtitle {
    font-size: 0.9rem;
    margin-top: 1.5rem;
  }
  
  .article-title::after {
    width: 60px;
    height: 3px;
  }
  
  .empty-state {
    padding: 2.5rem 1rem;
  }
  
  .empty-state-icon {
    font-size: 36px;
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  
  .empty-state-title {
    font-size: 1.2rem;
  }
  
  .article-list-container {
    padding: 0 0.5rem;
  }
}
</style>

<div class="article-page">
  <div class="article-header">
    <h1 class="article-title">精选文章</h1>
    <p class="article-subtitle">探索前端开发的精彩世界，从这里开始您的技术之旅</p>
  </div>
  
  <!-- 使用筛选组件 -->
  <CArticleFilter 
    :all-articles="allArticles"
    @filter-changed="handleFilterChanged"
    ref="articleFilter"
  />
  
  <!-- 文章列表 -->
  <div class="article-list-container">
    <template v-if="totalItems > 0">
      <CNavLinks 
        v-for="item in currentPageData" 
        :key="item.title" 
        :items="item.items"
      />
      <!-- 分页组件 -->
      <div class="pagination-wrapper">
        <CPagination 
          :current-page="currentPage" 
          :total-items="totalItems" 
          :page-size="pageSize"
          :max-page-buttons="5"
          @update:current-page="handlePageChange"
        />
      </div>
    </template>
    <!-- 无搜索结果时显示的内容 -->
    <div v-else class="empty-state">
      <div class="empty-state-icon">🔍</div>
      <h3 class="empty-state-title">未找到匹配的文章</h3>
      <p class="empty-state-desc">尝试更改搜索关键词或重置筛选条件，以便找到您感兴趣的内容</p>
      <button class="reset-button" @click="resetFilters">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
          <path d="M16 21h5v-5"></path>
        </svg>
        重置筛选条件
      </button>
    </div>
  </div>
</div>
