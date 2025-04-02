<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalItems: number
  pageSize: number
  maxPageButtons?: number
}>()

const emit = defineEmits(['update:currentPage'])

// 计算总页数
const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

// 计算显示的页码
const pageButtons = computed(() => {
  const maxPageButtons = props.maxPageButtons || 5
  if (totalPages.value <= maxPageButtons) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }

  // 计算需要显示的页码范围
  const halfWay = Math.ceil(maxPageButtons / 2)
  const isStart = props.currentPage <= halfWay
  const isEnd = props.currentPage >= totalPages.value - halfWay + 1
  const isMiddle = !isStart && !isEnd

  if (isStart) {
    return Array.from({ length: maxPageButtons }, (_, i) => i + 1)
  } else if (isEnd) {
    return Array.from({ length: maxPageButtons }, (_, i) => totalPages.value - maxPageButtons + i + 1)
  } else if (isMiddle) {
    const offset = Math.floor(maxPageButtons / 2)
    return Array.from({ length: maxPageButtons }, (_, i) => props.currentPage - offset + i)
  }

  return []
})

// 切换页码
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}

// 上一页
const prevPage = () => {
  if (props.currentPage > 1) {
    changePage(props.currentPage - 1)
  }
}

// 下一页
const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    changePage(props.currentPage + 1)
  }
}

// 跳转到第一页
const firstPage = () => {
  changePage(1)
}

// 跳转到最后一页
const lastPage = () => {
  changePage(totalPages.value)
}
</script>

<template>
  <div class="pagination-container" v-if="totalPages > 1">
    <div class="pagination">
      <!-- 首页按钮 -->
      <button 
        class="pagination-button first-page"
        :class="{ 'disabled': currentPage === 1 }"
        @click="firstPage"
        :disabled="currentPage === 1"
        aria-label="首页"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="11 17 6 12 11 7"></polyline>
          <polyline points="18 17 13 12 18 7"></polyline>
        </svg>
      </button>

      <!-- 上一页按钮 -->
      <button 
        class="pagination-button prev-page"
        :class="{ 'disabled': currentPage === 1 }"
        @click="prevPage"
        :disabled="currentPage === 1"
        aria-label="上一页"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- 页码按钮 -->
      <template v-for="page in pageButtons" :key="page">
        <button 
          class="pagination-button page-number"
          :class="{ 'active': currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </template>

      <!-- 下一页按钮 -->
      <button 
        class="pagination-button next-page"
        :class="{ 'disabled': currentPage === totalPages }"
        @click="nextPage"
        :disabled="currentPage === totalPages"
        aria-label="下一页"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- 尾页按钮 -->
      <button 
        class="pagination-button last-page"
        :class="{ 'disabled': currentPage === totalPages }"
        @click="lastPage"
        :disabled="currentPage === totalPages"
        aria-label="尾页"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="13 17 18 12 13 7"></polyline>
          <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
      </button>
    </div>
    
    <div class="pagination-info">
      共 <span>{{ totalItems }}</span> 篇文章，第 <span>{{ currentPage }}</span> / <span>{{ totalPages }}</span> 页
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
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

.pagination-container {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 800px;
  animation: fadeIn 0.5s ease-out forwards;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.pagination-button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 15px;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0 10px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: var(--vp-c-brand-dimm);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    border-color: var(--vp-c-brand-dimm);
    color: var(--vp-c-brand);
    
    &::before {
      width: 120%;
      height: 120%;
    }
  }
  
  &.active {
    background-color: var(--vp-c-brand);
    color: white;
    border-color: var(--vp-c-brand);
    font-weight: 600;
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background-color: var(--vp-c-brand-dark);
    }
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background-color: var(--vp-c-bg);
      color: var(--vp-c-text-1);
      border-color: transparent;
      
      &::before {
        width: 0;
        height: 0;
      }
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease;
  }
  
  &.next-page:hover svg,
  &.last-page:hover svg {
    transform: translateX(2px);
  }
  
  &.prev-page:hover svg,
  &.first-page:hover svg {
    transform: translateX(-2px);
  }
  
  &.page-number {
    font-family: 'Roboto Mono', monospace, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
}

.pagination-info {
  font-size: 14px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--vp-c-bg-soft-up);
  }
  
  span {
    font-weight: 600;
    color: var(--vp-c-brand);
    display: inline-block;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
      animation: pulse 1s infinite;
    }
  }
}

@media (max-width: 640px) {
  .pagination-container {
    margin: 2rem auto;
  }
  
  .pagination {
    padding: 0.5rem;
    border-radius: 10px;
    flex-wrap: wrap;
  }
  
  .pagination-button {
    min-width: 36px;
    height: 36px;
    font-size: 14px;
    
    &.first-page,
    &.last-page {
      display: none;
    }
  }
  
  .pagination-info {
    font-size: 13px;
    padding: 0.4rem 0.8rem;
  }
}
</style> 