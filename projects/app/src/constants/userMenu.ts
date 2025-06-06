export interface MenuItem {
  to: string
  label: string
  icon: string
}

export const USER_MENU: MenuItem[] = [
  {
    to: '/pages/detail/index?title=我的收藏',
    label: '我的收藏',
    icon: '/static/icons/collect.svg',
  },
  {
    to: '/pages/detail/index?title=下载历史',
    label: '下载历史',
    icon: '/static/icons/history.svg',
  },
  {
    to: '/pages/user/settings',
    label: '账户设置',
    icon: '/static/icons/setting.svg',
  },
  {
    to: '/pages/user/privacy',
    label: '隐私政策',
    icon: '/static/icons/privacy.svg',
  },
]
