import { validateLength } from 'utils'

/**
 * 校验一个角色名称是否符合要求
 * @param name 待校验的角色名称
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateRoleName(name?: string) {
  return validateLength('角色名称', name, 2, 50)
}

/**
 * 校验一个角色描述是否符合要求
 * @param desc 待校验的角色描述
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateRoleDesc(desc?: string) {
  if (!desc)
    return ''
  return validateLength('角色描述', desc, undefined, 200)
}
