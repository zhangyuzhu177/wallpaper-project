import { ErrorCode } from 'types'
import type { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import type { Category } from 'src/entities'
import { parseSqlError, responseError } from 'src/utils'

import { WallpaperService } from '../wallpaper.service'
import type { UpsertCategoryBodyDto } from './dto/upsert-category.body'

@Injectable()
export class CategoryService {
  private readonly _categoryRepo: Repository<Category>

  constructor(
    private readonly _wallpaperSrv: WallpaperService,
  ) {
    this._categoryRepo = this._wallpaperSrv.categoryRepo()
  }

  /**
   * 创建分类
   */
  public async createCategory(body: UpsertCategoryBodyDto) {
    const { name } = body
    try {
      const insertRes = await this._categoryRepo.insert(
        this._categoryRepo.create(body),
      )
      return insertRes.identifiers[0].id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY) {
        const value = e.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === name)
          responseError(ErrorCode.CATEGORY_EXISTS)
      }
      throw e
    }
  }

  /**
   * 更新分类
   */
  public async updateCategory(body: UpsertCategoryBodyDto, id: string) {
    const { name, order } = body
    try {
      const updateRes = await this._categoryRepo.update(
        { id },
        {
          ...body,
          order: order ?? null,
        },
      )
      if (!updateRes.affected)
        responseError(ErrorCode.CATEGORY_NOT_EXISTS)
      return id
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY) {
        const value = e.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === name)
          responseError(ErrorCode.CATEGORY_EXISTS)
      }
      throw e
    }
  }

  /**
   * 删除分类
   */
  public async deleteCategory(id: string) {
    if (!(await this._categoryRepo.existsBy({ id })))
      responseError(ErrorCode.CATEGORY_NOT_EXISTS)

    try {
      const deleteRes = await this._categoryRepo.delete({ id })
      return deleteRes.affected > 0
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.FOREIGN_KEY_CONSTRAINT_FAILS)
        responseError(ErrorCode.CATEGORY_IN_USAGE)
      throw e
    }
  }
}
