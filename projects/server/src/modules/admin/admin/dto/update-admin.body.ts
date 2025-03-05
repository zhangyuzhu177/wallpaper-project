import { Mixin } from 'ts-mixer'
import type { IUpdateAdminBodyDto } from 'types'
import {
  AdminRoleIdOptionalDto,
  EmailDto,
  NameDto,
  PasswordOptionalDto,
  PhoneDto,
  StatusOptionalDto,
} from 'src/dto'

/**
 * 更新管理员
 * 请求参数
 */
export class UpdateAdminBodyDto
  extends Mixin(
    NameDto,
    PhoneDto,
    EmailDto,
    PasswordOptionalDto,
    StatusOptionalDto,
    AdminRoleIdOptionalDto,
  )
  implements IUpdateAdminBodyDto {}
