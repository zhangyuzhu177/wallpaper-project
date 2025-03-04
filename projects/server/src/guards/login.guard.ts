import { ErrorCode, UserType, userTypeDescriptions } from 'types'
import { Reflector } from '@nestjs/core'
import { ApiBearerAuth } from '@nestjs/swagger'
import { getReflectorValue } from 'src/utils'
import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { responseError } from 'src/utils/response'
import { Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'
import { AdminService } from 'src/modules/admin/admin.service'
import { objectKeys } from 'utils'

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    protected readonly _reflector: Reflector,
    protected readonly _userSrv?: UserService,
    protected readonly _adminSrv?: AdminService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const req: FastifyRequest = context.switchToHttp().getRequest()

    const { tokenExpired, tokenDisable, tokenLoginOther, userType: key } = req.raw

    if (tokenExpired)
      responseError(ErrorCode.AUTH_LOGIN_EXPIRED)
    if (tokenDisable)
      responseError(ErrorCode.AUTH_ACCOUNT_IS_DISABLE)
    if (tokenLoginOther)
      responseError(ErrorCode.AUTH_ACCOUNT_LOGIN_OTHER)

    const userType = getReflectorValue<UserType[]>(
      this._reflector,
      context,
      'userType',
    )
    const loadPermission = getReflectorValue(
      this._reflector,
      context,
      'loadPermission',
      false,
    )

    if (!key || !userType.includes(key))
      responseError(ErrorCode.AUTH_NOT_LOGIN)
    if (!req.raw[key]?.status)
      responseError(ErrorCode.AUTH_ACCOUNT_IS_DISABLE)

    // 加载用户权限
    if (loadPermission) {
      // 管理员
      if (key === UserType.ADMIN && this._adminSrv) {
        req.raw.admin = await this._adminSrv.repo().findOne({
          where: { id: req.raw.admin.id },
          relations: {
            adminRole: { permissions: true },
          },
        })
      }
      // 个人用户
      else if (key === UserType.USER && this._userSrv) {
        req.raw.user = await this._userSrv.repo().findOne({
          where: { id: req.raw.user.id },
        })
      }
    }

    return true
  }
}

/**
 * 登录路由守卫
 * 确保指定用户类型已登录
 */
export function IsLogin(
  userType: UserType | UserType[] = [],
  loadPermission = false,
) {
  if (!Array.isArray(userType))
    userType = [userType]
  if (!userType.length)
    userType = objectKeys(userTypeDescriptions)

  return applyDecorators(
    UseGuards(LoginGuard),
    ApiBearerAuth(),
    SetMetadata('userType', userType),
    SetMetadata('loadPermission', loadPermission),
  )
}
