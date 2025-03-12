import type { Config } from '../enum/config.enum'
import type { IUser } from '../entities/user.interface'
import type { ICategoryIdDto } from './id/category.interface'

/** 系统全局配置 */
export interface IConfigDto {
  /** 轮播图配置 */
  [Config.BANNER_CONFIG]?: {
    /** 唯一标识 */
    id: string
    /** 分类 */
    categoryId?: ICategoryIdDto['categoryId']
    /** 图片地址 */
    url?: string
  }[]

  /** 壁纸下载次数限制 */
  [Config.DOWNLOAD_LIMIT]?: Partial<
    Pick<
      IUser,
      'downloadLimit'
    >
  >
}
