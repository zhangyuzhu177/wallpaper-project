import type { ICodeDto, ILoginByPasswordBodyDto } from 'types'

/**
 * 微信一键登录
 */
export function loginByWeixinApi(body: ICodeDto) {
  return request({
    url: '/auth/user/login/wechat',
    method: 'POST',
    data: body,
  })
}

/**
 * 账号/邮箱/手机号+密码登录
 */
export function loginByPasswordApi(body: ILoginByPasswordBodyDto) {
  return request({
    url: '/auth/user/login/password',
    method: 'POST',
    data: body,
  })
}

/**
 * 退出登录
 */
export function logoutApi() {
  return request({
    url: '/auth/user/logout',
  })
}
