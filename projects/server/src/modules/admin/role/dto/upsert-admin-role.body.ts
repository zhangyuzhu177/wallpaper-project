import { Mixin } from 'ts-mixer'
import { Type } from 'class-transformer'
import { IsArray } from 'src/decorators'
import { PermissionType } from 'types'
import { IsEnum, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import type { IUpsertAdminRoleBodyDto } from 'types'
import { DescOptionalDto, NameDto, OrderOptionalDto } from 'src/dto'

/**
 * 创建/更新管理员角色
 * 请求参数
 */
export class UpsertAdminRoleBodyDto
  extends Mixin(
    NameDto,
    DescOptionalDto,
    OrderOptionalDto,
  )
  implements IUpsertAdminRoleBodyDto {
  @ApiPropertyOptional({
    description: '权限列表',
    example: [PermissionType.ADMIN_ASSIGN_ROLE],
  })
  @IsArray()
  @IsEnum(
    PermissionType,
    {
      each: true,
      message: 'permissions 中的每个值必须是 PermissionType 枚举值',
    },
  )
  @Type(() => String)
  @IsOptional()
  permissions?: PermissionType[]
}
