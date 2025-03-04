import type { INameDto } from '../dto/name.interface'
import type { IDescOptionalDto } from '../dto/desc.interface'
import type { IAdminRoleIdDto } from '../dto/id/admin-role.interface'

import type { IAdmin } from './admin.interface'
import type { IPermission } from './permission.interface'
import type { ICreatedAt, IUpdatedAt } from './_timestamp.interface'

/**
 * 管理员角色
 */
export interface IAdminRole
  extends
  ICreatedAt,
  IUpdatedAt,
  INameDto,
  IDescOptionalDto {
  /** 管理员角色的唯一标识 */
  id: IAdminRoleIdDto['roleId']

  /** 权限列表 */
  permissions?: IPermission[]

  /** 分配了该角色的管理员 */
  admins?: IAdmin[]
}
