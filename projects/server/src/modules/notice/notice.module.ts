import { Notice } from 'src/entities'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NoticeService } from './notice.service'
import { NoticeController } from './notice.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice]),
  ],
  providers: [
    NoticeService,
  ],
  exports: [
    NoticeService,
  ],
  controllers: [
    NoticeController,
  ],
})
export class NoticeModule {}
