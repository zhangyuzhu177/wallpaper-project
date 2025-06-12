import type { IQueryPagination, IWallpaper } from 'types'
import { getCollectionWallpaperApi, getDownloadWallpaperApi, getWallpapersByCategoryIdApi } from '@/api/wallpaper'
import { useUserStore } from '@/store'

const userUser = useUserStore()

/** 图片列表 */
const wallpapers = ref<IWallpaper[]>()
/** 分页 */
const pagination = ref<IQueryPagination>({
  page: 1,
  pageSize: 'all',
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

    wallpapers.value = null
    total.value = 0

    uni.showLoading({
      title: '加载中...',
    })

    try {
      const { data } = await getWallpapersByCategoryIdApi(classifyId, pagination.value)
      wallpapers.value = data.data
      total.value = data.total
    }
    finally {
      uni.hideLoading()
      uni.stopPullDownRefresh()
    }
  }

  /**
   * 获取收藏壁纸列表
   */
  async function getCollectionWallpaperList() {
    const { id } = userUser.userInfo || {}
    if (!id)
      return

    wallpapers.value = null
    total.value = 0

    uni.showLoading({
      title: '加载中...',
    })

    try {
      const { data } = await getCollectionWallpaperApi(pagination.value, id)
      wallpapers.value = data.data
      total.value = data.total
    }
    finally {
      uni.hideLoading()
      uni.stopPullDownRefresh()
    }
  }

  /**
   * 获取下载壁纸列表
   */
  async function getDownloadWallpaperList() {
    const { id } = userUser.userInfo || {}
    if (!id)
      return

    wallpapers.value = null
    total.value = 0

    uni.showLoading({
      title: '加载中...',
    })

    try {
      const { data } = await getDownloadWallpaperApi(pagination.value, id)
      wallpapers.value = data.data
      total.value = data.total
    }
    finally {
      uni.hideLoading()
      uni.stopPullDownRefresh()
    }
  }

  return {
    wallpapers,
    total,
    pagination,

    getWallpapersByCategoryId,
    getCollectionWallpaperList,
    getDownloadWallpaperList,
  }
}
