<script lang="ts" setup>
import Banner from './banner.vue'
import Notice from './notice.vue'
import Recommend from './recommend.vue'
import Topics from './topics.vue'
</script>

<template>
  <view class="home_layout page_bg">
    <!-- 轮播 -->
    <Banner />

    <view class="content">
      <!-- 公告 -->
      <Notice />

      <!-- 每日推荐 -->
      <Recommend />

      <!-- 专题精选 -->
      <Topics />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home_layout {
  width: 750rpx;
  display: flex;
  gap: 36rpx;
  flex-direction: column;
  padding: 30rpx 0;

  .content {
    padding: 0 38rpx;
    display: flex;
    gap: 36rpx;
    flex-direction: column;
  }
}
</style>
