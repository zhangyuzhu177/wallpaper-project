import { ID_EXAMPLE } from 'types'
import type { ICollection } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'

import { User } from './user'
import { CreatedAt } from './_timestamp'
import { Wallpaper } from './wallpaper'

@Unique('collection', ['userId', 'wallpaperId'])
@Entity()
export class Collection extends CreatedAt implements ICollection {
  @ApiProperty({
    description: '收藏记录的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiPropertyOptional({
    description: '收藏的用户唯一标识',
  })
  @Column({
    nullable: true,
  })
  userId?: string

  @ApiPropertyOptional({
    description: '收藏的用户',
  })
  @ManyToOne(
    () => User,
    user => user.collections,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user?: User

  @ApiPropertyOptional({
    description: '收藏的壁纸唯一标识',
  })
  @Column({
    nullable: true,
  })
  wallpaperId?: string

  @ApiPropertyOptional({
    description: '收藏的壁纸',
  })
  @ManyToOne(
    () => Wallpaper,
    wallpaper => wallpaper.collections,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  wallpaper?: Wallpaper
}
