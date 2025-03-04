import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EmailService } from './email.service'

@Controller('email')
@ApiTags('Email | 邮件服务')
export class EmailController {
  constructor(
    private readonly _emailSrv: EmailService,
  ) { }
}
