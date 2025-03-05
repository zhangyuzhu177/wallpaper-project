import { Mixin } from 'ts-mixer'
import type { IAssignAdminRoleBodyDto } from 'types'
import { AdminRoleIdOptionalDto, IdsDto } from 'src/dto'

/**
 * 分配管理员角色
 * 请求参数
 */
export class AssignAdminRoleBodyDto
  extends Mixin(
    IdsDto,
    AdminRoleIdOptionalDto,
  )
  implements IAssignAdminRoleBodyDto {}
