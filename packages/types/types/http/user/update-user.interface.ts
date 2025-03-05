import type { IPasswordOptionalDto } from '../../dto/password.interface'

import type { ICreateUserBodyDto } from './create-user.interface'

/**
 * 更新个人用户
 * 请求参数
 */
export interface IUpdateUserBodyDto
  extends
  Omit<ICreateUserBodyDto, 'password'>,
  IPasswordOptionalDto {}
