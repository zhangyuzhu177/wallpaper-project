import { decorate } from 'ts-mixer'
import { ID_EXAMPLE } from 'types'
import { GenerateStringDecorator } from 'src/utils'
import type { IAdminRoleIdDto, IAdminRoleIdOptionalDto } from 'types'

const DESC = '管理员角色的唯一标识'

export class AdminRoleIdDto implements IAdminRoleIdDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE))
  adminRoleId: string
}

export class AdminRoleIdOptionalDto implements IAdminRoleIdOptionalDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE, true))
  adminRoleId?: AdminRoleIdDto['adminRoleId']
}
