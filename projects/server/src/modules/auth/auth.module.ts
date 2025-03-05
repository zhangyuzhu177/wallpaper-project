import { Module } from '@nestjs/common'
import { LoginUser } from 'src/entities'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { AuthUserService } from './user/auth-user.service'
import { AuthAdminService } from './admin/auth-admin.service'
import { AuthUserController } from './user/auth-user.controller'
import { AuthAdminController } from './admin/auth-admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginUser]),

    HttpModule,
  ],
  controllers: [
    AuthUserController,
    AuthAdminController,
  ],
  providers: [
    AuthService,
    AuthUserService,
    AuthAdminService,
  ],
  exports: [
    AuthService,
    AuthUserService,
    AuthAdminService,
  ],
})
export class AuthModule {}
