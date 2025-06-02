import type { IQueryPaginatedResData, IQueryPagination, IStatusDto, IUser, IWallpaper } from 'types'
import { request } from '.'

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

/**
 * 下载指定壁纸
 */
export function downloadWallpaperApi(wallpaperId: string) {
  return request<string>({
    url: `/wallpaper/entity/download/${wallpaperId}`,
  })
}

/**
 * 添加/取消收藏
 */
export function collectionWallpaperApi(
  wallpaperId: string,
  data: IStatusDto,
) {
  return request<IUser>({
    url: `/wallpaper/entity/collection/${wallpaperId}`,
    method: 'POST',
    data,
  })
}
