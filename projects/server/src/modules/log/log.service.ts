import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Collection, DailyCount, DownloadRecord } from 'src/entities'
import { Repository } from 'typeorm'

@Injectable()
export class LogService {
  private readonly _logger = new Logger(LogService.name)

  constructor(
    @InjectRepository(DailyCount)
    private readonly _dailyCountRepo: Repository<DailyCount>,
    @InjectRepository(DownloadRecord)
    private readonly _downloadRecordRepo: Repository<DownloadRecord>,
    @InjectRepository(Collection)
    private readonly _collectionRepo: Repository<Collection>,
  ) { }

  public dailyCountQb(alias = 'dc') {
    return this._dailyCountRepo.createQueryBuilder(alias)
  }

  public dailyCountRepo() {
    return this._dailyCountRepo
  }

  public downloadRecordQb(alias = 'dr') {
    return this._downloadRecordRepo.createQueryBuilder(alias)
  }

  public downloadRecordRepo() {
    return this._downloadRecordRepo
  }

  public collectionQb(alias = 'c') {
    return this._collectionRepo.createQueryBuilder(alias)
  }

  public collectionRepo() {
    return this._collectionRepo
  }
}
