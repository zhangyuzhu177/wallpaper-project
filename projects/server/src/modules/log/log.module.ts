import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DailyCount } from 'src/entities/daily-count'

import { LogService } from './log.service'
import { LogController } from './log.controller'
import { DailyCountService } from './daily-count/daily-count.service'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([DailyCount]),
  ],
  controllers: [LogController],
  providers: [
    LogService,
    DailyCountService,
  ],
  exports: [
    LogService,
    DailyCountService,
  ],
})
export class LogModule {}
