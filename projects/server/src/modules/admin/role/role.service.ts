import type { Repository } from 'typeorm'
import { DEFAULT_ADMIN_ROLES } from 'types'
import { Injectable } from '@nestjs/common'

import type { AdminRole } from 'src/entities/admin-role'

import type { Admin } from 'src/entities'
import { AdminService } from '../admin.service'

@Injectable()
export class AdminRoleService {
  private readonly _entityRepo: Repository<Admin>
  private readonly _roleRepo: Repository<AdminRole>
  constructor(
    private readonly _adminSrv: AdminService,
  ) {
    this._entityRepo = this._adminSrv.repo()
    this._roleRepo = this._adminSrv.roleRepo()
  }

  /**
   * 初始化默认管理员角色
   */
  public async initDefaultAdminRoles() {
    // 初始化所有的默认角色
    await this._roleRepo.save(DEFAULT_ADMIN_ROLES)
    // 将所有超级管理员的角色设置为 root
    if (DEFAULT_ADMIN_ROLES.length) {
      await this._entityRepo.update(
        { sysAdmin: true },
        { adminRoleId: DEFAULT_ADMIN_ROLES[0].id })
    }
  }
}
