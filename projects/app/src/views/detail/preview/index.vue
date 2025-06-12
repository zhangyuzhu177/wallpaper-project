<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { PluginLunar } from 'dayjs-plugin-lunar'
import { formatFileSize } from 'utils'
import { useUserStore } from '@/store'
import { collectWallpaperApi, downloadWallpaperApi } from '@/api/wallpaper'
import { USER_INFO_KEY } from '@/constants/storage'

// 注册插件
dayjs.extend(PluginLunar)
dayjs.locale('zh-cn')

const useUser = useUserStore()
const { recommendList } = useHome()
const { wallpapers, total } = useWallpaper()
const { statusBarHeight, titleBarHeight } = useSystem()

/** 当前壁纸索引 */
const current = ref(0)
/** 是否显示遮照 */
const isMask = ref(false)
/** 是否收藏 */
const isFavorite = ref(false)
/** 信息弹框 */
const infoPopup = ref(false)

/** 壁纸信息 */
const wallpaperInfo = computed(() => {
  return wallpapers.value?.[current.value]
})
/** 时间 */
const time = computed(() => {
  return dayjs().format('HH:mm')
})
/** 日期 */
const date = computed(() => {
  const date = dayjs()
  const solarDate = date.format('M月D日')
  const shortWeekday = `周${date.format('dd')}`
  const lunarYear = `${date.format('LY')}年`
  const lunarMonth = date.format('LM')
  const lunarDate = date.format('LD')

  return `${solarDate}${shortWeekday} · ${lunarYear}${lunarMonth}${lunarDate}`
})

watch(
  wallpaperInfo,
  (newVal) => {
    if (newVal) {
      const { collections } = useUser.userInfo || {}
      if (collections)
        isFavorite.value = collections?.some(v => v.wallpaperId === wallpaperInfo.value?.id)
      else
        isFavorite.value = false
    }
  },
  { immediate: true },
)

/**
 * 返回上一页
 */
function jumpBack() {
  uni.navigateBack()
}

/**
 * 关闭信息弹框
 */
function handleClose() {
  infoPopup.value = false
}

/**
 * 下载
 */
async function download() {
  const { id } = wallpaperInfo.value || {}
  if (!id)
    return
  const { data: url } = await downloadWallpaperApi(id)

  if (!url)
    return

  uni.downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        // #ifdef MP-WEIXIN
        uni.saveImageToPhotosAlbum({ // 保存图片到系统相册。
          filePath: res.tempFilePath, // 图片文件路径
          success() {
            uni.showToast({
              title: '图片保存成功',
              icon: 'none',
            })
          },
          fail() {
            uni.showToast({
              title: '图片保存失败',
              icon: 'none',
            })
          },
        })
        // #endif
        // #ifndef MP-WEIXIN
        const link = document.createElement('a')
        link.href = url

        // 触发点击下载
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // 显示成功提示
        uni.showToast({
          title: '图片已开始下载',
          icon: 'none',
        })
        // #endif
      }
    },
  })
}

/**
 * 处理收藏/取消收藏
 */
async function handleCollection() {
  const { id } = wallpaperInfo.value || {}
  if (!id)
    return

  try {
    const { data } = await collectWallpaperApi(id, { status: !isFavorite.value })
    if (data) {
      isFavorite.value = !isFavorite.value
      useUser.userInfo = data
      uni.setStorageSync(USER_INFO_KEY, data)
      uni.showToast({
        title: isFavorite.value ? '收藏成功' : '已取消收藏',
        icon: 'none',
      })
    }
  }
  catch (error) {
    uni.showToast({
      title: '操作失败',
      icon: 'error',
    })
  }
}

onLoad((options: { index: string;type?: string }) => {
  if (options?.index)
    current.value = Number.parseInt(options.index)

  if (options?.type && options.type === 'recommend')
    wallpapers.value = recommendList.value

  if (!wallpapers.value?.length)
    uni.switchTab({ url: '/pages/home/index' })
})
</script>

<template>
  <view class="preview w-full h-100vh relative">
    <swiper
      :current="current"
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

    <view
      v-if="isMask"
      class="text-grey-1 absolute inset-0 flex flex-col"
    >
      <view
        :style="{ height: `${titleBarHeight}px`, paddingTop: `${statusBarHeight}px` }"
      >
        <view class="h-full flex justify-between items-center px-6">
          <view class="bg-black-4 flex center w-[32px] h-[32px] b-rd-full" @click="jumpBack">
            <view class="i-mingcute:left-line size-5 text-grey-1" />
          </view>
          <view class="bg-black-3 px-2 py-1 b-rd-full" v-text="`${current + 1}/${total}`" />
          <view class="w-[32px] h-[32px]" />
        </view>
      </view>

      <view class="flex-1 flex flex-col items-center py-6" @click="isMask = false">
        <view class="text-xl" v-text="date" />
        <view class="text-20 leading-20" v-text="time" />
      </view>

      <view class="footer  bottom-0 left-0 right-0 bg-black-4" style="backdrop-filter: blur(10rpx)">
        <view class="flex justify-between px-16 py-2">
          <view class="flex flex-col items-center gap-1 px-4 py-1" @click="infoPopup = true">
            <view class="i-mingcute:information-line size-6" />
            <view>信息</view>
          </view>
          <view class="flex flex-col items-center gap-1 px-4 py-1" @click="handleCollection">
            <view v-if="isFavorite" class="i-mingcute:star-fill size-6 bg-#fbc531" />
            <view v-else class="i-mingcute:star-line size-6" />
            <view>收藏</view>
          </view>
          <view class="flex flex-col items-center gap-1 px-4 py-1" @click="download">
            <view class="i-mingcute:download-line size-6" />
            <view>下载</view>
          </view>
        </view>
        <wd-gap custom-class="z-gap" safe-area-bottom height="0" />
      </view>
    </view>

    <wd-popup v-model="infoPopup" position="bottom" custom-style="border-radius:32rpx 32rpx 0 0;" @close="handleClose">
      <view class="p4 p-b-0 flex flex-col gap4">
        <view class="flex items-center justify-between">
          <view class="subtitle-2">
            壁纸信息
          </view>
          <view class="i-mingcute:close-line icon" @click="handleClose" />
        </view>
        <view class="flex flex-col gap-1">
          <view class="flex">
            <view>分类：</view>
            <view v-text="wallpaperInfo?.category.name" />
          </view>
          <view class="flex">
            <view>大小：</view>
            <view v-text="formatFileSize(wallpaperInfo?.size)" />
          </view>
          <view class="flex">
            <view>收藏：</view>
            <view v-text="wallpaperInfo?.collections.length || 0" />
          </view>
          <view class="flex">
            <view>下载：</view>
            <view v-text="wallpaperInfo?.downloadRecords.length || 0" />
          </view>
          <view class="flex">
            <view>上传时间：</view>
            <view v-text="dayjs(wallpaperInfo?.createdAt).format('YYYY-MM-DD hh:mm')" />
          </view>
        </view>
        <wd-gap safe-area-bottom height="0" />
      </view>
    </wd-popup>
  </view>
</template>

<style scoped lang="scss">
.preview{
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

  .footer{
    :deep() {
      .z-gap {
        backdrop-filter: blur(20rpx) !important;
      }
    }
  }
}
</style>
