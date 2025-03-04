/** 账号的最小长度 */
export const ACCOUNT_MIN_LENGTH = 2
/** 账号的最大长度 */
export const ACCOUNT_MAX_LENGTH = 20
/** 账号中允许出现的字符 */
export const ACCOUNT_ALLOW_CHARS = '!#$%^&()_-.~'
/** 账号保留关键词 */
export const ACCOUNT_RESERVED_WORDS = ['admin', 'administrator', 'root', 'guest', 'user', 'system']
/** 账号的要求描述 */
export const ACCOUNT_REQUIREMENTS_DESC = `账号为 ${ACCOUNT_MIN_LENGTH} - ${ACCOUNT_MAX_LENGTH} 位，且不得包含 ${ACCOUNT_ALLOW_CHARS} 以外的特殊字符`

/**
 * 校验一个账号是否符合要求
 * @param account 待校验的账号
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateAccount(account?: string) {
  if (typeof account !== 'string')
    return '账号必须是字符串'

  if (account.length < ACCOUNT_MIN_LENGTH)
    return `账号长度不得小于 ${ACCOUNT_MIN_LENGTH} 位`
  if (account.length > ACCOUNT_MAX_LENGTH)
    return `账号长度不得大于 ${ACCOUNT_MAX_LENGTH} 位`

  // 检测保留关键词
  const reservedWord = ACCOUNT_RESERVED_WORDS.find(word => account.toLowerCase() === word)
  if (reservedWord)
    return `账号不得为保留关键词 “${reservedWord}”`

  // 检测特殊字符
  const specialChars = account.split('').filter(char => !/[a-zA-Z0-9]/.test(char))
  const notAllowedChar = specialChars.find(char => !ACCOUNT_ALLOW_CHARS.includes(char))
  if (notAllowedChar)
    return `账号不得包含 ${ACCOUNT_ALLOW_CHARS} 以外的特殊字符，特殊字符 “${notAllowedChar}” 不被允许`

  return ''
}
