import type { Admin } from 'src/entities'
import { Injectable } from '@nestjs/common'
import { In, type Repository } from 'typeorm'
import type { AdminRole } from 'src/entities/admin-role'
import { parseSqlError, responseError } from 'src/utils'
import { ALL_PERMISSIONS, DEFAULT_ADMIN_ROLES, ErrorCode } from 'types'

import { AdminService } from '../admin.service'
import type { UpsertAdminRoleBodyDto } from './dto/upsert-admin-role.body'

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

  /**
   * 创建管理员角色
   */
  public async createAdminRole(body: UpsertAdminRoleBodyDto) {
    const { permissions } = body

    try {
      const adminRole = await this._roleRepo.save({
        ...body,
        permissions: ALL_PERMISSIONS.filter(v => permissions?.includes(v.name)),
      })
      return adminRole.id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY)
        responseError(ErrorCode.ADMIN_ROLE_NAME_EXISTS)
      throw e
    }
  }

  /**
   * 批量复制管理员角色
   */
  public async copyAdminRoles(ids: string[]) {
    if (ids.length === 1 && !(await this._roleRepo.existsBy({ id: ids[0] })))
      responseError(ErrorCode.ADMIN_ROLE_NOT_EXISTS)

    const adminRoles = await this._roleRepo.find({
      where: { id: In(ids) },
      relations: ['permissions'],
      select: ['name', 'desc', 'permissions'],
    })
    await this._roleRepo.save(
      adminRoles.map(v => ({
        ...v,
        name: `${v.name}_${Date.now()}_copy`,
      })),
    )
    return adminRoles.length
  }

  /**
   * 更新管理员角色
   */
  public async updateAdminRole(id: string, body: UpsertAdminRoleBodyDto) {
    const { permissions } = body

    if (DEFAULT_ADMIN_ROLES.some(v => v.id === id))
      responseError(ErrorCode.ADMIN_ROLE_UPDATE_DISABLE)
    if (!(await this._roleRepo.existsBy({ id })))
      responseError(ErrorCode.ADMIN_ROLE_NOT_EXISTS)

    try {
      await this._roleRepo.save({
        ...body,
        id,
        permissions: ALL_PERMISSIONS.filter(v => permissions?.includes(v.name)),
      })
      return id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY)
        responseError(ErrorCode.ADMIN_ROLE_NAME_EXISTS)
      throw e
    }
  }

  /**
   * 删除管理员角色
   */
  public async deleteAdminRole(id: string) {
    if (DEFAULT_ADMIN_ROLES.some(v => v.id === id))
      responseError(ErrorCode.ADMIN_ROLE_DELETE_DISABLE)
    if (!(await this._roleRepo.existsBy({ id })))
      responseError(ErrorCode.ADMIN_ROLE_NOT_EXISTS)

    try {
      const deleteRes = await this._roleRepo.delete({ id })
      return deleteRes.affected > 0
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.FOREIGN_KEY_CONSTRAINT_FAILS)
        responseError(ErrorCode.ADMIN_ROLE_IN_USAGE)
      throw e
    }
  }
}
