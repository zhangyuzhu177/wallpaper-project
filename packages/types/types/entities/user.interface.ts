import type { INameDto } from '../dto/name.interface'
import type { IStatusDto } from '../dto/status.interface'
import type { IUserIdDto } from '../dto/id/user.interface'
import type { IAccountDto } from '../dto/account.interface'
import type { IEmailOptionalDto } from '../dto/email.interface'
import type { IPhoneOptionalDto } from '../dto/phone.interface'
import type { IAvatarOptionalDto } from '../dto/avatar.interface'
import type { IPasswordOptionalDto } from '../dto/password.interface'
import type { IOpenIdOptionalDto } from '../dto/id/openid.interface'

import type { ILoginUser } from './login-user.interface'
import type { ICollection } from './collection.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'
import type { IDownloadRecord } from './download-record.interface'

export interface IUser
  extends
  ICreatedAt,
  IUpdatedAt,
  IStatusDto,
  INameDto,
  IAccountDto,
  IEmailOptionalDto,
  IOpenIdOptionalDto,
  IPhoneOptionalDto,
  IPasswordOptionalDto,
  IAvatarOptionalDto {
  /** 用户的唯一标识 */
  id: IUserIdDto['userId']
  /** 下载次数限制 */
  downloadLimit?: number

  /** 用户下载的壁纸记录 */
  downloadRecords?: IDownloadRecord[]

  /** 用户收藏的壁纸 */
  collections?: ICollection[]

  /** 用户的登录记录 */
  loginUsers?: ILoginUser[]
}
