import type { IEmailOptionalDto } from '../../../dto/email.interface'
import type { IPhoneOptionalDto } from '../../../dto/phone.interface'
import type { ICodeVerifyDto } from '../../../dto/code-verify.interface'

/**
 * 通过 邮箱/手机号 + 验证码 登录
 * 请求参数
 */
export interface ILoginByCodeBodyDto
  extends
  IEmailOptionalDto,
  IPhoneOptionalDto,
  ICodeVerifyDto {}
