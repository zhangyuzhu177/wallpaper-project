import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class DownloadRecordService {
  private readonly _logger = new Logger(DownloadRecordService.name)

  constructor() {}
}
