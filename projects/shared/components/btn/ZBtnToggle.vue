<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { QBtnToggleProps, QBtnToggleSlots } from 'quasar'

export interface ZBtnToggleProps {
  /**
   * 按钮开关绑定的值
   */
  modelValue?: QBtnToggleProps['modelValue']
  /**
   * 按钮开关的可用选项
   */
  options?: QBtnToggleProps['options']
  /**
   * 按钮尺寸
   *
   * 可选值：`small`、`medium`
   *
   * 默认值：`small`
   */
  size?: 'small' | 'medium'
  /**
   * 按钮类型
   *
   * 可选值：`primary`、`secondary`
   *
   * 默认值：`primary`
   */
  type?: 'primary' | 'secondary'
  /**
   * 单击是否清除已选择按钮绑定的值
   */
  clearable?: boolean
  /**
   * 是否水平扩展到所有可用空间
   */
  spread?: boolean
  /**
   * 避免标签文本换行
   */
  noWrap?: boolean
  /**
   * 是否禁用按钮开关
   */
  disable?: boolean
  /**
   * 是否只读按钮开关
   */
  readonly?: boolean
  /**
   * 其它参数
   *
   * 继承自 `quasar` 的 `QBtnToggleProps`
   */
  params?: Omit<
    QBtnToggleProps,
    'modelValue' | 'options' | 'clearable'
    | 'spread' | 'noWrap' | 'disable' | 'readonly'
  >
}

const props = withDefaults(defineProps<ZBtnToggleProps>(), {
  size: 'small',
  type: 'primary',
})
defineEmits<{
  /**
   * 更新按钮开关绑定的值
   */
  'update:modelValue': [ZBtnToggleProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')
</script>

<template>
  <q-btn-toggle
    v-if="options"
    v-model="value"
    class="z-btn-toggle"
    :class="`${size} ${type}`"
    :options="options"
    :clearable :spread :no-wrap
    :disable :readonly
    no-caps unelevated
    color="grey-1" text-color="grey-6"
    :toggle-color="type === 'primary' ? 'primary-4' : 'grey-2'"
    :toggle-text-color="type === 'primary' ? 'primary-1' : 'grey-9'"
    rounded-2 padding="0"
    :h="size === 'small' ? 9 : 10"
    v-bind="props.params"
  >
    <template
      v-for="(_, slotName) of ($slots as Readonly<QBtnToggleSlots>)"
      :key="slotName"
      #[slotName]
    >
      <slot :name="slotName" />
    </template>
  </q-btn-toggle>
</template>

<style lang="scss">
.q-btn-toggle.z-btn-toggle {
  .q-btn {
    border: 1px var(--grey-3) solid;

    .q-focus-helper {
      display: none;
    }

    .q-btn__content {
      line-height: 20px;

      > span, > div {
        padding: 0px 24px;
        height: 100%;
        display: flex !important;
        align-items: center;
        justify-content: center;
      }
    }

    .q-ripple {
      opacity: 0.5;
    }

    &:not(:last-child) {
      border-right: none;
    }

    &:hover:not(.disabled):not([aria-pressed="true"]) {
      background-color: var(--grey-2) !important;
    }
  }
}
</style>
