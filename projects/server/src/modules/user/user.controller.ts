import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('User | 用户')
export class UserController {
  constructor(
    private readonly _userSrv: UserService,
  ) { }
}
