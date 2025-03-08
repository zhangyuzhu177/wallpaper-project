import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _fileErrors: ErrorMessageCollection = {
  [ErrorCode.FILE_TYPE_NOT_ALLOWED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '文件类型不允许',
  },
  [ErrorCode.FILE_NOT_FOUND]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '无法找到指定的文件',
  },
  [ErrorCode.FILE_TOO_LARGE]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '文件大小超出限制',
  },
}

export default _fileErrors
