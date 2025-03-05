import { Mixin } from 'ts-mixer'
import { PasswordDto } from 'src/dto'
import type { ICreateUserBodyDto } from 'types'

import { UpdateUserBodyDto } from './update-user.body'

/**
 * 创建个人用户
 * 请求参数
 */
export class CreateUserBodyDto
  extends Mixin(
    UpdateUserBodyDto,
    PasswordDto,
  )
  implements ICreateUserBodyDto {}
