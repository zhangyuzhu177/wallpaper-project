import { Notice } from 'src/entities'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly _noticeRepo: Repository<Notice>,
  ) {}

  public qb(alias = 'n') {
    return this._noticeRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._noticeRepo
  }
}
