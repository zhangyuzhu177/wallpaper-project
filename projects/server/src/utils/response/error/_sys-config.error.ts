import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _sysConfigErrors: ErrorMessageCollection = {
  [ErrorCode.SYS_CONFIG_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '全局配置不存在',
  },
}

export default _sysConfigErrors
