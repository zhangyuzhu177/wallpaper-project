<script lang="ts" setup>
import moment from 'moment'
import { formatFileSize } from 'utils'

import { useWallpaper } from '~/hooks/walpaper'

const { userInfo } = useUser()
const { wallpapers, total, collectionWallpaper } = useWallpaper()

/** 是否显示信息框 */
const show = ref(false)
/** 是否显示遮照 */
const isMask = ref(false)
/** 当前壁纸索引 */
const current = ref(0)
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
/** 壁纸信息 */
const wallpaperInfo = computed(() => {
  return wallpapers.value?.[current.value]
})

watch(
  wallpaperInfo,
  (newVal) => {
    if (newVal) {
      const { collections } = userInfo.value || {}
      if (collections)
        isFavorite.value = collections?.some(v => v.wallpaperId === wallpaperInfo.value?.id)
      else
        isFavorite.value = false
    }
  },
  { immediate: true },
)

/**
 * 收藏/取消收藏
 */
async function changeStatus() {
  const { id } = wallpaperInfo.value || {}
  if (!id)
    return

  await collectionWallpaper(id, !isFavorite.value)

  uni.showToast({
    title: isFavorite.value ? '收藏成功' : '已取消收藏',
    icon: 'success',
  })
}

/**
 * 下载壁纸
 */
async function download() {
  const { id } = wallpaperInfo.value || {}
  if (!id)
    return
  const url = await downloadWallpaperApi(id)
  if (url) {
    uni.downloadFile({
      url,
      success: (res) => {
        console.log(res)

        // downloadUrl(res.tempFilePath)
        uni.showToast({
          title: '下载成功',
          icon: 'success',
        })
      },
      fail: () => {
        uni.showToast({
          title: '下载失败',
          icon: 'error',
        })
      },
    })
  }
}

/**
 * 返回上一页
 */
function jumpBack() {
  uni.navigateBack()
}

onLoad((e) => {
  if (e?.index)
    current.value = Number.parseInt(e?.index)
})
</script>

<template>
  <view class="preview">
    <swiper
      :current="current" vertical
      @change="(e: any) => {
        current = e.detail.current
      }"
    >
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
      <view class="info" @click="show = true">
        <uni-icons type="info" color="$uni-color-grey-1" size="24" />
        <text v-text="'信息'" />
      </view>
      <view class="info" @click="changeStatus">
        <uni-icons
          v-if="isFavorite"
          type="heart-filled" color="#F44336" size="24"
        />
        <uni-icons
          v-else
          type="heart" color="$uni-color-grey-1" size="24"
        />
        <text v-text="'收藏'" />
      </view>
      <view class="info" @click="download">
        <uni-icons type="download" color="$uni-color-grey-1" size="24" />
        <text v-text="'下载'" />
      </view>
    </view>

    <up-action-sheet
      :show="show"
      title="壁纸信息"
      safe-area-inset-bottom
      :round="10"
      @close="show = false"
    >
      <view class="popup_content">
        <text v-text="`大小：${formatFileSize(wallpaperInfo?.size)}`" />
        <text v-text="`分类：${wallpaperInfo?.category.name}`" />
      </view>
    </up-action-sheet>
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

  .popup_content {
    display: flex;
    gap: 16rpx;
    flex-direction: column;
    align-items: self-start;
    padding: 16rpx 24rpx;
    min-height: 200rpx;
  }

}
</style>
