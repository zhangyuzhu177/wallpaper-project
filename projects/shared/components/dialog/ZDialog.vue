<script lang="ts" setup>
import { ref, watch } from 'vue'
import { QScrollArea } from 'quasar'
import type { CSSProperties } from 'vue'
import type { QDialogProps } from 'quasar'
import { useIntervalFn, useVModel } from '@vueuse/core'

import ZBtn from '../btn/ZBtn.vue'
import ZInfo from '../info/ZInfo.vue'
import ZLoading from '../loading/ZLoading.vue'

export interface ZDialogProps {
  /**
   * 对话框绑定的值
   */
  modelValue?: QDialogProps['modelValue']
  /**
   * 对话框标题
   *
   * 或使用 `title` 插槽代替
   */
  title?: string
  /**
   * 对话框说明
   */
  explain?: string
  /**
   * 是否显示 `footer`
   */
  footer?: boolean
  /**
   * 是否显示取消按钮
   *
   * 仅当 `footer` 参数为 `true` 时有效
   *
   * 默认值：`true`
   */
  cancelBtn?: boolean
  /**
   * 是否显示确认按钮
   *
   * 仅当 `footer` 参数为 `true` 时有效
   *
   * 默认值：`true`
   */
  confirmBtn?: boolean
  /**
   * 取消按钮的文本
   *
   * 默认值：`取消`
   */
  cancelText?: string
  /**
   * 确认按钮的文本
   *
   * 默认值：`确认`
   */
  confirmText?: string
  /**
   * 点击确认按钮是否关闭对话框
   *
   * 默认值：`true`
   */
  confirmClose?: boolean
  /**
   * 是否禁用确认按钮
   */
  disableConfirm?: boolean
  /**
   * 确认倒计时
   */
  confirmInterval?: number
  /**
   * 对话框外层样式
   */
  wrapperStyle?: CSSProperties
  /**
   * 是否使用滚动区域
   */
  scroll?: boolean
  /**
   * 是否禁用横向滚动
   *
   * 默认值：`true`
   */
  disableHorizontalScroll?: boolean
  /**
   * 是否显示加载动画
   */
  loading?: boolean
  /**
   * 点击确认按钮的回调
   */
  onOk?: () => void
  /**
   * 其他参数
   *
   * 继承自 `quasar` 的 `QDialogProps`
   */
  params?: Omit<QDialogProps, 'modelValue'>
}

const props = withDefaults(defineProps<ZDialogProps>(), {
  cancelBtn: true,
  confirmBtn: true,
  cancelText: '取消',
  confirmText: '确认',
  confirmClose: true,
  disableHorizontalScroll: true,
})
defineEmits<{
  /**
   * 更新对话框绑定的值
   */
  'update:modelValue': [ZDialogProps['modelValue']]
}>()

const scrollRef = ref<InstanceType<typeof QScrollArea>>()

const value = useVModel(props, 'modelValue')
/** 倒计时 */
const interval = ref<number>()

const { pause, resume, isActive } = useIntervalFn(() => {
  if (typeof interval.value === 'number' && interval.value > 0)
    interval.value -= 1
  else
    interval.value = 0
}, 1000)

/**
 * 监听对话框
 */
watch(
  value,
  (newVal) => {
    if (newVal) {
      const { confirmInterval } = props
      if (typeof confirmInterval === 'number')
        interval.value = confirmInterval
    }
    else {
      interval.value = 0
    }
  },
)

/**
 * 监听倒计时
 */
watch(
  interval,
  (newVal) => {
    if (typeof newVal === 'number' && newVal > 0 && !isActive.value)
      resume()
    else if ((!newVal || newVal <= 0) && isActive.value)
      pause()
  },
)

defineExpose({
  scrollRef,
})
</script>

<template>
  <q-dialog
    v-model="value"
    class="z-dialog"
    no-backdrop-dismiss
    no-route-dismiss
    no-refocus
    v-bind="props.params"
  >
    <q-card
      class="hide-scrollbar"
      rounded="10px!" flex="~ col gap6" p6
      min-w="70 sm:122" relative
      :style="{
        height: scroll ? 'calc(100vh - 64px)' : 'auto',
        ...wrapperStyle,
      }"
    >
      <header flex="~ justify-between items-center">
        <slot name="title">
          <div flex="~ 1 items-center gap1" w0>
            <div subtitle-1 truncate v-text="title" />
            <ZInfo v-if="explain" :description="explain" text-lg />
          </div>
        </slot>

        <q-btn v-close-popup dense flat p0 size-5 min-h="auto!">
          <div text-grey-6 full i-mingcute:close-line />
        </q-btn>
      </header>

      <div
        v-if="scroll"
        flex="~ 1 col" h0
        text-sm
      >
        <QScrollArea
          ref="scrollRef"
          :class="{
            'disable-horizontal-scroll': disableHorizontalScroll,
          }"
          full
        >
          <slot />
        </QScrollArea>
      </div>

      <div
        v-else
        text-sm
      >
        <slot />
      </div>

      <footer v-if="footer" flex="~ justify-end gap4">
        <slot name="footer">
          <ZBtn
            v-if="cancelBtn"
            v-close-popup
            min-w="27 sm:28"
            :label="cancelText"
            type="third"
          />
          <ZBtn
            v-if="confirmBtn"
            v-close-popup="confirmClose"
            min-w="27 sm:28"
            :label="`${confirmText}${typeof interval === 'number' && interval > 0 ? `（${interval}秒）` : ''}`"
            :disable="disableConfirm || (typeof interval === 'number' && interval > 0)"
            @click="onOk"
          />
        </slot>
      </footer>

      <ZLoading :model-value="loading" />
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.z-dialog {
  &.full-body-dialog {
    > .q-dialog__inner {
      > .q-card {
        > div:not(.q-inner-loading) {
          flex: 1;
          height: 0;
        }
      }
    }
  }
}
</style>
