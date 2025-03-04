import { decorate } from 'ts-mixer'
import { ID_EXAMPLE } from 'types'
import { GenerateStringDecorator } from 'src/utils'
import type { IAdminIdDto, IAdminIdOptionalDto } from 'types'

const DESC = '管理员的唯一标识'

export class AdminIdDto implements IAdminIdDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE))
  adminId: string
}

export class AdminIdOptionalDto implements IAdminIdOptionalDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE, true))
  adminId?: AdminIdDto['adminId']
}
