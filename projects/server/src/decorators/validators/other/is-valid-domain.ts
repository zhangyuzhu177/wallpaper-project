import { validateDomain } from 'utils'
import { registerDecorator } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export function IsValidDomain(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidDomain',
      target: object.constructor,
      propertyName,
      options: {
        message: ({ value }) => validateDomain(value),
        ...validationOptions,
      },
      validator: {
        validate: (value: any) => !validateDomain(value),
      },
    })
  }
}
