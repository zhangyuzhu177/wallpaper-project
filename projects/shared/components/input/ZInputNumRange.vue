<script lang="ts" setup>
import { computed } from 'vue'
import { cloneDeep } from 'lodash'
import { objectPick } from 'utils'

import ZLabel from '../label/ZLabel.vue'
import type { ZLabelProps } from '../label/ZLabel.vue'

import ZInput from './ZInput.vue'
import type { ZInputProps } from './ZInput.vue'

export interface ZInputNumRangeProps extends ZLabelProps {
  /**
   * 输入框绑定的值
   */
  modelValue?: [number?, number?]
  /**
   * 输入框占位符
   */
  placeholder?: string | [string?, string?]
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
  /**
   * 最小值
   */
  min?: number | [number?, number?]
  /**
   * 最大值
   */
  max?: number | [number?, number?]
  /**
   * 其他参数
   *
   * 继承自 `ZInput` 的 `ZInputProps`
   */
  params?: Omit<
    ZInputProps,
    'modelValue' | 'placeholder' | 'type' | 'min' | 'max'
    | 'labelPosition' | 'labelWidth' | 'size'
    | 'label' | 'required' | 'aligned' | 'explain' | 'colon'
  >
}

const props = withDefaults(defineProps<ZInputNumRangeProps>(), {
  labelPosition: 'top',
  size: 'big',
})
const emits = defineEmits<{
  /**
   * 更新输入框绑定的值
   */
  'update:modelValue': [ZInputNumRangeProps['modelValue']]
}>()

const value = computed({
  get() {
    return props.modelValue ?? []
  },
  set: ([min, max]) => {
    if (typeof min === 'number' && typeof max === 'number' && min > max)
      return
    emits('update:modelValue', [min, max])
  },
})
</script>

<template>
  <div
    class="z-input-number-range"
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
    />

    <div flex>
      <ZInput
        v-for="index of 2"
        :key="index"
        :model-value="value[index - 1]"
        class="z-input-number-range-item"
        type="number" :size flex-1
        :placeholder="Array.isArray(placeholder) ? placeholder[index - 1] : placeholder"
        :min="Array.isArray(min) ? min[index - 1] : min"
        :max="Array.isArray(max) ? max[index - 1] : max"
        v-bind="params"
        @update:model-value="(val) => {
          const range = cloneDeep(value)
          range[index - 1] = val as number
          value = range
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.z-input-number-range {
  &-item {
    &:first-child {
      .q-field__control {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }

      &:hover, &:focus-within {
        z-index: 1;
      }
    }

    &:last-child {
      position: relative;
      right: 1px;

      .q-field__control {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
    }
  }
}
</style>
