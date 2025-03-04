import type { ILoginUser } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'

import { User } from './user'
import { Admin } from './admin'
import { CreatedAt } from './_timestamp'

@Entity()
export class LoginUser extends CreatedAt implements ILoginUser {
  @ApiProperty({
    description: '登录记录唯一标识',
  })
  @PrimaryColumn()
  id: string

  @ApiProperty({
    description: '登录凭证',
  })
  @Column({
    length: 768,
    unique: true,
  })
  token: string

  @ApiProperty({
    description: '过期时间',
  })
  @Column()
  expireAt: Date

  @ApiProperty({ description: '登录的 ip' })
  @Column({ nullable: true })
  ip?: string

  @ApiProperty({
    description: '状态（true：正常，false：禁用）',
  })
  @Column({
    default: true,
  })
  status: boolean

  @ApiProperty({
    description: '最后活动时间',
  })
  @Column({
    nullable: true,
  })
  lastActiveAt?: Date

  @ApiPropertyOptional({
    description: '个人用户唯一标识',
  })
  @Column({
    nullable: true,
  })
  userId?: string

  @ApiPropertyOptional({
    description: '个人用户信息',
  })
  @ManyToOne(
    () => User,
    user => user.loginUsers,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user?: User

  @ApiPropertyOptional({
    description: '管理员唯一标识',
  })
  @Column({
    nullable: true,
  })
  adminId?: string

  @ApiPropertyOptional({
    description: '管理员信息',
  })
  @ManyToOne(
    () => Admin,
    admin => admin.loginUsers,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  admin?: Admin
}
