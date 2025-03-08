import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'

@Module({
  imports: [],
  controllers: [
    FileController,
  ],
  providers: [
    FileService,
  ],
  exports: [
    FileService,
  ],
})
export class FileModule {}
