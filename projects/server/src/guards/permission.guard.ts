import { Reflector } from '@nestjs/core'
import type { PermissionType } from 'types'
import { ErrorCode, UserType } from 'types'
import { ApiBearerAuth } from '@nestjs/swagger'
import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'

import { getReflectorValue, responseError } from 'src/utils'
import { AdminService } from 'src/modules/admin/admin.service'

import { LoginGuard } from './login.guard'

type PermissionRelation = 'OR' | 'AND'

@Injectable()
export class PermissionGuard extends LoginGuard implements CanActivate {
  constructor(
    protected readonly _reflector: Reflector,
    protected readonly _adminSrv: AdminService,
  ) {
    super(_reflector)
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context)

    const req: FastifyRequest = context.switchToHttp().getRequest()

    const permissions = getReflectorValue<PermissionType[]>(
      this._reflector,
      context,
      'permissions',
    )
    const relation = getReflectorValue<PermissionRelation>(
      this._reflector,
      context,
      'relation',
    )

    return this._validatePermission(req, permissions, relation)
  }

  private async _validatePermission(
    req: FastifyRequest,
    permissions: PermissionType[],
    relation: PermissionRelation,
  ) {
    const { adminRoleId } = req.raw.admin

    const adminRole = adminRoleId
      ? await this._adminSrv.roleRepo().findOne({
        where: {
          id: adminRoleId,
        },
        relations: {
          permissions: true,
        },
      })
      : undefined

    // 保存管理员角色信息
    req.raw.admin.adminRole = adminRole

    if (!permissions.length)
      return true

    // 检查管理员权限
    const adminPermission = adminRole?.permissions?.map(({ name }) => name)
    const hasPermission = adminPermission?.length
      ? permissions[relation === 'OR' ? 'some' : 'every'](
        permission => adminPermission.includes(permission),
      )
      : false

    if (!hasPermission)
      responseError(ErrorCode.PERMISSION_DENIED)

    return true
  }
}

/**
 * 对用户权限进行校验的守卫
 * @param permissions 如果为空数组，则表示不需要权限，但是需要登录，会在用户信息上添加 `role` 字段
 */
export function HasPermission(
  permissions: PermissionType[] | PermissionType = [],
  relation: PermissionRelation = 'OR',
) {
  if (!Array.isArray(permissions))
    permissions = [permissions]

  return applyDecorators(
    UseGuards(PermissionGuard),
    ApiBearerAuth(),
    SetMetadata('userType', [UserType.ADMIN]),
    SetMetadata('permissions', permissions),
    SetMetadata('relation', relation),
  )
}
