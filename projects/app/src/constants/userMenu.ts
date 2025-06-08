export interface MenuItem {
  to: string
  label: string
}

export const USER_MENU: MenuItem[] = [
  {
    to: '/pages/detail/index?title=我的收藏',
    label: '我的收藏',
  },
  {
    to: '/pages/detail/index?title=下载历史',
    label: '下载历史',
  },
  {
    to: '/pages/user/settings?title=账号与安全',
    label: '账号与安全',
  },
  {
    to: '/pages/user/privacy',
    label: '隐私政策',
  },
]
