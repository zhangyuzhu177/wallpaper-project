<script lang="ts" setup>
import type { QBtnProps } from 'quasar'

export interface ZBtnProps {
  /**
   * 按钮颜色
   *
   * 默认值：`primary-1`
   */
  color?: string
  /**
   * 按钮文本
   */
  label?: string
  /**
   * 按钮尺寸
   *
   * 可选值：`small`、`big`
   *
   * 默认值：`small`
   */
  size?: 'small' | 'big'
  /**
   * 按钮类型
   *
   * 可选值：`primary`、`secondary`、`third`
   *
   * 默认值：`primary`
   */
  type?: 'primary' | 'secondary' | 'third'
  /**
   * 是否禁用按钮
   */
  disable?: boolean
  /**
   * 按钮图标
   */
  icon?: keyof typeof icons
  /**
   * 按钮说明
   */
  explain?: string
  /**
   * 其它参数
   *
   * 继承自 `quasar` 的 `QBtnProps`
   */
  params?: Omit<QBtnProps, 'color' | 'label' | 'size' | 'disable'>
}

const props = withDefaults(defineProps<ZBtnProps>(), {
  color: 'primary-1',
  size: 'small',
  type: 'primary',
})

/** 按钮预设图标 */
const icons = {
  admin: 'i-mingcute:user-setting-line',
  assign: 'i-mingcute:git-merge-line',
  copy: 'i-mingcute:copy-2-line',
  delete: 'i-mingcute:delete-2-line',
  download: 'i-mingcute:file-download-line',
  edit: 'i-mingcute:edit-2-line',
  edit2: 'i-mingcute:edit-4-line',
  export: 'i-mingcute:file-export-line',
  file: 'i-mingcute:file-line',
  filter: 'i-mingcute:filter-line',
  folder: 'i-mingcute:folder-line',
  list: 'i-mingcute:list-check-2-line',
  map: 'i-mingcute:mind-map-line',
  more: 'i-mingcute:more-3-line',
  image: 'i-mingcute:photo-album-line',
  plus: 'i-mingcute:add-line',
  plus2: 'i-mingcute:classify-add-2-line',
  power: 'i-mingcute:power-line',
  set: 'i-mingcute:settings-2-line',
  set2: 'i-mingcute:settings-3-line',
  sync: 'i-mingcute:transfer-line',
  task: 'i-mingcute:task-line',
  unlink: 'i-mingcute:unlink-line',
  update: 'i-mingcute:refresh-4-line',
  update2: 'i-mingcute:refresh-1-line',
  upload: 'i-mingcute:upload-3-line',
  upload2: 'i-mingcute:upload-2-line',
  view: 'i-mingcute:eye-2-line',
  zip: 'i-mingcute:file-zip-line',
}
</script>

<template>
  <q-btn
    class="z-btn" :class="`${size} ${type}`"
    unelevated no-caps min-h="auto!"
    :px="size === 'small' ? 3 : 4"
    :py="size === 'small' ? 2 : 3"
    :text="size === 'small' ? 'sm' : 'md'"
    :font="size === 'small' ? 500 : 600"
    :outline="type !== 'primary'"
    :color :disable v-bind="props.params"
  >
    <slot>
      <div flex="~ row items-center gap2">
        <slot name="left" />
        <div v-if="icon" size-5 :class="icons[icon]" />
        <div v-if="label" v-text="label" />
        <slot name="right" />
      </div>
    </slot>

    <q-tooltip
      v-if="explain"
      anchor="top middle"
      self="bottom middle"
      :offset="[0, 6]"
      max-width="50%"
      v-text="explain"
    />
  </q-btn>
</template>

<style lang="scss">
.q-btn.z-btn {
  &.big {
    border-radius: 8px;
  }

  &.small {
    border-radius: 6px;
  }

  &.third {
    color: var(--grey-8) !important;

    &::before {
      border-color: var(--grey-4) !important;
    }
  }

  &.disabled {
    opacity: 1 !important;

    &.primary {
      background-color: var(--grey-4) !important;
    }

    &.secondary, &.third {
      color: var(--grey-5) !important;

      &::before {
        border-color: var(--grey-3) !important;
      }
    }
  }
}
</style>
