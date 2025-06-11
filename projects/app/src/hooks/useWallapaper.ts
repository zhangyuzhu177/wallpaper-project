import type { IQueryPagination, IWallpaper } from 'types'
import { getWallpapersByCategoryIdApi } from '@/api/wallpaper'

/** 图片列表 */
const wallpapers = ref<IWallpaper[]>()
/** 分页 */
const pagination = ref<IQueryPagination>({
  page: 1,
  pageSize: 10,
})
/** 壁纸总数 */
const total = ref(0)

export function useWallpaper() {
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
      wallpapers.value = res.data.data
      total.value = res.data.total
    }
    finally {
      uni.hideLoading()
    }
  }

  return {
    wallpapers,
    total,
    pagination,

    getWallpapersByCategoryId,
  }
}
