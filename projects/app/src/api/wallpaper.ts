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

/**
 * 获取下载壁纸列表
 */
export function getDownloadWallpaperApi(body: IQueryPagination, userId: string) {
  return http.post<IQueryPaginatedResData<IWallpaper>>(`/wallpaper/entity/query/download/${userId}`, body)
}

/**
 * 货物收藏壁纸列表
 */
export function getCollectionWallpaperApi(body: IQueryPagination, userId: string) {
  return http.post<IQueryPaginatedResData<IWallpaper>>(`/wallpaper/entity/query/collection/${userId}`, body)
}

/**
 * 下载指定壁纸
 */
export function downloadWallpaperApi(wallpaperId: string) {
  return http.get<string>(`/wallpaper/entity/download/${wallpaperId}`)
}
