import { PermissionType } from 'types'
import { arrayDistinct, arrayHasIntersection, objectOmit } from 'utils'

import type { PermissionItem } from '~/constants/admin'

interface PageMenuItem {
  value: string
  name: string
  flag?: boolean
}

const { isLogin, adminPermission } = useAdmin()

/** 当前激活的页面菜单 */
const active = useLocalStorage(ACTIVE_PAGE_MENU_KEY, '')

export function useMenu($route = useRoute()) {
  /**
   * 管理后台用户菜单（侧边导航栏）
   */
  const adminMenu = computed(() => getMenu(adminPermission.value))

  /**
   * 页面菜单（顶部菜单）
   */
  const pageMenu = computed<PageMenuItem[] | undefined>(() => {
    const role = adminPermission.value
    const menu: Record<string, PageMenuItem[]> = {
      home: [
        {
          value: 'home',
          name: '首页',
          flag: isLogin.value,
        },
        {
          value: 'page',
          name: '页面配置',
          flag: arrayHasIntersection(
            role,
            [
              PermissionType.CONFIG_QUERY,
            ],
          ),
        },
        {
          value: 'notice',
          name: '公告管理',
          flag: arrayHasIntersection(
            role,
            [
              PermissionType.NOTICE_QUERY,
            ],
          ),
        },
      ],
      wallpaper: [
        {
          value: 'category',
          name: '分类列表',
          flag: arrayHasIntersection(
            role,
            [
              PermissionType.CATEGORY_QUERY,
            ],
          ),
        },
        {
          value: 'wallpaper',
          name: '壁纸列表',
          flag: arrayHasIntersection(
            role,
            [
              PermissionType.WALLPAPER_QUERY,
            ],
          ),
        },
      ],
      user: [
        {
          value: 'user',
          name: '个人用户',
          flag: arrayHasIntersection(
            role,
            [
              PermissionType.USER_QUERY,
            ],
          ),
        },
      ],
      admin: [
        {
          value: 'admin',
          name: '管理员列表',
          flag: role?.includes(PermissionType.ADMIN_QUERY),
        },
        {
          value: 'adminRole',
          name: '管理员角色',
          flag: role?.includes(PermissionType.ADMIN_ROLE_QUERY),
        },
      ],
      log: [
        {
          value: 'download-record',
          name: '下载记录',
          flag: role?.includes(PermissionType.DOWNLOAD_RECORD_QUERY),
        },
        {
          value: 'collection-record',
          name: '收藏记录',
          flag: role?.includes(PermissionType.COLLECTION_QUERY),
        },
      ],
    }
    return menu[$route.path.substring(1)]
  })

  /**
   * 获取当前权限对应的菜单
   */
  function getMenu(permission?: PermissionType[]) {
    function getReadonlyPermission({ readonly, children }: PermissionItem, target?: PermissionType[]) {
      if (!target)
        target = []
      if (readonly)
        target.push(readonly)
      if (children?.length)
        children.forEach(v => getReadonlyPermission(v as PermissionItem, target))
      return target
    }

    return ADMIN_MENU_LIST.filter((item) => {
      const arr: string[] = [...getReadonlyPermission(item)]
      if (typeof item.value === 'string')
        arr.push(item.value)
      else if (Array.isArray(item.value))
        arr.push(...item.value)
      return arrayHasIntersection(permission, arr)
    })
      .map(v => objectOmit(v, 'children'))
  }

  /**
   * 获取当前权限下的所有粒子化权限
   */
  function getPermission({ value, readonly, children }: Partial<PermissionItem>) {
    const result: PermissionType[] = []

    if (readonly)
      result.push(readonly)
    if (typeof value === 'string')
      result.push(value)
    else if (Array.isArray(value))
      result.push(...value)

    // 处理children
    if (children?.length) {
      for (const child of children)
        result.push(...getPermission(child as PermissionItem))
    }

    return arrayDistinct(result)
  }

  return {
    active,
    adminMenu,
    pageMenu,

    getMenu,
    getPermission,
  }
}
