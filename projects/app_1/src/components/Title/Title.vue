<script lang="ts" setup>
interface TitleProps {
  /**
   * 标题
   */
  title?: string
}

defineProps<TitleProps>()
</script>

<template>
  <view class="title_layout">
    <view class="title">
      <text style="font-size: 38rpx;" v-text="title" />
      <slot name="right" />
    </view>
    <view>
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.title_layout{
  display: flex;
  gap: 16rpx;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
