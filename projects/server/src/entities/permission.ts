import { PermissionType } from 'types'
import type { IPermission } from 'types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm'

import { Role } from './role'

@Entity()
export class Permission implements IPermission {
  @ApiProperty({
    description: '权限的名称，作为权限的唯一标识',
  })
  @PrimaryColumn()
  name: PermissionType

  @ApiPropertyOptional({
    description: '权限的描述信息',
  })
  @Column({
    nullable: true,
  })
  desc?: string

  @ApiPropertyOptional({
    description: '使用了当前权限的角色列表',
  })
  @ManyToMany(
    () => Role,
    role => role.permissions,
    { onDelete: 'CASCADE' },
  )
  roles?: Role[]
}
