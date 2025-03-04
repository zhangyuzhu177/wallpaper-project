import type { IStatusDto } from '../dto/status.interface'
import type { IExpireAtDto } from '../dto/expire-at.interface'
import type { IUserIdOptionalDto } from '../dto/id/user.interface'
import type { IAdminIdOptionalDto } from '../dto/id/admin.interface'

import type { IUser } from './user.interface'
import type { IAdmin } from './admin.interface'
import type { ICreatedAt } from './_timestamp.interface'

/**
 * 登录
 */
export interface ILoginUser
  extends
  ICreatedAt,
  IExpireAtDto,
  IStatusDto,
  IUserIdOptionalDto,
  IAdminIdOptionalDto {
  /** 登录记录唯一标识 */
  id: string
  /** 登录凭证 */
  token: string
  /** 登录的 ip */
  ip?: string
  /** 最后活动时间 */
  lastActiveAt?: string | Date

  /** 个人用户信息 */
  user?: IUser

  /** 管理员信息 */
  admin?: IAdmin
}
