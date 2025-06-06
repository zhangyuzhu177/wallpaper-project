import type { IQueryPaginatedResData, IQueryPagination, IWallpaper } from 'types'
import { http } from '@/utils/http'

/**
 * 获取每日推荐
 */
export function getRecommendWallpaperApi() {
  return http.get<IWallpaper[]>('/wallpaper/entity/recommend')
}

/**
 * 获取指定分类下的壁纸列表
 */
export function getWallpapersByCategoryIdApi(categoryId: string, body: IQueryPagination) {
  return http.post<IQueryPaginatedResData<IWallpaper>>(`/wallpaper/entity/query/${categoryId}`, body)
}
