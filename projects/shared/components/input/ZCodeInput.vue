<script lang="ts" setup>
import { ref, watch } from 'vue'
import { objectOmit, validateCode } from 'utils'
import { useIntervalFn, useVModel } from '@vueuse/core'

import ZInput from './ZInput.vue'
import type { ZInputProps } from './ZInput.vue'

export interface ZCodeInputProps extends ZInputProps {
  /**
   * `label`
   *
   * 默认值：`验证码`
   */
  label?: ZInputProps['label']
  /**
   * 输入框占位符
   *
   * 默认值：`请输入验证码`
   */
  placeholder?: ZInputProps['placeholder']
  /**
   * 发送按钮 `label`
   *
   * 默认值：`发送验证码`
   */
  btnLabel?: string
  /**
   * 是否禁用发送按钮
   */
  disableSend?: boolean
  /**
   * 发送倒计时
   */
  interval?: number
  /**
   * 发送按钮点击回调事件
   */
  onSendCode?: () => void
}

const props = withDefaults(defineProps<ZCodeInputProps>(), {
  label: '验证码',
  placeholder: '请输入验证码',
  btnLabel: '发送验证码',
  size: 'big',
})
const emits = defineEmits<{
  /**
   * 更新输入框绑定的值
   */
  'update:modelValue': [ZCodeInputProps['modelValue']]
  /**
   * 更新倒计时
   */
  'update:interval': [ZCodeInputProps['interval']]
}>()

const zInput = ref<InstanceType<typeof ZInput>>()

const value = useVModel(props, 'modelValue')

const { pause, resume, isActive } = useIntervalFn(() => {
  const { interval } = props
  emits('update:interval', typeof interval === 'number' ? interval - 1 : 0)
}, 1000)

/**
 * 监听倒计时
 */
watch(
  () => props.interval,
  (newVal) => {
    if (newVal && newVal > 0 && !isActive.value)
      resume()
    else if ((!newVal || newVal <= 0) && isActive.value)
      pause()
  },
)
</script>

<template>
  <ZInput
    ref="zInput"
    v-model="value"
    class="z-code-input"
    v-bind="{
      ...objectOmit(props, 'modelValue', 'btnLabel', 'disableSend', 'interval'),
      rules: [
        val => validateCode(val) || true,
      ],
    }"
  >
    <template #append>
      <q-btn
        v-if="!interval || interval <= 0"
        unelevated rounded-1
        min-h="auto!" p="y0 x3" ml1
        text-sm font-400 bg-primary-4
        text-color="primary-1"
        :h="props.size === 'small' ? 7 : 9"
        :label="btnLabel"
        :disable="disableSend"
        @click="() => {
          (zInput?.$el as HTMLElement).querySelector('input')?.focus()
          onSendCode?.()
        }"
      />
      <div
        v-else
        text="md primary-1 right"
        w7 mr-6px
        v-text="interval"
      />
    </template>
  </ZInput>
</template>

<style lang="scss">
.z-code-input {
  .q-field {
    &.small {
      .q-field__control {
        padding-right: 4px;
      }
    }

    &.big {
      .q-field__control {
        padding-right: 6px;
      }
    }

    &.super {
      .q-field__control {
        padding-right: 14px;
      }
    }
  }
}
</style>
