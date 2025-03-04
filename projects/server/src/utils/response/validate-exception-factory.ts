import { objectKeys } from 'utils'
import { ErrorCode } from 'types'
import type { ValidationError } from '@nestjs/common'

import { responseError } from '.'

export function exceptionFactory(errs: ValidationError[]) {
  return responseError(
    ErrorCode.COMMON_PARAMS_NOT_VALID,
    errs.reduce(
      (res, err) => [
        ...res,
        ...objectKeys(err.constraints).map(key => ({
          property: err.property,
          message: err.constraints[key],
        })),
      ],
      [],
    ),
  )
}

/**
 * 给客户端返回参数错误
 */
export const responseParamsError = exceptionFactory
