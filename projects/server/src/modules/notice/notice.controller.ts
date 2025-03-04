import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

import { NoticeService } from './notice.service'

@ApiTags('Notice | 公告管理')
@Controller('notice')
export class NoticeController {
  constructor(
    private readonly _noticeSrv: NoticeService,
  ) { }
}
