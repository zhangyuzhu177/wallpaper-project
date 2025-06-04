<script setup lang="ts">
interface ZDividerProps {
  /**
   * 分割线标题
   */
  label?: string
  /**
   * 自定义颜色
   */
  color?: string
  /**
   * 是否显示边框
   */
  hairline?: boolean
  /**
   * 是否显示为虚线
   */
  dashed?: boolean
  /**
   * 内容位置
   */
  contentPosition?: 'left' | 'center' | 'right'
  /**
   * 是否显示为垂直分割线
   */
  vertical?: boolean
}

withDefaults(defineProps<ZDividerProps>(), {
  hairline: true,
  dashed: false,
  contentPosition: 'center',
  vertical: false,
})
</script>

<template>
  <view class="z-divider">
    <wd-divider
      custom-class="divider"
      :color="color"
      :hairline="hairline"
      :dashed="dashed"
      :content-position="contentPosition"
      :vertical="vertical"
    >
      <template v-if="!label">
        <slot />
      </template>
      <view v-else v-text="label" />
    </wd-divider>
  </view>
</template>

<style scoped lang="scss">
.z-divider {
  :deep() {
    .divider {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
