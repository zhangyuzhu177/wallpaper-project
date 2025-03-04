import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CodeService } from '../code/code.service'

@Injectable()
export class EmailService {
  readonly transporter: nodemailer.Transporter
  private readonly _mailCfg: any

  constructor(
    private readonly _cfgSrv: ConfigService,
    private readonly _codeSrv: CodeService,
  ) {
    this._mailCfg = this._cfgSrv.get('email')

    this.transporter = nodemailer.createTransport(this._mailCfg)
  }

  /** 发送邮件 */
  public async send(mailOptions: nodemailer.SendMailOptions) {
    try {
      this.transporter.sendMail({
        ...mailOptions,
        from: `系统通知 <${this._mailCfg?.auth?.user}>`,
      })
    }
    catch (e) {
      console.error(e)
    }
  }
}
