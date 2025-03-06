<script lang="ts" setup>
import type { QInnerLoadingProps } from 'quasar'

export interface ZLoadingProps {
  /**
   * 是否加载中的状态
   */
  modelValue?: QInnerLoadingProps['showing']
  /**
   * `label`
   *
   * 默认值：`加载中...`
   */
  label?: string
  /**
   * 其他参数
   *
   * 继承自 `quasar` 的 `QInnerLoadingProps`
   */
  params?: Omit<
    QInnerLoadingProps,
    'showing' | 'label'
  >
}

const props = withDefaults(defineProps<ZLoadingProps>(), {
  label: '加载中...',
})
</script>

<template>
  <q-inner-loading
    v-if="modelValue"
    class="z-loading"
    :showing="modelValue"
    :label text-primary-1
    z99999
    v-bind="props.params"
  />
</template>

<style lang="scss">
.z-loading {
  .q-inner-loading__label {
    padding: 0 16px;
    text-align: center;
  }
}
</style>
