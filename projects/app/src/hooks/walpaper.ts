import type { IWallpaper } from 'types'
import { PAGINATION_SIZE } from '../constants/pagination'

const { userInfo } = useUser()

/** 壁纸列表 */
const wallpapers = ref<IWallpaper[]>()
/** 壁纸总数 */
const total = ref(0)
/** 分类id */
const categoryId = ref<string>()

export function useWallpaper() {
  /**
   * 获取指定分类下的壁纸列表
   */
  async function getWallpapersByCategoryId(id?: string) {
    if (!id)
      return

    categoryId.value = id

    uni.showLoading({
      title: '加载中...',
    })

    try {
      const res = await getWallpapersByCategoryIdApi(
        id,
        {
          page: 1,
          pageSize: PAGINATION_SIZE,
        },
      )
      wallpapers.value = res.data
      total.value = res.total
    }
    finally {
      uni.hideLoading()
    }
  }

  /**
   * 修改壁纸收藏状态
   */
  async function collectionWallpaper(id: string, status: boolean) {
    const res = await collectionWallpaperApi(
      id,
      { status },
    )
    if (res)
      userInfo.value = res

    await getWallpapersByCategoryId(categoryId.value)
  }

  return {
    wallpapers,
    total,

    getWallpapersByCategoryId,
    collectionWallpaper,
  }
}
