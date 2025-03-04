import { Module, forwardRef } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthModule } from '../auth/auth.module'

import { JwtAuthService } from './jwt.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (_: ConfigService) => {
        return {}
      },
    }),

    forwardRef(() => AuthModule),
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
