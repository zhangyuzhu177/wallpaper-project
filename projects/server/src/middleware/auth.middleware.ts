import { objectKeys } from 'utils'
import { ModuleRef } from '@nestjs/core'
import { Injectable } from '@nestjs/common'
import { userTypeDescriptions } from 'types'
import type { NestMiddleware } from '@nestjs/common'

import { AuthService } from 'src/modules/auth/auth.service'
import { JwtAuthService } from 'src/modules/jwt/jwt.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly _modRef: ModuleRef,
  ) { }

  /**
   * 从 BearAuthHeader 中读取 token
   */
  private _readTokenFromBearAuthHeader(authHeader: string): string {
    return authHeader && authHeader.replace(/^Bearer\s(\S*)$/, '$1')
  }

  async use(req: FastifyRequest, _res: any, next: () => void) {
    const { url, headers } = req

    let query: Record<string, string>
    try {
      query = url
        .split('?')
        .pop()
        .split('&')
        .reduce((dict, curr) => {
          const [key, value] = curr.split('=')
          dict[key] = value
          return dict
        }, {})
    }
    catch (_) { }

    const token = this._readTokenFromBearAuthHeader((headers as any).authorization) || query.token

    if (!token)
      return next()

    req.token = token
    const _jwtAuthSrv = this._modRef.get(JwtAuthService, { strict: false })
    const _authSrv = this._modRef.get(AuthService, { strict: false })

    // 验证 token，获取 token 中的信息
    let info: any
    try {
      info = await _jwtAuthSrv.validateLoginAuthToken(token)
      if (!info)
        throw new Error('用户 token 已过期')
    }
    catch (e) {
      req.tokenExpired = true
      return next()
    }

    if (info) {
      const auth = await _authSrv.repo().findOne({
        where: { token },
        relations: ['user', 'admin'],
      })

      // 登录信息是否失效
      const { id, expireAt, user, admin, status } = auth ?? {}
      const userEntity = user || admin
      if (!auth || new Date(expireAt).getTime() < Date.now()) {
        req.tokenExpired = true
        return next()
      }
      if (!status) {
        req.tokenLoginOther = true
        return next()
      }
      if (!userEntity?.status) {
        req.tokenDisable = true
        return next()
      }

      // 账号一致，token 校验正确
      if (userEntity.id === info.id) {
        objectKeys(userTypeDescriptions).some((key) => {
          if (auth[key]) {
            req[key] = auth[key] as any
            req.userType = key
            return true
          }
          return false
        })

        // 更新用户的最后活跃时间
        _authSrv.repo().update(
          { id },
          { lastActiveAt: new Date() },
        )
      }
      // 账号不一致，旧的登录授权 token 全部销毁
      else {
        req.tokenExpired = true
        try {
          await _jwtAuthSrv.destroyLoginAuthToken(token)
        }
        catch (e) { }
      }
    }

    next()
  }
}
