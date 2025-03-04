import type { PhoneCodeAction } from '../enum/phone-code-action.enum'

/** 发送手机验证码的目的 */
export interface IPhoneCodeActionDto {
  /** 发送手机验证码的目的 */
  action: PhoneCodeAction
}
