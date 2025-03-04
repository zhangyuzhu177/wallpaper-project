import { Injectable } from '@nestjs/common'
import { In, Not, Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import type { OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from 'src/entities/user'
import { encryptPassword } from 'src/utils'
import type { SysAdmin } from 'src/config/_sa.config'

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _cfgSrv: ConfigService,
  ) { }

  onModuleInit() {
    // this.initSysAdmin()
  }

  /**
   * 初始化系统管理员
   */
  public async initSysAdmin() {
    const superAdminList = this._cfgSrv.get<SysAdmin[]>('sa.list')
    // 删除无效的超级管理员
    await this._userRepo.delete({
      sysAdmin: true,
      account: Not(In(superAdminList.map(sa => sa.account))),
    })

    // 添加新的超级管理员
    for (const sa of superAdminList) {
      const { account, password } = sa
      try {
        await this._userRepo.save({
          account,
          email: '',
          password: await encryptPassword(password),
          sysAdmin: true,
        })
      }
      catch (e) {
        await this._userRepo.update(
          {
            account,
          },
          {
            password: await encryptPassword(password),
            sysAdmin: true,
          },
        )
      }
    }
  }

  public qb(alias = 'u') {
    return this._userRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._userRepo
  }
}
