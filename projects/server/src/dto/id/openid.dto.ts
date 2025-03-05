import { decorate } from 'ts-mixer'
import { ID_EXAMPLE } from 'types'
import { GenerateStringDecorator } from 'src/utils'
import type { IOpenIdDto, IOpenIdOptionalDto } from 'types'

const DESC = '微信用户的唯一标识'

export class OpenIdDto implements IOpenIdDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE))
  openid: string
}

export class OpenIdOptionalDto implements IOpenIdOptionalDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE, true))
  openid?: OpenIdDto['openid']
}
