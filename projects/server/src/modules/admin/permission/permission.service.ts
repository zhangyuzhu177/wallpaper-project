import { In, Not } from 'typeorm'
import { ALL_PERMISSIONS } from 'types'
import type { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import type { Permission } from 'src/entities'
import type { OnModuleInit } from '@nestjs/common'

import { AdminService } from '../admin.service'
import { AdminRoleService } from '../role/role.service'

@Injectable()
export class PermissionService implements OnModuleInit {
  private readonly _permissionRepo: Repository<Permission>

  constructor(
    private readonly _adminSrv: AdminService,
    private readonly _roleSrv: AdminRoleService,
  ) {
    this._permissionRepo = this._adminSrv.permissionRepo()
  }

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
}
