import { ErrorCode } from 'types'
import { Injectable } from '@nestjs/common'

import { JwtAuthService } from 'src/modules/jwt/jwt.service'
import { AdminService } from 'src/modules/admin/admin.service'
import type { LoginByPasswordBodyDto } from 'src/dto/common/login'
import { comparePassword, paramAtLeastOne, responseError } from 'src/utils'
import { CodeService } from 'src/modules/code/code.service'

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly _codeSrv: CodeService,
    private readonly _adminSrv: AdminService,
    private readonly _jwtAuthSrv: JwtAuthService,
  ) { }

  /**
   * 通过 姓名/邮箱/手机号 + 密码 登录管理后台
   */
  public async loginAdminByPassword(body: LoginByPasswordBodyDto, ip: string) {
    paramAtLeastOne(body, 'name', 'email', 'phone')

    const { name, email, phone, password, code, bizId } = body

    await this._codeSrv.verifyCaptcha(bizId, [ip, code])

    const qb = this._adminSrv.qb().addSelect('a.password')
    if (name)
      qb.where('name = :name', { name })
    else if (email)
      qb.where('email = :email', { email })
    else if (phone)
      qb.where('phone = :phone', { phone })
    const admin = await qb.getOne()

    if (!admin) {
      responseError(
        name
          ? ErrorCode.AUTH_ACCOUNT_NOT_REGISTERED
          : email
            ? ErrorCode.AUTH_EMAIL_NOT_REGISTERED
            : ErrorCode.AUTH_PHONE_NOT_REGISTERED,
      )
    }
    if (!admin.status)
      responseError(ErrorCode.AUTH_ACCOUNT_IS_DISABLE)

    // 校验密码
    const correct = await comparePassword(password, admin.password)
    if (!correct)
      responseError(ErrorCode.AUTH_PASSWORD_NOT_MATCHED)

    return this._jwtAuthSrv.signLoginAuthToken({ admin }, ip)
  }
}
