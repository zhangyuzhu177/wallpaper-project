import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ID_EXAMPLE, type INotice } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BaseTimeStamp } from './_timestamp'

@Entity()
export class Notice extends BaseTimeStamp implements INotice {
  @ApiProperty({
    description: '公告的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '公告的标题',
    example: '这是公告的标题',
  })
  @Column()
  title: string

  @ApiProperty({
    description: '公告的内容',
    example: '这是公告的内容',
  })
  @Column()
  content: string

  @ApiPropertyOptional({
    description: '排序',
  })
  @Column({
    nullable: true,
  })
  order?: number

  @ApiProperty({
    description: '发布日期',
  })
  @Column()
  date: Date

  @ApiProperty({
    description: '状态（true：正常，false：禁用）',
  })
  @Column({
    default: true,
  })
  status: boolean

  @ApiPropertyOptional({
    description: '最后一次修改的管理员姓名',
  })
  @Column({
    nullable: true,
  })
  adminName?: string
}
