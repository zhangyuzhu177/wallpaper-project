import type { INameDto } from '../dto/name.interface'
import type { IEmailDto } from '../dto/email.interface'
import type { IStatusDto } from '../dto/status.interface'
import type { IAdminIdDto } from '../dto/id/admin.interface'
import type { IPasswordDto } from '../dto/password.interface'
import type { IPhoneOptionalDto } from '../dto/phone.interface'

import type { IAdminRoleIdOptionalDto } from '../dto/id/admin-role.interface'
import type { ILoginUser } from './login-user.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'
import type { IAdminRole } from './admin-role.interface'

/**
 * 管理员
 */
export interface IAdmin
  extends
  ICreatedAt,
  IUpdatedAt,
  INameDto,
  IEmailDto,
  IPasswordDto,
  IStatusDto,
  IPhoneOptionalDto,
  IAdminRoleIdOptionalDto {
  /** 管理员的唯一标识 */
  id: IAdminIdDto['adminId']
  /** 是否是系统管理员 */
  sysAdmin: boolean

  /** 分配的管理员角色 */
  adminRole?: IAdminRole

  /** 用户登录信息 */
  loginUsers?: ILoginUser[]
}
