import { ErrorCode } from 'types'
import { responseError } from 'src/utils'
import { Injectable } from '@nestjs/common'
import { randomString } from '@catsjuice/utils'
import type { EmailCodeAction, PhoneCodeAction } from 'types'

import { RedisService } from '../redis/redis.service'

@Injectable()
export class CodeService {
  constructor(
    private readonly _redisSrv: RedisService,
  ) { }

  /**
   * 创建一个验证码并存入 redis
   */
  public async createCode(
    id: string,
    action: EmailCodeAction | PhoneCodeAction,
    code?: string,
  ) {
    while (!code || code.startsWith('0'))
      code = Math.random().toString().slice(-6)
    const bizId = randomString(24, 24, '') + Date.now().toString(36)

    // 将验证码保存到 redis
    const client = this._redisSrv.getClient(RedisType.CODE)
    await client.setEx(bizId, 5 * 60, JSON.stringify([
      id,
      action,
      code,
    ]))
    return { code, bizId }
  }

  /**
   * 校验邮件/短信验证码是否正确
   */
  public async verifyCode(
    bizId: string,
    compareInfo: [string, EmailCodeAction | PhoneCodeAction, string],
      deleteAfterVerify = true,
  ) {
    const client = this._redisSrv.getClient(RedisType.CODE)
    const codeInfo = await client.get(bizId)

    try {
      if (
        codeInfo
          && (JSON.parse(codeInfo) as string[]).every((v, i) => v === compareInfo[i])
      ) {
        if (deleteAfterVerify)
          client.del(bizId)
        return true
      }
      throw new Error('验证码校验失败')
    }
    catch (_) {
      responseError(ErrorCode.AUTH_CODE_NOT_MATCHED)
    }
  }
}
