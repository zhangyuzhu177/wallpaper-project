import { decorate } from 'ts-mixer'
import { ApiProperty } from '@nestjs/swagger'
import { IsValidUrl } from 'src/decorators'
import { GenerateParamsDecorator } from 'src/utils'
import type { IUrlDto, IUrlOptionalDto } from 'types'

export function UrlDecorator(optional = false, description = '链接') {
  return GenerateParamsDecorator(
    [
      ApiProperty({
        description,
        type: String,
        example: 'https://www.qiyandata.com',
      }),
      IsValidUrl(),
    ],
    optional,
  )
}

export class UrlDto implements IUrlDto {
  @decorate(UrlDecorator())
  url: string
}

export class UrlOptionalDto implements IUrlOptionalDto {
  @decorate(UrlDecorator(true))
  url?: UrlDto['url']
}
