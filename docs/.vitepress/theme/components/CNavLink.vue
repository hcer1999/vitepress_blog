<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { slugify } from '@mdit-vue/shared'

import { NavLink } from '../types'

// 导入所有emoji表情
import { emoji } from '../../../assets/emoji'

// 从emoji表情中随机取一个
const randomEmoji = () => {
  const keys = Object.keys(emoji)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return emoji[randomKey]
}

const props = defineProps<{
  noIcon?: boolean
  icon?: NavLink['icon']
  badge?: NavLink['badge']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
  target?: NavLink['target']
}>()

const formatTitle = computed(() => {
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
})

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' }
  }
  return props.badge
})

// 提取年份信息
const extractYear = computed(() => {
  if (!formatBadge.value || !formatBadge.value.text) return null
  const match = formatBadge.value.text.match(/(\d{4})/)
  return match ? match[1] : formatBadge.value.text
})

// 格式化日期文本
const formattedDate = computed(() => {
  if (!formatBadge.value) return null
  
  // 检查是否包含年份
  if (extractYear.value) {
    return formatBadge.value.text
  }
  
  return formatBadge.value.text
})

// 检查是否有描述
const hasDesc = computed(() => {
  return !!props.desc && props.desc.trim().length > 0
})
</script>

<template>
  <a v-if="link" class="cnav-link" :href="link" :target="target" rel="noreferrer">
    <article class="card" :class="{ 'no-desc': !hasDesc }">
      <!-- 卡片头部 -->
      <div class="card-header">
        <div class="icon-container">
          <template v-if="!noIcon">
            <div v-if="svg" class="icon" v-html="svg"></div>
            <div v-else-if="icon && typeof icon === 'string'" class="icon">
              <img
                :src="withBase(icon)"
                :alt="title"
                onerror="this.parentElement.style.display='none'"
              />
            </div>
          </template>
          <template v-else>
            <div class="icon emoji-icon">{{ randomEmoji() }}</div>
          </template>
        </div>
        
        <div class="title-container">
          <h5 v-if="title" :id="formatTitle" class="title">
            {{ title }}
          </h5>
          
          <!-- 日期展示 -->
          <div v-if="formatBadge" class="date-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{{ formattedDate }}</span>
          </div>
        </div>
      </div>
      
      <!-- 描述内容 -->
      <p v-if="desc" class="desc">{{ desc }}</p>
      <div v-else class="desc-placeholder"></div>
      
      <!-- 底部操作区 -->
      <div class="card-footer">
        <span class="read-more">
          阅读全文
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
      
      <!-- 悬浮效果蒙层 -->
      <div class="card-overlay">
        <span class="overlay-button">
          阅读全文
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
      
      <!-- 卡片顶部彩带 -->
      <div class="card-ribbon" :class="formatBadge && formatBadge.type"></div>
    </article>
  </a>
</template>

<style lang="scss" scoped>
@keyframes cardPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.cnav-link {
  display: block;
  text-decoration: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--vp-c-bg);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid var(--vp-c-divider);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &.no-desc {
      .card-header {
        padding-bottom: 0;
      }
      
      .desc-placeholder {
        height: 0;
      }
      
      .card-footer {
        margin-top: auto;
        padding-top: 1rem;
      }
    }
    
    // 卡片顶部彩带
    .card-ribbon {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
      
      &.info {
        background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
      }
      
      &.tip {
        background: linear-gradient(to right, #10b981, #059669);
      }
      
      &.warning {
        background: linear-gradient(to right, #f59e0b, #d97706);
      }
      
      &.danger {
        background: linear-gradient(to right, #ef4444, #dc2626);
      }
    }
  }
  
  .card-header {
    display: flex;
    padding: 1.25rem 1.25rem 0.75rem;
    position: relative;
  }
  
  .icon-container {
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .icon {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    background-color: var(--vp-c-bg-soft);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    
    &.emoji-icon {
      font-size: 24px;
      background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
      color: white;
    }
    
    :deep(svg) {
      width: 28px;
      height: 28px;
    }
    
    :deep(img) {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      object-fit: contain;
    }
  }
  
  .title-container {
    flex: 1;
    min-width: 0; // 确保文本可以正确截断
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .title {
    margin: 0 0 0.25rem;
    padding: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
  }
  
  .date-info {
    display: flex;
    align-items: center;
    color: var(--vp-c-text-2);
    font-size: 0.85rem;
    line-height: 1;
    font-weight: 500;
    
    svg {
      margin-right: 5px;
      flex-shrink: 0;
    }
    
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  
  .desc {
    padding: 0 1.25rem;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    flex-grow: 1;
    word-break: break-word;
  }
  
  .desc-placeholder {
    flex-grow: 1;
    min-height: 1rem;
  }
  
  .card-footer {
    padding: 0.75rem 1.25rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 0.5rem;
    
    .read-more {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--vp-c-brand);
      
      svg {
        margin-left: 6px;
        transition: transform 0.2s ease;
      }
    }
  }
  
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(var(--vp-c-brand-rgb), 0.8),
      rgba(var(--vp-c-brand-rgb), 0.9)
    );
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2;
    border-radius: 16px;
    
    .overlay-button {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.9);
      color: var(--vp-c-brand-dark);
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
      transform: translateY(20px);
      transition: all 0.3s 0.1s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      
      svg {
        margin-left: 6px;
      }
    }
  }
  
  // 悬停效果
  &:hover {
    .card {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      border-color: var(--vp-c-brand-dimm);
      
      &::before {
        opacity: 1;
      }
    }
    
    .card-overlay {
      opacity: 1;
      
      .overlay-button {
        transform: translateY(0);
        
        &:hover {
          background: white;
          transform: scale(1.05);
        }
      }
    }
    
    .read-more {
      svg {
        transform: translateX(4px);
      }
    }
    
    .icon {
      transform: scale(1.05);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
  }
  
  // 点击效果
  &:active {
    .card {
      transform: translateY(0);
      transition: all 0.1s ease;
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .cnav-link {
    .card {
      border-radius: 12px;
      
      &-header {
        padding: 1rem 1rem 0.5rem;
      }
      
      &-footer {
        padding: 0.5rem 1rem 1rem;
      }
    }
    
    .icon {
      width: 40px;
      height: 40px;
      
      :deep(svg), :deep(img) {
        width: 24px;
        height: 24px;
      }
      
      &.emoji-icon {
        font-size: 20px;
      }
    }
    
    .title {
      font-size: 1rem;
    }
    
    .date-info {
      font-size: 0.8rem;
      
      svg {
        width: 12px;
        height: 12px;
      }
    }
    
    .desc {
      padding: 0 1rem;
      font-size: 0.85rem;
    }
    
    .read-more {
      font-size: 0.85rem;
    }
  }
}

@media (max-width: 480px) {
  .cnav-link {
    .icon {
      width: 36px;
      height: 36px;
      
      :deep(svg), :deep(img) {
        width: 20px;
        height: 20px;
      }
    }
    
    .title {
      font-size: 0.95rem;
    }
    
    .card-overlay {
      .overlay-button {
        padding: 0.6rem 1.2rem;
        font-size: 0.85rem;
      }
    }
  }
}
</style>

