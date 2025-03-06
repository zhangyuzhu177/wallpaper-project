<script lang="ts" setup>
import { objectPick } from 'utils'

import ZLabel from '../label/ZLabel.vue'
import type { ZLabelProps } from '../label/ZLabel.vue'

export interface ZReadonlyInputProps extends ZLabelProps {
  /**
   * 输入框绑定的值
   *
   * 或使用默认插槽代替
   */
  modelValue?: string | number
  /**
   * `label` 所在的位置
   *
   * 可选值：`left`、`top`
   *
   * 默认值：`top`
   */
  labelPosition?: 'left' | 'top'
  /**
   * `label` 的宽度，仅当 `labelPosition` 为 `left` 时有效
   *
   * 单位：`px`
   */
  labelWidth?: number
  /**
   * 输入框尺寸
   *
   * 可选值：`small`、`big`、`super`
   *
   * 默认值：`big`
   */
  size?: 'small' | 'big' | 'super'
}

const props = withDefaults(defineProps<ZReadonlyInputProps>(), {
  labelPosition: 'top',
  size: 'big',
})
</script>

<template>
  <div
    class="z-readonly-input"
    flex="~ gap1"
    :style="{
      flexDirection: labelPosition === 'top' ? 'column' : 'row',
    }"
  >
    <ZLabel
      v-bind="{
        ...objectPick(props, 'label', 'required', 'aligned', 'explain'),
        colon: labelPosition === 'left',
      }"
      :style="{
        width: labelPosition === 'top' || !labelWidth ? 'auto' : `${labelWidth}px`,
        margin: labelPosition === 'top' ? '0'
          : size === 'super' ? '22px 0'
            : size === 'big' ? '14px 0'
              : '8px 0',
      }"
    >
      <slot name="label" />
    </ZLabel>
    <div
      class="hide-scrollbar"
      :class="size"
      rounded-6px px3 b="1 grey-3"
      bg-grey-2 text="sm grey-5"
      font-400 flex="~ items-center"
      overflow-auto whitespace-nowrap
      :style="{
        width: labelPosition === 'top' ? '100%' : '0',
        flex: labelPosition === 'top' ? 'auto' : '1',
      }"
    >
      <slot>
        {{ modelValue }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-readonly-input {
  > div:last-child {
    &.super {
      height: 64px;
      padding: 0 24px;
      border-radius: 8px;
      font-size: 16px;
      line-height: 24px;
    }

    &.big {
      height: 48px;
    }

    &.small {
      height: 36px;
    }
  }
}
</style>
