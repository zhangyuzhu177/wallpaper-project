import type { UnwrapRef } from 'vue'
import { type Router, useRouter } from 'vue-router'
import { computed, getCurrentInstance, ref } from 'vue'
import { isClient, useLocalStorage } from '@vueuse/core'
import type { IAdmin, ILoginSuccessResData, PermissionType } from 'types'
import { browser, objectPick, validateEmail, validatePhone } from 'utils'

import { adminOwnGetProfileApi } from '../api/admin'
import { AES_KEY, RSA_KEY } from '../constants/encrypt'
import { authAdminLoginByPasswordApi, authAdminLogoutApi } from '../api/authAdmin'
import { ADMIN_AUTH_TOKEN_KEY, ADMIN_REMEMBER_LOGIN_INFO_KEY } from '../constants/storage'

/** 管理员 token */
export const adminAuthToken = useLocalStorage(ADMIN_AUTH_TOKEN_KEY, '')
/** 管理员信息 */
const adminInfo = ref<IAdmin>()

/** 管理员信息获取时间 */
let getTime: number
/** 获取管理员信息缓存的时间 */
const cacheTime = 10 * 1000

/** 加载中 */
const loading = ref<boolean>(false)

export function useAdmin($router?: Router | UnwrapRef<Router>) {
  if (!$router && getCurrentInstance())
    $router = useRouter()

  /**
   * 管理员是否登录
   */
  const isLogin = computed(() => !!adminAuthToken.value)

  /**
   * 管理员权限
   */
  const adminPermission = computed(() => adminInfo.value?.adminRole?.permissions?.map(({ name }) => name))

  /**
   * 判断管理员有无指定权限
   */
  function hasPermission(
    permissions: PermissionType | PermissionType[],
    relation: 'OR' | 'AND' = 'OR',
  ) {
    if (!Array.isArray(permissions))
      permissions = [permissions]
    return adminPermission.value?.length
      ? permissions[relation === 'OR' ? 'some' : 'every'](
        permission => adminPermission.value?.includes(permission),
      )
      : false
  }

  /**
   * 通过 姓名/邮箱/手机号 + 密码 登录
   */
  async function loginByPassword(
    form: {
      account: string
      password: string
      remember: boolean
    },
    validate: {
      code: string
      bizId: string
    },
  ) {
    const { account, password, remember } = form
    const key = !validateEmail(account) ? 'email' : !validatePhone(account) ? 'phone' : 'name'

    loading.value = true
    try {
      const res = await authAdminLoginByPasswordApi({
        ...validate,
        [key]: account,
        password: await browser.rsaEncrypt(password, RSA_KEY),
      })

      if (res && isClient) {
        if (remember) {
          localStorage.setItem(
            ADMIN_REMEMBER_LOGIN_INFO_KEY,
            browser.aesEncrypt(
              JSON.stringify(objectPick(form, 'account', 'password')),
              AES_KEY,
            ),
          )
        }
        else {
          localStorage.removeItem(ADMIN_REMEMBER_LOGIN_INFO_KEY)
        }
        processLoginInfo(res)
      }
    }
    finally {
      loading.value = false
    }
  }

  /**
   * 处理登录信息
   */
  function processLoginInfo(res: ILoginSuccessResData) {
    const { sign } = res
    adminAuthToken.value = sign.token
    setTimeout(() => {
      $router?.push('/')
    }, 100)
  }

  /**
   * 退出登录
   */
  async function logout(flag = false) {
    if (!flag && isLogin.value)
      await authAdminLogoutApi()

    adminAuthToken.value = ''
    adminInfo.value = undefined

    if (!($router?.currentRoute as any)?.path?.startsWith('/auth'))
      $router?.push('/auth/login')
  }

  /**
   * 获取当前登入管理员信息
   */
  async function getOwnProfile(relation = 'adminRole.permissions', useCache = true) {
    if (useCache && adminInfo.value && getTime && Date.now() - getTime < cacheTime)
      return

    getTime = Date.now()
    adminInfo.value = await adminOwnGetProfileApi({ relation })
  }

  return {
    adminAuthToken,
    adminInfo,
    isLogin,
    adminPermission,
    loading,

    hasPermission,
    loginByPassword,
    logout,
    getOwnProfile,
  }
}
