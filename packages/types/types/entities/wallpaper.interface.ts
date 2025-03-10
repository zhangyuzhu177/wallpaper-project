import type { IUrlDto } from '../dto/url.interface'
import type { INameDto } from '../dto/name.interface'
import type { ICategoryIdDto } from '../dto/id/category.interface'
import type { IWallpaperIdDto } from '../dto/id/wallpaper.interface'

import type { ICategory } from './category.interface'
import type { ICollection } from './collection.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'
import type { IDownloadRecord } from './download-record.interface'

/**
 * 壁纸
 */
export interface IWallpaper
  extends
  ICreatedAt,
  IUpdatedAt,
  INameDto,
  ICategoryIdDto,
  IUrlDto {
  /** 壁纸的唯一标识 */
  id: IWallpaperIdDto['wallpaperId']
  /** 大小 */
  size: number

  /** 壁纸所属分类 */
  category: ICategory

  /** 壁纸被下载的记录 */
  downloadRecords?: IDownloadRecord[]

  /** 收藏的壁纸 */
  collections?: ICollection[]
}
