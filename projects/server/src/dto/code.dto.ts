import { decorate } from 'ts-mixer'
import { GenerateStringDecorator } from 'src/utils'
import type { ICodeDto, ICodeOptionalDto } from 'types'

const DESC = '验证码'

export class CodeDto implements ICodeDto {
  @decorate(GenerateStringDecorator(DESC))
  code: string
}

export class CodeOptionalDto implements ICodeOptionalDto {
  @decorate(GenerateStringDecorator(DESC, undefined, true))
  code?: CodeDto['code']
}
