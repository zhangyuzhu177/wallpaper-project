import type { IPasswordDto } from '../../../dto/password.interface'
import type { IEmailOptionalDto } from '../../../dto/email.interface'
import type { IPhoneOptionalDto } from '../../../dto/phone.interface'
import type { ICodeVerifyDto } from '../../../dto/code-verify.interface'

/**
 * 通过 邮箱/手机号 + 验证码 修改密码
 * 请求参数
 */
export interface IChangePasswordByCodeBodyDto
  extends
  IEmailOptionalDto,
  IPhoneOptionalDto,
  ICodeVerifyDto,
  IPasswordDto {}
