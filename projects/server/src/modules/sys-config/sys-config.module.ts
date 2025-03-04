import { SysConfig } from 'src/entities'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SysConfigService } from './sys-config.service'
import { SysConfigController } from './sys-config.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([SysConfig]),

  ],
  providers: [
    SysConfigService,
  ],
  exports: [
    SysConfigService,
  ],
  controllers: [
    SysConfigController,
  ],
})
export class SysConfigModule {}
