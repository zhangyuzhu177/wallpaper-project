import { Mixin } from 'ts-mixer'
import type { IUpsertCategoryBodyDto } from 'types'
import {
  DescOptionalDto,
  NameDto,
  OrderOptionalDto,
  StatusDto,
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
    StatusDto,
    DescOptionalDto,
    OrderOptionalDto,
  )
  implements IUpsertCategoryBodyDto {
}
