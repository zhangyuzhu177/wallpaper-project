import type { IBasicResponse } from 'types'

interface IRequestConfig {
  url: string
  data?: any
  header?: any
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

interface IRequestInterceptor {
  request?: (config: IRequestConfig) => IRequestConfig
  response?: (response: any) => any
}

const interceptors: IRequestInterceptor = {}

// 设置请求拦截器
export function setRequestInterceptor(callback: (config: IRequestConfig) => IRequestConfig) {
  interceptors.request = callback
}

// 设置响应拦截器
export function setResponseInterceptor(callback: (response: any) => any) {
  interceptors.response = callback
}

// 处理错误提示
function showError(message: string) {
  uni.showToast({
    title: message || '请求失败',
    icon: 'none',
    position: 'top',
  })
}

// 处理登录过期
function handleAuthError() {
  // 清除本地token
  uni.removeStorageSync('token')
  // 跳转到登录页
  uni.navigateTo({
    url: '/pages/login/index',
  })
}

export function request<T = any>(config: IRequestConfig): Promise<T> {
  const { url, data, method = 'GET', header } = config

  let baseURL = ''
  // #ifdef H5
  baseURL = import.meta.env.VITE_API_BASE
  // #endif

  // #ifdef MP-WEIXIN
  baseURL = import.meta.env.VITE_PROXY_TARGET
  // #endif

  // 应用请求拦截器
  let processedConfig = { ...config }
  if (interceptors.request)
    processedConfig = interceptors.request(processedConfig)

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseURL}${url}`,
      data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': uni.getStorageSync('token') ? `Bearer ${uni.getStorageSync('token')}` : '',
        ...header,
      },
      method,
      sslVerify: true,
      success: (res) => {
        const { statusCode } = res
        const responseData = res.data as IBasicResponse

        // 应用响应拦截器
        if (interceptors.response) {
          try {
            const interceptedRes = interceptors.response(responseData)
            responseData.data = interceptedRes
          }
          catch (error) {
            reject(error)
            return
          }
        }

        if (statusCode === 200 || statusCode === 201) {
          resolve(responseData.data)
        }
        // 处理登录过期
        else if (statusCode === 401) {
          handleAuthError()
          reject(new Error('登录已过期'))
        }
        // 处理其他错误
        else {
          showError(responseData.message)
          reject(responseData)
        }
      },
      fail: (error) => {
        showError('网络请求失败')
        reject(error)
      },
    })
  })
}
