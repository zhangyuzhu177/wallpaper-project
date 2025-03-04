import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _adminRoleErrors: ErrorMessageCollection = {
  [ErrorCode.ADMIN_ROLE_NAME_EXISTS]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '管理员角色名已存在',
  },
  [ErrorCode.ADMIN_ROLE_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '管理员角色不存在',
  },
  [ErrorCode.ADMIN_ROLE_UPDATE_DISABLE]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '禁止更新默认管理员角色',
  },
  [ErrorCode.ADMIN_ROLE_DELETE_DISABLE]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '禁止删除默认管理员角色',
  },
  [ErrorCode.ADMIN_ROLE_IN_USAGE]: {
    httpStatus: HttpStatus.BAD_REQUEST,
    message: '管理员角色已被分配',
  },
  [ErrorCode.ADMIN_ROLE_UPDATE_SYS_ADMIN_DISABLE]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '禁止更新系统管理员的角色',
  },
}

export default _adminRoleErrors
