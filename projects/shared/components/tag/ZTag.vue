<script lang="ts" setup>
import { computed } from 'vue'

export interface ZTagProps {
  /**
   * 标签主题颜色
   *
   * 可选值：`info`、`primary`、`success`、`error`、`warning`
   *
   * 默认值：`info`
   */
  color?: 'info' | 'primary' | 'success' | 'error' | 'warning'
  /**
   * 标签文本
   *
   * 或使用默认插槽代替
   */
  label?: string
  /**
   * 标签尺寸
   *
   * 可选值：`small`、`big`
   *
   * 默认值：`big`
   */
  size?: 'small' | 'big'
  /**
   * 标签类型
   *
   * 可选值：`outline`、`light`、`dark`
   *
   * 默认值：`light`
   */
  type?: 'outline' | 'light' | 'dark'
}

const props = withDefaults(defineProps<ZTagProps>(), {
  color: 'info',
  size: 'big',
  type: 'light',
})

/** 标签颜色 */
const tagColor = computed(() => {
  const { color, type } = props

  const map = {
    info: {
      color: 'var(--grey-8)',
      light: 'var(--grey-2)',
      dark: 'var(--grey-5)',
    },
    primary: {
      color: 'var(--primary-1)',
      light: 'var(--primary-4)',
      dark: 'var(--primary-1)',
    },
    success: {
      color: 'var(--alerts-success-1)',
      light: 'var(--alerts-success-3)',
      dark: 'var(--alerts-success-1)',
    },
    error: {
      color: 'var(--alerts-error-1)',
      light: 'var(--alerts-error-3)',
      dark: 'var(--alerts-error-1)',
    },
    warning: {
      color: 'var(--alerts-warning-1)',
      light: 'var(--alerts-warning-3)',
      dark: 'var(--alerts-warning-1)',
    },
  }

  return {
    text: type === 'dark' ? 'var(--grey-1)' : map[color].color,
    bg: type === 'outline' ? 'var(--grey-1)' : map[color][type],
  }
})
</script>

<template>
  <div
    class="z-tag"
    rounded-5 inline-flex
    :px="size === 'small' ? '7px' : '11px'"
    :text="size === 'small' ? 'xs' : 'sm'"
    :h="size === 'small' ? '18px' : '24px'"
    b-1px flex="items-center justify-center"
    :style="{
      color: tagColor.text,
      backgroundColor: tagColor.bg,
      borderColor: type === 'outline' ? tagColor.text : tagColor.bg,
    }"
  >
    <slot>
      <div v-text="label" />
    </slot>
  </div>
</template>
