import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DailyCount } from 'src/entities'
import { Repository } from 'typeorm'

@Injectable()
export class LogService {
  private readonly _logger = new Logger(LogService.name)

  constructor(
    @InjectRepository(DailyCount)
    private readonly _dailyCountRepo: Repository<DailyCount>,
  ) { }

  public dailyCountQb(alias = 'dc') {
    return this._dailyCountRepo.createQueryBuilder(alias)
  }

  public dailyCountRepo() {
    return this._dailyCountRepo
  }
}
