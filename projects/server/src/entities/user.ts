import { EMAIL_MAX_LENGTH } from 'utils'
import { ID_EXAMPLE, type IUser } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Login } from './login'
import { BaseTimeStamp } from './_timestamp'
import { Role } from './role'

@Entity()
export class User extends BaseTimeStamp implements IUser {
  @ApiProperty({
    description: '管理员的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '账号',
    example: 'account',
  })
  @Column({
    unique: true,
  })
  account: string

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
    nullable: true,
  })
  phone?: string

  @ApiProperty({
    description: '是否是系统管理员',
  })
  @Column({
    default: false,
  })
  sysAdmin: boolean

  @ApiProperty({
    description: '状态（true：正常，false：禁用）',
  })
  @Column({
    default: true,
  })
  status: boolean

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn()
  role?: Role

  @ApiPropertyOptional({
    description: '分配的角色 id',
  })
  @Column({
    nullable: true,
  })
  roleId?: Role['id']

  @ApiPropertyOptional({
    description: '登录信息',
  })
  @OneToMany(
    () => Login,
    login => login.user,
    { cascade: true },
  )
  logins?: Login[]
}
