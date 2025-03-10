import { ID_EXAMPLE, type IWallpaper } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Category } from './category'
import { Collection } from './collection'
import { BaseTimeStamp } from './_timestamp'
import { DownloadRecord } from './download-record'

@Entity()
export class Wallpaper extends BaseTimeStamp implements IWallpaper {
  @ApiProperty({
    description: '图片的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '图片名称',
  })
  @Column()
  name: string

  @ApiProperty({
    description: '图片大小',
  })
  @Column({
    type: 'bigint',
  })
  size: number

  @ApiProperty({
    description: '图片的url',
  })
  @Column()
  url: string

  @ApiPropertyOptional({
    description: '分配的壁纸分类 Id',
  })
  @Column({
    nullable: true,
  })
  categoryId: string

  @ApiPropertyOptional({
    description: '所属分类',
  })
  @ManyToOne(
    () => Category,
    category => category.wallpapers,
  )
  @JoinColumn()
  category: Category

  @ApiPropertyOptional({
    description: '下载的壁纸',
  })
  @OneToMany(
    () => DownloadRecord,
    down => down.wallpaper,
    { cascade: true },
  )
  downloadRecords?: DownloadRecord[]

  @ApiPropertyOptional({
    description: '收藏的壁纸',
  })
  @OneToMany(
    () => Collection,
    collection => collection.wallpaper,
    { cascade: true },
  )
  collections?: Collection[]
}
