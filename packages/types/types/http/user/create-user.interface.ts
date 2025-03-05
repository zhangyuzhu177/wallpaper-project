import type { IUser } from '../../entities/user.interface'
import type { IStatusOptionalDto } from '../../dto/status.interface'

/**
 * 创建个人用户
 * 请求参数
 */
export interface ICreateUserBodyDto
  extends
  Pick<
    IUser,
    'name' | 'phone' | 'email' | 'password'
  >,
  IStatusOptionalDto {}
