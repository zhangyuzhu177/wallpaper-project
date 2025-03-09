import { Mixin } from 'ts-mixer'
import type { IUpsertCategoryBodyDto } from 'types'
import {
  DescOptionalDto,
  NameDto,
  OrderOptionalDto,
  UrlDto,
} from 'src/dto'

/**
 * 创建/更新公告信息
 * 请求参数
 */
export class UpsertCategoryBodyDto
  extends Mixin(
    UrlDto,
    NameDto,
    DescOptionalDto,
    OrderOptionalDto,
  )
  implements IUpsertCategoryBodyDto {
}
