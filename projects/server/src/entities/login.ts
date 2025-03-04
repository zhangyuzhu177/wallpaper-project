import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { IUser } from 'types'
import type { ILogin } from 'types'
import { CreatedAt } from './_timestamp'
import { User } from './user'

@Entity()
export class Login extends CreatedAt implements ILogin {
  @ApiProperty({ description: '登录记录唯一标识' })
  @PrimaryColumn()
  id: string

  @ApiProperty({ description: '登录凭证' })
  @Column({ length: 600 })
  token: string

  @ApiProperty({ description: '过期时间' })
  @Column({ type: 'timestamp' })
  expireAt: Date

  @ApiProperty({ description: '用户信息' })
  @ManyToOne(
    () => User,
    user => user.logins,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user?: IUser

  @ApiProperty({ description: '用户唯一标识' })
  @Column()
  userId: IUser['id']

  @ApiProperty({ description: '登录的 ip' })
  @Column({ nullable: true })
  ip?: string

  @ApiProperty({ description: '最后活动时间' })
  @Column({ nullable: true, type: 'timestamp' })
  lastActiveAt?: Date
}
