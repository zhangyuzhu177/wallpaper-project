import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _commonErrors: ErrorMessageCollection = {
  [ErrorCode.COMMON_UNEXPECTED_ERROR]: {
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '发生未知错误',
  },
  [ErrorCode.COMMON_PARAMS_NOT_VALID]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '参数校验错误',
  },
  [ErrorCode.COMMON_ERROR_CODE_NOT_DEFINED]: {
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '发生未知错误',
  },
  [ErrorCode.COMMON_NOT_IMPLEMENTED]: {
    httpStatus: HttpStatus.NOT_IMPLEMENTED,
    message: '未实现的功能',
  },
  [ErrorCode.COMMON_DEPRECATED]: {
    httpStatus: HttpStatus.GONE,
    message: '已废弃的功能',
  },
}

export default _commonErrors
