import type { IAdminRole } from '../../../entities/admin-role.interface'
import type { PermissionType } from '../../../enum/permission.enum'

/**
 * 创建/更新管理员角色
 * 请求参数
 */
export interface IUpsertAdminRoleBodyDto
  extends
  Pick<
    IAdminRole,
    'name' | 'desc'
  > {
  /** 权限列表 */
  permissions?: PermissionType[]
}
