<script lang="ts" setup>
interface HeaderProps {
  /** 标题 */
  title?: string
}

defineProps<HeaderProps>()

const { statusBarHeight, titleBarHeight } = useSystem()
</script>

<template>
  <view class="header_layout">
    <view class="navbar">
      <view :style="{ height: `${statusBarHeight}px` }" />
      <view class="nav" :style="{ height: `${titleBarHeight}px` }">
        <text v-if="title" class="text" v-text="title" />
        <slot />
      </view>
    </view>

    <view :style="{ height: `${statusBarHeight + titleBarHeight}px` }" />
  </view>
</template>

<style scoped lang="scss">
.header_layout {
  .navbar{
    position: fixed;
    z-index: 99;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    width: 100%;

    .nav{
      display: flex;
      align-items: center;
      padding: 0 24rpx;

      .text {
        font-size: 42rpx;
        font-weight: 600;
      }
    }
  }
}
</style>
