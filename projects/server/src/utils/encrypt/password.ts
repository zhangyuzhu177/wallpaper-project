import * as bcryptjs from 'bcryptjs'

/**
 * 对密码进行加密
 */
export async function encryptPassword(password: string) {
  const saltRounds = 10
  return bcryptjs.hash(password, saltRounds)
}

/**
 * 校验密码是否正确
 */
export async function comparePassword(password?: string, hash?: string) {
  return bcryptjs.compare(password ?? '', hash ?? '')
}
