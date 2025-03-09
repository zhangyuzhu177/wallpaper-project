import { validateLength } from 'utils'

/**
 * 校验一个描述是否符合要求
 * @param desc 待校验的描述
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateDesc(desc?: string) {
  if (!desc)
    return ''
  return validateLength('描述', desc, undefined, 200)
}
