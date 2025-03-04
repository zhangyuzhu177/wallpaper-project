import { decorate } from 'ts-mixer'
import { objectEntries } from 'utils'
import { IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Config, configDescriptions } from 'types'
import type { ISysConfigIdDto, ISysConfigIdOptionalDto } from 'types'
import { GenerateParamsDecorator, sharedVariableMarkdown } from 'src/utils'

function SysConfigIdDecorator(optional = false) {
  return GenerateParamsDecorator(
    [
      ApiProperty({
        description: `系统全局配置的唯一标识
        \n${objectEntries(configDescriptions).map(([key, value]) => `- \`${key}\`: ${value}`).join('\n')}
        ${sharedVariableMarkdown('SysConfig', 'cloud-types', 'id枚举值')}`,
        enum: Config,
        example: Config.BANNER_CONFIG,
      }),
      IsEnum(
        Config,
        {
          message: 'id 必须是 SysConfig 枚举值',
        },
      ),
    ],
    optional,
  )
}

export class SysConfigIdDto<T = Config> implements ISysConfigIdDto<T> {
  @decorate(SysConfigIdDecorator())
  sysConfigId: T
}

export class SysConfigIdOptionalDto<T = Config> implements ISysConfigIdOptionalDto<T> {
  @decorate(SysConfigIdDecorator(true))
  sysConfigId?: SysConfigIdDto<T>['sysConfigId']
}
