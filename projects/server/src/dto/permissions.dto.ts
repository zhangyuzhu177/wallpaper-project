import { decorate } from 'ts-mixer'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'src/decorators'
import { GenerateParamsDecorator } from 'src/utils'
import type { IPermissionsDto, IPermissionsOptionalDto } from 'types'

function PermissionsDecorator(optional = false) {
  return GenerateParamsDecorator(
    [
      ApiProperty({
        description: '数据权限（数据板块、数据库、数据目录的 id）',
        type: [String],
      }),
      IsArray(),
      IsString({ each: true }),
    ],
    optional,
  )
}

export class PermissionsDto implements IPermissionsDto {
  @decorate(PermissionsDecorator())
  permissions: string[]
}

export class PermissionsOptionalDto implements IPermissionsOptionalDto {
  @decorate(PermissionsDecorator(true))
  permissions?: PermissionsDto['permissions']
}
