import { UserType } from 'types'
import { IsLogin } from 'src/guards'
import { SuccessBooleanDto } from 'src/dto'
import { ApiSuccessResponse } from 'src/utils'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthService } from 'src/modules/jwt/jwt.service'
import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { LoginByPasswordBodyDto, LoginSuccessResDto } from 'src/dto/common/login'

import { AuthAdminService } from './auth-admin.service'

@ApiTags('Auth Admin | 身份验证（管理员）')
@Controller('auth/admin')
export class AuthAdminController {
  constructor(
    private readonly _jwtAuthSrv: JwtAuthService,
    private readonly _authAdminSrv: AuthAdminService,
  ) { }

  @ApiOperation({
    summary: '通过 姓名/邮箱/手机号 + 密码 登录管理后台',
  })
  @ApiSuccessResponse(LoginSuccessResDto)
  @Post('login/password')
  public loginAdminByPassword(
    @Body() body: LoginByPasswordBodyDto,
    @Req() req: FastifyRequest,
  ) {
    return this._authAdminSrv.loginAdminByPassword(body, req.raw.ip)
  }

  @ApiOperation({
    summary: '登出管理后台',
  })
  @ApiSuccessResponse(SuccessBooleanDto)
  @IsLogin(UserType.ADMIN)
  @Get('logout')
  public async logout(
    @Req() req: FastifyRequest,
  ) {
    await this._jwtAuthSrv.destroyLoginAuthToken(req.raw.token)
    return true
  }
}
