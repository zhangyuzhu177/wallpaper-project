import type { IUrlDto } from '../dto/url.interface'
import type { ICategoryIdDto } from '../dto/id/category.interface'
import type { IWallpaperIdDto } from '../dto/id/wallpaper.interface'

import type { ICategory } from './category.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'

/**
 * 壁纸
 */
export interface IWallpaper
  extends
  ICreatedAt,
  IUpdatedAt,
  ICategoryIdDto,
  IUrlDto {
  /** 壁纸的唯一标识 */
  id: IWallpaperIdDto['wallpaperId']

  /** 壁纸所属分类 */
  category: ICategory
}
