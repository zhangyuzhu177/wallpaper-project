import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _smsErrors: ErrorMessageCollection = {
  [ErrorCode.SMS_SEND_FAIL]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '短信发送失败',
  },
}

export default _smsErrors
