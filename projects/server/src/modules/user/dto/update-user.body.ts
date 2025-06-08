import { Mixin } from 'ts-mixer'
import type { IUpdateUserBodyDto } from 'types'
import {
  AvatarOptionalDto,
  EmailOptionalDto,
  NameOptionalDto,
  PasswordOptionalDto,
  PhoneOptionalDto,
  StatusOptionalDto,
} from 'src/dto'

/**
 * 更新个人用户
 * 请求参数
 */
export class UpdateUserBodyDto
  extends Mixin(
    NameOptionalDto,
    PhoneOptionalDto,
    EmailOptionalDto,
    AvatarOptionalDto,
    PasswordOptionalDto,
    StatusOptionalDto,
  )
  implements IUpdateUserBodyDto {}
