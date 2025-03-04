import { Reflector } from '@nestjs/core'
import { UserService } from 'src/modules/user/user.service'
import { AdminService } from 'src/modules/admin/admin.service'
import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { getReflectorValue, responseError, responseParamsError } from 'src/utils'
import { Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { ErrorCode, PhoneCodeAction, phoneCodeActionDescriptions } from 'types'

@Injectable()
class PhoneCodeSendableGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _userSrv: UserService,
    private readonly _adminSrv: AdminService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const req: FastifyRequest = context.switchToHttp().getRequest()

    /** 手机号已注册，且账号状态正常 */
    const registerRequiredActions = [
      PhoneCodeAction.USER_LOGIN,
      PhoneCodeAction.USER_CHANGE_PASSWORD,
      PhoneCodeAction.USER_BIND_WEIXIN,
      PhoneCodeAction.ADMIN_LOGIN,
      PhoneCodeAction.ADMIN_CHANGE_PASSWORD,
      PhoneCodeAction.ADMIN_BIND_WEIXIN,
    ]

    /** 手机号未被注册 */
    const notRegisterRequiredActions = [
      PhoneCodeAction.USER_BIND_PHONE,
    ]

    const actionIn = getReflectorValue(this._reflector, context, 'actionIn', 'body')
    const actionKey = getReflectorValue(this._reflector, context, 'actionKey', 'action')
    const phoneIn = getReflectorValue(this._reflector, context, 'phoneIn', 'body')
    const phoneKey = getReflectorValue(this._reflector, context, 'phoneKey', 'phone')

    const phone = req?.[phoneIn]?.[phoneKey] as string
    const action = req?.[actionIn]?.[actionKey] as PhoneCodeAction

    if (!action) {
      responseParamsError([{
        property: actionKey,
        constraints: {
          [actionKey]: `${actionKey} 参数是必须的`,
        },
      }])
    }
    if (!phone) {
      responseParamsError([{
        property: phoneKey,
        constraints: {
          [phoneKey]: `${phoneKey} 参数是必须的`,
        },
      }])
    }
    if (!phoneCodeActionDescriptions[action]) {
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
    const user = await repo.findOneBy({ phone })

    if (registerRequiredActions.includes(action)) {
      if (!user)
        responseError(ErrorCode.AUTH_PHONE_NOT_REGISTERED)
      else if (!user.status)
        responseError(ErrorCode.AUTH_ACCOUNT_IS_DISABLE)
    }

    if (notRegisterRequiredActions.includes(action) && user)
      responseError(ErrorCode.AUTH_PHONE_REGISTERED)

    return true
  }
}

/**
 * 发送手机短信验证码路由守卫
 * 确保 phone + action 组合有效
 */
export function PhoneCodeSendable(
  action?: { in?: 'body' | 'query'; key?: string },
  phone?: { in?: 'body' | 'query'; key?: string },
) {
  return applyDecorators(
    UseGuards(PhoneCodeSendableGuard),
    SetMetadata('actionIn', action?.in),
    SetMetadata('actionKey', action?.key),
    SetMetadata('phoneIn', phone?.in),
    SetMetadata('phoneKey', phone?.key),
  )
}
