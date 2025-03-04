import { isIpAddress } from '../is'

/**
 * 校验一个 Ip 地址是否符合要求
 * @param ip 待校验的 Ip 地址
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateIp(ip?: string): string {
  if (typeof ip !== 'string')
    return 'Ip 地址必须是字符串'
  if (!isIpAddress(ip))
    return 'Ip 地址格式有误'
  return ''
}
