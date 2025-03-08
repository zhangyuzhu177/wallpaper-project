import { Repository } from 'typeorm'
import type { IConfigDto } from 'types'
import { SysConfig } from 'src/entities'
import type { ConfigDto } from 'src/dto'
import type { Admin } from 'src/entities'
import { responseError } from 'src/utils'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Config, ErrorCode, PermissionType } from 'types'

import type { UpsertSysConfigBodyDto } from './dto/upsert-sys-config.body'

@Injectable()
export class SysConfigService {
  constructor(
    @InjectRepository(SysConfig)
    private readonly _sysCfgRepo: Repository<SysConfig>,
  ) { }

  /**
   * 获取指定系统全局配置
   */
  public async getSysConfig<T extends Config>(
    id: T,
  ): Promise<ConfigDto[T]> {
    return (await this._sysCfgRepo.findOneBy({ id }))?.config as IConfigDto[T]
  }

  /**
     * 创建/更新系统全局配置
     */
  public async upsertSysConfig(id: Config, body: UpsertSysConfigBodyDto, admin?: Admin) {
    // 校验管理员权限
    const permission = admin?.adminRole?.permissions?.map(({ name }) => name)
    if (
      id === Config.DOWNLOAD_LIMIT && !permission.includes(PermissionType.USER_CHANGE_DOWNLOAD_LIMIT)
    )
      responseError(ErrorCode.PERMISSION_DENIED)

    if (
      id === Config.BANNER_CONFIG && !permission.includes(PermissionType.CONFIG_UPSERT)
    )
      responseError(ErrorCode.PERMISSION_DENIED)

    await this._sysCfgRepo.save(
      this._sysCfgRepo.create({
        id,
        config: body[id] ?? {},
        adminName: admin?.name,
      }),
    )

    return id
  }

  public qb(alias = 'sc') {
    return this._sysCfgRepo.createQueryBuilder(alias)
  }

  repo() {
    return this._sysCfgRepo
  }
}
