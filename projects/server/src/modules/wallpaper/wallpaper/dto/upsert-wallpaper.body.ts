import { Mixin, decorate } from 'ts-mixer'
import type { IUpsertWallpaperBodyDto } from 'types'
import {
  CategoryIdDto,
  NameDto,
  UrlDto,
} from 'src/dto'
import { GenerateNumberDecorator } from 'src/utils'

/**
 * 创建/更新公告信息
 * 请求参数
 */
export class UpsertWallpaperBodyDto
  extends Mixin(
    UrlDto,
    NameDto,
    CategoryIdDto,
  )
  implements IUpsertWallpaperBodyDto {
  @decorate(GenerateNumberDecorator('大小'))
  size: number
}
