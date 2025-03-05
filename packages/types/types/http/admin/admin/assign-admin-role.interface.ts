import type { IIdsDto } from '../../../dto/id/ids.interface'
import type { IAdminRoleIdOptionalDto } from '../../../dto/id/admin-role.interface'

/**
 * 分配管理员角色
 * 请求参数
 */
export interface IAssignAdminRoleBodyDto
  extends
  IIdsDto,
  IAdminRoleIdOptionalDto {}
