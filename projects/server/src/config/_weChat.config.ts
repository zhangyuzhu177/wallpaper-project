import { registerAs } from '@nestjs/config'

export interface WeChatConfig {
  /** 微信小程序的appid */
  appid: string
  /** 微信小程序的appsecret */
  secret: string
  /** 微信服务的请求接口 */
  baseURL: string
}

export default registerAs('weChat', (): WeChatConfig => {
  const {
    WECHAT_APP_ID, WECHAT_APP_SECRET, WEIXIN_API_URL,
  } = process.env

  return {
    appid: WECHAT_APP_ID,
    secret: WECHAT_APP_SECRET,
    baseURL: WEIXIN_API_URL,
  }
})
