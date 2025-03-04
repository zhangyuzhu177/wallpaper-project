import { ALL_PERMISSIONS } from 'types'
import { Injectable } from '@nestjs/common'
import { In, Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import type { OnModuleInit } from '@nestjs/common'
import { Permission } from 'src/entities/permission'

import { RoleService } from '../role.service'

@Injectable()
export class PermissionService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private readonly _permissionRepo: Repository<Permission>,

    private readonly _roleSrv: RoleService,
  ) {}

  onModuleInit() {
    this._initPermissions()
  }

  /**
   * 初始化权限列表
   */
  private async _initPermissions() {
    // 插入或更新所有权限
    await this._permissionRepo.save(ALL_PERMISSIONS)
    // 删除不使用的权限
    await this._permissionRepo.delete({ name: Not(In(ALL_PERMISSIONS.map(({ name }) => name))) })
    // 初始化默认管理员角色
    await this._roleSrv.initDefaultAdminRoles()
  }

  public qb(alias = 'p') {
    return this._permissionRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._permissionRepo
  }
}
