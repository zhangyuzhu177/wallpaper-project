/**
 * 获取图形验证码
 */
export function getCaptchaImgApi() {
  return request<{
    bizId: string
    img: string
  }>({
    url: '/code/captcha',
  })
}
