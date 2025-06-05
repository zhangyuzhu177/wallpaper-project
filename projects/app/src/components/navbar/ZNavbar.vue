<script lang="ts" setup>
interface ZNavbarProps {
  /**
   * 左侧文案
   */
  leftText?: string
  /**
   * 右侧文案
   */
  rightText?: string
  /**
   * 显示左侧箭头
   */
  leftArrow?: boolean
  /**
   * 显示下边框
   */
  bordered?: boolean
  /**
   * 固定到顶部
   */
  fixed?: boolean
  /**
   * 固定在顶部时，在标签位置生成一个等高的占位元素
   */
  placeholder?: boolean
  /**
   * 导航栏z-index
   */
  zIndex?: number
  /**
   * 顶部安全区域适配
   */
  safeAreaInsetTop?: boolean
  /**
   * 禁用左侧按钮
   */
  leftDisabled?: boolean
  /**
   * 禁用右侧按钮
   */
  rightDisabled?: boolean
  /**
   * 是否使用胶囊按钮
   */
  capsule?: boolean
}

withDefaults(
  defineProps<ZNavbarProps>(),
  {
    leftText: '',
    rightText: '',
    leftArrow: true,
    bordered: true,
    placeholder: true,
    zIndex: 999,
  },
)

function handleBack() {
  uni.navigateBack({
    fail() {
      uni.reLaunch({
        url: '/pages/home/index',
      })
    },
  })
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/home/index' })
}
</script>

<template>
  <view class="z-navbar">
    <wd-navbar
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      :bordered="bordered"
      :fixed="fixed"
      :placeholder="placeholder"
      :z-index="zIndex"
      :safe-area-inset-top="safeAreaInsetTop"
      :left-disabled="leftDisabled"
      :right-disabled="rightDisabled"
      custom-class="navbar"
      @click-left="handleBack"
    >
      <template v-if="capsule" #capsule>
        <wd-navbar-capsule
          @back="handleBack"
          @back-home="handleBackHome"
        />
      </template>
      <template #title>
        <slot />
      </template>
    </wd-navbar>
  </view>
</template>

<style lang="scss" scoped>
.z-navbar {
  :deep() {
    .navbar {
      .wd-navbar__title {
        font-size: 16px;
        font-weight: normal;
        max-width: none;
        margin: 0;
      }
    }
  }
}
</style>
