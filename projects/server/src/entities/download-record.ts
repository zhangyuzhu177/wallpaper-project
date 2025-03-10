import { ID_EXAMPLE } from 'types'
import type { IDownloadRecord } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './user'
import { CreatedAt } from './_timestamp'
import { Wallpaper } from './wallpaper'

@Entity()
export class DownloadRecord extends CreatedAt implements IDownloadRecord {
  @ApiProperty({
    description: '下载记录的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiPropertyOptional({
    description: '下载的用户唯一标识',
  })
  @Column({
    nullable: true,
  })
  userId?: string

  @ApiPropertyOptional({
    description: '下载的用户',
  })
  @ManyToOne(
    () => User,
    user => user.downloadRecords,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user?: User

  @ApiPropertyOptional({
    description: '下载的壁纸唯一标识',
  })
  @Column({
    nullable: true,
  })
  wallpaperId?: string

  @ApiPropertyOptional({
    description: '下载的壁纸',
  })
  @ManyToOne(
    () => Wallpaper,
    wallpaper => wallpaper.downloadRecords,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  wallpaper?: Wallpaper
}
