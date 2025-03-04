import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _noticeErrors: ErrorMessageCollection = {
  [ErrorCode.NOTICE_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '公告不存在',
  },
}

export default _noticeErrors
