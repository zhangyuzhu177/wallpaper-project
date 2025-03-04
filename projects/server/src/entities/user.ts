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

@Entity()
export class User extends BaseTimeStamp implements IUser {
  @ApiProperty({
    description: '管理员的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '姓名',
    example: 'account',
  })
  @Column({
    unique: true,
  })
  name: string

  @ApiPropertyOptional({
    description: '用户密码',
    example: 'String@#!',
  })
  @Column({
    select: false,
  })
  password: string

  @ApiProperty({
    description: '邮箱',
    example: '123456@163.com',
  })
  @Column({
    unique: true,
    length: EMAIL_MAX_LENGTH,
  })
  email: string

  @ApiPropertyOptional({
    description: '手机号',
    example: '18888888888',
  })
  @Column({
    unique: true,
    length: PHONE_NUMBER_MAX_LENGTH,
  })
  phone: string

  @ApiPropertyOptional({
    description: '头像',
    example: '18888888888',
  })
  @Column({
    nullable: true,
  })
  avatar?: string

  @ApiProperty({
    description: '状态（true：正常，false：禁用）',
  })
  @Column({
    default: true,
  })
  status: boolean

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
