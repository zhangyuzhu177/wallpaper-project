<script setup lang="ts">
const day = computed(() => {
  return new Date().getDate()
})
</script>

<template>
  <Title class="recommend" title="每日推荐">
    <template #right>
      <view class="recommend_title_icon">
        <uni-icons color="$uni-color-primary" type="calendar" size="24" />
        <text v-text="`${day}号`" />
      </view>
    </template>
    <scroll-view scroll-x :show-scrollbar="false">
      <view class="recommend_content">
        <navigator
          v-for="item in 8" :key="item"
          url="/pages/preview/preview"
          class="recommend_item"
        >
          <image src="../../static/images/cover.jpg" mode="aspectFill" />
        </navigator>
      </view>
    </scroll-view>
  </Title>
</template>

<style lang="scss" scoped>
.recommend{

  .recommend_title_icon{
    display: flex;
    align-items: center;
    gap: 4rpx;
    color: $uni-color-primary;
  }

  .recommend_content {
      display: flex;
      gap: 16rpx;

    .recommend_item {
      width: 200rpx;
      height: 430rpx;

      image {
        width: 200rpx;
        height: 430rpx;
        border-radius: 10rpx;
      }
    }
  }
}
</style>
