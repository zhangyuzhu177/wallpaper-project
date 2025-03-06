import { validateLength } from 'utils'

/**
 * 校验一个姓名是否符合要求
 * @param name 待校验的姓名
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateName(name?: string) {
  return validateLength('姓名', name, 2, 20)
}
