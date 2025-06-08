/**
 * 生成指定位数的数字字符串
 * @param length 要生成的字符串长度（位数）
 * @returns 纯数字字符串，不以0开头
 * @throws 如果长度小于1会抛出错误
 */
export function randomNumString(length: number): string {
  if (length < 1)
    throw new Error('长度必须大于1')

  // 生成第一位（1-9）
  const firstDigit = Math.floor(Math.random() * 9) + 1

  // 生成剩余位数（0-9）
  let result = firstDigit.toString()
  for (let i = 1; i < length; i++) {
    const digit = Math.floor(Math.random() * 10)
    result += digit.toString()
  }

  return result
}
