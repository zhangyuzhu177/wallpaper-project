import { ErrorCode } from 'types'
import { randomString } from 'utils'
import type { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { Injectable, Logger } from '@nestjs/common'

import { UserService } from 'src/modules/user/user.service'
import { CodeService } from 'src/modules/code/code.service'
import { JwtAuthService } from 'src/modules/jwt/jwt.service'
import type { WeChatConfig } from 'src/config/_weChat.config'
import type { LoginByPasswordBodyDto } from 'src/dto/common/login'
import { comparePassword, paramAtLeastOne, responseError } from 'src/utils'

@Injectable()
export class AuthUserService {
  private readonly _logger = new Logger(AuthUserService.name)

  /** 微信服务配置 */
  private readonly _cfg: WeChatConfig

  /** 微信服务鉴权 */
  private _oauth = {
    token: '',
    expireAt: 0,
  }

  constructor(
    private readonly _httpSrv: HttpService,
    private readonly _codeSrv: CodeService,
    private readonly _cfgSrv: ConfigService,
    private readonly _userSrv: UserService,
    private readonly _jwtAuthSrv: JwtAuthService,
  ) {
    this._cfg = this._cfgSrv.get<WeChatConfig>('weChat')
  }

  /**
   * 登录微信服务
   */
  private async _loginWeChat() {
    const { appid, secret, baseURL } = this._cfg

    const getCfg = (token: string) => ({
      config: {
        baseURL,
        token,
      },
    })

    if (this._oauth.token && this._oauth.expireAt > Date.now())
      return getCfg(this._oauth.token)

    try {
      const res = await this._httpSrv.axiosRef({
        baseURL,
        method: 'GET',
        url: `cgi-bin/token?appid=${appid}&secret=${secret}&grant_type=client_credential`,
      })
      const { access_token: token, expires_in: expireAt } = res.data

      this._oauth = {
        token,
        expireAt,
      }

      return getCfg(token)
    }
    catch (e) {
      let { message } = e
      this._oauth.token = ''
      message = `微信服务异常：${message}`
      this._logger.error(message)
      responseError(ErrorCode.WECHAT_SERVER_ABNORMAL, message)
    }
  }

  /**
   * 带会话的请求
   */
  private _requestWithSession<T = any>(
    request: (axiosCfg) => Promise<AxiosResponse<T>>,
  ) {
    return new Promise<T>((resolve, reject) => {
      this._loginWeChat().then(
        ({ config }) =>
          request(config)
            .then((res) => {
              const { errcode, errmsg } = res.data as any
              if (errcode && errcode !== 0)
                throw new Error(errmsg)
              else
                resolve(res.data)
            })
            .catch((e) => {
              let { message } = e
              if (message === '签名校验失败')
                this._oauth.token = ''
              message = `微信服务异常：${message}`
              this._logger.error(message)
              responseError(ErrorCode.WECHAT_SERVER_ABNORMAL, message)
            }),
      ).catch(reject)
    })
  }

  /**
   * 获取微信用户信息
   */
  public async getWeChatOpenid(code: string) {
    const { appid, secret, baseURL } = this._cfg

    try {
      const res = await this._httpSrv.axiosRef({
        baseURL,
        method: 'GET',
        url: `/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=client_credential`,
      })

      const { errcode, errmsg } = res.data as any
      if (errcode && errcode !== 0)
        throw new Error(errmsg)
      else return res.data
    }
    catch (e) {
      let { message } = e
      if (message === '签名校验失败')
        this._oauth.token = ''
      message = `微信服务异常：${message}`
      this._logger.error(message)
      responseError(ErrorCode.WECHAT_SERVER_ABNORMAL, message)
    }
  }

  /**
   * 微信登录
   */
  public async loginByWeChat(code: string, ip: string) {
    const { openid } = await this.getWeChatOpenid(code)

    // 查询用户是否存在
    let user = await this._userSrv.repo().findOneBy({ openid })

    if (!user) {
      // 不存在自动创建用户
      user = this._userSrv.repo().create({
        openid,
        account: randomString(9, 9, ''),
        name: `微信用户${randomString(4, 4, '')}`,
      })
      await this._userSrv.repo().save(user)
    }

    if (user.status)
      responseError(ErrorCode.AUTH_ACCOUNT_IS_DISABLE)

    // 签发 token
    return this._jwtAuthSrv.signLoginAuthToken({ user }, ip)
  }

  /**
   * 通过 账号/邮箱/手机号 + 密码 登录
   */
  public async loginUserByPassword(body: LoginByPasswordBodyDto, ip: string) {
    paramAtLeastOne(body, 'account', 'email', 'phone')

    const { account, email, phone, password, code, bizId } = body

    await this._codeSrv.verifyCaptcha(bizId, [ip, code])

    const qb = this._userSrv.qb().addSelect('u.password')
    if (account)
      qb.where('account = :account', { account })
    else if (email)
      qb.where('email = :email', { email })
    else if (phone)
      qb.where('phone = :phone', { phone })
    const user = await qb.getOne()

    if (!user) {
      responseError(
        account
          ? ErrorCode.AUTH_ACCOUNT_NOT_REGISTERED
          : email
            ? ErrorCode.AUTH_EMAIL_NOT_REGISTERED
            : ErrorCode.AUTH_PHONE_NOT_REGISTERED,
      )
    }

    if (user.status)
      responseError(ErrorCode.AUTH_ACCOUNT_IS_DISABLE)

    // 校验密码
    const correct = await comparePassword(password, user.password)
    if (!correct)
      responseError(ErrorCode.AUTH_PASSWORD_NOT_MATCHED)

    return this._jwtAuthSrv.signLoginAuthToken({ user }, ip)
  }
}
