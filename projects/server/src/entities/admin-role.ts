import { ID_EXAMPLE } from 'types'
import type { IAdminRole } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Admin } from './admin'
import { Permission } from './permission'
import { BaseTimeStamp } from './_timestamp'

@Entity()
export class AdminRole extends BaseTimeStamp implements IAdminRole {
  @ApiProperty({
    description: '管理员角色的唯一标识',
    example: ID_EXAMPLE,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '管理员角色的名称',
  })
  @Column({
    unique: true,
  })
  name: string

  @ApiProperty({
    description: '管理员角色的描述',
  })
  @Column({
    nullable: true,
  })
  desc?: string

  @ApiPropertyOptional({
    description: '权限列表',
  })
  @ManyToMany(
    () => Permission,
    permission => permission.adminRoles,
    { onDelete: 'CASCADE' },
  )
  @JoinTable()
  permissions?: Permission[]

  @ApiPropertyOptional({
    description: '分配了该角色的管理员',
  })
  @OneToMany(
    () => Admin,
    admin => admin.adminRole,
  )
  admins?: Admin[]
}
