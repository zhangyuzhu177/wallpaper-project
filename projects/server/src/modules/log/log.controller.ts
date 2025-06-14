import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Post } from '@nestjs/common'

import { PermissionType } from 'types'
import { HasPermission } from 'src/guards'
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
}
