import type { IUrlDto } from '../dto/url.interface'
import type { INameDto } from '../dto/name.interface'
import type { IDescOptionalDto } from '../dto/desc.interface'
import type { ICategoryIdDto } from '../dto/id/category.interface'

import type { IWallpaper } from './wallpaper.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'

/**
 * 壁纸分类
 */
export interface ICategory
  extends
  ICreatedAt,
  IUpdatedAt,
  INameDto,
  IUrlDto,
  IDescOptionalDto {
  /** 壁纸分类的唯一标识 */
  id: ICategoryIdDto['categoryId']

  /** 壁纸分类下的壁纸 */
  wallpapers?: IWallpaper[]
}
