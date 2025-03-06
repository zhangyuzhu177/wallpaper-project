<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { QToggleProps } from 'quasar'

export interface ZToggleProps {
  /**
   * 开关绑定的值
   */
  modelValue?: boolean
  /**
   * 当开关的值为 `true` 时的 `label`
   *
   * 或使用默认插槽代替
   */
  trueLabel?: string
  /**
   * 当开关的值为 `false` 时的 `label`
   *
   * 或使用默认插槽代替
   */
  falseLabel?: string
  /**
   * 是否禁用开关
   */
  disable?: boolean
  /**
   * 其它参数
   *
   * 继承自 `quasar` 的 `QToggleProps`
   */
  params?: Omit<
    QToggleProps,
    'modelValue' | 'trueValue' | 'falseValue'
    | 'val' | 'label' | 'disable'
  >
}

const props = defineProps<ZToggleProps>()
defineEmits<{
  /**
   * 更新开关绑定的值
   */
  'update:modelValue': [ZToggleProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')
</script>

<template>
  <q-toggle
    v-model="value"
    class="z-toggle"
    :label="value ? trueLabel : falseLabel"
    :disable
    v-bind="props.params"
  >
    <slot />
  </q-toggle>
</template>

<style lang="scss">
.q-toggle.z-toggle {
  gap: 3px;

  .q-toggle__inner {
    font-size: 24px;
    width: 40px;
    padding: 0;
    color: var(--grey-3);

    &.q-toggle__inner--truthy {
      color: var(--primary-1);

      .q-toggle__thumb {
        left: 18px;
      }
    }

    .q-toggle__track {
      height: 100%;
      border-radius: 12px;
      opacity: 1;
    }

    .q-toggle__thumb {
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;

      &::before {
        display: none;
      }

      &::after {
        background-color: var(--grey-1);
      }
    }
  }

  .no-outline {
    display: none;
  }

  .q-toggle__label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: var(--grey-9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
