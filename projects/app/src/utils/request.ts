import { ErrorCode, type IBasicResponse } from 'types'
import { getRouteWithParams } from './path'
import type { CustomRequestOptions } from '@/interceptors/request'
import { useUserStore } from '@/store'

/**
 * 请求方法: 主要是对 uni.request 的封装，去适配 openapi-ts-request 的 request 方法
 * @param options 请求参数
 * @returns 返回 Promise 对象
 */
function http<T>(options: CustomRequestOptions) {
  // 1. 返回 Promise 对象
  return new Promise<IBasicResponse<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(res) {
        const { status, message } = res.data as IBasicResponse<T>
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as IBasicResponse<T>)
        }
        else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          if (status === ErrorCode.AUTH_ACCOUNT_IS_DISABLE) {
            uni.showToast({
              title: '账号已被禁用',
              icon: 'none',
              duration: 2000,
            })
          }
          else {
            const userStore = useUserStore()
            userStore.logout(true)

            const pages = getCurrentPages()
            const currentPage = pages[pages.length - 1]
            const url = getRouteWithParams(currentPage.route, currentPage.options)
            const redirectRoute = `/pages/login/index?redirect=${encodeURIComponent(url)}`

            uni.showModal({
              title: '提示',
              content: message,
              success: (res) => {
                if (res.confirm) {
                  uni.navigateTo({
                    url: redirectRoute,
                  })
                }
                else {
                  if (pages.length === 1) {
                    uni.switchTab({
                      url: '/pages/home/index',
                    })
                  }
                }
              },
            })
          }
          reject(res)
        }
        else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast
            && uni.showToast({
              icon: 'none',
              title: (res.data as T & IBasicResponse<T>)?.message || '请求错误',
            })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

/*
 * openapi-ts-request 工具的 request 跨客户端适配方法
 */
export default function request<T = unknown>(
  url: string,
  options: Omit<CustomRequestOptions, 'url'> & {
    params?: Record<string, unknown>
    headers?: Record<string, unknown>
  },
) {
  const requestOptions = {
    url,
    ...options,
  }

  if (options.params) {
    requestOptions.query = requestOptions.params
    delete requestOptions.params
  }

  if (options.headers) {
    requestOptions.header = options.headers
    delete requestOptions.headers
  }

  return http<T>(requestOptions)
}
