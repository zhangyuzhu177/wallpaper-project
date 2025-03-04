import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

import { CodeService } from '../code/code.service'

import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth | 身份验证')
export class AuthController {
  constructor(
    private readonly _authSrv: AuthService,
    private readonly _codeSrv: CodeService,
  ) { }
}
