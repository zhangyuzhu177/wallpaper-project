import { ErrorCode } from 'types'
import { Reflector } from '@nestjs/core'
import { ApiBearerAuth } from '@nestjs/swagger'
import { getReflectorValue } from 'src/utils'
import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { ApiErrorResponse, responseError } from 'src/utils/response'
import { Injectable, UseGuards, applyDecorators } from '@nestjs/common'

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    public readonly reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: FastifyRequest = context.switchToHttp().getRequest()

    const loginRequired = getReflectorValue<boolean>(
      this.reflector,
      context,
      'loginRequired',
      true,
    )

    if (!req.raw.user && loginRequired)
      responseError(req.raw.tokenExpired ? ErrorCode.AUTH_LOGIN_EXPIRED : ErrorCode.AUTH_LOGIN_REQUIRED)

    return !!req.raw.user
  }
}

/**
 * 判断用户是否登录的守卫
 */
export function IsLogin() {
  return applyDecorators(
    UseGuards(LoginGuard),
    IsLoginApis(),
  )
}

export function IsLoginApis() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiErrorResponse(
      ErrorCode.AUTH_LOGIN_EXPIRED,
      ErrorCode.AUTH_LOGIN_REQUIRED,
    ),
  )
}
