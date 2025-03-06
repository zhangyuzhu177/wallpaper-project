import * as svgCaptcha from 'svg-captcha'
import { Throttle } from '@nestjs/throttler'
import { Controller, Get, Req } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CodeService } from './code.service'

@Controller('code')
@ApiTags('Code | 验证码')
export class CodeController {
  constructor(
    private readonly _codeSrv: CodeService,
  ) { }

  @ApiOperation({ summary: '获取图形验证码' })
  @Throttle(1, 1)
  @Get('captcha')
  public async getCaptcha(
    @Req() req: FastifyRequest,
  ) {
    const ip = req.raw.ip

    const captcha = svgCaptcha.create({
      size: 6,
      width: 130,
      height: 40,
      noise: 3,
      fontSize: 40,
      ignoreChars: 'lI',
    })

    const { bizId } = await this._codeSrv.createCaptcha(ip, captcha.text)
    return {
      bizId,
      img: captcha.data,
    }
  }
}
