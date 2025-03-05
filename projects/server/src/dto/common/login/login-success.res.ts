import { ApiProperty } from '@nestjs/swagger'
import type { ILoginSuccessResData } from 'types'

import { SuccessDto } from '../../success.dto'

class Sign {
  @ApiProperty({
    description: 'JWT 登录凭证',
  })
  token: string

  @ApiProperty({
    description: '过期时间戳',
  })
  expireAt: number
}

class LoginSuccessResData implements ILoginSuccessResData {
  @ApiProperty({
    description: '登录凭证信息',
    type: Sign,
  })
  sign: Sign
}

/**
 * 登录成功
 * 响应数据
 */
export class LoginSuccessResDto extends SuccessDto {
  @ApiProperty({
    type: LoginSuccessResData,
  })
  data: LoginSuccessResData
}
