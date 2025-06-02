export interface MenuItem {
  to: string
  label: string
  icon: string
}

export const USER_MENU: MenuItem[] = [
  {
    to: '',
    label: '我的收藏',
    icon: '/static/icons/collect.svg',
  },
  {
    to: '',
    label: '下载历史',
    icon: '/static/icons/history.svg',
  },
  {
    to: '',
    label: '账户设置',
    icon: '/static/icons/setting.svg',
  },
  {
    to: '',
    label: '隐私政策',
    icon: '/static/icons/privacy.svg',
  },
]
