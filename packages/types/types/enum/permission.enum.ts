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

  // ---------- admin 管理员 ----------
  /** 查询管理员列表 */
  ADMIN_QUERY = 'admin:query',
  /** 创建管理员用户 */
  ADMIN_CREATE = 'admin:create',
  /** 更新管理员用户 */
  ADMIN_UPDATE = 'admin:update',
  /** 删除管理员用户 */
  ADMIN_DELETE = 'admin:delete',
  /** 修改管理员用户状态 */
  ADMIN_CHANGE_STATUS = 'admin:change-status',
  /** 分配管理员角色 */
  ADMIN_ASSIGN_ROLE = 'admin:assign-role',

  // ---------- user 个人用户 ----------
  /** 查询个人用户 */
  USER_QUERY = 'user:query',
  /** 创建个人用户 */
  USER_CREATE = 'user:create',
  /** 更新个人用户 */
  USER_UPDATE = 'user:update',
  /** 删除个人用户 */
  USER_DELETE = 'user:delete',
  /** 修改个人用户状态 */
  USER_CHANGE_STATUS = 'user:change-status',
  /** 修改个人用户下载次数 */
  USER_CHANGE_DOWNLOAD_LIMIT = 'user:change-download-limit',

  // ---------- categgory 分类 ----------
  /** 查询壁纸分类 */
  CATEGORY_QUERY = 'category:query',
  /** 创建壁纸分类 */
  CATEGORY_CREATE = 'category:create',
  /** 更新壁纸分类 */
  CATEGORY_UPDATE = 'category:update',
  /** 删除壁纸分类 */
  CATEGORY_DELETE = 'category:delete',

  // ---------- wallpaper 壁纸 ----------
  /** 查询壁纸 */
  WALLPAPER_QUERY = 'wallpaper:query',
  /** 创建壁纸 */
  WALLPAPER_CREATE = 'wallpaper:create',
  /** 更新壁纸 */
  WALLPAPER_UPDATE = 'wallpaper:update',
  /** 删除壁纸 */
  WALLPAPER_DELETE = 'wallpaper:delete',

  // ------------ 全局配置 -------------
  /** 查询应用全局配置 */
  CONFIG_QUERY = 'config:query',
  /** 创建/更新应用全局配置 */
  CONFIG_UPSERT = 'config:upsert',

  // ------------ 公告管理 -------------
  /** 查询公告 */
  NOTICE_QUERY = 'notice:query',
  /** 创建公告 */
  NOTICE_CREATE = 'notice:create',
  /** 更新公告 */
  NOTICE_UPDATE = 'notice:update',
  /** 删除公告 */
  NOTICE_DELETE = 'notice:delete',
  /** 修改公告状态 */
  NOTICE_CHANGE_STATUS = 'notice:change-status',

  // ------------ 日志管理 -------------
  /** 查询下载记录 */
  DOWNLOAD_RECORD_QUERY = 'download-record:query',
  /** 查询收藏日志 */
  COLLECTION_QUERY = 'collection:query',
}

/**
 * 粒子化权限类型的描述
 */
export const permissionDescriptions: Record<PermissionType, string> = {
  [PermissionType.ADMIN_ROLE_QUERY]: '查询管理员角色列表',
  [PermissionType.ADMIN_ROLE_CREATE]: '创建管理员角色',
  [PermissionType.ADMIN_ROLE_UPDATE]: '更新管理员角色',
  [PermissionType.ADMIN_ROLE_DELETE]: '删除管理员角色',

  [PermissionType.ADMIN_QUERY]: '查询管理员列表',
  [PermissionType.ADMIN_CREATE]: '创建管理员用户',
  [PermissionType.ADMIN_UPDATE]: '更新管理员用户',
  [PermissionType.ADMIN_DELETE]: '删除管理员用户',
  [PermissionType.ADMIN_CHANGE_STATUS]: '修改管理员用户状态',
  [PermissionType.ADMIN_ASSIGN_ROLE]: '分配管理员角色',

  [PermissionType.USER_QUERY]: '查询用户',
  [PermissionType.USER_CREATE]: '创建用户',
  [PermissionType.USER_DELETE]: '删除用户',
  [PermissionType.USER_UPDATE]: '更新用户',
  [PermissionType.USER_CHANGE_STATUS]: '修改个人用户状态',
  [PermissionType.USER_CHANGE_DOWNLOAD_LIMIT]: '修改个人用户下载次数',

  [PermissionType.CATEGORY_QUERY]: '查询壁纸分类',
  [PermissionType.CATEGORY_CREATE]: '创建壁纸分类',
  [PermissionType.CATEGORY_UPDATE]: '更新壁纸分类',
  [PermissionType.CATEGORY_DELETE]: '删除壁纸分类',

  [PermissionType.WALLPAPER_QUERY]: '查询壁纸',
  [PermissionType.WALLPAPER_CREATE]: '创建壁纸',
  [PermissionType.WALLPAPER_UPDATE]: '更新壁纸',
  [PermissionType.WALLPAPER_DELETE]: '删除壁纸',

  [PermissionType.CONFIG_QUERY]: '查询应用全局配置',
  [PermissionType.CONFIG_UPSERT]: '创建/更新应用全局配置',

  [PermissionType.NOTICE_QUERY]: '查询公告',
  [PermissionType.NOTICE_CREATE]: '创建公告',
  [PermissionType.NOTICE_UPDATE]: '更新公告',
  [PermissionType.NOTICE_DELETE]: '删除公告',
  [PermissionType.NOTICE_CHANGE_STATUS]: '修改公告状态',

  [PermissionType.DOWNLOAD_RECORD_QUERY]: '查询下载记录',
  [PermissionType.COLLECTION_QUERY]: '查询收藏记录',
}
