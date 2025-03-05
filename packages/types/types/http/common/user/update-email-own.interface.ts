import type { IEmailDto } from '../../../dto/email.interface'
import type { ICodeVerifyDto } from '../../../dto/code-verify.interface'

/**
 * 更新当前用户的邮箱
 * 请求参数
 */
export interface IUpdateEmailOwnBodyDto
  extends
  IEmailDto,
  ICodeVerifyDto {}
