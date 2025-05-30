<script lang="ts" setup>
import moment from 'moment'
import { formatFileSize } from 'utils'
import type { IWallpaper } from 'types'

const popup = ref()

/** 是否显示遮照 */
const isMask = ref(false)
/** 是否收藏 */
const isFavorite = ref(false)
/** 壁纸列表 */
const wallpapers = ref<IWallpaper[]>()
/** 当前壁纸 */
const current = ref(1)
const total = ref(0)

/** 时间 */
const time = computed(() => {
  return moment().format('HH:mm')
})
/** 日期 */
const date = computed(() => {
  return moment().format('MM月DD日')
})
/** 壁纸信息 */
const wallpaperInfo = computed(() => {
  return wallpapers.value?.[current.value - 1]
})

async function getWallpapersByCategoryId(id?: string) {
  if (!id)
    return
  const res = await getWallpapersByCategoryIdApi(
    id,
    {
      page: 1,
      pageSize: 'all',
    },
  )
  wallpapers.value = res.data
  total.value = res.total
}

/**
 * 返回上一页
 */
function jumpBack() {
  uni.navigateBack()
}

function handleChange(e: any) {
  current.value = e.detail.current + 1
}

onLoad((e) => {
  getWallpapersByCategoryId(e?.id)
})
</script>

<template>
  <view class="preview">
    <swiper vertical @change="handleChange">
      <swiper-item v-for="item in wallpapers" :key="item.id">
        <image
          :src="item.url" mode="aspectFill"
          @click="isMask = true"
        />
      </swiper-item>
    </swiper>

    <view v-if="isMask" class="mask" @click="isMask = false">
      <view class="content">
        <view class="count">
          {{ current }} / {{ total }}
        </view>
        <view class="time_date">
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

    <uni-popup ref="popup" background-color="#fff">
      <view class="popup">
        <view class="popup_header">
          <text v-text="'壁纸信息'" />
          <uni-icons type="closeempty" size="24" @click="popup.close()" />
        </view>
        <view class="popup_content">
          <text v-text="`大小：${formatFileSize(wallpaperInfo?.size)}`" />
          <text v-text="`分类：${wallpaperInfo?.category.name}`" />
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
      height: 100%;
    }
  }

  .mask{
    height: 100%;
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

      .time_date{
        display: flex;
        flex-direction: column;

        .time {
          text-align: center;
          font-size: 140rpx;
          line-height: 140rpx;
        }

        .date {
          text-align: center;
          font-size: 36rpx;
        }
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
