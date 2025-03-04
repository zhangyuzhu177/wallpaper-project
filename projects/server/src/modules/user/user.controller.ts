import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@ApiTags('User | 个人用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly _userSrv: UserService,
  ) { }
}
