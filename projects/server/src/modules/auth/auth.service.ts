import { Cron } from '@nestjs/schedule'
import { LoginUser } from 'src/entities'
import { LessThan, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AuthService {
  private readonly _logger = new Logger(AuthService.name)

  constructor(
    @InjectRepository(LoginUser)
    private readonly _userRepo: Repository<LoginUser>,
  ) { }

  /**
   * 定时任务
   * 每日0点清除过期的登录信息
   */
  @Cron('0 0 0 * * *')
  public async clearExpiredLogin() {
    this._logger.verbose('定时任务：清除过期的登录信息')

    await this._userRepo.delete({
      expireAt: LessThan(new Date()),
    })
  }

  public qb(alias = 'lu') {
    return this._userRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._userRepo
  }
}
