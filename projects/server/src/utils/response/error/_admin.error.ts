import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _adminErrors: ErrorMessageCollection = {
  [ErrorCode.ADMIN_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '管理员不存在',
  },
  [ErrorCode.ADMIN_EXISTS]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '管理员姓名已存在',
  },
  [ErrorCode.ADMIN_UPDATE_DISABLE]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '禁止更新系统管理员',
  },
  [ErrorCode.ADMIN_DELETE_DISABLE]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '禁止删除系统管理员',
  },
}

export default _adminErrors
