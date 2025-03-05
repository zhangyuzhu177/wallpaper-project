import { ErrorCode } from 'types'
import { User } from 'src/entities/user'
import { In, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import type { ChangeStatusBodyDto } from 'src/dto'
import { InjectRepository } from '@nestjs/typeorm'
import {
  encryptPassword,
  parseSqlError,
  responseError,
  responseParamsError,
} from 'src/utils'

import type { CreateUserBodyDto } from './dto/create-user.body'
import type { UpdateUserBodyDto } from './dto/update-user.body'
import type { ChangeUserDownloadConfigBodyDto } from './dto/change-user-download-config.body'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
  ) { }

  /**
   * 获取当前登入个人用户的信息
   */
  public async getOwnProfile(id: string, relations?: any) {
    try {
      return await this._userRepo.findOne({
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
   * 创建个人用户
   */
  public async createUser(body: CreateUserBodyDto) {
    const {
      name, phone, email, password,
    } = body

    try {
      const insertRes = await this._userRepo.insert(
        this._userRepo.create({
          ...body,
          password: await encryptPassword(password),
        }),
      )

      return insertRes.identifiers[0].id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY) {
        const value = e.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === name)
          responseError(ErrorCode.AUTH_ACCOUNT_REGISTERED)
        else if (value === phone)
          responseError(ErrorCode.AUTH_PHONE_REGISTERED)
        else if (value === email)
          responseError(ErrorCode.AUTH_EMAIL_REGISTERED)
      }
      throw e
    }
  }

  /**
   * 更新指定个人用户
   */
  public async updateUser(id: string, body: UpdateUserBodyDto) {
    const {
      name, phone, email, password,
    } = body

    try {
      const updateRes = await this._userRepo.update(
        { id },
        {
          ...body,
          password: password ? await encryptPassword(password) : undefined,
        },
      )
      if (!updateRes.affected)
        responseError(ErrorCode.USER_NOT_EXISTS)

      return id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY) {
        const value = e.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === name)
          responseError(ErrorCode.AUTH_ACCOUNT_REGISTERED)
        else if (value === phone)
          responseError(ErrorCode.AUTH_PHONE_REGISTERED)
        else if (value === email)
          responseError(ErrorCode.AUTH_EMAIL_REGISTERED)
      }
      throw e
    }
  }

  /**
   * 批量修改个人用户状态
   */
  public async changeUserStatus(body: ChangeStatusBodyDto) {
    const { ids, status } = body

    if (
      ids.length === 1
        && !(await this._userRepo.existsBy({ id: ids[0] }))
    )
      responseError(ErrorCode.USER_NOT_EXISTS)

    const updateRes = await this._userRepo.update(
      { id: In(ids) },
      { status },
    )
    return updateRes.affected
  }

  /**
   * 批量修改个人用户的壁纸下载次数
   */
  public async changeUserDownloadConfig(body: ChangeUserDownloadConfigBodyDto) {
    const { ids, downloadLimit } = body

    if (
      ids.length === 1
        && !(await this._userRepo.existsBy({ id: ids[0] }))
    )
      responseError(ErrorCode.USER_NOT_EXISTS)

    const updateRes = await this._userRepo.update(
      { id: In(ids) },
      { downloadLimit: downloadLimit ?? null },
    )
    return updateRes.affected
  }

  public qb(alias = 'u') {
    return this._userRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._userRepo
  }
}
