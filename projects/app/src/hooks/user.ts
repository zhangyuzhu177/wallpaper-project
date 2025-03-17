import type { ILoginSuccessResData, IUser } from 'types'
import { USER_AUTH_TOKEN_KEY } from 'shared/constants/storage'
import { RSA_KEY } from 'shared/constants/encrypt'
import { browser, validateEmail, validatePhone } from 'utils'

/** 用户token */
export const userAuthToken = ref(uni.getStorageSync(USER_AUTH_TOKEN_KEY) || '')

/** 用户信息 */
export const userInfo = ref<IUser>()
/** 用户信息获取时间 */
let getTime: number
/** 获取用户信息缓存的时间 */
const cacheTime = 10 * 1000

export function useUser() {
  /**
   * 用户是否登录
   */
  const isLogin = computed(() => !!uni.getStorageSync(USER_AUTH_TOKEN_KEY))

  /**
   * 微信一键登录
   */
  async function loginByWeixin(code?: string) {
    if (!code)
      return

    uni.showLoading({
      title: '登录中...',
    })

    try {
      const res = await loginByWeixinApi({ code })
      if (res)
        processLoginInfo(res)
    }
    finally {
      uni.hideLoading()
    }
  }

  /**
   * 账号/邮箱/手机号+密码登录
   */
  async function loginByPassword(form: {
    account: string
    password: string
  }) {
    const { account, password } = form
    const key = !validateEmail(account) ? 'email' : !validatePhone(account) ? 'phone' : 'account'

    uni.showLoading({
      title: '登录中...',
    })
    try {
      const res = await loginByPasswordApi({
        [key]: account,
        password: await browser.rsaEncrypt(password, RSA_KEY),
      })

      if (res)
        processLoginInfo(res)
    }
    finally {
      uni.hideLoading()
    }
  }

  /**
   * 处理登录信息
   */
  function processLoginInfo(res: ILoginSuccessResData) {
    const { sign, user } = res
    userAuthToken.value = sign.token
    userInfo.value = user
    uni.setStorageSync(USER_AUTH_TOKEN_KEY, sign.token)
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/user/user',
      })
    }, 100)
  }

  /**
   * 获取当前登入用户信息
   */
  async function getOwnProfile(relation = 'downloadRecords;collections', useCache = true) {
    if (useCache && userInfo.value && getTime && Date.now() - getTime < cacheTime)
      return

    getTime = Date.now()
    userInfo.value = await userOwnGetProfileApi({ relation })
  }

  /**
   * 退出登录
   */
  async function logout(flag = false) {
    if (!flag && isLogin.value)
      await logoutApi()

    userAuthToken.value = ''
    uni.removeStorageSync(USER_AUTH_TOKEN_KEY)
    userInfo.value = undefined
    uni.navigateTo({
      url: '/pages/auth/login',
    })
  }

  return {
    userInfo,
    isLogin,

    loginByWeixin,
    loginByPassword,
    getOwnProfile,
    logout,
  }
}
