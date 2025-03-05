import type { IEmailOptionalDto } from '../dto/email.interface'
import type { IStatusDto } from '../dto/status.interface'
import type { IPasswordOptionalDto } from '../dto/password.interface'
import type { IPhoneOptionalDto } from '../dto/phone.interface'
import type { IAvatarOptionalDto } from '../dto/avatar.interface'
import type { IOpenIdDto } from '../dto/id/openid.interface'
import type { INameDto } from '../dto/name.interface'
import type { IUserIdDto } from './../dto/id/user.interface'

import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'
import type { ILoginUser } from './login-user.interface'

export interface IUser
  extends
  ICreatedAt,
  IUpdatedAt,
  IStatusDto,
  IOpenIdDto,
  INameDto,
  IEmailOptionalDto,
  IPhoneOptionalDto,
  IPasswordOptionalDto,
  IAvatarOptionalDto {
  /** 用户的唯一标识 */
  id: IUserIdDto['userId']
  /** 下载次数限制 */
  downloadLimit?: number

  /** 用户的登录记录 */
  loginUsers?: ILoginUser[]
}
