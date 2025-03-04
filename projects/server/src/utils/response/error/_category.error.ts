import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _categoryErrors: ErrorMessageCollection = {
  [ErrorCode.CATEGORY_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '分类不存在',
  },
  [ErrorCode.CATEGORY_EXISTS]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '分类已存在',
  },
  [ErrorCode.CATEGORY_IN_USAGE]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '分类已关联壁纸',
  },
}

export default _categoryErrors
