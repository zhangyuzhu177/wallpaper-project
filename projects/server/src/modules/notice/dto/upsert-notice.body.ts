import { Mixin } from 'ts-mixer'
import { IsString } from 'src/decorators'
import { OrderOptionalDto, StatusDto } from 'src/dto'
import type { IUpsertNoticeBodyDto } from 'types'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 创建/更新公告信息
 * 请求参数
 */
export class UpsertNoticeBodyDto
  extends Mixin(
    OrderOptionalDto,
    StatusDto,
  )
  implements IUpsertNoticeBodyDto {
  @ApiProperty({
    description: '公告标题',
  })
  @IsString()
  title: string

  @ApiProperty({
    description: '公告内容',
  })
  @IsString()
  content: string

  @ApiProperty({
    description: '发布日期',
    example: '2024-01-01',
  })
  @IsString()
  date: Date | string
}
