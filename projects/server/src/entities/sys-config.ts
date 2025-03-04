import { Config } from 'types'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import type { IConfigDto, ISysConfig } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { BaseTimeStamp } from './_timestamp'

@Entity()
export class SysConfig extends BaseTimeStamp implements ISysConfig<Config> {
  @ApiProperty({
    description: '系统全局配置的唯一标识',
    example: Config.BANNER_CONFIG,
  })
  @PrimaryColumn({
    type: 'enum',
    enum: Config,
  })
  id: Config

  @ApiProperty({
    description: '系统全局配置',
  })
  @Column({
    type: 'json',
  })
  config: IConfigDto[Config]

  @ApiPropertyOptional({
    description: '最后一次修改的管理员姓名',
  })
  @Column({
    nullable: true,
  })
  adminName?: string
}
