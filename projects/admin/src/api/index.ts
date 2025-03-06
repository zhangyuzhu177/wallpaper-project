import axios from 'axios'
import { Notify } from 'quasar'
import type { IBasicResponse } from 'types'

const $http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

/**
 * 请求拦截器
 */
$http.interceptors.request.use(
  (config) => {
    const { headers, url = '' } = config

    if (adminAuthToken.value && !headers.Authorization)
      headers.Authorization = `Bearer ${adminAuthToken.value.trim()}`

    const baseURLWhiteList = ['http', '//']
    if (baseURLWhiteList.some(prefix => url.startsWith(prefix)))
      config.baseURL = ''

    if (url.startsWith('_/') || url.startsWith('/_/')) {
      config.url = url.slice(2)
      config.baseURL = ''
    }

    return config
  },
)

/**
 * 响应拦截器
 */
$http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const { config, response } = error

    if (!response)
      return

    const { detail, message } = response.data as IBasicResponse
    const notify = config.headers.notify !== false

    // 判断登录是否有效（未登录/登录过期）
    if (response.status === 401) {
      const { logout } = useAdmin(globalRouter.value)
      logout(true)
    }

    if (notify) {
      if (Array.isArray(detail)) {
        detail.forEach(item =>
          showNotify(item.message),
        )
      }
      else if (detail) {
        showNotify(detail)
      }
      else {
        showNotify(message)
      }
    }

    return Promise.reject(error)
  },
)

/**
 * 展示错误通知
 */
function showNotify(message = '服务器异常，请稍后再试') {
  Notify.create({
    type: 'error',
    message,
  })
}

export default $http
