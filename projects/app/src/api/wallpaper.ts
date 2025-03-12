import type { IQueryPaginatedResData, IQueryPagination, IWallpaper } from 'types'

/**
 * 获取每日推荐
 */
export function getRecommendWallpaperApi() {
  return request<IWallpaper[]>({
    url: '/wallpaper/entity/recommend',
  })
}

/**
 * 获取指定分类下的壁纸列表
 */
export function getWallpapersByCategoryIdApi(categoryId: string, body: IQueryPagination) {
  return request<IQueryPaginatedResData<IWallpaper>>({
    url: `/wallpaper/entity/query/${categoryId}`,
    data: body,
    method: 'POST',
  })
}
