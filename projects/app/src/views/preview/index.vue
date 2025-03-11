<script lang="ts" setup>
import moment from 'moment'

import cover from '~/static/images/cover.jpg'

const popup = ref()

/** 是否显示遮照 */
const isMask = ref(false)
/** 是否收藏 */
const isFavorite = ref(false)

/** 时间 */
const time = computed(() => {
  return moment().format('HH:mm')
})
/** 日期 */
const date = computed(() => {
  return moment().format('MM月DD日')
})

/**
 * 返回上一页
 */
function jumpBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="preview">
    <swiper circular>
      <swiper-item v-for="(_, index) in 10" :key="index">
        <image :src="cover" @click="isMask = true" />
      </swiper-item>
    </swiper>

    <view v-if="isMask" class="mask" @click="isMask = false">
      <view class="content">
        <view class="count">
          6 / 9
        </view>
        <view>
          <view class="time" v-text="time" />
          <view class="date" v-text="date" />
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="info" @click="jumpBack">
        <uni-icons type="undo" color="$uni-color-grey-1" size="24" />
        <text v-text="'返回'" />
      </view>
      <view class="info" @click="popup.open('bottom')">
        <uni-icons type="info" color="$uni-color-grey-1" size="24" />
        <text v-text="'信息'" />
      </view>
      <view class="info">
        <uni-icons v-if="isFavorite" type="heart-filled" color="#F44336" size="24" />
        <uni-icons v-else type="heart" color="$uni-color-grey-1" size="24" />
        <text v-text="'收藏'" />
      </view>
      <view class="info">
        <uni-icons type="download" color="$uni-color-grey-1" size="24" />
        <text v-text="'下载'" />
      </view>
    </view>

    <uni-popup ref="popup" background-color="#fff" style="border-radius: 20rpx 20rpx 0 0;">
      <view class="popup">
        <view class="popup_header">
          <text v-text="'壁纸信息'" />
          <uni-icons type="closeempty" size="24" @click="popup.close()" />
        </view>
        <view class="popup_content">
          <text v-text="'大小：111'" />
          <text v-text="'分类：111'" />
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style scoped lang="scss">
.preview{
  width: 100%;
  height: 100vh;
  position: relative;

  swiper {
    width: 100%;
    height: 100%;

    swiper-item{
      display: flex;
    align-items: center;
    justify-content: center;
    }
    image {
      width: 100%;
    }
  }

  .mask{
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;

    .content{
      flex:1;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 24rpx;
      padding-top: 7vh;
      color: $uni-color-grey-1;

      .count{
        background-color: rgba(0,0,0,0.3);
        padding: 4rpx 16rpx;
        border-radius: 40rpx;
        backdrop-filter: blur(10rpx);
      }

      .time {
        text-align: center;
        font-size: 148rpx;
      }
      .date {
        text-align: center;
        font-size: 36rpx;
      }
    }

  }

  .footer{
    position: absolute;
    bottom: 80rpx;
    left: 100rpx;
    right: 100rpx;
    z-index: 99;
    padding: 16rpx 24rpx;
    border-radius: 40rpx;
    display: flex;
    justify-content: space-around;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(10rpx);

    .info {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: $uni-color-grey-1;
      font-size: 18rpx;
    }
  }

  .popup{

    .popup_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16rpx 24rpx;
      font-size: 32rpx;
      border-bottom: 1rpx solid $uni-color-grey-3;
    }

    .popup_content {
      display: flex;
      flex-direction: column;
      gap: 16rpx;
      padding: 16rpx 24rpx;
      min-height: 200rpx;
    }
  }

}
</style>
