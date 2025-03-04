import { Mixin, decorate } from 'ts-mixer'
import { ApiProperty } from '@nestjs/swagger'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { GenerateParamsDecorator } from 'src/utils/decorator'

export class CreatedAt {
  @decorate(
    GenerateParamsDecorator([
      ApiProperty({
        description: '记录创建时间',
        type: 'string',
        example: '2024-05-01T08:00:00.000Z',
      }),
      CreateDateColumn({
        name: 'createdAt',
        type: 'timestamp',
      }),
    ]),
  )
  createdAt: Date
}

export class UpdatedAt {
  @decorate(
    GenerateParamsDecorator([
      ApiProperty({
        description: '记录最后更新时间',
        type: 'string',
        example: '2024-05-01T08:00:00.000Z',
      }),
      UpdateDateColumn({
        name: 'updatedAt',
        type: 'timestamp',
      }),
    ]),
  )
  updatedAt: Date
}

export class BaseTimeStamp extends Mixin(CreatedAt, UpdatedAt) { }
