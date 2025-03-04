import { Global, Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthModule } from '../auth/auth.module'

import { JwtAuthService } from './jwt.service'

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_: ConfigService) => ({}),
    }),

    AuthModule,
  ],
  providers: [
    JwtAuthService,
    JwtService,
  ],
  exports: [
    JwtAuthService,
    JwtService,
  ],
})
export class JwtAuthModule {}
