import type {
  ICodeDto,
  ICreateUserBodyDto,
  ILoginByPasswordBodyDto,
  ILoginSuccessResData,
  IRelationRawDto,
  IUser,
} from 'types'
import { http } from '@/utils/http'

/**
 * 用户登录
 * @param body 登录表单
 */
export function loginByPasswordApi(body: ILoginByPasswordBodyDto) {
  return http.post<ILoginSuccessResData>('/auth/user/login/password', body)
}

/**
 * 用户注册
 * @param body 注册表单
 */
export function registerApi(body: ICreateUserBodyDto) {
  return http.post<string>('/auth/user/register', body)
}

/**
 * 获取用户信息
 */
export function getUserInfoApi(query?: IRelationRawDto) {
  return http.get<IUser>(`/user/own?relation=${query?.relation}`)
}

/**
 * 退出登录
 */
export function logoutApi() {
  return http.get<void>('/auth/user/logout')
}

/**
 * 获取微信登录凭证
 * @returns Promise 包含微信登录凭证(code)
 */
export function getWxCode() {
  return new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: res => resolve(res),
      fail: err => reject(new Error(err)),
    })
  })
}

/**
 * 微信登录
 * @param params 微信登录参数，包含code
 * @returns Promise 包含登录结果
 */
export function wxLoginApi(body: ICodeDto) {
  return http.post<ILoginSuccessResData>('/auth/user/login/wechat', body)
}
