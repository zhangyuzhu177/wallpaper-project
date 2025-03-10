import type { IUserIdOptionalDto } from '../dto/id/user.interface'
import type { ICollectionIdDto } from '../dto/id/collection.interface'
import type { IWallpaperIdOptionalDto } from '../dto/id/wallpaper.interface'

import type { IUser } from './user.interface'
import type { ICreatedAt } from './_timestamp.interface'
import type { IWallpaper } from './wallpaper.interface'

export interface ICollection
  extends
  ICreatedAt,
  IUserIdOptionalDto,
  IWallpaperIdOptionalDto {
  /** 收藏的唯一标识 */
  id: ICollectionIdDto['collectionId']

  /** 收藏的用户 */
  user?: IUser

  /** 收藏的壁纸 */
  wallpaper?: IWallpaper
}
