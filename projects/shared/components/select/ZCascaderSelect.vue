<script lang="ts" setup>
import { objectPick } from 'utils'
import { useVModel } from '@vueuse/core'
import { ElCascader } from 'element-plus'
import type { CascaderOption, CascaderProps, CascaderValue } from 'element-plus'

import 'element-plus/es/components/cascader/style/css'

import ZLabel from '../label/ZLabel.vue'
import type { ZLabelProps } from '../label/ZLabel.vue'

export interface ZCascaderSelectProps extends ZLabelProps {
  /**
   * 级联选择框绑定的值
   */
  modelValue?: CascaderValue
  /**
   * 级联选择框占位符
   */
  placeholder?: string
  /**
   * 级联选择框的可用选项
   */
  options?: CascaderOption[]
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
   * 级联选择框尺寸
   *
   * 可选值：`small`、`big`
   *
   * 默认值：`big`
   */
  size?: 'small' | 'big'
  /**
   * 是否禁用级联选择框
   */
  disable?: boolean
  /**
   * 清空级联选择框
   */
  clearable?: boolean
  /**
   * 级联选择框的配置项
   */
  props?: CascaderProps
}

const props = withDefaults(defineProps<ZCascaderSelectProps>(), {
  labelPosition: 'top',
  size: 'big',
})
defineEmits<{
  /**
   * 更新级联选择框绑定的值
   */
  'update:modelValue': [ZCascaderSelectProps['modelValue']]
}>()

const value = useVModel(props, 'modelValue')
</script>

<template>
  <div
    class="z-cascader-select"
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
    <ElCascader
      v-model="value"
      :class="size"
      :placeholder :options :clearable
      collapse-tags
      :disabled="disable"
      :props="props.props"
      popper-class="z-cascader-select-dropdown-menu"
    />
  </div>
</template>

<style lang="scss">
.z-cascader-select {
  .el-cascader {
    --el-cascader-tag-background: var(--grey-2);

    .el-input {
      --el-input-border-radius: 6px;
      --el-input-bg-color: var(--grey-1);
      --el-input-icon-color: black;
      --el-input-border-color: var(--grey-3);
      --el-input-hover-border-color: var(--primary-1);
      --el-input-focus-border-color: var(--primary-1);

      .el-input__wrapper {
        .el-input__inner {
          height: 20px !important;

          &::-webkit-input-placeholder {
            color: var(--grey-5);
            opacity: 1;
          }
        }

        .el-input__suffix {
          margin-right: 4px;
        }
      }
    }

    .el-cascader__tags {
      cursor: pointer;
      padding-left: 12px;
      gap: 8px;
      flex-wrap: nowrap;
      right: 42px;

      .el-tag {
        margin: 0;
        padding: 4px;
        border-radius: 4px;
        gap: 4px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        color: var(--grey-9);
        height: auto;
        border: none;
        cursor: auto;
        overflow: hidden;

        .el-tag__close {
          margin: 0;
          width: 15px;
          height: 15px;
          margin: 1.5px;
          color: var(--grey-1);
          background-color: var(--grey-5);

          &:hover {
            background-color: var(--grey-6);
          }

          svg {
            width: 5px;
            height: 5px;
            z-index: 1;

            path {
              transform: scale(4);
              transform-origin: center;
            }
          }
        }

        &:last-child {
          flex-shrink: 0;
        }
      }
    }

    &.big {
      .el-input__wrapper {
        padding: 14px 12px;
      }
    }

    &.small {
      .el-input__wrapper {
        padding: 8px 12px;
      }
    }
  }
}

.z-cascader-select-dropdown-menu {
  margin-top: -4px;
  overflow: hidden;
  max-width: calc(100% - 10px);
  --el-popper-border-radius: 6px;
  --el-bg-color-overlay: var(--grey-1);
  --el-border-color-light: var(--grey-3);
  --el-cascader-menu-shadow: 0px 5px 3px -2px #00000005, 0px 3px 2px -2px #0000000F;

  .el-cascader-panel {
    overflow-x: auto;
    --el-cascader-menu-text-color: var(--grey-9);
    --el-cascader-node-background-hover: var(--grey-2);
    --el-cascader-menu-selected-text-color: var(--primary-1);

    ul.el-cascader-menu__list {
      padding: 4px 0;

      li.el-cascader-node {
        height: 40px;
        padding: 0 32px 0 12px;

        &:not(.in-active-path, .is-active) {
          font-weight: 400;
        }

        &:not(.in-active-path) {
          .arrow-right {
            color: var(--grey-9);
          }
        }

        .arrow-right {
          right: 12px;
        }

        .el-checkbox {
          padding: 3px;
          --el-checkbox-input-width: 18px;
          --el-checkbox-input-height: 18px;
          --el-checkbox-border-radius: 4px;
          --el-color-primary: var(--primary-1);
          --el-checkbox-input-border: 2px solid var(--grey-4);

          .el-checkbox__inner {
            &::after {
              width: 4px;
              height: 9px;
              border-width: 2px;
              transform: rotate(45deg) scale(0.8) translate(-0.5px, -0.5px);
            }

            &::before {
              height: 4px;
            }
          }
        }
      }
    }
  }

  .el-popper__arrow {
    display: none;
  }
}
</style>
