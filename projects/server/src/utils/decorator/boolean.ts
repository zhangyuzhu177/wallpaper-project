import { ApiProperty } from '@nestjs/swagger'

import { IsBoolean } from 'src/decorators'
import { GenerateParamsDecorator } from './params'

/**
 * 生成布尔类型参数装饰器
 */
export function GenerateBooleanDecorator(description: string, example?: string, optional = false) {
  return GenerateParamsDecorator([
    ApiProperty({
      description,
      type: Boolean,
      example,
    }),
    IsBoolean(),
  ], optional)
}
