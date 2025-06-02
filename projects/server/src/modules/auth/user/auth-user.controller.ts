import { UserType } from 'types'
import { IsLogin } from 'src/guards'
import { SuccessBooleanDto, SuccessStringDto } from 'src/dto'
import { ApiSuccessResponse } from 'src/utils'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthService } from 'src/modules/jwt/jwt.service'
import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { LoginByPasswordBodyDto, LoginSuccessResDto } from 'src/dto/common/login'

import { UserService } from 'src/modules/user/user.service'
import { CreateUserBodyDto } from 'src/modules/user/dto/create-user.body'
import { LoginByWeChatBodyDto } from './dto/login-by-wechat.body.dto'
import { AuthUserService } from './auth-user.service'

@ApiTags('Auth User | 身份验证（个人用户）')
@Controller('auth/user')
export class AuthUserController {
  constructor(
    private readonly _jwtAuthSrv: JwtAuthService,
    private readonly _authUserSrv: AuthUserService,
    private readonly _userSrv: UserService,
  ) { }

  @ApiOperation({
    summary: '微信登录/注册',
  })
  @ApiSuccessResponse(LoginSuccessResDto)
  @Post('login/wechat')
  public loginByWeChat(
    @Body() body: LoginByWeChatBodyDto,
    @Req() req: FastifyRequest,
  ) {
    return this._authUserSrv.loginByWeChat(body.code, req.raw.ip)
  }

  @ApiOperation({
    summary: '用户注册',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @Post('register')
  public registerUser(
    @Body() body: CreateUserBodyDto,
  ) {
    return this._userSrv.createUser(body)
  }

  @ApiOperation({
    summary: '通过 账号/邮箱/手机号 + 密码 登录客户端',
  })
  @ApiSuccessResponse(LoginSuccessResDto)
  @Post('login/password')
  public loginUserByPassword(
    @Body() body: LoginByPasswordBodyDto,
    @Req() req: FastifyRequest,
  ) {
    return this._authUserSrv.loginUserByPassword(body, req.raw.ip)
  }

  @ApiOperation({
    summary: '登出客户端',
  })
  @ApiSuccessResponse(SuccessBooleanDto)
  @IsLogin(UserType.USER)
  @Get('logout')
  public async logout(
    @Req() req: FastifyRequest,
  ) {
    await this._jwtAuthSrv.destroyLoginAuthToken(req.raw.token)
    return true
  }
}
