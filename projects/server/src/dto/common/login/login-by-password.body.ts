import { Mixin } from 'ts-mixer'
import type { ILoginByPasswordBodyDto } from 'types'
import { CodeVerifyOptionalDto } from 'src/dto/code-verify.dto'
import { AccountOptionalDto } from 'src/dto/account.dto'

import { PasswordDto } from '../../password.dto'
import { NameOptionalDto } from '../../name.dto'
import { EmailOptionalDto } from '../../email.dto'
import { PhoneOptionalDto } from '../../phone.dto'

/**
 * 通过 姓名/账号/邮箱/手机号 + 密码 登录管理后台
 * 请求参数
 */
export class LoginByPasswordBodyDto
  extends Mixin(
    PasswordDto,
    NameOptionalDto,
    EmailOptionalDto,
    PhoneOptionalDto,
    AccountOptionalDto,
    CodeVerifyOptionalDto,
  )
  implements ILoginByPasswordBodyDto {}
