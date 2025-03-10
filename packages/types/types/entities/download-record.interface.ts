import type { IUserIdOptionalDto } from '../dto/id/user.interface'
import type { IWallpaperIdOptionalDto } from '../dto/id/wallpaper.interface'
import type { IDownloadRecordIdDto } from '../dto/id/download-record.interface'

import type { IUser } from './user.interface'
import type { IWallpaper } from './wallpaper.interface'
import type { ICreatedAt } from './_timestamp.interface'

/**
 * 下载记录
 */
export interface IDownloadRecord
  extends ICreatedAt,
  IUserIdOptionalDto,
  IWallpaperIdOptionalDto {
  /** 下载记录唯一标识 */
  id: IDownloadRecordIdDto['downloadRecordId']

  /** 下载的用户 */
  user?: IUser

  /** 下载的壁纸 */
  wallpaper?: IWallpaper
}
