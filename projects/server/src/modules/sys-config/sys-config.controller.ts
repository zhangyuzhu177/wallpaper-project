import { PermissionType } from 'types'
import { HasPermission } from 'src/guards'
import { SuccessStringDto } from 'src/dto'
import { ApiSuccessResponse } from 'src/utils'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { SysConfigIdDto } from 'src/dto/id/sys-config.dto'
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'

import { SysConfigService } from './sys-config.service'
import { UpsertSysConfigBodyDto } from './dto/upsert-sys-config.body'

@ApiTags('Sys Config | 系统全局配置')
@Controller('sys-config')
export class SysConfigController {
  constructor(
    private readonly _sysCfgSrv: SysConfigService,
  ) { }

  @ApiOperation({
    summary: '获取指定系统全局配置',
  })
  @Get(':sysConfigId')
  public getSysConfig(
    @Param() { sysConfigId }: SysConfigIdDto,
  ) {
    return this._sysCfgSrv.getSysConfig(sysConfigId)
  }

  @ApiOperation({
    summary: '创建/更新系统全局配置',
    description: 'id 为系统全局配置的唯一标识，如果存在，则会更新配置内容',
  })
  @ApiSuccessResponse(SuccessStringDto)
  @HasPermission([
    PermissionType.CONFIG_UPSERT,
    PermissionType.USER_CHANGE_DOWNLOAD_LIMIT,
  ])
  @Post('upsert/:sysConfigId')
  public upsertSysConfig(
    @Param() { sysConfigId }: SysConfigIdDto,
    @Body() body: UpsertSysConfigBodyDto,
    @Req() req: FastifyRequest,
  ) {
    return this._sysCfgSrv.upsertSysConfig(sysConfigId, body, req.raw.admin)
  }
}
