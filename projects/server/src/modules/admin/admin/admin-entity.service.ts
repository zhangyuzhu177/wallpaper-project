import { ErrorCode } from 'types'
import { In, Not } from 'typeorm'
import type { Admin } from 'src/entities'
import type { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { OnModuleInit } from '@nestjs/common'

import type { SysConfig } from 'src/config/_sa.config'
import type { ChangeStatusBodyDto } from 'src/dto/common/other'
import { encryptPassword, parseSqlError, responseError, responseParamsError } from 'src/utils'

import { AdminService } from '../admin.service'
import type { CreateAdminBodyDto } from './dto/create-admin.body'
import type { UpdateAdminBodyDto } from './dto/update-admin.body'
import type { AssignAdminRoleBodyDto } from './dto/assign-admin-role.body'

@Injectable()
export class AdminEntityService implements OnModuleInit {
  private readonly _entityRepo: Repository<Admin>

  constructor(
    private readonly _cfgSrv: ConfigService,
    private readonly _adminSrv: AdminService,
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

  /**
   * 获取当前登入管理员的信息
   */
  public async getOwnProfile(id: string, relations?: any) {
    try {
      return await this._entityRepo.findOne({
        where: { id },
        relations,
      })
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.ENTITY_PROPERTY_NOT_FOUND) {
        responseParamsError([{
          property: 'relation',
          constraints: {
            relation: '关联信息有误',
          },
        }])
      }
      throw e
    }
  }

  /**
   * 创建管理员
   */
  public async createAdmin(body: CreateAdminBodyDto) {
    const { name, phone, email, password } = body

    try {
      const insertRes = await this._entityRepo.insert({
        ...body,
        password: await encryptPassword(password),
      })

      return insertRes.identifiers[0].id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY) {
        const value = e.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === name)
          responseError(ErrorCode.ADMIN_EXISTS)
        else if (value === phone)
          responseError(ErrorCode.AUTH_PHONE_REGISTERED)
        else if (value === email)
          responseError(ErrorCode.AUTH_EMAIL_REGISTERED)
      }
      else if (sqlError === SqlError.FOREIGN_KEY_CONSTRAINT_FAILS) {
        responseError(ErrorCode.ADMIN_ROLE_NOT_EXISTS)
      }
      throw e
    }
  }

  /**
   * 更新管理员
   */
  public async updateAdmin(id: string, body: UpdateAdminBodyDto) {
    const { name, phone, email, password, adminRoleId, status } = body

    const admin = await this._entityRepo.findOneBy({ id })
    if (!admin)
      responseError(ErrorCode.ADMIN_NOT_EXISTS)
    if (admin.sysAdmin)
      responseError(ErrorCode.ADMIN_UPDATE_DISABLE)

    try {
      if (!adminRoleId)
        body.adminRoleId = null
      if (!status)
        body.status = false
      await this._entityRepo.update(
        { id },
        {
          ...body,
          password: password ? await encryptPassword(password) : undefined,
        },
      )

      return id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY) {
        const value = e.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === name)
          responseError(ErrorCode.ADMIN_EXISTS)
        else if (value === phone)
          responseError(ErrorCode.AUTH_PHONE_REGISTERED)
        else if (value === email)
          responseError(ErrorCode.AUTH_EMAIL_REGISTERED)
      }
      else if (sqlError === SqlError.FOREIGN_KEY_CONSTRAINT_FAILS) {
        responseError(ErrorCode.ADMIN_ROLE_NOT_EXISTS)
      }
      throw e
    }
  }

  /**
   * 删除管理员
   */
  public async deleteAdmin(id: string) {
    const admin = await this._entityRepo.findOneBy({ id })
    if (!admin)
      responseError(ErrorCode.ADMIN_NOT_EXISTS)
    if (admin.sysAdmin)
      responseError(ErrorCode.ADMIN_DELETE_DISABLE)

    const deleteRes = await this._entityRepo.delete({ id })
    return deleteRes.affected > 0
  }

  /**
   * 批量修改管理员账号状态
   */
  public async changeAdminStatus(body: ChangeStatusBodyDto) {
    const { ids, status } = body

    if (ids.length === 1) {
      const admin = await this._entityRepo.findOneBy({ id: ids[0] })
      if (!admin)
        responseError(ErrorCode.ADMIN_NOT_EXISTS)
      if (admin.sysAdmin)
        responseError(ErrorCode.ADMIN_UPDATE_DISABLE)
    }
    const updateRes = await this._entityRepo.update(
      {
        id: In(ids),
        sysAdmin: false,
      },
      { status },
    )
    return updateRes.affected
  }

  /**
   * 批量分配管理员角色
   */
  public async assignAdminRole(body: AssignAdminRoleBodyDto) {
    const { ids, adminRoleId } = body

    if (ids.length === 1) {
      const admin = await this._entityRepo.findOneBy({ id: ids[0] })
      if (!admin)
        responseError(ErrorCode.ADMIN_NOT_EXISTS)
      if (admin.sysAdmin)
        responseError(ErrorCode.ADMIN_UPDATE_DISABLE)
    }
    try {
      const updateRes = await this._entityRepo.update(
        {
          id: In(ids),
          sysAdmin: false,
        },
        { adminRoleId: adminRoleId || null },
      )
      return updateRes.affected
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.FOREIGN_KEY_CONSTRAINT_FAILS)
        responseError(ErrorCode.ADMIN_ROLE_NOT_EXISTS)
      throw e
    }
  }
}
