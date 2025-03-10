import { ID_EXAMPLE } from 'types'
import type { IUser } from 'types'
import { EMAIL_MAX_LENGTH, PHONE_NUMBER_MAX_LENGTH } from 'utils'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { LoginUser } from './login-user'
import { BaseTimeStamp } from './_timestamp'
import { DownloadRecord } from './download-record'
import { Collection } from './collection'

@Entity()
export class User extends BaseTimeStamp implements IUser {
  @ApiProperty({
    description: '个人用户的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '微信用户的唯一标识',
    example: ID_EXAMPLE,
  })
  @Column({
    unique: true,
    nullable: true,
  })
  openid?: string

  @ApiProperty({
    description: '账号',
    example: 'account',
  })
  @Column({
    unique: true,
  })
  account: string

  @ApiProperty({
    description: '昵称',
    example: 'account',
  })
  @Column()
  name: string

  @ApiPropertyOptional({
    description: '用户密码',
    example: 'String@#!',
  })
  @Column({
    select: false,
    nullable: true,
  })
  password?: string

  @ApiProperty({
    description: '邮箱',
    example: '123456@163.com',
  })
  @Column({
    unique: true,
    length: EMAIL_MAX_LENGTH,
    nullable: true,
  })
  email?: string

  @ApiPropertyOptional({
    description: '手机号',
    example: '18888888888',
  })
  @Column({
    unique: true,
    nullable: true,
    length: PHONE_NUMBER_MAX_LENGTH,
  })
  phone?: string

  @ApiPropertyOptional({
    description: '头像',
    example: '18888888888',
  })
  @Column({
    nullable: true,
    default: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
  })
  avatar?: string

  @ApiProperty({
    description: '下载次数限制',
  })
  @Column({
    nullable: true,
  })
  downloadLimit?: number

  @ApiProperty({
    description: '状态（true：正常，false：禁用）',
  })
  @Column({
    default: true,
  })
  status: boolean

  @ApiPropertyOptional({
    description: '下载的壁纸',
  })
  @OneToMany(
    () => DownloadRecord,
    down => down.user,
    { cascade: true },
  )
  downloadRecords?: DownloadRecord[]

  @ApiPropertyOptional({
    description: '收藏的壁纸',
  })
  @OneToMany(
    () => Collection,
    collection => collection.user,
    { cascade: true },
  )
  collections?: Collection[]

  @ApiPropertyOptional({
    description: '登录信息',
  })
  @OneToMany(
    () => LoginUser,
    loginUser => loginUser.user,
    { cascade: true },
  )
  loginUsers?: LoginUser[]
}
