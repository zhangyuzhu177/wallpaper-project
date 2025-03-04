import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _userErrors: ErrorMessageCollection = {
  [ErrorCode.USER_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '用户不存在',
  },
  [ErrorCode.USER_EXISTS]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '用户已存在',
  },
}

export default _userErrors
