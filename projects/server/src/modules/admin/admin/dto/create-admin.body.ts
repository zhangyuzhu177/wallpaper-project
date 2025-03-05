import { Mixin } from 'ts-mixer'
import type { ICreateAdminBodyDto } from 'types'
import {
  AdminRoleIdOptionalDto,
  EmailDto,
  NameDto,
  PasswordDto,
  PhoneDto,
  StatusOptionalDto,
} from 'src/dto'

/**
 * 创建管理员
 * 请求参数
 */
export class CreateAdminBodyDto
  extends Mixin(
    NameDto,
    PhoneDto,
    EmailDto,
    PasswordDto,
    StatusOptionalDto,
    AdminRoleIdOptionalDto,
  )
  implements ICreateAdminBodyDto {}
