import type { IRole } from 'types'
import { ID_EXAMPLE } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './user'
import { Permission } from './permission'
import { BaseTimeStamp } from './_timestamp'

@Entity()
export class Role extends BaseTimeStamp implements IRole {
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
    permission => permission.roles,
    { onDelete: 'CASCADE' },
  )
  @JoinTable()
  permissions?: Permission[]

  @ApiPropertyOptional({
    description: '分配了该角色的管理员',
  })
  @OneToMany(
    () => User,
    user => user.role,
  )
  users?: User[]
}
