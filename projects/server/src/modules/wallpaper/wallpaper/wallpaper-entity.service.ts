import { ErrorCode } from 'types'
import { responseError } from 'src/utils'
import type { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import type { Wallpaper } from 'src/entities'

import { WallpaperService } from '../wallpaper.service'
import type { UpsertWallpaperBodyDto } from './dto/upsert-wallpaper.body'

@Injectable()
export class WallpaperEntityService {
  private readonly _entitiyRepo: Repository<Wallpaper>

  constructor(
    private readonly _wallpaperSrv: WallpaperService,
  ) {
    this._entitiyRepo = this._wallpaperSrv.entitiyRepo()
  }

  /**
   * 上传壁纸
   */
  public async createWallpaper(body: UpsertWallpaperBodyDto) {
    const { categoryId } = body
    const category = await this._wallpaperSrv.categoryRepo().findOneBy({
      id: categoryId,
    })
    if (!category)
      responseError(ErrorCode.CATEGORY_NOT_EXISTS)

    const insertRes = await this._entitiyRepo.insert(
      this._entitiyRepo.create({
        ...body,
        category,
      }),
    )

    return insertRes.identifiers[0].id
  }

  /**
   * 更新壁纸
   */
  public async updateWallpaper(body: UpsertWallpaperBodyDto, id: string) {
    const { categoryId } = body
    const category = await this._wallpaperSrv.categoryRepo().findOneBy({
      id: categoryId,
    })
    if (!category)
      responseError(ErrorCode.CATEGORY_NOT_EXISTS)

    const updateRes = await this._entitiyRepo.update(
      { id },
      {
        ...body,
        category,
      },
    )

    if (!updateRes.affected)
      responseError(ErrorCode.WALLPAPER_NOT_EXISTS)

    return id
  }

  /**
   * 删除壁纸
   */
  public async deleteWallpaper(id: string) {
    if (!(await this._entitiyRepo.existsBy({ id })))
      responseError(ErrorCode.WALLPAPER_NOT_EXISTS)

    const deleteRes = await this._entitiyRepo.delete({ id })
    return deleteRes.affected > 0
  }
}
