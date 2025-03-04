import { TypeOrmModule } from '@nestjs/typeorm'
import { Global, Module } from '@nestjs/common'

import { Permission, Role } from 'src/entities'

import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { PermissionService } from './permission/permission.service'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
  ],
  providers: [
    RoleService,
    PermissionService,
  ],
  exports: [
    RoleService,
    PermissionService,
  ],
  controllers: [
    RoleController,
  ],
})
export class RoleModule {}
