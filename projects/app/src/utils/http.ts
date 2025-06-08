import { ErrorCode, type IBasicResponse } from 'types'
import type { CustomRequestOptions } from '@/interceptors/request'
import { useUserStore } from '@/store'

export function http<T>(options: CustomRequestOptions) {
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
        const { status } = res.data as IBasicResponse<T>
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
            uni.showModal({
              title: '提示',
              content: '您还未登录，是否前往登录？',
              success: (res) => {
                if (res.confirm) {
                  uni.navigateTo({
                    url: '/pages/login/index',
                  })
                }
                else {
                  uni.switchTab({
                    url: '/pages/home/index',
                  })
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
              title: (res.data as IBasicResponse<T>).message || '请求错误',
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

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
export function httpGet<T>(url: string,
  query?: Record<string, any>,
  header?: Record<string, any>) {
  return http<T>({
    url,
    query,
    method: 'GET',
    header,
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @param header 请求头，默认为json格式
 * @returns
 */
export function httpPost<T>(url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
  header?: Record<string, any>) {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
    header,
  })
}
/**
 * PUT 请求
 */
export function httpPut<T>(url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
  header?: Record<string, any>) {
  return http<T>({
    url,
    data,
    query,
    method: 'PUT',
    header,
  })
}

/**
 * DELETE 请求（无请求体，仅 query）
 */
export function httpDelete<T>(url: string,
  query?: Record<string, any>,
  header?: Record<string, any>) {
  return http<T>({
    url,
    query,
    method: 'DELETE',
    header,
  })
}

http.get = httpGet
http.post = httpPost
http.put = httpPut
http.delete = httpDelete
