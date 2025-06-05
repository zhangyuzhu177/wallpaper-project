import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ILoginSuccessResData, IUser } from 'types'
import { browser, validateEmail, validatePhone } from 'utils'
import {
  getUserInfoApi,
  getWxCode,
  loginByPasswordApi,
  logoutApi,
  updateUserAvatarApi,
  wxLoginApi,
} from '@/api/login'
import { RSA_KEY } from '@/constants/encrypt'
import { toast } from '@/utils/toast'
import { USER_AUTH_TOKEN_KEY, USER_INFO_KEY } from '@/constants/storage'

export const useUserStore = defineStore(
  'user',
  () => {
    /** 加载中 */
    const loading = ref(false)
    /** 微信登录加载 */
    const wxLoading = ref(false)
    // 定义用户信息
    const userInfo = ref<IUser>()
    // 用户token
    const userAuthToken = ref('')
    /** 用户信息获取时间 */
    let getTime: number
    /** 获取用户信息缓存的时间 */
    const cacheTime = 10 * 1000

    // 设置用户信息
    const setUserInfo = (val: IUser) => {
      // 若头像为空 则使用默认头像
      if (!val.avatar)
        val.avatar = '/static/images/default-avatar.png'

      userInfo.value = val || undefined
    }
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = undefined
      userAuthToken.value = ''
      uni.removeStorageSync(USER_INFO_KEY)
      uni.removeStorageSync(USER_AUTH_TOKEN_KEY)
    }
    /**
     * 获取用户信息
     */
    const getUserInfo = async (relation = 'downloadRecords;collections', useCache = true) => {
      if (useCache && userInfo.value && getTime && Date.now() - getTime < cacheTime)
        return

      getTime = Date.now()
      const res = await getUserInfoApi({ relation })
      setUserInfo(res.data)
      uni.setStorageSync(USER_INFO_KEY, res.data)
      // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      return res
    }
    /**
     * 用户登录
     * @param form 登录参数
     */
    const login = async (form: {
      account: string
      password: string
    }) => {
      const { account, password } = form
      const key = !validateEmail(account) ? 'email' : !validatePhone(account) ? 'phone' : 'account'
      loading.value = true
      try {
        const res = await loginByPasswordApi({
          [key]: account,
          password: await browser.rsaEncrypt(password, RSA_KEY),
        })
        setTimeout(() => {
          toast.success('登录成功')
        }, 0)
        processLoginInfo(res.data)
        return res
      }
      finally {
        loading.value = false
      }
    }

    /**
     * 更新用户头像
     */
    const updateUserAvatar = async (val: string) => {
      await updateUserAvatarApi({
        avatar: val,
      })
      // setUserInfo(res.data)
      getUserInfo('downloadRecords;collections', false)
    }

    /**
   * 处理登录信息
   */
    function processLoginInfo(res: ILoginSuccessResData) {
      const { sign, user } = res
      userAuthToken.value = sign.token
      userInfo.value = user
      uni.setStorageSync(USER_INFO_KEY, userInfo.value)
      uni.setStorageSync(USER_AUTH_TOKEN_KEY, userAuthToken.value)
    }

    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async (flag = false) => {
      if (!flag)
        await logoutApi()
      removeUserInfo()
    }
    /**
     * 微信登录
     */
    const wxLogin = async () => {
      wxLoading.value = true
      uni.showLoading({
        title: '登录中',
      })
      try {
        // 获取微信小程序登录的code
        const data = await getWxCode()
        const res = await wxLoginApi(data)
        setTimeout(() => {
          toast.success('登录成功')
        }, 0)
        processLoginInfo(res.data)
        return res
      }
      finally {
        wxLoading.value = false
        uni.hideLoading()
      }
    }

    return {
      loading,
      wxLoading,
      userInfo,
      userAuthToken,
      login,
      wxLogin,
      getUserInfo,
      logout,
      removeUserInfo,
      updateUserAvatar,
    }
  },
  {
    persist: true,
  },
)
