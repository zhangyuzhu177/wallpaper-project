import { pathBaseName } from 'utils'
import { Cron } from '@nestjs/schedule'
import type { RedisClientType } from 'redis'
import { Between, type Repository } from 'typeorm'
import type { OnModuleInit } from '@nestjs/common'
import { Injectable, Logger } from '@nestjs/common'
import { Config, ErrorCode, WALLPAPER_DOWNLOAD_LIMIT } from 'types'

import { parseSqlError, responseError } from 'src/utils'
import type { User, Wallpaper } from 'src/entities'
import { UserService } from 'src/modules/user/user.service'
import { FileService } from 'src/modules/file/file.service'
import { RedisService } from 'src/modules/redis/redis.service'
import { SysConfigService } from 'src/modules/sys-config/sys-config.service'

import { LogService } from 'src/modules/log/log.service'
import { WallpaperService } from '../wallpaper.service'
import type { UpsertWallpaperBodyDto } from './dto/upsert-wallpaper.body'

@Injectable()
export class WallpaperEntityService implements OnModuleInit {
  private readonly _logger = new Logger(WallpaperEntityService.name)

  private readonly _entityRepo: Repository<Wallpaper>

  // Redis客户端
  private readonly _client: RedisClientType
  // Redis缓存键
  private readonly _cacheKey = 'daily_recommend'

  constructor(
    private readonly _logSrv: LogService,
    private readonly _fileSrv: FileService,
    private readonly _userSrv: UserService,
    private readonly _redisSrv: RedisService,
    private readonly _wallpaperSrv: WallpaperService,
    private readonly _sysConfigSrv: SysConfigService,
  ) {
    this._entityRepo = this._wallpaperSrv.entityRepo()
    this._client = this._redisSrv.getClient(RedisType.RECOMMEND)
  }

  /**
   * 服务初始化时立即执行一次定时任务
   */
  async onModuleInit() {
    await this.handleDailyRecommend()
  }

  /**
   * 定时更新每日推荐
   * 每日0点执行
   */
  @Cron('0 0 0 * * *')
  public async handleDailyRecommend() {
    this._logger.verbose('定时任务：更新每日推荐')
    try {
      const res = await this._wallpaperSrv.entityQb()
        .leftJoin('w.category', 'category') // 加载 category 关联
        .addSelect(['category.id', 'category.url']) // 只选 category 的 id 和 url
        .leftJoin('w.collections', 'collections') // 加载 collections 关联
        .addSelect(['collections.id', 'collections.userId']) // 只选 collections 的 id 和 userId
        .leftJoin('w.downloadRecords', 'downloadRecords') // 加载 downloadRecords 关联
        .addSelect(['downloadRecords.id', 'downloadRecords.userId']) // 只选 downloadRecords 的 id 和 userId
        .orderBy('RAND()') // MySQL 的随机函数
        .limit(10) // 获取10条数据
        .getMany() // 获取数据

      // 将数据存入Redis，并设置一天的有效期（24小时）
      await this._client.setEx(this._cacheKey, 24 * 60 * 60, JSON.stringify(res)) // 设置缓存并指定过期时
    }
    catch (e) {
      this._logger.error(`每日推荐任务失败：${e.message}`, e.stack)
    }
  }

  /**
   * 获取每日推荐
   */
  public async getDailyRecommend() {
    try {
      const data = await this._client.get(this._cacheKey)
      return JSON.parse(data)
    }
    catch (_) {
      responseError(ErrorCode.COMMON_UNEXPECTED_ERROR)
    }
  }

  /**
   * 下载指定壁纸
   */
  public async downloadWallpaper(id: string, user: User, ip: string) {
    const wallpaper = await this._entityRepo.findOneBy({ id })

    if (!wallpaper)
      responseError(ErrorCode.WALLPAPER_NOT_EXISTS)

    const { downloadLimit: userLimit } = user
    const { downloadLimit: configLimit } = await this._sysConfigSrv.getSysConfig(Config.DOWNLOAD_LIMIT)
      ?? { downloadLimit: WALLPAPER_DOWNLOAD_LIMIT }
    const limit = userLimit ?? configLimit

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0) // 设置为当天的00:00:00

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999) // 设置为当天的23:59:59

    const downloadRecord = await this._logSrv.downloadRecordRepo().find({
      where: {
        userId: user.id,
        createdAt: Between(startOfDay, endOfDay),
      },
    })

    if (downloadRecord.length >= limit)
      responseError(ErrorCode.WALLPAPER_DOWNLOAD_LIMIT_EXCEED)

    try {
      const { url, categoryId } = wallpaper

      const path = `wallpaper/${categoryId}/${pathBaseName(url, true)}`
      const data = await this._fileSrv.signUrl(path)

      await this._logSrv.downloadRecordRepo().save(
        this._logSrv.downloadRecordRepo().create({
          ip,
          user: { id: user.id },
          wallpaper: { id: wallpaper.id },
        }),
      )

      return data
    }
    catch (e) {
      responseError(ErrorCode.COMMON_UNEXPECTED_ERROR, e.message)
    }
  }

  /**
   * 添加/取消收藏
   */
  public async collectionWallpaper(status: boolean, id: string, userId: string) {
    const wallpaper = await this._entityRepo.findOneBy({ id })

    if (!wallpaper)
      responseError(ErrorCode.WALLPAPER_NOT_EXISTS)

    try {
      if (status) {
        await this._logSrv.collectionRepo().insert(
          this._logSrv.collectionRepo().create({
            userId,
            wallpaperId: id,
          }),
        )
      }
      else {
        await this._logSrv.collectionRepo().delete({
          userId,
          wallpaperId: id,
        })
      }

      const user = await this._userSrv.repo().findOne({
        where: { id: userId },
        relations: {
          collections: true,
          downloadRecords: true,
        },
      })
      return user
    }
    catch (e) {
      const sqlError = parseSqlError(e)
      if (sqlError === SqlError.DUPLICATE_ENTRY)
        responseError(ErrorCode.WALLPAPER_COLLECTION_EXISTS)
      throw e
    }
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

    const insertRes = await this._entityRepo.insert(
      this._entityRepo.create({
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

    const updateRes = await this._entityRepo.update(
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
    if (!(await this._entityRepo.existsBy({ id })))
      responseError(ErrorCode.WALLPAPER_NOT_EXISTS)

    const deleteRes = await this._entityRepo.delete({ id })
    return deleteRes.affected > 0
  }
}
