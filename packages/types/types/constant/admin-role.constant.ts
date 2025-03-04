import type { PermissionType } from '../enum/permission.enum'
import { permissionDescriptions } from '../enum/permission.enum'
import type { IAdminRole } from '../entities/admin-role.interface'

/** 所有的权限 */
export const ALL_PERMISSIONS = Object.entries(permissionDescriptions).map(([k, v]) => ({
  name: k as PermissionType,
  desc: v,
}))

/** 默认管理员角色 */
export const DEFAULT_ADMIN_ROLES: Omit<IAdminRole, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'root',
    name: 'root',
    desc: '管理后台全部功能的管理权限',
    permissions: ALL_PERMISSIONS,
  },
]
