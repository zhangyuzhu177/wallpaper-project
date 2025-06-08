import { Mixin } from 'ts-mixer'
import type { ICreateUserBodyDto } from 'types'
import {
  AccountDto,
  AvatarOptionalDto,
  EmailOptionalDto,
  NameDto,
  PasswordDto,
  PasswordOptionalDto,
  PhoneOptionalDto,
  StatusOptionalDto,
} from 'src/dto'

/**
 * 创建个人用户
 * 请求参数
 */
export class CreateUserBodyDto
  extends Mixin(
    NameDto,
    PhoneOptionalDto,
    EmailOptionalDto,
    AvatarOptionalDto,
    PasswordOptionalDto,
    StatusOptionalDto,
    PasswordDto,
    AccountDto,
  )
  implements ICreateUserBodyDto {}
