import { validatePort } from 'utils'
import { registerDecorator } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export function IsValidPort(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidPort',
      target: object.constructor,
      propertyName,
      options: {
        message: ({ value }) => validatePort(value),
        ...validationOptions,
      },
      validator: {
        validate: (value: any) => !validatePort(value),
      },
    })
  }
}
