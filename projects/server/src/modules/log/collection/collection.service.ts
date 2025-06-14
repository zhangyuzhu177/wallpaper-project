import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CollectionRecordService {
  private readonly _logger = new Logger(CollectionRecordService.name)

  constructor() {}
}
