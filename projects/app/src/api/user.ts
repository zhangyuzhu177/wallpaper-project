import type { IAvatarOptionalDto, IUpdateUserBodyDto } from 'types'
import { http } from '@/utils/http'

/**
 * 更新用户头像
 */
export function updateUserAvatarApi(data: IAvatarOptionalDto) {
  return http.post<string>('/user/own/avatar', data)
}

/**
 * 更新当前登录用户信息
 */
export function updateOwnUserApi(body: IUpdateUserBodyDto) {
  return http.post<string>('/user/own/update', body)
}
