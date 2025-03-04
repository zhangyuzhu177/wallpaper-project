import { validateDomain, validateIp } from 'utils'
import { registerDecorator } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

/**
 * 校验一个主机地址是否符合要求
 * @param host 待校验的主机地址
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
function validateHost(host?: string): string {
  if (typeof host !== 'string')
    return '主机地址必须是字符串'
  if (validateDomain(host) && validateIp(host))
    return '主机地址不是有效的域名或IP地址'
  return ''
}

export function IsValidHost(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidHost',
      target: object.constructor,
      propertyName,
      options: {
        message: ({ value }) => validateHost(value),
        ...validationOptions,
      },
      validator: {
        validate: (value: any) => !validateHost(value),
      },
    })
  }
}
