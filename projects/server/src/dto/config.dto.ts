import { Config } from 'types'
import type { IConfigDto } from 'types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsObject, IsOptional, ValidateNested } from 'class-validator'
import { IsArray } from 'src/decorators'

export class ConfigDto implements IConfigDto {
  @ApiPropertyOptional({
    description: '轮播图配置',
  })
  @IsArray()
  @ValidateNested({
    each: true,
    message: '轮播图配置必须为对象',
  })
  @IsOptional()
  [Config.BANNER_CONFIG]?: IConfigDto[Config.BANNER_CONFIG]

  @ApiPropertyOptional({
    description: '轮播图配置',
  })
  @IsObject({
    message: '轮播图配置必须为对象',
  })
  @IsOptional()
  [Config.DOWNLOAD_LIMIT]?: IConfigDto[Config.DOWNLOAD_LIMIT]
}
