import { ErrorCode } from 'types'
import { HttpStatus } from '@nestjs/common'

const _authErrors: ErrorMessageCollection = {
  [ErrorCode.AUTH_NOT_LOGIN]: {
    httpStatus: HttpStatus.UNAUTHORIZED,
    message: '请登录后重试',
  },
  [ErrorCode.AUTH_LOGIN_EXPIRED]: {
    httpStatus: HttpStatus.UNAUTHORIZED,
    message: '登录已过期，请重新登录',
  },
  [ErrorCode.AUTH_ACCOUNT_LOGIN_OTHER]: {
    httpStatus: HttpStatus.UNAUTHORIZED,
    message: '账号已在其他设备登录',
  },
  [ErrorCode.AUTH_ACCOUNT_IS_DISABLE]: {
    httpStatus: HttpStatus.UNAUTHORIZED,
    message: '账号已被停用',
  },

  [ErrorCode.AUTH_PASSWORD_NOT_MATCHED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '密码错误',
  },
  [ErrorCode.AUTH_PASSWORD_UNQUALIFIED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '账号密码不符合要求',
  },
  [ErrorCode.AUTH_CODE_NOT_MATCHED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '验证码错误',
  },
  [ErrorCode.AUTH_IP_NOT_MATCHED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: 'ip 地址不匹配',
  },

  [ErrorCode.AUTH_ACCOUNT_NOT_REGISTERED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '账号未注册',
  },
  [ErrorCode.AUTH_ACCOUNT_REGISTERED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '账号已被注册',
  },
  [ErrorCode.AUTH_ACCOUNT_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '账号不存在',
  },
  [ErrorCode.AUTH_ACCOUNT_EXISTS]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '账号已存在',
  },
  [ErrorCode.AUTH_ACCOUNT_NOT_MATCHED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '账号不匹配',
  },

  [ErrorCode.AUTH_PHONE_NOT_REGISTERED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '手机号未注册',
  },
  [ErrorCode.AUTH_PHONE_REGISTERED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '手机号已被注册',
  },
  [ErrorCode.AUTH_PHONE_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '手机号不存在',
  },
  [ErrorCode.AUTH_PHONE_EXISTS]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '手机号已存在',
  },
  [ErrorCode.AUTH_PHONE_NOT_MATCHED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '手机号不匹配',
  },

  [ErrorCode.AUTH_EMAIL_NOT_REGISTERED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '邮箱未注册',
  },
  [ErrorCode.AUTH_EMAIL_REGISTERED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '邮箱已被注册',
  },
  [ErrorCode.AUTH_EMAIL_NOT_EXISTS]: {
    httpStatus: HttpStatus.NOT_FOUND,
    message: '邮箱不存在',
  },
  [ErrorCode.AUTH_EMAIL_EXISTS]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '邮箱已存在',
  },
  [ErrorCode.AUTH_EMAIL_NOT_MATCHED]: {
    httpStatus: HttpStatus.FORBIDDEN,
    message: '邮箱不匹配',
  },
}

export default _authErrors
