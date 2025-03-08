import type { IPasswordDto } from '../../../dto/password.interface'
import type { INameOptionalDto } from '../../../dto/name.interface'
import type { IEmailOptionalDto } from '../../../dto/email.interface'
import type { IPhoneOptionalDto } from '../../../dto/phone.interface'
import type { ICodeVerifyDto } from '../../../dto/code-verify.interface'
import type { IAccountOptionalDto } from '../../../dto/account.interface'

/**
 * 通过 姓名/账号/邮箱/手机号 + 密码 登录
 * 请求参数
 */
export interface ILoginByPasswordBodyDto
  extends
  IPasswordDto,
  IAccountOptionalDto,
  INameOptionalDto,
  IEmailOptionalDto,
  IPhoneOptionalDto,
  ICodeVerifyDto { }
