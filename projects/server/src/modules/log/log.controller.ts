import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

import { LogService } from './log.service'

@Controller('log')
@ApiTags('Log | 日志服务')
export class LogController {
  constructor(private readonly logService: LogService) {}
}
