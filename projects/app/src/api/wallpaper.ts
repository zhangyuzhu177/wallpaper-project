import type { IWallpaper } from 'types'
import { http } from '@/utils/http'

/**
 * 获取每日推荐
 */
export function getRecommendWallpaperApi() {
  return http.get<IWallpaper[]>('/wallpaper/entity/recommend')
}
