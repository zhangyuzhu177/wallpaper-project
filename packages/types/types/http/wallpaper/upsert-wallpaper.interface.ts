import type { IWallpaper } from '../../entities/wallpaper.interface'

/**
 * 创建/更新壁纸
 * 请求参数
 */
export interface IUpsertWallpaperBodyDto
  extends
  Pick<
    IWallpaper,
    'url' | 'categoryId'
  > {}
