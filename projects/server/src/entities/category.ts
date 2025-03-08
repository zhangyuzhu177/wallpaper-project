import type { ICategory } from 'types'
import { ID_EXAMPLE } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { BaseTimeStamp } from './_timestamp'
import { Wallpaper } from './wallpaper'

@Entity()
export class Category extends BaseTimeStamp implements ICategory {
  @ApiProperty({
    description: '分类的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '分类名称',
    example: '这是分类名称',
  })
  @Column({
    unique: true,
  })
  name: string

  @ApiProperty({
    description: '封面地址',
  })
  @Column()
  url: string

  @ApiProperty({
    description: '分类描述',
  })
  @Column({
    nullable: true,
  })
  desc?: string

  @ApiPropertyOptional({
    description: '排序',
  })
  @Column({
    nullable: true,
  })
  order?: number

  @ApiPropertyOptional({
    description: '壁纸',
  })
  @OneToMany(
    () => Wallpaper,
    wallpaper => wallpaper.category,
  )
  wallpapers?: Wallpaper[]
}
