import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ID_EXAMPLE, type IWallpaper } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BaseTimeStamp } from './_timestamp'
import { Category } from './category'

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

  @ManyToOne(
    () => Category,
    category => category.wallpapers,
  )
  @JoinColumn()
  category: Category
}
