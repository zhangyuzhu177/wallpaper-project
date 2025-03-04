import { Repository } from 'typeorm'
import { SysConfig } from 'src/entities'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class SysConfigService {
  constructor(
    @InjectRepository(SysConfig)
    private readonly _sysCfgRepo: Repository<SysConfig>,
  ) {}

  public qb(alias = 'sc') {
    return this._sysCfgRepo.createQueryBuilder(alias)
  }

  repo() {
    return this._sysCfgRepo
  }
}
