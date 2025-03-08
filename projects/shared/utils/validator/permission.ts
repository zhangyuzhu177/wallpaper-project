import { validateNumber } from 'utils'

/**
 * 校验下载次数限制是否符合要求
 * @param limit 待校验的申请下载次数限制
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateDownloadLimit(limit?: number) {
  return validateNumber('下载壁纸次数限制', limit, 0, 100)
}
