import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(async (to, _, next) => {
      const toPath = to.path.toLowerCase()
      if (toPath !== to.path)
        return next(toPath)

      const { adminInfo, isLogin, logout, getOwnProfile } = useAdmin()
      const { adminMenu } = useMenu()

      // 前往登录页面
      if (toPath.startsWith('/auth')) {
        // 已登录管理员 重定向到 首页
        if (isLogin.value)
          return next('/')
      }

      // 前往非登录页面
      else {
        // 未登录管理员 重定向到 登录页面
        if (!isLogin.value) {
          return next('/auth/login')
        }

        // 已登录管理员
        else {
          // 获取管理员信息
          if (!adminInfo.value) {
            try {
              await getOwnProfile()
            }
            catch (_) {
              logout(true)
              return next('/auth/login')
            }
          }

          // 前往非 denied 页面，判断权限
          if (toPath !== '/denied') {
            // 没有权限则重定向到 denied 页面
            if (!adminMenu.value.length)
              return next('/denied')
            // 前往的页面没有权限则重定向到有权限的第一个页面
            else if (!adminMenu.value.some(({ to }) => toPath.startsWith(to)))
              return next(adminMenu.value[0].to!)
          }

          // 前往 denied 页面，有权限则重定向到有权限的第一个页面
          else if (adminMenu.value.length) {
            return next(adminMenu.value[0].to)
          }
        }
      }

      next()
    })
  }
}
