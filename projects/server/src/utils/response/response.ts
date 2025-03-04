import { ErrorCode } from 'types'
import type { IBasicResponse } from 'types'
import { ApiResponse } from '@nestjs/swagger'
import { HttpException, applyDecorators } from '@nestjs/common'

import { errorMessages } from './error'

/**
 * 根据错误码返回错误信息
 */
export function getErrorMessage(code: ErrorCode): ErrorMessageCollection[ErrorCode] {
  return errorMessages[code] || errorMessages[ErrorCode.COMMON_ERROR_CODE_NOT_DEFINED]
}

/**
 * 给客户端返回指定的错误
 */
export function responseError(status: ErrorCode, detail?: IBasicResponse['detail'], data?: any) {
  const { message, httpStatus } = getErrorMessage(status)
  throw new HttpException(
    {
      status,
      detail,
      message,
      data,
    },
    httpStatus,
  )
}

/**
 * 返回统一格式的成功响应
 */
export function responseSuccess<T>(data: T) {
  return {
    status: 0,
    data: data === undefined ? null : data,
  }
}

/**
 * Swagger Api 响应错误修饰器
 */
export function ApiErrorResponse(...codes: ErrorCode[]) {
  return applyDecorators(
    ...codes.map((code) => {
      const { httpStatus, message } = getErrorMessage(code)
      return ApiResponse({
        status: httpStatus,
        description: message,
      })
    }),
  )
}

/**
 * Swagger Api 响应成功修饰器
 */
export function ApiSuccessResponse(type: any) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: '成功',
      type,
    }),
  )
}
