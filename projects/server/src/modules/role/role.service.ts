import { Repository } from 'typeorm'
import { DEFAULT_ADMIN_ROLES } from 'types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Role } from 'src/entities/role'

import { UserService } from '../user/user.service'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepo: Repository<Role>,

    private readonly _userSrv: UserService,
  ) { }

  /**
   * 初始化默认管理员角色
   */
  public async initDefaultAdminRoles() {
    // 初始化所有的默认角色
    await this._roleRepo.save(DEFAULT_ADMIN_ROLES)
    // 将所有超级管理员的角色设置为 root
    if (DEFAULT_ADMIN_ROLES.length)
      await this._userSrv.repo().update({ sysAdmin: true }, { roleId: DEFAULT_ADMIN_ROLES[0].id })
  }

  public qb(alias = 'r') {
    return this._roleRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._roleRepo
  }
}
