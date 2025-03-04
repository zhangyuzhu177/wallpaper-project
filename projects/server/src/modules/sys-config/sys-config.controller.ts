import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

import { SysConfigService } from './sys-config.service'

@ApiTags('Sys Config | 系统全局配置')
@Controller('sys-config')
export class SysConfigController {
  constructor(
    private readonly _sysCfgSrv: SysConfigService,
  ) {}
}
