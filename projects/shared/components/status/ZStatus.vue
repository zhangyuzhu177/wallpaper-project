<script lang="ts" setup>
import { computed } from 'vue'

export interface ZStatusProps {
  /**
   * 状态标签绑定的值
   */
  modelValue?: boolean | string
  /**
   * `label`
   */
  label?: string
  /**
   * 状态为 `true` 时的标签文本
   *
   * 或使用默认插槽代替
   *
   * 默认值：`正常`
   */
  trueLabel?: string
  /**
   * 状态为 `false` 时的标签文本
   *
   * 或使用默认插槽代替
   *
   * 默认值：`禁用`
   */
  falseLabel?: string
}

const props = withDefaults(defineProps<ZStatusProps>(), {
  trueLabel: '正常',
  falseLabel: '禁用',
})

const value = computed(() => {
  const { modelValue, trueLabel } = props
  return modelValue === true || modelValue === trueLabel
})
</script>

<template>
  <div
    class="z-status"
    flex="items-center gap2"
    inline-flex
  >
    <div
      w6px h6px rounded-full
      :bg-alerts="value ? 'success-1' : 'error-1'"
    />
    <slot>
      <div v-text="label ?? (value ? trueLabel : falseLabel)" />
    </slot>
  </div>
</template>
