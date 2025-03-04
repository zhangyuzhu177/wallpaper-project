import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { CodeService } from 'src/modules/code/code.service'
import { JwtAuthService } from 'src/modules/jwt/jwt.service'
import { AdminService } from 'src/modules/admin/admin.service'

@Injectable()
export class AuthUserService {
  constructor(
    private readonly _codeSrv: CodeService,
    private readonly _cfgSrv: ConfigService,
    private readonly _adminSrv: AdminService,
    private readonly _jwtAuthSrv: JwtAuthService,
  ) {}
}
