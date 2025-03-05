import { ErrorCode } from 'types'
import { JwtService } from '@nestjs/jwt'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { Admin, User } from 'src/entities'
import { md5, responseError, responseParamsError } from 'src/utils'

import { objectOmit } from 'utils'
import { AuthService } from '../auth/auth.service'
import { RedisService } from '../redis/redis.service'

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly _jwtSrv: JwtService,
    private readonly _cfgSrv: ConfigService,
    private readonly _redisSrv: RedisService,

    @Inject(forwardRef(() => AuthService))
    private readonly _authSrv: AuthService,
  ) { }

  /**
   * 根据用户签发登录成功的授权token
   */
  public async signLoginAuthToken(
    user: {
      user?: User
      admin?: Admin
    },
    ip: string,
  ) {
    const key = ['user', 'admin'].find(key => !!user[key]) as keyof typeof user
    if (!key) {
      responseParamsError([{
        property: 'user',
        constraints: {
          user: 'user 中至少需要一个参数',
        },
      }])
    }

    // 将该用户其他的登录信息状态改为 false
    await this._authSrv.repo().update(
      {
        [`${key}Id`]: user[key].id,
        status: true,
      },
      {
        status: false,
      },
    )

    const expiresIn = this._cfgSrv.get<number>('jwt.loginAuthExpireInSeconds')
    const secret = this._cfgSrv.get<string>('jwt.loginAuthSecret')

    const signObj = {
      id: user[key].id,
      ip,
      timestamp: Date.now(),
    }
    const token = this._jwtSrv.sign(signObj, { secret, expiresIn })
    const client = this._redisSrv.getClient(RedisType.AUTH_JWT)
    await client.setEx(token, expiresIn, `${expiresIn}`)

    // 存储 token
    await this._authSrv.repo().insert({
      id: md5(token),
      token,
      expireAt: new Date(Date.now() + expiresIn * 1000),
      ip,
      lastActiveAt: new Date(),
      [`${key}Id`]: user[key].id,
    })

    return {
      sign: {
        token,
        expireAt: Date.now() + expiresIn * 1000,
      },
      [key]: objectOmit(user[key], 'password'),
    }
  }

  /**
   * 校验签发的用户授权 token
   */
  public async validateLoginAuthToken(token: string) {
    // 1. 检查 redis
    try {
      const client = this._redisSrv.getClient(RedisType.AUTH_JWT)
      const exists = await client.exists(token)
      if (!exists)
        return
    }
    catch (e) {
      return
    }

    // 2. 检查 token 是否有效
    return this._jwtSrv.verifyAsync(token, {
      secret: this._cfgSrv.get<string>('jwt.loginAuthSecret'),
    })
  }

  /**
   * 删除指定的token
   */
  public async destroyLoginAuthToken(token: string) {
    const client = this._redisSrv.getClient(RedisType.AUTH_JWT)
    try {
      const exists = await client.exists(token)
      if (!exists)
        throw new Error('AccessToken 不在缓存中')

      // 删除数据库中存储的 token
      this._authSrv.repo().delete({ id: md5(token) })
    }
    catch (e) {
      responseError(ErrorCode.AUTH_LOGIN_EXPIRED)
    }
    client.del(token)
    return true
  }
}
