import { decorate } from 'ts-mixer'
import { ID_EXAMPLE } from 'types'
import { GenerateStringDecorator } from 'src/utils'
import type { ICategoryIdDto, ICategoryIdOptionalDto } from 'types'

const DESC = '分类的唯一标识'

export class CategoryIdDto implements ICategoryIdDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE))
  categoryId: string
}

export class CategoryIdOptionalDto implements ICategoryIdOptionalDto {
  @decorate(GenerateStringDecorator(DESC, ID_EXAMPLE, true))
  categoryId?: CategoryIdDto['categoryId']
}
