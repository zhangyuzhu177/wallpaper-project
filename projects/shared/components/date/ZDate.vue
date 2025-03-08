<script lang="ts" setup>
import moment from 'moment'
import { objectPick } from 'utils'
import { computed, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import VueDatePicker from '@vuepic/vue-datepicker'
import type { VueDatePickerProps } from '@vuepic/vue-datepicker'

import '@vuepic/vue-datepicker/dist/main.css'
import '../../styles/date-picker.scss'

import ZBtn from '../btn/ZBtn.vue'
import ZLabel from '../label/ZLabel.vue'
import type { ZLabelProps } from '../label/ZLabel.vue'
import calendarIcon from '../../assets/icons/calendar.svg?raw'

export interface ZDateProps extends ZLabelProps {
  /**
   * 日期选择器绑定的值
   */
  modelValue?: VueDatePickerProps['modelValue']
  /**
   * 日期选择器占位符
   */
  placeholder?: string
  /**
   * 日期选择器的类型
   *
   * 可选值：`time`、`date`、`dateTime`、`dateTimeInline`、`week`、`month`、`quarter`、`year`
   *
   * 默认值：`date`
   */
  type?: 'time' | 'date' | 'dateTime' | 'dateTimeInline' | 'week' | 'month' | 'quarter' | 'year'
  /**
   * 日期选择器的范围配置
   */
  range?: VueDatePickerProps['range']
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
   * 日期选择器尺寸
   *
   * 可选值：`small`、`big`
   *
   * 默认值：`big`
   */
  size?: 'small' | 'big'
  /**
   * 是否禁用日期选择器
   */
  disable?: boolean
  /**
   * 是否只读日期选择器
   */
  readonly?: boolean
  /**
   * 是否显示清空按钮
   */
  clearable?: boolean
  /**
   * 是否显示长期按钮
   */
  longTime?: boolean
  /**
   * 格式化日期
   */
  format?: VueDatePickerProps['format']
  /**
   * 其他参数
   *
   * 继承自 `@vuepic/vue-datepicker` 的 `VueDatePickerProps`
   */
  params?: Omit<
    VueDatePickerProps,
    'modelValue' | 'placeholder' | 'range' | 'disable'
    | 'readonly' | 'locale' | 'clearable'
    | 'timePicker' | 'timePickerInline' | 'enableTimePicker'
    | 'weekPicker' | 'monthPicker' | 'quarterPicker' | 'yearPicker'
  >
}

const props = withDefaults(defineProps<ZDateProps>(), {
  type: 'date',
  labelPosition: 'top',
  size: 'big',
})
defineEmits<{
  /**
   * 更新日期选择器绑定的值
   */
  'update:modelValue': [ZDateProps['modelValue']]
}>()

const zDate = ref<InstanceType<typeof VueDatePicker>>()

const value = useVModel(props, 'modelValue')

/** 格式化日期 */
const format = computed(() => {
  const { type, format } = props

  if (format)
    return format

  let str = ''

  if (type === 'time')
    str = 'HH:mm'
  else if (type === 'date')
    str = 'yyyy-MM-dd'
  else if (type === 'dateTime' || type === 'dateTimeInline')
    str = 'yyyy-MM-dd HH:mm'
  else if (type === 'week')
    str = 'yyyy-ww'
  else if (type === 'month')
    str = 'yyyy-MM'
  else if (type === 'quarter')
    str = 'yyyy-QQQ'
  else if (type === 'year')
    str = 'yyyy'

  return str
})

/**
 * 返回月份对应的季度文本
 */
function quarterText(text: string) {
  const months: Record<string, string> = {
    January: '第一季度',
    April: '第二季度',
    July: '第三季度',
    October: '第四季度',
  }
  return months[text.split('-')[0]]
}

/**
 * 选择长期
 */
function selectedLongTime() {
  const start = moment()
  const end = moment().set({ year: 9999, month: 11, date: 31 })
  if (typeof format.value === 'string') {
    value.value = [
      start.format(format.value.toUpperCase()),
      end.format(format.value.toUpperCase()),
    ]
  }
  zDate.value?.closeMenu()
}
</script>

<template>
  <div
    class="z-date"
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
        margin: labelPosition === 'top'
          ? '0'
          : size === 'big'
            ? '14px 0'
            : '8px 0',
      }"
    />
    <VueDatePicker
      ref="zDate"
      v-model="value"
      :class="size"
      :placeholder :range :format
      :disabled="disable" :readonly
      model-type="format"
      :text-input="{
        rangeSeparator: '   ➜   ',
      }"
      :style="{
        width: labelPosition === 'top' ? '100%' : '0',
        flex: labelPosition === 'top' ? 'auto' : '1',
      }"
      locale="zh-CN" :clearable="false"
      :time-picker="type === 'time'"
      :time-picker-inline="type === 'dateTimeInline'"
      :enable-time-picker="type === 'time' || type === 'dateTime' || type === 'dateTimeInline'"
      :week-picker="type === 'week'"
      :month-picker="type === 'month'"
      :quarter-picker="type === 'quarter'"
      :year-picker="type === 'year'"
      six-weeks="fair"
      v-bind="props.params"
      @closed="zDate?.updateInternalModelValue(null)"
    >
      <!-- 格式化季度文本 -->
      <template #quarter="{ text }">
        <div v-text="quarterText(text)" />
      </template>

      <!-- 自定义按钮 -->
      <template #action-buttons>
        <slot name="action-buttons">
          <div flex="~ row items-center gap2">
            <ZBtn
              v-if="clearable"
              label="清空"
              type="secondary"
              w16
              @click="() => {
                if (Array.isArray(value))
                  value = ['', '']
                else
                  value = null
                zDate?.clearValue()
              }"
            />
            <ZBtn
              v-if="longTime && typeof format === 'string'"
              label="长期"
              type="secondary"
              w16
              @click="selectedLongTime"
            />
            <ZBtn
              label="选择"
              w16
              @click="zDate?.selectDate"
            />
          </div>
        </slot>
      </template>

      <!-- 图标 -->
      <template #input-icon>
        <span v-html="calendarIcon" />
      </template>
    </VueDatePicker>
  </div>
</template>

<style lang="scss">
.z-date {
  .dp__main {
    .dp__input_wrap {
      input {
        line-height: 20px;

        &::-webkit-input-placeholder {
          color: var(--grey-5);
          opacity: 1;
        }

        &:hover {
          border-color: inherit;
        }

        &.dp__disabled {
          opacity: 1 !important;
          color: var(--grey-5);
        }
      }

      .dp__input_icon {
        inset-inline-start: auto;
        left: 12px;
      }

      &:hover {
        input:not(.dp__disabled) {
          border-color: var(--primary-1);
        }
      }
    }

    .dp__menu {
      overflow: hidden;
      box-shadow: 0px 5px 3px -2px #00000005, 0px 3px 2px -2px #0000000F;

      .dp__calendar_header {
        font-weight: 500;
      }

      .dp__action_row {
        padding: 12px 12px 16px;
        max-height: 52px;

        .dp__selection_preview {
          flex: 1;
          width: 0;
        }
      }
    }

    &.big {
      .dp__input_wrap {
        input {
          height: 48px;
          padding: 14px 12px 14px 40px;
        }
      }
    }

    &.small {
      .dp__input_wrap {
        input {
          height: 36px;
          padding: 8px 12px 8px 40px;
        }
      }
    }
  }
}
</style>
