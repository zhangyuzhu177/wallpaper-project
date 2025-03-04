import { validateUrl } from 'utils'
import { registerDecorator } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export function IsValidUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidUrl',
      target: object.constructor,
      propertyName,
      options: {
        message: ({ value }) => validateUrl(value),
        ...validationOptions,
      },
      validator: {
        validate: (value: any) => !validateUrl(value),
      },
    })
  }
}
