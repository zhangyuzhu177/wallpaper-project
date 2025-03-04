import { In, Not } from 'typeorm'
import type { Admin } from 'src/entities'
import type { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { OnModuleInit } from '@nestjs/common'

import { encryptPassword } from 'src/utils'
import type { SysConfig } from 'src/config/_sa.config'

import { AdminService } from '../admin.service'
import { CodeService } from '../../code/code.service'
import { JwtAuthService } from '../../jwt/jwt.service'

@Injectable()
export class AdminEntityService implements OnModuleInit {
  private readonly _entityRepo: Repository<Admin>

  constructor(
    private readonly _codeSrv: CodeService,
    private readonly _cfgSrv: ConfigService,
    private readonly _adminSrv: AdminService,
    private readonly _jwtAuthSrv: JwtAuthService,
  ) {
    this._entityRepo = this._adminSrv.repo()
  }

  onModuleInit() {
    this._initSysAdmin()
  }

  /**
   * 初始化系统管理员
   */
  private async _initSysAdmin() {
    const superAdminList = this._cfgSrv.get<SysConfig>('sa').admin

    // 删除无效的超级管理员
    await this._entityRepo.delete({
      sysAdmin: true,
      name: Not(In(superAdminList.map(sa => sa.name))),
    })

    // 添加新的超级管理员
    for (const { name, password } of superAdminList) {
      try {
        await this._entityRepo.save({
          name,
          phone: '',
          email: '',
          password: await encryptPassword(password),
          sysAdmin: true,
        })
      }
      catch (_) {
        await this._entityRepo.update(
          { name },
          {
            password: await encryptPassword(password),
            sysAdmin: true,
          },
        )
      }
    }
  }
}
