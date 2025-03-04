import { Reflector } from '@nestjs/core'
import { UserService } from 'src/modules/user/user.service'
import { AdminService } from 'src/modules/admin/admin.service'
import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { getReflectorValue, responseError, responseParamsError } from 'src/utils'
import { Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { EmailCodeAction, ErrorCode, emailCodeActionDescriptions } from 'types'

@Injectable()
class EmailCodeSendableGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _userSrv: UserService,
    private readonly _adminSrv: AdminService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const req: FastifyRequest = context.switchToHttp().getRequest()

    /** 邮箱已注册，且账号状态正常 */
    const registerRequiredActions = [
      EmailCodeAction.USER_LOGIN,
      EmailCodeAction.USER_CHANGE_PASSWORD,
      EmailCodeAction.USER_BIND_WEIXIN,
      EmailCodeAction.ADMIN_LOGIN,
      EmailCodeAction.ADMIN_CHANGE_PASSWORD,
      EmailCodeAction.ADMIN_BIND_WEIXIN,
    ]

    /** 邮箱未被注册 */
    const notRegisterRequiredActions = [
      EmailCodeAction.USER_BIND_EMAIL,
    ]

    const actionIn = getReflectorValue(this._reflector, context, 'actionIn', 'body')
    const actionKey = getReflectorValue(this._reflector, context, 'actionKey', 'action')
    const emailIn = getReflectorValue(this._reflector, context, 'emailIn', 'body')
    const emailKey = getReflectorValue(this._reflector, context, 'emailKey', 'email')

    const email = req?.[emailIn]?.[emailKey] as string
    const action = req?.[actionIn]?.[actionKey] as EmailCodeAction

    if (!action) {
      responseParamsError([{
        property: actionKey,
        constraints: {
          [actionKey]: `${actionKey} 参数是必须的`,
        },
      }])
    }
    if (!email) {
      responseParamsError([{
        property: emailKey,
        constraints: {
          [emailKey]: `${emailKey} 参数是必须的`,
        },
      }])
    }
    if (!emailCodeActionDescriptions[action]) {
      responseParamsError([{
        property: actionKey,
        constraints: {
          [actionKey]: `无效的 ${actionKey} 参数`,
        },
      }])
    }

    const repo = action.startsWith('user')
      ? this._userSrv.repo()
      : this._adminSrv.repo()
    const user = await repo.findOneBy({ email })

    if (registerRequiredActions.includes(action)) {
      if (!user)
        responseError(ErrorCode.AUTH_EMAIL_NOT_REGISTERED)
      else if (!user.status)
        responseError(ErrorCode.AUTH_ACCOUNT_IS_DISABLE)
    }

    if (notRegisterRequiredActions.includes(action) && user)
      responseError(ErrorCode.AUTH_EMAIL_REGISTERED)

    return true
  }
}

/**
 * 发送邮件验证码路由守卫
 * 确保 email + action 组合有效
 */
export function EmailCodeSendable(
  action?: { in?: 'body' | 'query'; key?: string },
  email?: { in?: 'body' | 'query'; key?: string },
) {
  return applyDecorators(
    UseGuards(EmailCodeSendableGuard),
    SetMetadata('actionIn', action?.in),
    SetMetadata('actionKey', action?.key),
    SetMetadata('emailIn', email?.in),
    SetMetadata('emailKey', email?.key),
  )
}
