import type {
  ILoginByPasswordBodyDto,
  ILoginSuccessResData,
} from 'types'
import { useRequest } from '../hooks/request'

const { $get, $post } = useRequest()

/**
 * 通过 姓名/邮箱/手机号 + 密码 登录管理后台
 */
export function authAdminLoginByPasswordApi(body: ILoginByPasswordBodyDto) {
  return $post<ILoginSuccessResData>('/auth/admin/login/password', body)
}

/**
 * 登出管理后台
 */
export function authAdminLogoutApi() {
  return $get<boolean>('/auth/admin/logout')
}
