import { registerAs } from '@nestjs/config'

interface SmsItemConfig {
  /** 短信服务签名 */
  sign: string
  /** 短信服务模板编号 */
  template: string
}

export interface SmsConfig {
  /** 短信服务 AK */
  ak: string
  /** 短信服务 SK */
  sk: string
  /** 短信配置 */
  config: Record<SmsType, SmsItemConfig>
}

export default registerAs('sms', (): SmsConfig => {
  const {
    SMS_AK, SMS_SK, SMS_SIGN,
    SMS_CODE_TEMPLATE, SMS_CODE_SIGN,
  } = process.env

  return {
    ak: SMS_AK,
    sk: SMS_SK,
    config: {
      [SmsType.CODE]: {
        sign: SMS_CODE_SIGN || SMS_SIGN,
        template: SMS_CODE_TEMPLATE,
      },
    },
  }
})
