import type { IEmailDto } from '../dto/email.interface'
import type { IStatusDto } from '../dto/status.interface'
import type { IAdminIdDto } from '../dto/id/admin.interface'
import type { IPasswordDto } from '../dto/password.interface'
import type { IPhoneOptionalDto } from '../dto/phone.interface'

import type { ILoginUser } from './login-user.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'

/**
 * 管理员
 */
export interface IAdmin
  extends
  ICreatedAt,
  IUpdatedAt,
  IEmailDto,
  IPasswordDto,
  IStatusDto,
  IPhoneOptionalDto {
  /** 管理员的唯一标识 */
  id: IAdminIdDto['adminId']
  /** 是否是系统管理员 */
  sysAdmin: boolean

  /** 用户登录信息 */
  loginUsers?: ILoginUser[]
}
