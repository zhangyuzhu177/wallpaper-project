import { LessThan, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable, forwardRef } from '@nestjs/common'

import { Login } from 'src/entities'

import { Cron } from '@nestjs/schedule'
import { CodeService } from '../code/code.service'
import { UserService } from '../user/user.service'
import { JwtAuthService } from '../jwt/jwt.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly _codeSrv: CodeService,

    @InjectRepository(Login)
    private readonly _loginRepo: Repository<Login>,

    @Inject(forwardRef(() => UserService))
    private readonly _userSrv: UserService,

    private readonly _jwtAuthSrv: JwtAuthService,
  ) { }

  @Cron('*/30 * * * * *')
  public async clearExpiredLogin() {
    await this._loginRepo.delete({
      expireAt: LessThan(new Date()),
    })
  }

  public repo() {
    return this._loginRepo
  }
}
