import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { JwtAuthService } from 'src/modules/jwt/jwt.service'
import { AuthAdminService } from './auth-admin.service'

@ApiTags('Auth Admin | 身份验证（管理员）')
@Controller('auth/admin')
export class AuthAdminController {
  constructor(
    private readonly _jwtAuthSrv: JwtAuthService,
    private readonly _authAdminSrv: AuthAdminService,
  ) {}
}
