import { getClientIp } from 'utils'
import { Injectable } from '@nestjs/common'
import type { NestMiddleware } from '@nestjs/common'

@Injectable()
export class IpMiddleware implements NestMiddleware {
  constructor() {}

  use(req: any, _res: any, next: () => void) {
    const ip = getClientIp(req)
    req.ip = ip
    next()
  }
}
