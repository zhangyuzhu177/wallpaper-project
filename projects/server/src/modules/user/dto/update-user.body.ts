import { Mixin } from 'ts-mixer'
import type { IUpdateUserBodyDto } from 'types'
import {
  EmailOptionalDto,
  NameDto,
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
    NameDto,
    PhoneOptionalDto,
    EmailOptionalDto,
    PasswordOptionalDto,
    StatusOptionalDto,
  )
  implements IUpdateUserBodyDto {}
