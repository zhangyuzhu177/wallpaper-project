import { PermissionType } from 'types'

export interface PermissionItem {
  /** 权限（页面）名称 */
  name: string
  /** 路由地址（仅根节点） */
  to: string
  /** 描述信息 */
  desc?: string
  /** 只读权限 */
  readonly?: PermissionType
  /** 权限列表 */
  value?: PermissionType | PermissionType[]
  /** 子节点 */
  children?: Omit<PermissionItem, 'to'>[]
}

/**
 * 管理后台菜单列表
 */
export const ADMIN_MENU_LIST: PermissionItem[] = [
  {
    name: '首页',
    to: '/home',
    children: [
      {
        name: '首页',
      },
      {
        name: '页面配置',
        readonly: PermissionType.CONFIG_QUERY,
        children: [
          {
            name: '更新页面配置',
            value: PermissionType.CONFIG_UPSERT,
          },
        ],
      },
      {
        name: '公告管理',
        readonly: PermissionType.NOTICE_QUERY,
        children: [
          {
            name: '创建公告信息',
            value: PermissionType.NOTICE_CREATE,
          },
          {
            name: '更新公告信息',
            value: PermissionType.NOTICE_UPDATE,
          },
          {
            name: '删除公告信息',
            value: PermissionType.NOTICE_DELETE,
          },
        ],
      },
    ],
  },
  {
    name: '壁纸管理',
    to: '/wallpaper',
    children: [
      {
        name: '分类列表',
        readonly: PermissionType.CATEGORY_QUERY,
        children: [
          {
            name: '创建分类信息',
            value: PermissionType.CATEGORY_CREATE,
          },
          {
            name: '更新分类信息',
            value: PermissionType.CATEGORY_UPDATE,
          },
          {
            name: '删除分类信息',
            value: PermissionType.CATEGORY_DELETE,
          },
        ],
      },
      {
        name: '壁纸列表',
        readonly: PermissionType.WALLPAPER_QUERY,
        children: [
          {
            name: '上传壁纸',
            value: PermissionType.WALLPAPER_CREATE,
          },
          {
            name: '更新壁纸',
            value: PermissionType.WALLPAPER_UPDATE,
          },
          {
            name: '删除壁纸',
            value: PermissionType.WALLPAPER_DELETE,
          },
        ],
      },
    ],
  },
  {
    name: '用户中心',
    to: '/user',
    children: [
      {
        name: '个人用户',
        readonly: PermissionType.USER_QUERY,
        children: [
          {
            name: '创建个人用户',
            value: PermissionType.USER_CREATE,
          },
          {
            name: '更新个人用户',
            value: PermissionType.USER_UPDATE,
          },
          {
            name: '修改用户账号状态',
            value: PermissionType.USER_CHANGE_STATUS,
          },
          {
            name: '修改用户鼻子下载次数',
            value: PermissionType.USER_CHANGE_DOWNLOAD_LIMIT,
          },
        ],
      },
    ],
  },
  {
    name: '管理员中心',
    to: '/admin',
    children: [
      {
        name: '管理员列表',
        readonly: PermissionType.ADMIN_QUERY,
        children: [
          {
            name: '创建管理员信息',
            value: PermissionType.ADMIN_CREATE,
          },
          {
            name: '更新管理员信息',
            value: PermissionType.ADMIN_UPDATE,
          },
          {
            name: '删除管理员信息',
            value: PermissionType.ADMIN_DELETE,
          },
          {
            name: '修改管理员账号状态',
            value: PermissionType.ADMIN_CHANGE_STATUS,
          },
          {
            name: '分配管理员角色',
            value: PermissionType.ADMIN_ASSIGN_ROLE,
          },
        ],
      },
      {
        name: '管理员角色',
        readonly: PermissionType.ADMIN_ROLE_QUERY,
        children: [
          {
            name: '创建管理员角色',
            value: PermissionType.ADMIN_ROLE_CREATE,
          },
          {
            name: '更新管理员角色',
            value: PermissionType.ADMIN_ROLE_UPDATE,
          },
          {
            name: '删除管理员角色',
            value: PermissionType.ADMIN_ROLE_DELETE,
          },
        ],
      },
    ],
  },
  {
    name: '日志管理',
    to: '/log',
    children: [
      {
        name: '下载记录',
        readonly: PermissionType.DOWNLOAD_RECORD_QUERY,
      },
      {
        name: '收藏记录',
        readonly: PermissionType.COLLECTION_QUERY,
      },
    ],
  },
]
