import type { IAvatarOptionalDto, IRelationRawDto, IUser } from 'types'

/**
 * 获取当前登录的用户信息
 */
export function userOwnGetProfileApi(query?: IRelationRawDto) {
  return request<IUser>({
    url: `/user/own?relation=${query?.relation}`,
  })
}

/**
 * 更新头像
 */
export function userUpdateAvatarApi(data: IAvatarOptionalDto) {
  return request<boolean>({
    url: '/user/own/avatar',
    method: 'POST',
    data,
  })
}
