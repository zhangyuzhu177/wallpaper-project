import { Mixin } from 'ts-mixer'
import type { ILoginByCodeBodyDto } from 'types'

import { EmailOptionalDto } from '../../email.dto'
import { PhoneOptionalDto } from '../../phone.dto'
import { CodeVerifyDto } from '../../code-verify.dto'

/**
 * 通过 邮箱/手机号 + 验证码 登录管理后台
 * 请求参数
 */
export class LoginByCodeBodyDto
  extends Mixin(
    EmailOptionalDto,
    PhoneOptionalDto,
    CodeVerifyDto,
  )
  implements ILoginByCodeBodyDto {}
