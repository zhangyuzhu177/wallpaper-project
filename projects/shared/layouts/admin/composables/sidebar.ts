import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import type { ZLogoutDialogProps } from '../../../components/dialog/ZLogoutDialog.vue'

/**
 * 管理员信息参数
 */
export interface AdminItemProps {
  /**
   * 管理员姓名
   */
  name?: string
  /**
   * 管理员角色
   */
  role?: string
  /**
   * 管理员手机号
   */
  phone?: string
  /**
   * 退出登录
   */
  logout: ZLogoutDialogProps['onLogout']
}

/**
 * 侧边栏参数
 */
export interface AppSidebarProps {
  /**
   * 标题
   */
  title: string
  /**
   * 名称
   */
  name?: string
  /**
   * 管理员信息参数
   */
  admin: AdminItemProps
  /**
   * 菜单
   */
  menu?: {
    /**
     * 菜单名称
     */
    name: string
    /**
     * 跳转路由
     */
    to: string
    /**
     * 图标
     */
    icon: {
      /**
       * 默认图标
       */
      default: string
      /**
       * 激活图标
       */
      active: string
    }
  }[]
}

const { width } = useWindowSize()

/** 过渡动画时间(单位：ms) */
const ANIMATION_TIME = 300
/** 基本宽度 */
const BASE_WIDTH = 960

/** 是否展开侧边栏 */
const isExpand = ref(width.value >= BASE_WIDTH)

export function useSidebar() {
  /**
   * 切换侧边栏的展开状态
   */
  function changeState(flag?: boolean) {
    isExpand.value = flag === undefined ? !isExpand.value : flag
  }

  return {
    isExpand,

    ANIMATION_TIME,
    BASE_WIDTH,

    changeState,
  }
}
