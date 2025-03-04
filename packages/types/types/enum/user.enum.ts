/**
 * 用户类型
 */
export enum UserType {
  /** 个人用户 */
  USER = 'user',
  /** 管理员 */
  ADMIN = 'admin',
}

/**
 * 用户类型的描述
 */
export const userTypeDescriptions: Record<UserType, string> = {
  [UserType.USER]: '个人用户',
  [UserType.ADMIN]: '管理员',
}
