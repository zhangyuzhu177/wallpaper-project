import * as moment from 'moment'
import { Repository } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Collection, DailyCount, DownloadRecord } from 'src/entities'
import { WallpaperService } from '../wallpaper/wallpaper.service'

@Injectable()
export class LogService {
  private readonly _logger = new Logger(LogService.name)

  constructor(
    @InjectRepository(DailyCount)
    private readonly _dailyCountRepo: Repository<DailyCount>,
    @InjectRepository(DownloadRecord)
    private readonly _downloadRecordRepo: Repository<DownloadRecord>,
    @InjectRepository(Collection)
    private readonly _collectionRepo: Repository<Collection>,

    private readonly _wallpaperSrv: WallpaperService,
  ) { }

  /**
   * 获取分类下壁纸数量占比
   */
  public async getCategoryWallpaperCount() {
    const res = await this._wallpaperSrv.categoryRepo().find({
      relations: {
        wallpapers: true,
      },
    })

    return res.map((v) => {
      return {
        label: v.name,
        value: v.wallpapers.length,
      }
    })
  }

  /**
   * 获取分类下载壁纸次数统计
   */
  public async getCategoryDownloadCount() {
    const data = await this._downloadRecordRepo.find({
      relations: {
        wallpaper: {
          category: true,
        },
      },
    })
    const result = data.reduce((acc, item) => {
      const categoryName = item.wallpaper.category.name

      // 如果类别不存在于累加器中，则初始化
      if (!acc[categoryName])
        acc[categoryName] = 0

      // 增加对应类别的计数
      acc[categoryName] += 1

      return acc
    }, {})

    return {
      header: Object.keys(result),
      data: Object.values(result),
    }
  }

  /**
   * 获取30天用户下载收藏行为统计
   */
  public async getUserActionCount() {
    // 获取30天前的日期
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // 查询下载记录
    const downloadRecords = await this.downloadRecordQb()
      .where('dr.createdAt >= :date', { date: thirtyDaysAgo })
      .getMany()

    // 查询收藏记录
    const collections = await this.collectionQb()
      .where('c.createdAt >= :date', { date: thirtyDaysAgo })
      .getMany()

    // 按日期分组统计
    const downloadCountByDate = new Map<string, number>()
    const collectionCountByDate = new Map<string, number>()

    // 初始化最近30天的日期
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      downloadCountByDate.set(dateStr, 0)
      collectionCountByDate.set(dateStr, 0)
    }

    // 统计下载次数
    downloadRecords.forEach((record) => {
      const dateStr = record.createdAt.toISOString().split('T')[0]
      downloadCountByDate.set(dateStr, (downloadCountByDate.get(dateStr) || 0) + 1)
    })

    // 统计收藏次数
    collections.forEach((collection) => {
      const dateStr = collection.createdAt.toISOString().split('T')[0]
      collectionCountByDate.set(dateStr, (collectionCountByDate.get(dateStr) || 0) + 1)
    })

    // 按日期排序
    const sortedDates = Array.from(downloadCountByDate.keys()).sort()

    return {
      header: sortedDates.map(v => moment(v).format('MM-DD')),
      data: [
        {
          label: '下载',
          value: sortedDates.map(date => downloadCountByDate.get(date) || 0),
        },
        {
          label: '收藏',
          value: sortedDates.map(date => collectionCountByDate.get(date) || 0),
        },
      ],
    }
  }

  public dailyCountQb(alias = 'dc') {
    return this._dailyCountRepo.createQueryBuilder(alias)
  }

  public dailyCountRepo() {
    return this._dailyCountRepo
  }

  public downloadRecordQb(alias = 'dr') {
    return this._downloadRecordRepo.createQueryBuilder(alias)
  }

  public downloadRecordRepo() {
    return this._downloadRecordRepo
  }

  public collectionQb(alias = 'c') {
    return this._collectionRepo.createQueryBuilder(alias)
  }

  public collectionRepo() {
    return this._collectionRepo
  }
}
