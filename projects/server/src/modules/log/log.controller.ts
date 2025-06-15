import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Post } from '@nestjs/common'

import { PermissionType, UserType } from 'types'
import { HasPermission, IsLogin } from 'src/guards'
import { QueryDto } from 'src/dto'
import type { Collection, DownloadRecord } from 'src/entities'
import { getQuery } from 'src/utils'
import { LogService } from './log.service'

@Controller('log')
@ApiTags('Log | 日志服务')
export class LogController {
  constructor(
    private readonly _logSrv: LogService,
  ) { }

  @ApiOperation({
    summary: '查询下载记录',
  })
  @HasPermission([PermissionType.DOWNLOAD_RECORD_QUERY])
  @Post('download-record/query')
  public async queryDownloadRecord(
    @Body() body: QueryDto<DownloadRecord>,
  ) {
    return getQuery(
      this._logSrv.downloadRecordRepo(),
      body,
    )
  }

  @ApiOperation({
    summary: '查询收藏记录',
  })
  @HasPermission([PermissionType.COLLECTION_QUERY])
  @Post('collection-record/query')
  public async queryCollectionRecord(
      @Body() body: QueryDto<Collection>,
  ) {
    return getQuery(
      this._logSrv.collectionRepo(),
      body,
    )
  }

  @ApiOperation({
    summary: '获取分类下壁纸数量占比统计',
  })
  @IsLogin([UserType.ADMIN])
  @Get('category-wallpaper-count')
  public async getCategoryWallpaperCount() {
    return this._logSrv.getCategoryWallpaperCount()
  }

  @ApiOperation({
    summary: '获取分类下载壁纸次数统计',
  })
  @IsLogin([UserType.ADMIN])
  @Get('category-download-count')
  public async getCategoryDownloadCount() {
    return this._logSrv.getCategoryDownloadCount()
  }

  @ApiOperation({
    summary: '获取30天用户下载收藏行为统计',
  })
  @IsLogin([UserType.ADMIN])
  @Get('user-action-count')
  public async getUserActionCount() {
    return this._logSrv.getUserActionCount()
  }
}
