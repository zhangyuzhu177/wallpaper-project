<script lang="ts" setup>
export interface ZTextBtnProps {
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
   * 按钮字重
   *
   * 当 `size` 为 `small` 时，字重为 `500`，否则为 `600`
   */
  weight?: '100' | '200' | '300' | '400' | '500' | '600'
  /**
   * 按钮类型
   *
   * 可选值：`primary`、`secondary`
   *
   * 默认值：`primary`
   */
  type?: 'primary' | 'secondary'
  /**
   * 是否禁用按钮
   */
  disable?: boolean
  /**
   * 按钮图标
   */
  icon?: keyof typeof icons
  /**
   * 按钮点击事件
   */
  onClick?: (_e?: MouseEvent) => void
}

withDefaults(defineProps<ZTextBtnProps>(), {
  size: 'small',
  type: 'primary',
})

/** 按钮预设图标 */
const icons = {
  download: 'i-mingcute:download-2-line',
  plus: 'i-mingcute:add-line',
  update: 'i-mingcute:refresh-4-line',
}
</script>

<template>
  <div
    class="z-text-btn" :class="`${size} ${type} ${disable ? 'disabled' : ''}`"
    :text="size === 'small' ? 'sm' : 'md'"
    :cursor="disable ? 'not-allowed' : 'pointer'"
    :style="{
      fontWeight: weight ?? (size === 'small' ? '500' : '600'),
    }"
    select-none inline text-center
    @click="(event) => {
      if (!disable)
        onClick?.(event)
    }"
  >
    <slot>
      <div flex="~ row items-center gap2">
        <slot name="left" />
        <div v-if="icon" size-5 :class="icons[icon]" />
        <div v-if="label" v-text="label" />
        <slot name="right" />
      </div>
    </slot>
  </div>
</template>

<style lang="scss">
.z-text-btn {
  &.primary {
    color: var(--primary-1);

    &:hover {
      color: var(--primary-2);
    }

    &:active {
      color: var(--primary-3);
    }
  }

  &.secondary {
    color: var(--grey-6);

    &:hover {
      color: var(--grey-7);
    }
  }

  &.disabled {
    color: var(--grey-5) !important;
  }
}
</style>
