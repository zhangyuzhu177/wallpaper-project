import type { Repository } from 'typeorm'
import type { DailyCount } from 'src/entities'
import { Injectable, Logger } from '@nestjs/common'

import { LogService } from '../log.service'

@Injectable()
export class DailyCountService {
  private _logger = new Logger(DailyCountService.name)

  private readonly _dailyCountRepo: Repository<DailyCount>

  constructor(
    private readonly _logSrv: LogService,
  ) {
    this._dailyCountRepo = this._logSrv.dailyCountRepo()
  }

  /**
   * 获取当前日期
   */
  private _getDate(src = new Date()) {
    const year = src.getFullYear()
    const month = src.getMonth() + 1
    const date = src.getDate()

    const id = `${year}-${month}-${date}`
    return { id, year, month, date }
  }

  /**
   * 记录访问量
   */
  public async recordAccess() {
    const { id, year, month, date } = this._getDate()
    try {
      const updateRes = await this._dailyCountRepo.increment({ id }, 'access', 1)
      if (!updateRes.affected) {
        await this._dailyCountRepo.insert({ id, year, month, date })
        this._logger.verbose(`新的每日访问记录：${id}`)
      }
    }
    catch (_) {
      await this._dailyCountRepo.increment({ id }, 'access', 1)
    }
  }
}
