import { useRequest } from '../hooks/request'

const { $get } = useRequest()

/**
 * 获取图形验证码
 */
export function getCaptchaImgApi() {
  return $get<{
    bizId: string
    img: string
  }>('/code/captcha')
}
