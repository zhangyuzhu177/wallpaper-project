/** 域名的最小长度 */
export const DOMAIN_MIN_LENGTH = 4
/** 域名的最大长度 */
export const DOMAIN_MAX_LENGTH = 255
/** 域名的要求描述 */
export const DOMAIN_REQUIREMENTS_DESC = `域名长度不得小于 ${DOMAIN_MIN_LENGTH} 位，不得大于 ${DOMAIN_MAX_LENGTH} 位`

/**
 * 校验一个域名是否符合要求
 * @param domain 待校验的域名
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateDomain(domain?: string): string {
  if (typeof domain !== 'string')
    return '域名必须是字符串'
  if (domain.length < DOMAIN_MIN_LENGTH)
    return `域名长度不得小于 ${DOMAIN_MIN_LENGTH} 位`
  if (domain.length > DOMAIN_MAX_LENGTH)
    return `域名长度不得大于 ${DOMAIN_MAX_LENGTH} 位`
  if (!/^([a-zA-Z0-9][a-zA-Z0-9_-]{0,62}\.)+([a-zA-Z]{2,6})$/.test(domain))
    return '域名格式有误'
  return ''
}
