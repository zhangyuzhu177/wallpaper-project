import type { IPhoneDto } from '../../../dto/phone.interface'
import type { ICodeVerifyDto } from '../../../dto/code-verify.interface'

/**
 * 更新当前用户的手机号
 * 请求参数
 */
export interface IUpdatePhoneOwnBodyDto
  extends
  IPhoneDto,
  ICodeVerifyDto {}
