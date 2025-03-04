import { createClient } from 'redis'
import type { RedisClientType } from 'redis'
import { ConfigService } from '@nestjs/config'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class RedisService {
  private readonly _logger = new Logger(RedisService.name)
  /** Redis 客户端 */
  private _clients: Map<string, RedisClientType> = new Map()

  constructor(
    private readonly _cfgSrv: ConfigService,
  ) {}

  /**
   * 获取 Redis 客户端
   */
  public getClient(redisType: RedisType) {
    const { key, url } = this._cfgSrv.get<Record<string, any>>(`redis.${redisType}`) || {}
    if (!key || !url)
      return

    const client = this._clients.get(key)
    if (!client) {
      const _client = createClient({ url })
      _client.connect()
      this._clients.set(key, _client as any)
      this._logger.verbose(`新的 Redis 连接：${key}`)
      return _client as RedisClientType
    }
    return client
  }

  /**
   * 断开所有的 Redis 连接
   */
  public async disposeAllConnection() {
    return Promise.all(
      Array.from(this._clients.keys()).map(
        async key => await this._clients.get(key).quit(),
      ),
    )
  }
}
