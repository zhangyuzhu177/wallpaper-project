import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { type IAdmin, ID_EXAMPLE } from 'types'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EMAIL_MAX_LENGTH, PHONE_NUMBER_MAX_LENGTH } from 'utils'
import { BaseTimeStamp } from './_timestamp'
import { AdminRole } from './admin-role'
import { LoginUser } from './login-user'

@Entity()
export class Admin extends BaseTimeStamp implements IAdmin {
  @ApiProperty({
    description: '管理员的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '管理员的名称',
  })
  @Column({
    unique: true,
  })
  name: string

  @ApiProperty({
    description: '邮箱',
    example: '123456@163.com',
  })
  @Column({
    unique: true,
    length: EMAIL_MAX_LENGTH,
  })
  email: string

  @ApiProperty({
    description: '管理员的手机号',
    example: '18888888888',
  })
  @Column({
    unique: true,
    length: PHONE_NUMBER_MAX_LENGTH,
    nullable: true,
  })
  phone?: string

  @ApiPropertyOptional({
    description: '管理员的密码',
    example: 'String@#!',
  })
  @Column({
    select: false,
  })
  password: string

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

  @ApiPropertyOptional({
    description: '分配的管理员角色 Id',
  })
  @Column({
    nullable: true,
  })
  adminRoleId?: string

  @ManyToOne(
    () => AdminRole,
    adminRole => adminRole.admins,
  )
  @JoinColumn()
  adminRole?: AdminRole

  @ApiPropertyOptional({
    description: '用户登录信息',
  })
  @OneToMany(
    () => LoginUser,
    loginUser => loginUser.admin,
  )
  loginUsers?: LoginUser[]
}
