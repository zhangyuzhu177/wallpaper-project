import { decorate } from 'ts-mixer'
import { GenerateStringDecorator } from 'src/utils'
import type { IAvatarDto, IAvatarOptionalDto } from 'types'

const DESC = '头像'

export class AvatarDto implements IAvatarDto {
  @decorate(GenerateStringDecorator(DESC))
  avatar: string
}

export class AvatarOptionalDto implements IAvatarOptionalDto {
  @decorate(GenerateStringDecorator(DESC, undefined, true))
  avatar?: AvatarDto['avatar']
}
