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
]
