import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { JwtAuthService } from 'src/modules/jwt/jwt.service'
import { AuthUserService } from './auth-user.service'

@ApiTags('Auth User | 身份验证（个人用户）')
@Controller('auth/user')
export class AuthUserController {
  constructor(
    private readonly _jwtAuthSrv: JwtAuthService,
    private readonly _authUserSrv: AuthUserService
    ,
  ) {}
}
