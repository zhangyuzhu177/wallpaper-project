/**
 * 粒子化权限类型
 */
export enum PermissionType {
  // ---------- 超级管理员 ----------
  // /**
  //  * 管理后台全部功能的管理权限
  //  * @deprecated 使用最细粒度的权限
  //  **/

  // ---------- admin-role 管理员角色 ----------
  /** 查询管理员角色列表 */
  ADMIN_ROLE_QUERY = 'admin-role:query',
  /** 创建管理员角色 */
  ADMIN_ROLE_CREATE = 'admin-role:create',
  /** 更新管理员角色 */
  ADMIN_ROLE_UPDATE = 'admin-role:update',
  /** 删除管理员角色 */
  ADMIN_ROLE_DELETE = 'admin-role:delete',
  /** 查询管理角色分配列表 */
  ROLE_ASSIGN_QUERY = 'role:assign-query',

  // ---------- user 用户 ----------
  /** 查询用户 */
  USER_QUERY = 'user:query',
  /** 创建用户 */
  USER_CREATE = 'user:create',
  /** 删除用户 */
  USER_DELETE = 'user:delete',
  /** 更新用户 */
  USER_UPDATE = 'user:update',
  /** 更新用户的管理角色 */
  USER_UPDATE_ROLE = 'user:update-role',
  /** 恢复用户 */
  USER_RECOVER = 'user:recover',
}

/**
 * 粒子化权限类型的描述
 */
export const permissionDescriptions: Record<PermissionType, string> = {
  [PermissionType.ADMIN_ROLE_QUERY]: '查询管理员角色列表',
  [PermissionType.ADMIN_ROLE_CREATE]: '创建管理员角色',
  [PermissionType.ADMIN_ROLE_UPDATE]: '更新管理员角色',
  [PermissionType.ADMIN_ROLE_DELETE]: '删除管理员角色',
  [PermissionType.ROLE_ASSIGN_QUERY]: '查询管理角色分配列表',

  [PermissionType.USER_QUERY]: '查询用户',
  [PermissionType.USER_CREATE]: '创建用户',
  [PermissionType.USER_DELETE]: '删除用户',
  [PermissionType.USER_UPDATE]: '更新用户',
  [PermissionType.USER_UPDATE_ROLE]: '更新用户的管理角色',
  [PermissionType.USER_RECOVER]: '恢复用户',
}
