<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { QTabProps, QTabsProps } from 'quasar'

export interface ZLoginTabsProps {
  /**
   * 选项卡绑定的值
   */
  modelValue?: QTabsProps['modelValue']
  /**
   * 选项卡的可用项
   *
   * 继承自 `quasar` 的 `QTabProps`
   */
  options?: QTabProps[]
  /**
   * 其他参数
   *
   * 继承自 `quasar` 的 `QTabsProps`
   */
  params?: Omit<QTabsProps, 'modelValue'>
}

const props = defineProps<ZLoginTabsProps>()
defineEmits<{
  /**
   * 更新选项卡绑定的值
   */
  'update:modelValue': [ZLoginTabsProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')
</script>

<template>
  <q-tabs
    v-model="value"
    class="z-login-tabs"
    text="md sm:xl"
    font-600 relative
    v-bind="params"
  >
    <q-tab
      v-for="item in options"
      :key="item.name"
      no-caps :ripple="false"
      opacity100
      v-bind="item"
    />
  </q-tabs>
</template>

<style lang="scss">
.z-login-tabs {
  &::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    height: 1px;
    background-color: var(--grey-3);
  }

  .q-tabs__content {
    justify-content: start;
    flex: inherit;
    gap: 40px;

    .q-tab {
      padding: 0;
      min-height: auto;

      .q-focus-helper {
        display: none;
      }

      &.q-tab--inactive {
        color: var(--grey-6);
      }

      .q-tab__content {
        padding: 0 0 20px 0;

        .q-tab__label {
          font-size: inherit;
          line-height: inherit;
          font-weight: inherit;
        }
      }

      .q-tab__indicator {
        height: 3px;
        background-color: var(--primary-1);
        z-index: 1;
      }
    }
  }
}
</style>
