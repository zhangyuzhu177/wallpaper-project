import type { IDailyCount } from 'types'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class DailyCount implements IDailyCount {
  @ApiProperty({
    description: '每日统计的唯一标识',
    example: '2024-9-1',
  })
  @PrimaryColumn()
  id: string

  @ApiProperty({
    description: '年份',
  })
  @Column()
  year: number

  @ApiProperty({
    description: '月份',
  })
  @Column()
  month: number

  @ApiProperty({
    description: '日期',
  })
  @Column()
  date: number

  @ApiProperty({
    description: '访问数量',
  })
  @Column({
    type: 'integer',
    default: 1,
  })
  access: number
}
