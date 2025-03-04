import { Module } from '@nestjs/common'
import { CodeModule } from '../code/code.module'
import { EmailController } from './email.controller'
import { EmailService } from './email.service'

@Module({
  imports: [CodeModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
