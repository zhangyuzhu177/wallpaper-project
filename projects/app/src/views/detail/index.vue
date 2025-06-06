<script setup lang="ts">
import type { IQueryPagination, IWallpaper } from 'types'
import { getWallpapersByCategoryIdApi } from '@/api/wallpaper'

interface IOptions {
  title: string
  classifyId: string
}
/** 标题 */
const title = ref('')
/** 图片列表 */
const wallpapers = ref<IWallpaper[]>()
/** 分页 */
const pagination = ref<IQueryPagination>({
  page: 1,
  pageSize: 10,
})

/**
 * 获取指定分类下的所有壁纸
 */
async function getWallpapersByCategoryId(classifyId?: string) {
  if (!classifyId)
    return

  uni.showLoading({
    title: '加载中...',
  })

  try {
    const res = await getWallpapersByCategoryIdApi(classifyId, pagination.value)
    const { page, pageSize, data, total } = res.data
    wallpapers.value = data
  }
  finally {
    uni.hideLoading()
  }
}

onLoad((options: IOptions) => {
  title.value = options.title

  switch (title.value) {
    case '我的收藏':
      // todo: 获取我的收藏
      break
    case '下载历史':
      // todo: 获取下载历史
      break
    default:
      getWallpapersByCategoryId(options.classifyId)
  }
})
</script>

<template>
  <view class="w-full h-full flex flex-col">
    <ZNavbar fixed safe-area-inset-top :capsule="true">
      {{ title }}
    </ZNavbar>

    <template v-if="wallpapers?.length">
      <view class="grid grid-cols-2 gap-3 p4">
        <view
          v-for="item in wallpapers" :key="item.id"
          class="w-full h-[236px] b-rd-3"
        >
          <wd-img :src="item.url" width="100%" height="236px" radius="12px" mode="aspectFill">
            <template #loading>
              <view class="w-full h-full flex center bg-[#EFEFEF]" />
            </template>
          </wd-img>
        </view>
      </view>
      <ZDivider v-if="wallpapers.length > 10" label="没有更多啦" />
    </template>
    <wd-status-tip v-else image="content" tip="暂无数据" />
  </view>
</template>
