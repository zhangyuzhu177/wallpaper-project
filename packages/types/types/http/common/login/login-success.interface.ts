import type { IUser } from '../../../entities/user.interface'
import type { IAdmin } from '../../../entities/admin.interface'

/**
 * 登录成功的响应数据
 */
export interface ILoginSuccessResData {
  /** 登录凭证信息 */
  sign: {
    /** JWT 登录凭证 */
    token: string
    /** 过期时间戳 */
    expireAt: number
  }
  /** 管理员信息 */
  admin?: IAdmin
  /** 个人用户信息 */
  user?: IUser
}
