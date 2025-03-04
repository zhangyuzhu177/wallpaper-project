/** 端口号的最大长度 */
export const PORT_MAX_LENGTH = 5
/** 端口号的最小值 */
export const PORT_MIN_VALUE = 1
/** 端口号的最大值 */
export const PORT_MAX_VALUE = 65535

/**
 * 校验一个端口号是否符合要求
 * @param port 待校验的端口号
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validatePort(port?: number): string {
  if (typeof port !== 'number')
    return '端口号必须是数字'
  if (!port.toString().match(/^[1-9]\d*$/))
    return '无效的端口号'
  if (port.toString().length > PORT_MAX_LENGTH)
    return `端口号不能超过 ${PORT_MAX_LENGTH} 位`
  if (!(port >= PORT_MIN_VALUE && port <= PORT_MAX_VALUE))
    return `端口号必须在合法范围内（${PORT_MIN_VALUE} - ${PORT_MAX_VALUE}）`
  return ''
}
