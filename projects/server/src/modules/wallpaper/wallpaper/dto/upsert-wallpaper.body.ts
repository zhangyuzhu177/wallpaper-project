import { Mixin } from 'ts-mixer'
import type { IUpsertWallpaperBodyDto } from 'types'
import {
  CategoryIdDto,
  UrlDto,
} from 'src/dto'

/**
 * 创建/更新公告信息
 * 请求参数
 */
export class UpsertWallpaperBodyDto
  extends Mixin(
    UrlDto,
    CategoryIdDto,
  )
  implements IUpsertWallpaperBodyDto {
}
