<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  allArticles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filter-changed'])

// 筛选相关
const searchQuery = ref('')
const selectedYear = ref('全部')
const selectedTag = ref('全部')
const isFilterExpanded = ref(false)

// 提取年份列表
const getYearFromBadge = (badge) => {
  if (!badge || !badge.text) return null
  const match = badge.text.match(/(\d{4})/)
  return match ? match[1] : null
}

// 从文章中提取所有年份
const years = computed(() => {
  const yearsSet = new Set(['全部'])
  props.allArticles.forEach(article => {
    const year = getYearFromBadge(article.badge)
    if (year) yearsSet.add(year)
  })
  return Array.from(yearsSet).sort((a, b) => {
    if (a === '全部') return -1
    if (b === '全部') return 1
    return b.localeCompare(a) // 降序排列，最新的年份在前
  })
})

// 从文章中提取所有标签（这里假设使用 icon 作为标签分类）
const tags = computed(() => {
  const tagsSet = new Set(['全部'])
  props.allArticles.forEach(article => {
    if (article.icon) {
      const iconName = article.icon.toString().split('/').pop()?.split('.')[0]
      if (iconName) tagsSet.add(iconName)
    }
  })
  return Array.from(tagsSet)
})

// 筛选后的文章
const filteredArticles = computed(() => {
  return props.allArticles.filter(article => {
    // 标题或描述包含搜索关键词
    const matchesSearch = searchQuery.value === '' || 
      (article.title && article.title.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (article.desc && article.desc.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    // 年份匹配
    const year = getYearFromBadge(article.badge)
    const matchesYear = selectedYear.value === '全部' || year === selectedYear.value
    
    // 标签匹配
    const icon = article.icon?.toString() || ''
    const iconName = icon.split('/').pop()?.split('.')[0]
    const matchesTag = selectedTag.value === '全部' || iconName === selectedTag.value
    
    return matchesSearch && matchesYear && matchesTag
  })
})

// 计算是否有筛选条件
const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || 
         selectedYear.value !== '全部' || 
         selectedTag.value !== '全部'
})

// 监视筛选条件变化，通知父组件
watch([filteredArticles], () => {
  emit('filter-changed', filteredArticles.value)
}, { immediate: true })

// 清除所有筛选条件
const clearFilters = () => {
  searchQuery.value = ''
  selectedYear.value = '全部'
  selectedTag.value = '全部'
}

// 切换筛选面板展开/折叠状态
const toggleFilter = () => {
  isFilterExpanded.value = !isFilterExpanded.value
}

// 选择年份
const selectYear = (year) => {
  selectedYear.value = year
}

// 选择标签
const selectTag = (tag) => {
  selectedTag.value = tag
}
</script>

<template>
  <!-- 筛选组件 -->
  <div class="filter-container">
    <!-- 筛选切换按钮 -->
    <div class="filter-toggle" @click="toggleFilter">
      <div class="filter-toggle-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        筛选文章
        <span v-if="hasActiveFilters" class="filter-badge">{{ filteredArticles.length }}</span>
      </div>
      <div class="filter-toggle-icon" :class="{ 'expanded': isFilterExpanded }">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    
    <!-- 筛选面板 -->
    <div class="filter-panel" :class="{ 'expanded': isFilterExpanded }">
      <!-- 搜索框 -->
      <div class="filter-search">
        <div class="filter-search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input 
          type="text" 
          class="filter-search-input" 
          placeholder="搜索文章标题或描述..."
          v-model="searchQuery"
        >
        <button 
          v-if="searchQuery" 
          class="filter-search-clear"
          @click.stop="searchQuery = ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <!-- 年份筛选 -->
      <div class="filter-section">
        <div class="filter-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          按年份筛选
        </div>
        <div class="filter-tags">
          <div 
            v-for="year in years" 
            :key="year"
            class="filter-tag"
            :class="{ 'active': selectedYear === year }"
            @click="selectYear(year)"
          >
            {{ year === '全部' ? '全部年份' : year + '年' }}
          </div>
        </div>
      </div>
      
      <!-- 标签筛选 -->
      <div class="filter-section">
        <div class="filter-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          按标签筛选
        </div>
        <div class="filter-tags">
          <div 
            v-for="tag in tags" 
            :key="tag"
            class="filter-tag"
            :class="{ 'active': selectedTag === tag }"
            @click="selectTag(tag)"
          >
            {{ tag === '全部' ? '全部标签' : tag }}
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="filter-actions">
        <button class="filter-clear" @click="clearFilters">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v8"></path>
            <path d="m16 6-4 4-4-4"></path>
            <path d="M8 16H6a2 2 0 0 1-2-2V6"></path>
            <path d="M16 16h2a2 2 0 0 0 2-2V6"></path>
          </svg>
          重置筛选条件
        </button>
      </div>
    </div>
    
    <!-- 筛选结果信息 -->
    <div v-if="hasActiveFilters" class="filter-results">
      筛选出 <strong>{{ filteredArticles.length }}</strong> 篇文章
    </div>
  </div>
</template>

<style scoped>
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

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* 筛选部分样式 */
.filter-container {
  max-width: 1200px;
  margin: 0 auto 2rem;
  position: relative;
  padding: 0 1rem;
  box-sizing: border-box;
  width: 100%;
}

.filter-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  width: 100%;
  box-sizing: border-box;
}

.filter-toggle:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-dimm);
}

.filter-toggle-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.filter-toggle-icon {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
  transition: transform 0.3s ease;
}

.filter-toggle-icon.expanded {
  transform: rotate(180deg);
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  height: 20px;
  min-width: 20px;
  padding: 0 6px;
  border-radius: 10px;
  margin-left: 8px;
  animation: pulse 1s ease-in-out;
}

.filter-panel {
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  padding: 0;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  box-sizing: border-box;
}

.filter-panel.expanded {
  padding: 1.5rem;
  max-height: 1000px;
  opacity: 1;
  margin-bottom: 1.5rem;
}

.filter-search {
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
}

.filter-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.filter-search-input {
  width: 100%;
  padding: 12px 12px 12px 42px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  transition: all 0.3s;
  box-sizing: border-box;
}

.filter-search-input:hover, 
.filter-search-input:focus {
  border-color: var(--vp-c-brand);
  outline: none;
  box-shadow: 0 0 0 3px var(--vp-c-brand-dimm);
}

.filter-search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.filter-search-clear:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft-down);
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--vp-c-divider);
  user-select: none;
}

.filter-tag:hover {
  border-color: var(--vp-c-brand-dimm);
  background-color: var(--vp-c-bg-soft-up);
}

.filter-tag.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.filter-clear {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--vp-c-divider);
}

.filter-clear:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand-dimm);
  background-color: var(--vp-c-brand-dimm);
}

.filter-results {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem 1rem;
  text-align: center;
  margin-bottom: 1rem;
  animation: fadeIn 0.3s ease-out;
}

.filter-results strong {
  color: var(--vp-c-brand);
  font-weight: 600;
}

@media (max-width: 768px) {
  .filter-container {
    padding: 0 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .filter-toggle {
    padding: 0.8rem 1rem;
  }
  
  .filter-panel.expanded {
    padding: 1rem;
  }
  
  .filter-tags {
    gap: 0.6rem;
  }
  
  .filter-tag {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
  
  .filter-section-title {
    font-size: 0.9rem;
  }
  
  .filter-search-input {
    font-size: 0.9rem;
    padding: 10px 10px 10px 38px;
  }
  
  .filter-search-icon {
    left: 10px;
  }
  
  .filter-search-clear {
    right: 10px;
  }
  
  .filter-clear {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .filter-toggle-title {
    font-size: 1rem;
  }
  
  .filter-toggle {
    padding: 0.7rem 0.8rem;
  }
  
  .filter-panel.expanded {
    padding: 0.8rem;
  }
  
  .filter-tags {
    gap: 0.4rem;
  }
}
</style> 