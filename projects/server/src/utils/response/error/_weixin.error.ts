import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _weixinErrors: ErrorMessageCollection = {
  [ErrorCode.WECHAT_SERVER_ABNORMAL]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '微信服务异常',
  },
}

export default _weixinErrors
