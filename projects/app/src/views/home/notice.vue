<script setup lang="ts">
const { noticeList } = useHome()

/**
 * 跳转公告详情
 */
function jumpDetail(id: string) {
  uni.navigateTo({ url: `/pages/notice/detail?noticeId=${id}` })
}
</script>

<template>
  <view class="flex gap2 items-center p3 b-rd-2 bg-grey-2">
    <view class="i-mingcute:volume-line text-grey-6 size-5" />
    <view class="notify_content flex-1">
      <swiper autoplay vertical circular disable-touch>
        <swiper-item
          v-for="{ id, title } in noticeList" :key="id"
          class="flex items-center justify-between"
          @click="jumpDetail(id)"
        >
          <view
            class="text-grey-6 truncate"
            v-text="title"
          />
          <view class="i-mingcute:right-line text-grey-6 size-5" />
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.notify_content{
  swiper {
    height: 40rpx;
    width: 100%;

    &-item {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
