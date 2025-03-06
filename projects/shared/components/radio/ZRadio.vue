<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { QRadioProps } from 'quasar'

export interface ZRadioProps {
  /**
   * 单选框绑定的值
   */
  modelValue?: QRadioProps['modelValue']
  /**
   * 修改 `modelValue` 的实际值
   */
  val?: QRadioProps['val']
  /**
   * 单选框 `label`
   *
   * 或使用默认插槽代替
   */
  label?: string
  /**
   * 是否禁用单选框
   */
  disable?: boolean
  /**
   * 其它参数
   *
   * 继承自 `quasar` 的 `QRadioProps`
   */
  params?: Omit<QRadioProps, 'modelValue' | 'val' | 'label' | 'disable'>
}

const props = defineProps<ZRadioProps>()
defineEmits<{
  /**
   * 更新单选框绑定的值
   */
  'update:modelValue': [ZRadioProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')
</script>

<template>
  <q-radio
    v-model="value"
    class="z-radio"
    :val :label :disable
    checked-icon="fas fa-check"
    select-none
    v-bind="props.params"
  >
    <slot />
  </q-radio>
</template>

<style lang="scss">
.q-radio.z-radio {
  gap: 2px;

  .q-radio__inner {
    font-size: 24px;
    color: var(--grey-4);

    &::before {
      display: none;
    }

    .q-radio__bg {
      top: 12.5%;
      left: 12.5%;
      width: 75%;
      height: 75%;
      overflow: visible;

      path {
        stroke: currentColor;
        stroke-width: 0.5px;
      }
    }
  }

  .q-radio__label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: var(--grey-9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:not(.disabled):hover {
    .q-radio__inner {
      color: var(--primary-1);
    }
  }

  &[aria-checked="true"] {
    .q-radio__inner {
      color: var(--primary-1);

      .q-radio__icon {
        background-color: currentColor;
        border-radius: 50%;
        font-size: 18px;
        position: relative;
        overflow: hidden;

        &::before {
          color: var(--grey-1);
          font-size: 10px;
        }

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          left: 18px;
          width: auto;
          background-color: currentColor;
          animation: radio .3s;
        }

        @keyframes radio {
          from {
            left: 0;
          }
          to {
            left: 18px;
          }
        }
      }
    }
  }
}
</style>
